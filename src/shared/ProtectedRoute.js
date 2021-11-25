import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import UpsertUser from "../routes/UpsertUser";
import { getAuthentication } from "../services/api";
import { getUserData, removeUserData } from "../services/loginPersistence";

export default function ProtectedRoute({ children }) {
  let token = getUserData()?.token && getUserData().token;
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  function handleError(errorMsg) {
    alert(errorMsg);
    removeUserData();
    history.push("/");
  }

  getAuthentication(token).catch((err) => {
    setIsAuthenticated(false);
    handleError(err.response.data.message);
  });

  return isAuthenticated ? children : <UpsertUser />;
}
