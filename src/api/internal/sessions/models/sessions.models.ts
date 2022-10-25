import mongoose, { Schema, model } from 'mongoose';
import moment from 'moment';

export interface SessionsInterface extends mongoose.Document {
  email: string;
  created_at: number;
}

const SessionsSchema = new Schema(
  {
    email: String,
    created_at: { type: Number, required: true, default: moment().unix() },
  },
  { versionKey: false }
);

export default model<SessionsInterface>('sessions', SessionsSchema);
