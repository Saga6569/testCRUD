import type { User, Task } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Александр Петров',
    email: 'alexander.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    role: 'Admin',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Мария Иванова',
    email: 'maria.ivanova@example.com',
    phone: '+7 (999) 234-56-78',
    role: 'Manager',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'Дмитрий Сидоров',
    email: 'dmitry.sidorov@example.com',
    phone: '+7 (999) 345-67-89',
    role: 'User',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: '4',
    name: 'Елена Козлова',
    email: 'elena.kozlova@example.com',
    phone: '+7 (999) 456-78-90',
    role: 'Manager',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '5',
    name: 'Андрей Морозов',
    email: 'andrey.morozov@example.com',
    phone: '+7 (999) 567-89-01',
    role: 'User',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Разработать новую функцию',
    description: 'Создать систему уведомлений для пользователей',
    completed: false,
    priority: 'high',
    dueDate: new Date('2024-02-15'),
    assignedTo: '2',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    title: 'Исправить баг в авторизации',
    description: 'Пользователи не могут войти через социальные сети',
    completed: true,
    priority: 'high',
    assignedTo: '1',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '3',
    title: 'Обновить документацию',
    description: 'Добавить примеры использования API',
    completed: false,
    priority: 'medium',
    dueDate: new Date('2024-02-10'),
    assignedTo: '3',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '4',
    title: 'Провести код-ревью',
    description: 'Проверить новые изменения в модуле платежей',
    completed: false,
    priority: 'medium',
    assignedTo: '4',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '5',
    title: 'Настроить CI/CD',
    description: 'Автоматизировать процесс деплоя',
    completed: false,
    priority: 'low',
    dueDate: new Date('2024-03-01'),
    assignedTo: '5',
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23')
  }
];
