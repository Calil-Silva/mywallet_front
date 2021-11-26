import { GlobalStyle } from "../src/styles/globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Balances from "./routes/Balances";
import AddEntry from "./routes/AddEntry";
import ProtectedRoute from "./shared/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/balances" exact>
          <ProtectedRoute>
            <Balances />
          </ProtectedRoute>
        </Route>
        <Route path="/balances/:entryType" exact>
          <ProtectedRoute>
            <AddEntry />
          </ProtectedRoute>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
