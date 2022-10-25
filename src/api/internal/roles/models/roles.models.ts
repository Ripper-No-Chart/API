import mongoose, { Schema, model } from 'mongoose';

export interface RolesInterface extends mongoose.Document {
  role?: string;
}

const RolesSchema = new Schema(
  {
    role: String,
  },
  { versionKey: false }
);

export default model<RolesInterface>('roles', RolesSchema);
