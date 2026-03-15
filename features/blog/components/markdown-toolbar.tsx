"use client";

import { Link } from "lucide-react";

interface Props {
  insertMarkdown: (
    wrap: (sel: string) => { text: string; cursorStart: number; cursorEnd: number }
  ) => void;
}

export const MarkdownToolbar = ({ insertMarkdown }: Props) => {
  const getTextarea = () =>
    document.getElementById("blog-content") as HTMLTextAreaElement;

  const btnClass =
    "px-2 py-1 text-sm text-gray-700 bg-white border border-slate-200 rounded hover:bg-gray-100";

  return (
    <div className="bg-white border-b border-slate-200 p-2 flex flex-wrap gap-2">
      <button
        type="button"
        title="Bold"
        onClick={() =>
          insertMarkdown((sel) => {
            const { selectionStart: s, selectionEnd: e, value: t } = getTextarea();
            return { text: t.substring(0, s) + "**" + sel + "**" + t.substring(e), cursorStart: s + 2, cursorEnd: e + 2 };
          })
        }
        className={btnClass}
      >
        <strong>B</strong>
      </button>

      <button
        type="button"
        title="Italic"
        onClick={() =>
          insertMarkdown((sel) => {
            const { selectionStart: s, selectionEnd: e, value: t } = getTextarea();
            return { text: t.substring(0, s) + "*" + sel + "*" + t.substring(e), cursorStart: s + 1, cursorEnd: e + 1 };
          })
        }
        className={btnClass}
      >
        <em>I</em>
      </button>

      <button
        type="button"
        title="Heading"
        onClick={() =>
          insertMarkdown((sel) => {
            const { selectionStart: s, selectionEnd: e, value: t } = getTextarea();
            return { text: t.substring(0, s) + "# " + sel + t.substring(e), cursorStart: s + 2, cursorEnd: e + 2 };
          })
        }
        className={btnClass}
      >
        H
      </button>

      <button
        type="button"
        title="Bullet List"
        onClick={() =>
          insertMarkdown(() => {
            const { selectionStart: s, value: t } = getTextarea();
            return { text: t.substring(0, s) + "\n- " + t.substring(s), cursorStart: s + 3, cursorEnd: s + 3 };
          })
        }
        className={btnClass}
      >
        • List
      </button>

      <button
        type="button"
        title="Link"
        onClick={() =>
          insertMarkdown((sel) => {
            const { selectionStart: s, selectionEnd: e, value: t } = getTextarea();
            const linkText = sel || "link text";
            const inserted = `[${linkText}](url)`;
            const cursorPos = s + linkText.length + 3;
            return { text: t.substring(0, s) + inserted + t.substring(e), cursorStart: cursorPos, cursorEnd: cursorPos + 3 };
          })
        }
        className={btnClass}
      >
        <Link className="h-4 w-4" />
      </button>

      <button
        type="button"
        title="Code Block"
        onClick={() =>
          insertMarkdown(() => {
            const { selectionStart: s, value: t } = getTextarea();
            return { text: t.substring(0, s) + "\n```\ncode here\n```\n" + t.substring(s), cursorStart: s + 5, cursorEnd: s + 14 };
          })
        }
        className={btnClass}
      >
        {"</>"}
      </button>
    </div>
  );
};