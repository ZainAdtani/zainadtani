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
  isbn?: string;
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
  },
  {
    id: 'brief-illustrated-guide-islam',
    title: 'A Brief Illustrated Guide to Understanding Islam',
    author: 'I.A. Ibrahim',
    status: 'READ',
    tags: ['Islam', 'Religion', 'Nonfiction', 'Reference', 'Spirituality'],
    cover: 'https://m.media-amazon.com/images/I/51qZq7Z3bpL._SY466_.jpg',
    rating: 5,
    notes: 'Very nice short info on Islam - great re-read during Ramadan'
  },
  {
    id: 'danger-zone',
    title: 'Danger Zone',
    author: 'David Klass',
    status: 'READ',
    tags: ['Sports', 'Fiction', 'Young Adult'],
    link: 'https://a.co/d/0vFw3Qz',
    cover: 'https://m.media-amazon.com/images/I/51X7ZQXQWZL._SY466_.jpg'
  },
  {
    id: 'enrolled-agent-study-guide',
    title: 'Enrolled Agent Study Guide 2025-2026: All in One EA Exam Prep',
    author: 'Markie Tinan',
    status: 'IN_PROGRESS',
    progress: 4,
    tags: ['Tax', 'Study Guide', 'Professional Development'],
    cover: 'https://m.media-amazon.com/images/I/71xGKqN5QpL._SY466_.jpg'
  },
  {
    id: 'ethical-living-stories',
    title: 'Ethical Living through Stories: Encounters with Adab',
    author: 'Wen-chin Ouyang',
    status: 'TBR',
    tags: ['Ethics', 'Philosophy', 'Islam'],
    link: 'https://a.co/d/2Mz8Kpw',
    cover: 'https://m.media-amazon.com/images/I/41rH6Z7ZXKL._SY466_.jpg'
  },
  {
    id: 'free-to-focus',
    title: 'Free to Focus: A Total Productivity System to Achieve More',
    author: 'Michael Hyatt',
    status: 'READ',
    tags: ['Productivity', 'Business', 'Self-Improvement'],
    link: 'https://a.co/d/1Hz9Kpw',
    cover: 'https://m.media-amazon.com/images/I/71vZ8Z9ZXKL._SY466_.jpg',
    rating: 3.5,
    notes: 'Focus on 3 main tasks per day using 80/20 rule'
  },
  {
    id: 'influence-psychology-persuasion',
    title: 'Influence: The Psychology of Persuasion',
    author: 'Robert B. Cialdini',
    status: 'TBR',
    tags: ['Psychology', 'Business', 'Nonfiction', 'SelfHelp', 'Leadership', 'PersonalDevelopment', 'Communication'],
    isbn: '9780061241895'
  },
  {
    id: 'learning-how-to-learn',
    title: 'Learning How to Learn: How to Succeed in School Without Spend...',
    author: 'Barbara Oakley',
    status: 'TBR',
    tags: ['Nonfiction', 'Education', 'SelfHelp', 'Psychology', 'Parenting', 'PersonalDevelopment', 'Productivity'],
    isbn: '9780525504467'
  },
  {
    id: 'mans-search-for-meaning',
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    status: 'READ',
    tags: ['Nonfiction', 'Psychology', 'Philosophy', 'History', 'SelfHelp', 'Memoir', 'Biography'],
    isbn: '9780807014271',
    rating: 5,
    notes: 'Very good book must read every one to two years'
  },
  {
    id: 'master-your-emotions',
    title: 'Master Your Emotions: A Practical Guide to Overcome Negativity and Better Manage Your Feelings',
    author: 'Thibaut Meurisse',
    status: 'TBR',
    tags: ['SelfHelp', 'Nonfiction', 'Psychology', 'PersonalDevelopment', 'MentalHealth', 'Emotion', 'Business'],
    isbn: '9781981089154'
  },
  {
    id: 'million-dollar-weekend',
    title: 'Million Dollar Weekend: The Surprisingly Simple Way to Launch...',
    author: 'Noah Kagan',
    status: 'IN_PROGRESS',
    tags: ['Business', 'Entrepreneurship', 'Nonfiction', 'Finance', 'SelfHelp', 'Money', 'Audiobook'],
    isbn: '9780593539774',
    progress: 8
  },
  {
    id: 'mindset-psychology-success',
    title: 'Mindset: The New Psychology of Success',
    author: 'Carol S. Dweck',
    status: 'TBR',
    tags: ['Psychology', 'Nonfiction', 'SelfHelp', 'Business', 'PersonalDevelopment', 'Education', 'Leadership']
  },
  {
    id: 'mistborn-final-empire',
    title: 'Mistborn: The Final Empire',
    author: 'Brandon Sanderson',
    status: 'TBR',
    tags: ['Fantasy', 'Fiction', 'HighFantasy', 'Audiobook', 'EpicFantasy', 'Magic', 'Adult'],
    isbn: '9781250868282'
  },
  {
    id: 'sherlock-holmes-collection',
    title: 'Sherlock Holmes Collection anthology of classic tales',
    author: 'Jon Lellenberg',
    status: 'TBR',
    isbn: '9781786645449'
  },
  {
    id: 'shoe-dog',
    title: 'Shoe Dog: A Memoir by the Creator of Nike',
    author: 'Phil Knight',
    status: 'TBR',
    tags: ['Business', 'Biography', 'Nonfiction', 'Memoir', 'Audiobook', 'Sports', 'Autobiography'],
    isbn: '9781501135910'
  },
  {
    id: 'the-secret',
    title: 'The Secret',
    author: 'Rhonda Byrne',
    status: 'READ',
    tags: ['SelfHelp', 'Nonfiction', 'Spirituality', 'Psychology', 'PersonalDevelopment', 'Philosophy', 'Inspirational'],
    isbn: '9781582701707',
    rating: 5,
    notes: 'Probably need to reread once a month and watch the movie once a month'
  },
  {
    id: 'the-sht-they-never-taught-you',
    title: 'The Sh*t They Never Taught You: What You Can Learn From Books',
    author: 'Adam Ashton',
    status: 'TBR',
    tags: ['Nonfiction', 'SelfHelp', 'PersonalDevelopment', 'Business', 'Education', 'Psychology', 'Philosophy'],
    isbn: '9780645133806'
  },
  {
    id: 'subtle-art-not-giving-fck',
    title: 'The Subtle Art of Not Giving a F*ck: A Counterintuitive Appro...',
    author: 'Mark Manson',
    status: 'TBR',
    tags: ['Nonfiction', 'SelfHelp', 'Psychology', 'Audiobook', 'PersonalDevelopment', 'Philosophy', 'Business'],
    isbn: '9798804636129'
  },
  {
    id: 'surrender-experiment',
    title: "The Surrender Experiment: My Journey into Life's Perfection",
    author: 'Michael A. Singer',
    status: 'TBR',
    tags: ['Spirituality', 'Nonfiction', 'SelfHelp', 'Philosophy', 'PersonalDevelopment', 'Memoir', 'Psychology'],
    isbn: '9780804141109'
  },
  {
    id: 'the-third-door',
    title: "The Third Door: The Wild Quest to Uncover How the World's Mos...",
    author: 'Alex Banayan',
    status: 'TBR',
    tags: ['Business', 'Nonfiction', 'SelfHelp', 'PersonalDevelopment', 'Entrepreneurship', 'Biography', 'Productivity']
  },
  {
    id: 'wonder-boy-luka-doncic',
    title: 'The Wonder Boy: Luka Doncic and the Curse of Greatness',
    author: 'Tim MacMahon',
    status: 'TBR',
    tags: ['Sports', 'Basketball', 'Nonfiction', 'Biography'],
    isbn: '9781538740712'
  },
  {
    id: 'think-grow-rich',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    status: 'TBR',
    tags: ['SelfHelp', 'Business', 'Nonfiction', 'Finance', 'PersonalDevelopment', 'Money', 'Psychology']
  },
  {
    id: 'where-hope-takes-root',
    title: 'Where Hope Takes Root: Democracy and Pluralism in an Interdependent World',
    author: 'Aga Khan IV',
    status: 'READ',
    tags: ['Nonfiction'],
    isbn: '9781553653660',
    rating: 3.5,
    notes: 'Last few chapters are better'
  },
  {
    id: 'why-has-nobody-told-me',
    title: 'Why Has Nobody Told Me This Before?: Expert Advice for Naviga...',
    author: 'Julie Smith',
    status: 'TBR',
    tags: ['Nonfiction', 'SelfHelp', 'Psychology', 'MentalHealth', 'Audiobook', 'PersonalDevelopment', 'Health'],
    isbn: '9780063227934'
  }
];
