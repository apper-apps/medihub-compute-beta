import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import PatientTable from "@/components/organisms/PatientTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { patientsService } from "@/services/api/patientsService";
import { toast } from "react-toastify";
import AddPatientModal from "@/components/organisms/AddPatientModal";

const Patients = () => {
  const navigate = useNavigate();
const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const loadPatients = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await patientsService.getAll();
      setPatients(data);
      setFilteredPatients(data);
    } catch (err) {
      console.error("Failed to load patients:", err);
      setError("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPatients(patients);
} else {
      const filtered = patients.filter(patient => 
        patient.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.Id?.toString().includes(searchQuery)
      );
      setFilteredPatients(filtered);
    }
  }, [searchQuery, patients]);

const handleAddPatient = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handlePatientAdded = () => {
    loadPatients(); // Refresh the patient list
    setShowAddModal(false);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPatients} />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Patients</h1>
          <p className="mt-2 text-slate-600">
            Manage patient records and medical information
          </p>
        </div>
        <Button onClick={handleAddPatient} className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add New Patient</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search patients by name or ID..."
                className="w-full"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ApperIcon name="Download" className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-soft p-4">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ApperIcon name="Users" className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-600">Total Patients</p>
              <p className="text-xl font-bold text-slate-900">{patients.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-soft p-4">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ApperIcon name="UserCheck" className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-600">Admitted</p>
              <p className="text-xl font-bold text-slate-900">
                {patients.filter(p => p.status === "admitted").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-soft p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-50 rounded-lg">
              <ApperIcon name="AlertTriangle" className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-600">Emergency</p>
              <p className="text-xl font-bold text-slate-900">
                {patients.filter(p => p.status === "emergency").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-soft p-4">
          <div className="flex items-center">
            <div className="p-2 bg-slate-50 rounded-lg">
              <ApperIcon name="UserMinus" className="h-5 w-5 text-slate-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-600">Discharged</p>
              <p className="text-xl font-bold text-slate-900">
                {patients.filter(p => p.status === "discharged").length}
              </p>
            </div>
          </div>
        </div>
      </div>

{/* Patient Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPatients.length === 0 ? (
            <Empty
              title="No patients found"
              description={searchQuery ? `No patients match "${searchQuery}"` : "No patients have been added yet."}
              actionLabel="Add New Patient"
              onAction={handleAddPatient}
              icon="Users"
            />
          ) : (
            <PatientTable patients={filteredPatients} />
          )}
        </CardContent>
      </Card>

      {/* Add Patient Modal */}
      {showAddModal && (
        <AddPatientModal
          isOpen={showAddModal}
          onClose={handleCloseModal}
          onPatientAdded={handlePatientAdded}
        />
      )}
    </div>
  );
};

export default Patients;