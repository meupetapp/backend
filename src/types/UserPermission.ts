export default interface UserPermission {
  petId: string;
  userId: string;
  permissions: string[];
  sentAt: Date;
  status: string;
}
