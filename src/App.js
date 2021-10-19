import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp"


export default function App() {
  return (
    <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route component={SignUp}/>
        </Switch>
    </BrowserRouter>
  );
}
