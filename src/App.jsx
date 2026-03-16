import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HubPage from "./pages/HubPage.jsx";
import ComingSoonPage from "./pages/ComingSoonPage.jsx";
import ForjaPersonajes from "./pages/ForjaPersonajes.jsx";
import ForjaMagia from "./pages/ForjaMagia.jsx";

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/"            element={<HubPage />} />
        <Route path="/personajes"  element={<ForjaPersonajes />} />
        <Route path="/magia"       element={<ForjaMagia />} />
        <Route path="/facciones"   element={<ComingSoonPage module="facciones" />} />
        <Route path="/pueblos"     element={<ComingSoonPage module="pueblos" />} />
        <Route path="/religiones"  element={<ComingSoonPage module="religiones" />} />
      </Routes>
    </HashRouter>
  );
}