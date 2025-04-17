// Project related types
export interface ChatConfig {
  model: string;
  temperature: number;
  max_tokens: number;
  system_prompt: string;
  tools_enabled: boolean;
}

export interface Service {
  id: string;
  name: string;
  type: 'api' | 'database' | 'storage' | 'other';
  endpoint?: string;
  api_key?: string;
  status: 'connected' | 'error' | 'pending';
  error_message?: string;
}

export interface ProjectIntegration {
  connected: boolean;
  services: Service[];
}

export interface NotificationSettings {
  email_notifications: boolean;
  daily_summary: boolean;
  agent_activity_alerts: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  agents: number;
  agentIds?: string[]; // Array of agent IDs selected for this project
  status: string;
  lastActive: string;
  progress: number;
  tags: string[];
  chatConfig?: ChatConfig;
  integrations?: ProjectIntegration;
  notificationSettings?: NotificationSettings;
  teamMembers?: TeamMember[]; // Team members who have access to this project
}

// Agent related types
export interface AgentRole {
  id: string;
  name: string;
  icon: string;
  description: string;
  capabilities: string[];
  recommended: boolean;
}

export interface AgentTool {
  name: string;
  icon: string;
}

// User related types
export interface User {
  username: string;
  email: string;
  plan: string;
}

// Search and filtering
export type FilterType = 'all' | 'active' | 'archived'; 