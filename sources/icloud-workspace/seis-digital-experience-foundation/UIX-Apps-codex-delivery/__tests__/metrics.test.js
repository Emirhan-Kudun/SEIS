import { metrics } from '../config/metrics.js';

describe('Metrics', () => {
  beforeEach(() => {
    metrics.reset();
  });

  describe('recordRequest', () => {
    it('should increment request count', () => {
      metrics.recordRequest();
      metrics.recordRequest();
      const data = metrics.getMetrics();
      expect(data.requestCount).toBe(2);
    });
  });

  describe('recordContactSubmission', () => {
    it('should increment contact submissions', () => {
      metrics.recordContactSubmission();
      const data = metrics.getMetrics();
      expect(data.contactFormSubmissions).toBe(1);
    });
  });

  describe('recordError', () => {
    it('should increment error count', () => {
      metrics.recordError();
      metrics.recordError();
      const data = metrics.getMetrics();
      expect(data.totalErrors).toBe(2);
    });
  });

  describe('getMetrics', () => {
    it('should return metrics object with required fields', () => {
      const data = metrics.getMetrics();
      expect(data).toHaveProperty('uptime');
      expect(data).toHaveProperty('requestCount');
      expect(data).toHaveProperty('contactFormSubmissions');
      expect(data).toHaveProperty('totalErrors');
      expect(data).toHaveProperty('memoryUsage');
    });
  });

  describe('reset', () => {
    it('should reset all metrics', () => {
      metrics.recordRequest();
      metrics.recordContactSubmission();
      metrics.recordError();
      metrics.reset();
      const data = metrics.getMetrics();
      expect(data.requestCount).toBe(0);
      expect(data.contactFormSubmissions).toBe(0);
      expect(data.totalErrors).toBe(0);
    });
  });
});
