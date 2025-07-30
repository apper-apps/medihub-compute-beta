import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';
import appointmentService from '@/services/api/appointmentService';
import patientsService from '@/services/api/patientsService';

const AppointmentModal = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  appointment = null, 
  selectedDate = null 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    patientId: '',
    doctor: '',
    dateTime: '',
    duration: 30,
    notes: ''
  });
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [errors, setErrors] = useState({});

  // Load patients for dropdown
  useEffect(() => {
    if (isOpen) {
      loadPatients();
    }
  }, [isOpen]);

  // Pre-populate form for editing
  useEffect(() => {
    if (appointment) {
      setFormData({
        title: appointment.Name || '',
        patientId: appointment.patientId?.Id || appointment.patientId || '',
        doctor: appointment.user || '',
        dateTime: appointment.timestamp ? new Date(appointment.timestamp).toISOString().slice(0, 16) : '',
        duration: 30,
        notes: appointment.description || ''
      });
    } else if (selectedDate) {
      const date = new Date(selectedDate);
      date.setHours(9, 0, 0, 0); // Default to 9 AM
      setFormData(prev => ({
        ...prev,
        dateTime: date.toISOString().slice(0, 16)
      }));
    }
  }, [appointment, selectedDate]);

  const loadPatients = async () => {
    setLoadingPatients(true);
    try {
      const patientsData = await patientsService.getAll();
      setPatients(patientsData || []);
    } catch (error) {
      console.error('Error loading patients:', error);
      toast.error('Failed to load patients');
    } finally {
      setLoadingPatients(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Appointment title is required';
    }

    if (!formData.patientId) {
      newErrors.patientId = 'Please select a patient';
    }

    if (!formData.doctor.trim()) {
      newErrors.doctor = 'Doctor name is required';
    }

    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time are required';
    } else {
      const appointmentDate = new Date(formData.dateTime);
      const now = new Date();
      if (appointmentDate < now) {
        newErrors.dateTime = 'Appointment cannot be scheduled in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Check for time conflicts
      const hasConflict = await appointmentService.checkTimeConflict(
        formData.dateTime, 
        formData.duration, 
        appointment?.Id
      );

      if (hasConflict) {
        toast.error('This time slot conflicts with an existing appointment');
        setLoading(false);
        return;
      }

      const appointmentData = {
        title: formData.title,
        patientId: formData.patientId,
        doctor: formData.doctor,
        timestamp: new Date(formData.dateTime).toISOString(),
        notes: formData.notes
      };

      let result;
      if (appointment) {
        // Update existing appointment
        result = await appointmentService.update(appointment.Id, appointmentData);
        if (result) {
          toast.success('Appointment updated successfully');
        } else {
          toast.error('Failed to update appointment');
        }
      } else {
        // Create new appointment
        result = await appointmentService.create(appointmentData);
        if (result) {
          toast.success('Appointment scheduled successfully');
        } else {
          toast.error('Failed to schedule appointment');
        }
      }

      if (result) {
        onSuccess && onSuccess();
        handleClose();
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      toast.error('Failed to save appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      patientId: '',
      doctor: '',
      dateTime: '',
      duration: 30,
      notes: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <ApperIcon name="Calendar" className="h-5 w-5 text-primary-500" />
              <span>{appointment ? 'Edit Appointment' : 'Schedule Appointment'}</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <ApperIcon name="X" className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Appointment Title */}
            <div>
              <Label htmlFor="title">Appointment Title</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Regular Checkup"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Patient Selection */}
            <div>
              <Label htmlFor="patientId">Patient</Label>
              <select
                id="patientId"
                value={formData.patientId}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.patientId ? 'border-red-500' : 'border-slate-300'
                }`}
                disabled={loadingPatients}
              >
                <option value="">
                  {loadingPatients ? 'Loading patients...' : 'Select a patient'}
                </option>
                {patients.map((patient) => (
                  <option key={patient.Id} value={patient.Id}>
                    {patient.Name}
                  </option>
                ))}
              </select>
              {errors.patientId && (
                <p className="text-red-500 text-sm mt-1">{errors.patientId}</p>
              )}
            </div>

            {/* Doctor */}
            <div>
              <Label htmlFor="doctor">Doctor</Label>
              <Input
                id="doctor"
                type="text"
                value={formData.doctor}
                onChange={(e) => handleInputChange('doctor', e.target.value)}
                placeholder="Dr. Smith"
                className={errors.doctor ? 'border-red-500' : ''}
              />
              {errors.doctor && (
                <p className="text-red-500 text-sm mt-1">{errors.doctor}</p>
              )}
            </div>

            {/* Date and Time */}
            <div>
              <Label htmlFor="dateTime">Date & Time</Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) => handleInputChange('dateTime', e.target.value)}
                className={errors.dateTime ? 'border-red-500' : ''}
              />
              {errors.dateTime && (
                <p className="text-red-500 text-sm mt-1">{errors.dateTime}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes or instructions..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    {appointment ? 'Updating...' : 'Scheduling...'}
                  </>
                ) : (
                  <>
                    <ApperIcon name="Check" className="h-4 w-4 mr-2" />
                    {appointment ? 'Update' : 'Schedule'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentModal;