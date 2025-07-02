import React, { useState } from "react";
import styled from "styled-components";

const EventContainer = styled.div`
  margin-top: 1rem;
`;

const EventItem = styled.div`
  background: #fff3e0;
  margin: 0.5rem 0;
  padding: 0.8rem;
  border-radius: 8px;
`;

const Input = styled.input`
  margin-right: 0.5rem;
  padding: 0.4rem;
`;

const Button = styled.button`
  padding: 0.4rem 1rem;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
`;

export default function EventCalendar() {
  const [eventText, setEventText] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [events, setEvents] = useState([]);

  const addEvent = () => {
    if (eventText && eventDate) {
      setEvents([{ text: eventText, date: eventDate }, ...events]);
      setEventText("");
      setEventDate("");
    }
  };

  return (
    <EventContainer>
      <h3>School Event Calendar</h3>
      <div>
        <Input
          type="text"
          placeholder="Event Name"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
        />
        <Input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <Button onClick={addEvent}>Add</Button>
      </div>

      {events.map((e, i) => (
        <EventItem key={i}>
          <strong>{e.date}</strong> - {e.text}
        </EventItem>
      ))}
    </EventContainer>
  );
}
