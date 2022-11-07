import mongoose from "mongoose";

const singleNoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: ["true", "content must be specified"],
  },
  title: { type: String, default: "" },
  archive: { type: Boolean, default: false },
});

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  notes: [singleNoteSchema],
});

const Notes = mongoose.models.Notes || mongoose.model("Notes", NoteSchema);

export default Notes;
