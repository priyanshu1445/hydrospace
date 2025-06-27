import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { MapPin } from "lucide-react";
import Chart from "react-apexcharts";

// Chart configs
const radialOptions = {
  chart: { type: "radialBar" },
  plotOptions: {
    radialBar: {
      hollow: { size: "70%" },
      dataLabels: {
        name: { show: false },
        value: { fontSize: "22px", fontWeight: 600, color: "#00bcd4" },
      },
    },
  },
  labels: ["Cricket"],
};
const radialSeries = [70];

const lineOptions = {
  chart: { id: "trend-line", toolbar: { show: false } },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  colors: ["#fbbf24"],
  stroke: { curve: "smooth", width: 3 },
  title: {
    text: "Product Trends by Month",
    align: "center",
    style: { fontSize: "16px", fontWeight: "bold" },
  },
};
const lineSeries = [{ name: "Products", data: [30, 42, 35, 52, 50, 65, 72, 100, 130] }];

const columns = [
  { name: "Users", selector: (row) => row.name, sortable: true },
  { name: "Devices", selector: (row) => row.devices, sortable: true },
];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [data, setData] = useState([
    { name: "Risa D. Pearson", devices: 16 },
    { name: "Ann C. Thompson", devices: 16 },
    { name: "Paul J. Friend", devices: 16 },
    { name: "Linda G. Smith", devices: 16 },
  ]);

  const handleAddDevice = (e) => {
    e.preventDefault();
    if (deviceName && deviceId) {
      const newDevice = { name: deviceName, devices: deviceId };
      setData((prev) => [...prev, newDevice]);
      setDeviceName("");
      setDeviceId("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Export */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary">Export Data</button>
      </div>

      {/* Stats Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
        <div className="col">
          <div className="card h-100 shadow p-3">
            <h6>Total Devices</h6>
            <h2 className="fw-bold mt-2">4000+</h2>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow p-3">
            <h6>Active Devices</h6>
            <h4 className="fw-bold">6</h4>
            <small className="text-muted">Since last month</small>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow p-3">
            <h6>Offline Devices</h6>
            <h4 className="fw-bold">3</h4>
            <small className="text-muted">Since last month</small>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow p-3">
            <h6>Categories</h6>
            <h5 className="fw-bold">5</h5>
            <hr />
            <h6>Sub Categories</h6>
            <h5 className="fw-bold">10</h5>
          </div>
        </div>
      </div>

      {/* Google Map & Regions Info */}
      <div className="row  g-4 mb-4">
        <div className="col-md-8">
          <div className="card shadow p-3 h-100">
            <h5 className="mb-3">Google Map Location</h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14239.849498710531!2d75.8085438!3d26.841149"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Map"
            ></iframe>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row row-cols-1  g-3">
            {[
              { label: "Total Regions", value: "20+" },
              { label: "Total Locations", value: "100+" },
              { label: "Total Organizations", value: "30+" },
              { label: "Total Facilities", value: "420+" },
            ].map((item, i) => (
              <div className="col" key={i}>
                <div className="card shadow h-100 p-3 d-flex align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <MapPin className="text-primary" />
                    <div>
                      <small className="text-muted">{item.label}</small>
                      <div className="fw-bold">{item.value}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Table & Radial Chart */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold">Device Managers</h6>
              <button className="btn btn-sm btn-primary" onClick={() => setIsModalOpen(true)}>
                Add Device
              </button>
            </div>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              striped
              highlightOnHover
              pagination
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow p-3 h-100">
            <h6 className="fw-semibold mb-3">Radial Chart</h6>
            <Chart options={radialOptions} series={radialSeries} type="radialBar" height={300} />
          </div>
        </div>
      </div>

      {/* Line Chart & Recent Users */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow p-3 h-100">
            <h6 className="fw-semibold mb-3">Product Trend</h6>
            <Chart options={lineOptions} series={lineSeries} type="line" height={300} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow p-3 h-100">
            <h6 className="fw-semibold mb-3">Latest Users (Top 5)</h6>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Devices</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(-5).map((user, i) => (
                  <tr key={i}>
                    <td className="d-flex align-items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/150?img=${i + 1}`}
                        className="rounded-circle"
                        width="32"
                        height="32"
                        alt={user.name}
                      />
                      {user.name}
                    </td>
                    <td>{user.devices}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Add New Device</h5>
                <button className="btn-close" onClick={() => setIsModalOpen(false)} />
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddDevice} className="vstack gap-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Device Name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary w-100">
                    Save Device
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
