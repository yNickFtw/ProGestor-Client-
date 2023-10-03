import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/lib/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import useUserStore from "@/states/user.state";
import { Building2, LayoutDashboard, LogOut, Users } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export const Sidebar = () => {
  const { logout } = useUserStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="flex flex-col w-[300px] h-[100vh] justify-between bg-blue-950 fixed left-0 top-0 bottom-0">
      <div className="max-w-[250px] flex justify-center items-center">
        <Link
          to={"/"}
          className="text-3xl text-center text-zinc-50 flex justify-center items-center ml-8"
        >
          <h1>ProGestor</h1>
        </Link>
      </div>

      <div className="flex flex-col justify-between text-center">
        <div className="flex flex-col justify-center items-center text-center">
          <NavLink
            className="flex justify-center items-center border-b-2 border-t-2 mt-3 border-blue-800 
            text-lg p-2 w-[80%] transition-all hover:bg-blue-800 hover:text-slate-50 text-zinc-300 rounded-sm"
            to={"/"}
          >
            <LayoutDashboard size={"1.2em"} /> Dashboard
          </NavLink>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <NavLink
            className="flex justify-center items-center border-b-2 border-t-2 mt-3 border-blue-800 
            text-lg p-2 w-[80%] transition-all hover:bg-blue-800 hover:text-slate-50 text-zinc-300 rounded-sm"
            to={"/categories"}
          >
            <Building2 size={"1.2em"} /> Empresas
          </NavLink>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <NavLink
            className="flex justify-center items-center border-b-2 border-t-2 mt-3 border-blue-800 
            text-lg p-2 w-[80%] transition-all hover:bg-blue-800 hover:text-slate-50 text-zinc-300 rounded-sm"
            to={"/products"}
          >
            <Users size={"1.2em"} className="mr-4" /> Pessoas
          </NavLink>
        </div>
      </div>

      {/* WRAPPERS */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {/* END WRAPPES */}

      <DropdownMenu>
        <DropdownMenuTrigger className="border-none p-2 outline-none">
          <div className="flex flex-row justify-evenly items-center text-center">
            <Avatar>
              {localStorage.getItem("infoimage") ? (
                <AvatarImage
                  src={`http://localhost:7777/${localStorage.getItem(
                    "infoimage"
                  )}`}
                />
              ) : (
                <AvatarFallback>PF</AvatarFallback>
              )}
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-blue-950 border-blue-900">
          <DropdownMenuLabel className="text-zinc-50">
            Sua conta
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-blue-400" />

          <Link to={"/profile"} className="w-full text-zinc-300 cursor-pointer hover:bg-blue-900">
            <DropdownMenuItem className="">
              Perfil
            </DropdownMenuItem>
          </Link>
          <button
            className="flex flex-row items-center w-full"
            onClick={handleLogout}
          >
            <DropdownMenuItem className="text-zinc-300 hover:text-zinc-50 w-full">
              <LogOut size={"1.2em"} /> Logout
            </DropdownMenuItem>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
};
