import { FindOperators } from "mongodb";
import mongoose from "mongoose";

/** user */
const userSchema = new mongoose.Schema({
  username: { type: "string", required: true },
  email: { type: "string", required: true },

  authentication: {
    password: { type: "string", required: true, select: false },
    //salt is used to prevent from rainbow table attacks
    salt: { type: "string", select: false },
    sessionToken: { type: "string", select: false },
  },
});

const UserModel = mongoose.model("User", userSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);

/** Authentication */
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

/** Creating a user */
export const createUser = (values: Record<string, any>): Promise<any> =>
  new UserModel(values).save().then((user) => user.toObject());

/** Delete user */
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (
  id: string,
  values: Record<string, any>
): Promise<any> => UserModel.findByIdAndUpdate(id, values);
