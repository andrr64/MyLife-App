import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Sidebar di kiri */}
      <Sidebar />

      {/* Konten utama */}
      <main className="flex-1 p-10 bg-white dark:bg-zinc-950">
        <h1 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
          Dashboard
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Selamat datang di halaman dashboard!
        </p>
      </main>
    </div>
  );
}
