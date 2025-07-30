import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Staff = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Staff Directory</h1>
          <p className="mt-2 text-slate-600">
            Manage hospital staff information and schedules
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Staff Member</span>
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardContent className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="UserCheck" className="h-10 w-10 text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Staff Management</h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Comprehensive staff directory with roles, departments, schedules, and contact information. 
            Track availability and manage shift assignments efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>
              <ApperIcon name="Users" className="h-4 w-4 mr-2" />
              View All Staff
            </Button>
            <Button variant="outline">
              <ApperIcon name="Search" className="h-4 w-4 mr-2" />
              Search Directory
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Department Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Stethoscope" className="h-5 w-5 text-primary-500" />
              <span>Doctors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">24</p>
            <p className="text-slate-600 text-sm">Licensed physicians</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Heart" className="h-5 w-5 text-red-500" />
              <span>Nurses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">48</p>
            <p className="text-slate-600 text-sm">Registered nurses</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Clipboard" className="h-5 w-5 text-sky-500" />
              <span>Technicians</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">16</p>
            <p className="text-slate-600 text-sm">Medical technicians</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Users" className="h-5 w-5 text-amber-500" />
              <span>Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">32</p>
            <p className="text-slate-600 text-sm">Support staff</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Staff Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                <ApperIcon name="User" className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Staff Profiles</p>
                <p className="text-sm text-slate-600">Complete staff information and credentials</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <ApperIcon name="Calendar" className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Shift Management</p>
                <p className="text-sm text-slate-600">Schedule and track staff shifts</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <ApperIcon name="Award" className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Certifications</p>
                <p className="text-sm text-slate-600">Track licenses and certifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Emergency</span>
                  <span className="text-slate-900">18 staff</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Surgery</span>
                  <span className="text-slate-900">24 staff</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">General Ward</span>
                  <span className="text-slate-900">36 staff</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">ICU</span>
                  <span className="text-slate-900">22 staff</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Staff;