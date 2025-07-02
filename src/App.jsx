import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { getSession, clearSession } from "./api/users";
import ClassTimetable from "./components/teacher/ClassTimeTable";
import MyClass from "./components/teacher/MyClass";
import ExamsLesson from "./components/teacher/ExamsLesson";
import StudentChat from "./components/teacher/StudentChat";
import LibraryManagement from "./components/LibraryComponent";
import TransportTracking from "./components/TransportTracking";
import MyPosts from "./components/MyPosts";
import AdminClass from "./components/admin/AdminClass";
import AdminTimeTable from "./components/admin/AdminTimeTable";
import LibrarymanagementAdmin from "./components/admin/LibrarymanagementAdmin";
import TransportTrackingAdmin from "./components/admin/TransportTrackingAdmin";
import FeeStatus from "./components/student/FeeStatus";
import MyClassStu from "./components/student/MyClassStu";
import TeacherAttendance from "./components/teacher/TeacherAttendence";
import AttendanceModule from "./components/teacher/AttendenceTeacher";

// Styled Components
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const Sidebar = styled.div`
  width: 240px;
  background-image: linear-gradient(to bottom right, #4c8df1, #5cc5ef);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transform: ${({ show }) => (show ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
  z-index: 1000;

  @media (min-width: 900px) {
    transform: translateX(0);
    position: static;
    height: 100vh;
  }
`;

const Content = styled.div`
  margin-left: 0;
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  width: 100%;

  // @media (min-width: 900px) {
  //   margin-left: 240px;
  // }
`;

const SidebarTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const MenuItem = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  margin: 0.6rem 0;
  cursor: pointer;
  text-align: left;

  &:hover {
    font-weight: bold;
    color: #ffffdd;
  }
`;

const Hamburger = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: #4c8df1;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1100;

  @media (min-width: 900px) {
    display: none;
  }
`;

// Main AppLayout
function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const sessionUser = getSession();
    if (!sessionUser) {
      navigate("/");
    } else {
      setUser(sessionUser);
      setRole(sessionUser.role);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const renderMenu = () => (
    <>
      <SidebarTitle>SMART</SidebarTitle>
      <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>

      {role === "admin" && (
        <>
          <MenuItem onClick={() => navigate("/admin/my-classes")}>Class Managements</MenuItem>
          <MenuItem onClick={() => navigate("/timetable")}>Schedule</MenuItem>
          <MenuItem onClick={() => navigate("/admin/messages")}>Messages</MenuItem>
          <MenuItem onClick={() => navigate("/admin/library")}>Digital Library</MenuItem>
          <MenuItem onClick={() => navigate("/admin/bus-tracking")}>Bus Live Tracking</MenuItem>
          <MenuItem onClick={() => navigate("/my-posts")}>My Posts</MenuItem>
        </>
      )}

      {role === "teacher" && (
        <>
          <MenuItem onClick={() => navigate("/my-profile")}>My Profile</MenuItem>
          <MenuItem onClick={() => navigate("/my-classes")}>My Classes</MenuItem>
          <MenuItem onClick={() => navigate("/class-timetable")}>Schedule</MenuItem>
          <MenuItem onClick={() => navigate("/exams-and-lesson-planner")}>Exams & Lessons</MenuItem>
          <MenuItem onClick={() => navigate("/messages")}>Messages</MenuItem>
          <MenuItem onClick={() => navigate("/library")}>Digital Library</MenuItem>
          <MenuItem onClick={() => navigate("/bus-tracking")}>Bus Live Tracking</MenuItem>
        </>
      )}

      {role === "student" && (
        <>
          <MenuItem onClick={() => navigate("/student/my-classes")}>My Class</MenuItem>
          <MenuItem onClick={() => navigate("/messages")}>Messages</MenuItem>
          <MenuItem onClick={() => navigate("/student/fee-status")}>Fee Status</MenuItem>
          <MenuItem onClick={() => navigate("/library")}>Digital Library</MenuItem>
          <MenuItem onClick={() => navigate("/bus-tracking")}>Bus Live Tracking</MenuItem>
        </>
      )}

      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </>
  );

  return (
    <AppContainer>
      <Hamburger onClick={toggleSidebar}>☰</Hamburger>

      <Sidebar show={showSidebar}>
        {renderMenu()}
      </Sidebar>

      <Content onClick={() => setShowSidebar(false)}>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard onLogout={handleLogout} />}
          />
          <Route
            path="/my-classes"
            element={<MyClass user={user} onLogout={handleLogout} />}
          />
          <Route
            path="/student/my-classes"
            element={<MyClassStu user={user} onLogout={handleLogout} />}
          />
          <Route
            path="/teacherattendence"
            element={<AttendanceModule user={user} onLogout={handleLogout} />}
          />
          <Route
            path="/student/fee-status"
            element={<FeeStatus user={user} onLogout={handleLogout} />}
          />
          <Route
            path="/studentleaves"
            element={<TeacherAttendance user={user} onLogout={handleLogout} />}
          />
          <Route
            path="/admin/my-classes"
            element={<AdminClass user={user} onLogout={handleLogout} />}
          />

          <Route
            path="/class-timetable"
            element={<ClassTimetable onLogout={handleLogout} />}
          />
          <Route
            path="/timetable"
            element={<AdminTimeTable onLogout={handleLogout} />}
          />
          <Route
            path="/assignments"
            element={<ExamsLesson onLogout={handleLogout} /> }
          />
          <Route
            path="/messages"
            element={<StudentChat onLogout={handleLogout} />}
          />
          <Route
            path="/library"
            element={<LibraryManagement onLogout={handleLogout} />}
          />
          <Route
            path="/bus-tracking"
            element={<TransportTracking user={user} onLogout={handleLogout} />}
          />

          <Route
            path="/admin/library"
            element={<LibrarymanagementAdmin onLogout={handleLogout} />}
          />
          <Route
            path="/admin/bus-tracking"
            element={<TransportTrackingAdmin user={user} onLogout={handleLogout} />}
          />
          <Route
            path="/my-profile"
            element={<MyPosts user={user} onLogout={handleLogout} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Content>
    </AppContainer>
  );
}


export default function App() {
  const isLoggedIn = !!getSession();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/*"
          element={isLoggedIn ? <AppLayout /> : <Navigate to="/" />}
        />
        {/* <Route
          path="/my-classes"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        /> */}
      </Routes>
    </Router>
  );
}
