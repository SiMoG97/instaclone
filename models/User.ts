import mongoose, { Document } from "mongoose";
import { UserType } from "./types";

const UserSchema = new mongoose.Schema<UserType & Document>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    following: {
      type: [String],
    },
    followers: {
      type: [String],
    },
    date_of_birth: String,
  },
  {
    timestamps: true,
    // collection: "hanan",
  }
);

// module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

export default (mongoose.models.User as mongoose.Model<UserType & Document>) ||
  mongoose.model<UserType & Document>("User", UserSchema);
