import axios from 'axios';
import type { FileData } from './interface/FileData';
import {api} from "../../config/environments"

const API_BACK = api.baseURL;

export const createFile = async (file: File): Promise<FileData> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_BACK.replace('/files', '')}api/upload`, formData);
  return response.data;
};

export const deleteFile = async (id: string): Promise<void> => {
  await axios.delete(`${API_BACK}api/delete/${id}`);
};

export const getFileById = async (id: string): Promise<FileData> => {
  const response = await axios.get(`${API_BACK}/${id}`);
  return response.data;
};

export const updateFile = async (id: string, data: Partial<FileData>): Promise<FileData> => {
  const response = await axios.put(`${API_BACK}api/update/${id}`, data);
  return response.data;
};

export const listFiles = async (): Promise<FileData[]> => {
  const response = await axios.get(`${API_BACK}api/find/`);

  return response.data;
};

export const downloadFile = async (token: string): Promise<FileData> => {
  const response = await axios.get(`${API_BACK}api/download/${token}`);

  window.open(`${API_BACK}api/download/${token}`, '_blank');
  return response.data;
};
