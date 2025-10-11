export type BookStatus = 'READ' | 'IN_PROGRESS' | 'TBR';

export type Book = {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  progress?: number; // 0-100 for IN_PROGRESS
  tags?: string[];
  link?: string;
  cover?: string;
};

export const BOOKS: Book[] = [
  // In Progress Books
  {
    id: 'the-4-hour-workweek',
    title: 'The 4-Hour Workweek',
    author: 'Timothy Ferriss',
    status: 'IN_PROGRESS',
    progress: 16,
    tags: ['Productivity', 'Lifestyle'],
    link: 'https://amzn.to/4aOEjeS',
    cover: 'https://m.media-amazon.com/images/I/51K8cn98S1L._SY445_SX342_.jpg'
  },
  {
    id: 'feel-good-productivity',
    title: 'Feel-Good Productivity: How to Do More of What Matters to You',
    author: 'Ali Abdaal',
    status: 'IN_PROGRESS',
    progress: 29,
    tags: ['Productivity'],
    link: 'https://amzn.to/48D3glL',
    cover: 'https://m.media-amazon.com/images/I/71VnV1r+jAL._SY466_.jpg'
  },
  {
    id: 'make-time',
    title: 'Make Time: How to Focus on What Matters Every Day',
    author: 'Jake Knapp & John Zeratsky',
    status: 'IN_PROGRESS',
    progress: 19,
    tags: ['Focus', 'Time Management'],
    link: 'https://amzn.to/48Xm9pL',
    cover: 'https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg'
  },
  {
    id: 'harry-potter-chamber-of-secrets',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    status: 'IN_PROGRESS',
    progress: 32,
    tags: ['Fiction', 'Fantasy'],
    link: 'https://a.co/d/i1N4Xie',
    cover: 'https://m.media-amazon.com/images/I/81lAPl9Jh9L._SY466_.jpg'
  },
  {
    id: 'speed-reading',
    title: 'Speed Reading: Learn to Read a 200+ Page Book in 1 Hour',
    author: 'Kam Knight',
    status: 'IN_PROGRESS',
    progress: 45,
    tags: ['Productivity', 'Learning'],
    link: 'https://a.co/d/5J1lNaJ',
    cover: 'https://m.media-amazon.com/images/I/71VEWrJ7gEL._SY466_.jpg'
  },
  
  // Read Books
  {
    id: 'harry-potter-sorcerers-stone',
    title: "Harry Potter and the Sorcerer's Stone, Book 1",
    author: 'J.K. Rowling',
    status: 'READ',
    tags: ['Fiction', 'Fantasy'],
    link: 'https://amzn.to/3TZwXiQ',
    cover: 'https://m.media-amazon.com/images/I/81lAPl9Jh9L._SY466_.jpg'
  },
  {
    id: 'millionaire-fastlane',
    title: 'The Millionaire Fastlane: Crack the Code to Wealth and Live Rich for a Lifetime',
    author: 'MJ DeMarco',
    status: 'READ',
    tags: ['Business', 'Wealth', 'Entrepreneurship'],
    link: 'https://amzn.to/48O4ccW',
    cover: 'https://m.media-amazon.com/images/I/71B7OTV7AFL._SY466_.jpg'
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    status: 'TBR',
    tags: ['Productivity', 'Self-Improvement'],
    link: 'https://amzn.to/48y4R3e',
    cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY466_.jpg'
  },
  {
    id: 'work-the-system',
    title: 'Work the System (Fourth Edition): The Simple Mechanics of Making More and Working Less',
    author: 'Sam Carpenter',
    status: 'TBR',
    tags: ['Business', 'Productivity', 'Systems'],
    link: 'https://amzn.to/422WKbJ',
    cover: 'https://m.media-amazon.com/images/I/71VxA6xsL+L._SY466_.jpg'
  },
  {
    id: 'building-second-brain',
    title: 'Building a Second Brain: A Proven Method to Organize Your Digital Life and Unlock Your Creative Potential',
    author: 'Tiago Forte',
    status: 'TBR',
    tags: ['Productivity', 'Knowledge Management'],
    link: 'https://amzn.to/3S1g2to',
    cover: 'https://m.media-amazon.com/images/I/71xMhJ5v0xL._SY466_.jpg'
  },
  {
    id: 'deep-work',
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    status: 'TBR',
    tags: ['Focus', 'Productivity'],
    link: 'https://amzn.to/3NY817h',
    cover: 'https://m.media-amazon.com/images/I/71dFakhL67L._SY466_.jpg'
  },
  {
    id: '7-habits',
    title: 'The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change',
    author: 'Stephen R. Covey',
    status: 'TBR',
    tags: ['Self-Improvement', 'Leadership'],
    link: 'https://amzn.to/3tS9d5p',
    cover: 'https://m.media-amazon.com/images/I/71U7Lf0TWSL._SY466_.jpg'
  }
];
