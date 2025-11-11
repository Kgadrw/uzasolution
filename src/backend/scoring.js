"use server";

export function computeTopupScore({ margin, anomalies, consistency, runRate }) {
  const marginScore = Math.min(40, Math.max(0, margin * 0.4));
  const anomalyPenalty = Math.min(20, anomalies * 5);
  const consistencyScore = Math.min(20, consistency * 4);
  const runRateScore = Math.min(20, runRate * 4);

  return Math.round(
    marginScore + consistencyScore + runRateScore - anomalyPenalty
  );
}

