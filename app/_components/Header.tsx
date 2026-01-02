import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VersionSelect from "./VersionSelect";

type HeaderProps = {
  title: string;
  currentVersion: number;
  versions: number;
};

export default function Header({
  title,
  versions,
  currentVersion,
}: HeaderProps) {
  return (
    <div className="w-full border-b border-border bg-slate-800/50 p-6 md:px-10 flex justify-between gap-5">
      <div className="prose prose-invert">
        <Markdown remarkPlugins={[remarkGfm]}>{title}</Markdown>
      </div>
      <VersionSelect currentVersion={currentVersion} versions={versions} />
    </div>
  );
}
