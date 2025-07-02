import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../api/users";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import UserManagement from "./UserManagement";
import PaperGenerator from "./PaperGenerator";
import AttendanceModule from "./AttendenceModule";
import StudentDashboard from "./StudentDashboard";
import ClassScheduleManager from "./teacher/ClassScheduleManager";
import TeacherAttendance from "./teacher/TeacherAttendence";
import GradeSubmission from "./teacher/GradeSubmission";
import LessonPlanner from "./teacher/LessonPlanner";
import FeeManagement from "./admin/FeeManagement";
import PayrollManagement from "./admin/PayrollManagement";
import Announcements from "./admin/Announcements";
import EventCalendar from "./admin/EventCalender";
import ParentDashboard from "./ParentDashboard";
import LibraryManagement from "./LibraryComponent";
import TransportTracking from "./TransportTracking";
import HostelManagement from "./admin/HostelManagement";
import ExamAssignmentManager from "./teacher/ExamAssignmentManager";

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f4f8;
  font-family: "Segoe UI", sans-serif;
`;

const Header = styled.div`

  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const Welcome = styled.h2`
  font-size: 1.2rem;
`;

const LogoutButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #c0392b;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;


const Tile = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 0.5rem;

    @media (min-width: 600px) {
      width: 50px;
      height: 50px;
    }
  }

  p {
    font-size: 0.85rem;
    color: #333;

    @media (min-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    align-items: center;
  }
`;

const WelcomeImage = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: 250px;
    margin-right: 1.5rem;
    margin-bottom: 0;
  }
`;


const Sidebar = styled.div`
  width: 240px;
  background-image: linear-gradient(to bottom right, #4c8df1, #5cc5ef);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
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

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #fdfdfd;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 2rem 0;
`;

const Card = styled.div`
  background: #fff7ec;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);

  h4 {
    color: #666;
  }

  h2 {
    margin: 10px 0;
    color: #28a745;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const Section = styled.section`
  background: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 14px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
`;

// Main Component
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = getSession();
    if (!sessionUser) {
      navigate("/");
    } else {
      setUser(sessionUser);
      setRole(sessionUser.role);
    }
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

   const teacherMenu = [
    { title: "My Profile", icon: "https://as2.ftcdn.net/jpg/00/24/86/11/1000_F_24861198_7J0bNWHiTYCHFa2nVZNIWFzMiTIbKxpI.jpg" , click : '/my-profile'},
    { title: "My Attendance", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyFkqK1OGu-QaRstMr8zio7bOEshNc6VSd1Q&s" , click : '/teacherattendence'},
    { title: "Student Leaves", icon : "https://static.vecteezy.com/system/resources/previews/030/940/508/non_2x/leave-icon-vector.jpg" , click : '/studentleaves'},
    { title: "Assignments", icon: "https://cdn-icons-png.flaticon.com/512/11265/11265088.png" , click : '/assignments'},
    { title: "Marks Upload", icon: "https://cdn-icons-png.flaticon.com/512/3979/3979312.png" , click : '/marksupload'},
    { title: "Time Table", icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png" , click : '/timetable'},
    { title: "E-Notice", icon: "https://cdn3.vectorstock.com/i/1000x1000/61/77/concept-of-email-notification-icon-vector-11226177.jpg" , click : '/enotice'},
    { title: "Online Class", icon: "https://cdn-icons-png.freepik.com/512/4722/4722426.png" , click : '/onlineclass'},
    { title: "Syllabus", icon: "https://cdn-icons-png.flaticon.com/512/4708/4708448.png" , click : '/syllabus'},
    { title: "Assessments", icon: "https://cdn-icons-png.flaticon.com/512/11265/11265088.png" , click : '/assessments'},
  ];

  if (!user) return null;

  return (
    <Container>
      <Main>
        <Header>
          <WelcomeSection>
  <WelcomeImage src="/teacher.png" alt="Welcome illustration" />
  <div>
    <p style={{ margin: 0, fontSize: "1rem" , color: "#333"}}>Welcome back</p>
    <h2 style={{ margin: "0.2rem 0", color: "#1976d2" }}>{user.username}!</h2>
    <p style={{ maxWidth: "600px", color: "#333" }}>
      We would like to take this opportunity to welcome you to our practice and to thank you for choosing our platform. We look forward to providing you with personalized, comprehensive tools focused on education, wellness and collaboration.
    </p>
  </div>
</WelcomeSection> 
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Header>   
            

        {role === "teacher" && (
        <GridContainer>
          {teacherMenu.map((item, idx) => (
            <Tile onClick={()=> {
            navigate(item.click)
            }} key={idx}>
              <img src={item.icon} alt={item.title} />
              <p>{item.title}</p>
            </Tile>
          ))}
        </GridContainer>
      )}

       
        {(role === "superadmin" || role === "admin") && (
          <>
          <CardGrid>
          <Card>
            <h4>Students</h4>
            <h2>1,204</h2>
            <p>📘 Currently Enrolled</p>
          </Card>
          <Card>
            <h4>Events</h4>
            <h2>12</h2>
            <p>📅 This Month</p>
          </Card>
          <Card>
            <h4>Teachers</h4>
            <h2>89</h2>
            <p>👩‍🏫 Active Staff</p>
          </Card>
          <Card>
            <h4>Fees Collected</h4>
            <h2>$48,697</h2>
            <p>💰 This Quarter</p>
          </Card>
        </CardGrid>

          <Section>
            <h3>User Management</h3>
            <UserManagement currentUser={user} />
          </Section>
          </>
        )}

        {role === "parent" && (
          <Section>
            <h3>Parent Portal</h3>
            <ParentDashboard user={user} />
          </Section>
        )}

        

        {(role === "admin" || role === "teacher") && (
          <Section>
            <h3>Create Post</h3>
            <PostCreate currentUser={user} />
          </Section>
        )}

        {role === "admin" && (
          <>
            <Section>
              <h3>Fee Management</h3>
              <FeeManagement />
            </Section>

            <Section>
              <h3>Payroll</h3>
              <PayrollManagement />
            </Section>

            <Section>
              <h3>Hostel / Dorm Management</h3>
              <HostelManagement />
            </Section>

            <Section>
              <h3>Announcements</h3>
              <Announcements />
            </Section>

            <Section>
              <h3>School Events</h3>
              <EventCalendar />
            </Section>
          </>
        )}

        {role === "student" && (
          <>
            <Section>
              <h3>My Dashboard</h3>
              <StudentDashboard user={user} />
            </Section>

            <Section>
              <h3>Library</h3>
              <LibraryManagement user={user} />
            </Section>
          </>
        )}


        <Section>
          <h3>All Posts</h3>
          <PostList currentUser={user} />
        </Section>
      </Main>
    </Container>
  );
}
