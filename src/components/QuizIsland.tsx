import { useState } from "preact/hooks";
import { PRODUCTS, QUIZ_QUESTIONS, quizResult } from "../data/products.ts";
import { AFFILIATE } from "../data/affiliate.ts";

type Answers = Record<string, string>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

const GOLD   = "#D4A15E";
const ROSE   = "#D89680";
const MUTED  = "#A07860";
const INK    = "#2A1A10";
const BG     = "#FFF8F1";
const PANEL  = "#FFF2E5";
const ACCENT = "#E8B088";

function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < full;
        const halfFill = !filled && i === full && half;
        return (
          <svg key={i} width={14} height={14} viewBox="0 0 24 24">
            <path
              d="M12 2 L15 9 L22 9.5 L17 14.5 L18.5 22 L12 18 L5.5 22 L7 14.5 L2 9.5 L9 9 Z"
              fill={filled || halfFill ? GOLD : "none"}
              stroke={GOLD}
              stroke-width="1"
            />
          </svg>
        );
      })}
    </span>
  );
}

export default function QuizIsland() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const keys = ["skin", "finish", "filters", "budget"];
  const done = step >= QUIZ_QUESTIONS.length;
  const result = done ? quizResult(answers) : null;

  function pick(value: string) {
    const next = { ...answers, [keys[step]]: value };
    setAnswers(next);
    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep >= QUIZ_QUESTIONS.length) {
      const matched = quizResult(next);
      try {
        localStorage.setItem("btsc.quiz", JSON.stringify({ answers: next, result: matched.slug }));
      } catch {}
      window.umami?.track("quiz_complete", {
        result: matched.slug,
        asin: AFFILIATE[matched.affiliateKey]?.amazon ?? "",
      });
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
  }

  const affiliateUrl = result ? (AFFILIATE[result.affiliateKey]?.amazon ?? "#") : "#";

  return (
    <div>
      {!done ? (
        <section style={{ padding: "0 0 64px" }}>
          <div style={{ maxWidth: 768, margin: "0 auto" }}>
            {/* Dot progress */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 56 }}>
              {QUIZ_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width:      i === step ? 36 : 10,
                    height:     10,
                    borderRadius: 9999,
                    background: i <= step ? GOLD : `${ACCENT}55`,
                    transition: "width 200ms, background 200ms",
                  }}
                />
              ))}
            </div>

            {/* Question */}
            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize:   "clamp(32px,4vw,48px)",
                fontWeight: 400,
                textAlign:  "center",
                marginBottom: 48,
                color: INK,
              }}
            >
              {QUIZ_QUESTIONS[step].q}
            </h2>

            {/* Options 2-col grid */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap:                 20,
              }}
            >
              {QUIZ_QUESTIONS[step].options.map((o) => (
                <button
                  key={o.value}
                  onClick={() => pick(o.value)}
                  style={{
                    padding:      32,
                    textAlign:    "left",
                    background:   PANEL,
                    borderRadius: 20,
                    border:       `1px solid ${ACCENT}44`,
                    cursor:       "pointer",
                    transition:   "transform 150ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                      style={{
                        width:        48,
                        height:       48,
                        borderRadius: "50%",
                        display:      "flex",
                        alignItems:   "center",
                        justifyContent: "center",
                        fontSize:     20,
                        background:   BG,
                        border:       `1px solid ${ACCENT}66`,
                        flexShrink:   0,
                      }}
                    >
                      {o.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: '"DM Serif Display", Georgia, serif',
                        fontSize:   24,
                        color:      INK,
                        fontWeight: 400,
                      }}
                    >
                      {o.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Previous button */}
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  display:    "block",
                  margin:     "40px auto 0",
                  background: "none",
                  border:     "none",
                  cursor:     "pointer",
                  fontSize:   "11px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  color:      MUTED,
                }}
              >
                ← Previous
              </button>
            )}
          </div>
        </section>
      ) : result ? (
        <section style={{ padding: "0 0 80px" }}>
          <div style={{ maxWidth: 896, margin: "0 auto" }}>
            {/* Result header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p
                style={{
                  fontSize:      11,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  fontWeight:    600,
                  color:         ROSE,
                  marginBottom:  12,
                }}
              >
                Your match
              </p>
              <h2
                style={{
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontSize:   "clamp(36px,5vw,60px)",
                  fontWeight: 400,
                  fontStyle:  "italic",
                  color:      INK,
                  marginBottom: 0,
                }}
              >
                {result.name}.
              </h2>
            </div>

            {/* Result card */}
            <div
              style={{
                display:      "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:          40,
                padding:      48,
                background:   PANEL,
                borderRadius: 28,
                position:     "relative",
                overflow:     "hidden",
              }}
            >
              {/* Glow orb behind product */}
              <div
                style={{
                  position:     "absolute",
                  top:          -80,
                  right:        -80,
                  width:        256,
                  height:       256,
                  borderRadius: "50%",
                  background:   `radial-gradient(circle,${result.color},transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Product image */}
              <div
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  position:       "relative",
                }}
              >
                {result.image ? (
                  <img
                    src={result.image}
                    alt={`${result.brand} ${result.name}`}
                    style={{ width: 160, height: 220, objectFit: "contain" }}
                  />
                ) : (
                  <div
                    style={{
                      width:        160,
                      height:       220,
                      borderRadius: 24,
                      background:   result.color,
                    }}
                  />
                )}
              </div>

              {/* Product info */}
              <div style={{ position: "relative" }}>
                <p
                  style={{
                    fontSize:      12,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color:         MUTED,
                    marginBottom:  4,
                  }}
                >
                  {result.brand}
                </p>
                <p
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize:   28,
                    fontWeight: 400,
                    color:      INK,
                    marginBottom: 8,
                  }}
                >
                  {result.name}
                </p>
                <div style={{ marginBottom: 8 }}>
                  <StarRow rating={result.rating} />
                </div>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                  {result.notes}
                </p>
                <p
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize:   40,
                    color:      INK,
                    marginBottom: 16,
                    fontWeight: 400,
                  }}
                >
                  {result.price}
                </p>
                <a
                  href={affiliateUrl}
                  rel="sponsored nofollow"
                  target="_blank"
                  style={{
                    display:       "block",
                    padding:       "16px 0",
                    borderRadius:  9999,
                    background:    INK,
                    color:         BG,
                    textAlign:     "center",
                    fontSize:      11,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontWeight:    500,
                    textDecoration: "none",
                  }}
                >
                  Shop This Match →
                </a>
              </div>
            </div>

            {/* Retake */}
            <button
              onClick={reset}
              style={{
                display:    "block",
                margin:     "32px auto 0",
                background: "none",
                border:     "none",
                cursor:     "pointer",
                fontSize:   "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                textDecoration: "underline",
                color:      MUTED,
              }}
            >
              Retake the quiz
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
