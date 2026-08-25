import React, { useRef, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Outdent,
  Indent,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  RemoveFormatting,
  Undo,
  Redo,
  FileEdit,
  Code2,
  Eye,
  Minus,
  Palette,
  Highlighter,
  ChevronDown,
  Upload,
} from "lucide-react";
import { adminApi } from "@/lib/api";

const TEXT_COLORS = [
  { name: "Default", color: "inherit" },
  { name: "Gold", color: "#d4af37" },
  { name: "Charcoal", color: "#1a1a1a" },
  { name: "Ivory", color: "#fbf9f4" },
  { name: "Muted Gray", color: "#9ca3af" },
  { name: "Emerald Green", color: "#10b981" },
  { name: "Royal Blue", color: "#3b82f6" },
  { name: "Amber Orange", color: "#f59e0b" },
  { name: "Crimson Red", color: "#ef4444" },
  { name: "Purple", color: "#8b5cf6" },
];

const HIGHLIGHT_COLORS = [
  { name: "None", color: "transparent" },
  { name: "Gold Glow", color: "rgba(212, 175, 55, 0.2)" },
  { name: "Yellow", color: "rgba(254, 240, 138, 0.35)" },
  { name: "Green", color: "rgba(167, 243, 208, 0.3)" },
  { name: "Blue", color: "rgba(191, 219, 254, 0.3)" },
  { name: "Dark Shade", color: "rgba(0, 0, 0, 0.25)" },
  { name: "Light Gray", color: "rgba(255, 255, 255, 0.12)" },
];

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your blog post...",
  minHeight = "320px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [currentBlock, setCurrentBlock] = useState("p");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Sync initial and external content
  useEffect(() => {
    if (editorRef.current && !isCodeMode) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, isCodeMode]);

  // Compute live word & char count
  const plainText = (value || "").replace(/<[^>]+>/g, " ").trim();
  const wordCount = plainText.length > 0 ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const charCount = plainText.length;

  const execute = (command: string, arg?: string) => {
    if (isCodeMode) return;
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const handleBlockChange = (tag: string) => {
    setCurrentBlock(tag);
    if (tag === "p") {
      execute("formatBlock", "<p>");
    } else if (tag === "h1") {
      execute("formatBlock", "<h1>");
    } else if (tag === "h2") {
      execute("formatBlock", "<h2>");
    } else if (tag === "h3") {
      execute("formatBlock", "<h3>");
    } else if (tag === "h4") {
      execute("formatBlock", "<h4>");
    } else if (tag === "pre") {
      execute("formatBlock", "<pre>");
    }
  };

  const handleInsertLink = () => {
    const url = prompt("Enter link URL (e.g. https://starheights.in):", "https://");
    if (url && url !== "https://") {
      execute("createLink", url);
    }
  };

  const handleInsertImage = async () => {
    const choice = prompt("Enter Image URL or type 'upload' to choose a file:", "https://");
    if (!choice) return;

    if (choice.toLowerCase() === "upload") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
          setUploadingImage(true);
          const res = await adminApi.uploadImage(file);
          if (res?.url) {
            execute("insertImage", res.url);
          }
        } catch (err) {
          alert("Failed to upload image.");
        } finally {
          setUploadingImage(false);
        }
      };
      input.click();
    } else if (choice.startsWith("http")) {
      execute("insertImage", choice);
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.03] overflow-hidden shadow-xl transition-all focus-within:border-gold/50">
      {/* Header bar matching user's image */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gold/20 text-gold">
            <FileEdit className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            BLOG CONTENT
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-ivory/50 font-mono">
            {wordCount} words &bull; {charCount} chars
          </span>
          <button
            type="button"
            onClick={() => setIsCodeMode(!isCodeMode)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-ivory/80 hover:border-gold/40 hover:text-gold transition-colors"
            title="Toggle HTML Code View"
          >
            {isCodeMode ? (
              <>
                <Eye className="h-3 w-3" />
                <span>Visual</span>
              </>
            ) : (
              <>
                <Code2 className="h-3 w-3" />
                <span>HTML</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      {!isCodeMode && (
        <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/[0.02] p-2 sm:px-4">
          {/* Block type dropdown (Normal, H1, H2, H3, etc.) */}
          <div className="relative mr-1.5">
            <select
              value={currentBlock}
              onChange={(e) => handleBlockChange(e.target.value)}
              className="h-8 rounded-lg border border-white/10 bg-charcoal-deep px-2.5 text-xs text-ivory focus:border-gold focus:outline-none cursor-pointer"
            >
              <option value="p" className="bg-charcoal text-ivory">Normal</option>
              <option value="h1" className="bg-charcoal text-ivory font-bold">Heading 1</option>
              <option value="h2" className="bg-charcoal text-ivory font-bold">Heading 2</option>
              <option value="h3" className="bg-charcoal text-ivory font-semibold">Heading 3</option>
              <option value="h4" className="bg-charcoal text-ivory">Heading 4</option>
              <option value="pre" className="bg-charcoal text-ivory font-mono">Code Block</option>
            </select>
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Bold */}
          <button
            type="button"
            onClick={() => execute("bold")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => execute("italic")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => execute("underline")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Underline (Ctrl+U)"
          >
            <Underline className="h-4 w-4" />
          </button>

          {/* Strikethrough */}
          <button
            type="button"
            onClick={() => execute("strikeThrough")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Text Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowHighlightPicker(false);
              }}
              className="flex h-8 items-center gap-1 rounded-lg px-2 text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
              title="Text Color"
            >
              <span className="font-bold text-xs underline decoration-gold decoration-2">A</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {showColorPicker && (
              <div className="absolute left-0 top-full z-30 mt-1 grid w-40 grid-cols-2 gap-1 rounded-xl border border-white/15 bg-charcoal p-2 shadow-2xl animate-fadeIn">
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      execute("foreColor", c.color);
                      setShowColorPicker(false);
                    }}
                    className="flex items-center gap-2 rounded-lg p-1.5 text-[11px] text-ivory/80 hover:bg-white/10 transition-colors text-left"
                  >
                    <span
                      className="h-3 w-3 rounded-full border border-white/20"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Highlight Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowHighlightPicker(!showHighlightPicker);
                setShowColorPicker(false);
              }}
              className="flex h-8 items-center gap-1 rounded-lg px-2 text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
              title="Highlight Background"
            >
              <Highlighter className="h-3.5 w-3.5 text-yellow-400" />
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {showHighlightPicker && (
              <div className="absolute left-0 top-full z-30 mt-1 grid w-44 grid-cols-2 gap-1 rounded-xl border border-white/15 bg-charcoal p-2 shadow-2xl animate-fadeIn">
                {HIGHLIGHT_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      execute("hiliteColor", c.color);
                      setShowHighlightPicker(false);
                    }}
                    className="flex items-center gap-2 rounded-lg p-1.5 text-[11px] text-ivory/80 hover:bg-white/10 transition-colors text-left"
                  >
                    <span
                      className="h-3 w-3 rounded-md border border-white/20"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => execute("justifyLeft")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execute("justifyCenter")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execute("justifyRight")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execute("justifyFull")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => execute("insertOrderedList")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execute("insertUnorderedList")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Bulleted List"
          >
            <List className="h-4 w-4" />
          </button>

          {/* Indent / Outdent */}
          <button
            type="button"
            onClick={() => execute("outdent")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Decrease Indent"
          >
            <Outdent className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execute("indent")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Increase Indent"
          >
            <Indent className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Quote */}
          <button
            type="button"
            onClick={() => execute("formatBlock", "<blockquote>")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </button>

          {/* Code */}
          <button
            type="button"
            onClick={() => execute("formatBlock", "<pre>")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </button>

          {/* Link */}
          <button
            type="button"
            onClick={handleInsertLink}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>

          {/* Image */}
          <button
            type="button"
            onClick={handleInsertImage}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>

          {/* Divider */}
          <button
            type="button"
            onClick={() => execute("insertHorizontalRule")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Horizontal Divider"
          >
            <Minus className="h-4 w-4" />
          </button>

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => execute("removeFormat")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-rose-400 transition-colors"
            title="Clear Formatting (Tx)"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => execute("undo")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execute("redo")}
            className="grid h-8 w-8 place-items-center rounded-lg text-ivory/80 hover:bg-white/10 hover:text-gold transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="p-4 sm:p-6 bg-charcoal/40 min-h-[300px]">
        {isCodeMode ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write HTML code here..."
            className="w-full h-80 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-gold/90 focus:outline-none leading-relaxed"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            data-placeholder={placeholder}
            style={{ minHeight }}
            className="rich-editor-body text-ivory/90 text-sm sm:text-base leading-relaxed focus:outline-none prose prose-invert max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-ivory/30 empty:before:pointer-events-none"
          />
        )}
      </div>

      <style>{`
        .rich-editor-body h1 {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--gold, #d4af37);
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .rich-editor-body h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fbf9f4;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .rich-editor-body h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #d4af37;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .rich-editor-body p {
          margin-bottom: 0.85rem;
        }
        .rich-editor-body blockquote {
          border-left: 3px solid #d4af37;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: rgba(251, 249, 244, 0.8);
          background: rgba(212, 175, 55, 0.05);
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .rich-editor-body pre {
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-family: monospace;
          font-size: 0.8125rem;
          color: #8ab4f8;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .rich-editor-body ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.85rem;
        }
        .rich-editor-body ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 0.85rem;
        }
        .rich-editor-body li {
          margin-bottom: 0.25rem;
        }
        .rich-editor-body a {
          color: #d4af37;
          text-decoration: underline;
        }
        .rich-editor-body img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          border: 1px solid rgba(212, 175, 55, 0.3);
          margin: 1rem 0;
        }
        .rich-editor-body hr {
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
