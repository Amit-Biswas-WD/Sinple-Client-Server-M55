import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const Update = () => {
  const singleData = useLoaderData();
  console.log(singleData);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch(`http://localhost:5000/users/${singleData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast("User Updated Successfully.");
        }
      });
  };

  return (
    <div>
      <h2>Update information of: {singleData.name}</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={singleData.name} id="" />
        <br />
        <input
          type="email"
          name="email"
          defaultValue={singleData.email}
          id=""
        />
        <br />
        <input type="submit" value="Update User" />
      </form>
    </div>
  );
};

export default Update;
