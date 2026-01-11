import { X } from "lucide-react";
import { motion } from "motion/react";
import { BsLightbulbFill } from "react-icons/bs";
import type {
  AlertReason,
  AlertShownState,
  SetAlertShownAction,
} from "@/lib/types";

type AlertProps = {
  setAlertShown: SetAlertShownAction;
  alertShown: AlertShownState;
};

const alertText = {
  unrelated_query: {
    title: "Vprašanje izven konteksta",
    issue:
      "Pravni Vodnik je optimiziran izključno za vprašanja o slovenski zakonodaji in pravnih postopkih.",
    suggestion: "Prosimo, preoblikujte svoje vprašanje v pravni kontekst.",
  },
  low_confidence: {
    title: "Omejitve razpoložljivih virov",
    issue:
      "Na podlagi trenutno podprtih zakonov ni bilo mogoče z zadostno gotovostjo oblikovati zanesljivega odgovora na zastavljeno vprašanje.",
    suggestion:
      "Poskusite vprašanje preoblikovati, dodati več konteksta ali preveriti, ali se nanaša na zakonodajo, ki je podprta v aplikaciji.",
  },
} satisfies Record<
  Exclude<AlertReason, null>,
  { title: string; issue: string; suggestion: string }
>;

export default function UnrelatedAlert({
  setAlertShown,
  alertShown,
}: AlertProps) {
  if (!alertShown.reason) return null;

  return (
    <motion.div
      className="mt-4 animate-[fadeIn_0.5s_ease-out]"
      animate={{ opacity: 1, height: "100%" }}
      initial={{ opacity: 0, height: 0 }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-dark/90 border-l-4 border-l-amber-500 border-y border-r border-white/10 shadow-lg backdrop-blur-sm">
        <BsLightbulbFill className="text-amber-500" />
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-bold text-white">
            {alertText[alertShown.reason].title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {alertText[alertShown.reason].issue}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            {alertText[alertShown.reason].suggestion}
          </p>
        </div>
        <button
          onClick={() => setAlertShown({ shown: false, reason: null })}
          type="button"
          className="cursor-pointer text-slate-500 h-full hover:text-white transition-colors p-1"
        >
          <X size={15} />
        </button>
      </div>
    </motion.div>
  );
}
