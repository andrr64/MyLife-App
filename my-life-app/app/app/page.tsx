// Tidak perlu import Sidebar lagi di sini
// Tidak perlu div wrapper flex lagi di sini

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
        Dashboard
      </h1>
      <p className="text-zinc-600 dark:text-zinc-300">
        Selamat datang di halaman dashboard!
      </p>

      {/* Konten dashboard lainnya... */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border rounded-lg shadow-sm bg-card">
           <h3 className="font-medium">Total Balance</h3>
           <p className="text-2xl font-bold mt-2">$12,450</p>
        </div>
        {/* dst... */}
      </div>
    </>
  );
}