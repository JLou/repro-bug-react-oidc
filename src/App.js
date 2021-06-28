import { withAuthentication } from "@axa-fr/react-oidc-context-fetch";
import logo from "./logo.svg";
import "./App.css";
import { OidcSecure } from "@axa-fr/react-oidc-context";
import {
  AuthenticationProvider,
  oidcLog,
  InMemoryWebStorage,
} from "@axa-fr/react-oidc-context";
import { useEffect } from "react";

const configuration = {
  client_id: "interactive.public.short",
  redirect_uri: "http://localhost:3000/authentication/callback",
  response_type: "code",
  post_logout_redirect_uri: "http://localhost:3000/",
  scope: "openid profile email api offline_access",
  authority: "https://demo.identityserver.io",
  silent_redirect_uri: "http://localhost:3000/authentication/silent_callback",
  automaticSilentRenew: true,
  loadUserInfo: true,
};

let i = 0;

const getI = () => {
  i++;
  return i;
};

const Composant = ({ fetch, user }) => {
  useEffect(() => console.log("fetch effect"), [fetch]);
  useEffect(() => console.log("rerender"), []);
  return <h1>toto {getI()}</h1>;
};

Composant.whyDidYouRender = true;

const EnhancedComposant = withAuthentication(fetch)(Composant);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AuthenticationProvider
          configuration={configuration}
          loggerLevel={oidcLog.DEBUG}
          isEnabled={false}
          UserStore={InMemoryWebStorage}
        >
          <OidcSecure>
            <EnhancedComposant />
          </OidcSecure>
        </AuthenticationProvider>
      </header>
    </div>
  );
}

export default App;
