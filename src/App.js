import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Logs from "./routes/Logs"
import AddDebit from "./routes/AddDebit";
import AddCredit from "./routes/AddCredit";
import UserContext from "./contexts/UserContext";
import { useState } from "react";


export default function App() {
  const [userData, setUserData] = useState("");
  return (
    <BrowserRouter>
        <GlobalStyle />
        <Switch> 
          <UserContext.Provider value={{
            userData, setUserData
          }} >
          <Route path="/" component={Login} exact/>
          <Route path="/signup" component={SignUp} exact/>
          <Route path="/logs" component={Logs} exact/>
          <Route path="/addcredit" component={AddCredit} exact/>
          <Route path="/adddebit" component={AddDebit} exact/>
          </UserContext.Provider>
        </Switch>
    </BrowserRouter>
  );
}
