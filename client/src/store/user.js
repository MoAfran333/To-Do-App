import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUser: {
    id: null,
    email: null,
    todoList: [],
  },

  setUser: async (id, email, todoList) => {
    set({
      currentUser: { id, email, todoList },
    });
  },

  fetchLoginUser: async (email, password) => {
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const { userId, userEmail, userTodoList } = await res.json();
      console.log(userId, userEmail, userTodoList);
      set({
        currentUser: { id: userId, email: userEmail, todoList: userTodoList },
      });
      return { success: true, message: "Successfully Logged In" };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  fetchSignUpUser: async (email, password) => {
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const { userId, userEmail, userTodoList } = await res.json();
      console.log(userId, userEmail, userTodoList);
      set({
        currentUser: { id: userId, email: userEmail, todoList: userTodoList },
      });
      return { success: true, message: "Successfully Signed Up" };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  fetchData: async () => {
    try {
      const res = await fetch("/api/auth/check-session");
      const data = await res.json();
      console.log(" Data Fetched : ", data);
      set({
        currentUser: {
          id: data.id,
          email: data.email,
          todoList: data.todoList,
        },
      });
      if (data.id !== null && data.email !== null) {
        return { success: true, message: "Data Fetched" };
      } else {
        return {
          success: false,
          message: "Something Went Wrong, Please Login Again",
        };
      }
    } catch (e) {
      return {
        success: false,
        message: "Error",
      };
    }
  },

  addToDoList: async (email, title, description, deadlineDate) => {
    try {
      const res = await fetch("/api/todolist/create", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, title, description, deadlineDate }),
      });
      const { user } = await res.json();
      console.log(user);
      set({ currentUser: user });
      return { success: true, message: "Successfully Created the To-Do" };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  logOut: async () => {
    try {
      const res = await fetch("/api/user/logout");
      const { success, message } = await res.json();
      set({
        currentUser: {
          id: null,
          email: null,
          todoList: [],
        },
      });
      if (success === true) {
        return { success: true, message: message };
      } else {
        return { success: false, message: message };
      }
    } catch (e) {
      return { success: false, message: e.message };
    }
  },
}));

export default useUserStore;
