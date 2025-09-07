import { Schema, model } from 'mongoose';
import {
  IPreferences,
  PreferencesModel,
} from '../interfaces/preferences.interfaces';

const preferencesSchema = new Schema<IPreferences>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    language: {
      type: String,
      enum: ['en', 'bn'],
      required: true,
    },
    currency: {
      type: String,
      enum: ['BDT', 'USD'],
      required: true,
    },
    notifications: {
      email: {
        type: Boolean,
        required: true,
      },
      push: {
        type: Boolean,
        required: true,
      },
      sms: {
        type: Boolean,
        required: false,
      },
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Preferences = model<IPreferences, PreferencesModel>(
  'Preferences',
  preferencesSchema,
);

export default Preferences;
