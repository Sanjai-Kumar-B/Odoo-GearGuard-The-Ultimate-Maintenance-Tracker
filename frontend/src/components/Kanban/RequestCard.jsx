import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, User, AlertCircle } from 'lucide-react';

const RequestCard = ({ request, index }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'border-red-500';
      case 'High':
        return 'border-orange-500';
      case 'Medium':
        return 'border-yellow-500';
      case 'Low':
        return 'border-green-500';
      default:
        return 'border-gray-300';
    }
  };

  const isOverdue = () => {
    if (!request.scheduledDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scheduled = new Date(request.scheduledDate);
    scheduled.setHours(0, 0, 0, 0);
    return scheduled < today && request.stage !== 'Repaired' && request.stage !== 'Scrap';
  };

  const overdue = isOverdue();

  return (
    <Draggable draggableId={request._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white rounded-lg shadow-sm border-l-4 p-4 mb-3
            ${getPriorityColor(request.priority)}
            ${overdue ? 'bg-red-50' : ''}
            ${snapshot.isDragging ? 'shadow-lg rotate-2' : ''}
            transition-all duration-200 hover:shadow-md
          `}
        >
          {overdue && (
            <div className="flex items-center gap-2 mb-2 text-red-600 text-sm font-semibold">
              <AlertCircle size={16} />
              <span>OVERDUE</span>
            </div>
          )}
          
          <h4 className="font-semibold text-gray-900 mb-2">{request.subject}</h4>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">{request.equipmentName}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{request.assignedTechnician}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{request.scheduledDate}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-3">
            <span
              className={`
                px-2 py-1 text-xs font-semibold rounded-full
                ${
                  request.priority === 'Critical'
                    ? 'bg-red-100 text-red-800'
                    : request.priority === 'High'
                    ? 'bg-orange-100 text-orange-800'
                    : request.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }
              `}
            >
              {request.priority}
            </span>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {request.type}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default RequestCard;
