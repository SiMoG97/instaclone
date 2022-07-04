import mongoose, { Document } from "mongoose";
import { UserType } from "./types";

const UserSchema = new mongoose.Schema<UserType & Document>(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // collection: "hanan",
  }
);

// module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

export default (mongoose.models.User as mongoose.Model<UserType & Document>) ||
  mongoose.model<UserType & Document>("User", UserSchema);
