import React, { useState } from "react";
import styled from "styled-components";

const AnnouncementBox = styled.div`
  margin-top: 1rem;
  background: #e3f2fd;
  padding: 1rem;
  border-radius: 8px;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  background: #1976d2;
  color: white;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function Announcements() {
  const [announcement, setAnnouncement] = useState("");
  const [history, setHistory] = useState([]);

  const postAnnouncement = () => {
    if (announcement.trim()) {
      setHistory([{ text: announcement, date: new Date() }, ...history]);
      setAnnouncement("");
    }
  };

  return (
    <div>
      <h3>School-wide Announcements</h3>
      <Input
        rows={3}
        value={announcement}
        onChange={(e) => setAnnouncement(e.target.value)}
        placeholder="Write announcement..."
      />
      <Button onClick={postAnnouncement}>Post</Button>

      {history.map((a, i) => (
        <AnnouncementBox key={i}>
          <strong>{a.date.toLocaleString()}:</strong>
          <p>{a.text}</p>
        </AnnouncementBox>
      ))}
    </div>
  );
}
