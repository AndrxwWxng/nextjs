import { mastra } from "@/mastra";
import { NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Define Next.js config for API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Define the valid agent IDs based on what's available in the system
type AgentId = 'weatherAgent' | 'ceoAgent' | 'marketingAgent' | 'developerAgent' | 
               'salesAgent' | 'productAgent' | 'financeAgent' | 'designAgent' | 'researchAgent';

interface AgentRequest {
  requesterId: AgentId;
  targetAgentId: AgentId;
  prompt: string;
  originalQuery?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { requesterId, targetAgentId, prompt, originalQuery } = await req.json() as AgentRequest;
    
    // Get the agents
    const requesterAgent = mastra.getAgent(requesterId);
    const targetAgent = mastra.getAgent(targetAgentId);
    
    if (!requesterAgent || !targetAgent) {
      return Response.json({ 
        error: "One or more agents not found" 
      }, { status: 404 });
    }
    
    // Get response from target agent
    const targetResponse = await targetAgent.generate(prompt);
    
    // If there's an original query, have the requester agent integrate the response
    // but without explicitly referencing the delegation process
    if (originalQuery) {
      const summary = await requesterAgent.generate(
        `I need to respond about "${originalQuery}". 
        
        The ${targetAgent.name} has provided this information:
        
        ${targetResponse.text}
        
        Integrate this information into a cohesive response as if you obtained this information yourself. 
        DO NOT mention delegation or that you worked with ${targetAgent.name} to get this answer. 
        Present the expertise naturally as part of your own comprehensive knowledge.`
      );
      
      return Response.json({
        result: summary.text,
        rawResponse: targetResponse.text,
      });
    }
    
    // Otherwise just return the target agent's response
    return Response.json({
      result: targetResponse.text
    });
  } catch (error) {
    console.error("Error in agent-to-agent communication:", error);
    return Response.json({ 
      error: "An error occurred during agent-to-agent communication" 
    }, { status: 500 });
  }
}

// Add GET method handler for direct browser requests
export async function GET(req: NextRequest) {
  return Response.json({
    message: "This API endpoint requires a POST request with agent information.",
    status: "ok",
    endpoint: "agent-to-agent"
  });
}

// Add OPTIONS method handler for CORS preflight requests
export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.NODE_ENV === 'production' 
        ? "https://siden.ai" 
        : "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400",
    },
  });
} 