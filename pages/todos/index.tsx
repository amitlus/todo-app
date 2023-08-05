import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSession } from "next-auth/react";
import TodosTable from "@/components/TodosTable";

export interface TodoInstance {
  id: string;
  username: string;
  description: string;
  dueDate: Date;
  isDone: boolean;
}

// This gets called on every request
export async function getServerSideProps(context) {
  const session = await getSession(context); // Use getSession to access the session
  const username = session?.user?.name ?? ""; // Get the username from the session if it exists
  // Fetch data from external API using the username
  let data: TodoInstance[] = [];
  try {
    const response = await axios.get(
      `http://localhost:8080/users/${username}/todos`
    );
    data = response.data;
  } catch (error) {
    console.log(error);
  }

  // Pass data to the page via props
  return { props: { data } };
}

function TodoList({ data }) {
  const navigate = useRouter();
  const [todoList, setTodoList] = useState(data);

  function deleteTodoHandler(id: string, username: string): void {
    axios
      .delete(`http://localhost:8080/users/${username}/todos/${id}`)
      .then((response) => {
        if (response.status === 204) {
          setTodoList(
            todoList.filter(
              (todo: TodoInstance) =>
                !(todo.username === username && todo.id === id)
            )
          );
          console.log("Todo task was deleted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateTodoHandler(id: any): void {
    console.log("Update todo was clicked " + id);
    navigate.replace(`/todos/${id}`);
  }

  function addTodoHandler(): void {
    console.log("Add todo was clicked");
    navigate.replace(`/todos/create`);
  }

  return (
    <div>
      <TodosTable
        todoList={todoList}
        onDelete={deleteTodoHandler}
        onUpdate={updateTodoHandler}
        onAdd={addTodoHandler}
      ></TodosTable>
      <br></br>
      <div className="flex flex-col items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addTodoHandler()}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default TodoList;
