import axios from "axios";
import { GetSessionParams, getSession } from "next-auth/react";
import { TodoInstance } from ".";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInput } from "./create";
import { useRouter } from "next/navigation";
import { isDateNotEarlierThanToday } from "@/validations";

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  const username = session?.user?.name ?? "";
  const { id } = context?.params; // Access the dynamic 'id' part from the URL & use curly braces {} for destructuring
  let data: TodoInstance | null = null;
  try {
    const response = await axios.get(
      `http://localhost:8080/users/${username}/todos/${id}`
    );
    data = response.data;
  } catch (error) {
    console.log(error);
  }

  // Pass data to the page via props
  return { props: { data, session, id } };
}

function Todo({ data, session, id }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();
  const navigate = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    if (session?.user) {
      axios
        .put(`http://localhost:8080/users/${session?.user?.name}/todos/${id}`, {
          id: id,
          username: session?.user?.name,
          description: formData.description,
          dueDate: formData.dueDate,
          isDone: formData.isDone,
        })

        .then((response) => {
          if (response.status === 200) {
            navigate.replace(`/todos`);
            console.log("Todo task created successfully");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("You have to be loggedin in order to add a Todo task!");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-4">
          <input
            {...register("description", { required: true, maxLength: 20 })}
            className="border rounded p-2 w-full"
            placeholder="Description"
            defaultValue={data?.description}
          />
          {errors.description && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("dueDate", {
              required: true,
              valueAsDate: true,
              validate: {
                notEarlierThanToday: (value) =>
                  isDateNotEarlierThanToday(value),
              },
            })}
            type="date"
            className="border rounded p-2 w-full"
            placeholder="Due Date"
            defaultValue={
              data?.dueDate
                ? new Date(data.dueDate).toLocaleDateString("en-CA")
                : ""
            }
          />
          {errors.dueDate && (
            <span className="text-red-500">
              This field is required & supposed to be a valid date!
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("isDone")}
              className="border rounded p-2 mr-2"
              defaultValue={data?.isDone}
            />
            Is Done
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default Todo;
