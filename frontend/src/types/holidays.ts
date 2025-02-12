export interface Holiday {
    name: string;
    description?: string;
    date: {
      iso: string;
      datetime: {
        year: number;
        month: number;
        day: number;
      };
    };
    type: string[];
    locations: string;
    states?: string[];
  }