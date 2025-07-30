import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { patientsService } from "@/services/api/patientsService";
import { toast } from "react-toastify";

const AddPatientModal = ({ isOpen, onClose, onPatientAdded }) => {
  const [formData, setFormData] = useState({
    Name: "",
    age: "",
    gender: "",
    phone: "",
    emergency: "",
    admissionDate: new Date().toISOString().split('T')[0],
    assignedDoctor: "",
    status: "admitted",
    roomNumber: "",
    diagnosis: "",
    bloodType: "",
    Tags: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Name.trim()) {
      newErrors.Name = "Patient name is required";
    }
    
    if (!formData.age || formData.age < 1 || formData.age > 150) {
      newErrors.age = "Please enter a valid age between 1 and 150";
    }
    
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.assignedDoctor.trim()) {
      newErrors.assignedDoctor = "Assigned doctor is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setLoading(true);
    
    try {
      const result = await patientsService.create(formData);
      
      if (result) {
        toast.success("Patient added successfully!");
        onPatientAdded();
      } else {
        toast.error("Failed to add patient. Please try again.");
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error("An error occurred while adding the patient");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      Name: "",
      age: "",
      gender: "",
      phone: "",
      emergency: "",
      admissionDate: new Date().toISOString().split('T')[0],
      assignedDoctor: "",
      status: "admitted",
      roomNumber: "",
      diagnosis: "",
      bloodType: "",
      Tags: ""
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ApperIcon name="UserPlus" size={20} />
                Add New Patient
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                disabled={loading}
              >
                <ApperIcon name="X" size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  id="name"
                  label="Patient Name"
                  type="text"
                  value={formData.Name}
                  onChange={(e) => handleInputChange("Name", e.target.value)}
                  placeholder="Enter patient's full name"
                  required
                  error={errors.Name}
                />
                
                <FormField
                  id="age"
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Enter age"
                  required
                  error={errors.age}
                />
                
                <FormField
                  id="gender"
                  label="Gender"
                  type="text"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  placeholder="Enter gender"
                  required
                  error={errors.gender}
                />
                
                <FormField
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  required
                  error={errors.phone}
                />
                
                <FormField
                  id="emergency"
                  label="Emergency Contact"
                  type="text"
                  value={formData.emergency}
                  onChange={(e) => handleInputChange("emergency", e.target.value)}
                  placeholder="Emergency contact details"
                  error={errors.emergency}
                />
                
                <FormField
                  id="admissionDate"
                  label="Admission Date"
                  type="date"
                  value={formData.admissionDate}
                  onChange={(e) => handleInputChange("admissionDate", e.target.value)}
                  error={errors.admissionDate}
                />
                
                <FormField
                  id="assignedDoctor"
                  label="Assigned Doctor"
                  type="text"
                  value={formData.assignedDoctor}
                  onChange={(e) => handleInputChange("assignedDoctor", e.target.value)}
                  placeholder="Enter doctor's name"
                  required
                  error={errors.assignedDoctor}
                />
                
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-1">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="admitted">Admitted</option>
                    <option value="emergency">Emergency</option>
                    <option value="discharged">Discharged</option>
                  </select>
                  {errors.status && (
                    <p className="text-sm text-red-600">{errors.status}</p>
                  )}
                </div>
                
                <FormField
                  id="roomNumber"
                  label="Room Number"
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) => handleInputChange("roomNumber", e.target.value)}
                  placeholder="Enter room number"
                  error={errors.roomNumber}
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="bloodType" className="text-sm font-medium text-slate-700">
                    Blood Type
                  </label>
                  <select
                    id="bloodType"
                    value={formData.bloodType}
                    onChange={(e) => handleInputChange("bloodType", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select blood type</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                  </select>
                  {errors.bloodType && (
                    <p className="text-sm text-red-600">{errors.bloodType}</p>
                  )}
                </div>
                
                <FormField
                  id="diagnosis"
                  label="Diagnosis"
                  type="text"
                  value={formData.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  placeholder="Enter initial diagnosis"
                  error={errors.diagnosis}
                />
                
                <FormField
                  id="tags"
                  label="Tags"
                  type="text"
                  value={formData.Tags}
                  onChange={(e) => handleInputChange("Tags", e.target.value)}
                  placeholder="Enter tags (comma-separated)"
                  error={errors.Tags}
                />
              </div>
              
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding Patient...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ApperIcon name="UserPlus" size={16} />
                      Add Patient
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddPatientModal;