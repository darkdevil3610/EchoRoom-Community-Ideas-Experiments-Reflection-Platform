import { Navbar } from "./Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      <Navbar />

      {/* Content container aligned with navbar */}
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {children}
        </div>
      </main>

    </div>
  );
};
