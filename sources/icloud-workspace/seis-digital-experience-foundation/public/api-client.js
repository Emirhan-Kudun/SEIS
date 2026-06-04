/**
 * Client-side API wrapper with error handling and retry logic
 */

class APIClient {
  constructor(baseURL = "/", timeout = 5000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.maxRetries = 3;
  }

  async request(endpoint, options = {}) {
    const { method = "GET", body, retries = 0 } = options;
    const url = new URL(endpoint, this.baseURL).toString();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new APIError(`HTTP ${response.status}`, response.status, await response.json());
      }

      return await response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;

      if (retries < this.maxRetries && (error.name === "AbortError" || error instanceof TypeError)) {
        const delay = Math.pow(2, retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.request(endpoint, { ...options, retries: retries + 1 });
      }

      throw new APIError(error.message, 0, null);
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: "POST", body });
  }
}

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

// Global API client instance
export const apiClient = new APIClient();

// Convenience methods
export async function submitContact(data) {
  return apiClient.post("/api/contact", {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    phone: data.phone || ""
  });
}

export async function getProjects() {
  return apiClient.get("/api/projects");
}

export async function getSkills() {
  return apiClient.get("/api/skills");
}

export async function getHealth() {
  return apiClient.get("/health");
}

export async function getMetrics() {
  return apiClient.get("/metrics");
}

// Error handling wrapper
export function handleAPIError(error, message = "An error occurred") {
  console.error(`${message}:`, error);

  if (error instanceof APIError) {
    if (error.status === 429) {
      return "Too many requests. Please try again later.";
    }
    if (error.status >= 500) {
      return "Server error. Please try again later.";
    }
    if (error.data?.error) {
      return error.data.error;
    }
  }

  return message;
}
