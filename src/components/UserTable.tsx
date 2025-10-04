import { useState } from 'react';
import { Edit, Trash2, Plus, Users } from 'lucide-react';
import type { User } from '../types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onAdd: () => void;
}

const UserTable = ({ users, onEdit, onDelete, onAdd }: UserTableProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (userId: string) => {
    if (deleteConfirm === userId) {
      onDelete(userId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(userId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800';
      case 'Manager':
        return 'bg-blue-100 text-blue-800';
      case 'User':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Пользователи</h1>
          <p className="mt-1 text-sm text-gray-500">
            Управление пользователями системы
          </p>
        </div>
        <button
          onClick={onAdd}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Добавить пользователя
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Контакты
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Роль
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата создания
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">ID: {user.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt.toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Редактировать"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className={`p-1 rounded transition-colors ${
                          deleteConfirm === user.id
                            ? 'text-red-900 bg-red-100'
                            : 'text-red-600 hover:text-red-900'
                        }`}
                        title={deleteConfirm === user.id ? 'Нажмите еще раз для подтверждения' : 'Удалить'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Нет пользователей</h3>
            <p className="mt-1 text-sm text-gray-500">
              Начните с добавления нового пользователя.
            </p>
            <div className="mt-6">
              <button onClick={onAdd} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Добавить пользователя
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
