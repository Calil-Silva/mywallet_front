import { useHistory } from "react-router";
import SignIn from "../routes/SignIn";
import { getUserData } from "../services/loginPersistence";

export default function ProtectedRoute({ children }) {
  let isAuthenticated = getUserData()?.token && getUserData().token;
  const history = useHistory();

  if (!isAuthenticated) {
    alert("Você precisa estar logado para continuar");
    history.push("/");
    return <SignIn />;
  }

  return children;
}
