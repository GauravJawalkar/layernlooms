"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  Loader2,
  FileText,
  CheckCircle2,
  X,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import {
  getAllBlogPostsFromDb,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  AdminBlogPost,
  defaultBlogPost,
} from "../../../lib/admin/blog";
import { useToast } from "../../../components/admin/Toast";
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload";
import MarkdownEditor from "../../../components/admin/MarkdownEditor";

export default function AdminBlogPage() {
  const { success, error } = useToast();
  const authCtx = useAdminAuth();
  const authLoading = authCtx.loading;
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editing, setEditing] = useState<AdminBlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) loadPosts();
  }, [authLoading]);

  async function loadPosts() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await getAllBlogPostsFromDb();
      setPosts(data);
    } catch (err: any) {
      setLoadError(err?.message || "Failed to load posts. Check Firestore rules.");
      console.error("Load error:", err);
    }
    setLoading(false);
  }

  function startNew() {
    setEditing({ ...defaultBlogPost, id: "" });
    setIsNew(true);
  }

  function startEdit(p: AdminBlogPost) {
    setEditing({ ...p });
    setIsNew(false);
  }

  function cancelEdit() {
    setEditing(null);
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    if (!editing.title || !editing.slug) return;

    setSaving(true);
    try {
      const { id: _, createdAt: _c, updatedAt: _u, ...clean } = editing as any;
      if (isNew) {
        await createBlogPost(clean);
        success("Post created");
      } else {
        await updateBlogPost(editing.id, clean);
        success("Post updated");
      }
      await loadPosts();
      cancelEdit();
    } catch (err: any) {
      error(err?.message || "Failed to save");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      success("Post deleted");
    } catch (err) {
      error("Failed to delete");
    }
    setDeleteId(null);
  }

  function updateField(field: string, value: any) {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  }

  function updateArrayField(field: "tags", index: number, value: string) {
    if (!editing) return;
    const arr = [...(editing[field] || [])];
    arr[index] = value;
    setEditing({ ...editing, [field]: arr });
  }

  function addArrayField(field: "tags") {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...(editing[field] || []), ""] });
  }

  function removeArrayField(field: "tags", index: number) {
    if (!editing) return;
    const arr = [...(editing[field] || [])];
    arr.splice(index, 1);
    setEditing({ ...editing, [field]: arr });
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {isNew ? "New Post" : "Edit Post"}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={cancelEdit}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm font-medium text-textMuted hover:text-foreground hover:bg-secondary transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !editing.title || !editing.slug}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <Field label="Title" required>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g. The Future of Web Development"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="Slug" required>
              <input
                type="text"
                value={editing.slug}
                onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))}
                placeholder="e.g. future-of-web-development"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              />
            </Field>

            <Field label="Excerpt">
              <textarea
                value={editing.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={3}
                placeholder="Brief excerpt for cards"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </Field>

            <Field label="Content">
              <MarkdownEditor
                value={editing.content}
                onChange={(v) => updateField("content", v)}
              />
            </Field>

            <Field label="Image">
              <CloudinaryUpload
                value={editing.image}
                onChange={(v) => updateField("image", v)}
                folder="layernlooms/blog"
              />
            </Field>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <Field label="Author">
              <input
                type="text"
                value={editing.author}
                onChange={(e) => updateField("author", e.target.value)}
                placeholder="e.g. LayerNLooms Team"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="Date">
              <input
                type="text"
                value={editing.date}
                onChange={(e) => updateField("date", e.target.value)}
                placeholder="e.g. January 15, 2026"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="Category">
              <input
                type="text"
                value={editing.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="e.g. Web Development"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="Read Time">
              <input
                type="text"
                value={editing.readTime}
                onChange={(e) => updateField("readTime", e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <ArrayEditor
              label="Tags"
              items={editing.tags || []}
              onAdd={() => addArrayField("tags")}
              onChange={(i, v) => updateArrayField("tags", i, v)}
              onRemove={(i) => removeArrayField("tags", i)}
              placeholder="e.g. React"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog</h1>
          <p className="text-sm text-textMuted">Manage your blog posts</p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-sm font-medium hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {loadError && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-sm text-red-500 flex items-center justify-between">
          <span>{loadError}</span>
          <button onClick={loadPosts} className="text-xs font-medium underline hover:no-underline shrink-0 ml-4">
            Retry
          </button>
        </div>
      )}

      {!loadError && posts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <FileText className="w-8 h-8 text-textMuted mx-auto mb-3" />
          <p className="text-sm text-textMuted">No posts yet. Create your first blog post.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-textMuted" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{p.title}</p>
                    <p className="text-xs text-textMuted truncate">/{p.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => startEdit(p)}
                    className="p-2 rounded-xl text-textMuted hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {deleteId === p.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="p-2 rounded-xl text-textMuted hover:text-foreground hover:bg-secondary transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                    className="p-2 rounded-xl text-textMuted hover:text-foreground hover:bg-secondary transition-all"
                  >
                    {expandedId === p.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {expandedId === p.id && (
                <div className="px-4 pb-4 pt-0 border-t border-border">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
                    <div>
                      <p className="text-textMuted">Category</p>
                      <p className="font-medium text-foreground">{p.category}</p>
                    </div>
                    <div>
                      <p className="text-textMuted">Tags</p>
                      <p className="font-medium text-foreground">{p.tags?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-textMuted">Date</p>
                      <p className="font-medium text-foreground">{p.date}</p>
                    </div>
                    <div>
                      <p className="text-textMuted">Read</p>
                      <p className="font-medium text-foreground">{p.readTime}</p>
                    </div>
                  </div>
                  {p.excerpt && (
                    <p className="text-xs text-textMuted mt-3 line-clamp-2">{p.excerpt}</p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function ArrayEditor({
  label,
  items,
  onAdd,
  onChange,
  onRemove,
  placeholder,
}: {
  label: string;
  items: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-textMuted">{i + 1}</span>
            </div>
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border border-border rounded-lg px-3 py-1.5 text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="p-1 rounded-lg text-red-500 hover:bg-red-500/10 transition-all shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-textMuted">No items added yet</p>
        )}
      </div>
    </div>
  );
}
