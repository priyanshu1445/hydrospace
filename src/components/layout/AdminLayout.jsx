import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="container-fluid p-0">
      <div className="row  flex-nowrap vh-100 ">
        {/* Sidebar */}
        <div
          className={`col-12  col-md-3 col-lg-2  p-0 d-flex flex-column ${
            isSidebarOpen ? "d-block" : "d-none d-md-flex"
          }`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Right side content */}
        <div className="col p-0 d-flex flex-column bg-light">
          {/* Top Navbar */}
          <div className=" border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-secondary d-md-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={20} />
            </button>
            <Navbar />
          </div>

          {/* Page Content */}
          <div className="p-3 overflow-auto flex-grow-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
