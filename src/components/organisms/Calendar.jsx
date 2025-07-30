import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
         addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const Calendar = ({ appointments = [], onDateClick, onAppointmentClick, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day

  // Navigate to previous period
  const navigatePrevious = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  // Navigate to next period
  const navigateNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  // Navigate to today
  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.timestamp);
      return isSameDay(appointmentDate, date);
    });
  };

  // Render month view
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    // Create calendar grid
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayAppointments = getAppointmentsForDate(day);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day}
            className={`min-h-[120px] border border-slate-200 p-2 cursor-pointer hover:bg-slate-50 transition-colors
              ${!isCurrentMonth ? 'text-slate-400 bg-slate-50' : ''}
              ${isSelected ? 'bg-primary-50 border-primary-300' : ''}
              ${isToday ? 'bg-sky-50 border-sky-300' : ''}
            `}
            onClick={() => onDateClick && onDateClick(cloneDay)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-medium ${isToday ? 'text-sky-600' : ''}`}>
                {format(day, dateFormat)}
              </span>
              {dayAppointments.length > 0 && (
                <span className="bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {dayAppointments.length}
                </span>
              )}
            </div>
            
            {/* Appointment indicators */}
            <div className="space-y-1">
              {dayAppointments.slice(0, 3).map((appointment, index) => (
                <div
                  key={appointment.Id}
                  className="bg-primary-100 text-primary-800 text-xs p-1 rounded truncate hover:bg-primary-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAppointmentClick && onAppointmentClick(appointment);
                  }}
                >
                  {format(new Date(appointment.timestamp), 'HH:mm')} - {appointment.Name}
                </div>
              ))}
              {dayAppointments.length > 3 && (
                <div className="text-xs text-slate-500">
                  +{dayAppointments.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div>
        {/* Week day headers */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-slate-600 border-b">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          {rows}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const dayAppointments = getAppointmentsForDate(day);
      const isSelected = selectedDate && isSameDay(day, selectedDate);
      const isToday = isSameDay(day, new Date());

      days.push(
        <div key={day} className="border border-slate-200 min-h-[400px]">
          <div 
            className={`p-3 border-b cursor-pointer hover:bg-slate-50 transition-colors
              ${isSelected ? 'bg-primary-50' : ''}
              ${isToday ? 'bg-sky-50' : ''}
            `}
            onClick={() => onDateClick && onDateClick(day)}
          >
            <div className="text-center">
              <div className="text-xs text-slate-500">{format(day, 'EEE')}</div>
              <div className={`text-lg font-semibold ${isToday ? 'text-sky-600' : ''}`}>
                {format(day, 'd')}
              </div>
            </div>
          </div>
          
          <div className="p-2 space-y-1">
            {dayAppointments.map((appointment) => (
              <div
                key={appointment.Id}
                className="bg-primary-100 text-primary-800 text-sm p-2 rounded cursor-pointer hover:bg-primary-200 transition-colors"
                onClick={() => onAppointmentClick && onAppointmentClick(appointment)}
              >
                <div className="font-medium">{format(new Date(appointment.timestamp), 'HH:mm')}</div>
                <div className="truncate">{appointment.Name}</div>
                {appointment.patientId?.Name && (
                  <div className="text-xs text-primary-600">{appointment.patientId.Name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 border border-slate-200 rounded-lg overflow-hidden">
        {days}
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(currentDate);
    const isToday = isSameDay(currentDate, new Date());

    return (
      <div className="border border-slate-200 rounded-lg">
        <div className={`p-4 border-b ${isToday ? 'bg-sky-50' : 'bg-slate-50'}`}>
          <h3 className="text-lg font-semibold">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </h3>
        </div>
        
        <div className="p-4">
          {dayAppointments.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <ApperIcon name="Calendar" className="h-12 w-12 mx-auto mb-2 text-slate-300" />
              <p>No appointments scheduled for this day</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayAppointments
                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                .map((appointment) => (
                  <div
                    key={appointment.Id}
                    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-medium transition-shadow cursor-pointer"
                    onClick={() => onAppointmentClick && onAppointmentClick(appointment)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <ApperIcon name="Clock" className="h-4 w-4 text-slate-500" />
                          <span className="font-medium text-primary-600">
                            {format(new Date(appointment.timestamp), 'HH:mm')}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-1">{appointment.Name}</h4>
                        {appointment.patientId?.Name && (
                          <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <ApperIcon name="User" className="h-4 w-4" />
                            <span>{appointment.patientId.Name}</span>
                          </div>
                        )}
                        {appointment.user && (
                          <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <ApperIcon name="UserCheck" className="h-4 w-4" />
                            <span>{appointment.user}</span>
                          </div>
                        )}
                        {appointment.description && (
                          <p className="text-sm text-slate-600 mt-2">{appointment.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const getViewTitle = () => {
    switch (view) {
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'week':
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy');
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-slate-900">{getViewTitle()}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={navigateToday}
          >
            Today
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View switcher */}
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            {['month', 'week', 'day'].map((viewType) => (
              <Button
                key={viewType}
                variant={view === viewType ? "default" : "ghost"}
                size="sm"
                onClick={() => setView(viewType)}
                className="rounded-none border-0"
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </Button>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={navigatePrevious}
              className="h-8 w-8 p-0"
            >
              <ApperIcon name="ChevronLeft" className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={navigateNext}
              className="h-8 w-8 p-0"
            >
              <ApperIcon name="ChevronRight" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div>
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>
    </div>
  );
};

export default Calendar;