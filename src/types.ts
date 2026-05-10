export type Data = {
  couple: string;
  date: string;
  time: string;
  location: string;
  locationSubline: string;
  gretting: string;
  families: {
    left: {
      familyName: string;
      parents: string;
    };
    right: {
      familyName: string;
      parents: string;
    };
  };
};
