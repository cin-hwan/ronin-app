import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from './components/AppLayout';
import SendAssets from './screens/SendAssets';

const Dashboard = lazy(() => import('./screens/Dashboard'))
const SignIn = lazy(() => import('./screens/SignIn'))

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <ToastContainer position="top-center" />
        <Suspense
          fallback="Loading..."
        >
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/send" element={<SendAssets />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
