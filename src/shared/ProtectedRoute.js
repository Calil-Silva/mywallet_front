import { useHistory } from "react-router";
import UpsertUser from "../routes/UpsertUser";
import { getUserData } from "../services/loginPersistence";

export default function ProtectedRoute({ children }) {
  let isAuthenticated = getUserData()?.token && getUserData().token;
  const history = useHistory();

  if (!isAuthenticated) {
    alert("Você precisa estar logado para continuar");
    history.push("/");
    return <UpsertUser />;
  }

  return children;
}
