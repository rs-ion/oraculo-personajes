import { useState, useCallback, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const DECKS = {
  dominio: {
    id: "dominio",
    label: "Dominio Divino",
    color: "#c9933a",
    accent: "#f5c97a",
    symbol: "✨",
    cards: [
      { id: "dom01", title: "Señor del Umbral", body: "Gobierna los límites — entre la vida y la muerte, entre el sueño y la vigilia, entre lo conocido y lo salvaje. No juzga quién cruza. Solo registra que el cruce ocurrió. Su neutralidad es lo más aterrador." },
      { id: "dom02", title: "La Tejedora del Tiempo", body: "No controla el tiempo — lo teje. Ve todos los hilos a la vez pero no puede tocarlos sin alterar el patrón completo. Interviene raramente. Cuando lo hace, nadie entiende por qué hasta décadas después." },
      { id: "dom03", title: "El Padre de las Tormentas", body: "Domina el caos climático y la guerra. No es cruel — es indiferente. Los mortales interpretan sus tormentas como mensajes. Él simplemente existe, y su existencia tiene consecuencias." },
      { id: "dom04", title: "La Madre de Todo lo Que Crece", body: "Rige la vida, la fertilidad, el renacimiento. Benevolente en teoría. Olvidan que también es el invierno, la putrefacción, el ciclo que mata lo viejo para alimentar lo nuevo." },
      { id: "dom05", title: "El Guardián de los Nombres", body: "Conoce el nombre verdadero de cada cosa. Esos nombres son poder. No los da fácilmente. Los que buscan su conocimiento suelen descubrir que saber su propio nombre verdadero tiene un precio." },
      { id: "dom06", title: "La Señora de los Sueños", body: "Habita el espacio entre la conciencia y el olvido. Envía mensajes que nadie puede descifrar con certeza. ¿Son profecías? ¿Son tentaciones? ¿Es ella la autora o solo la mensajera?" },
      { id: "dom07", title: "El Dios de las Heridas que Sanan", body: "No es el dios de la salud — es el dios de la cicatriz. Preside la recuperación, el trauma superado, el daño que te cambió pero no te destruyó. Sus devotos llevan sus marcas con orgullo." },
    ]
  },
  naturaleza: {
    id: "naturaleza",
    label: "Naturaleza Divina",
    color: "#7a5c9e",
    accent: "#b89fd4",
    symbol: "🌑",
    cards: [
      { id: "nat01", title: "El Dios Herido", body: "Sufrió algo que los dioses no deberían poder sufrir — pérdida, traición, derrota. Esa herida lo hace comprensible a los mortales y peligroso en formas que sus iguales no anticipan." },
      { id: "nat02", title: "La Deidad Dual", body: "Tiene dos aspectos que no se reconcilian: amor y guerra, creación y destrucción, día y noche. Sus devotos se dividen entre los que honran un aspecto e ignoran el otro. Ambas mitades son reales." },
      { id: "nat03", title: "El Dios que Duda", body: "No está seguro de su propio propósito. Creó algo hace eones que resultó en sufrimiento. Desde entonces, cada acto divino viene cargado de una hesitación que sus sacerdotes interpretan como misterio sagrado." },
      { id: "nat04", title: "La Deidad que Fue Mortal", body: "Ascendió. Recuerda lo que era. Esa memoria la hace más justa y más rara entre sus iguales. También la hace vulnerable a manipulaciones que aprovechan su nostalgia por lo humano." },
      { id: "nat05", title: "El Dios Dormido", body: "Existe pero no actúa — o no parece actuar. Algunos dicen que duerme. Otros que observa sin interferir. Sus templos son los más silenciosos. Sus milagros, los más imposibles de negar." },
      { id: "nat06", title: "La Deidad Fragmentada", body: "Fue dividida — por guerra divina, por un ritual mortal, por su propia elección. Cada fragmento es adorado como deidad separada. Nadie sabe que son lo mismo. O casi nadie." },
      { id: "nat07", title: "El Dios que Necesita a los Mortales", body: "No es omnipotente. Existe, en algún sentido real, porque es adorado. Sin creyentes se debilita. Eso lo hace genuinamente interesado en el bienestar de sus devotos — y genuinamente desesperado cuando la fe disminuye." },
    ]
  },
  culto: {
    id: "culto",
    label: "Culto y Devoción",
    color: "#1a6b8a",
    accent: "#5bb8d4",
    symbol: "🕯",
    cards: [
      { id: "cul01", title: "Los que Sangran por Fe", body: "El dolor es sagrado. El sacrificio físico es la forma más alta de devoción. Sus rituales son intensos, sus miembros, profundamente comprometidos. La línea entre la fe genuina y el fanatismo es delgada y se mueve." },
      { id: "cul02", title: "La Hermandad del Silencio", body: "No predican. No reclutan. No explican. Practican en privado y responden solo cuando se les pregunta directamente. Esa discreción los hace misteriosos, confiables y, a veces, perfectamente posicionados para el poder." },
      { id: "cul03", title: "Los Custodios del Texto", body: "La fe está en las palabras exactas. Cada coma importa. El debate teológico es literalmente sagrado. Han librado guerras por una sola palabra. Son guardianes del conocimiento y prisioneros de la letra." },
      { id: "cul04", title: "Los Itinerantes Divinos", body: "No tienen templos — llevan la fe en su movimiento. Predicadores, peregrinos, mensajeros. Llegan a todas partes, se quedan poco tiempo y dejan comunidades pequeñas que nadie controla del todo." },
      { id: "cul05", title: "El Culto de los Elegidos", body: "Creen que su dios los escogió específicamente a ellos. No a la humanidad en general. A ellos. Eso los une como nada más podría — y los hace impermeables a cualquier argumento externo." },
      { id: "cul06", title: "Los Que Esperan el Retorno", body: "Su dios está ausente — muerto, dormido, exiliado — y volverá. Toda la práctica religiosa es preparación para ese momento. Cada generación cree que será la que vea el regreso. Llevan milenios en esa espera." },
      { id: "cul07", title: "La Fe del Umbral", body: "Se practica en secreto, dentro de otras religiones. Sus miembros son oficialmente devotos de otro dios. Esta doble lealtad no les pesa — creen que su dios habita también en lo que los demás adoran, sin saberlo." },
    ]
  },
  mito: {
    id: "mito",
    label: "Mito y Origen",
    color: "#b03a2e",
    accent: "#e8776d",
    symbol: "📿",
    cards: [
      { id: "mit01", title: "El Dios que Perdió una Apuesta", body: "El mito fundacional es una derrota. Apostó algo con otro ser divino — o con un mortal — y perdió. Las consecuencias de esa pérdida todavía se sienten en el mundo. El dios no lo ha olvidado." },
      { id: "mit02", title: "La Creadora que se Arrepiente", body: "Creó el mundo o a los mortales, pero algo salió mal. El sufrimiento que existe no era parte del plan. O sí lo era, y eso es peor. Vive con ese peso. Sus devotos lo interpretan de formas radicalmente distintas." },
      { id: "mit03", title: "El Dios Robado", body: "Le quitaron algo — un nombre, un dominio, un hijo, una victoria. El robo lo define. Sus rituales giran en torno a esa pérdida y a la promesa, nunca cumplida pero nunca abandonada, de recuperarlo." },
      { id: "mit04", title: "La Deidad que Fue Traicionada por los Suyos", body: "Sus propios sacerdotes, o su pueblo elegido, lo traicionaron en algún momento crucial. La relación entre este dios y los mortales es, desde entonces, de amor complicado y desconfianza estructural." },
      { id: "mit05", title: "El Dios que Murió y Volvió", body: "Murió de verdad. Lo saben porque el mundo cambió cuando ocurrió. Volvió, pero diferente. Lo que murió y lo que regresó no son exactamente lo mismo. Nadie sabe cuánto se perdió en el proceso." },
      { id: "mit06", title: "La Deidad Prohibida", body: "Otro poder — un panteón rival, una fuerza cósmica — la declaró ilegítima. Su nombre fue borrado de los registros oficiales. Existe en los márgenes, en cultos ilegales, en los corazones de quienes saben la verdad." },
      { id: "mit07", title: "El Dios que Hizo un Trato con un Mortal", body: "Hay un pacto, vinculante para ambas partes, entre este dios y una línea mortal específica. Los términos del pacto son conocidos. Sus implicaciones completas, no. La línea mortal sigue existiendo." },
    ]
  },
  sombra: {
    id: "sombra",
    label: "Sombra y Contradicción",
    color: "#4a3728",
    accent: "#c4956a",
    symbol: "👁",
    cards: [
      { id: "som01", title: "El Dios que Exige lo Imposible", body: "Sus mandatos son contradictorios. No por accidente — los mortales deben vivir en esa tensión irresoluble. La fe no es seguir reglas claras. Es habitar la paradoja con dignidad." },
      { id: "som02", title: "La Deidad Que Premia la Desobediencia", body: "Sus historias sagradas están llenas de mortales que le desobedecieron y fueron bendecidos por ello. Qué significa eso exactamente es el debate teológico central que sus sacerdotes nunca resuelven." },
      { id: "som03", title: "El Dios con Enemigos Dentro del Panteón", body: "Otro dios lo odia, lo teme o lo quiere destruir. Ese conflicto divino tiene consecuencias mundanas. Los devotos de ambos dioses llevan esa guerra sin entender completamente qué están peleando." },
      { id: "som04", title: "La Deidad que Guarda un Secreto Sagrado", body: "Hay algo que este dios sabe y que cambiaría todo si los mortales lo supieran. Algunos sacerdotes lo sospechan. Nadie lo dice en voz alta porque las consecuencias de pronunciarlo en voz alta son demasiado grandes." },
      { id: "som05", title: "El Dios que Falló a Sus Devotos", body: "Hubo un momento — una catástrofe, una masacre, una injusticia enorme — donde no intervino pudiendo haberlo hecho. Sus seguidores no lo abandonaron. Eso lo complica todo: su silencio y su lealtad a ese silencio." },
      { id: "som06", title: "La Deidad que Cambia", body: "No es constante. Sus valores, dominio o forma han cambiado a lo largo de los siglos. Los textos antiguos describen a alguien diferente. Sus sacerdotes debaten si esos cambios son crecimiento, corrupción, o algo que no tiene nombre." },
      { id: "som07", title: "El Dios Que Solo Aparece en la Crisis", body: "No está presente en la prosperidad ni en la rutina. Aparece en los momentos de quiebre absoluto. Sus devotos aprenden a leer el desastre como una forma de invocación." },
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
            {saved ? "✦ En el altar" : "✦ Consagrar"}
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
        <button className="saved-remove" onClick={() => onRemove(item.card.id)} title="Quitar del altar">✕</button>
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

export default function ForjaReligiones() {
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
            radial-gradient(ellipse 70% 40% at 50% 0%, #150010 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 80% 100%, #0a0010 0%, transparent 60%),
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
        <h1 className="fp-title">La Forja de Religiones</h1>
        <p className="fp-sub">Dominio, mito y contradicción que engendran lo divino</p>
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
            : <span>✦ &nbsp;Invocar Deidad</span>
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
            {rolls.length} {rolls.length === 1 ? "invocación" : "invocaciones"} · {savedCards.length} {savedCards.length === 1 ? "aspecto consagrado" : "aspectos consagrados"}
          </p>
        )}
      </div>

      {showFilters && <DeckFilter activeDecks={activeDecks} onToggle={handleToggleDeck} />}

      <div className="tabs">
        <button className={`tab-btn ${activeTab === "tiradas" ? "active" : ""}`} onClick={() => setActiveTab("tiradas")}>
          Invocaciones {rolls.length > 0 && <span className="tab-badge">{rolls.length}</span>}
        </button>
        <button className={`tab-btn ${activeTab === "mesa" ? "active" : ""}`} onClick={() => setActiveTab("mesa")}>
          Mi Altar {savedCards.length > 0 && <span className="tab-badge">{savedCards.length}</span>}
        </button>
      </div>

      <main className="main-content">
        {activeTab === "tiradas" && (
          <>
            {rolls.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-symbol">✨</div>
                <div className="empty-state-title">Los dioses aguardan ser nombrados</div>
                <p className="empty-state-sub">Pulsa "Invocar Deidad" para revelar tu primera combinación</p>
              </div>
            ) : (
              rolls.map((roll, rollIdx) => (
                <div key={roll.id} className="roll-block">
                  <div className="roll-block-header">
                    <span className="roll-number">Invocación {rolls.length - rollIdx}</span>
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
                      <span className="history-sep-label">invocación anterior</span>
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
                <div className="empty-state-symbol">👁</div>
                <div className="empty-state-title">El altar está vacío</div>
                <p className="empty-state-sub">Consagra aspectos de tus invocaciones para dar forma a tu deidad</p>
              </div>
            ) : (
              <>
                <div className="mesa-header">
                  <div className="mesa-title">Tu Deidad</div>
                  <p className="mesa-sub">Los aspectos consagrados que dan forma a lo divino</p>
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