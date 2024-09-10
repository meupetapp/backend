export default interface Pet {
  name: string;
  photo: string;
  species: string;
  breed: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isAdopted: boolean;
  dateAdoption?: Date; // Campo opcional
  birthDate: Date;
  sex: string;
  color: string;
}
