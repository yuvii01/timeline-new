import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUsers, createUser, setSession, getSession } from "../api/users";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "student" });
  const navigate = useNavigate();

  useEffect(() => {
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
    const newUser = { ...form, id: Date.now(), parentId: null };
    createUser(newUser);
    setSession(newUser);
    navigate("/dashboard");
  };

  return (
    <Wrapper>
      <FormContainer>
        <Title>{isSignup ? "Create an Account" : "Login to Your Account"}</Title>

        <Input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <Select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </Select>

        <Button onClick={isSignup ? handleSignup : handleLogin}>
          {isSignup ? "Sign Up" : "Login"}
        </Button>

        <SwitchText>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <SwitchLink onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign up"}
          </SwitchLink>
        </SwitchText>
      </FormContainer>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #2563eb;
  }
`;

const SwitchText = styled.p`
  text-align: center;
  color: #6b7280;
`;

const SwitchLink = styled.span`
  color: #3b82f6;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
