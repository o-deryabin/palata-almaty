import { createContext } from "react";

const noop = () => {};

export const MainContext = createContext({
  user: {
    fio: "",
    email: "",
    tel: "",
  },
  authenticated: true,
  final: false,
  setFinal: noop,
  setAuthenticated: noop,
  setUser: noop,
});
