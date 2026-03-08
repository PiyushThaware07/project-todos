import { useDispatch } from "react-redux";
import { removeTodo } from "../../redux/todoSlice";
import { AiFillCloseSquare } from "react-icons/ai";

export default function DeleteTodoButton({ todoId }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(removeTodo({ id: todoId }));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <button
      className="cursor-pointer text-red-600"
      onClick={handleDelete}>
      <AiFillCloseSquare className="text-xl" />
    </button>
  );
}