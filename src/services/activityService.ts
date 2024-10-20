import Activity, { CreateActivityDTO, IActivity } from "../models/activityModel";
import { IUser } from "../models/userModel";

const createActivity = async (activity: CreateActivityDTO, user: IUser): Promise<IActivity | null> => {
  const newActivity = new Activity({ ...activity, userId: user._id });
  return newActivity.save();
}

export const findActivitiesByPetId = async (petId: string): Promise<IActivity[]> => {
  return Activity.find({ petId });
}

export const createComment = async (activityId: string, comment: { text: string }, user: IUser): Promise<IActivity | null> => {
  console.log('@activityService.createComment', activityId, comment, user);
  const activity = await Activity.findById(activityId);
  if (!activity) {
    throw new Error('Atividade não encontrada');
  }

  activity.comments.push({ ...comment, userId: user._id, username: user.username, createdAt: new Date() });
  return activity.save();
}

export default createActivity;
