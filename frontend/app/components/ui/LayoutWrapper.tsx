import React from "react";
import Header from "../Header";
import Footer from "../Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({
  children,
}: LayoutWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
