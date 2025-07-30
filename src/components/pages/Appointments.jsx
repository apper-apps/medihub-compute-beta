import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import Calendar from "@/components/organisms/Calendar";
import AppointmentModal from "@/components/organisms/AppointmentModal";
import appointmentService from "@/services/api/appointmentService";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Load appointments on component mount
  useEffect(() => {
    if (showCalendar) {
      loadAppointments();
    }
  }, [showCalendar]);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const appointmentsData = await appointmentService.getAll();
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCalendar = () => {
    setShowCalendar(true);
  };

  const handleBackToOverview = () => {
    setShowCalendar(false);
    setSelectedAppointment(null);
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedAppointment(null);
    setShowModal(true);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDate(null);
    setShowModal(true);
  };

  const handleScheduleNew = () => {
    setSelectedAppointment(null);
    setSelectedDate(new Date());
    setShowModal(true);
  };

  const handleModalSuccess = () => {
    loadAppointments();
    setShowModal(false);
    setSelectedAppointment(null);
    setSelectedDate(null);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const success = await appointmentService.delete(appointmentId);
      if (success) {
        toast.success('Appointment deleted successfully');
        loadAppointments();
        setDeleteConfirm(null);
      } else {
        toast.error('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
    }
  };

  // If calendar view is active, show calendar interface
  if (showCalendar) {
    return (
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={handleBackToOverview}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" className="h-4 w-4" />
              <span>Back to Overview</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Appointment Calendar</h1>
              <p className="mt-1 text-slate-600">
                Click on a date to schedule or view appointments
              </p>
            </div>
          </div>
          <Button 
            onClick={handleScheduleNew}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>Schedule Appointment</span>
          </Button>
        </div>

        {/* Calendar Component */}
        {isLoading ? (
          <Card>
            <CardContent className="text-center py-16">
              <ApperIcon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-500" />
              <p className="text-slate-600">Loading appointments...</p>
            </CardContent>
          </Card>
        ) : (
          <Calendar
            appointments={appointments}
            onDateClick={handleDateClick}
            onAppointmentClick={handleAppointmentClick}
            selectedDate={selectedDate}
          />
        )}

        {/* Appointment Modal */}
        <AppointmentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleModalSuccess}
          appointment={selectedAppointment}
          selectedDate={selectedDate}
        />

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ApperIcon name="AlertTriangle" className="h-5 w-5 text-red-500" />
                  <span>Delete Appointment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to delete this appointment? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteAppointment(deleteConfirm)}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

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
            <Button onClick={handleViewCalendar} disabled={isLoading}>
              {isLoading ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                  View Calendar
                </>
              )}
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