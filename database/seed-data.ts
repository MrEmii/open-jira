interface SeedEntry {
  description: string;
  createdAt: number;
  status: 'pending' | 'completed' | 'in-progress';
}

interface SeedData {
  entries: SeedEntry[];
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Laborum elit cupidatat pariatur pariatur laboris magna qui ea ullamco.',
      createdAt: new Date().getTime(),
      status: 'pending',
    },
    {
      description: 'Id sunt ea anim consectetur non ut Lorem quis.',
      createdAt: new Date().getTime(),
      status: 'pending',
    },
    {
      description: 'Elit eu quis ullamco ad.',
      createdAt: new Date().getTime(),
      status: 'pending',
    },

    {
      description:
        'Laborum elit cupidatat pariatur pariatur laboris magna qui ea ullamco.',
      createdAt: new Date().getTime(),
      status: 'in-progress',
    },
    {
      description: 'Id sunt ea anim consectetur non ut Lorem quis.',
      createdAt: new Date().getTime(),
      status: 'in-progress',
    },
    {
      description: 'Elit eu quis ullamco ad.',
      createdAt: new Date().getTime(),
      status: 'in-progress',
    },

    {
      description:
        'Laborum elit cupidatat pariatur pariatur laboris magna qui ea ullamco.',
      createdAt: new Date().getTime(),
      status: 'completed',
    },
    {
      description: 'Id sunt ea anim consectetur non ut Lorem quis.',
      createdAt: new Date().getTime(),
      status: 'completed',
    },
    {
      description: 'Elit eu quis ullamco ad.',
      createdAt: new Date().getTime(),
      status: 'completed',
    },
  ],
};
