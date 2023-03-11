import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

import { AuthContext } from "./Context/Context";

function App() {
  const authCTX = useContext(AuthContext);
  console.log({ app: authCTX });
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCTX.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        <Route path="/profile">{authCTX.isLoggedIn && <UserProfile />}</Route>

        <Route path="*">
          <Redirect to="/ " />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
