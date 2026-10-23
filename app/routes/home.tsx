import type { Route } from "./+types/home";
import { Utilisateurs } from "../utilisateurs/utilisateurs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gestion GoRest - useEffect" },
    { name: "description", content: "Intégration d'API avec useEffect" },
  ];
}

// On retourne simplement le composant enfant qui gère tout son cycle de vie seul
export default function Home() {
  return <Utilisateurs />;
}