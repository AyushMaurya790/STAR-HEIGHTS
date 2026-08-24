// Star Heights Client API Service
function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && !envUrl.includes("5001") && !envUrl.startsWith("http://200.")) {
    return envUrl;
  }

  // When loaded over HTTPS in browser (like Vercel), use relative proxy to eliminate Mixed Content errors
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    return "/api";
  }

  return "http://200.141.9.221:5002/api";
}

const API_BASE = getApiBaseUrl();

export function getBackendOrigin(): string {
  const base = getApiBaseUrl();
  return base.replace(/\/api\/?$/, "");
}

export function getImageUrl(path?: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:") ||
    path.startsWith("/src/") ||
    path.startsWith("/assets/") ||
    path.startsWith("/@fs/") ||
    path.startsWith("@fs/") ||
    path.startsWith("/@vite/")
  ) {
    return path;
  }

  if (path.startsWith("/uploads") || path.startsWith("uploads/")) {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${getBackendOrigin()}${cleanPath}`;
  }

  if (path.startsWith("/")) {
    return `${getBackendOrigin()}${path}`;
  }

  return path;
}


export interface ServiceItem {
  id: string;
  title: string;
  icon?: string;
  desc: string;
  points: string[];
  category?: string;
  status?: string;
  order?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  loc: string;
  year: string;
  progress?: number;
  status?: string;
  isFlagship?: boolean;
  client?: string;
  area?: string;
  img: string;
  desc?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  project?: string;
  aspect?: string;
  img: string;
  featured?: boolean;
}

export interface BlogItem {
  id: string;
  title: string;
  slug?: string;
  tag: string;
  author?: string;
  date: string;
  readTime?: string;
  status?: string;
  img: string;
  excerpt: string;
  content?: string;
}

export interface StatCounter {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

export interface PillarItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  order?: number;
}

export interface WhyUsData {
  counters: StatCounter[];
  pillars: PillarItem[];
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message?: string;
}

export const clientApi = {
  // Fetch Services from backend
  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/services`);
      if (!res.ok) throw new Error("Failed to fetch services");
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn("[API] Could not fetch live services, using default fallback:", err);
      return [];
    }
  },

  // Fetch Projects from backend
  async getProjects(): Promise<ProjectItem[]> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn("[API] Could not fetch live projects, using default fallback:", err);
      return [];
    }
  },

  // Fetch Gallery from backend
  async getGallery(): Promise<GalleryItem[]> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/gallery`);
      if (!res.ok) throw new Error("Failed to fetch gallery");
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn("[API] Could not fetch live gallery, using default fallback:", err);
      return [];
    }
  },

  // Fetch Blogs from backend
  async getBlogs(): Promise<BlogItem[]> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn("[API] Could not fetch live blogs, using default fallback:", err);
      return [];
    }
  },

  // Fetch Why Us data (Counters & Pillars) from backend
  async getWhyUs(): Promise<WhyUsData | null> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/why-us`);
      if (!res.ok) throw new Error("Failed to fetch why-us");
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      console.warn("[API] Could not fetch live why-us data, using default fallback:", err);
      return null;
    }
  },

  // Submit Contact Form to backend
  async submitContact(payload: ContactPayload): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }
      return { success: true, message: data.message || "Enquiry sent successfully" };
    } catch (err: any) {
      console.error("[API] Contact submit error:", err);
      throw err;
    }
  },
};

export interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  success: boolean;
  counts: {
    services: number;
    projects: number;
    gallery: number;
    blogs: number;
    contacts: number;
    newContacts: number;
    inProgressProjects: number;
    completedProjects: number;
  };
  charts: {
    projectCategories: Record<string, number>;
    contactStatusCounts: Record<string, number>;
  };
  recentContacts: ContactItem[];
  recentProjects: ProjectItem[];
}

