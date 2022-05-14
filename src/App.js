import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import AppLayout from './components/AppLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = lazy(() => import('./screens/Dashboard'))
const SignIn = lazy(() => import('./screens/SignIn'))

const App = () => {
  return (
    <AppLayout>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
