import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Logs from "./routes/Logs"
import AddDebit from "./routes/AddDebit";
import AddCredit from "./routes/AddCredit";


export default function App() {
  return (
    <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route component={AddCredit}/>
        </Switch>
    </BrowserRouter>
  );
}
