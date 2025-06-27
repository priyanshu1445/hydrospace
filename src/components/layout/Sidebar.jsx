import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-4.png";
import {
  ChevronDown,
  LayoutDashboard,
  MonitorSmartphone,
  Building2,
  Grid2X2,
  Globe,
  MapPin,
  Server,
  Settings,
  HelpCircle,
  User,
  Lock,
  LogOut,
} from "lucide-react";

const Sidebar = ({ onClose }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside
      className="bg-white text-dark vh-100 shadow-sm overflow-auto position-relative"
      style={{ width: "auto" }}
    >
      {/* ✖️ Close Button (Mobile Only) */}
      <div className="d-md-none position-absolute top-0 end-0 p-3 z-3">
        <button onClick={onClose} className="btn-close" aria-label="Close Sidebar" />
      </div>

      {/* 🚀 Logo */}
      <div className="p-4 d-flex align-items-center justify-content-center mt-5 mt-md-3">
        <img src={logo} alt="Logo" height="40" className="me-2" />
        <p className="m-0 fw-bold">HydroScope</p>
      </div>

      {/* 👤 Profile Block */}
      <div className="border-top border-bottom p-3 position-relative" ref={dropdownRef}>
        <div className="d-flex flex-column align-items-center text-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="rounded-circle"
            width="60"
            height="60"
          />
          <div>
            <div
              className="d-flex align-items-center justify-content-center gap-1 cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <span className="fw-semibold">Super Admin</span>
              <ChevronDown size={14} />
            </div>
            <small className="text-muted">Admin Head</small>
          </div>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="position-absolute bg-white shadow rounded z-2 mt-2 p-2"
            style={{ width: "200px", left: "30px" }}
          >
            <p className="fw-semibold text-secondary small border-bottom pb-2 px-2">
              Welcome Super Admin!
            </p>
            <NavDropdownItem icon={<User size={16} />} label="My Account" />
            <NavDropdownItem icon={<Settings size={16} />} label="Settings" />
            <NavDropdownItem icon={<HelpCircle size={16} />} label="Support" />
            <hr className="my-1" />
            <NavDropdownItem icon={<Lock size={16} />} label="Lock Screen" />
            <NavDropdownItem
              icon={<LogOut size={16} className="text-danger" />}
              label="Sign Out"
              red
            />
          </div>
        )}
      </div>

      {/* 📁 Navigation Sections */}
      <Section title="Main Menu">
        <NavItem to="/admin/dashboard" label="Dashboard" icon={<LayoutDashboard />} badge="9" />
        <NavItem to="/admin/devices" label="Devices" icon={<MonitorSmartphone />} />
        <NavItem to="/admin/organizations" label="Organizations" icon={<Building2 />} />
        <NavItem to="/admin/categories" label="Categories" icon={<Grid2X2 />} />
      </Section>

      <Section title="Deployment Site">
        <NavItem to="/admin/regions" label="Regions" icon={<Globe />} />
        <NavItem to="/admin/locations" label="Locations" icon={<MapPin />} />
        <NavItem to="/admin/facilities" label="Facilities" icon={<Server />} />
      </Section>

      <Section title="Other">
        <NavItem to="/admin/settings" label="Setting" icon={<Settings />} />
        <NavItem to="/" label="Logout" icon={<HelpCircle />} />
      </Section>
    </aside>
  );
};

const Section = ({ title, children }) => (
  <>
    <div className="px-3 pt-4 text-uppercase text-muted small fw-semibold">{title}</div>
    <nav className="nav flex-column px-3 gap-1 mb-1">{children}</nav>
  </>
);

const NavItem = ({ to, label, icon, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-link d-flex justify-content-between align-items-center px-3 py-2 rounded ${
        isActive ? "text-primary fw-semibold" : "text-dark"
      }`
    }
  >
    <div className="d-flex align-items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
    {badge && <span className="badge bg-danger rounded-pill">{badge}</span>}
  </NavLink>
);

const NavDropdownItem = ({ icon, label, red }) => (
  <button
    className={`btn btn-light w-100 d-flex align-items-center gap-2 px-2 py-2 text-start ${
      red ? "text-danger fw-semibold" : "text-secondary"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Sidebar;
