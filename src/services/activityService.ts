import Activity, { CreateActivityDTO, IActivity } from "../models/activityModel";
import { IUser } from "../models/userModel";

const createActivity = async (activity: CreateActivityDTO, user: IUser): Promise<IActivity | null> => {
  const newActivity = new Activity({ ...activity, userId: user._id });
  return newActivity.save();
}

export const findActivitiesByPetId = async (petId: string): Promise<IActivity[]> => {
  return Activity.find({ petId });
}

export default createActivity;
