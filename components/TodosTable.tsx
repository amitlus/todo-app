import { TodoInstance } from "@/pages/todos";

const TodosTable: React.FC<{
  todoList: TodoInstance[];
  onDelete: (id: string, username: string) => void;
  onUpdate: (id: string) => void;
  onAdd: () => void;
}> = ({ todoList, onDelete, onUpdate, onAdd }) => {
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo: TodoInstance, index: number) => (
            <tr
              key={todo.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {todo.description}
              </th>
              <td className="px-6 py-4">{todo.dueDate.toString()}</td>
              <td className="px-6 py-4">{todo.isDone ? "Done" : "Not done"}</td>
              <td>
                {" "}
                <button
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-1 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => onDelete(todo.id, todo.username)}
                >
                  Delete
                </button>{" "}
              </td>
              <td>
                {" "}
                <button
                  className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 font-medium rounded-full text-sm px-2 py-1 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                  onClick={() => onUpdate(todo.id)}
                >
                  Update
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodosTable;
