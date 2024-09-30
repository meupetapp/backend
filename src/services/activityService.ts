import Activity, { IActivity } from '../models/activityModel';

export const listActivities = async (tags?: string[], completed?: boolean): Promise<IActivity[]> => {
  const filter: any = {};

  if (tags && tags.length > 0) {
    filter.tags = { $in: tags };
  }

  if (completed !== undefined) {
    filter.completed = completed;
  }

  try {
    const activities = await Activity.find(filter);
    return activities;
  } catch (error) {
    throw new Error('Erro ao buscar atividades');
  }
};


export const createActivity = async (activityData: Partial<IActivity>): Promise<IActivity> => {
  const newActivity = new Activity(activityData);
  return newActivity.save();
};