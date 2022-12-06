import { ObjectId } from "mongoose";
import { NotFoundError } from "../errors";
import { User } from "../models/data-models";
import { UserAttrs } from "../models/data-models/user-model";

const createUserService = async (requestBody: UserAttrs) => {
    const { username, email } = requestBody;

    const newUser = User.build({ username, email });
    const saveNewUser = await newUser.save();

    return saveNewUser;
};

const getAllUserService = async () => {
    const users = await User.find({}).exec();
    return users;
};

const getUserService = async (userId: string) => {
    const user = await User.findById({ _id: userId }).exec();
    if (!user) {
        throw new NotFoundError(`User Not Found By The userId Of ${userId}`);
    }
    return user;
};

const updateUserService = async (userId: string, updateData: UserAttrs) => {
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        updateData,
        {
            new: true,
        }
    ).exec();
    return updatedUser;
};

const removeUserService = async (userId: string) => {
    const user = await User.findById({ _id: userId }).exec();

    if (user) {
        const removeUser = await User.deleteOne({ _id: userId });
        return removeUser;
    }
    throw new NotFoundError(`User Not Found By The userId Of ${userId}`);
};

export {
    getAllUserService,
    createUserService,
    getUserService,
    updateUserService,
    removeUserService,
};
