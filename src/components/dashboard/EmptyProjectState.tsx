import React from 'react';
import { PlusCircle } from 'lucide-react';

interface EmptyProjectStateProps {
  onCreateProject: () => void;
}

const EmptyProjectState: React.FC<EmptyProjectStateProps> = ({ onCreateProject }) => {
  return (
    <div className="text-center max-w-lg mx-auto py-16 px-8">
      <div className="w-15 h-15 rounded-full  flex items-center justify-center mx-auto mb-6">
        <svg 
          viewBox="0 0 200 231" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path d="M89.8642 1.68307C107.103 -3.15709 122.632 2.55323 132.745 17.3812C140.912 29.3564 146.53 42.7334 153.23 55.5137C164.766 77.5202 176.336 99.5105 187.654 121.63C192.879 131.841 196.858 142.684 196.995 154.259C197.276 178.021 185.475 195.466 166.54 208.395C151.007 219.002 133.217 222.9 114.713 224.015C114.256 224.043 113.782 223.768 113.07 223.563C113.653 219.825 116.488 217.479 118.324 214.623C133.64 190.804 143.269 165.193 141.97 136.444C141.26 120.757 137.075 105.911 126.947 93.4676C114.348 77.9874 92.7132 79.519 82.5892 96.7795C73.5867 112.128 73.9425 127.841 83.1151 143.089C86.2182 148.247 89.9239 153.081 93.6944 157.79C104.817 171.682 108.073 186.963 100.855 203.432C93.6455 219.884 80.3776 228.529 62.6235 230.619C31.2068 234.317 6.1904 210.546 1.10154 183.241C-1.85034 167.402 1.37387 152.557 7.87082 138.231C19.8793 111.751 34.8449 86.7875 47.6733 60.7236C54.4948 46.8641 61.3652 33.0236 69.158 19.6703C73.9527 11.4543 80.1781 4.88633 89.8642 1.68307Z" fill="#6466E9"/>
        </svg>      </div>
      <h3 className="text-3xl font-medium mb-4">No projects yet</h3>
      <p className="text-[#A3A3A3] text-lg mb-10 leading-relaxed">
        Start building with AI-powered agents to bring your ideas to life.
      </p>
      <button 
        onClick={onCreateProject}
        className="px-8 py-4 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-colors shadow-lg inline-flex items-center gap-3 text-lg font-medium"
      >
        Create Your First Project
      </button>
    </div>
  );
};

export default EmptyProjectState; 