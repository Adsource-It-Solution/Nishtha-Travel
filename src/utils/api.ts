// API Client helper utility to interact with the backend service.
// Uses local mock data as a fallback in case of connection errors or missing data.

import {
  mockCabs,
  mockHotels,
  mockPackages,
  mockFlights,
  mockTrains,
  mockDestinations
} from '../data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

/**
 * Custom Fetch Wrapper
 */
export const apiFetch = async (path: string, options: RequestInit = {}, fallbackData?: any) => {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    
    // Extract data from backend standard success response envelope { success: true, data: ... }
    if (json && typeof json === 'object' && 'success' in json && 'data' in json) {
      return json.data;
    }
    
    return json;
  } catch (error) {
    console.warn(`Fetch to ${path} failed. Using local fallback data.`, error);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw error;
  }
};

// Typed Get Helpers
export const getCabs = () => apiFetch('/api/cabs', {}, mockCabs);
export const getCabById = (id: string) => apiFetch(`/api/cabs/${id}`, {}, mockCabs.find(c => c.id === id) || mockCabs[0]);

export const getHotels = (destination?: string) => {
  const query = destination ? `?destination=${encodeURIComponent(destination)}` : '';
  return apiFetch(`/api/hotels${query}`, {}, mockHotels);
};
export const getHotelById = (id: string) => apiFetch(`/api/hotels/${id}`, {}, mockHotels.find(h => h.id === id) || mockHotels[0]);

export const getPackages = (destination?: string) => {
  const query = destination ? `?destination=${encodeURIComponent(destination)}` : '';
  return apiFetch(`/api/packages${query}`, {}, mockPackages);
};
export const getPackageById = (id: string) => apiFetch(`/api/packages/${id}`, {}, mockPackages.find(p => p.id === id) || mockPackages[0]);

export const getDestinations = () => apiFetch('/api/destinations', {}, mockDestinations);
export const getDestinationById = (id: string) => apiFetch(`/api/destinations/${id}`, {}, mockDestinations.find(d => d.id === id) || mockDestinations[0]);

export const searchFlights = (from: string, to: string, date: string, cabinClass: string = 'Economy') => {
  return apiFetch(
    `/api/flights/search?departureCity=${encodeURIComponent(from)}&arrivalCity=${encodeURIComponent(to)}&departureDate=${date}&cabinClass=${cabinClass}`,
    {},
    mockFlights
  );
};

export const searchTrains = async (from: string, to: string, date: string, coachClass: string = '3A') => {
  const data = await apiFetch(
    `/api/trains/search?departureCity=${encodeURIComponent(from)}&arrivalCity=${encodeURIComponent(to)}&travelDate=${date}&coachClass=${coachClass}`,
    {},
    mockTrains
  );
  return (data || []).map((t: any) => ({
    id: t.id || t._id,
    name: t.trainName || t.name,
    number: t.trainNumber || t.number,
    departureCity: t.departureCity,
    departureCode: t.departureCode,
    arrivalCity: t.arrivalCity,
    arrivalCode: t.arrivalCode,
    departureTime: t.departureTime,
    arrivalTime: t.arrivalTime,
    duration: t.duration,
    classes: ['1A', '2A', '3A', 'SL'],
    pricing: { '1A': (t.price || 1500) + 1000, '2A': (t.price || 1500) + 500, '3A': (t.price || 1500), 'SL': Math.floor((t.price || 1500) / 2) }
  }));
};
