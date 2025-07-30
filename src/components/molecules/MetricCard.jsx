import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ label, value, trend, icon, trendDirection = "up" }) => {
  const getTrendColor = () => {
    if (trendDirection === "up") return "text-emerald-600";
    if (trendDirection === "down") return "text-red-600";
    return "text-slate-600";
  };

  const getTrendIcon = () => {
    if (trendDirection === "up") return "TrendingUp";
    if (trendDirection === "down") return "TrendingDown";
    return "Minus";
  };

  return (
    <Card className="hover:shadow-medium transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <ApperIcon name={icon} className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
          {trend !== undefined && (
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              <ApperIcon name={getTrendIcon()} className="h-4 w-4" />
              <span className="text-sm font-medium">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;