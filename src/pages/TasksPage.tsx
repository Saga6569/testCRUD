import { useState } from 'react';
import { CheckSquare, Clock, AlertCircle } from 'lucide-react';
import { mockTasks, mockUsers } from '../data/mockData';
import type { Task } from '../types';

const TasksPage = () => {
  const [tasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const getUserName = (userId?: string) => {
    if (!userId) return 'Не назначено';
    const user = mockUsers.find(u => u.id === userId);
    return user?.name || 'Неизвестный пользователь';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckSquare className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Задачи</h1>
          <p className="mt-1 text-sm text-gray-500">
            Управление задачами проекта
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Все ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === 'pending'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            В работе ({tasks.filter(t => !t.completed).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === 'completed'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Выполнено ({tasks.filter(t => t.completed).length})
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <div key={task.id} className="card">
            <div className="card-content">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mt-3">
                  {task.title}
                </h3>
                <div className="flex items-center gap-1 mt-3">
                  {getPriorityIcon(task.priority)}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {task.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'Высокий' :
                     task.priority === 'medium' ? 'Средний' : 'Низкий'}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    task.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {task.completed ? 'Выполнено' : 'В работе'}
                  </span>
                </div>

                <div className="text-xs text-gray-500">
                  <div>Исполнитель: {getUserName(task.assignedTo)}</div>
                  {task.dueDate && (
                    <div>Срок: {task.dueDate.toLocaleDateString('ru-RU')}</div>
                  )}
                  <div>Создано: {task.createdAt.toLocaleDateString('ru-RU')}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {filter === 'all' ? 'Нет задач' :
             filter === 'completed' ? 'Нет выполненных задач' : 'Нет задач в работе'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' ? 'Создайте первую задачу для начала работы.' :
             'Попробуйте изменить фильтр для просмотра других задач.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
