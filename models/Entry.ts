import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

export interface EntrySchema extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'completed', 'in-progress'],
      message: 'Status ${VALUE} is invalid',
      default: 'pending',
    },
  },
});

export const EntryModel: Model<EntrySchema> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema);
