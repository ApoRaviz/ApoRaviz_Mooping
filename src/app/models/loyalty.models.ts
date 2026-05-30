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
  id: 'pork-stick' | 'sticky-rice' | 'save-later';
  name: string;
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
};

export type LastSale = {
  customerId: string;
  customerBefore: Customer;
  sticksAdded: number;
};
