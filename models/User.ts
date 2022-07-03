import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
});

// module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

export default mongoose.models.User || mongoose.model("User", UserSchema);
