import { Schema, model } from 'mongoose';
import { IUser, UserModel } from '../interfaces/user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: false,
    },
    occupation: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isBiometricActive: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    monthlyIncome: {
      type: Number,
      required: false,
    },
    monthlySavings: {
      type: Number,
      required: false,
    },
    riskTolerance: {
      type: String,
      enum: ['conservative', 'moderate', 'aggressive'],
      required: false,
    },
    totalInvestment: {
      type: Number,
      required: false,
    },
    goalProgress: {
      type: Number,
      required: false,
    },
    financialProfile: {
      type: Schema.Types.ObjectId,
      ref: 'FinancialProfile',
      required: false,
    },
    riskAssessment: {
      type: Schema.Types.ObjectId,
      ref: 'RiskAssessment',
      required: false,
    },
    preferences: {
      type: Schema.Types.ObjectId,
      ref: 'Preferences',
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExist = async function (
  value: string,
  field: string,
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { [field]: value },
    { _id: 1, password: 1, role: 1, contactNo: 1 },
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
const User = model<IUser, UserModel>('User', userSchema);
export default User;
