import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// Create Modal
const CreateRegionModal = ({ isOpen, onClose, onCreateRegion }) => {
  const [regionName, setRegionName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (regionName.trim()) {
      onCreateRegion(regionName.trim());
      setRegionName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Region</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Region Name"
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Modal
const EditRegionModal = ({ isOpen, onClose, region, onUpdate }) => {
  const [newName, setNewName] = useState(region?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      onUpdate(region.id, newName.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Region</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Region Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Component
const Regions = () => {
  const [regions, setRegions] = useState([
    { id: '1', name: 'US-EAST', created: '2025-05-06', updated: '2025-05-06' },
    { id: '2', name: 'Europe', created: '2025-05-02', updated: '2025-05-02' },
    { id: '3', name: 'Asia', created: '2025-05-04', updated: '2025-05-04' },
    { id: '4', name: 'India', created: '2025-05-01', updated: '2025-05-01' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRegions = [...filteredRegions].sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleCreateRegion = (name) => {
    const newRegion = {
      id: crypto.randomUUID(),
      name,
      created: new Date().toISOString().slice(0, 10),
      updated: new Date().toISOString().slice(0, 10),
    };
    setRegions([...regions, newRegion]);
  };

  const handleUpdateRegion = (id, newName) => {
    const updatedList = regions.map(region =>
      region.id === id ? { ...region, name: newName, updated: new Date().toISOString().slice(0, 10) } : region
    );
    setRegions(updatedList);
  };

  const handleDeleteRegion = (id) => {
    if (window.confirm("Are you sure you want to delete this region?")) {
      setRegions(regions.filter(region => region.id !== id));
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle size={18} />
          Create Region
        </button>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ maxWidth: '220px' }}
          />
          <button
            className={`btn btn-outline-secondary btn-sm ${!searchTerm.trim() ? 'd-none' : ''}`}
            onClick={() => setSearchTerm('')}
          >
            Clear
          </button>
          <select
            className="form-select form-select-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ maxWidth: '160px' }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="row g-3">
        {sortedRegions.map(region => (
          <div key={region.id} className="col-12 col-sm-6 col-lg-4">
            <div
              className="card h-100 border shadow-sm"
              style={{
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              }}
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
                <h5 className="card-title">{region.name}</h5>
                <p className="card-text small text-muted">Created: {region.created}</p>
                <p className="card-text small text-muted">Updated: {region.updated}</p>
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-1"
                    onClick={() => setEditingRegion(region)}
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-1"
                    onClick={() => handleDeleteRegion(region.id)}
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
      <CreateRegionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateRegion={handleCreateRegion}
      />
      {editingRegion && (
        <EditRegionModal
          isOpen={!!editingRegion}
          onClose={() => setEditingRegion(null)}
          region={editingRegion}
          onUpdate={handleUpdateRegion}
        />
      )}
    </div>
  );
};

export default Regions;
