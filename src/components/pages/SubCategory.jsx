import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const mockSubcategories = {
  "1": ["Subcat A1", "Subcat A2"],
  "2": ["Subcat B1", "Subcat B2"],
};

const SubCategoryPage = () => {
  const { id } = useParams();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Simulate fetching subcategories
    setSubcategories(mockSubcategories[id] || []);
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold text-gray-800">
        Subcategories of Category ID: {id}
      </h1>
      {subcategories.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {subcategories.map((sub, index) => (
            <li key={index}>{sub}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No subcategories found.</p>
      )}
    </div>
  );
};

export default SubCategoryPage;
