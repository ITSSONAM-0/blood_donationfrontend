import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeAuthenticatedRequest } from "../utils/auth"; // ✅ yaha

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await makeAuthenticatedRequest(
          "/api/auth/profile",
          { method: "GET" },
          navigate
        );

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-xl w-96">
        <h2 className="text-xl font-bold mb-3">Profile</h2>

        {user ? (
          <p>Welcome {user.name}</p>
        ) : (
          <p>{token ? "Loading..." : "Please login first"}</p>
        )}
      </div>
    </div>
  );
}