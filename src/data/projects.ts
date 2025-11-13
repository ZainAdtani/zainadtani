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
    id: 'ai-avatars',
    title: 'My AI Avatars',
    description: 'AI avatar video project powered by HeyGen.',
    route: '/projects/ai-avatars',
    tags: ['ai', 'video', 'heygen']
  },
  {
    id: 'talk-to-ai',
    title: 'Talk to AI',
    description: 'Get personalized guidance with voice or text AI.',
    route: '/projects/ai',
    tags: ['ai', 'assistant', 'chat', 'voice']
  },
  {
    id: 'harry-potter-world',
    title: 'Harry Potter World',
    description: 'A Hogwarts themed hub for books, audiobooks, and key story moments.',
    route: '/projects/harry-potter-world',
    tags: ['books', 'timeline', 'hogwarts']
  }
];
