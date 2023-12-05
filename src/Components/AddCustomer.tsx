import React from "react";

const AddCustomer = ({ sellerId }) => {
  const AddCustomer = async () => {
    console.log();
  };
  return (
    <form action="" onSubmit={AddCustomer}>
      <input type="email" name="email" placeholder="Email" />
      <input type="submit">Add Customer</input>
    </form>
  );
};

export default AddCustomer;
