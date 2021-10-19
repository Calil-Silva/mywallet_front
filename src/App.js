import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Teste from "./teste";

export default function App() {
  return (
    <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route component={Teste}/>
        </Switch>
    </BrowserRouter>
  );
}
