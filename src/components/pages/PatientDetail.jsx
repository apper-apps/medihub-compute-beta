import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import TabNavigation from "@/components/molecules/TabNavigation";
import StatusBadge from "@/components/molecules/StatusBadge";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import ActivityTimeline from "@/components/organisms/ActivityTimeline";
import { patientsService } from "@/services/api/patientsService";
import { toast } from "react-toastify";
import { format } from "date-fns";
const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

const tabs = [
    { id: "overview", label: "Overview" },
    { id: "medical-history", label: "Medical History" },
    { id: "treatment", label: "Current Treatment" },
    { id: "medications", label: "Medications" },
    { id: "lab-results", label: "Lab Results" },
    { id: "notes", label: "Notes" },
    { id: "activity", label: "Activity" }
  ];

  const loadPatient = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await patientsService.getById(parseInt(id));
      setPatient(data);
      setFormData(data);
    } catch (err) {
      console.error("Failed to load patient:", err);
      setError("Failed to load patient details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatient();
  }, [id]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await patientsService.update(parseInt(id), formData);
      setPatient(formData);
      setEditMode(false);
      toast.success("Patient information updated successfully");
    } catch (err) {
      console.error("Failed to save patient:", err);
      toast.error("Failed to save patient information");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(patient);
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPatient} />;
  if (!patient) return <Error message="Patient not found" />;

  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            id="name"
            label="Full Name"
            value={editMode ? formData.name : patient.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={!editMode}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="age"
              label="Age"
              type="number"
              value={editMode ? formData.age : patient.age}
              onChange={(e) => handleInputChange("age", parseInt(e.target.value))}
              disabled={!editMode}
              required
            />
            <FormField
              id="gender"
              label="Gender"
              value={editMode ? formData.gender : patient.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              disabled={!editMode}
              required
            />
          </div>
          <FormField
            id="phone"
            label="Phone"
            value={editMode ? formData.phone : patient.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={!editMode}
            required
          />
          <FormField
            id="emergency"
            label="Emergency Contact"
            value={editMode ? formData.emergency : patient.emergency}
            onChange={(e) => handleInputChange("emergency", e.target.value)}
            disabled={!editMode}
            required
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
              <StatusBadge status={patient.status} />
            </div>
            <FormField
              id="admissionDate"
              label="Admission Date"
              type="date"
              value={editMode ? formData.admissionDate : patient.admissionDate}
              onChange={(e) => handleInputChange("admissionDate", e.target.value)}
              disabled={!editMode}
              required
            />
          </div>
          <FormField
            id="assignedDoctor"
            label="Assigned Doctor"
            value={editMode ? formData.assignedDoctor : patient.assignedDoctor}
            onChange={(e) => handleInputChange("assignedDoctor", e.target.value)}
            disabled={!editMode}
            required
          />
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Room Number</label>
            <p className="text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded-md">
              {patient.roomNumber || "Not assigned"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlaceholderTab = (title, description) => (
    <Card>
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="FileText" className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 max-w-md mx-auto">{description}</p>
        <Button className="mt-4">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add {title}
        </Button>
      </CardContent>
    </Card>
  );

const renderActivityTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="Activity" size={20} />
              Patient Activity Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline patientId={patient?.Id} />
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return renderOverviewTab();
      case "medical-history":
        return renderPlaceholderTab("Medical History", "View and manage patient's medical history, past conditions, and treatments.");
      case "treatment":
        return renderPlaceholderTab("Current Treatment", "Track ongoing treatments, procedures, and recovery progress.");
      case "medications":
        return renderPlaceholderTab("Medications", "Manage current prescriptions, dosages, and medication schedules.");
      case "lab-results":
        return renderPlaceholderTab("Lab Results", "View and track laboratory test results and medical reports.");
      case "notes":
        return renderPlaceholderTab("Clinical Notes", "Add and review clinical notes, observations, and care instructions.");
      case "activity":
        return renderActivityTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/patients")}
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{patient.name}</h1>
            <p className="text-slate-600">
              Patient ID #{patient.Id.toString().padStart(4, "0")} • 
              Admitted {format(new Date(patient.admissionDate), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <ApperIcon name="Edit" className="h-4 w-4 mr-2" />
              Edit Patient
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="px-6"
        />
        <CardContent className="p-6">
          {renderActiveTab()}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetail;