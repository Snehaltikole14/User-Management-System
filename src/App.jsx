import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Manage Users</h1>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
