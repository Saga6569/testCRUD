import { Users, CheckSquare, TrendingUp, Clock } from 'lucide-react'
import { mockUsers, mockTasks } from '../data/mockData'

const HomePage = () => {
 const totalUsers = mockUsers.length
 const totalTasks = mockTasks.length
 const completedTasks = mockTasks.filter((task) => task.completed).length
 const pendingTasks = totalTasks - completedTasks

 const stats = [
  {
   name: 'Всего пользователей',
   value: totalUsers,
   icon: Users,
   color: 'bg-blue-500',
   bgColor: 'bg-blue-50',
   textColor: 'text-blue-600',
  },
  {
   name: 'Всего задач',
   value: totalTasks,
   icon: CheckSquare,
   color: 'bg-green-500',
   bgColor: 'bg-green-50',
   textColor: 'text-green-600',
  },
  {
   name: 'Выполнено задач',
   value: completedTasks,
   icon: TrendingUp,
   color: 'bg-purple-500',
   bgColor: 'bg-purple-50',
   textColor: 'text-purple-600',
  },
  {
   name: 'В ожидании',
   value: pendingTasks,
   icon: Clock,
   color: 'bg-orange-500',
   bgColor: 'bg-orange-50',
   textColor: 'text-orange-600',
  },
 ]

 const recentTasks = mockTasks
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  .slice(0, 5)

 const recentUsers = mockUsers
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  .slice(0, 3)

 return (
  <div className="space-y-8">
   <div>
    <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать!</h1>
    <p className="mt-2 text-gray-600">
     Обзор вашей системы управления пользователями и задачами
    </p>
   </div>

   {/* Stats Grid */}
   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat) => {
     const Icon = stat.icon
     return (
      <div key={stat.name} className="card">
       <div className="card-content mt-4">
        <div className="flex items-center">
         <div className={`flex-shrink-0 p-3 rounded-lg ${stat.bgColor}`}>
          <Icon className={`h-6 w-6 ${stat.textColor}`} />
         </div>
         <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{stat.name}</p>
          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
         </div>
        </div>
       </div>
      </div>
     )
    })}
   </div>

   <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    {/* Recent Tasks */}
    <div className="card">
     <div className="card-header">
      <h2 className="text-lg font-semibold text-gray-900">Последние задачи</h2>
     </div>
     <div className="card-content">
      <div className="space-y-4">
       {recentTasks.map((task) => (
        <div
         key={task.id}
         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
         <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{task.description}</p>
         </div>
         <div className="flex items-center gap-2">
          <span
           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            task.priority === 'high'
             ? 'bg-red-100 text-red-800'
             : task.priority === 'medium'
             ? 'bg-yellow-100 text-yellow-800'
             : 'bg-green-100 text-green-800'
           }`}
          >
           {task.priority}
          </span>
          <span
           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            task.completed
             ? 'bg-green-100 text-green-800'
             : 'bg-gray-100 text-gray-800'
           }`}
          >
           {task.completed ? 'Выполнено' : 'В работе'}
          </span>
         </div>
        </div>
       ))}
      </div>
     </div>
    </div>

    {/* Recent Users */}
    <div className="card">
     <div className="card-header">
      <h2 className="text-lg font-semibold text-gray-900">
       Новые пользователи
      </h2>
     </div>
     <div className="card-content">
      <div className="space-y-4">
       {recentUsers.map((user) => (
        <div
         key={user.id}
         className="flex items-center p-3 bg-gray-50 rounded-lg"
        >
         <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
           <span className="text-sm font-medium text-blue-700">
            {user.name.charAt(0)}
           </span>
          </div>
         </div>
         <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
         </div>
         <div>
          <span
           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            user.role === 'Admin'
             ? 'bg-red-100 text-red-800'
             : user.role === 'Manager'
             ? 'bg-blue-100 text-blue-800'
             : 'bg-green-100 text-green-800'
           }`}
          >
           {user.role}
          </span>
         </div>
        </div>
       ))}
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default HomePage
