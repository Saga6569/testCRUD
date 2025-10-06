/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useMemo, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User, UserFormData } from '../types'
import { mockUsers } from '../data/mockData'

export interface UserContextType {
 users: User[]
 addUser: (userData: UserFormData) => Promise<User>
 updateUser: (id: string, userData: UserFormData) => Promise<User>
 deleteUser: (id: string) => Promise<void>
 getUserById: (id: string) => User | undefined
 searchUsers: (query: string) => User[]
 getUsersByRole: (role: string) => User[]
 loading: boolean
 searchTerm: string
 setSearchTerm: (term: string) => void
 filteredUsers: User[]
 sortField: keyof User | null
 sortDirection: 'asc' | 'desc'
 setSorting: (field: keyof User | null, direction: 'asc' | 'desc') => void
 sortedUsers: User[]
 page: number
 pageSize: number
 totalPages: number
 totalItems: number
 setPage: (page: number) => void
 setPageSize: (size: number) => void
 paginatedUsers: User[]
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
 children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
 const [users, setUsers] = useState<User[]>(mockUsers)
 const [loading, setLoading] = useState<boolean>(false)
 const [searchTerm, setSearchTerm] = useState<string>('')
 const [sortField, setSortField] = useState<keyof User | null>(null)
 const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
 const [page, setPage] = useState<number>(1)
 const [pageSize, setPageSize] = useState<number>(10)

 // Загрузка пользователей из localStorage при первом рендере
 useEffect(() => {
  try {
   const savedUsers = localStorage.getItem('users')
   if (savedUsers) {
    const parsed = JSON.parse(savedUsers)
    // Конвертируем строки дат обратно в Date объекты
    const usersWithDates = parsed.map((user: User) => ({
     ...user,
     createdAt: new Date(user.createdAt),
     updatedAt: new Date(user.updatedAt)
    }))
    setUsers(usersWithDates)
   } else {
    // Если нет сохраненных данных, используем mock данные
    setUsers(mockUsers)
   }
  } catch (error) {
   console.error('Ошибка при загрузке пользователей из localStorage:', error)
   setUsers(mockUsers)
  }
 }, [])

 // Автоматическое сохранение в localStorage при изменении users
 useEffect(() => {
  if (users.length > 0) { // Сохраняем только если есть пользователи
   try {
    localStorage.setItem('users', JSON.stringify(users))
   } catch (error) {
    console.error('Ошибка при сохранении пользователей в localStorage:', error)
   }
  }
 }, [users])


 const addUser = async (userData: UserFormData): Promise<User> => {
  setLoading(true)
  await sleep()

  const newId = (
   Math.max(...users.map((u) => parseInt(u.id)), 0) + 1
  ).toString()
  const newUser: User = {
   id: newId,
   ...userData,
   createdAt: new Date(),
   updatedAt: new Date(),
  }

  const updatedUsers = [...users, newUser]
  setUsers(updatedUsers)
  setLoading(false)
  return newUser
 }

 const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))

 const updateUser = async (
  id: string,
  userData: UserFormData
 ): Promise<User> => {
  setLoading(true)
  await sleep()

  const userExists = users.find((user) => user.id === id)
  if (!userExists) {
   setLoading(false)
   throw new Error('Пользователь не найден')
  }

  const updatedUser: User = {
   ...userExists,
   ...userData,
   updatedAt: new Date(),
  }

  const updatedUsers = users.map((user) => (user.id === id ? updatedUser : user))
  setUsers(updatedUsers)
  setLoading(false)
  return updatedUser
 }

 const deleteUser = async (id: string): Promise<void> => {
  setLoading(true)
  await sleep()

  const userExists = users.find((user) => user.id === id)
  if (!userExists) {
   setLoading(false)
   throw new Error('Пользователь не найден')
  }

  const updatedUsers = users.filter((user) => user.id !== id)
  setUsers(updatedUsers)
  setLoading(false)
 }

 const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
 }

 const searchUsers = (query: string): User[] => {
  if (!query.trim()) return users

  const lowercaseQuery = query.toLowerCase()
  return users.filter(
   (user) =>
    user.name.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery) ||
    user.phone.includes(query) ||
    user.role.toLowerCase().includes(lowercaseQuery)
  )
 }

 const getUsersByRole = (role: string): User[] => {
  return users.filter((user) => user.role === role)
 }

 // Фильтрация пользователей по поисковому запросу
 const filteredUsers = useMemo(() => {
  if (!searchTerm.trim()) return users

  const lowercaseQuery = searchTerm.toLowerCase()
  return users.filter(user =>
   user.name.toLowerCase().includes(lowercaseQuery) ||
   user.email.toLowerCase().includes(lowercaseQuery) ||
   user.phone.includes(searchTerm) ||
   user.role.toLowerCase().includes(lowercaseQuery)
  )
 }, [users, searchTerm])

 // Сортировка отфильтрованных пользователей
 const sortedUsers = useMemo(() => {
  if (!sortField) return filteredUsers

  return [...filteredUsers].sort((a, b) => {
   let aValue: string | number | Date = a[sortField]
   let bValue: string | number | Date = b[sortField]

   if (aValue instanceof Date) aValue = aValue.getTime()
   if (bValue instanceof Date) bValue = bValue.getTime()

   if (typeof aValue === 'string' && typeof bValue === 'string') {
    aValue = aValue.toLowerCase()
    bValue = bValue.toLowerCase()
   }

   if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
   if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
   return 0
  })
 }, [filteredUsers, sortField, sortDirection])

 // Сброс страницы при изменении поиска или сортировки
 useEffect(() => {
  setPage(1)
 }, [searchTerm, sortField, sortDirection])

 // Пагинация
 const totalItems = sortedUsers.length
 const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

 useEffect(() => {
  if (page > totalPages) {
   setPage(totalPages)
  }
 }, [totalPages, page])

 const paginatedUsers = useMemo(() => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return sortedUsers.slice(start, end)
 }, [sortedUsers, page, pageSize])

 // Функция для установки сортировки
 const setSorting = (field: keyof User | null, direction: 'asc' | 'desc') => {
  setSortField(field)
  setSortDirection(direction)
 }

 return (
  <UserContext.Provider
   value={{
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUsers,
    getUsersByRole,
    loading,
    searchTerm,
    setSearchTerm,
    filteredUsers,
    sortField,
    sortDirection,
    setSorting,
    sortedUsers,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    paginatedUsers,
   }}
  >
   {children}
  </UserContext.Provider>
 )
}
