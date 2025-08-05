import { ResultViewer } from "./_components/result-viewer";

export default function ResultPage() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <ResultViewer />
    </main>
  );
}
