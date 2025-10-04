import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X } from 'lucide-react';
import type { User, UserFormData } from '../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  user?: User | null;
  title: string;
}

const phoneRegex = /^(\+7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;

const schema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать минимум 2 символа'),
  email: yup
    .string()
    .required('Email обязателен для заполнения')
    .email('Введите корректный email'),
  phone: yup
    .string()
    .required('Телефон обязателен для заполнения')
    .matches(phoneRegex, 'Введите корректный российский номер телефона'),
  role: yup
    .mixed<'Admin' | 'User' | 'Manager'>()
    .required('Роль обязательна для выбора')
    .oneOf(['Admin', 'User', 'Manager'], 'Выберите корректную роль')
}).required();

const UserModal = ({ isOpen, onClose, onSubmit, user, title }: UserModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'User'
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      });
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        role: 'User'
      });
    }
  }, [user, reset]);

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={handleClose} />

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Имя
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="name"
                      className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Введите имя"
                    />
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="example@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      id="phone"
                      className={`input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="+7 (999) 123-45-67"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Роль
                </label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="role"
                      className={`input ${errors.role ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <option value="User">User</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  )}
                />
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button
                type="button"
                onClick={handleClose}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Сохранение...' : (user ? 'Обновить' : 'Создать')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
