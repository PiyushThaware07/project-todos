import DisplayTodos from "./components/DisplayTodos";
import AddTodoPopup from "./components/AddTodoPopup";

function App() {
  return (
    <div className="main h-screen w-screen p-10 overflow-hidden">
      <div className="h-full w-full p- flex flex-col gap-4">

        {/* Header */}
        <div className="w-full h-10 flex items-center justify-between">
          <h1 className="text-lg font-medium">Daily Workflow</h1>

          {/* AddTodoPopup now handles its own button */}
          <AddTodoPopup />
        </div>

        {/* Todo Board */}
        <DisplayTodos />

      </div>
    </div>
  );
}

export default App;