import PublicSearch from "../components/PublicSearch";
import UserSearch from "../components/UserSearch";
import { useAuth } from "../components/AuthContext";

export default function search() {
  const { isLogged } = useAuth();
  console.log(isLogged);

  return (
    <div>
      <PublicSearch />
    </div>
  );
}
