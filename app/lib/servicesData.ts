export interface Service {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  contactEmail: string;
  published?: boolean;
  order?: number;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string;
      list?: string[];
    }[];
    whatSetsUsApart?: {
      title: string;
      points: string[];
    };
  };
}
