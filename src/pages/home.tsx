import { useQuery, gql } from "@apollo/client";

const GET_PROFILES = gql`
  query getProfiles {
    getProfiles {
      id
      firstName
      lastName
      location
      occupation
      gender
      birthday
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PROFILES);
  if (loading) return <p>Loading</p>;
  if (error) {
    console.log(error);
    return <p>Error:</p>;
  }
  return data.getProfiles.map((p: any) => (
    <div key={p.id}>
      {p.firstName} {p.lastName}
    </div>
  ));
}
