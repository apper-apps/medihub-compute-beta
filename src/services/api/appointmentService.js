// Appointment Service - Database integration using ApperClient
class AppointmentService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'app_Activity'; // Using app_Activity table for appointments
  }

  // Get all appointments with optional date filtering
  async getAll(startDate = null, endDate = null) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "description" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "user" } },
          { field: { Name: "patientId" } }
        ],
        where: [
          {
            FieldName: "type",
            Operator: "EqualTo",
            Values: ["appointment"],
            Include: true
          }
        ],
        orderBy: [
          {
            fieldName: "timestamp",
            sorttype: "ASC"
          }
        ]
      };

      // Add date filtering if provided
      if (startDate && endDate) {
        params.where.push({
          FieldName: "timestamp",
          Operator: "GreaterThanOrEqualTo",
          Values: [startDate],
          Include: true
        });
        params.where.push({
          FieldName: "timestamp",
          Operator: "LessThanOrEqualTo",
          Values: [endDate],
          Include: true
        });
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching appointments:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  // Get appointment by ID
  async getById(appointmentId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "description" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "user" } },
          { field: { Name: "patientId" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, appointmentId, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching appointment with ID ${appointmentId}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Create new appointment
  async create(appointmentData) {
    try {
      const params = {
        records: [
          {
            Name: appointmentData.title || appointmentData.Name,
            type: "appointment",
            description: appointmentData.description || appointmentData.notes || "",
            timestamp: appointmentData.timestamp || appointmentData.dateTime,
            user: appointmentData.doctor || appointmentData.user || "",
            patientId: appointmentData.patientId ? parseInt(appointmentData.patientId) : null
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create appointment ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          return null;
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating appointment:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Update appointment
  async update(appointmentId, appointmentData) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(appointmentId),
            Name: appointmentData.title || appointmentData.Name,
            type: "appointment",
            description: appointmentData.description || appointmentData.notes || "",
            timestamp: appointmentData.timestamp || appointmentData.dateTime,
            user: appointmentData.doctor || appointmentData.user || "",
            patientId: appointmentData.patientId ? parseInt(appointmentData.patientId) : null
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update appointment ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          return null;
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating appointment:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Delete appointment
  async delete(appointmentId) {
    try {
      const params = {
        RecordIds: [parseInt(appointmentId)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete appointment ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          return false;
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting appointment:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }

  // Get appointments for a specific date
  async getByDate(date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return this.getAll(startOfDay.toISOString(), endOfDay.toISOString());
  }

  // Check for time conflicts
  async checkTimeConflict(dateTime, duration = 30, excludeId = null) {
    try {
      const appointmentTime = new Date(dateTime);
      const endTime = new Date(appointmentTime.getTime() + (duration * 60 * 1000));
      
      const dayAppointments = await this.getByDate(appointmentTime);
      
      const conflicts = dayAppointments.filter(appointment => {
        if (excludeId && appointment.Id === parseInt(excludeId)) {
          return false;
        }
        
        const appTime = new Date(appointment.timestamp);
        const appEndTime = new Date(appTime.getTime() + (30 * 60 * 1000)); // Assume 30 min default
        
        return (appointmentTime < appEndTime && endTime > appTime);
      });
      
      return conflicts.length > 0;
    } catch (error) {
      console.error("Error checking time conflict:", error.message);
      return false;
    }
  }
}

// Export singleton instance
export default new AppointmentService();