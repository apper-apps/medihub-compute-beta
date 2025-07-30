import React, { useEffect, useState } from "react";
import AddStaffModal from "@/components/organisms/AddStaffModal";
import { staffService } from "@/services/api/staffService";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchStaff = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await staffService.getAll();
      setStaff(result || []);
    } catch (err) {
      console.error("Error fetching staff:", err);
      setError("Failed to load staff members");
      toast.error("Failed to load staff members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleStaffAdded = () => {
    setShowModal(false);
    fetchStaff();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Staff Directory</h1>
          <p className="mt-2 text-slate-600">
            Manage hospital staff information and schedules
          </p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setShowModal(true)}
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Staff Member</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-600">Loading staff members...</span>
          </div>
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ApperIcon name="AlertCircle" size={48} className="text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Staff</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <Button onClick={fetchStaff}>
              <ApperIcon name="RefreshCw" size={16} className="mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : staff.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ApperIcon name="Users" size={48} className="text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Staff Members</h3>
            <p className="text-slate-600 mb-4">Get started by adding your first staff member</p>
            <Button onClick={() => setShowModal(true)}>
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Staff Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <Card key={member.Id} className="hover:shadow-medium transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{member.Name}</h3>
                    <p className="text-sm text-slate-600 font-normal">{member.role}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {member.contactInformation && (
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Phone" size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{member.contactInformation}</span>
                    </div>
                  )}
                  {member.Tags && (
                    <div className="flex items-start gap-2">
                      <ApperIcon name="Tag" size={16} className="text-slate-400 mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {member.Tags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddStaffModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onStaffAdded={handleStaffAdded}
      />
    </div>
  );
};

export default Staff;