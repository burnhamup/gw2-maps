import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapPage from "./pages/MapPage";
import { GW2ApiAccountProvider } from "./context/apiContext";
import Page from "./pages/Page";

function App() {
  return (
    <GW2ApiAccountProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/map/:name" element={<MapPage />} />
          <Route path="/" element={<Page />} />
        </Routes>
      </Router>
    </GW2ApiAccountProvider>
  );
}

export default App;
