import { calculateRewardProgress } from './reward-calculation';

describe('calculateRewardProgress', () => {
  it.each([
    { current: 0, added: 9, rewards: 0, remaining: 9 },
    { current: 0, added: 10, rewards: 1, remaining: 0 },
    { current: 0, added: 20, rewards: 2, remaining: 0 },
    { current: 7, added: 5, rewards: 1, remaining: 2 },
  ])(
    'calculates $current existing sticks plus $added new sticks',
    ({ current, added, rewards, remaining }) => {
      expect(calculateRewardProgress(current, added)).toEqual({
        earnedRewards: rewards,
        remainingSticks: remaining,
      });
    },
  );
});
