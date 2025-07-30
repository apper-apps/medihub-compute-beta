import React from "react";
import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status, className = "" }) => {
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "admitted":
        return "admitted";
      case "discharged":
        return "discharged";
      case "emergency":
        return "emergency";
      case "stable":
        return "success";
      case "monitoring":
        return "warning";
      case "critical":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || "Unknown";
  };

  return (
    <Badge 
      variant={getStatusVariant(status)} 
      className={className}
    >
      {getStatusText(status)}
    </Badge>
  );
};

export default StatusBadge;