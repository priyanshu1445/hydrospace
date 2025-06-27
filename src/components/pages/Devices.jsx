import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Eye } from "lucide-react";

const Devices = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deviceData, setDeviceData] = useState([
    {
      id: 11,
      name: "Device_1",
      status: "Active",
      deviceId: "DEVO1RLF",
      region: "MP-East",
      location: "Jaipur",
      facility: "Aqua Pure Plant",
      createdOn: "05-11-2025",
      updatedOn: "05-11-2025",
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

  const handleAddDevice = () => {
    const { name, deviceId, region, location, facility } = form;
    if (name && deviceId && region && location && facility) {
      const newDevice = {
        id: deviceData.length + 1,
        name,
        status: "Active",
        deviceId,
        region,
        location,
        facility,
        createdOn: new Date().toLocaleDateString(),
        updatedOn: new Date().toLocaleDateString(),
      };
      setDeviceData([...deviceData, newDevice]);
      setForm({ name: "", deviceId: "", region: "", location: "", facility: "" });
      setIsModalOpen(false);
    }
  };

  const filteredDevices = deviceData.filter((device) =>
    device.name.toLowerCase().includes(search.toLowerCase())
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
      cell: () => <Eye className="text-primary cursor-pointer" size={18} />,
    },
  ];

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="bg-white p-4 rounded shadow-sm mb-4 d-flex flex-column flex-md-row justify-content-between gap-3">
        <h1 className="h5 fw-bold mb-0">Devices List ({deviceData.length})</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
          aria-label="Add new device"
        >
          + Add Device
        </button>
      </div>

      {/* Search + Export */}
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <div className="row gy-3 gx-3 align-items-end">
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Search by Name</label>
            <input
              type="text"
              placeholder="e.g. Device_1"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search Devices"
            />
          </div>
          <div className="col-12 col-md-8 d-flex flex-wrap gap-2">
            <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
              Clear
            </button>
            <button className="btn btn-success">Export PDF</button>
            <button className="btn btn-info text-white">Export Excel</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <DataTable
          columns={columns}
          data={filteredDevices}
          pagination
          striped
          highlightOnHover
          responsive
          noHeader
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div
              className="card shadow w-100 mx-3"
              style={{ maxWidth: "600px" }}
              role="document"
            >
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Add New Device</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <div className="card-body">
                <form className="row g-3">
                  {["name", "deviceId", "region", "location", "facility"].map((field) => (
                    <div className="col-12 col-sm-6" key={field}>
                      <input
                        type="text"
                        name={field}
                        className="form-control"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        aria-label={field}
                      />
                    </div>
                  ))}
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={handleAddDevice}
                    >
                      Save Device
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
