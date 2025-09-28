import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useCharactersData } from "../queries/useCharactersData";

export const Characters = () => {
  const search = useSearch({ from: "/" });
  //   const navigate = useNavigate();

  const { data, isPending, isError } = useCharactersData({ page: search.page });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading characters</div>;

  //   console.log(data);
  console.log(search);

  //   const handleNext = () => {
  //     navigate({
  //       search: (prev) => ({
  //         ...prev,
  //         page: 2,
  //       }),
  //     });
  //   };

  return (
    <div>
      {data?.results.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}
      <Link to="/" search={(prev) => ({ ...prev, page: prev.page - 1 })}>
        <button>Previous</button>
      </Link>{" "}
      <Link to="/" search={(prev) => ({ ...prev, page: prev.page + 1 })}>
        <button>Next</button>
      </Link>
    </div>
  );
};
