import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="without-navbar-height overflow-y-auto">{children}</div>
      <NavBar />
    </>
  );
}
