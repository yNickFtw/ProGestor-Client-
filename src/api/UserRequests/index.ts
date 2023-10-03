import api from "../config";

const register = async (
  firstName: string,
  surname: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await api.post("/users/create", {
      firstName,
      surname,
      email,
      password,
      confirmPassword,
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/users/authenticate", { email, password });

    return response;
  } catch (error: any) {
    return error.response;
  }
};

const fetchLoggedUser = async (token: string) => {
  try {
    const response = await api.get('/users/logged', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error: any) {
    return error.response
  };
};

export { register, login, fetchLoggedUser };
