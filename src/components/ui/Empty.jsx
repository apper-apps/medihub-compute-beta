import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing to show here yet.", 
  actionLabel,
  onAction,
  icon = "Database",
  className = "" 
}) => {
  return (
    <Card className={`text-center py-12 ${className}`}>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
            <ApperIcon name={icon} className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 max-w-md">{description}</p>
          </div>
          {actionLabel && onAction && (
            <Button onClick={onAction} className="mt-4">
              <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Empty;