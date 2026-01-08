// Get the current hostname and use it for the API URL
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:8000`;
  }
  return 'http://localhost:8000';
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || getApiUrl();

// Helper function to get full image URL
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return '';
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // If it's a relative path, prepend API_URL
  return `${API_URL}${imagePath}`;
};

// Token management
export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refresh_token');
  }
  return null;
};

export const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

// API request helper with automatic token refresh
async function apiRequest(url: string, options: RequestInit = {}) {
  const accessToken = getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
    redirect: 'follow', // Follow redirects automatically
  });

  // If token expired, try to refresh
  if (response.status === 401) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setTokens(data.access_token, data.refresh_token);

        // Retry original request with new token
        headers['Authorization'] = `Bearer ${data.access_token}`;
        response = await fetch(`${API_URL}${url}`, {
          ...options,
          headers,
          redirect: 'follow',
        });
      } else {
        // Refresh failed, clear tokens and redirect to login
        clearTokens();
        window.location.href = '/admin/login';
        throw new Error('Session expired');
      }
    } else {
      clearTokens();
      window.location.href = '/admin/login';
      throw new Error('Not authenticated');
    }
  }

  return response;
}

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    setTokens(data.access_token, data.refresh_token);
    return data;
  },

  logout: () => {
    clearTokens();
    window.location.href = '/admin/login';
  },

  isAuthenticated: () => {
    return !!getAccessToken();
  },
};

// Content API
export const contentAPI = {
  get: async () => {
    const response = await fetch(`${API_URL}/api/content/`);
    return response.json();
  },

  update: async (data: any) => {
    const response = await apiRequest('/api/content/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Blog API
export const blogAPI = {
  getAll: async (publishedOnly = true) => {
    const url = `/api/blog/?published_only=${publishedOnly}`;
    const response = await fetch(`${API_URL}${url}`);
    return response.json();
  },

  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_URL}/api/blog/${slug}/`);
    return response.json();
  },

  create: async (data: any) => {
    const response = await apiRequest('/api/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await apiRequest(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    await apiRequest(`/api/blog/${id}`, {
      method: 'DELETE',
    });
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (publishedOnly: boolean = false) => {
    const url = publishedOnly ? `/api/projects/?published=true` : `/api/projects/`;
    const response = await fetch(`${API_URL}${url}`);
    return response.json();
  },

  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_URL}/api/projects/${slug}/`);
    return response.json();
  },

  create: async (data: any) => {
    const response = await apiRequest('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await apiRequest(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    await apiRequest(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// Team API
export const teamAPI = {
  getAll: async (publishedOnly: boolean = true) => {
    const url = publishedOnly ? '/api/team/?published_only=true' : '/api/team/?published_only=false';
    const response = await fetch(`${API_URL}${url}`);
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/api/team/${id}`);
    return response.json();
  },

  create: async (data: any) => {
    const response = await apiRequest('/api/team/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await apiRequest(`/api/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    await apiRequest(`/api/team/${id}`, {
      method: 'DELETE',
    });
  },
};

// Upload API
export const uploadAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const accessToken = getAccessToken();
    const response = await fetch(`${API_URL}/api/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  },
};

// Careers API
export const careersAPI = {
  getAll: async (publishedOnly: boolean = true) => {
    const url = publishedOnly ? '/api/careers/?published=true' : '/api/careers/';
    const response = await fetch(`${API_URL}${url}`);
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/api/careers/${id}`);
    return response.json();
  },

  create: async (data: any) => {
    const response = await apiRequest('/api/careers/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await apiRequest(`/api/careers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    await apiRequest(`/api/careers/${id}`, {
      method: 'DELETE',
    });
  },

  submitApplication: async (formData: FormData) => {
    const accessToken = getAccessToken();
    const response = await fetch(`${API_URL}/api/careers/apply`, {
      method: 'POST',
      headers: accessToken ? {
        'Authorization': `Bearer ${accessToken}`,
      } : {},
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Application submission failed');
    }

    return response.json();
  },
};

// Services API
// Helper to convert snake_case to camelCase for services
const transformService = (service: any) => {
  return {
    ...service,
    contactEmail: service.contact_email,
  };
};

export const servicesAPI = {
  getAll: async (publishedOnly: boolean = true) => {
    const url = publishedOnly ? '/api/services/?published=true' : '/api/services/';
    const response = await fetch(`${API_URL}${url}`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await response.json();
    return data.map(transformService);
  },

  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_URL}/api/services/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch service');
    }
    const data = await response.json();
    return transformService(data);
  },

  create: async (data: any) => {
    const response = await apiRequest('/api/services/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await apiRequest(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    await apiRequest(`/api/services/${id}`, {
      method: 'DELETE',
    });
  },
};
