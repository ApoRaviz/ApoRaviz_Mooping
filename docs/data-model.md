# Data Model

## Customer

```ts
type Customer = {
  id: string;
  name: string;
  phone: string;
  sticks: number;
  pendingRewards: number;
  totalPurchased: number;
};
```

## Reward Option

```ts
type RewardOption = {
  id: string;
  name: string;
  icon: string;
};
```

## Line Message

```ts
type LineMessage = {
  id: number;
  time: string;
  text: string;
};
```

## Future Models

- Purchase history
- Reward claim history
- Staff activity log
- LINE user profile
