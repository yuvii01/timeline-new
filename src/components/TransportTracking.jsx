import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
`;

const MapPlaceholder = styled.div`
  height: 300px;
  background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Map_icon.svg/2048px-Map_icon.svg.png') center/contain no-repeat;
  background-color: #eef5ff;
  border-radius: 12px;
  margin-top: 1rem;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
`;

export default function TransportTracking({user}) {

  //  const [user, setUser] = useState(null);
  //   const [role, setRole] = useState("");
  
   
  console.log("Transport Tracking Component Rendered for User:", user);
  return (
    <Container>
      <h3>School Transport Tracking</h3>
      <p>
        Hello <strong>{user.username}</strong>, track your assigned school bus below. (GPS data coming soon)
      </p>
      <MapPlaceholder>
        {/* Here you can later embed Google Maps or Mapbox with real-time bus markers */}
      </MapPlaceholder>
    </Container>
  );
}
