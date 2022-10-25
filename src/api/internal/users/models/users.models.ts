import mongoose, { Schema, model } from 'mongoose';
import { Types } from 'mongoose';
import moment from 'moment';

export interface UsersInterface extends mongoose.Document {
  email: string;
  nickname: string;
  role: Types.ObjectId;
  created_at: number;
  active: boolean;
}

const UsersSchema = new Schema(
  {
    email: String,
    nickname: String,
    role: Types.ObjectId,
    created_at: { type: Number, required: true, default: moment().unix() },
    active: { type: Boolean, required: true, default: true },
  },
  { versionKey: false }
);

export default model<UsersInterface>('users', UsersSchema);
