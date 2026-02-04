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
  package_id?: string;
  status: string;
  priority_label?: string;
  category?: string;
  destination?: string;
  sender_type?: string;
  fragile?: boolean;
  weight?: number;
  last_updated?: string;
  created_at?: string;
  tracking_number?: string;
  current_location?: string;
  estimated_delivery?: string;
  carrier?: string;
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

export interface ProcessPackagePayload {
  status?: string;
  location?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface ProcessPackageResponse {
  success: boolean;
  message: string;
  package_id: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PackagesResponse {
  packages: Package[];
  count: number;
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
  const response = await apiGet<DashboardMetrics>('/api/dashboard/metrics');
  return response;
}

/**
 * Fetch all packages with tracking information
 */
export async function getPackages(): Promise<PackagesResponse> {
  return await apiGet<PackagesResponse>('/api/packages');
}

/**
 * Fetch all receipts
 */
export async function getReceipts(): Promise<Receipt[]> {
  const response = await apiGet<Receipt[]>('/api/receipts');
  return Array.isArray(response) ? response : [];
}

/**
 * Process a package with updated information
 */
export async function processPackage(
  id: string,
  payload: ProcessPackagePayload
): Promise<ProcessPackageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/packages/${id}/process`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return handleResponse<ProcessPackageResponse>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[API] Network error: ${errorMsg}`);
    throw new ApiError(500, `Network request failed: ${errorMsg}`, error);
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
