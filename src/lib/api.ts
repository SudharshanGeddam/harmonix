// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// ============================================================================
// Type Definitions
// ============================================================================

export interface DashboardMetrics {
  total_packages: number;
  total_receipts: number;
  recent_activity: string;
  sustainability_score?: number;
}

export interface Package {
  id: string;
  tracking_number: string;
  status: string;
  carrier: string;
  estimated_delivery?: string;
  current_location?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Receipt {
  id: string;
  amount: number;
  date: string;
  merchant: string;
  category?: string;
  items?: string[];
  created_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================================================
// Error Handling
// ============================================================================

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorMessage = `API Error: ${response.status} ${response.statusText}`;
    throw new ApiError(response.status, errorMessage);
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError(response.status, 'Failed to parse response JSON');
  }
}

// ============================================================================
// HTTP Methods
// ============================================================================

async function apiGet<T>(endpoint: string): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`[API] GET ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[API] Network error: ${errorMsg}`);
    throw new ApiError(500, `Network request failed: ${errorMsg}`, error);
  }
}

async function apiPost<T>(endpoint: string, body?: unknown): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network request failed', error);
  }
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch dashboard metrics including package count, receipt count, and activity
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const response = await apiGet<DashboardMetrics>('/api/dashboard/metrics');
    return response;
  } catch (error) {
    console.warn('Failed to fetch dashboard metrics from backend, using mock data:', error);
    // Return mock data as fallback
    return {
      total_packages: 1247,
      total_receipts: 892,
      recent_activity: "16 packages delivered, 3 receipts processed",
      sustainability_score: 87,
    };
  }
}

/**
 * Fetch all packages with tracking information
 */
export async function getPackages(): Promise<Package[]> {
  try {
    const response = await apiGet<Package[]>('/api/packages');
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.warn('Failed to fetch packages from backend, using mock data:', error);
    // Return mock data as fallback
    return [
      {
        id: "pkg1",
        tracking_number: "TRK001234567",
        status: "In Transit",
        carrier: "FedEx",
        estimated_delivery: "Feb 6, 2026",
        current_location: "Memphis Distribution Center",
        created_at: "2026-02-01T10:00:00Z",
        updated_at: "2026-02-04T14:30:00Z",
      },
      {
        id: "pkg2",
        tracking_number: "TRK001234568",
        status: "Delivered",
        carrier: "UPS",
        estimated_delivery: "Feb 3, 2026",
        current_location: "Delivered",
        created_at: "2026-01-30T08:15:00Z",
        updated_at: "2026-02-03T18:45:00Z",
      },
      {
        id: "pkg3",
        tracking_number: "TRK001234569",
        status: "Pending",
        carrier: "USPS",
        estimated_delivery: "Feb 7, 2026",
        current_location: "Processing at Origin",
        created_at: "2026-02-04T09:20:00Z",
        updated_at: "2026-02-04T11:00:00Z",
      },
    ];
  }
}

/**
 * Fetch all receipts
 */
export async function getReceipts(): Promise<Receipt[]> {
  try {
    const response = await apiGet<Receipt[]>('/api/receipts');
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.warn('Failed to fetch receipts from backend, using mock data:', error);
    // Return mock data as fallback
    return [
      {
        id: "rcpt1",
        amount: 125.50,
        date: "2026-02-01",
        merchant: "Eco Supply Store",
        category: "Office Supplies",
        items: ["Recycled Paper Pads", "Bamboo Pens", "Organic Coffee"],
        created_at: "2026-02-01T14:20:00Z",
      },
      {
        id: "rcpt2",
        amount: 89.99,
        date: "2026-02-02",
        merchant: "Green Market",
        category: "Groceries",
        items: ["Organic Vegetables", "Fair Trade Chocolate", "Sustainable Packaging"],
        created_at: "2026-02-02T16:45:00Z",
      },
      {
        id: "rcpt3",
        amount: 234.75,
        date: "2026-02-03",
        merchant: "Ethical Electronics",
        category: "Technology",
        items: ["USB-C Cables", "Recycled Phone Case", "Solar Charger"],
        created_at: "2026-02-03T10:15:00Z",
      },
    ];
  }
}

// ============================================================================
// Additional Helper Functions
// ============================================================================

/**
 * Fetch a single package by ID
 */
export async function getPackageById(id: string): Promise<Package> {
  try {
    return await apiGet<Package>(`/api/packages/${id}`);
  } catch (error) {
    console.error(`Failed to fetch package ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch a single receipt by ID
 */
export async function getReceiptById(id: string): Promise<Receipt> {
  try {
    return await apiGet<Receipt>(`/api/receipts/${id}`);
  } catch (error) {
    console.error(`Failed to fetch receipt ${id}:`, error);
    throw error;
  }
}

/**
 * Get the configured API base URL
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
