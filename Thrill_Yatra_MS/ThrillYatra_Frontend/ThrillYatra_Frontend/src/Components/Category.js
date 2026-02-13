import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../API/api";
import "./Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch {
        setError("No categories available");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/adventures/${categoryId}`);
  };

  if (loading)
    return <p className="category-status">Loading categories...</p>;

  if (error)
    return <p className="category-status">{error}</p>;

  return (
    <div className="category-page">
      

      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <h4>{category.name}</h4>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
