import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, createUser, setSession, getSession } from "../api/users";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "student" });
  const navigate = useNavigate();

  useEffect(() => {
    // Create default users if no users exist
    const defaultUsers = [
      { id: 1, username: "admin@gmail.com", password: "aaaaaa", role: "admin", parentId: null },
      { id: 2, username: "teacher@gmail.com", password: "aaaaaa", role: "teacher", parentId: null },
      { id: 3, username: "student@gmail.com", password: "aaaaaa", role: "student", parentId: null }
    ];

    const existingUsers = getUsers();

    if (!existingUsers || existingUsers.length === 0) {
      defaultUsers.forEach(user => createUser(user));
    }
  }, []);

  useEffect(() => {
    if (getSession()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = { ...form, [name]: value };

    // Auto-set role based on email for default users
    if (name === "username") {
      if (value === "admin@gmail.com") updatedForm.role = "admin";
      else if (value === "teacher@gmail.com") updatedForm.role = "teacher";
      else if (value === "student@gmail.com") updatedForm.role = "student";
    }

    setForm(updatedForm);
  };

  const handleLogin = () => {
    const user = getUsers().find(
      u => u.username === form.username && u.password === form.password && u.role === form.role
    );

    if (user) {
      setSession(user);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials or role mismatch");
    }
  };

  const handleSignup = () => {
    const users = getUsers();
    if (users.find(u => u.username === form.username && u.role === form.role)) {
      alert("User already exists with this role");
      return;
    }
    const newUser = {
      ...form,
      id: Date.now(),
      parentId: null 
    };
    createUser(newUser);
    setSession(newUser);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isSignup ? "Create an Account" : "Login to Your Account"}
        </h2>

        <div className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={isSignup ? handleSignup : handleLogin}
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}
