import React from "react";

const SlotsGrid = ({ slots, onSlotSelect }) => {
  if (!slots || slots.length === 0) {
    return <p>No slots available for the selected date.</p>;
  }

  return (
    <div>
      <h3>Available Slots</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSlotSelect(slot)}
            disabled={slot.booked}
            style={{ padding: "10px", background: slot.booked ? "red" : "green", color: "white" }}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotsGrid;
