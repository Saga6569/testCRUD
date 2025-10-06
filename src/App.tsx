import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
    </UserProvider>
  );
}

export default App;