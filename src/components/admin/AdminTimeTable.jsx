import React, { useState, useRef } from "react";
import styled from "styled-components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ClassScheduleManager from "../teacher/ClassScheduleManager";
// import ClassScheduleManager from "./ClassScheduleManager";
// import GradeSubmission from "./GradeSubmission";
// import StudentList from "./StudentList";
// import TeacherAttendance from "./TeacherAttendence";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  margin-left: 240px;
  background: #f4f7fa;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: #333;
`;

const Button = styled.button`
  background: #4c8df1;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  margin: 0.5rem 1rem 1rem 0;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #356bcb;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #4c8df1;
  color: white;
  padding: 1rem;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const Td = styled.td`
  text-align: center;
  padding: 0.8rem;
  border: 1px solid #ddd;
  background: ${(props) => (props.isBreak ? "#f9f9f9" : "white")};
`;

const Input = styled.input`
  padding: 0.4rem;
  margin: 0.2rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Select = styled.select`
  padding: 0.4rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    color: #4c4c4c;
  }
`;

// Constants
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const defaultSubjects = ["Math", "Science", "English", "History", "Geography", "Art" , "Break"];
const defaultStartTime = 8;
const defaultEndTime = 14;

const generateTimeSlots = (start, end, duration) => {
  const slots = [];
  for (let hour = start; hour < end; hour += duration / 60) {
    const h = Math.floor(hour);
    const m = (hour % 1) * 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
};

export default function AdminTimetable() {
  const [duration, setDuration] = useState(60);
  const [timetable, setTimetable] = useState({});
  const ref = useRef();

  const startTime = defaultStartTime;
  const endTime = defaultEndTime;
  const timeSlots = generateTimeSlots(startTime, endTime, duration);

  const handleChange = (day, slot, value) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: value,
      },
    }));
  };

  const handleDownloadPDF = async () => {
    const element = ref.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 20, 20, width - 40, height);
    pdf.save("class_timetable.pdf");
  };

  return (
    <Container>

      

      <Heading>School Weekly Timetable</Heading>

    <Section>
        <h3>Class Schedule</h3>
        <ClassScheduleManager />
      </Section>
      

      <Section>
        <h3>Create Customized Timetable</h3>
        <label>
          <strong>Period Duration (minutes): </strong>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min={15}
            step={5}
          />
        </label>
        <Button onClick={handleDownloadPDF}>Download Timetable as PDF</Button>
      </Section>

      <Section ref={ref}>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Time</Th>
                {days.map((day) => (
                  <Th key={day}>{day}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, idx) => {
                const isBreak = (idx + 1) % 100 === 0;
                return (
                  <tr key={slot}>
                    <Td>{slot}</Td>
                    {days.map((day) => (
                      <Td key={day + slot} isBreak={isBreak}>
                        {isBreak ? (
                          idx === 3 ? (
                            <strong>Lunch Break</strong>
                          ) : (
                            "Break"
                          )
                        ) : (
                          <Select
                            value={(timetable[day]?.[slot]) || ""}
                            onChange={(e) =>
                              handleChange(day, slot, e.target.value)
                            }
                          >
                            <option value="">--</option>
                            {defaultSubjects.map((subj) => (
                              <option key={subj} value={subj}>
                                {subj}
                              </option>
                            ))}
                          </Select>
                        )}
                      </Td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      

    </Container>
  );
}
