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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
    throw new ApiError(500, 'Network request failed', error);
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
    console.error('Failed to fetch dashboard metrics:', error);
    throw error;
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
    console.error('Failed to fetch packages:', error);
    throw error;
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
    console.error('Failed to fetch receipts:', error);
    throw error;
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
