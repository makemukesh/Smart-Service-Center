import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Centers from './pages/Centers';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import Vehicles from './pages/customer/Vehicles';
import BookService from './pages/customer/BookService';
import MyBookings from './pages/customer/MyBookings';
import Feedback from './pages/customer/Feedback';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminFeedbacks from './pages/admin/AdminFeedbacks';
import AdminCenter from './pages/admin/AdminCenter';

// Super Admin Pages
import ManageUsers from './pages/superadmin/ManageUsers';
import ManageCenters from './pages/superadmin/ManageCenters';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<><Home /><Footer /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<><Services /><Footer /></>} />
              <Route path="/centers" element={<><Centers /><Footer /></>} />

              {/* Customer Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute roles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/vehicles" element={
                <ProtectedRoute roles={['customer']}>
                  <Vehicles />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/book" element={
                <ProtectedRoute roles={['customer']}>
                  <BookService />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/bookings" element={
                <ProtectedRoute roles={['customer']}>
                  <MyBookings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/feedback/:bookingId" element={
                <ProtectedRoute roles={['customer']}>
                  <Feedback />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="feedbacks" element={<AdminFeedbacks />} />
                <Route path="center" element={<AdminCenter />} />
              </Route>

              {/* Super Admin Routes */}
              <Route path="/superadmin" element={
                <ProtectedRoute roles={['superadmin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="centers" element={<ManageCenters />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="payments" element={<AdminBookings />} />
                <Route path="analytics" element={<AdminDashboard />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(30, 41, 59, 0.95)',
              color: '#e2e8f0',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              fontSize: '14px'
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
