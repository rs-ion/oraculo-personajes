import { NavLink, useLocation } from "react-router-dom";

const MODULES = [
  { path: "/",            label: "Inicio",        symbol: "✦",  exact: true  },
  { path: "/personajes",  label: "Personajes",     symbol: "⚔"              },
  { path: "/facciones",   label: "Facciones",      symbol: "⚜"              },
  { path: "/magia",       label: "Magia",          symbol: "✶"              },
  { path: "/pueblos",     label: "Pueblos",        symbol: "🏛"              },
  { path: "/religiones",  label: "Religiones",     symbol: "☽"              },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(13,10,7,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201,147,58,0.18);
          padding: 0 1.5rem;
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .navbar-inner::-webkit-scrollbar { display: none; }

        .navbar-brand {
          font-family: 'Cinzel Decorative', serif;
          font-size: 0.72rem;
          color: var(--gold);
          letter-spacing: 0.08em;
          white-space: nowrap;
          padding: 1rem 1.5rem 1rem 0;
          border-right: 1px solid rgba(201,147,58,0.15);
          margin-right: 0.5rem;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .navbar-brand:hover { opacity: 1; }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.85rem 0.9rem;
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-dim);
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          flex-shrink: 0;
          position: relative;
        }
        .nav-link:hover {
          color: var(--text);
          border-bottom-color: rgba(201,147,58,0.3);
        }
        .nav-link.active {
          color: var(--gold-light);
          border-bottom-color: var(--gold);
        }
        .nav-link.coming-soon {
          opacity: 0.35;
          cursor: default;
          pointer-events: none;
        }
        .nav-symbol {
          font-size: 0.82rem;
          opacity: 0.75;
        }
        .nav-link.active .nav-symbol {
          opacity: 1;
          filter: drop-shadow(0 0 6px rgba(201,147,58,0.6));
        }

        .nav-coming-badge {
          font-size: 0.42rem;
          letter-spacing: 0.1em;
          background: rgba(201,147,58,0.12);
          border: 1px solid rgba(201,147,58,0.2);
          color: var(--gold-dim);
          padding: 0.1rem 0.35rem;
          border-radius: 2px;
          margin-left: 0.2rem;
        }

        @media (max-width: 600px) {
          .navbar { padding: 0 0.5rem; }
          .navbar-brand { display: none; }
          .nav-link { padding: 0.85rem 0.65rem; font-size: 0.58rem; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="navbar-brand">El Oráculo</a>

          {MODULES.map(mod => {
            const isActive = mod.exact
              ? location.pathname === mod.path || location.pathname === "/"
              : location.pathname.startsWith(mod.path);

            const isComingSoon = ["/facciones", "/pueblos", "/religiones"].includes(mod.path);

            return (
              <NavLink
                key={mod.path}
                to={mod.path}
                className={`nav-link ${isComingSoon ? "coming-soon" : ""} ${isActive ? "active" : ""}`}
                end={mod.exact}
              >
                <span className="nav-symbol">{mod.symbol}</span>
                {mod.label}
                {isComingSoon && <span className="nav-coming-badge">pronto</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}