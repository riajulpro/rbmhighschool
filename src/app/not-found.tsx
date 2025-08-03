// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        {`Sorry, the page you are looking for doesn't exist.`}
      </p>
      <Link href="/" className="text-blue-500 underline">
        Go back home
      </Link>
    </div>
  );
}
