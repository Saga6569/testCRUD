import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { User, UserFormData } from '../types';
import { mockUsers } from '../data/mockData';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSubmitUser = async (formData: UserFormData) => {
    if (editingUser) {
      // Редактирование существующего пользователя
      setUsers(users.map(user =>
        user.id === editingUser.id
          ? {
              ...user,
              ...formData,
              updatedAt: new Date()
            }
          : user
      ));
    } else {
      // Добавление нового пользователя
      const newUser: User = {
        id: uuidv4(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setUsers([...users, newUser]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <>
      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onAdd={handleAddUser}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitUser}
        user={editingUser}
        title={editingUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
      />
    </>
  );
};

export default UsersPage;
