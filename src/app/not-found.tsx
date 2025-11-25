"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">
        Lihat lainnya{" "}
        <Link href="https://afif.dev" className="text-blue-500 underline">
          di sini
        </Link>
        .
      </p>
    </div>
  );
}
