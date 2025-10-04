export type UserRole = 'Admin' | 'User' | 'Manager';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignedTo?: string;
}
