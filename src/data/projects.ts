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
  }
];
