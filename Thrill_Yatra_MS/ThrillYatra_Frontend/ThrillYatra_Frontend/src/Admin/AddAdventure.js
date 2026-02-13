import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import { getAllCategories, addAdventure, getAllAdventures } from "../API/api";
import "react-toastify/dist/ReactToastify.css";
import "./AddAdventure.css";

function AddAdventure() {
  const [categories, setCategories] = useState([]);
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    adventureDate: "",
    price: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const isValidDate = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);

    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    return selected >= today;
  };

  const fetchAdventures = async () => {
    try {
      const res = await getAllAdventures();
      setAdventures(res.data);
    } catch {
      toast.error("Failed to load adventures");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchAdventures();
      setLoading(false);
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, categoryId, description, adventureDate, price } = formData;

    if (!title || !categoryId || !description || !adventureDate || !price) {
      toast.error("All fields are required");
      return;
    }

    if (!isValidDate(adventureDate)) {
      toast.error("Adventure date must be today or a future date");
      return;
    }

    try {
      await addAdventure({
        title,
        description,
        price: Number(price),
        adventureDate,
        categoryId: Number(categoryId),
      });

      toast.success("Adventure added successfully");

      setFormData({
        title: "",
        categoryId: "",
        description: "",
        adventureDate: "",
        price: "",
      });

      await fetchAdventures();
    } catch {
      toast.error("Failed to add adventure");
    }
  };

  if (loading) {
    return <p className="status-text">Loading...</p>;
  }

  return (
    <>
      <AdminNavbar />
      <ToastContainer />

      <div className="adventure-page">
        <div className="adventure-form-card">
          <h3>Add Adventure</h3>

          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Himalayan Trek"
              value={formData.title}
              onChange={handleChange}
            />

            <label>Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label>Description</label>
            <textarea
              rows="4"
              name="description"
              placeholder="Adventure details"
              value={formData.description}
              onChange={handleChange}
            />

            <label>Adventure Date</label>
            <input
              type="date"
              name="adventureDate"
              value={formData.adventureDate}
              onChange={handleChange}
            />

            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
            />

            <button type="submit">Add Adventure</button>
          </form>
        </div>

        <div className="adventure-table-card">
          <h3>All Adventures</h3>

          {adventures.length === 0 ? (
            <p className="status-text">No adventures added yet</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {adventures.map((adv, index) => (
                  <tr key={adv.id}>
                    <td>{index + 1}</td>
                    <td>{adv.title}</td>
                    <td>{adv.categoryName}</td>
                    <td>{adv.adventureDate}</td>
                    <td>₹{adv.price}</td>
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

export default AddAdventure;
