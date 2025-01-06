import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Slot from "./Slot";
import { format, addDays } from "date-fns";

const SlotsForm = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setUserName(query.get("userName"));
  }, [location]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://appointment-booking-backend-l1mfv6cd5-omprakash-umaths-projects.vercel.app/api/slots?date=${selectedDate}`);
      setSlots(response.data);
    } catch (error) {
      alert("Error fetching slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <h1>Welcome, {userName}</h1>
      <label>
        Select a Date:
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={format(new Date(), "yyyy-MM-dd")}
          max={format(addDays(new Date(), 5), "yyyy-MM-dd")}
        />
      </label>

      {loading ? (
        <p>Loading slots...</p>
      ) : slots.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {slots.map((slot, index) => (
            <Slot key={index} slot={slot} userName={userName} date={selectedDate} />
          ))}
        </div>
      ) : (
        <p>No slots available for this date.</p>
      )}
    </div>
  );
};

export default SlotsForm;
