type Props = {
  children: React.ReactNode;
};
export interface Course {
  name: String;
  icon: String;
  units: [Types.ObjectId];
}