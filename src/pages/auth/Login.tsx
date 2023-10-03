import { FormEvent, useState } from 'react';
import { Separator } from "@/lib/components/ui/separator";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/api/UserRequests';
import { toast } from 'react-toastify';
import useUserStore from '@/states/user.state';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useUserStore();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await login(email, password);

    if(response) {
      if(response.status === 400) {
        toast.error(response.data.message);
        return
      } else if (response.status === 200) {
        toast.success(response.data.message);
        authenticate(response.data.auth.token, response.data.auth.userId);
        navigate('/')
      };
    };

    setIsLoading(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-8">Faça o Login</h2>
        <Separator />
        <form className="mt-7" onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="text-sm text-gray-400 block">Email:</label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 border rounded-lg shadow bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-sm text-gray-400 block">Senha:</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg shadow bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mb-5 text-gray-400">Não tem uma conta? <Link to={"/register"} className="underline text-blue-400">Clique aqui!</Link></p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            {!isLoading ? (
              <>
              Entrar
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

export default Login;
