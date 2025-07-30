import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";

const ActivityFeed = ({ activities, className = "" }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "admission":
        return "UserPlus";
      case "discharge":
        return "UserMinus";
      case "appointment":
        return "Calendar";
      case "treatment":
        return "Activity";
      case "prescription":
        return "Pill";
      default:
        return "AlertCircle";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "admission":
        return "text-emerald-600 bg-emerald-50";
      case "discharge":
        return "text-slate-600 bg-slate-50";
      case "appointment":
        return "text-sky-600 bg-sky-50";
      case "treatment":
        return "text-primary-600 bg-primary-50";
      case "prescription":
        return "text-amber-600 bg-amber-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => (
              <li key={activity.Id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActivityColor(activity.type)}`}>
                        <ApperIcon name={getActivityIcon(activity.type)} className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-slate-900">{activity.description}</p>
                        <p className="text-xs text-slate-500">by {activity.user}</p>
                      </div>
                      <div className="whitespace-nowrap text-right text-xs text-slate-500">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;