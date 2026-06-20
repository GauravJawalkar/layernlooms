"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  Loader2,
  FolderKanban,
  CheckCircle2,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import {
  getAllProjectsFromDb,
  createProject,
  updateProject,
  deleteProject,
  AdminProject,
  defaultProject,
} from "../../../lib/admin/portfolio";
import { useToast } from "../../../components/admin/Toast";
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload";

export default function AdminPortfolioPage() {
  const { success, error } = useToast();
  const authCtx = useAdminAuth();
  const authLoading = authCtx.loading;
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) loadProjects();
  }, [authLoading]);

  async function loadProjects() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await getAllProjectsFromDb();
      setProjects(data);
    } catch (err: any) {
      setLoadError(err?.message || "Failed to load projects. Check Firestore rules.");
      error("Failed to load projects");
    }
    setLoading(false);
  }

  function startNew() {
    setEditing({ ...defaultProject, id: "" });
    setIsNew(true);
  }

  function startEdit(p: AdminProject) {
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
        await createProject(clean);
        success("Project created");
      } else {
        await updateProject(editing.id, clean);
        success("Project updated");
      }
      await loadProjects();
      cancelEdit();
    } catch (err: any) {
      error(err?.message || "Failed to save");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      success("Project deleted");
    } catch (err) {
      error("Failed to delete");
    }
    setDeleteId(null);
  }

  async function handleToggleVisibility(p: AdminProject) {
    setTogglingId(p.id);
    try {
      const newVal = p.visible === false ? true : false;
      await updateProject(p.id, { visible: newVal });
      setProjects((prev) => prev.map((item) => item.id === p.id ? { ...item, visible: newVal } : item));
    } catch { error("Failed to toggle visibility"); }
    setTogglingId(null);
  }

  function updateField(field: string, value: any) {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  }

  function updateArrayField(field: "services" | "technologies", index: number, value: string) {
    if (!editing) return;
    const arr = [...(editing[field] || [])];
    arr[index] = value;
    setEditing({ ...editing, [field]: arr });
  }

  function addArrayField(field: "services" | "technologies") {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...(editing[field] || []), ""] });
  }

  function removeArrayField(field: "services" | "technologies", index: number) {
    if (!editing) return;
    const arr = [...(editing[field] || [])];
    arr.splice(index, 1);
    setEditing({ ...editing, [field]: arr });
  }

  function updateTestimonialField(field: "text" | "author" | "role", value: string) {
    if (!editing) return;
    setEditing({ ...editing, testimonial: { ...(editing.testimonial || { text: "", author: "", role: "" }), [field]: value } });
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
            {isNew ? "New Project" : "Edit Project"}
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
                placeholder="e.g. ECOMM_STORE"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="Slug" required>
              <input
                type="text"
                value={editing.slug}
                onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))}
                placeholder="e.g. ecomm-store"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              />
            </Field>

            <Field label="Category">
              <input
                type="text"
                value={editing.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="e.g. E-Commerce"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="Short Description">
              <textarea
                value={editing.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                placeholder="Brief description for cards"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </Field>

            <Field label="Long Description">
              <textarea
                value={editing.longDescription}
                onChange={(e) => updateField("longDescription", e.target.value)}
                rows={4}
                placeholder="Detailed description for the project page"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </Field>

            <Field label="Image">
              <CloudinaryUpload
                value={editing.image}
                onChange={(v) => updateField("image", v)}
                folder="layernlooms/portfolio"
              />
            </Field>

            <Field label="Client">
              <input
                type="text"
                value={editing.client}
                onChange={(e) => updateField("client", e.target.value)}
                placeholder="Client name"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="Year">
              <input
                type="text"
                value={editing.year}
                onChange={(e) => updateField("year", e.target.value)}
                placeholder="e.g. 2025"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="URL">
              <input
                type="text"
                value={editing.url || ""}
                onChange={(e) => updateField("url", e.target.value)}
                placeholder="https://example.com"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <ArrayEditor
              label="Services"
              items={editing.services || []}
              onAdd={() => addArrayField("services")}
              onChange={(i, v) => updateArrayField("services", i, v)}
              onRemove={(i) => removeArrayField("services", i)}
              placeholder="e.g. Web Development"
            />

            <ArrayEditor
              label="Technologies"
              items={editing.technologies || []}
              onAdd={() => addArrayField("technologies")}
              onChange={(i, v) => updateArrayField("technologies", i, v)}
              onRemove={(i) => removeArrayField("technologies", i)}
              placeholder="e.g. React"
            />

            <Field label="Result">
              <textarea
                value={editing.result}
                onChange={(e) => updateField("result", e.target.value)}
                rows={3}
                placeholder="Key result or outcome"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </Field>

            {/* Testimonial */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Testimonial (optional)</label>
              <div className="p-4 rounded-xl border border-border bg-card/50 space-y-3">
                <input
                  type="text"
                  value={editing.testimonial?.text || ""}
                  onChange={(e) => updateTestimonialField("text", e.target.value)}
                  placeholder="Testimonial text"
                  className="w-full border border-border rounded-lg px-3 py-2 text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={editing.testimonial?.author || ""}
                    onChange={(e) => updateTestimonialField("author", e.target.value)}
                    placeholder="Author name"
                    className="w-full border border-border rounded-lg px-3 py-2 text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <input
                    type="text"
                    value={editing.testimonial?.role || ""}
                    onChange={(e) => updateTestimonialField("role", e.target.value)}
                    placeholder="Role"
                    className="w-full border border-border rounded-lg px-3 py-2 text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border">
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => updateField("visible", editing.visible === false ? true : false)}
              className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${editing.visible !== false ? 'bg-primary' : 'bg-border'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background shadow-sm transition-transform ${editing.visible !== false ? 'translate-x-5' : ''}`} />
            </button>
            <div>
              <p className="text-sm font-medium text-foreground">Visible on website</p>
              <p className="text-xs text-textMuted">Toggle to show or hide on the public site</p>
            </div>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-textMuted">Manage your portfolio projects</p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-sm font-medium hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {loadError && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-sm text-red-500 flex items-center justify-between">
          <span>{loadError}</span>
          <button onClick={loadProjects} className="text-xs font-medium underline hover:no-underline shrink-0 ml-4">
            Retry
          </button>
        </div>
      )}

      {!loadError && projects.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <FolderKanban className="w-8 h-8 text-textMuted mx-auto mb-3" />
          <p className="text-sm text-textMuted">No projects yet. Create your first project.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((p) => (
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
                      <FolderKanban className="w-5 h-5 text-textMuted" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">{p.title}</p>
                      {p.visible === false && (
                        <span className="text-[10px] font-medium text-textMuted bg-secondary px-1.5 py-0.5 rounded shrink-0">Hidden</span>
                      )}
                    </div>
                    <p className="text-xs text-textMuted truncate">/{p.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleToggleVisibility(p)}
                    disabled={togglingId === p.id}
                    className={`p-2 rounded-xl transition-all ${
                      p.visible === false
                        ? "text-textMuted hover:text-foreground hover:bg-secondary"
                        : "text-primary hover:bg-primary/10"
                    }`}
                    title={p.visible === false ? "Show on website" : "Hide from website"}
                  >
                    {togglingId === p.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : p.visible === false ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
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
                      <p className="text-textMuted">Services</p>
                      <p className="font-medium text-foreground">{p.services?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-textMuted">Technologies</p>
                      <p className="font-medium text-foreground">{p.technologies?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-textMuted">Year</p>
                      <p className="font-medium text-foreground">{p.year}</p>
                    </div>
                  </div>
                  {p.description && (
                    <p className="text-xs text-textMuted mt-3 line-clamp-2">{p.description}</p>
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
