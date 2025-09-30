import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useCharactersData } from "../queries/useCharactersData";
import { CharactersList } from "./CharactersList";
import { useQueryClient } from "@tanstack/react-query";

export const Characters = () => {
  const { page, name, status } = useSearch({ from: "/" });
  const navigate = useNavigate();
  const { data, isPending, isError } = useCharactersData({
    page,
    name,
    status,
  });
  const queryClient = useQueryClient();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({ to: "/", search: { page, name, status: e.target.value } });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate({ to: "/", search: { page, name: e.target.value, status } });
  };

  const handleClearFilters = () => {
    navigate({ to: "/", search: { page: 1, name: "", status: "alive" } });
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading characters</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center justify-center">
        Status:
        <select id="status" value={status} onChange={handleStatusChange}>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Search by name"
          autoFocus
          onChange={handleNameChange}
        />
        <button onClick={handleClearFilters}>Clear filters</button>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["characters"] })
          }
        >
          Refresh
        </button>
      </div>
      {data.results.length > 0 ? (
        <CharactersList characters={data.results} />
      ) : (
        <div>No characters found</div>
      )}
      <div className="flex self-left gap-2">
        <Link to="/" search={{ page: page - 1, name, status }}>
          <button disabled={page === 1}>Previous</button>
        </Link>
        <Link to="/" search={{ page: page + 1, name, status }}>
          <button disabled={page === data.info?.pages}>Next</button>
        </Link>
      </div>
    </div>
  );
};
