import Image from "next/image";
import localFont from "next/font/local";
import WelcomePage from "@/pages/[locale]/acceuil";
import Layout from "./layout";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <WelcomePage />
    </div>
  );
}
