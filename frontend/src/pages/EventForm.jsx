import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://event-hub-1gy9.onrender.com/api/events", { name, description, date });
      navigate("/");
    } catch (err) {
      console.error("Event creation failed");
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleCreateEvent}>
        <input type="text" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EventForm;
