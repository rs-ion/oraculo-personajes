import { Link } from "react-router-dom";

const MODULE_META = {
  facciones:  { label: "Forja de Facciones",  symbol: "⚜", color: "#7a5c9e", accent: "#b89fd4",
    desc: "Genera facciones con tipo, trasfondo, principios, objetivos y ritos mediante tiradas aleatorias con barajas." },
  magia:      { label: "Forja de Magia",       symbol: "✶", color: "#1a6b8a", accent: "#5bb8d4",
    desc: "Mezcla sistemas mágicos con sliders: Elemental, Nigromancia, Santería, Vudú, Magia de Sangre y más, hasta el 100%." },
  pueblos:    { label: "Forja de Pueblos",     symbol: "🏛", color: "#2d6a4f", accent: "#74c69d",
    desc: "Crea naciones y pueblos con sociedad, jerarquía, tipo y política mediante tiradas de barajas." },
  religiones: { label: "Forja de Religiones",  symbol: "☽", color: "#8b2a2a", accent: "#e8776d",
    desc: "Diseña panteones con deidades, sistema de creencias, culto, moral y trasfondo propios." },
};

export default function ComingSoonPage({ module }) {
  const meta = MODULE_META[module] ?? {
    label: "Módulo", symbol: "✦", color: "#c9933a", accent: "#f5c97a", desc: ""
  };

  return (
    <>
      <style>{`
        .cs-page {
          min-height: calc(100vh - 53px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .cs-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--cs-color) 0%, transparent 70%);
          opacity: 0.04;
          pointer-events: none;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: csPulse 4s ease-in-out infinite;
        }
        @keyframes csPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.04; }
          50%       { transform: translate(-50%, -50%) scale(1.15); opacity: 0.07; }
        }
        .cs-symbol {
          font-size: 4rem;
          color: var(--cs-color);
          filter: drop-shadow(0 0 24px var(--cs-color));
          opacity: 0.55;
          margin-bottom: 1.5rem;
          animation: csPulse 4s ease-in-out infinite;
        }
        .cs-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 0.55rem;
          letter-spacing: 0.55em;
          color: var(--cs-color);
          text-transform: uppercase;
          opacity: 0.5;
          margin-bottom: 0.8rem;
        }
        .cs-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 700;
          color: var(--cs-accent);
          text-align: center;
          text-shadow: 0 0 40px rgba(201,147,58,0.2);
          margin-bottom: 1rem;
        }
        .cs-ornament {
          display: flex; align-items: center; gap: 0.8rem;
          margin: 0.5rem 0 1.5rem;
        }
        .cs-orn-line { width: 50px; height: 1px; background: linear-gradient(90deg, transparent, var(--cs-color)); opacity: 0.4; }
        .cs-orn-line.r { background: linear-gradient(90deg, var(--cs-color), transparent); }
        .cs-orn-diamond { color: var(--cs-color); font-size: 0.45rem; opacity: 0.5; }

        .cs-desc {
          max-width: 440px;
          text-align: center;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--parchment-dark);
          font-style: italic;
          margin-bottom: 2.5rem;
        }
        .cs-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--cs-color);
          border: 1px solid var(--cs-color);
          opacity: 0.5;
          padding: 0.5rem 1.2rem;
          border-radius: 3px;
          margin-bottom: 3rem;
        }
        .cs-back {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dim);
          text-decoration: none;
          border-bottom: 1px solid rgba(201,147,58,0.2);
          padding-bottom: 2px;
          transition: all 0.2s;
        }
        .cs-back:hover {
          color: var(--gold);
          border-bottom-color: var(--gold);
        }
      `}</style>

      <div
        className="cs-page"
        style={{ "--cs-color": meta.color, "--cs-accent": meta.accent }}
      >
        <div className="cs-glow" />
        <div className="cs-symbol">{meta.symbol}</div>
        <div className="cs-eyebrow">En construcción</div>
        <h1 className="cs-title">{meta.label}</h1>

        <div className="cs-ornament">
          <div className="cs-orn-line" />
          <span className="cs-orn-diamond">◆</span>
          <div className="cs-orn-line r" />
        </div>

        <p className="cs-desc">{meta.desc}</p>

        <div className="cs-badge">
          <span>◌</span>
          Próximamente
        </div>

        <Link to="/" className="cs-back">← Volver al Oráculo</Link>
      </div>
    </>
  );
}