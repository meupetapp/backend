import Note from "./Note";

interface Activity {
  title: string;
  type: string;
  description: string;
  photo: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
  createdBy: string;
  time: Date;
}
