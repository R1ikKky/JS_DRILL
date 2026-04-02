const XP_TABLE: Record<string, { correct: number; partial: number }> = {
  easy:   { correct: 5,  partial: 2  },
  medium: { correct: 15, partial: 7  },
  hard:   { correct: 30, partial: 15 },
  mixed:  { correct: 15, partial: 7  },
};

export function computeXp(difficulty: string, verdict: string): number {
  const row = XP_TABLE[difficulty] ?? XP_TABLE['medium'];
  if (verdict === 'ВЕРНО')    return row.correct;
  if (verdict === 'ЧАСТИЧНО') return row.partial;
  return 0;
}

// Level n starts at n*(n-1)/2 * 100 XP
// lv1=0, lv2=100, lv3=300, lv4=600, lv5=1000 ...
export function computeLevel(totalXp: number): number {
  let level = 1;
  while ((level * (level + 1)) / 2 * 100 <= totalXp) {
    level++;
  }
  return level;
}

export function xpForNextLevel(currentLevel: number): number {
  return (currentLevel * (currentLevel + 1)) / 2 * 100;
}
