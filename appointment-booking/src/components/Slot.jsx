import React from "react";
import axios from "axios";

const Slot = ({ slot, userName, date }) => {
  const handleBooking = async () => {
    try {
      const response = await axios.post("https://appointment-booking-backend-l1mfv6cd5-omprakash-umaths-projects.vercel.app/api/bookSlot", {
        date,
        time: slot.time,
        userId: userName,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to book the slot.");
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        backgroundColor: slot.isBooked ? "#f8d7da" : "#d4edda",
        cursor: slot.isBooked ? "not-allowed" : "pointer",
      }}
      onClick={!slot.isBooked ? handleBooking : undefined}
    >
      <p>{slot.time}</p>
      {slot.isBooked && <p>Booked</p>}
    </div>
  );
};

export default Slot;
