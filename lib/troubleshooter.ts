// Symptom -> diagnostic recommendation data for the web sandbox.
// Mirrors the app's probabilistic chassis engine (subset shown in-browser).

export interface Symptom {
  id: string;
  label: string;
  phase: "braking" | "turn-in" | "mid-corner" | "acceleration";
  fix: string;
}

export const SYMPTOMS: Symptom[] = [
  {
    id: "runs-wide-exit",
    label: "Runs wide on corner exit",
    phase: "acceleration",
    fix: "Increase rear shock preload (raise rear ride height), raise front forks in triple clamps by 2mm, or increase rear low-speed compression.",
  },
  {
    id: "fork-bottoms",
    label: "Front fork bottoms out under heavy braking",
    phase: "braking",
    fix: "Increase fork preload, add front fork fluid capacity to decrease air gap volume, or increase high-speed compression damping.",
  },
  {
    id: "rear-chatter",
    label: "Rear end chatter under acceleration",
    phase: "acceleration",
    fix: "Soften rear rebound damping to allow the tire to track the track profile, or reduce rear compression.",
  },
  {
    id: "cold-tear",
    label: "Cold tear tire wear pattern on tread",
    phase: "mid-corner",
    fix: "Tire carcass is cold. Reduce tire pressure by 1-2 PSI to increase carcass flex and tire temperature, or soften rebound damping.",
  },
  {
    id: "hot-tear",
    label: "Hot tear tire wear pattern on tread",
    phase: "mid-corner",
    fix: "Tire carcass is overheating. Increase tire pressure by 1-2 PSI to reduce carcass deflection, or soften compression damping.",
  },
];
