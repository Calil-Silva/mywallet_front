import { GlobalStyle } from "../src/styles/globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UpsertUser from "./routes/UpsertUser";
import Balances from "./routes/Balances";
import AddEntry from "./routes/AddEntry";
import ProtectedRoute from "./shared/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <UpsertUser />
        </Route>
        <Route path="/:userStatus" exact>
          <UpsertUser />
        </Route>
        <Route path="/:userStatus/:user" exact>
          <ProtectedRoute>
            <Balances />
          </ProtectedRoute>
        </Route>
        <Route path="/:userStatus/:user/:entryType" exact>
          <ProtectedRoute>
            <AddEntry />
          </ProtectedRoute>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
