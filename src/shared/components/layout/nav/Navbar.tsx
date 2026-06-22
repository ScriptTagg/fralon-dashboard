import NavLink from "./components/NavLink";
import { navLinks } from "./content/navLinks";

export default function Navbar() {
  return (
    <nav className="">
      <ul className="flex flex-wrap justify-center items-center divide-x divide-slate-200 gap-2 w-fit">
        {navLinks.map((link) => (
          <li key={link.label} className="">
            <NavLink href={link.to} label={link.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
