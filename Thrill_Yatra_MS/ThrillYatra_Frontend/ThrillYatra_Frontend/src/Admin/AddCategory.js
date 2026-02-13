import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "./AdminNavbar";
import { addCategory, getAllCategories } from "../API/api";
import "./AddCategory.css";

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Categories ---------------- */
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------------- Add Category ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addCategory({
        name,
        description,
      });

      toast.success("Category added successfully");

      setName("");
      setDescription("");

      // Refresh table
      fetchCategories();
    } catch {
      toast.error("Failed to add category");
    }
  };

  return (
    <>
      <AdminNavbar />
      <ToastContainer />

      <div className="category-page">
        {/* Left: Form */}
        <div className="category-form-card">
          <h3>Add Adventure Category</h3>

          <form onSubmit={handleSubmit}>
            <label>Category Name</label>
            <input
              type="text"
              placeholder="e.g. Trekking"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Description</label>
            <textarea
              rows="4"
              placeholder="Brief description of category"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Add Category</button>
          </form>
        </div>

        {/* Right: Table */}
        <div className="category-table-card">
          <h3>All Categories</h3>

          {loading ? (
            <p className="status-text">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="status-text">No categories found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default AddCategory;
