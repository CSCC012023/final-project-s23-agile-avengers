export type CourseWithUnits = {
  name: string;
  units: [Unit];
};
export type Unit = {
  name: string;
  slug: string;
  contents: [
    {
      name: string;
      slug: string;
      contentType: 'video' | 'article';
    },
  ];
};
export type ProgressData = {
  unitID: Unit;
  progress: number;
  _id: string;
};