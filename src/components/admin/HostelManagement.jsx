import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: #1976d2;
  color: white;
  padding: 0.75rem;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.75rem;
`;

const Input = styled.input`
  margin-right: 0.5rem;
  padding: 0.4rem;
`;

const Button = styled.button`
  background: #388e3c;
  color: white;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #2e7d32;
  }
`;

export default function HostelManagement() {
  const [rooms, setRooms] = useState([
    { roomNo: "101", occupant: "Ravi", fee: 5000 },
    { roomNo: "102", occupant: "Empty", fee: 5000 },
    { roomNo: "103", occupant: "Aisha", fee: 5000 },
  ]);
  const [newRoom, setNewRoom] = useState({ roomNo: "", occupant: "", fee: "" });

  const handleAddRoom = () => {
    if (!newRoom.roomNo || !newRoom.fee) return alert("Room number and fee are required.");
    setRooms([...rooms, { ...newRoom }]);
    setNewRoom({ roomNo: "", occupant: "", fee: "" });
  };

  return (
    <Wrapper>
      <h3>Hostel / Dorm Management</h3>

      <div>
        <Input
          type="text"
          placeholder="Room No"
          value={newRoom.roomNo}
          onChange={(e) => setNewRoom({ ...newRoom, roomNo: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Occupant Name"
          value={newRoom.occupant}
          onChange={(e) => setNewRoom({ ...newRoom, occupant: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Fee"
          value={newRoom.fee}
          onChange={(e) => setNewRoom({ ...newRoom, fee: e.target.value })}
        />
        <Button onClick={handleAddRoom}>Add Room</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Room No</Th>
            <Th>Occupant</Th>
            <Th>Fee</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <Td>{room.roomNo}</Td>
              <Td>{room.occupant}</Td>
              <Td>₹{room.fee}</Td>
              <Td>{room.occupant?.toLowerCase() === "empty" || !room.occupant ? "Vacant" : "Occupied"}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}
