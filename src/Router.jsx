import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from"../src/components/layout/AdminLayout";

// Admin Pages
import Dashboard from "../src/components/pages/Dashboard";
import Devices from "../src/components/pages/Devices";
import Organizations from "../src/components/pages/Organizations";
import Categories from "../src/components/pages/Categories";
import Regions from "../src/components/pages/Regions";
import Locations from "../src/components/pages/Locations";
import Facilities from "../src/components/pages/Facilities";
import Settings from "../src/components/pages/Settings";
import Support from "../src/components/pages/Support";
import SubCategoryPage from "../src/components/pages/SubCategory";

// Auth Page
import AdminLogin from "../src/auth/AdminLogin";

// Public Home Page (Converted to Bootstrap)
const PublicHomePage = () => (
  <div className="d-flex justify-content-center align-items-center vh-100 fw-bold fs-2">
    Welcome to My Website 🚀
  </div>
);

// Auth check
const isAuthenticated = () => !!localStorage.getItem("admin_token");

// Private Route
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
}

// Main Router Component
const Router = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<PublicHomePage />} />

      {/* Redirect /admin → /admin-login */}
      <Route path="/admin" element={<Navigate to="/admin-login" replace />} />

      {/* Admin login */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="devices" element={<Devices />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<SubCategoryPage />} />
        <Route path="regions" element={<Regions />} />
        <Route path="locations" element={<Locations />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* 404 fallback */}
      <Route
        path="*"
        element={
          <div className="p-4 text-center text-danger fw-semibold fs-5">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default Router;
