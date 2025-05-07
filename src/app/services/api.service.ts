import axios, { AxiosRequestConfig } from 'axios';
import { environment } from '../../environments/environment';

export class ApiService {
  private baseUrl: string = environment.apiUrl;

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }

  private toFormData(data: any): URLSearchParams {
    const params = new URLSearchParams();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        params.append(key, data[key]);
      }
    });
    return params;
  }

  async get<T>(endpoint: string, params: any = {}): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: this.getHeaders(),
      params: this.toFormData(params)
    };
    const response = await axios.get<T>(`${this.baseUrl}${endpoint}`, config);
    return response.data;
  }

  async post<T>(endpoint: string, data: any = {}): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: this.getHeaders()
    };
    const response = await axios.post<T>(`${this.baseUrl}${endpoint}`, this.toFormData(data), config);
    return response.data;
  }

  async patch<T>(endpoint: string, data: any = {}): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: this.getHeaders()
    };
    const response = await axios.patch<T>(`${this.baseUrl}${endpoint}`, this.toFormData(data), config);
    return response.data;
  }

  async put<T>(endpoint: string, data: any = {}): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: this.getHeaders()
    };
    const response = await axios.put<T>(`${this.baseUrl}${endpoint}`, this.toFormData(data), config);
    return response.data;
  }

  async delete<T>(endpoint: string, params: any = {}): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: this.getHeaders(),
      params: this.toFormData(params)
    };
    const response = await axios.delete<T>(`${this.baseUrl}${endpoint}`, config);
    return response.data;
  }
} 