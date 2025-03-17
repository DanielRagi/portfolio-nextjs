import Link from "next/link";

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center relative">
      <Link
        href="/"
        className="text-xl font-medium bg-clip-text text-transparent inline-block"
        style={{
          backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
        }}
      >
        Daniel Ramírez
      </Link>
      <nav className="space-x-6">
        <Link href="/" className="hover:text-[#ffda44] transition-colors">
          Inicio
        </Link>
        <Link href="#proyectos" className="hover:text-[#ffda44] transition-colors">
          Proyectos
        </Link>
      </nav>
    </header>
  );
}