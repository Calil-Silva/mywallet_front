import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Balances from "./routes/Balances";
import AddEntry from "./routes/AddEntry";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/balances" component={Balances} exact />
        <Route path="/balances/:entryType" component={AddEntry} exact />
      </Switch>
    </BrowserRouter>
  );
}
