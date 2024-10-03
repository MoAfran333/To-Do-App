import mongoose from "mongoose";
import users from "../model/user.js";

export const addToDo = async (req, res) => {
  const { userEmail, title, description, deadlineDate } = req.body;
  try {
    const user = await users.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const parsedDate = new Date(deadlineDate);
    user.todoList.push({
      title,
      description,
      deadlineDate: parsedDate,
    });
    await user.save();
    req.session.user = {
      id: user._id,
      email: user.email,
      todoList: user.todoList,
    };
    return res.status(200).json({
      id: user._id,
      email: user.email,
      todoList: user.todoList,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteToDo = async (req, res) => {
  const removeId = new mongoose.Types.ObjectId(req.params.taskId);
  console.log(removeId);
  try {
    const sessionUser = req.session.user;
    const email = sessionUser.email;
    const user = await users.findOne({ email });
    console.log(user);
    user.todoList = user.todoList.filter((todo) => !todo._id.equals(removeId));
    console.log("newArray:", user.todoList);
    await user.save();
    req.session.user = {
      id: user._id,
      email: user.email,
      todoList: user.todoList,
    };
    return res.status(200).json({
      id: user._id,
      email: user.email,
      todoList: user.todoList,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
