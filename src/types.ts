export type Data = {
  couple: string;
  date: string;
  location: string;
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