export const adminApi = {
  // Generic request
  async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const isFormData = options.body instanceof FormData;
    const headers: Record<string, string> = isFormData
      ? { ...(options.headers as Record<string, string>) }
      : { "Content-Type": "application/json", ...(options.headers as Record<string, string>) };

    const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  },

  // Overview Stats
  async getStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>("/stats");
  },

  // Image Upload
  async uploadImage(file: File): Promise<{ success: boolean; url: string; filename: string }> {
    const formData = new FormData();
    formData.append("image", file);
    return this.request<{ success: boolean; url: string; filename: string }>("/upload", {
      method: "POST",
      body: formData,
    });
  },

  // Services
  async getServices(): Promise<ServiceItem[]> {
    const res = await this.request<{ success: boolean; data: ServiceItem[] }>("/services");
    return res.data || [];
  },
  async createService(data: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await this.request<{ success: boolean; data: ServiceItem }>("/services", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async updateService(id: string, data: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await this.request<{ success: boolean; data: ServiceItem }>(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async deleteService(id: string): Promise<boolean> {
    await this.request(`/services/${id}`, { method: "DELETE" });
    return true;
  },

  // Projects
  async getProjects(): Promise<ProjectItem[]> {
    const res = await this.request<{ success: boolean; data: ProjectItem[] }>("/projects");
    return res.data || [];
  },
  async createProject(data: Partial<ProjectItem>): Promise<ProjectItem> {
    const res = await this.request<{ success: boolean; data: ProjectItem }>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async updateProject(id: string, data: Partial<ProjectItem>): Promise<ProjectItem> {
    const res = await this.request<{ success: boolean; data: ProjectItem }>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async deleteProject(id: string): Promise<boolean> {
    await this.request(`/projects/${id}`, { method: "DELETE" });
    return true;
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    const res = await this.request<{ success: boolean; data: GalleryItem[] }>("/gallery");
    return res.data || [];
  },
  async createGallery(data: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await this.request<{ success: boolean; data: GalleryItem }>("/gallery", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async updateGallery(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await this.request<{ success: boolean; data: GalleryItem }>(`/gallery/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async deleteGallery(id: string): Promise<boolean> {
    await this.request(`/gallery/${id}`, { method: "DELETE" });
    return true;
  },

  // Blogs
  async getBlogs(): Promise<BlogItem[]> {
    const res = await this.request<{ success: boolean; data: BlogItem[] }>("/blogs");
    return res.data || [];
  },
  async createBlog(data: Partial<BlogItem>): Promise<BlogItem> {
    const res = await this.request<{ success: boolean; data: BlogItem }>("/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async updateBlog(id: string, data: Partial<BlogItem>): Promise<BlogItem> {
    const res = await this.request<{ success: boolean; data: BlogItem }>(`/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async deleteBlog(id: string): Promise<boolean> {
    await this.request(`/blogs/${id}`, { method: "DELETE" });
    return true;
  },

  // Contacts
  async getContacts(): Promise<ContactItem[]> {
    const res = await this.request<{ success: boolean; data: ContactItem[] }>("/contacts");
    return res.data || [];
  },
  async updateContact(id: string, data: Partial<ContactItem>): Promise<ContactItem> {
    const res = await this.request<{ success: boolean; data: ContactItem }>(`/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async deleteContact(id: string): Promise<boolean> {
    await this.request(`/contacts/${id}`, { method: "DELETE" });
    return true;
  },

  // Why Us
  async getWhyUs(): Promise<WhyUsData> {
    const res = await this.request<{ success: boolean; data: WhyUsData }>("/why-us");
    return res.data || { counters: [], pillars: [] };
  },
  async updateCounters(counters: StatCounter[]): Promise<StatCounter[]> {
    const res = await this.request<{ success: boolean; data: StatCounter[] }>("/why-us/counters", {
      method: "PUT",
      body: JSON.stringify({ counters }),
    });
    return res.data;
  },
  async createPillar(data: Partial<PillarItem>): Promise<PillarItem> {
    const res = await this.request<{ success: boolean; data: PillarItem }>("/why-us/pillars", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async updatePillar(id: string, data: Partial<PillarItem>): Promise<PillarItem> {
    const res = await this.request<{ success: boolean; data: PillarItem }>(`/why-us/pillars/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },
  async deletePillar(id: string): Promise<boolean> {
    await this.request(`/why-us/pillars/${id}`, { method: "DELETE" });
    return true;
  },
};
