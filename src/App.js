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
        <Route path="/" component={UpsertUser} exact />
        <Route path="/:userStatus" component={UpsertUser} exact />
        <ProtectedRoute>
          <Route path="/:userStatus/:user" component={Balances} exact />
        </ProtectedRoute>
        <ProtectedRoute>
          <Route
            path="/:userStatus/:user/:entryType"
            component={AddEntry}
            exact
          />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}
