import { useEffect, useState } from "react";
import { getUserDetails } from "@/app/services/userService";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return; // Stop execution if no token
    }

    const fetchUser = async () => {
      try {
        const { status, data } = await getUserDetails();
        if (status === 200) {
          setUser(data);
        } else {
          localStorage.removeItem("authToken"); // Remove invalid token
          setUser(null);
        }
      } catch (error) {
        localStorage.removeItem("authToken"); // Remove token on error
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, setUser };
};
