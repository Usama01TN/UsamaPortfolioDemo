import { useEffect, useState } from "react";
import styles from "./RoutingDiagram.module.css";

const DUR = "8s";
const BEGIN = "1.1s";
const LINE = "#b7c2d0";
const HAR = "#c93c20";
const DOOR = "#1b54b5";
const JAS = "#f0b429";

// Engine rows: top = 10 + i * 72, height 44, centre = top + 22.
const engines = [0, 1, 2, 3, 4].map((i) => ({ y: 10 + i * 72, c: 32 + i * 72 }));

const PATH_A = "M100 176 L190 176";
const PATH_B = "M290 176 C 360 176, 360 104, 420 104";
const PATH_C = "M290 176 C 360 176, 360 248, 420 248";
const PATH_D = "M530 248 L 574 248";

const timing = { dur: DUR, begin: BEGIN, repeatCount: "indefinite" };

function Packet({ path, from, to, color = JAS }) {
  // The packet only exists between `from` and `to` (fractions of the loop).
  const e = 0.006;
  return (
    <circle r="7" fill={color} opacity="0">
      <animateMotion
        {...timing}
        path={path}
        calcMode="linear"
        keyPoints="0;0;1;1"
        keyTimes={`0;${from};${to};1`}
      />
      <animate
        {...timing}
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes={`0;${from};${from + e};${to - e};${to};1`}
      />
    </circle>
  );
}

function Flash({ attr, rest, on, from, to }) {
  return (
    <animate
      {...timing}
      attributeName={attr}
      calcMode="discrete"
      values={`${rest};${rest};${on};${on};${rest};${rest}`}
      keyTimes={`0;${from};${from + 0.005};${to};${to + 0.005};1`}
    />
  );
}

export default function RoutingDiagram() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(q.matches);
    const on = (e) => setStill(e.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);

  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 640 360" role="img" aria-labelledby="route-title route-desc" className={styles.svg}>
        <title id="route-title">How OcrRoute handles a failing engine</title>
        <desc id="route-desc">
          A request enters the router. The first engine it tries times out, so the router retries
          with a second engine, which returns the text.
        </desc>

        {/* faint routes to every engine */}
        {engines.map((e) => (
          <path key={e.y} d={`M290 176 C 360 176, 360 ${e.c}, 420 ${e.c}`} fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="6 8" />
        ))}
        <path d={PATH_A} fill="none" stroke={LINE} strokeWidth="2" />

        {/* request */}
        <rect x="10" y="136" width="90" height="80" rx="12" fill="#fff" stroke="#d5dce4" strokeWidth="2" />
        <rect x="26" y="156" width="58" height="8" rx="4" fill="#d5dce4" />
        <rect x="26" y="172" width="42" height="8" rx="4" fill="#d5dce4" />
        <rect x="26" y="188" width="50" height="8" rx="4" fill="#d5dce4" />
        <text x="55" y="238" textAnchor="middle" className={styles.label}>image</text>

        {/* router */}
        <rect x="190" y="141" width="100" height="70" rx="16" fill={DOOR} />
        <text x="240" y="182" textAnchor="middle" className={styles.router}>router</text>

        {/* engines */}
        {engines.map((e, i) => {
          const failing = i === 1;
          const winning = i === 3;
          const rest = "#d5dce4";
          return (
            <g key={e.y}>
              <rect x="420" y={e.y} width="110" height="44" rx="10" fill="#fff" stroke={still && winning ? DOOR : rest} strokeWidth={still && winning ? 3 : 2}>
                {!still && failing && <Flash attr="stroke" rest={rest} on={HAR} from={0.29} to={0.46} />}
                {!still && winning && <Flash attr="stroke" rest={rest} on={DOOR} from={0.56} to={0.93} />}
                {!still && (failing || winning) && (
                  <Flash attr="stroke-width" rest="2" on="3" from={failing ? 0.29 : 0.56} to={failing ? 0.46 : 0.93} />
                )}
              </rect>
              <rect x="436" y={e.c - 4} width={52 + (i % 3) * 14} height="8" rx="4" fill="#d5dce4" />
            </g>
          );
        })}

        {/* result */}
        <rect x="574" y="226" width="62" height="44" rx="10" fill={still ? JAS : "#f3f5f6"} stroke="#d5dce4" strokeWidth="2">
          {!still && <Flash attr="fill" rest="#f3f5f6" on={JAS} from={0.66} to={0.93} />}
        </rect>
        <text x="605" y="254" textAnchor="middle" className={styles.result}>text</text>

        {/* timeout label */}
        {!still && (
          <text x="475" y="86" textAnchor="middle" className={styles.fail} opacity="0">
            timeout
            <animate {...timing} attributeName="opacity" calcMode="discrete" values="0;0;1;1;0;0" keyTimes="0;0.29;0.295;0.46;0.465;1" />
          </text>
        )}

        {/* packets */}
        {!still && (
          <>
            <Packet path={PATH_A} from={0.02} to={0.14} />
            <Packet path={PATH_B} from={0.16} to={0.29} />
            <Packet path={PATH_C} from={0.44} to={0.56} />
            <Packet path={PATH_D} from={0.58} to={0.66} />
          </>
        )}
      </svg>
      <figcaption className={styles.caption}>
        OcrRoute: one engine times out, the router falls back to another.
      </figcaption>
    </figure>
  );
}
