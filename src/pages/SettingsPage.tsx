import { Settings, User, Bell, Shield, Palette } from 'lucide-react';

const SettingsPage = () => {
  const settingsGroups = [
    {
      title: 'Профиль',
      icon: User,
      description: 'Управление личной информацией',
      items: [
        { label: 'Изменить имя', value: 'Администратор' },
        { label: 'Email', value: 'admin@example.com' },
        { label: 'Телефон', value: '+7 (999) 123-45-67' },
      ]
    },
    {
      title: 'Уведомления',
      icon: Bell,
      description: 'Настройка уведомлений',
      items: [
        { label: 'Email уведомления', value: 'Включено' },
        { label: 'Push уведомления', value: 'Выключено' },
        { label: 'SMS уведомления', value: 'Включено' },
      ]
    },
    {
      title: 'Безопасность',
      icon: Shield,
      description: 'Настройки безопасности',
      items: [
        { label: 'Двухфакторная аутентификация', value: 'Выключено' },
        { label: 'Сессии', value: '3 активные' },
        { label: 'Последний вход', value: '2 часа назад' },
      ]
    },
    {
      title: 'Интерфейс',
      icon: Palette,
      description: 'Настройка внешнего вида',
      items: [
        { label: 'Тема', value: 'Светлая' },
        { label: 'Язык', value: 'Русский' },
        { label: 'Часовой пояс', value: 'UTC+3' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="mt-1 text-sm text-gray-500">
          Управление настройками приложения и профиля
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingsGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.title} className="card">
              <div className="card-header">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{group.title}</h2>
                    <p className="text-sm text-gray-500">{group.description}</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  {group.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm text-gray-500">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="btn-outline w-full">
                    Настроить
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
              <Settings className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Системная информация</h2>
              <p className="text-sm text-gray-500">Информация о приложении</p>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">v1.0.0</div>
              <div className="text-sm text-gray-500">Версия приложения</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">React 18</div>
              <div className="text-sm text-gray-500">Технология</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">TypeScript</div>
              <div className="text-sm text-gray-500">Язык программирования</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
