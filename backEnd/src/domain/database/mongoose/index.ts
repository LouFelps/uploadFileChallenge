import { connect } from 'mongoose';
import { database } from '../../../config/environment';

export const initialize = async () => {
  const mongoose = await connect(database.uri!);
  await mongoose.syncIndexes();

  return mongoose;
};
