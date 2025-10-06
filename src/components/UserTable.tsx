import { useContext, useState } from 'react'
import { Edit, Trash2, Plus, Users, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import type { User } from '../types'
import Loader from './Loader'
import ConfirmModal from './ConfirmModal'
import { UserContext } from '../contexts/UserContext'
import Pagination from './Pagination'

interface UserTableProps {
 users: User[]
 onEdit: (user: User) => void
 onDelete: (userId: string) => void
 onAdd: () => void
 loading?: boolean
}

const UserTable = ({
 users,
 onEdit,
 onDelete,
 onAdd,
 loading = false,
}: UserTableProps) => {
 const context = useContext(UserContext)
 if (!context) {
  throw new Error('UserTable must be used within UserProvider')
 }
 const { searchTerm, setSearchTerm, sortField, sortDirection, setSorting, sortedUsers, paginatedUsers, page, pageSize, totalPages, totalItems, setPage, setPageSize } = context
 const [deleteModal, setDeleteModal] = useState<{
  isOpen: boolean
  userId: string | null
  userName: string
 }>({
  isOpen: false,
  userId: null,
  userName: '',
 })

 const handleDelete = (userId: string) => {
  const user = users.find((u) => u.id === userId)
  if (user) {
   setDeleteModal({
    isOpen: true,
    userId,
    userName: user.name,
   })
  }
 }

 const handleConfirmDelete = () => {
  if (deleteModal.userId) {
   onDelete(deleteModal.userId)
   setDeleteModal({ isOpen: false, userId: null, userName: '' })
  }
 }

 const handleCloseModal = () => {
  setDeleteModal({ isOpen: false, userId: null, userName: '' })
 }

 const handleSort = (field: keyof User) => {
  if (sortField === field) {
   // Если уже сортируем по этому полю, меняем направление
   setSorting(field, sortDirection === 'asc' ? 'desc' : 'asc')
  } else {
   // Если новое поле, начинаем с возрастания
   setSorting(field, 'asc')
  }
 }

 const getSortIcon = (field: keyof User) => {
  if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
  return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
 }

 const getRoleBadgeColor = (role: string) => {
  switch (role) {
   case 'Admin':
    return 'bg-red-100 text-red-800'
   case 'Manager':
    return 'bg-blue-100 text-blue-800'
   case 'User':
    return 'bg-green-100 text-green-800'
   default:
    return 'bg-gray-100 text-gray-800'
  }
 }

 return (
  <div className="space-y-6 relative">
   {/* Большой лоадер на весь экран */}
   {loading && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
     <div className="bg-white rounded-lg p-8 shadow-xl">
      <Loader size="lg" />
      <p className="mt-4 text-center text-gray-600">Загрузка...</p>
     </div>
    </div>
   )}
   <div className="flex items-center justify-between">
    <div>
     <h1 className="text-2xl font-bold text-gray-900">Пользователи</h1>
     <p className="mt-1 text-sm text-gray-500">
      Управление пользователями системы
                   {searchTerm && (
                     <span className="ml-2 text-blue-600">
                       (найдено: {sortedUsers.length} из {users.length})
                     </span>
                   )}
     </p>
    </div>
    <button
     onClick={onAdd}
     disabled={loading}
     className="btn-primary flex items-center gap-2 disabled:opacity-50"
    >
     <Plus className="h-4 w-4" />
     Добавить пользователя
    </button>
   </div>

   {/* Поиск */}
  <div className="card">
   <div>
     <div className="relative">
      <input
       type="text"
       placeholder="Поиск по имени, email, телефону или роли..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       className="input s"
      />
     </div>
    </div>
   </div>

   <div className="card">
    <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
       <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         <button
          onClick={() => handleSort('name')}
          className="flex items-center gap-1 hover:text-gray-700 transition-colors"
          disabled={loading}
         >
          Пользователь
          {getSortIcon('name')}
         </button>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         <button
          onClick={() => handleSort('email')}
          className="flex items-center gap-1 hover:text-gray-700 transition-colors"
          disabled={loading}
         >
          Контакты
          {getSortIcon('email')}
         </button>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         <button
          onClick={() => handleSort('role')}
          className="flex items-center gap-1 hover:text-gray-700 transition-colors"
          disabled={loading}
         >
          Роль
          {getSortIcon('role')}
         </button>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         <button
          onClick={() => handleSort('createdAt')}
          className="flex items-center gap-1 hover:text-gray-700 transition-colors"
          disabled={loading}
         >
          Дата создания
          {getSortIcon('createdAt')}
         </button>
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
         Действия
        </th>
       </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
        <tr key={user.id} className="hover:bg-gray-50">
         <td className="px-6 py-4 whitespace-nowrap">
          <div>
           <div className="text-sm font-medium text-gray-900">{user.name}</div>
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
          <span
           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
            user.role
           )}`}
          >
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
            disabled={loading}
            className="text-blue-600 hover:text-blue-900 p-1 rounded disabled:opacity-50"
            title="Редактировать"
           >
            <Edit className="h-4 w-4" />
           </button>
           <button
            onClick={() => handleDelete(user.id)}
            disabled={loading}
            className="text-red-600 hover:text-red-900 p-1 rounded disabled:opacity-50"
            title="Удалить"
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

    {sortedUsers.length === 0 && (
     <div className="text-center py-12">
      <Users className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
       {searchTerm ? 'Пользователи не найдены' : 'Нет пользователей'}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
       {searchTerm
        ? 'Попробуйте изменить поисковый запрос.'
        : 'Начните с добавления нового пользователя.'}
      </p>
      <div className="mt-6">
       {!searchTerm && (
        <button onClick={onAdd} className="btn-primary">
         <Plus className="h-4 w-4 mr-2" />
         Добавить пользователя
        </button>
       )}
      </div>
     </div>
    )}
   </div>

   <ConfirmModal
    isOpen={deleteModal.isOpen}
    onClose={handleCloseModal}
    onConfirm={handleConfirmDelete}
    title="Подтверждение удаления"
    message={`Вы уверены, что хотите удалить пользователя "${deleteModal.userName}"? Это действие нельзя отменить.`}
    confirmText="Удалить"
    cancelText="Отмена"
    loading={loading}
   />
   <Pagination
    page={page}
    pageSize={pageSize}
    totalPages={totalPages}
    totalItems={totalItems}
    onPageChange={setPage}
    onPageSizeChange={setPageSize}
   />
  </div>
 )
}

export default UserTable
