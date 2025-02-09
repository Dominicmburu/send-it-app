import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

const UserDashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <>
    <div></div>
    </>
    // <div>
    //   {user ? (
    //     <div>
    //       <h1>Welcome back, {user.name}!</h1>
    //       <p>Your email is {user.email}</p>
    //     </div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
  );
}

export default UserDashboard;