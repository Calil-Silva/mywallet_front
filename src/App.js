import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./routes/Login";

export default function App() {
  return (
    <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route component={Login}/>
        </Switch>
    </BrowserRouter>
  );
}
