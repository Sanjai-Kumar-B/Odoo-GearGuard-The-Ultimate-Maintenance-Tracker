import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Users, Wrench } from "lucide-react";

const StatCard = ({ title, value, subtitle, type, onClick }) => {
  const getColorClasses = () => {
    switch (type) {
      case "critical":
        return "border-red-500 bg-red-50";
      case "info":
        return "border-blue-500 bg-blue-50";
      case "success":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-300 bg-white";
    }
  };

  const getIcon = () => {
    const iconProps = { className: "w-8 h-8" };
    switch (type) {
      case "critical":
        return (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <AlertCircle {...iconProps} className="w-8 h-8 text-red-500" />
          </motion.div>
        );
      case "info":
        return <Users {...iconProps} className="w-8 h-8 text-blue-500" />;
      case "success":
        return <Wrench {...iconProps} className="w-8 h-8 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      whileTap={{ scale: 0.98 }}
      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${getColorClasses()}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <motion.p
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold mt-2"
          >
            {value}
          </motion.p>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          {getIcon()}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatCard;
