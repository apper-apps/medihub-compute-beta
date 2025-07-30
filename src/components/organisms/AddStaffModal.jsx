import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { staffService } from "@/services/api/staffService";
import { toast } from "react-toastify";

const AddStaffModal = ({ isOpen, onClose, onStaffAdded, isEdit = false, editData = null }) => {
  const [formData, setFormData] = useState({
    Name: "",
    contactInformation: "",
    role: "",
    Tags: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Pre-populate form when editing
  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        Name: editData.Name || "",
        contactInformation: editData.contactInformation || "",
        role: editData.role || "",
        Tags: editData.Tags || ""
      });
    } else {
      setFormData({
        Name: "",
        contactInformation: "",
        role: "",
        Tags: ""
      });
    }
    setErrors({});
  }, [isEdit, editData, isOpen]);
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Name.trim()) {
      newErrors.Name = "Staff member name is required";
    }
    
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
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
      let result;
      if (isEdit && editData) {
        result = await staffService.update(editData.Id, formData);
      } else {
        result = await staffService.create(formData);
      }
      
      if (result) {
        toast.success(isEdit ? "Staff member updated successfully!" : "Staff member added successfully!");
        onStaffAdded();
        handleCancel();
      } else {
        toast.error(isEdit ? "Failed to update staff member. Please try again." : "Failed to add staff member. Please try again.");
      }
    } catch (error) {
      console.error(isEdit ? "Error updating staff member:" : "Error adding staff member:", error);
      toast.error(error.message || (isEdit ? "An error occurred while updating the staff member" : "An error occurred while adding the staff member"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      Name: "",
      contactInformation: "",
      role: "",
      Tags: ""
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
<CardTitle className="flex items-center gap-2">
                <ApperIcon name={isEdit ? "Edit" : "UserPlus"} size={20} />
                {isEdit ? "Edit Staff Member" : "Add New Staff Member"}
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
              <FormField
                id="name"
                label="Full Name"
                type="text"
                value={formData.Name}
                onChange={(e) => handleInputChange("Name", e.target.value)}
                placeholder="Enter staff member's full name"
                required
                error={errors.Name}
              />
              
              <FormField
                id="role"
                label="Role/Position"
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                placeholder="e.g., Doctor, Nurse, Administrator"
                required
                error={errors.role}
              />
              
              <FormField
                id="contactInformation"
                label="Contact Information"
                type="text"
                value={formData.contactInformation}
                onChange={(e) => handleInputChange("contactInformation", e.target.value)}
                placeholder="Phone number or email"
                error={errors.contactInformation}
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
                      {isEdit ? "Updating Staff..." : "Adding Staff..."}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ApperIcon name={isEdit ? "Save" : "UserPlus"} size={16} />
                      {isEdit ? "Update Staff Member" : "Add Staff Member"}
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

export default AddStaffModal;