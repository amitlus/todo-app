import { GetSessionParams, getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { TodoInstance } from "./todos";
import axios from "axios";

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  const username = session?.user?.name ?? "";
  let data: TodoInstance[] = [];
  try {
    const response = await axios.get(
      `http://localhost:8080/users/${username}/todos/urgent`
    );
    data = response.data;
  } catch (error) {
    console.log(error);
  }

  return { props: { data, session } };
}

function Home({ data }) {
  const { data: session } = useSession();
  const username = session?.user?.name ?? "";
  const profilePicture = session?.user?.image ?? "";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl font-bold">Welcome {username}</p>
      {/* Use the Image component */}
      {profilePicture && (
        <Image
          className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
          src={profilePicture}
          width={120}
          height={120}
          alt={profilePicture ?? "Profile Pic"}
          priority={true}
        />
      )}
      {session && (
        <>
          <br></br>
          <p className="text-2xl font-bold">High-Priority Todos</p>
          <ul className="mt-4 space-y-2">
            {data.map((todo: TodoInstance) => (
              <li
                key={todo.id}
                className="px-4 py-2 bg-green-400 text-white rounded-md"
              >
                {todo.description}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
