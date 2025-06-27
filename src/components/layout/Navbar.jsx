import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Search,
  ChevronDown,
  User,
  HelpCircle,
  Lock,
  LogOut,
  Settings,
  X,
} from "lucide-react";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Initialize AOS on load
  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  return (
    <nav className="w-100 px-3 py-2 bg-white d-flex align-items-center justify-content-between flex-wrap gap-3 position-relative">
      {/* 🔍 Mobile Search Icon */}
      <div className="d-md-none">
        <button onClick={() => setShowSearchBar(true)} className="btn p-0 border-0">
          <Search size={18} className="text-secondary" />
        </button>
      </div>

      {/* Right Section (Desktop Search + Profile) */}
      <div className="d-flex align-items-center ms-auto gap-3">
        {/* 🔍 Desktop Search */}
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <Search size={16} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control bg-light border-0 text-secondary"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button onClick={() => setSearchValue("")} className="btn btn-light border-0">
                <X size={16} className="text-muted" />
              </button>
            )}
          </div>
        </div>

        {/* 👤 Profile */}
        <div className="position-relative">
          <div
            className="d-flex align-items-center gap-2"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="rounded-circle"
              width="32"
              height="32"
              alt="Profile"
            />
            <span className="d-none d-md-block fw-medium text-dark small">
              Super Admin
            </span>
            <ChevronDown size={16} className="d-none d-md-block text-muted" />
          </div>

          {/* ✅ Profile Dropdown */}
          {showDropdown && (
            <div
              className="position-absolute end-0 mt-2 bg-white shadow border rounded py-2"
              style={{ width: "200px", zIndex: 1000 }}
              data-aos="fade-down"
            >
              <p className="px-3 py-2 small text-secondary fw-semibold border-bottom mb-1">
                Welcome Super Admin!
              </p>
              <DropdownItem icon={<User size={16} />} label="My Account" />
              <DropdownItem icon={<Settings size={16} />} label="Settings" />
              <DropdownItem icon={<HelpCircle size={16} />} label="Support" />
              <hr className="my-1" />
              <DropdownItem icon={<Lock size={16} />} label="Lock Screen" />
              <DropdownItem
                icon={<LogOut size={16} className="text-danger" />}
                label="Sign Out"
                red
              />
            </div>
          )}
        </div>
      </div>

      {/* 📱 Mobile Search Input (floating) */}
      {showSearchBar && (
        <div
          className="position-absolute  top-100 start-0 w-100 bg-white shadow-sm px-3 py-3 d-md-none"
          data-aos="fade-down"
          style={{ zIndex: 1000 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-dark fw-semibold small">Search</span>
            <button
              className="btn p-0 border-0"
              onClick={() => setShowSearchBar(false)}
            >
              <X size={20} className="text-muted" />
            </button>
          </div>
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <Search size={16} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control bg-light border-0 text-secondary"
              placeholder="Type to search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="btn btn-light border-0"
              >
                <X size={16} className="text-muted" />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// 🔁 Reusable Dropdown Item
const DropdownItem = ({ icon, label, red }) => (
  <button
    className={`w-100 d-flex align-items-center gap-2 px-3 py-2 small ${
      red ? "text-danger fw-semibold" : "text-secondary"
    } btn btn-light border-0 rounded-0 text-start`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
