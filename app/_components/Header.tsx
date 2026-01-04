import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VersionSelect from "./VersionSelect";

type HeaderProps = {
  title: string;
  currentVersion: number;
  versions: number;
  query: string;
};

export default function Header({
  title,
  versions,
  currentVersion,
  query,
}: HeaderProps) {
  return (
    <div className="bg-slate-800/50 md:px-10  border-b border-border p-6 ">
      <div className="text-sm mb-8 space-y-2 border border-border p-4 rounded-xl">
        <p className="text-md  text-muted-foreground font-bold">
          Vaša poizvedba:
        </p>
        <p className="text-foreground italic">"{query}"</p>
      </div>
      <div className="w-full flex justify-between gap-5">
        <div className="prose prose-invert">
          <Markdown remarkPlugins={[remarkGfm]}>{title}</Markdown>
        </div>
        <VersionSelect currentVersion={currentVersion} versions={versions} />
      </div>
    </div>
  );
}
