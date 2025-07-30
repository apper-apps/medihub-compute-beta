import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Appointments = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="mt-2 text-slate-600">
            Schedule and manage patient appointments
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Schedule Appointment</span>
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardContent className="text-center py-16">
          <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Calendar" className="h-10 w-10 text-sky-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Appointment Management</h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Schedule, manage, and track patient appointments with an integrated calendar system. 
            View daily, weekly, and monthly schedules with automated reminders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>
              <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button variant="outline">
              <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
              Today's Schedule
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="CalendarDays" className="h-5 w-5 text-primary-500" />
              <span>Daily Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm">
              View and manage today's appointments with patient details and time slots.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Bell" className="h-5 w-5 text-amber-500" />
              <span>Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm">
              Automated appointment reminders for patients via SMS and email notifications.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Users" className="h-5 w-5 text-emerald-500" />
              <span>Doctor Availability</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm">
              Track doctor schedules and availability for efficient appointment booking.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;