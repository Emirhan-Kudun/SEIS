// Application metrics tracking
const startTime = Date.now();
let requestCount = 0;
let contactFormSubmissions = 0;
let totalErrors = 0;

export const metrics = {
  recordRequest() {
    requestCount++;
  },

  recordContactSubmission() {
    contactFormSubmissions++;
  },

  recordError() {
    totalErrors++;
  },

  getMetrics() {
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    const avgRequestTime = requestCount > 0 ? Math.floor(uptime / requestCount) : 0;

    return {
      uptime,
      startedAt: new Date(startTime).toISOString(),
      requestCount,
      contactFormSubmissions,
      totalErrors,
      avgRequestTime: `${avgRequestTime}s`,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage()
    };
  },

  reset() {
    requestCount = 0;
    contactFormSubmissions = 0;
    totalErrors = 0;
  }
};
