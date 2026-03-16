import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HubPage from "./pages/HubPage.jsx";
import ForjaPersonajes from "./pages/ForjaPersonajes.jsx";
import ForjaMagia from "./pages/ForjaMagia.jsx";
import ForjaFacciones from "./pages/ForjaFacciones.jsx";
import ForjaPueblos from "./pages/ForjaPueblos.jsx";
import ForjaReligiones from "./pages/ForjaReligiones.jsx";

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/"            element={<HubPage />} />
        <Route path="/personajes"  element={<ForjaPersonajes />} />
        <Route path="/magia"       element={<ForjaMagia />} />
        <Route path="/facciones"   element={<ForjaFacciones />} />
        <Route path="/pueblos"     element={<ForjaPueblos />} />
        <Route path="/religiones"  element={<ForjaReligiones />} />
      </Routes>
    </HashRouter>
  );
}