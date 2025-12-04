export interface Subscription {
  id: string;
  name: string;
  amount: string;
  method: string;
  cadence: 'Monthly' | 'Yearly' | 'Unknown';
  category: 'Work' | 'Personal' | 'Utilities' | 'Fitness';
  nextBillDate?: string;
  paused?: boolean;
}

export const SEED_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Spotify Duo',
    amount: '$18.39 / month',
    method: 'AMEX ••31034',
    cadence: 'Monthly',
    category: 'Personal',
  },
  {
    id: '2',
    name: 'Bookmory',
    amount: '$31 / year',
    method: 'Apple CC ••2708',
    cadence: 'Yearly',
    category: 'Work',
  },
  {
    id: '3',
    name: 'Goodnotes',
    amount: '$12 / year',
    method: 'Apple CC ••2708',
    cadence: 'Yearly',
    category: 'Work',
  },
  {
    id: '4',
    name: 'iCloud+',
    amount: '$3 / month',
    method: 'Apple CC ••2708',
    cadence: 'Monthly',
    category: 'Work',
  },
  {
    id: '5',
    name: 'Gym (EFLC)',
    amount: '$__/ month',
    method: 'AMEX ••31034',
    cadence: 'Monthly',
    category: 'Fitness',
  },
  {
    id: '6',
    name: 'Mahek Pilates',
    amount: '$199 / month (2 classes/wk • 3 months)',
    method: '',
    cadence: 'Monthly',
    category: 'Fitness',
  },
  {
    id: '7',
    name: 'ChatGPT',
    amount: '$20 / month',
    method: '',
    cadence: 'Monthly',
    category: 'Work',
  },
  {
    id: '8',
    name: 'Gamma AI',
    amount: '—',
    method: '',
    cadence: 'Unknown',
    category: 'Work',
  },
  {
    id: '9',
    name: 'City of Euless Water/Trash',
    amount: '$100–110 / month (avg.)',
    method: '',
    cadence: 'Monthly',
    category: 'Utilities',
  },
  {
    id: '10',
    name: 'Atmos Energy (Gas)',
    amount: '$60–70 / month (avg.)',
    method: '',
    cadence: 'Monthly',
    category: 'Utilities',
  },
  {
    id: '11',
    name: 'NordVPN',
    amount: '$149.88 / year',
    method: 'Mastercard ••0632 Exp 12/28',
    cadence: 'Yearly',
    category: 'Work',
    nextBillDate: '2028-01-16',
  },
  {
    id: '12',
    name: 'NordPass Premium',
    amount: '$35.88 / year',
    method: 'PayPal',
    cadence: 'Yearly',
    category: 'Work',
    nextBillDate: '2026-03-01',
  },
];
