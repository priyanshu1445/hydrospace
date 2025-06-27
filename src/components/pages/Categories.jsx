import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../pages/Categories.css"; // Assuming you have a CSS file for styles
const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    { id: 1, name: "Test 3" },
    { id: 2, name: "Test Category 2" },
    { id: 3, name: "Test Category 1" },
    { id: 4, name: "Test Category 4" },
    { id: 5, name: "Test Category 5" },
    { id: 6, name: "Test Category 6" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    category: "",
    subcategories: [""],
  });

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const filtered =
    selectedCategory === "All Categories"
      ? categories
      : categories.filter((c) => c.name === selectedCategory);

  const handleCategoryClick = (categoryId) => {
    navigate(`/admin/categories/${categoryId}`);
  };

  const handleSubcategoryChange = (index, value) => {
    const updated = [...form.subcategories];
    updated[index] = value;
    setForm({ ...form, subcategories: updated });
  };

  const addSubcategoryField = () => {
    setForm({ ...form, subcategories: [...form.subcategories, ""] });
  };

  const handleAddCategory = () => {
    if (form.category) {
      const newCategory = {
        id: categories.length + 1,
        name: form.category,
      };

      setCategories([...categories, newCategory]);
      setForm({ category: "", subcategories: [""] });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="bg-white p-4 rounded shadow d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <select
            className="form-select form-select-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <h5 className="mb-0 fw-semibold">Categories ({filtered.length})</h5>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-sm btn-primary d-flex align-items-center gap-1"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
        {filtered.map((category, index) => (
          <div className="col" key={category.id} data-aos="zoom-in" data-aos-delay={index * 100}>
            <div
              className="card shadow h-200 text-center border-0 category-card"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="card-body  fw-semibold text-dark">
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Add Category & Subcategories</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} />
              </div>
              <div className="modal-body">
                <form className="vstack gap-3">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="form-control"
                  />

                  {form.subcategories.map((sub, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Subcategory ${index + 1}`}
                      value={sub}
                      onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                      className="form-control"
                    />
                  ))}

                  <button
                    type="button"
                    onClick={addSubcategoryField}
                    className="btn btn-link p-0 text-primary text-decoration-underline"
                  >
                    + Add Another Subcategory
                  </button>

                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="btn btn-primary w-100"
                  >
                    Save Category
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

export default Categories;
