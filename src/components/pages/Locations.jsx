import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// Create Modal
const CreateLocationModal = ({ isOpen, onClose, onCreateLocation }) => {
  const [locationName, setLocationName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationName.trim()) {
      onCreateLocation(locationName.trim());
      setLocationName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Location</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Location Name"
                className="form-control"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Modal
const EditLocationModal = ({ isOpen, onClose, location, onUpdate }) => {
  const [newName, setNewName] = useState(location?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      onUpdate(location.id, newName.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Location</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Location Name"
                className="form-control"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Component
const Locations = () => {
  const [locations, setLocations] = useState([
    { id: 'loc1', name: 'New York', created: '2025-06-01', updated: '2025-06-01' },
    { id: 'loc2', name: 'London', created: '2025-05-28', updated: '2025-05-28' },
    { id: 'loc3', name: 'Tokyo', created: '2025-05-25', updated: '2025-05-25' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Date');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLocations = [...filteredLocations].sort((a, b) => {
    if (sortOrder === 'Date') {
      return new Date(b.created) - new Date(a.created);
    }
    return 0;
  });

  const handleCreateLocation = (name) => {
    const newLocation = {
      id: crypto.randomUUID(),
      name,
      created: new Date().toISOString().slice(0, 10),
      updated: new Date().toISOString().slice(0, 10),
    };
    setLocations([...locations, newLocation]);
  };

  const handleUpdateLocation = (id, newName) => {
    const updatedList = locations.map(loc =>
      loc.id === id ? { ...loc, name: newName, updated: new Date().toISOString().slice(0, 10) } : loc
    );
    setLocations(updatedList);
  };

  const handleDeleteLocation = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter(loc => loc.id !== id));
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        {/* Optimized Button */}
        <button
          className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2 shadow-sm"
          onClick={() => setIsCreateModalOpen(true)}
          aria-label="Create Location"
          style={{ transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector('svg').style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector('svg').style.transform = 'rotate(0deg)';
          }}
        >
          <PlusCircle size={18} style={{ transition: 'transform 0.3s ease' }} />
          <span>Create Location</span>
        </button>

        <div className="d-flex flex-wrap align-items-center gap-2 w-100 w-md-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ maxWidth: '220px' }}
          />
          <button
            className={`btn btn-outline-primary ${!searchTerm.trim() ? 'd-none' : ''}`}
            onClick={() => setSearchTerm('')}
          >
            Clear
          </button>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ maxWidth: '160px' }}
          >
            <option value="Date">Sort by Date</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="row g-4">
        {sortedLocations.map((location) => (
          <div className="col-12 col-md-6 col-lg-4" key={location.id}>
            <div
              className="card border shadow-sm h-100"
              style={{ transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <div className="card-body">
                <h5 className="card-title">{location.name}</h5>
                <p className="card-text text-muted mb-1">Created: {location.created}</p>
                <p className="card-text text-muted">Updated: {location.updated}</p>
                <div className="d-flex gap-2 mt-3">
                  <button
                    onClick={() => setEditingLocation(location)}
                    className="btn btn-outline-primary btn-sm w-50 d-flex align-items-center justify-content-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLocation(location.id)}
                    className="btn btn-outline-danger btn-sm w-50 d-flex align-items-center justify-content-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <CreateLocationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateLocation={handleCreateLocation}
      />

      {editingLocation && (
        <EditLocationModal
          isOpen={!!editingLocation}
          onClose={() => setEditingLocation(null)}
          location={editingLocation}
          onUpdate={handleUpdateLocation}
        />
      )}
    </div>
  );
};

export default Locations;
