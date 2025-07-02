import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 1.5rem;
  object-fit: cover;
`;

const ProfileDetails = styled.div`
  flex: 1;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const InfoBox = styled.div`
  background: #f0f8ff;
  padding: 1rem;
  border-radius: 8px;
  flex: 1 1 200px;
  text-align: center;
  font-size: 1rem;
`;

const SubHeading = styled.h3`
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1565c0;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
`;

const DayBox = styled.div`
  background: ${(props) => props.bgColor || "#e0e0e0"};
  padding: 0.5rem;
  text-align: center;
  border-radius: 6px;
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #ef5350;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #d32f2f;
  }
`;

export default function TeacherAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [statusToday, setStatusToday] = useState("");

  const teacher = {
    id: "t1",
    name: "John Doe",
    profileImage: "https://via.placeholder.com/100",
    department: "Science",
    assignedClasses: ["Class A", "Class B"],
    totalLeaves: 12,
  };

  const today = new Date().toLocaleDateString();

  const markAttendance = (status) => {
    setAttendanceRecords((prev) => {
      const filtered = prev.filter((r) => r.date !== today);
      return [...filtered, { date: today, status }];
    });
    setStatusToday(status);
  };

  const leavesUsed = attendanceRecords.filter((r) => r.status === "Absent").length;
  const leavesRemaining = teacher.totalLeaves - leavesUsed;

  const renderCalendar = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <CalendarGrid>
        {days.map((day) => {
          const dateStr = new Date(now.getFullYear(), now.getMonth(), day).toLocaleDateString();
          const record = attendanceRecords.find((r) => r.date === dateStr);

          let bgColor = "#e0e0e0";
          if (record?.status === "Present") bgColor = "#c8e6c9";
          if (record?.status === "Absent") bgColor = "#ffcdd2";
          if (record?.status === "Half Day") bgColor = "#fff9c4";

          return (
            <DayBox key={day} bgColor={bgColor}>
              {day}
            </DayBox>
          );
        })}
      </CalendarGrid>
    );
  };

  useEffect(() => {
    const todayRecord = attendanceRecords.find((r) => r.date === today);
    setStatusToday(todayRecord?.status || "");
  }, [attendanceRecords]);

  return (
    <Container>
      <Title>Teacher Attendance Dashboard</Title>
      <ProfileCard>
        <ProfileImage src={teacher.profileImage} alt="Teacher" />
        <ProfileDetails>
          <h3>{teacher.name}</h3>
          <p>Department: {teacher.department}</p>
          <p>Assigned Classes: {teacher.assignedClasses.join(", ")}</p>
          <InfoRow>
            <InfoBox>Total Leaves: {teacher.totalLeaves}</InfoBox>
            <InfoBox>Leaves Remaining: {leavesRemaining}</InfoBox>
            <InfoBox>Days Marked: {attendanceRecords.length}</InfoBox>
          </InfoRow>
        </ProfileDetails>
      </ProfileCard>

      <SubHeading>Mark Attendance for Today ({today}):</SubHeading>
      <select
        value={statusToday}
        onChange={(e) => markAttendance(e.target.value)}
        style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
      >
        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Half Day">Half Day</option>
      </select>

      <SubHeading>Attendance Calendar:</SubHeading>
      {renderCalendar()}
    </Container>
  );
}
