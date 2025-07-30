import { toast } from 'react-toastify';

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const patientsService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "age" } },
          { field: { Name: "gender" } },
          { field: { Name: "phone" } },
          { field: { Name: "emergency" } },
          { field: { Name: "admissionDate" } },
          { field: { Name: "assignedDoctor" } },
          { field: { Name: "status" } },
          { field: { Name: "roomNumber" } },
          { field: { Name: "diagnosis" } },
          { field: { Name: "bloodType" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords('patient', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching patients:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "age" } },
          { field: { Name: "gender" } },
          { field: { Name: "phone" } },
          { field: { Name: "emergency" } },
          { field: { Name: "admissionDate" } },
          { field: { Name: "assignedDoctor" } },
          { field: { Name: "status" } },
          { field: { Name: "roomNumber" } },
          { field: { Name: "diagnosis" } },
          { field: { Name: "bloodType" } }
        ]
      };

      const response = await apperClient.getRecordById('patient', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching patient with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async getPatientActivities(patientId) {
    try {
      const { activitiesService } = await import('./activitiesService');
      const allActivities = await activitiesService.getAll();
      return allActivities.filter(activity => activity.patientId === patientId);
    } catch (error) {
      console.error("Error fetching patient activities:", error.message);
      return [];
    }
  },

  async create(patientData) {
    try {
      const apperClient = getApperClient();
      
      // Only include Updateable fields
      const updateableData = {
        Name: patientData.Name,
        Tags: patientData.Tags,
        Owner: patientData.Owner ? parseInt(patientData.Owner) : undefined,
        age: patientData.age ? parseInt(patientData.age) : undefined,
        gender: patientData.gender,
        phone: patientData.phone,
        emergency: patientData.emergency,
        admissionDate: patientData.admissionDate || new Date().toISOString().split('T')[0],
        assignedDoctor: patientData.assignedDoctor,
        status: patientData.status || "admitted",
        roomNumber: patientData.roomNumber,
        diagnosis: patientData.diagnosis,
        bloodType: patientData.bloodType
      };

      // Remove undefined fields
      Object.keys(updateableData).forEach(key => {
        if (updateableData[key] === undefined) {
          delete updateableData[key];
        }
      });

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord('patient', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} patient records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating patient:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, patientData) {
    try {
      const apperClient = getApperClient();
      
      // Only include Updateable fields
      const updateableData = {
        Id: id,
        Name: patientData.Name,
        Tags: patientData.Tags,
        Owner: patientData.Owner ? parseInt(patientData.Owner) : undefined,
        age: patientData.age ? parseInt(patientData.age) : undefined,
        gender: patientData.gender,
        phone: patientData.phone,
        emergency: patientData.emergency,
        admissionDate: patientData.admissionDate,
        assignedDoctor: patientData.assignedDoctor,
        status: patientData.status,
        roomNumber: patientData.roomNumber,
        diagnosis: patientData.diagnosis,
        bloodType: patientData.bloodType
      };

      // Remove undefined fields
      Object.keys(updateableData).forEach(key => {
        if (updateableData[key] === undefined) {
          delete updateableData[key];
        }
      });

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord('patient', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} patient records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating patient:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('patient', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} patient records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting patient:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};