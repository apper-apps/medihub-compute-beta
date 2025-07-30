import metricsData from "@/services/mockData/metrics.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const metricsService = {
  async getAll() {
    await delay(200);
    return [...metricsData];
  },

  async getById(id) {
    await delay(150);
    const metric = metricsData.find(m => m.Id === id);
    if (!metric) {
      throw new Error("Metric not found");
    }
    return { ...metric };
  },

  async create(metricData) {
    await delay(300);
    const maxId = Math.max(...metricsData.map(m => m.Id));
    const newMetric = {
      Id: maxId + 1,
      ...metricData
    };
    metricsData.push(newMetric);
    return { ...newMetric };
  },

  async update(id, metricData) {
    await delay(250);
    const index = metricsData.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error("Metric not found");
    }
    metricsData[index] = { ...metricsData[index], ...metricData };
    return { ...metricsData[index] };
  },

  async delete(id) {
    await delay(200);
    const index = metricsData.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error("Metric not found");
    }
    const deletedMetric = metricsData.splice(index, 1)[0];
    return { ...deletedMetric };
  }
};