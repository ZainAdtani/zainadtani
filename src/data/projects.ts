export type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  route: string;
  notionUrl?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    id: 'pokedex',
    title: 'My Pokémon Pokédex',
    description: 'A Notion-powered Pokédex with sprites, stats, and filters.',
    thumbnail: '/pokedex-cover.jpg',
    route: '/projects/pokedex',
    tags: ['notion', 'pokemon', 'database']
  },
  {
    id: 'harry-potter-world',
    title: 'Harry Potter World',
    description: 'A Hogwarts themed hub for books, audiobooks, and key story moments.',
    thumbnail: '/images/projects/harry-potter-world-cover.png',
    route: '/projects/harry-potter-world',
    tags: ['books', 'timeline', 'hogwarts']
  },
  {
    id: 'ai-songs',
    title: 'AI Songs',
    description: 'Songs I create for learning — real concepts turned into catchy tracks to help others learn through music.',
    thumbnail: '/images/projects/ai-songs-cover.png',
    route: '/projects/ai-songs',
    tags: ['ai', 'music', 'education', 'study']
  },
];
