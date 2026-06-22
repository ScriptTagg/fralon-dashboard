import Copyright from "../typography/Copyright";

export default function Footer() {
  return (
    <footer className="p-2 flex items-center justify-between">
      <Copyright />
      <small className="text-slate-500">Privacy. Contact us</small>
    </footer>
  );
}
