
import WelcomePage from "./acceuil/page";
import "../styles/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <WelcomePage />
    </div>
  );
}
