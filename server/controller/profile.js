export const profile = (req, res) => {
  return res.status(200).json({
    id: req.session.user.id,
    email: req.session.user.email,
    todoList: req.session.user.todoList,
  });
};
