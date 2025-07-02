import React, { useState } from "react";
import styled from "styled-components";

const ScheduleContainer = styled.div`
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #4c8df1;
  color: white;
  padding: 0.5rem;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  background: #388e3c;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function ClassScheduleManager() {
  const [schedules, setSchedules] = useState([
    { subject: "Math", day: "Monday", time: "9:00 - 10:00" },
  ]);
  const [form, setForm] = useState({ subject: "", day: "", time: "" });

  const addSchedule = () => {
    setSchedules([...schedules, form]);
    setForm({ subject: "", day: "", time: "" });
  };

  return (
    <ScheduleContainer>
      <h3>Manage Class Schedules</h3>
      <div>
        <Input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <Input
          placeholder="Day"
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
        />
        <Input
          placeholder="Time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <Button onClick={addSchedule}>Add</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Subject</Th>
            <Th>Day</Th>
            <Th>Time</Th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s, i) => (
            <tr key={i}>
              <Td>{s.subject}</Td>
              <Td>{s.day}</Td>
              <Td>{s.time}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScheduleContainer>
  );
}
