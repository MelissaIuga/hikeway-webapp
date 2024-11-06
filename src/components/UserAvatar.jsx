import { useEffect, useState } from "react";

export default function UserAvatar({ uid }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        `https://hikeway-webapp-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
      );
      const data = await response.json();
      setUser(data); // sets the user state with the data from firebase
    }
    getUser(); // call the getUser function
  }, [uid]); 

  return (
    <div className="avatar">
      <img
        src={user?.image || "https://placehold.co/50x50.webp"}
        alt={user?.name}
      />
      <span>
        <h2>{user?.name}</h2>
        <p>{user?.title}</p>
      </span>
    </div>
  );
}
