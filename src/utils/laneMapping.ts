export interface LaneMappingInfo {
  laneNumber: number;
  laneName: string;
  startPlot: number;
  endPlot: number;
}

// Master breakdown for 15 Lanes mapping Plots 1 to 400
export const MASTER_LANE_LIST: LaneMappingInfo[] = Array.from({ length: 15 }, (_, i) => {
  const laneNumber = i + 1;
  const startPlot = i * 25 + 1;
  const endPlot = laneNumber === 15 ? 400 : (i + 1) * 25;
  return {
    laneNumber,
    laneName: `Lane ${laneNumber}`,
    startPlot,
    endPlot
  };
});

/**
 * Dynamically determines the Lane Name (e.g. "Lane 2") based on plot/villa number string.
 * Handles inputs like "42", "Plot 42", "Villa 42", "P42", "L02-P42", etc.
 */
export function getLaneForVillaNumber(flatOrVillaNumStr: string): string {
  if (!flatOrVillaNumStr) return 'Lane 1';

  // Check if string explicitly contains "Lane X" or "L0X"
  const explicitLaneMatch = flatOrVillaNumStr.match(/(?:Lane|L)\s*0*(\d{1,2})/i);
  if (explicitLaneMatch) {
    const laneNum = parseInt(explicitLaneMatch[1], 10);
    if (laneNum >= 1 && laneNum <= 15) {
      return `Lane ${laneNum}`;
    }
  }

  // Extract digits representing plot number
  const numbers = flatOrVillaNumStr.match(/\d+/g);
  if (!numbers || numbers.length === 0) return 'Lane 1';

  // Use the largest number in the input as plot number if multiple exist
  const plotNum = Math.max(...numbers.map(n => parseInt(n, 10)));

  if (plotNum <= 0) return 'Lane 1';
  if (plotNum > 400) return 'Lane 15';

  const mappedItem = MASTER_LANE_LIST.find(
    m => plotNum >= m.startPlot && plotNum <= m.endPlot
  );

  return mappedItem ? mappedItem.laneName : 'Lane 1';
}

/**
 * Calculates estimated daily water consumption for a villa based on occupants.
 * Standard IS: 135 L/day per adult, 90 L/day per child
 */
export function calculateWaterRequirement(adults: number = 2, kids: number = 0): number {
  return (adults * 135) + (kids * 90);
}

/**
 * Calculates estimated daily garbage output for a villa based on occupants.
 * Standard average: 0.4 kg/day per adult, 0.25 kg/day per child
 */
export function calculateGarbageOutput(adults: number = 2, kids: number = 0): number {
  return Number(((adults * 0.4) + (kids * 0.25)).toFixed(2));
}
