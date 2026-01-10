import { X } from "lucide-react";
import { motion } from "motion/react";
import type { Dispatch, SetStateAction } from "react";
import { BsLightbulbFill } from "react-icons/bs";

type UnrelatedAlertProps = {
  setShown: Dispatch<SetStateAction<boolean>>;
};

export default function UnrelatedAlert({ setShown }: UnrelatedAlertProps) {
  return (
    <motion.div
      className="mt-4 animate-[fadeIn_0.5s_ease-out]"
      animate={{ opacity: 1, height: "100%" }}
      initial={{ opacity: 0, height: 0 }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-dark/90 border-l-4 border-l-amber-500 border-y border-r border-white/10 shadow-lg backdrop-blur-sm">
        <BsLightbulbFill className="text-amber-500" />
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white mb-1">
            Vprašanje izven konteksta
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Pravni Vodnik je optimiziran izključno za vprašanja o slovenski
            zakonodaji in pravnih postopkih.{" "}
            <span className="text-slate-300">
              Prosimo, preoblikujte svoje vprašanje v pravni kontekst.
            </span>
          </p>
        </div>
        <button
          onClick={() => setShown(false)}
          type="button"
          className="cursor-pointer text-slate-500 h-full hover:text-white transition-colors p-1"
        >
          <X size={15} />
        </button>
      </div>
    </motion.div>
  );
}
