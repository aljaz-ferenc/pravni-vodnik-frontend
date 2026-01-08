import { IoDocumentOutline } from "react-icons/io5";

export default function LoadingQuery() {
  return (
    <main
      aria-live="polite"
      className="h-screen flex flex-col items-center justify-center p-6 relative"
    >
      <div className="flex flex-col items-center max-w-[480px] w-full gap-10">
        <div className="relative flex items-center justify-center size-32">
          <div className="absolute inset-0 rounded-full border-[6px] border-slate-800"></div>
          <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-primary animate-spin"></div>
          <div className="flex items-center justify-center rounded-full size-16 shadow-lg z-10">
            <IoDocumentOutline size={50} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center animate-pulse">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-text-main-dark">
            Prenašam dokument...
          </h1>
          <p className="text-base font-medium text-text-sub-dark">
            Prosimo, počakajte trenutek.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl mix-blend-screen opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl mix-blend-screen opacity-20"></div>
      </div>
    </main>
  );
}
