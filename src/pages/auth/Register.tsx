import { useState } from "react";
import { Separator } from "@/lib/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { register } from "@/api/UserRequests";
import { toast } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)

    const response = await register(
      firstName,
      surname,
      email,
      password,
      confirmPassword
    );

    if(response) {
      if (response.status === 400) {
        toast.error(response.data.message);
      } else if (response.status === 201) {
        toast.success(response.data.message);
        navigate('/login')
      } else {
        toast.error(response.data.message);
      };

      setIsLoading(false)
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-8">
          Faça o cadastro
        </h2>
        <Separator />
        <form className="mt-7" onSubmit={handleRegister}>
          <div className="mb-6">
            <label className="text-sm text-gray-400 block">
              Primeiro nome:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg shadow bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu primeiro nome"
              autoComplete="off"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-400 block">Sobrenome:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg shadow bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu sobrenome"
              autoComplete="off"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-400 block">Email:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg shadow bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-400 block">Senha:</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg shadow bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-400 block">
              Confirme sua senha:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg shadow bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirme sua senha"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="mb-5 text-gray-400">
            Já tem uma conta?{" "}
            <Link to={"/login"} className="underline text-blue-400">
              Clique aqui!
            </Link>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            {!isLoading ? (
              <>
              Cadastrar
              </>
            ) : (
              <>
              Aguarde
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
