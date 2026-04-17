"use client";

import { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import UnderlineExtension from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Pencil,
  Trash2,
  Plus,
  Upload,
  X,
  Check,
  AlertTriangle,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Link,
  Undo2,
  Redo2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const UPLOADS_BASE = BASE.replace("/api", "");

// ── helpers ────────────────────────────────────────────────────────────────

function getToken() {
  return localStorage.getItem("gym_admin_token") ?? "";
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function uploadImage(file: File): Promise<string | null> {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    headers: authHeaders(),
    body: fd,
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.url as string;
}

function img(src?: string | null) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("/uploads/")) return `${UPLOADS_BASE}${src}`;
  return src;
}

// ── tiny reusable pieces ───────────────────────────────────────────────────

function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    if (url) onChange(url);
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL or upload ↗"
        className="bg-[#1a1a1a] border-white/10 text-white text-xs flex-1"
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="shrink-0 p-2 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
        title="Upload image"
      >
        {uploading ? <span className="text-xs">…</span> : <Upload size={14} />}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

// ── rich-text editor (Tiptap) ─────────────────────────────────────────────

type ToolbarButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={onClick}
      className={`p-1.5 rounded transition text-sm ${
        active
          ? "bg-red-700 text-white"
          : "bg-transparent text-white/50 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      UnderlineExtension,
      LinkExtension.configure({ openOnClick: false }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[160px] p-3 text-white text-sm outline-none leading-relaxed break-words",
      },
    },
  });

  // Sync external value changes (e.g. opening edit mode fills in existing content)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!editor) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only update if the value differs (avoid infinite loop)
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  function prevent(e: React.MouseEvent) {
    e.preventDefault(); // prevent blur on editor
  }

  function setLink(e: React.MouseEvent) {
    e.preventDefault();
    const prev = editor!.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL:", prev ?? "https://");
    if (url === null) return; // cancelled
    if (url === "") {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor!
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }

  return (
    <div className="rounded-md border border-white/10 overflow-hidden bg-[#1a1a1a] focus-within:border-red-700/60 transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 px-1.5 py-1 border-b border-white/10 bg-[#111]">
        <ToolbarButton
          title="Undo"
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().undo().run();
          }}
        >
          <Undo2 size={13} />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().redo().run();
          }}
        >
          <Redo2 size={13} />
        </ToolbarButton>

        <span className="w-px bg-white/10 mx-0.5 self-stretch" />

        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleBold().run();
          }}
        >
          <Bold size={13} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic size={13} />
        </ToolbarButton>
        <ToolbarButton
          title="Underline"
          active={editor.isActive("underline")}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleUnderline().run();
          }}
        >
          <Underline size={13} />
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough size={13} />
        </ToolbarButton>

        <span className="w-px bg-white/10 mx-0.5 self-stretch" />

        <ToolbarButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 size={13} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <Heading3 size={13} />
        </ToolbarButton>

        <span className="w-px bg-white/10 mx-0.5 self-stretch" />

        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <List size={13} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered size={13} />
        </ToolbarButton>
        <ToolbarButton
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={(e) => {
            prevent(e);
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <Quote size={13} />
        </ToolbarButton>

        <span className="w-px bg-white/10 mx-0.5 self-stretch" />

        <ToolbarButton
          title="Link"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <Link size={13} />
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-white font-bold text-lg mb-4 border-b border-white/10 pb-2">
      {title}
    </h3>
  );
}

function DeleteConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-[#111] border border-white/10 max-w-sm">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-full bg-red-900/40">
              <AlertTriangle size={18} className="text-red-400" />
            </div>
            <AlertDialogTitle className="text-white text-base">
              {title ?? "Delete this item?"}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-white/50 text-sm pl-[52px]">
            {description ?? "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onCancel}
            className="border-white/10 text-white/60 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            className="bg-red-700 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ── TEXT CONTENT ───────────────────────────────────────────────────────────

type TextRow = { id: number; key: string; value: string; section: string };

function TextContentPanel() {
  const [rows, setRows] = useState<TextRow[]>([]);
  const [editing, setEditing] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  useEffect(() => {
    apiFetch("/admin/content/text")
      .then(setRows)
      .catch(() => {});
  }, []);

  async function save(row: TextRow) {
    await apiFetch(`/admin/content/text/${row.key}`, {
      method: "PUT",
      body: JSON.stringify({ value: editing[row.id] ?? row.value }),
    });
    setRows((prev) =>
      prev.map((r) =>
        r.id === row.id ? { ...r, value: editing[row.id] ?? r.value } : r,
      ),
    );
    setSaved((prev) => ({ ...prev, [row.id]: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, [row.id]: false })), 1500);
  }

  const sections = [...new Set(rows.map((r) => r.section))].sort();

  return (
    <div>
      <SectionHeader title="Text & Headings" />
      {sections.map((sec) => (
        <div key={sec} className="mb-6">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">
            [{sec}]
          </p>
          <div className="space-y-3">
            {rows
              .filter((r) => r.section === sec)
              .map((row) => (
                <div
                  key={row.id}
                  className="bg-[#111] rounded-lg p-3 border border-white/5 flex flex-col gap-1"
                >
                  <Label className="text-white/50 text-xs font-mono">
                    {row.key}
                  </Label>
                  <div className="flex gap-2 items-start">
                    {row.value.length > 80 ? (
                      <Textarea
                        value={editing[row.id] ?? row.value}
                        onChange={(e) =>
                          setEditing((prev) => ({
                            ...prev,
                            [row.id]: e.target.value,
                          }))
                        }
                        className="bg-[#1a1a1a] border-white/10 text-white text-sm flex-1 min-h-[70px]"
                      />
                    ) : (
                      <Input
                        value={editing[row.id] ?? row.value}
                        onChange={(e) =>
                          setEditing((prev) => ({
                            ...prev,
                            [row.id]: e.target.value,
                          }))
                        }
                        className="bg-[#1a1a1a] border-white/10 text-white text-sm flex-1"
                      />
                    )}
                    <Button
                      size="sm"
                      onClick={() => save(row)}
                      className={
                        saved[row.id]
                          ? "bg-green-700 text-white"
                          : "bg-red-700 hover:bg-red-600 text-white"
                      }
                    >
                      {saved[row.id] ? <Check size={14} /> : "Save"}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── GENERIC CRUD TABLE ─────────────────────────────────────────────────────

interface ColDef<T> {
  key: keyof T;
  label: string;
  type?: "text" | "textarea" | "richtext" | "image" | "number";
}

function CrudPanel<T extends { id: number }>({
  title,
  endpoint,
  cols,
  emptyForm,
}: {
  title: string;
  endpoint: string;
  cols: ColDef<T>[];
  emptyForm: Omit<T, "id">;
}) {
  const [items, setItems] = useState<T[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<T>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Omit<T, "id">>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    apiFetch(`/admin/content/${endpoint}`)
      .then(setItems)
      .catch(() => {});
  }, [endpoint]);

  async function handleSave(id: number) {
    setSaving(true);
    const updated = await apiFetch(`/admin/content/${endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(editForm),
    });
    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    setEditingId(null);
    setSaving(false);
  }

  async function handleDelete(id: number) {
    await apiFetch(`/admin/content/${endpoint}/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteTargetId(null);
  }

  async function handleAdd() {
    setSaving(true);
    const created = await apiFetch(`/admin/content/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(addForm),
    });
    setItems((prev) => [...prev, created]);
    setAddForm(emptyForm);
    setShowAdd(false);
    setSaving(false);
  }

  function fieldInput(
    col: ColDef<T>,
    value: string,
    onChange: (v: string) => void,
  ) {
    if (col.type === "image") {
      return <ImageInput value={value} onChange={onChange} />;
    }
    if (col.type === "richtext") {
      return <RichTextEditor value={value} onChange={onChange} />;
    }
    if (col.type === "textarea") {
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-[#1a1a1a] border-white/10 text-white text-sm min-h-[60px]"
        />
      );
    }
    return (
      <Input
        type={col.type === "number" ? "number" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#1a1a1a] border-white/10 text-white text-sm"
      />
    );
  }

  return (
    <div>
      <DeleteConfirmDialog
        open={deleteTargetId !== null}
        onConfirm={() =>
          deleteTargetId !== null && handleDelete(deleteTargetId)
        }
        onCancel={() => setDeleteTargetId(null)}
      />

      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <SectionHeader title={title} />
        <Button
          size="sm"
          onClick={() => setShowAdd((v) => !v)}
          className="bg-red-700 hover:bg-red-600 text-white"
        >
          <Plus size={14} className="mr-1" /> Add
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-[#111] border border-white/10 rounded-lg p-4 mb-4 space-y-3">
          <p className="text-white/50 text-xs mb-2">New item</p>
          {cols.map((col) => (
            <div key={String(col.key)}>
              <Label className="text-white/50 text-xs mb-1 block">
                {col.label}
              </Label>
              {fieldInput(
                col,
                String(
                  (addForm as Record<string, unknown>)[String(col.key)] ?? "",
                ),
                (v) =>
                  setAddForm((prev) => ({
                    ...prev,
                    [col.key]: col.type === "number" ? Number(v) : v,
                  })),
              )}
            </div>
          ))}
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAdd(false)}
              className="border-white/10 text-white/60 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={saving}
              onClick={handleAdd}
              className="bg-green-700 hover:bg-green-600 text-white"
            >
              {saving ? "Saving…" : "Create"}
            </Button>
          </div>
        </div>
      )}

      {/* Items list */}
      <div className="space-y-3">
        {items.map((item) =>
          editingId === item.id ? (
            /* Edit mode */
            <div
              key={item.id}
              className="bg-[#111] border border-red-700/30 rounded-lg p-4 space-y-3"
            >
              {cols.map((col) => (
                <div key={String(col.key)}>
                  <Label className="text-white/50 text-xs mb-1 block">
                    {col.label}
                  </Label>
                  {fieldInput(
                    col,
                    String(
                      (editForm as Record<string, unknown>)[String(col.key)] ??
                        (item as Record<string, unknown>)[String(col.key)] ??
                        "",
                    ),
                    (v) =>
                      setEditForm((prev) => ({
                        ...prev,
                        [col.key]: col.type === "number" ? Number(v) : v,
                      })),
                  )}
                </div>
              ))}
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingId(null)}
                  className="border-white/10 text-white/60"
                >
                  <X size={14} />
                </Button>
                <Button
                  size="sm"
                  disabled={saving}
                  onClick={() => handleSave(item.id)}
                  className="bg-green-700 hover:bg-green-600 text-white"
                >
                  {saving ? "…" : <Check size={14} />}
                </Button>
              </div>
            </div>
          ) : (
            /* View mode */
            <div
              key={item.id}
              className="bg-[#111] border border-white/5 rounded-lg p-3 flex gap-3 items-start"
            >
              {/* Thumbnail if image col exists */}
              {cols.find((c) => c.type === "image") && (
                <div className="shrink-0 w-14 h-14 rounded overflow-hidden bg-white/5">
                  {img(
                    String(
                      (item as Record<string, unknown>)[
                        String(cols.find((c) => c.type === "image")!.key)
                      ] ?? "",
                    ),
                  ) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img(
                        String(
                          (item as Record<string, unknown>)[
                            String(cols.find((c) => c.type === "image")!.key)
                          ] ?? "",
                        ),
                      )}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {cols
                  .filter((c) => c.type !== "image")
                  .slice(0, 2)
                  .map((col) => (
                    <p
                      key={String(col.key)}
                      className="text-sm text-white truncate"
                    >
                      <span className="text-white/40 text-xs mr-1">
                        {col.label}:
                      </span>
                      {String(
                        (item as Record<string, unknown>)[String(col.key)] ??
                          "",
                      ).slice(0, 80)}
                    </p>
                  ))}
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setEditForm(item);
                  }}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => setDeleteTargetId(item.id)}
                  className="p-1.5 rounded bg-white/5 hover:bg-red-900/40 text-white/50 hover:text-red-400 transition"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// ── MEMBERSHIP PLANS PANEL ─────────────────────────────────────────────────

type MembershipPlan = {
  id: number;
  name: string;
  duration: string;
  price: number;
  currency: string;
  features: string; // comma-separated
  category: string;
  isActive: boolean;
};

const PLAN_CATEGORIES = ["MEMBERSHIP", "SHORT_TERM", "ADDITIONAL"] as const;

const emptyPlan: Omit<MembershipPlan, "id"> = {
  name: "",
  duration: "",
  price: 0,
  currency: "CHF",
  features: "",
  category: "MEMBERSHIP",
  isActive: true,
};

function PlanForm({
  form,
  onChange,
}: {
  form: Partial<Omit<MembershipPlan, "id">>;
  onChange: (key: string, value: string | number | boolean) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-white/50 text-xs mb-1 block">Name</Label>
          <Input
            value={String(form.name ?? "")}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Annual Membership"
            className="bg-[#1a1a1a] border-white/10 text-white text-sm"
          />
        </div>
        <div>
          <Label className="text-white/50 text-xs mb-1 block">Duration</Label>
          <Input
            value={String(form.duration ?? "")}
            onChange={(e) => onChange("duration", e.target.value)}
            placeholder="12 Months"
            className="bg-[#1a1a1a] border-white/10 text-white text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-white/50 text-xs mb-1 block">
            Price (number)
          </Label>
          <Input
            type="number"
            value={String(form.price ?? "")}
            onChange={(e) => onChange("price", Number(e.target.value))}
            className="bg-[#1a1a1a] border-white/10 text-white text-sm"
          />
        </div>
        <div>
          <Label className="text-white/50 text-xs mb-1 block">Currency</Label>
          <Input
            value={String(form.currency ?? "CHF")}
            onChange={(e) => onChange("currency", e.target.value)}
            className="bg-[#1a1a1a] border-white/10 text-white text-sm"
          />
        </div>
      </div>
      <div>
        <Label className="text-white/50 text-xs mb-1 block">Category</Label>
        <select
          value={String(form.category ?? "MEMBERSHIP")}
          onChange={(e) => onChange("category", e.target.value)}
          className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-md px-3 py-2"
        >
          {PLAN_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-white/50 text-xs mb-1 block">
          Features (comma-separated)
        </Label>
        <Textarea
          value={String(form.features ?? "")}
          onChange={(e) => onChange("features", e.target.value)}
          placeholder="Full gym access, Modern equipment, Locker room"
          className="bg-[#1a1a1a] border-white/10 text-white text-sm min-h-[70px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="plan-active"
          checked={form.isActive !== false}
          onChange={(e) => onChange("isActive", e.target.checked)}
          className="accent-red-600 w-4 h-4"
        />
        <Label
          htmlFor="plan-active"
          className="text-white/70 text-sm cursor-pointer"
        >
          Active (visible on the frontend)
        </Label>
      </div>
    </div>
  );
}

function MembershipPlansPanel() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<MembershipPlan>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] =
    useState<Partial<Omit<MembershipPlan, "id">>>(emptyPlan);
  const [saving, setSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/admin/content/membership-plans")
      .then(setPlans)
      .catch(() => {});
  }, []);

  async function handleSave(id: number) {
    setSaving(true);
    try {
      const updated = await apiFetch(`/admin/content/membership-plans/${id}`, {
        method: "PUT",
        body: JSON.stringify(editForm),
      });
      setPlans((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setEditingId(null);
    } catch {
      alert("Failed to save plan");
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    try {
      await apiFetch(`/admin/content/membership-plans/${id}`, {
        method: "DELETE",
      });
      setPlans((prev) => prev.filter((p) => p.id !== id));
      setDeleteTargetId(null);
    } catch (e: any) {
      setDeleteTargetId(null);
      setDeleteError(e?.message ?? "Failed to delete plan");
    }
  }

  async function handleAdd() {
    setSaving(true);
    try {
      const created = await apiFetch("/admin/content/membership-plans", {
        method: "POST",
        body: JSON.stringify(addForm),
      });
      setPlans((prev) => [...prev, created]);
      setAddForm(emptyPlan);
      setShowAdd(false);
    } catch {
      alert("Failed to create plan");
    }
    setSaving(false);
  }

  const grouped = PLAN_CATEGORIES.map((cat) => ({
    cat,
    items: plans.filter((p) => p.category === cat),
  }));

  const categoryLabel: Record<string, string> = {
    MEMBERSHIP: "Membership Plans",
    SHORT_TERM: "Short-Term / Passes",
    ADDITIONAL: "Additional Packages",
  };

  return (
    <div>
      <DeleteConfirmDialog
        open={deleteTargetId !== null}
        title="Delete this plan?"
        description="This plan will be permanently removed. Plans with existing purchases cannot be deleted — deactivate them instead."
        onConfirm={() =>
          deleteTargetId !== null && handleDelete(deleteTargetId)
        }
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Error dialog */}
      <AlertDialog open={deleteError !== null}>
        <AlertDialogContent className="bg-[#111] border border-white/10 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base">
              Cannot Delete
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-sm">
              {deleteError}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              size="sm"
              onClick={() => setDeleteError(null)}
              className="bg-red-700 hover:bg-red-600 text-white"
            >
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <SectionHeader title="Membership Plans" />
        <Button
          size="sm"
          onClick={() => setShowAdd((v) => !v)}
          className="bg-red-700 hover:bg-red-600 text-white"
        >
          <Plus size={14} className="mr-1" /> Add Plan
        </Button>
      </div>

      {showAdd && (
        <div className="bg-[#111] border border-white/10 rounded-lg p-4 mb-6 space-y-3">
          <p className="text-white/50 text-xs mb-2">New plan</p>
          <PlanForm
            form={addForm}
            onChange={(k, v) => setAddForm((prev) => ({ ...prev, [k]: v }))}
          />
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowAdd(false);
                setAddForm(emptyPlan);
              }}
              className="border-white/10 text-white/60 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={saving}
              onClick={handleAdd}
              className="bg-green-700 hover:bg-green-600 text-white"
            >
              {saving ? "Saving…" : "Create"}
            </Button>
          </div>
        </div>
      )}

      {grouped.map(({ cat, items }) => (
        <div key={cat} className="mb-8">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">
            [{categoryLabel[cat]}]
          </p>

          {items.length === 0 && (
            <p className="text-white/20 text-sm italic ml-2">No plans yet</p>
          )}

          <div className="space-y-3">
            {items.map((plan) =>
              editingId === plan.id ? (
                <div
                  key={plan.id}
                  className="bg-[#111] border border-red-700/30 rounded-lg p-4 space-y-3"
                >
                  <PlanForm
                    form={editForm}
                    onChange={(k, v) =>
                      setEditForm((prev) => ({ ...prev, [k]: v }))
                    }
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                      className="border-white/10 text-white/60"
                    >
                      <X size={14} />
                    </Button>
                    <Button
                      size="sm"
                      disabled={saving}
                      onClick={() => handleSave(plan.id)}
                      className="bg-green-700 hover:bg-green-600 text-white"
                    >
                      {saving ? "…" : <Check size={14} />}
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  key={plan.id}
                  className="bg-[#111] border border-white/5 rounded-lg p-3 flex gap-3 items-start"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-white font-medium truncate">
                        {plan.name}
                      </p>
                      {!plan.isActive && (
                        <span className="text-xs bg-yellow-900/50 border border-yellow-700/40 text-yellow-400 px-1.5 py-0.5 rounded">
                          inactive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40">
                      {plan.duration} &middot; {plan.currency} {plan.price}
                    </p>
                    <p className="text-xs text-white/30 truncate mt-0.5">
                      {plan.features}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingId(plan.id);
                        setEditForm(plan);
                      }}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(plan.id)}
                      className="p-1.5 rounded bg-white/5 hover:bg-red-900/40 text-white/50 hover:text-red-400 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── TABS ───────────────────────────────────────────────────────────────────

const TABS = [
  "Text",
  "Stats",
  "Trainers",
  "Testimonials",
  "Blog",
  "Gallery",
  "Achievements",
  "Why Choose Us",
  "Events",
  "Training Zones",
  "Membership Plans",
  "FAQ",
  "Shop Products",
  "Shop Categories",
] as const;

type Tab = (typeof TABS)[number];

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function AdminContent() {
  const [tab, setTab] = useState<Tab>("Text");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Website Content</h1>
        <p className="text-white/40 text-sm">
          Edit everything that appears on your website.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              tab === t
                ? "bg-red-700 text-white"
                : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div>
        {tab === "Text" && <TextContentPanel />}

        {tab === "Stats" && (
          <CrudPanel
            title="Stats Bar"
            endpoint="stats"
            cols={[
              { key: "value" as never, label: "Value", type: "text" },
              { key: "label" as never, label: "Label", type: "text" },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={{ value: "", label: "", order: 0 } as never}
          />
        )}

        {tab === "Trainers" && (
          <CrudPanel
            title="Trainers"
            endpoint="trainers"
            cols={[
              { key: "image" as never, label: "Image", type: "image" },
              { key: "name" as never, label: "Name", type: "text" },
              { key: "role" as never, label: "Role", type: "text" },
              {
                key: "description" as never,
                label: "Description",
                type: "textarea",
              },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={
              {
                name: "",
                role: "",
                description: "",
                image: "",
                order: 0,
              } as never
            }
          />
        )}

        {tab === "Testimonials" && (
          <CrudPanel
            title="Testimonials"
            endpoint="testimonials"
            cols={[
              { key: "image" as never, label: "Image", type: "image" },
              { key: "name" as never, label: "Name", type: "text" },
              { key: "role" as never, label: "Role", type: "text" },
              { key: "rating" as never, label: "Rating (1-5)", type: "number" },
              { key: "content" as never, label: "Content", type: "textarea" },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={
              {
                name: "",
                role: "",
                rating: 5,
                content: "",
                image: "",
                order: 0,
              } as never
            }
          />
        )}

        {tab === "Blog" && (
          <CrudPanel
            title="Blog Posts"
            endpoint="blog"
            cols={[
              { key: "image" as never, label: "Image", type: "image" },
              { key: "title" as never, label: "Title", type: "text" },
              { key: "excerpt" as never, label: "Excerpt", type: "richtext" },
              {
                key: "content" as never,
                label: "Full Content",
                type: "richtext",
              },
            ]}
            emptyForm={
              { title: "", excerpt: "", content: "", image: "" } as never
            }
          />
        )}

        {tab === "Gallery" && (
          <CrudPanel
            title="Gallery Images"
            endpoint="gallery"
            cols={[
              { key: "src" as never, label: "Image", type: "image" },
              { key: "alt" as never, label: "Alt Text", type: "text" },
              { key: "category" as never, label: "Category", type: "text" },
              {
                key: "gridCol" as never,
                label: "Grid Column (CSS)",
                type: "text",
              },
              {
                key: "gridRow" as never,
                label: "Grid Row (CSS)",
                type: "text",
              },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={
              {
                src: "",
                alt: "",
                category: "All",
                gridCol: "",
                gridRow: "",
                order: 0,
              } as never
            }
          />
        )}

        {tab === "Achievements" && (
          <CrudPanel
            title="Achievements & Certifications"
            endpoint="achievements"
            cols={[
              { key: "image" as never, label: "Image", type: "image" },
              {
                key: "title" as never,
                label: "Title / Caption",
                type: "textarea",
              },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={{ title: "", image: "", order: 0 } as never}
          />
        )}

        {tab === "Why Choose Us" && (
          <CrudPanel
            title="Why Choose Us Features"
            endpoint="why-features"
            cols={[
              {
                key: "icon" as never,
                label: "Icon Name (lucide)",
                type: "text",
              },
              { key: "title" as never, label: "Title", type: "text" },
              {
                key: "description" as never,
                label: "Description",
                type: "textarea",
              },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={
              {
                icon: "Dumbbell",
                title: "",
                description: "",
                order: 0,
              } as never
            }
          />
        )}

        {tab === "Events" && (
          <CrudPanel
            title="Event Highlights"
            endpoint="event-highlights"
            cols={[
              { key: "image" as never, label: "Image", type: "image" },
              { key: "title" as never, label: "Title", type: "text" },
              {
                key: "description" as never,
                label: "Description",
                type: "textarea",
              },
              {
                key: "videoUrl" as never,
                label: "Video Embed URL",
                type: "text",
              },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={
              {
                title: "",
                description: "",
                image: "",
                videoUrl: "",
                order: 0,
              } as never
            }
          />
        )}

        {tab === "Training Zones" && (
          <CrudPanel
            title="Training Zone Images"
            endpoint="training-zones"
            cols={[
              { key: "image" as never, label: "Image", type: "image" },
              { key: "alt" as never, label: "Alt Text", type: "text" },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={{ image: "", alt: "", order: 0 } as never}
          />
        )}

        {tab === "Membership Plans" && <MembershipPlansPanel />}

        {tab === "Shop Products" && (
          <CrudPanel
            title="Shop Products"
            endpoint="products"
            cols={[
              { key: "image" as never, label: "Image", type: "image" },
              { key: "name" as never, label: "Name", type: "text" },
              { key: "price" as never, label: "Price (CHF)", type: "number" },
              { key: "currency" as never, label: "Currency", type: "text" },
              { key: "category" as never, label: "Category", type: "text" },
              {
                key: "features" as never,
                label: "Features (comma-separated)",
                type: "textarea",
              },
              { key: "stock" as never, label: "Stock", type: "number" },
            ]}
            emptyForm={
              {
                name: "",
                price: 0,
                currency: "CHF",
                image: "",
                category: "General",
                features: "",
                stock: 100,
              } as never
            }
          />
        )}

        {tab === "Shop Categories" && (
          <CrudPanel
            title="Shop Category Tabs"
            endpoint="product-categories"
            cols={[
              { key: "name" as never, label: "Category Name", type: "text" },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={{ name: "", order: 0 } as never}
          />
        )}

        {tab === "FAQ" && (
          <CrudPanel
            title="FAQ Items"
            endpoint="faqs"
            cols={[
              {
                key: "question" as never,
                label: "Question",
                type: "textarea",
              },
              {
                key: "answer" as never,
                label: "Answer",
                type: "textarea",
              },
              { key: "order" as never, label: "Order", type: "number" },
            ]}
            emptyForm={{ question: "", answer: "", order: 0 } as never}
          />
        )}
      </div>
    </div>
  );
}
