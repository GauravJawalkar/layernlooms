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
  GripVertical,
  Save,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import {
  getAllServicesFromDb,
  createService,
  updateService,
  deleteService,
  AdminService,
  defaultService,
} from "../../../lib/admin/services";
import { useToast } from "../../../components/admin/Toast";
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload";

export default function AdminServicesPage() {
  const { success, error } = useToast();
  const authCtx = useAdminAuth();
  const authLoading = authCtx.loading;
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editing, setEditing] = useState<AdminService | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) loadServices();
  }, [authLoading]);

  async function loadServices() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await getAllServicesFromDb();
      setServices(data);
    } catch (err: any) {
      setLoadError(err?.message || "Failed to load services. Check Firestore rules.");
      error("Failed to load services");
    }
    setLoading(false);
  }

  function startNew() {
    setEditing({ ...defaultService, id: "" });
    setIsNew(true);
  }

  function startEdit(s: AdminService) {
    setEditing({ ...s });
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
        await createService(clean);
        success("Service created");
      } else {
        await updateService(editing.id, clean);
        success("Service updated");
      }
      await loadServices();
      cancelEdit();
    } catch (err: any) {
      error(err?.message || "Failed to save");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      success("Service deleted");
    } catch (err) {
      error("Failed to delete");
    }
    setDeleteId(null);
  }

  async function handleToggleVisibility(s: AdminService) {
    setTogglingId(s.id);
    try {
      const newVal = s.visible === false ? true : false;
      await updateService(s.id, { visible: newVal });
      setServices((prev) => prev.map((item) => item.id === s.id ? { ...item, visible: newVal } : item));
    } catch { error("Failed to toggle visibility"); }
    setTogglingId(null);
  }

  function updateField(field: string, value: any) {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  }

  function updateArrayField(field: "features" | "benefits" | "technologies", index: number, value: string) {
    if (!editing) return;
    const arr = [...(editing[field] || [])];
    arr[index] = value;
    setEditing({ ...editing, [field]: arr });
  }

  function addArrayField(field: "features" | "benefits" | "technologies") {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...(editing[field] || []), ""] });
  }

  function removeArrayField(field: "features" | "benefits" | "technologies", index: number) {
    if (!editing) return;
    const arr = [...(editing[field] || [])];
    arr.splice(index, 1);
    setEditing({ ...editing, [field]: arr });
  }

  function updateFaq(index: number, field: "question" | "answer", value: string) {
    if (!editing) return;
    const faqs = [...(editing.faqs || [])];
    faqs[index] = { ...faqs[index], [field]: value };
    setEditing({ ...editing, faqs });
  }

  function addFaq() {
    if (!editing) return;
    setEditing({ ...editing, faqs: [...(editing.faqs || []), { question: "", answer: "" }] });
  }

  function removeFaq(index: number) {
    if (!editing) return;
    const faqs = [...(editing.faqs || [])];
    faqs.splice(index, 1);
    setEditing({ ...editing, faqs });
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
            {isNew ? "New Service" : "Edit Service"}
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
                placeholder="e.g. Web Development"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </Field>

            <Field label="Slug" required>
              <input
                type="text"
                value={editing.slug}
                onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))}
                placeholder="e.g. web-development"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              />
            </Field>

            <Field label="Subtitle">
              <input
                type="text"
                value={editing.subtitle}
                onChange={(e) => updateField("subtitle", e.target.value)}
                placeholder="e.g. Modern, Scalable Web Applications"
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
                placeholder="Detailed description for the service page"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </Field>

            <Field label="Icon Path">
              <input
                type="text"
                value={editing.icon}
                onChange={(e) => updateField("icon", e.target.value)}
                placeholder="/icons/web-dev.svg"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              />
            </Field>

            <Field label="Image">
              <CloudinaryUpload
                value={editing.image}
                onChange={(v) => updateField("image", v)}
              />
            </Field>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Features */}
            <ArrayEditor
              label="Features"
              items={editing.features || []}
              onAdd={() => addArrayField("features")}
              onChange={(i, v) => updateArrayField("features", i, v)}
              onRemove={(i) => removeArrayField("features", i)}
              placeholder="e.g. Custom Web Applications"
            />

            {/* Benefits */}
            <ArrayEditor
              label="Benefits"
              items={editing.benefits || []}
              onAdd={() => addArrayField("benefits")}
              onChange={(i, v) => updateArrayField("benefits", i, v)}
              onRemove={(i) => removeArrayField("benefits", i)}
              placeholder="e.g. Increased user engagement"
            />

            {/* Technologies */}
            <ArrayEditor
              label="Technologies"
              items={editing.technologies || []}
              onAdd={() => addArrayField("technologies")}
              onChange={(i, v) => updateArrayField("technologies", i, v)}
              onRemove={(i) => removeArrayField("technologies", i)}
              placeholder="e.g. React"
            />

            {/* FAQs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">FAQs</label>
                <button
                  type="button"
                  onClick={addFaq}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
                >
                  <Plus className="w-3 h-3" />
                  Add FAQ
                </button>
              </div>
              <div className="space-y-2">
                {(editing.faqs || []).map((faq, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border bg-card/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold tracking-wider uppercase text-textMuted">Q{i + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFaq(i)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(i, "question", e.target.value)}
                        placeholder="Question"
                        className="w-full border border-border rounded-lg px-3 py-2 text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(i, "answer", e.target.value)}
                        rows={2}
                        placeholder="Answer"
                        className="w-full border border-border rounded-lg px-3 py-2 text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </div>
                ))}
                {(!editing.faqs || editing.faqs.length === 0) && (
                  <p className="text-xs text-textMuted">No FAQs added yet</p>
                )}
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
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-sm text-textMuted">Manage your service offerings</p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-sm font-medium hover:opacity-90 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Service
        </button>
      </div>

      {loadError && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-sm text-red-500 flex items-center justify-between">
          <span>{loadError}</span>
          <button onClick={loadServices} className="text-xs font-medium underline hover:no-underline shrink-0 ml-4">
            Retry
          </button>
        </div>
      )}

      {!loadError && services.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <FolderKanban className="w-8 h-8 text-textMuted mx-auto mb-3" />
          <p className="text-sm text-textMuted">No services yet. Create your first service.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {services.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {s.image ? (
                    <img
                      src={s.image}
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
                      <p className="font-medium text-foreground truncate">{s.title}</p>
                      {s.visible === false && (
                        <span className="text-[10px] font-medium text-textMuted bg-secondary px-1.5 py-0.5 rounded shrink-0">Hidden</span>
                      )}
                    </div>
                    <p className="text-xs text-textMuted truncate">/{s.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleToggleVisibility(s)}
                    disabled={togglingId === s.id}
                    className={`p-2 rounded-xl transition-all ${
                      s.visible === false
                        ? "text-textMuted hover:text-foreground hover:bg-secondary"
                        : "text-primary hover:bg-primary/10"
                    }`}
                    title={s.visible === false ? "Show on website" : "Hide from website"}
                  >
                    {togglingId === s.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : s.visible === false ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => startEdit(s)}
                    className="p-2 rounded-xl text-textMuted hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {deleteId === s.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(s.id)}
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
                      onClick={() => setDeleteId(s.id)}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                    className="p-2 rounded-xl text-textMuted hover:text-foreground hover:bg-secondary transition-all"
                  >
                    {expandedId === s.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {expandedId === s.id && (
                <div className="px-4 pb-4 pt-0 border-t border-border">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
                    <div>
                      <p className="text-textMuted">Features</p>
                      <p className="font-medium text-foreground">{s.features?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-textMuted">Benefits</p>
                      <p className="font-medium text-foreground">{s.benefits?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-textMuted">Technologies</p>
                      <p className="font-medium text-foreground">{s.technologies?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-textMuted">FAQs</p>
                      <p className="font-medium text-foreground">{s.faqs?.length || 0}</p>
                    </div>
                  </div>
                  {s.description && (
                    <p className="text-xs text-textMuted mt-3 line-clamp-2">{s.description}</p>
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
