import Sidebar from "./Sidebar";
import TaskView from "./TaskView";

export default function Home() {

  return (
    <div className="h-screen flex flex-row">
      <Sidebar />
      <TaskView />
    </div>
  );
}
