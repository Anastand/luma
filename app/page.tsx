import Image from "next/image";
import { ThemeToggleBTN } from "./components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <ThemeToggleBTN /> 
    </div>
  );
}
