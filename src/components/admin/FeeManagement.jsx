import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: #4c8df1;
  color: white;
  padding: 0.6rem;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
`;

export default function FeeManagement() {
  const [records] = useState([
    { student: "Alice", status: "Paid", amount: 5000 },
    { student: "Bob", status: "Pending", amount: 5000 },
  ]);

  return (
    <Container>
      <h3>Fee Management</h3>
      <Table>
        <thead>
          <tr>
            <Th>Student</Th>
            <Th>Status</Th>
            <Th>Amount</Th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <Td>{r.student}</Td>
              <Td>{r.status}</Td>
              <Td>₹{r.amount}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
