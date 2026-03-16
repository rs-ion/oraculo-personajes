import { useState, useCallback, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const DECKS = {
  origen: {
    id: "origen",
    label: "Origen",
    color: "#c9933a",
    accent: "#f5c97a",
    symbol: "🌄",
    cards: [
      { id: "o01", title: "Los Exiliados del Amanecer", body: "Fueron expulsados de otro lugar — por conquista, por herejía, por ser incómodos. La memoria del hogar perdido vive en cada generación. La pregunta es si alguna vez fue real o si ya es solo un mito." },
      { id: "o02", title: "Los Que Cruzaron el Vacío", body: "Llegaron de un territorio inhóspito que nadie más pudo cruzar. Ese paso los forjó. Todo lo que son viene de haber sobrevivido lo que mató a los demás." },
      { id: "o03", title: "Los Nacidos del Pacto", body: "No son un pueblo natural — son el resultado de un acuerdo entre grupos que necesitaban aliarse para sobrevivir. La unión fue estratégica. Después de generaciones, ya no recuerdan la diferencia." },
      { id: "o04", title: "Los Herederos de las Ruinas", body: "Construyeron su civilización sobre los restos de otra más grande. No saben si los que vinieron antes desaparecieron o si siguen aquí, en otra forma, esperando." },
      { id: "o05", title: "Los Plantados por los Dioses", body: "Su origen está en una narrativa divina. Nacieron aquí porque algo los puso aquí con un propósito. El debate teológico que nunca termina es si ese propósito ya se cumplió." },
      { id: "o06", title: "Los Que Siempre Estuvieron", body: "No tienen mito de llegada. Simplemente han estado aquí desde antes de que existiera la memoria. Esa antigüedad es su legitimidad y su prisión." },
      { id: "o07", title: "Los Forjados por la Catástrofe", body: "Un evento apocalíptico — guerra, plaga, desastre natural — destruyó lo que eran antes. Lo que quedó se reorganizó. Su identidad es el después, no el antes." },
    ]
  },
  tierra: {
    id: "tierra",
    label: "Tierra y Entorno",
    color: "#2d6a4f",
    accent: "#74c69d",
    symbol: "🌿",
    cards: [
      { id: "ti01", title: "El Bastión de Piedra", body: "Viven en un territorio naturalmente defendible — montañas, cañones, islas. La geografía los protegió y los aisló a partes iguales. Son resistentes y desconfiados de lo que viene de fuera." },
      { id: "ti02", title: "La Llanura sin Fronteras", body: "Su tierra no tiene defensas naturales. Han sido invadidos, atravesados y conquistados. Han aprendido a sobrevivir la ocupación, a preservar la cultura bajo cualquier bandera." },
      { id: "ti03", title: "El Cruce de Caminos", body: "Están en el centro de las rutas comerciales o militares del mundo conocido. Prosperan con el tráfico. También son el campo de batalla natural de todos los que pasan." },
      { id: "ti04", title: "El Borde del Mundo", body: "Habitan una frontera — con un desierto, un océano, una zona hostil. Nadie más quiere estar aquí. Eso les da una libertad que los pueblos del centro no pueden imaginar." },
      { id: "ti05", title: "La Tierra Viva", body: "Su entorno tiene algo inusual — recurso escaso, fenómeno extraño, territorio que parece tener voluntad propia. Toda su civilización está organizada alrededor de esa singularidad." },
      { id: "ti06", title: "El Territorio en Disputa", body: "Nunca han tenido la tierra solo para ellos. Siempre hay otro que la reclama — un vecino, un empire, una memoria histórica. Vivir aquí es vivir en negociación permanente." },
      { id: "ti07", title: "La Patria Móvil", body: "No tienen territorio fijo o lo perdieron. Llevan la patria en las costumbres, el idioma, los rituales. La tierra es una idea, no un lugar. Eso los hace indestructibles e indefinidamente desplazados." },
    ]
  },
  cultura: {
    id: "cultura",
    label: "Cultura y Carácter",
    color: "#7a5c9e",
    accent: "#b89fd4",
    symbol: "🎭",
    cards: [
      { id: "cu01", title: "El Pueblo de la Memoria Oral", body: "No escriben. Todo está en las voces de los narradores. El conocimiento es vivo, adaptable, y susceptible de corromperse con cada generación. También es imposible de quemar." },
      { id: "cu02", title: "Los Obsesionados con el Honor", body: "La reputación es todo. Un insulto puede terminar en guerra; un acto noble puede cambiar el destino de una familia. La rigidez de ese código los hace predecibles, confiables y frágiles." },
      { id: "cu03", title: "Los Pragmáticos sin Vergüenza", body: "No tienen ideología — solo resultados. Cambian de alianza, de costumbre, de creencia cuando es conveniente. Los demás los ven como traidores. Ellos sobreviven." },
      { id: "cu04", title: "Los Devotos del Arte", body: "Su mayor logro no son sus ejércitos o su comercio. Son sus obras. Lo bello es lo sagrado. Los artistas son su élite real. Y esa élite puede ser tan tiránica como cualquier nobleza militar." },
      { id: "cu05", title: "Los Guerreros que Construyen", body: "Son conocidos por la violencia pero lo que los define es lo que construyen después. Cada conquista es seguida de administración. No destruyen — transforman." },
      { id: "cu06", title: "Los Forasteros en Todas Partes", body: "Viven entre otros pueblos desde hace tanto que ya no tienen una cultura propia claramente diferenciada. O quizás la tienen perfectamente preservada precisamente porque nunca pudieron darla por sentada." },
      { id: "cu07", title: "Los Guardadores del Umbral", body: "Su función cultural es mediar entre opuestos — entre lo sagrado y lo profano, entre lo vivo y lo muerto, entre lo conocido y lo misterioso. Esa posición les da poder e inestabilidad a partes iguales." },
    ]
  },
  gobierno: {
    id: "gobierno",
    label: "Gobierno y Poder",
    color: "#1a6b8a",
    accent: "#5bb8d4",
    symbol: "👑",
    cards: [
      { id: "g01", title: "El Consejo de Ancianos", body: "El poder está en quienes más han vivido. La experiencia gobierna. El costo es la rigidez: quienes más poder tienen son los que menos comprenden el mundo que se está formando." },
      { id: "g02", title: "La Teocracia Funcional", body: "Los sacerdotes gobiernan o los gobernantes son sacerdotes. La frontera entre lo político y lo religioso no existe. Eso da legitimidad absoluta y corrupción absoluta en igual medida." },
      { id: "g03", title: "El Linaje Sagrado", body: "Una familia o clan gobierna por derecho divino o histórico. Es estable cuando el linaje es fuerte. Es catastrófico cuando el heredero es indigno. Y tarde o temprano, siempre hay un heredero indigno." },
      { id: "g04", title: "La Asamblea de Iguales", body: "Todos los adultos votan, en teoría. En la práctica, los que tienen tiempo, dinero y voz son los que deciden. La ilusión democrática puede ser más resistente que la democracia real." },
      { id: "g05", title: "El Generalato Permanente", body: "Los militares gobiernan. Justifican el poder con la seguridad que proveen. La pregunta permanente que nadie hace en voz alta: ¿quién los protege del ejército?" },
      { id: "g06", title: "Los Gremios en el Trono", body: "El comercio y los artesanos organizados controlan el poder. Eficiente, pragmático, corrupto de formas muy específicas y predecibles. Los ricos se hacen más ricos; los pobres pueden al menos predecir cómo." },
      { id: "g07", title: "El Vacío de Poder Negociado", body: "No hay un poder central claro. Múltiples facciones se equilibran en una danza constante. Es caótico, resiliente, y produce una libertad extraña: nadie tiene suficiente poder para oprimirte totalmente." },
    ]
  },
  legado: {
    id: "legado",
    label: "Legado y Herida",
    color: "#b03a2e",
    accent: "#e8776d",
    symbol: "🩸",
    cards: [
      { id: "l01", title: "La Deuda que No Se Salda", body: "Hicieron algo a otro pueblo — conquista, traición, genocidio cultural. Lo saben. El otro pueblo lo sabe. Nadie lo dice directamente en los tratados. Vive en todo lo que hacen." },
      { id: "l02", title: "La Gloria que Fue", body: "Tuvieron un momento de grandeza que no han podido repetir. Toda su política, arte y religión mira hacia ese pasado. El problema es que nadie está seguro de si fue tan grande como lo recuerdan." },
      { id: "l03", title: "La Profecía que los Persigue", body: "Hay una predicción sobre su destino — de grandeza, de destrucción, o de transformación. Algunos la buscan. Otros la evitan. Nadie puede ignorarla." },
      { id: "l04", title: "El Mártir que los Define", body: "Alguien murió por ellos de una forma que se convirtió en el centro de su identidad. Ese mártir es más poderoso muerto que vivo. Y hay quienes explotan esa potencia con fines propios." },
      { id: "l05", title: "La Herida Abierta", body: "Sufrieron algo que no ha sanado — una masacre, una traición, una ocupación. La herida es real. También es usada. La distinción entre trauma genuino y narrativa política se ha borrado." },
      { id: "l06", title: "El Secreto Fundacional", body: "Hay algo en su origen que cambiaría todo si se supiera. Sus instituciones existen en parte para que ese secreto no salga. Todo el mundo sospecha. Nadie lo dice." },
      { id: "l07", title: "El Aliado que los Cambió", body: "Hubo un encuentro con otro pueblo que los transformó para siempre. Puede ser un intercambio cultural, una alianza matrimonial, una conquista suave. No son exactamente lo que eran. No saben si eso es pérdida o evolución." },
    ]
  },
};

// ─── UTILS ───────────────────────────────────────────────────────────────────

function randomCard(deckId) {
  const deck = DECKS[deckId];
  return deck.cards[Math.floor(Math.random() * deck.cards.length)];
}

function generateRoll(activeDeckIds) {
  return activeDeckIds.map(deckId => ({
    deckId,
    card: randomCard(deckId),
  }));
}

// ─── CARD COMPONENT ──────────────────────────────────────────────────────────

function CardComponent({ deckId, card, onSave, saved }) {
  const [flipped, setFlipped] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const deck = DECKS[deckId];

  const prevCard = useRef(card);
  if (prevCard.current.id !== card.id) {
    prevCard.current = card;
  }

  const handleSave = (e) => {
    e.stopPropagation();
    if (saved) return;
    setSparkle(true);
    setTimeout(() => setSparkle(false), 600);
    onSave({ deckId, card });
  };

  return (
    <div
      className={`card-wrapper ${flipped ? "flipped" : ""}`}
      onClick={() => !flipped && setFlipped(true)}
      style={{ "--deck-color": deck.color, "--deck-accent": deck.accent }}
      title={!flipped ? "Clic para revelar" : ""}
    >
      <div className="card-inner">
        <div className="card-face card-back">
          <div className="card-back-pattern" />
          <div className="card-back-symbol">{deck.symbol}</div>
          <div className="card-back-label">{deck.label}</div>
          <div className="card-back-border" />
          <div className="card-back-hint">toca para revelar</div>
        </div>
        <div className="card-face card-front">
          <div className="card-front-glow" />
          <div className="card-front-header">
            <span className="card-deck-label">{deck.symbol} {deck.label}</span>
          </div>
          <div className="card-divider" />
          <div className="card-title">{card.title}</div>
          <div className="card-body">{card.body}</div>
          <div className="card-divider" style={{ marginTop: "auto" }} />
          <button
            className={`card-save-btn ${saved ? "saved" : ""} ${sparkle ? "sparkle" : ""}`}
            onClick={handleSave}
          >
            {saved ? "✦ En la mesa" : "✦ Rescatar"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SAVED CARD ───────────────────────────────────────────────────────────────

function SavedCard({ item, onRemove }) {
  const deck = DECKS[item.deckId];
  return (
    <div className="saved-card" style={{ "--deck-color": deck.color, "--deck-accent": deck.accent }}>
      <div className="saved-card-top">
        <span className="saved-deck-symbol">{deck.symbol}</span>
        <span className="saved-deck-label">{deck.label}</span>
        <button className="saved-remove" onClick={() => onRemove(item.card.id)} title="Quitar de la mesa">✕</button>
      </div>
      <div className="saved-card-title">{item.card.title}</div>
      <div className="saved-card-body">{item.card.body}</div>
    </div>
  );
}

// ─── DECK FILTER ─────────────────────────────────────────────────────────────

function DeckFilter({ activeDecks, onToggle }) {
  return (
    <div className="deck-filter">
      <div className="deck-filter-label">Barajas activas</div>
      <div className="deck-filter-pills">
        {Object.values(DECKS).map(deck => (
          <button
            key={deck.id}
            className={`deck-pill ${activeDecks.includes(deck.id) ? "active" : ""}`}
            style={{ "--deck-color": deck.color, "--deck-accent": deck.accent }}
            onClick={() => onToggle(deck.id)}
          >
            <span className="deck-pill-symbol">{deck.symbol}</span>
            <span className="deck-pill-label">{deck.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ForjaPueblos() {
  const [rolls, setRolls] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [activeTab, setActiveTab] = useState("tiradas");
  const [activeDecks, setActiveDecks] = useState(Object.keys(DECKS));
  const [showFilters, setShowFilters] = useState(false);
  const rollCount = useRef(0);

  const handleToggleDeck = useCallback((deckId) => {
    setActiveDecks(prev => {
      if (prev.includes(deckId)) {
        if (prev.length === 1) return prev;
        return prev.filter(d => d !== deckId);
      }
      return [...prev, deckId];
    });
  }, []);

  const handleRoll = useCallback(() => {
    if (rolling || activeDecks.length === 0) return;
    setRolling(true);
    setTimeout(() => {
      rollCount.current += 1;
      const newRoll = {
        id: rollCount.current,
        timestamp: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
        cards: generateRoll(activeDecks),
        isNew: true,
      };
      setRolls(prev => [newRoll, ...prev]);
      setRolling(false);
      setActiveTab("tiradas");
    }, 350);
  }, [rolling, activeDecks]);

  const handleSave = useCallback(({ deckId, card }) => {
    setSavedCards(prev => {
      if (prev.find(s => s.card.id === card.id)) return prev;
      return [...prev, { deckId, card }];
    });
  }, []);

  const handleRemoveSaved = useCallback((cardId) => {
    setSavedCards(prev => prev.filter(s => s.card.id !== cardId));
  }, []);

  const isSaved = useCallback((cardId) => savedCards.some(s => s.card.id === cardId), [savedCards]);

  return (
    <>
      <style>{`
        .fp-bg-texture {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 40% at 50% 0%, #001a0a 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 10% 100%, #0a1200 0%, transparent 60%),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(201,147,58,0.012) 80px, rgba(201,147,58,0.012) 81px),
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201,147,58,0.012) 80px, rgba(201,147,58,0.012) 81px);
        }
        .fp-header { position: relative; z-index: 10; padding: 2.5rem 2rem 1.8rem; text-align: center; border-bottom: 1px solid rgba(201,147,58,0.15); }
        .fp-eyebrow { font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.5em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 0.6rem; }
        .fp-title { font-family: 'Cinzel Decorative', serif; font-size: clamp(1.5rem, 3.5vw, 2.6rem); font-weight: 700; color: var(--gold); text-shadow: 0 0 50px rgba(201,147,58,0.35), 0 2px 6px rgba(0,0,0,0.9); letter-spacing: 0.04em; line-height: 1.2; }
        .fp-sub { font-size: 1rem; color: var(--text-dim); font-style: italic; margin-top: 0.5rem; letter-spacing: 0.02em; }
        .fp-ornament { display: flex; align-items: center; justify-content: center; gap: 0.8rem; margin-top: 1.2rem; }
        .fp-orn-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold-dim)); }
        .fp-orn-line.r { background: linear-gradient(90deg, var(--gold-dim), transparent); }
        .fp-orn-diamond { color: var(--gold-dim); font-size: 0.5rem; }
        .controls { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; padding: 1.8rem 1rem 1.2rem; gap: 1rem; }
        .roll-btn { position: relative; padding: 0.9rem 2.8rem; background: transparent; border: 1px solid var(--gold); color: var(--gold-light); font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.25s ease; overflow: hidden; }
        .roll-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,147,58,0.12) 0%, transparent 60%); opacity: 0; transition: opacity 0.25s; }
        .roll-btn:hover::before { opacity: 1; }
        .roll-btn:hover { box-shadow: 0 0 28px rgba(201,147,58,0.25), inset 0 0 16px rgba(201,147,58,0.04); transform: translateY(-1px); }
        .roll-btn:active { transform: translateY(0); }
        .roll-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .filter-toggle { background: transparent; border: 1px solid rgba(201,147,58,0.25); color: var(--text-dim); font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.4rem 1rem; cursor: pointer; transition: all 0.2s; border-radius: 2px; }
        .filter-toggle:hover { color: var(--text); border-color: rgba(201,147,58,0.5); }
        .filter-toggle.open { color: var(--gold); border-color: var(--gold-dim); }
        .roll-stats { font-size: 0.78rem; color: var(--text-dim); font-style: italic; }
        .deck-filter { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; padding: 1rem 1.5rem 1.5rem; border-bottom: 1px solid rgba(201,147,58,0.1); animation: fadeSlideIn 0.25s ease forwards; }
        .deck-filter-label { font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.8rem; text-align: center; }
        .deck-filter-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
        .deck-pill { display: flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.8rem; background: transparent; border: 1px solid rgba(120,100,70,0.3); color: var(--text-dim); font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s; border-radius: 2px; }
        .deck-pill:hover { border-color: var(--deck-color); color: var(--text); }
        .deck-pill.active { border-color: var(--deck-color); color: var(--deck-accent); background: rgba(0,0,0,0.3); box-shadow: 0 0 12px rgba(0,0,0,0.2); }
        .deck-pill-symbol { font-size: 0.9rem; }
        .tabs { position: relative; z-index: 10; display: flex; border-bottom: 1px solid rgba(201,147,58,0.12); padding: 0 2rem; max-width: 1400px; margin: 0 auto; }
        .tab-btn { padding: 0.7rem 1.4rem; background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-dim); font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .tab-btn:hover { color: var(--text); }
        .tab-btn.active { color: var(--gold-light); border-bottom-color: var(--gold); }
        .tab-badge { display: inline-flex; align-items: center; justify-content: center; background: var(--gold); color: var(--ink); border-radius: 50%; width: 1.1rem; height: 1.1rem; font-size: 0.6rem; font-weight: 700; margin-left: 0.4rem; font-family: 'Cinzel', serif; }
        .main-content { position: relative; z-index: 10; max-width: 1400px; margin: 0 auto; padding: 2rem 1.5rem 5rem; }
        .empty-state { text-align: center; padding: 5rem 2rem; color: var(--text-dim); }
        .empty-state-symbol { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.35; }
        .empty-state-title { font-family: 'Cinzel', serif; font-size: 1rem; letter-spacing: 0.1em; margin-bottom: 0.5rem; color: var(--text-dim); }
        .empty-state-sub { font-style: italic; font-size: 0.9rem; opacity: 0.6; }
        .roll-block { margin-bottom: 2.5rem; animation: fadeSlideIn 0.45s ease forwards; }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .roll-block-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.1rem; }
        .roll-number { font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.25em; color: var(--gold-dim); text-transform: uppercase; white-space: nowrap; }
        .roll-time { font-size: 0.72rem; color: var(--text-dim); font-style: italic; }
        .roll-rule { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(201,147,58,0.18), transparent); }
        .roll-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(195px, 1fr)); gap: 1rem; }
        .card-wrapper { height: 310px; perspective: 1000px; cursor: pointer; transition: transform 0.2s; }
        .card-wrapper:hover:not(.flipped) { transform: translateY(-5px) scale(1.015); }
        .card-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-wrapper.flipped .card-inner { transform: rotateY(180deg); }
        .card-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 7px; overflow: hidden; }
        .card-back { background: #0f0c09; border: 2px solid var(--deck-accent); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem; box-shadow: 0 6px 24px rgba(0,0,0,0.7); }
        .card-back-pattern { position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.007) 8px, rgba(255,255,255,0.007) 9px), repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.007) 8px, rgba(255,255,255,0.007) 9px); border-radius: 6px; }
        .card-back-symbol { font-size: 2.2rem; color: var(--deck-accent); filter: drop-shadow(0 0 14px var(--deck-color)); opacity: 1; position: relative; }
        .card-back-label { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--deck-accent); opacity: 0.85; position: relative; }
        .card-back-border { position: absolute; inset: 7px; border: 1px solid rgba(201,147,58,0.1); border-radius: 4px; pointer-events: none; }
        .card-back-hint { position: absolute; bottom: 10px; font-size: 0.80rem; font-style: italic; color: var(--deck-accent); opacity: 0.85; letter-spacing: 0.05em; }
        .card-front { transform: rotateY(180deg); background: linear-gradient(155deg, #1c1508 0%, #0e0b07 100%); border: 1px solid var(--deck-color); padding: 0.9rem 0.85rem 0.85rem; display: flex; flex-direction: column; gap: 0.45rem; box-shadow: 0 6px 28px rgba(0,0,0,0.75); }
        .card-front-glow { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,147,58,0.07) 0%, transparent 70%); pointer-events: none; border-radius: 6px; }
        .card-front-header { display: flex; justify-content: space-between; align-items: center; }
        .card-deck-label { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--deck-accent); opacity: 0.65; }
        .card-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--deck-color), transparent); opacity: 0.3; }
        .card-title { font-family: 'Cinzel', serif; font-size: 0.88rem; font-weight: 600; color: var(--deck-accent); line-height: 1.3; text-shadow: 0 0 18px rgba(245,201,122,0.25); }
        .card-body { font-size: 0.79rem; line-height: 1.58; color: var(--parchment-dark); flex: 1; overflow: hidden; font-style: italic; }
        .card-save-btn { background: transparent; border: 1px solid var(--deck-color); color: var(--deck-accent); font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.38rem 0.7rem; cursor: pointer; transition: all 0.2s; border-radius: 2px; align-self: flex-end; margin-top: 2px; }
        .card-save-btn:hover { background: rgba(201,147,58,0.14); box-shadow: 0 0 10px rgba(201,147,58,0.18); }
        .card-save-btn.saved { border-color: var(--gold-dim); color: var(--gold-dim); opacity: 0.55; cursor: default; }
        .card-save-btn.sparkle { animation: sparkleAnim 0.5s ease; }
        @keyframes sparkleAnim { 0% { box-shadow: 0 0 0 rgba(245,201,122,0); } 50% { box-shadow: 0 0 18px rgba(245,201,122,0.55); background: rgba(201,147,58,0.28); } 100% { box-shadow: 0 0 0 rgba(245,201,122,0); } }
        .history-sep { display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0 2rem; }
        .history-sep-rule { flex: 1; height: 1px; background: rgba(201,147,58,0.08); }
        .history-sep-label { font-size: 0.68rem; color: var(--text-dim); font-style: italic; }
        .mesa-header { margin-bottom: 1.8rem; }
        .mesa-title { font-family: 'Cinzel Decorative', serif; font-size: 1.15rem; color: var(--gold); margin-bottom: 0.3rem; }
        .mesa-sub { font-size: 0.88rem; color: var(--text-dim); font-style: italic; }
        .saved-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(245px, 1fr)); gap: 1.1rem; }
        .saved-card { background: linear-gradient(145deg, #1a1208, #100d08); border: 1px solid var(--deck-color); border-radius: 6px; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.5rem; position: relative; animation: fadeSlideIn 0.35s ease forwards; box-shadow: 0 4px 18px rgba(0,0,0,0.5); }
        .saved-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,147,58,0.06) 0%, transparent 70%); pointer-events: none; border-radius: 5px; }
        .saved-card-top { display: flex; align-items: center; gap: 0.5rem; }
        .saved-deck-symbol { font-size: 0.95rem; color: var(--deck-color); }
        .saved-deck-label { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--deck-accent); opacity: 0.65; flex: 1; }
        .saved-remove { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 0.78rem; padding: 0.1rem 0.3rem; transition: color 0.2s; }
        .saved-remove:hover { color: #c04040; }
        .saved-card-title { font-family: 'Cinzel', serif; font-size: 0.88rem; font-weight: 600; color: var(--deck-accent); line-height: 1.3; }
        .saved-card-body { font-size: 0.82rem; line-height: 1.56; color: var(--parchment-dark); font-style: italic; }
        .rolling-dots { display: flex; gap: 0.35rem; justify-content: center; }
        .rolling-dot { width: 5px; height: 5px; background: var(--gold); border-radius: 50%; animation: blink 1s infinite; }
        .rolling-dot:nth-child(2) { animation-delay: 0.2s; }
        .rolling-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
      `}</style>

      <div className="fp-bg-texture" />

      <header className="fp-header">
        <div className="fp-eyebrow">✦ El Oráculo ✦</div>
        <h1 className="fp-title">La Forja de Pueblos</h1>
        <p className="fp-sub">Origen, tierra y heridas que forjan naciones</p>
        <div className="fp-ornament">
          <div className="fp-orn-line" />
          <span className="fp-orn-diamond">◆</span>
          <div className="fp-orn-line r" />
        </div>
      </header>

      <div className="controls">
        <button className="roll-btn" onClick={handleRoll} disabled={rolling}>
          {rolling
            ? <div className="rolling-dots"><div className="rolling-dot"/><div className="rolling-dot"/><div className="rolling-dot"/></div>
            : <span>✦ &nbsp;Forjar Pueblo</span>
          }
        </button>
        <button
          className={`filter-toggle ${showFilters ? "open" : ""}`}
          onClick={() => setShowFilters(v => !v)}
        >
          {showFilters ? "▲ Ocultar barajas" : "▼ Seleccionar barajas"} ({activeDecks.length}/{Object.keys(DECKS).length})
        </button>
        {rolls.length > 0 && (
          <p className="roll-stats">
            {rolls.length} {rolls.length === 1 ? "tirada" : "tiradas"} · {savedCards.length} {savedCards.length === 1 ? "carta rescatada" : "cartas rescatadas"}
          </p>
        )}
      </div>

      {showFilters && <DeckFilter activeDecks={activeDecks} onToggle={handleToggleDeck} />}

      <div className="tabs">
        <button className={`tab-btn ${activeTab === "tiradas" ? "active" : ""}`} onClick={() => setActiveTab("tiradas")}>
          Tiradas {rolls.length > 0 && <span className="tab-badge">{rolls.length}</span>}
        </button>
        <button className={`tab-btn ${activeTab === "mesa" ? "active" : ""}`} onClick={() => setActiveTab("mesa")}>
          Mi Pueblo {savedCards.length > 0 && <span className="tab-badge">{savedCards.length}</span>}
        </button>
      </div>

      <main className="main-content">
        {activeTab === "tiradas" && (
          <>
            {rolls.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-symbol">🌄</div>
                <div className="empty-state-title">La tierra espera ser nombrada</div>
                <p className="empty-state-sub">Pulsa "Forjar Pueblo" para revelar tu primera combinación</p>
              </div>
            ) : (
              rolls.map((roll, rollIdx) => (
                <div key={roll.id} className="roll-block">
                  <div className="roll-block-header">
                    <span className="roll-number">Tirada {rolls.length - rollIdx}</span>
                    <span className="roll-time">{roll.timestamp}</span>
                    <div className="roll-rule" />
                  </div>
                  <div className="roll-cards-grid">
                    {roll.cards.map((item, cardIdx) => (
                      <CardComponent
                        key={`${roll.id}-${item.deckId}`}
                        deckId={item.deckId}
                        card={item.card}
                        onSave={handleSave}
                        saved={isSaved(item.card.id)}
                      />
                    ))}
                  </div>
                  {rollIdx < rolls.length - 1 && (
                    <div className="history-sep">
                      <div className="history-sep-rule" />
                      <span className="history-sep-label">tirada anterior</span>
                      <div className="history-sep-rule" />
                    </div>
                  )}
                </div>
              ))
            )}
          </>
        )}
        {activeTab === "mesa" && (
          <>
            {savedCards.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-symbol">👑</div>
                <div className="empty-state-title">El pueblo no tiene historia aún</div>
                <p className="empty-state-sub">Rescata cartas de tus tiradas para construir tu nación</p>
              </div>
            ) : (
              <>
                <div className="mesa-header">
                  <div className="mesa-title">Tu Pueblo</div>
                  <p className="mesa-sub">Los elementos que forjan su historia, tierra e identidad colectiva</p>
                </div>
                <div className="saved-grid">
                  {savedCards.map(item => (
                    <SavedCard key={item.card.id} item={item} onRemove={handleRemoveSaved} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}