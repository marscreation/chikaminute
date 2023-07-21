import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    profilePicture: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
