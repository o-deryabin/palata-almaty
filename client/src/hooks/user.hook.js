import { useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState({
    fio: "",
    email: "",
    tel: "",
  });

  const [result, setResult] = useState("");

  const [authenticated, setAuthenticated] = useState(true);

  return { user, setUser, authenticated, setAuthenticated, result, setResult };
};
