import { useState } from "react";
import { LuDelete } from "react-icons/lu";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export const Users = () => {
  const loadedUsers = useLoaderData([]);
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (id) => {
    console.log("Delete", id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast("Deleted successfully.");
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        }
      });
  };

  return (
    <div>
      <h2>Users: {users.length}</h2>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}
            <Link to={`/update/${user._id}`}>
            <button className="btn">Update</button></Link>
            <button onClick={() => handleDelete(user._id)} className="btn px-4">
              <LuDelete />
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};
