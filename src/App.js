import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from './components/AppLayout';

const Dashboard = lazy(() => import('./screens/Dashboard'))
const SignIn = lazy(() => import('./screens/SignIn'))

const App = () => {
  return (
    <AppLayout>
      <ToastContainer position="top-center" />
      <Suspense
        fallback="Loading..."
      >
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;
