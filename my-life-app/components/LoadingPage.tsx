import React from 'react'
import { Loader2 } from "lucide-react"

function LoadingPage() {
  return (
    // Container utama: full height screen, full width, flex center
    // bg-background: KUNCI untuk support dark/light mode otomatis (variabel dari shadcn)
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-y-4">
        {/*
          Ikon Loader:
          - h-12 w-12: Ukuran agak besar
          - animate-spin: Class tailwind untuk memutar (rotate)
          - text-primary: Menggunakan warna utama tema (misal: hitam di light, putih di dark)
        */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />

        {/* Teks opsional, gunakan text-muted-foreground agar tidak terlalu mencolok */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Memuat aplikasi...
        </p>
      </div>
    </div>
  )
}

export default LoadingPage