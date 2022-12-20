export const PERIODS = [
  {
    value: 30,
    name: 'day',
    label: 'last 30 days',
  },
  {
    value: 3,
    name: 'month',
    label: 'last 3 months',
  },
  ...[new Date().getFullYear(), 0, 0].map((_, i, arr) => ({
    value: arr[0] - i,
    name: 'year',
    label: String(arr[0] - i),
  })),
  {
    value: '',
    name: 'archive',
    label: 'Archived orders',
  },
];
