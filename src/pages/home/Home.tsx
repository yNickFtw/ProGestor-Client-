import { fetchLoggedUser } from "@/api/UserRequests";
import { Sidebar } from "@/shared/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Home = () => {
  const [loggedUser, setLoggedUser] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchLogged() {
      const token = localStorage.getItem("token") as string;

      const response = await fetchLoggedUser(token);
    
      if(response) {
        if(response.status === 200) {
          setLoggedUser(response.data)
        } else if (response.status === 401) {
          toast.error(response.data.message),
          navigate('/login')
        }
      }
    };

    fetchLogged();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="align-content">
        <div className="pt-5">
          <h1 className="text-3xl text-zinc-50">Dashboard</h1>
        </div>
      </div>
    </>
  );
};
