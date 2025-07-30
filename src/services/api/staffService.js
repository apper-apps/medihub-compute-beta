// Staff Service for managing hospital staff data operations
class StaffService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'staff';
  }

  // Get all staff members
  async getAll() {
    try {
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "contactInformation"
            }
          },
          {
            field: {
              Name: "role"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching staff:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching staff:", error.message);
        throw error;
      }
    }
  }

  // Get staff member by ID
  async getById(id) {
    try {
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "contactInformation"
            }
          },
          {
            field: {
              Name: "role"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching staff member with ID ${id}:`, error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching staff member with ID ${id}:`, error.message);
        throw error;
      }
    }
  }

  // Create new staff member
  async create(staffData) {
    try {
      // Only include Updateable fields for creation
      const createData = {
        Name: staffData.Name,
        contactInformation: staffData.contactInformation || "",
        role: staffData.role,
        Tags: staffData.Tags || ""
      };

      const params = {
        records: [createData]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} staff records:${JSON.stringify(failedRecords)}`);
          
          // Return the error details for UI handling
          const errorMessages = [];
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              errorMessages.push(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) errorMessages.push(record.message);
          });
          
          if (errorMessages.length > 0) {
            throw new Error(errorMessages.join(', '));
          }
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating staff member:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating staff member:", error.message);
        throw error;
      }
    }
  }

  // Update existing staff member
  async update(id, staffData) {
    try {
      // Only include Updateable fields for update
      const updateData = {
        Id: id,
        Name: staffData.Name,
        contactInformation: staffData.contactInformation,
        role: staffData.role,
        Tags: staffData.Tags || ""
      };

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} staff records:${JSON.stringify(failedUpdates)}`);
          
          // Return the error details for UI handling
          const errorMessages = [];
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              errorMessages.push(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) errorMessages.push(record.message);
          });
          
          if (errorMessages.length > 0) {
            throw new Error(errorMessages.join(', '));
          }
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating staff member:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating staff member:", error.message);
        throw error;
      }
    }
  }

  // Delete staff member(s)
  async delete(recordIds) {
    try {
      // Ensure recordIds is an array
      const idsArray = Array.isArray(recordIds) ? recordIds : [recordIds];
      
      const params = {
        RecordIds: idsArray
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} staff records:${JSON.stringify(failedDeletions)}`);
          
          // Return the error details for UI handling
          const errorMessages = [];
          failedDeletions.forEach(record => {
            if (record.message) errorMessages.push(record.message);
          });
          
          if (errorMessages.length > 0) {
            throw new Error(errorMessages.join(', '));
          }
        }
        
        return successfulDeletions.length === idsArray.length;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting staff member(s):", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting staff member(s):", error.message);
        throw error;
      }
    }
  }
}

// Export singleton instance
export const staffService = new StaffService();