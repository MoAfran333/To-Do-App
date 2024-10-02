import users from "../model/user.js";

export const addToDo = async (req, res) => {
  const { email, title, description, deadlineDate } = req.body;
  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const parsedDate = new Date(deadlineDate);
    user.todoList.push({ title, description, deadlineDate: parsedDate });
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
