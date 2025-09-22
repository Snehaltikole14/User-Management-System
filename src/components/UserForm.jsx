import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email };

    if (id) {
      await fetch(`http://localhost:8080/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } else {
      await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {id ? "Update" : "Add"} User
      </button>
    </form>
  );
}

export default UserForm;
