export default function FollowUp() {
  return (
    <div className="p-5">
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-border  p-1.5 shadow-sm">
        <div className="p-3">
          <label
            className="block text-base font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2.5"
            htmlFor="refine-input"
          >
            Želite dopolniti ali izboljšati odgovor?
          </label>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Vnesite dodatna vprašanja ali navodila. Sistem bo ustvaril novo
            verzijo dokumenta z upoštevanimi popravki.
          </p>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700 rounded-xl opacity-20 group-focus-within:opacity-100 transition duration-500 blur"></div>
            <div className="relative  dark:bg-slate-900 rounded-lg">
              <textarea
                className="block w-full rounded-lg border-0 bg-transparent py-4 px-4 text-slate-900 dark:text-white shadow-none ring-1 ring-inset ring-slate-200 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 resize-y min-h-[100px]"
                id="refine-input"
                placeholder="Npr.: Kakšne so takse za vpis v sodni register? Ali je potreben notar?"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
