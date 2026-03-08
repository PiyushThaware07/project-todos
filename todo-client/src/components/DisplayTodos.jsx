import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, changeTodoStatus } from "../../redux/todoSlice";
import DeleteTodoButton from "./DeleteTodoButton";
import { PriorityIcon } from "./PriorityIcon";
import EditTodoPopup from "./EditTodoPopup";

function DisplayTodos() {
  const dispatch = useDispatch();
  const todoColumns = useSelector(state => state.todos.todos);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDragStart = (e, status, index) => {
    setDragging({ status, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (!dragging) return;
    const { status: oldStatus, index } = dragging;
    if (oldStatus === newStatus) return;

    const todoToMove = todoColumns[oldStatus][index];
    setDragging(null);
    dispatch(changeTodoStatus({ id: todoToMove._id, status: newStatus }));
  };

  const columnNames = {
    initialize: "Initialize",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1 overflow-x-auto">
      {Object.keys(todoColumns).map((status) => (
        <div
          key={status}
          className="border-2 border-dashed rounded-xl p-2 flex flex-col gap-2 bg-gray-50 min-w-62.5"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <div className="p-2 text-sm font-medium border-2 rounded-lg text-center bg-black text-white">
            {columnNames[status]}
          </div>
          <ul className="w-full flex flex-col gap-2">
            {todoColumns[status].map((todo, index) => (
              <li
                key={todo._id}
                draggable
                onDragStart={(e) => handleDragStart(e, status, index)}
                className="bg-gray-100 rounded-lg p-2 flex flex-col sm:flex-row sm:items-center justify-between select-none cursor-pointer"
              >
                <h1 className="text-xs font-semibold capitalize mb-1 sm:mb-0">{todo.title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <PriorityIcon priority={todo.priority} />
                  <EditTodoPopup todo={todo} />
                  <DeleteTodoButton todoId={todo._id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DisplayTodos;