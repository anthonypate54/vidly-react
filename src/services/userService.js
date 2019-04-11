import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  // const user = { ...user };
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
