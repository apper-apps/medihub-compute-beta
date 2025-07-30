import React, { useState, useEffect } from "react";
import MetricCard from "@/components/molecules/MetricCard";
import ActivityFeed from "@/components/organisms/ActivityFeed";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { metricsService } from "@/services/api/metricsService";
import { activitiesService } from "@/services/api/activitiesService";

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setError("");
      setLoading(true);
      
      const [metricsData, activitiesData] = await Promise.all([
        metricsService.getAll(),
        activitiesService.getAll()
      ]);
      
      setMetrics(metricsData);
      setActivities(activitiesData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome back! Here's what's happening at your hospital today.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.Id}
            label={metric.label}
            value={metric.value}
            trend={metric.trend}
            icon={metric.icon}
            trendDirection={metric.trend > 0 ? "up" : metric.trend < 0 ? "down" : "neutral"}
          />
        ))}
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} />
        </div>
        
        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Today's Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-primary-100">New Admissions</span>
                <span className="text-xl font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-100">Scheduled Surgeries</span>
                <span className="text-xl font-bold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-100">Emergency Cases</span>
                <span className="text-xl font-bold">3</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Bed Occupancy</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">ICU</span>
                  <span className="text-slate-900">18/20</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">General Ward</span>
                  <span className="text-slate-900">45/60</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Emergency</span>
                  <span className="text-slate-900">8/15</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "53%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;