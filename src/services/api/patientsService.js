import patientsData from "@/services/mockData/patients.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const patientsService = {
  async getAll() {
    await delay(300);
    return [...patientsData];
  },

  async getById(id) {
    await delay(250);
    const patient = patientsData.find(p => p.Id === id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    return { ...patient };
  },

  async create(patientData) {
    await delay(400);
    const maxId = Math.max(...patientsData.map(p => p.Id));
    const newPatient = {
      Id: maxId + 1,
      ...patientData,
      admissionDate: patientData.admissionDate || new Date().toISOString().split('T')[0],
      status: patientData.status || "admitted"
    };
    patientsData.push(newPatient);
    return { ...newPatient };
  },

  async update(id, patientData) {
    await delay(350);
    const index = patientsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Patient not found");
    }
    patientsData[index] = { ...patientsData[index], ...patientData };
    return { ...patientsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = patientsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Patient not found");
    }
    const deletedPatient = patientsData.splice(index, 1)[0];
    return { ...deletedPatient };
  }
};