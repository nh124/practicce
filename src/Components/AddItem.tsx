import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AddItem: NextPage = () => {
  const createListing = api.listings.create.useMutation();
  const userDataBId = api.users.get.useQuery();
  const router = useRouter();
  const [formData, setFormData] = useState<NameType>({
    ownerId: 0,
    name: "",
    description: "",
    price: 0,
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof NameType,
  ) => {
    const value =
      fieldName === "price"
        ? parseFloat(event.target.value)
        : event.target.value;
    setFormData({ ...formData, [fieldName]: value });
  };

  useEffect(() => {
    // Wait for userDataBId to load and update formData
    if (!userDataBId.isLoading && userDataBId.data) {
      setFormData((prevData) => ({
        ...prevData,
        ownerId: userDataBId.data.id, // Update with the actual property from userDataBId
      }));
    }
  }, [userDataBId.isLoading, userDataBId.data]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // Perform the mutation and wait for it to complete
      await createListing.mutateAsync(formData);
      // After the mutation is successful, navigate to the next page
      router.push("/");
    } catch (error) {
      // Handle any errors that occurred during the mutation
      console.error("Error creating listing:", error);
    }
  };
  return (
    <form className="mx-auto max-w-sm" onSubmit={onSubmit}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          onChange={(e) => onChange(e, "name")}
          type="text"
          id="name"
          className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="name"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          description
        </label>
        <input
          onChange={(e) => onChange(e, "description")}
          type="text"
          id="description"
          className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="repeat-password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          price
        </label>
        <input
          onChange={(e) => onChange(e, "price")}
          id="price"
          className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add item
      </button>
    </form>
  );
};

export default AddItem;
