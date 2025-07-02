import React from "react";
import styled from "styled-components";

const staff = [
  { name: "Mr. Sharma", role: "Math Teacher", salary: 45000, status: "Paid" },
  { name: "Ms. Rao", role: "Admin", salary: 40000, status: "Pending" },
];

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

export default function PayrollManagement() {
  return (
    <div>
      <h3>Payroll Management</h3>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Salary</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {staff.map((person, i) => (
            <tr key={i}>
              <Td>{person.name}</Td>
              <Td>{person.role}</Td>
              <Td>₹{person.salary}</Td>
              <Td>{person.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
