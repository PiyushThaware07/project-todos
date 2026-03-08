import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, createTodo, updateTodo as apiUpdateTodo, deleteTodo } from "../api/todoApi";

// Async thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await getTodos();
  return response;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await createTodo(todo);
  return response;
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async ({ id }) => {
  await deleteTodo(id);
  return id;
});

export const changeTodoStatus = createAsyncThunk(
  "todos/changeTodoStatus",
  async ({ id, status }) => {
    const response = await apiUpdateTodo(id, { status });
    return response;
  }
);

// **New thunk for full update**
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }) => {
    const response = await apiUpdateTodo(id, data);
    return response;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: {
      initialize: [],
      in_progress: [],
      completed: [],
      cancelled: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const grouped = { initialize: [], in_progress: [], completed: [], cancelled: [] };
        action.payload.forEach((todo) => {
          if (grouped[todo.status]) grouped[todo.status].push(todo);
        });
        state.todos = grouped;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos[action.payload.status].push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        Object.keys(state.todos).forEach((status) => {
          state.todos[status] = state.todos[status].filter((t) => t._id !== action.payload);
        });
      })
      .addCase(changeTodoStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        Object.keys(state.todos).forEach((status) => {
          state.todos[status] = state.todos[status].filter((t) => t._id !== updated._id);
        });
        state.todos[updated.status].push(updated);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updated = action.payload;
        Object.keys(state.todos).forEach((status) => {
          state.todos[status] = state.todos[status].filter((t) => t._id !== updated._id);
        });
        state.todos[updated.status].push(updated);
      });
  },
});

export default todoSlice.reducer;