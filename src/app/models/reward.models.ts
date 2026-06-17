export type SaleMode = 'quick' | 'member';

export type Customer = {
  id: string;
  name: string;
  phone: string;
  sticks: number;
  pendingRewards: number;
  savedRewards: number;
  totalPurchased: number;
};

export type RewardOption = {
  id: 'pork-stick' | 'water' | 'sticky-rice';
  name: string;
  shortName: string;
  icon: string;
};

export type LineMessage = {
  id: number;
  time: string;
  text: string;
};

export type CheckoutPreview = {
  earnedRewards: number;
  remainingSticks: number;
  nextTotalPurchased: number;
  nextProgressLabel: string;
  untrackedSticks: number;
};

export type LastSale =
  | {
      mode: 'quick';
      quickRewardCreditsBefore: number;
      totalQuickSticksBefore: number;
      sticksAdded: number;
      earnedRewards: number;
    }
  | {
      mode: 'member';
      customerId: string;
      customerBefore: Customer;
      sticksAdded: number;
      earnedRewards: number;
    };
