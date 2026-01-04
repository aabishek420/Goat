import React from "react";
import { X } from "lucide-react";

interface NotificationProps {
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-center text-gray-500 mt-10">
          <p>No new notifications</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
