import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IFormInput {
  description: string;
  dueDate: Date;
  isDone: boolean;
}

export default function CreateTodo() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  const { data: session, status } = useSession();
  const navigate = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (session?.user) {
      axios
        .post(`http://localhost:8080/users/${session?.user?.name}/todos`, {
          id: 1, //Need to declare a global counter that increases/decreases according to Todo being created/deleted
          username: session?.user?.name,
          description: data.description,
          dueDate: data.dueDate,
          isDone: data.isDone,
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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-4">
          <input
            {...register("description", { required: true, maxLength: 20 })}
            className="border rounded p-2 w-full"
            placeholder="Description"
          />
          {errors.description && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("dueDate", { required: true, valueAsDate: true })}
            type="date"
            className="border rounded p-2 w-full"
            placeholder="Due Date"
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
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="border rounded p-2 mr-2"
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
