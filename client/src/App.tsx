import { useEffect, useState } from "react";
import "./App.css";
import { usersStore } from "./store/usersStore";

function App() {
  const users = usersStore((state) => state.users);
  const loading = usersStore((state) => state.loading);
  const hasErrors = usersStore((state) => state.hasErrors);
  const fetchUsers = usersStore((state) => state.fetch);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {loading ? <p>Loading</p> : null}
      {hasErrors ? <p>Cannot read the data</p> : null}

      <div className="app-flex">
        {users.map((user, idx) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
