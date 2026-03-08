import { apiRequest } from "./axiosClient";

export const createTodo = (data) =>
    apiRequest({
        method: "POST",
        url: "/api/todos",
        data: data || {}
    });

export const getTodos = () =>
    apiRequest({
        method: "GET",
        url: "/api/todos"
    });

export const updateTodo = (id, data) =>
    apiRequest({
        method: "PUT",
        url: `/api/todos/${id}`,
        data: data || {}
    });

export const deleteTodo = (id) =>
    apiRequest({
        method: "DELETE",
        url: `/api/todos/${id}`
    });