import { useEffect, useState } from "react";

export default function AnimeForm({ Search }) {
  const [formdata, setName] = useState({ name: "" });

  const handleChange = (evt) => {
    evt.preventDefault();
    setName((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Search(formdata);
    setName({ name: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Search here 🔍 </h1>
      <input
        name="name"
        type="text"
        placeholder="Enter any anime"
        value={formdata.name}
        onChange={handleChange}
        id="name"
      />
      <button> Search </button>
    </form>
  );
}
