import { RewardCalculation } from '../models/reward.models';

export const STICKS_PER_REWARD = 10;

export function calculateRewardProgress(
  currentSticks: number,
  addedSticks: number,
): RewardCalculation {
  const totalSticks = Math.max(0, currentSticks) + Math.max(0, addedSticks);

  return {
    earnedRewards: Math.floor(totalSticks / STICKS_PER_REWARD),
    remainingSticks: totalSticks % STICKS_PER_REWARD,
  };
}
