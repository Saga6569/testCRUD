import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import type { User, UserFormData } from '../types'
import UserTable from '../components/UserTable'
import UserModal from '../components/UserModal'

const UsersPage = () => {
 const context = useContext(UserContext)

 if (!context) {
  throw new Error('UsersPage must be used within UserProvider')
 }

 const { users, addUser, updateUser, deleteUser, loading } = context

 const [isModalOpen, setIsModalOpen] = useState(false)
 const [editingUser, setEditingUser] = useState<User | null>(null)

 const handleAddUser = () => {
  setEditingUser(null)
  setIsModalOpen(true)
 }

 const handleEditUser = (user: User) => {
  setEditingUser(user)
  setIsModalOpen(true)
 }

 const handleDeleteUser = (userId: string) => {
  deleteUser(userId)
 }

 const handleSubmitUser = async (formData: UserFormData) => {
  if (editingUser) {
   // Редактирование существующего пользователя
   updateUser(editingUser.id, formData)
    users.map((user) =>
     user.id === editingUser.id
      ? {
         ...user,
         ...formData,
         updatedAt: new Date(),
        }
      : user
   )

  } else {
   // Добавление нового пользователя
   const newUser: User = await addUser(formData)
   setEditingUser(newUser)
  }
 }

 const handleCloseModal = () => {
  setIsModalOpen(false)
  setEditingUser(null)
 }

 return (
  <>
   <UserTable
    users={users}
    onEdit={handleEditUser}
    onDelete={handleDeleteUser}
    onAdd={handleAddUser}
    loading={loading}
   />

   <UserModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    onSubmit={handleSubmitUser}
    user={editingUser}
    title={editingUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
    loading={loading}
   />
  </>
 )
}

export default UsersPage
