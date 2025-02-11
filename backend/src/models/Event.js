import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {type: String, required: true},
  date: { type: Date, required: true },
  attendees: { type: [String], default: [] } ,
  image: { type: String, default: "" },
  attendeeCount: { type: Number, default: 0 },
});

export default mongoose.model("Event", eventSchema);
