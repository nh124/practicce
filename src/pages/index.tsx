/* eslint-disable @typescript-eslint/no-floating-promises */
import Head from "next/head";
import Link from "next/link";
import AddItem from "~/Components/AddItem";
import Navbar from "~/Components/Navbar";
import { api } from "~/utils/api";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();

  enum Role {
    CUSTOMER,
    SELLER,
  }
  const list = api.listings.list.useQuery();
  const createUser = api.users.create.useMutation();

  const AddUser = async () => {
    if (!isSignedIn) return "user not signed in";
    await createUser.mutateAsync({ name: user?.fullName, role: "SELLER" });
  };
  useEffect(() => {
    const fetchData = async () => {
      AddUser()
        .then(() => {
          console.log("User Added Successfully");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    };
    fetchData();
  }, [isSignedIn]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Navbar />

        <div className="grid h-full w-[90%] grid-cols-4 gap-5 overflow-y-auto px-3 py-[5%]">
          {list?.data?.map((item) => (
            <div
              class="relative max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
              key={item.id}
            >
              <button className="absolute right-5 top-2">X</button>
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item?.name}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
export default Home;
