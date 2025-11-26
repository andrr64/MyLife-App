import Sidebar from "@/components/Sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar kiri */}
      <Sidebar  />

      {/* Konten berubah sesuai route */}
      <main className="flex-1 p-4">
        {children}
      </main>

    </div>
  );
}
