import { createFileRoute } from "@tanstack/react-router";
import { useCharacterData } from "../queries/useCharacterData";

export const Route = createFileRoute("/$id")({
  component: PostDetail,
});

function PostDetail() {
  const { id } = Route.useParams();

  const { data, isPending, isError } = useCharacterData(id);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading character</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <img src={data.image} alt={data?.name} />
      <h1>{data.name}</h1>
      <p>
        <span className="font-bold">Status:</span> {data.status}
      </p>
      <p>
        <span className="font-bold">Species:</span> {data.species}
      </p>
      <p>
        <span className="font-bold">Gender:</span> {data.gender}
      </p>
      <p>
        <span className="font-bold">Origin:</span> {data.origin.name}
      </p>
    </div>
  );
}
