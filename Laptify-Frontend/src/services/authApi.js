import axios from "axios"

export const register = (data) => {
    return axios.post("/v1/auth/register", data)
}
export const login = (data) => {
  return axios.post('/v1/auth/login', data);
};
