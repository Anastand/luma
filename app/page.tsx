import Image from "next/image";
import { ThemeToggle } from "./components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
        <ThemeToggle />
      <main>
        <h1 className="text-8xl font-bold text-pink-900">hello world</h1>
      </main>
    </div>
  );
}
