// lib/apiService.ts
const API_BASE_URL = "http://localhost:9000";

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        errorText = errorJson.message || errorText;
      } catch (e) {
        // Not JSON, use text as is
      }
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  async getCsrfCookie() {
    return this.request("/sanctum/csrf-cookie", { method: "GET" });
  }

  async register(
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    password_confirmation: string
  ) {
    return this.request("/api/register", {
      method: "POST",
      body: JSON.stringify({ 
        first_name, 
        last_name, 
        email, 
        password, 
        password_confirmation 
      }),
    });
  }
  // In your apiService class
async forgotPassword(email: string) {
  return this.request("/api/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

async resetPassword(token: string, email: string, password: string, password_confirmation: string) {
  return this.request("/api/reset-password", {
    method: "POST",
    body: JSON.stringify({
      token,
      email,
      password,
      password_confirmation
    }),
  });
}

  async login(email: string, password: string) {
    return this.request("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request("/api/logout", { method: "POST" });
  }
}

export const apiService = new ApiService();