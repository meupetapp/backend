import { CreateNotificationDTO } from "../controllers/notificationController";
import Notification, { INotification } from "../models/notificationModel";
import { IUser } from "../models/userModel";


const createNotification = async (notification: CreateNotificationDTO): Promise<INotification | null> => {
  const newNotification = new Notification({ text: notification.text, userId: notification.userId });
  return newNotification.save();
}

export const getNotification = async (userId: string): Promise<INotification[]> => {
  return Notification.find({ userId });
}

export default createNotification;
