import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { updateTodo } from "../../redux/todoSlice";

export default function EditTodoPopup({ todo }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: todo.title || "",
    description: todo.description || "",
    status: todo.status || "initialize",
    priority: todo.priority || "medium",
    dueDate: todo.dueDate || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updateTodo({ id: todo._id, data: formData })).unwrap();
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="text-gray-700">
        <BiSolidMessageSquareEdit className="text-lg mt-1" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-105 p-6 rounded-xl shadow-lg flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Edit Todo</h2>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-2 rounded-md outline-none"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="border p-2 rounded-md outline-none resize-none"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
            >
              <option value="initialize">Initialize</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="border p-2 rounded-md outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsOpen(false)} className="px-3 py-2 text-sm bg-gray-200 rounded-md cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md cursor-pointer">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}