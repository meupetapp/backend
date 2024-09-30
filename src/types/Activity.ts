import Note from "./Note";

export default interface Activity {
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
  tags: string[]; 
  completed: boolean;
}
