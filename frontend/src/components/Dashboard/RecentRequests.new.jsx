import React from "react";
import { useNavigate } from "react-router-dom";

const RecentRequests = ({ requests }) => {
  const navigate = useNavigate();

  const getStageColor = (stage) => {
    const colors = {
      New: "bg-blue-100 text-blue-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Repaired: "bg-green-100 text-green-800",
      Scrap: "bg-red-100 text-red-800",
    };
    return colors[stage] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Critical: "text-red-600 font-semibold",
      High: "text-orange-600 font-medium",
      Medium: "text-yellow-600",
      Low: "text-green-600",
    };
    return colors[priority] || "text-gray-600";
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No recent maintenance requests
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Equipment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Technician
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Scheduled
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr
              key={request._id}
              onClick={() => navigate("/maintenance")}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {request.subject}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">
                  {request.equipmentName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">
                  {request.assignedTechnician}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm ${getPriorityColor(request.priority)}`}>
                  {request.priority}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(
                    request.stage
                  )}`}
                >
                  {request.stage}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(request.scheduledDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentRequests;
