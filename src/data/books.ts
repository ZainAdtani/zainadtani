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
  rating?: number; // 1-5
  notes?: string;
};

export const BOOKS: Book[] = [
  // Read Books
  {
    id: 'atomic-habits',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    status: 'READ',
    tags: ['Productivity', 'Self-Improvement'],
    link: 'https://amzn.to/48y4R3e',
    cover: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._SY466_.jpg',
    rating: 5,
    notes: 'Tiny changes compound'
  },
  {
    id: 'feel-good-productivity',
    title: 'Feel-Good Productivity: How to Do More of What Matters to You',
    author: 'Ali Abdaal',
    status: 'READ',
    tags: ['Productivity'],
    link: 'https://amzn.to/48D3glL',
    cover: '/book-covers/feel-good-productivity.jpg',
    rating: 4,
    notes: 'Energy beats force'
  },
  {
    id: 'harry-potter-sorcerers-stone',
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    status: 'READ',
    tags: ['Fiction', 'Fantasy'],
    link: 'https://amzn.to/3TZwXiQ',
    cover: '/book-covers/hp-sorcerers-stone.png',
    rating: 5
  },
  {
    id: 'millionaire-fastlane',
    title: 'The Millionaire Fastlane: Crack the Code to Wealth and Live Rich for a Lifetime',
    author: 'MJ DeMarco',
    status: 'READ',
    tags: ['Business', 'Wealth', 'Entrepreneurship'],
    link: 'https://amzn.to/48O4ccW',
    cover: '/book-covers/millionaire-fastlane.jpg',
    rating: 5
  },
  
  // In Progress Books
  {
    id: 'make-time',
    title: 'Make Time: How to Focus on What Matters Every Day',
    author: 'Jake Knapp & John Zeratsky',
    status: 'IN_PROGRESS',
    progress: 19,
    tags: ['Focus', 'Time Management'],
    link: 'https://amzn.to/48Xm9pL',
    cover: '/book-covers/make-time.jpg'
  },
  {
    id: 'harry-potter-chamber-of-secrets',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    status: 'READ',
    tags: ['Fiction', 'Fantasy'],
    link: 'https://a.co/d/i1N4Xie',
    cover: '/book-covers/hp-chamber-secrets.png',
    rating: 5
  },
  {
    id: 'speed-reading',
    title: 'Speed Reading: Learn to Read a 200+ Page Book in 1 Hour',
    author: 'Kam Knight',
    status: 'IN_PROGRESS',
    progress: 45,
    tags: ['Productivity', 'Learning'],
    link: 'https://a.co/d/5J1lNaJ',
    cover: '/book-covers/speed-reading.png'
  },
  
  // To Be Read
  {
    id: 'the-4-hour-workweek',
    title: 'The 4-Hour Workweek',
    author: 'Timothy Ferriss',
    status: 'TBR',
    tags: ['Productivity', 'Lifestyle'],
    link: 'https://amzn.to/4aOEjeS',
    cover: '/book-covers/4hr.jpeg'
  },
  {
    id: 'work-the-system',
    title: 'Work the System (Fourth Edition): The Simple Mechanics of Making More and Working Less',
    author: 'Sam Carpenter',
    status: 'TBR',
    tags: ['Business', 'Productivity', 'Systems'],
    link: 'https://amzn.to/422WKbJ',
    cover: '/book-covers/work-the-system.jpg'
  },
  {
    id: 'building-second-brain',
    title: 'Building a Second Brain: A Proven Method to Organize Your Digital Life and Unlock Your Creative Potential',
    author: 'Tiago Forte',
    status: 'TBR',
    tags: ['Productivity', 'Knowledge Management'],
    link: 'https://amzn.to/3S1g2to',
    cover: '/book-covers/building-second-brain.jpg'
  },
  {
    id: 'deep-work',
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    status: 'TBR',
    tags: ['Focus', 'Productivity'],
    link: 'https://amzn.to/3NY817h',
    cover: '/book-covers/deep-work.jpg'
  },
  {
    id: '7-habits',
    title: 'The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change',
    author: 'Stephen R. Covey',
    status: 'TBR',
    tags: ['Self-Improvement', 'Leadership'],
    link: 'https://amzn.to/3tS9d5p',
    cover: '/book-covers/7-habits.jpg'
  },
  {
    id: 'harry-potter-prisoner-azkaban',
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling',
    status: 'READ',
    tags: ['Fiction', 'Fantasy'],
    link: 'https://a.co/d/2Xj8KpN',
    cover: '/book-covers/hp-prisoner-azkaban.png',
    rating: 5
  },
  {
    id: 'harry-potter-goblet-fire',
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    status: 'READ',
    tags: ['Fiction', 'Fantasy'],
    link: 'https://a.co/d/8vQ3Yzj',
    cover: '/book-covers/hp-goblet-fire.png',
    rating: 5
  },
  {
    id: 'harry-potter-order-phoenix',
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K. Rowling',
    status: 'READ',
    tags: ['Fiction', 'Fantasy'],
    link: 'https://a.co/d/5jtQc9H',
    cover: '/book-covers/hp-order-phoenix.png',
    rating: 5
  },
  {
    id: 'harry-potter-half-blood-prince',
    title: 'Harry Potter and the Half-Blood Prince',
    author: 'J.K. Rowling',
    status: 'READ',
    tags: ['Fiction', 'Fantasy'],
    link: 'https://a.co/d/7Yt9Qmn',
    cover: '/book-covers/hp-half-blood-prince.png',
    rating: 5
  },
  {
    id: 'harry-potter-deathly-hallows',
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J.K. Rowling',
    status: 'READ',
    tags: ['Fiction', 'Fantasy'],
    link: 'https://a.co/d/9Kz3Fqw',
    cover: '/book-covers/hp-deathly-hallows.png',
    rating: 5
  },
  {
    id: 'tuesdays-with-morrie',
    title: 'Tuesdays with Morrie',
    author: 'Mitch Albom',
    status: 'TBR',
    tags: ['Memoir', 'Philosophy'],
    link: 'https://a.co/d/3Bz9Kpw',
    cover: '/book-covers/tuesdays-with-morrie.png'
  },
  {
    id: 'how-to-win-friends',
    title: 'How to Win Friends & Influence People',
    author: 'Dale Carnegie',
    status: 'TBR',
    tags: ['Self-Improvement', 'Communication'],
    link: 'https://a.co/d/4Qz8Lpw',
    cover: '/book-covers/how-to-win-friends.jpg'
  },
  {
    id: 'awaken-giant-within',
    title: 'Awaken the Giant Within: How to Take Immediate Control of Your Mental, Emotional, Physical and Financial Destiny!',
    author: 'Tony Robbins',
    status: 'TBR',
    tags: ['Self-Improvement', 'Personal Development'],
    link: 'https://amzn.to/3TonyRobbins',
    cover: '/book-covers/awaken-the-giant-within.jpg'
  },
  {
    id: '100m-offers',
    title: '$100M Offers: How to Make Offers So Good People Feel Stupid Saying No',
    author: 'Alex Hormozi',
    status: 'TBR',
    tags: ['Business', 'Sales', 'Entrepreneurship'],
    link: 'https://amzn.to/3AlexHormozi',
    cover: '/book-covers/alex-hormozi-offers.jpg'
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    status: 'TBR',
    tags: ['Fiction', 'Philosophy'],
    link: 'https://a.co/d/8Hz7Npq',
    cover: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._SY466_.jpg'
  }
];
