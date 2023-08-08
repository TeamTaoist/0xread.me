import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import RouterLink from "./router";
import Web3Provider from "./providers/web3Provider";
import Header from "./components/header";

function App() {
  return (
    <Web3Provider>
      <Router>
        <Header />
        <RouterLink />
      </Router>
    </Web3Provider>
  );
}

export default App;
