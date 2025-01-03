import React, { useState } from "react";
import DateSelector from "./components/DateSelector";
import SlotsGrid from "./components/SlotsGrid";
import axios from "axios";

const App = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await axios.get(`/api/slots?date=${formattedDate}`);
      setSlots(response.data.slots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchSlots(date);
  };

  const handleSlotSelect = async (slot) => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      await axios.post(`/api/bookSlot`, { date: formattedDate, slot });
      alert("Slot booked successfully!");
      fetchSlots(selectedDate); // Refresh slots
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <div>
      <h1>Appointment Booking</h1>
      <DateSelector onDateChange={handleDateChange} />
      {selectedDate && <SlotsGrid slots={slots} onSlotSelect={handleSlotSelect} />}
    </div>
  );
};

export default App;
