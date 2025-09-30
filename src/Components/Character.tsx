type CharacterProps = {
  name: string;
  species: string;
};

export const Character = ({ name, species }: CharacterProps) => {
  return <div>{name}</div>;
};
