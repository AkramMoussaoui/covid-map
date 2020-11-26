import Map from "./components/Map";
import Stats from "./components/Stats";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Map />
      </Route>
      <Route exact path="/:country">
        <Stats />
      </Route>
    </Router>
  );
}

export default App;
