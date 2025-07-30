import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="mt-2 text-slate-600">
            Generate insights and reports for hospital operations
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Generate Report</span>
        </Button>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-medium transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Users" className="h-5 w-5 text-primary-500" />
              <span>Patient Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4">
              Patient demographics, admission trends, and outcome statistics.
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="DollarSign" className="h-5 w-5 text-emerald-500" />
              <span>Financial Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4">
              Revenue analysis, billing summaries, and payment tracking.
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Activity" className="h-5 w-5 text-sky-500" />
              <span>Operational Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4">
              Bed occupancy, staff utilization, and department performance.
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Calendar" className="h-5 w-5 text-amber-500" />
              <span>Appointment Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4">
              Scheduling efficiency, no-show rates, and booking patterns.
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Package" className="h-5 w-5 text-purple-500" />
              <span>Inventory Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4">
              Stock levels, usage patterns, and supply chain analytics.
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Shield" className="h-5 w-5 text-red-500" />
              <span>Quality Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4">
              Patient safety metrics, compliance, and quality indicators.
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardContent className="text-center py-16">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="BarChart3" className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Advanced Analytics Dashboard</h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Comprehensive reporting system with real-time analytics, custom report generation, 
            and data visualization tools for informed decision-making.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>
              <ApperIcon name="BarChart3" className="h-4 w-4 mr-2" />
              View Dashboard
            </Button>
            <Button variant="outline">
              <ApperIcon name="Download" className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Report Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border-l-4 border-primary-500 bg-primary-50">
              <ApperIcon name="FileText" className="h-4 w-4 text-primary-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Monthly Patient Report</p>
                <p className="text-xs text-slate-600">Generated by Dr. Smith</p>
              </div>
              <span className="text-xs text-slate-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border-l-4 border-emerald-500 bg-emerald-50">
              <ApperIcon name="DollarSign" className="h-4 w-4 text-emerald-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Financial Summary Q1</p>
                <p className="text-xs text-slate-600">Generated by Finance Team</p>
              </div>
              <span className="text-xs text-slate-500">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 border-l-4 border-amber-500 bg-amber-50">
              <ApperIcon name="Package" className="h-4 w-4 text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Inventory Audit Report</p>
                <p className="text-xs text-slate-600">Generated by Pharmacy</p>
              </div>
              <span className="text-xs text-slate-500">3 days ago</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold text-slate-900">156</p>
                <p className="text-sm text-slate-600">Reports Generated</p>
                <p className="text-xs text-emerald-600">This month</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold text-slate-900">24</p>
                <p className="text-sm text-slate-600">Scheduled Reports</p>
                <p className="text-xs text-primary-600">Auto-generated</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-sm text-slate-600">Custom Templates</p>
                <p className="text-xs text-amber-600">User created</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold text-slate-900">92%</p>
                <p className="text-sm text-slate-600">Accuracy Rate</p>
                <p className="text-xs text-emerald-600">Data quality</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;