import users from "../model/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }
    const isPasswordSame = password === existingUser.password;
    if (!isPasswordSame) {
      return res.status(400).json({ message: "Password is Incorrect" });
    }
    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
      todoList: existingUser.todoList,
    };
    return res.status(200).json({
      userId: existingUser._id,
      userEmail: existingUser.email,
      userTodoList: existingUser.todoList,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "User Already Exists" });
    }
    const newUser = await users.create({
      email,
      password,
    });
    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
      todoList: existingUser.todoList,
    };
    return res.status(200).json({
      userId: newUser._id,
      userEmail: newUser.email,
      userTodoList: newUser.todoList,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    req.session.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Logged Out Successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
