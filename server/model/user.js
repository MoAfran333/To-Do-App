import mongoose from "mongoose";

const todoListSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadlineDate: { type: Date, required: true },
});

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  todoList: [todoListSchema],
});

const users = mongoose.model("User", userSchema);

export default users;
