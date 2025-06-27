import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Eye } from "lucide-react";

const Organizations = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orgData, setOrgData] = useState([
    {
      id: 1,
      name: "Org_One",
      status: "Active",
      deviceId: "ORG001AB",
      region: "North Zone",
      location: "Delhi",
      facility: "HQ Facility",
      createdOn: "10-06-2025",
      updatedOn: "11-06-2025",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    deviceId: "",
    region: "",
    location: "",
    facility: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrg = () => {
    const isValid = Object.values(form).every((field) => field.trim() !== "");
    if (!isValid) return;

    const newOrg = {
      id: orgData.length + 1,
      ...form,
      status: "Active",
      createdOn: new Date().toLocaleDateString(),
      updatedOn: new Date().toLocaleDateString(),
    };

    setOrgData((prev) => [...prev, newOrg]);
    setForm({ name: "", deviceId: "", region: "", location: "", facility: "" });
    setIsModalOpen(false);
  };

  const filteredOrgs = orgData.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Device ID", selector: (row) => row.deviceId, sortable: true },
    { name: "Region", selector: (row) => row.region, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Facility", selector: (row) => row.facility, sortable: true },
    { name: "Created On", selector: (row) => row.createdOn },
    { name: "Updated On", selector: (row) => row.updatedOn },
    {
      name: "Action",
      cell: () => <Eye className="text-primary" size={18} />,
    },
  ];

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="bg-white border rounded p-4 mb-4 d-flex flex-column flex-md-row justify-content-between gap-3">
        <h1 className="h5 fw-semibold mb-0">Organizations List ({orgData.length})</h1>
        <button className="btn btn-sm btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Organization
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded p-4 mb-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
          <h2 className="h6 fw-semibold mb-0">Organizations</h2>
          <div className="d-flex flex-wrap gap-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-sm btn-secondary" onClick={() => setSearch("")}>
              Clear
            </button>
            <button className="btn btn-sm btn-primary">Export PDF</button>
            <button className="btn btn-sm btn-success">Export Excel</button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <DataTable
            columns={columns}
            data={filteredOrgs}
            pagination
            striped
            highlightOnHover
            responsive
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Organization</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form className="row g-3">
                  {Object.keys(form).map((field) => (
                    <div className="col-12 col-md-6" key={field}>
                      <input
                        type="text"
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="form-control"
                        value={form[field]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddOrg}>
                  Save Organization
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organizations;
