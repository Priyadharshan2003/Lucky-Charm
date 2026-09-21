export interface RitualContext {
  timesTriggered: number;
  lastTriggered: number;
}

export interface Ritual {
  id: string;
  execute: (context: RitualContext) => void;
}

export const NazarRitual: Ritual = {
  id: "nazar_pulse",
  execute: (ctx) => {
    console.log("Nazar protective pulse activated!");
    ctx.timesTriggered++;
    ctx.lastTriggered = Date.now();
  }
};
