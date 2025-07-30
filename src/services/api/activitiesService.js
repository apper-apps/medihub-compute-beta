import activitiesData from "@/services/mockData/activities.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const activitiesService = {
  async getAll() {
    await delay(200);
    return [...activitiesData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getById(id) {
    await delay(150);
    const activity = activitiesData.find(a => a.Id === id);
    if (!activity) {
      throw new Error("Activity not found");
    }
    return { ...activity };
  },

  async create(activityData) {
    await delay(300);
    const maxId = Math.max(...activitiesData.map(a => a.Id));
    const newActivity = {
      Id: maxId + 1,
      timestamp: new Date().toISOString(),
      ...activityData
    };
    activitiesData.push(newActivity);
    return { ...newActivity };
  },

  async update(id, activityData) {
    await delay(250);
    const index = activitiesData.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Activity not found");
    }
    activitiesData[index] = { ...activitiesData[index], ...activityData };
    return { ...activitiesData[index] };
  },

  async delete(id) {
    await delay(200);
    const index = activitiesData.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Activity not found");
    }
    const deletedActivity = activitiesData.splice(index, 1)[0];
    return { ...deletedActivity };
  }
};