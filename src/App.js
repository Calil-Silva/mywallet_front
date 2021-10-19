import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route />
        </Switch>
    </BrowserRouter>
  );
}
