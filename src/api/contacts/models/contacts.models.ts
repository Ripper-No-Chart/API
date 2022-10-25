import mongoose, { Schema, model } from 'mongoose';

export interface ContactsInterface extends mongoose.Document {
  properties: {
    createdate: Date;
    email: string;
    firstname: string;
    hs_object_id: number;
    lastmodifieddate: Date;
    lastname: string;
  };
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}

const ContactsSchema = new Schema(
  {
    properties: {
      createdate: Date,
      email: String,
      firstname: String,
      hs_object_id: Number,
      lastmodifieddate: Date,
      lastname: String,
    },
    createdAt: Date,
    updatedAt: Date,
    archived: Boolean,
  },
  { timestamps: { createdAt: true, updatedAt: true }, versionKey: false }
);

export default model<ContactsInterface>('contacts', ContactsSchema);
