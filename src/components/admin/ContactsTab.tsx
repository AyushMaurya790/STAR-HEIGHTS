import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Building,
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  User,
  Save,
} from "lucide-react";
import { adminApi, ContactItem } from "@/lib/api";

const STATUSES = ["All", "New", "Contacted", "In Progress", "Closed"];

export function ContactsTab() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Active Lead Inspector
  const [selectedLead, setSelectedLead] = useState<ContactItem | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getContacts();
      setContacts(data);
      if (data.length > 0 && !selectedLead) {
        setSelectedLead(data[0]);
        setNotes(data[0].notes || "");
      }
    } catch (err) {
      console.error("Failed to load contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const updated = await adminApi.updateContact(id, { status: newStatus });
      setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
      if (selectedLead?.id === id) {
        setSelectedLead(updated);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status.");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      setSavingNote(true);
      const updated = await adminApi.updateContact(selectedLead.id, { notes });
      setContacts((prev) => prev.map((c) => (c.id === selectedLead.id ? updated : c)));
      setSelectedLead(updated);
      alert("Lead notes saved!");
    } catch (err) {
      console.error("Failed to save notes:", err);
      alert("Failed to save notes.");
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete inquiry from "${name}"?`)) return;

    try {
      await adminApi.deleteContact(id);
      const remaining = contacts.filter((c) => c.id !== id);
      setContacts(remaining);
      if (selectedLead?.id === id) {
        setSelectedLead(remaining[0] || null);
        setNotes(remaining[0]?.notes || "");
      }
    } catch (err) {
      console.error("Failed to delete contact:", err);
      alert("Failed to delete contact.");
    }
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search)) ||
      (c.projectType && c.projectType.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      selectedStatus === "All" || (c.status || "New").toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
            Client Inquiries & CRM ({contacts.length})
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60">
            Track customer inquiries, project requirements, consultation follow-ups and lead statuses
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-charcoal/80 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, phone, or project..."
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedStatus === st
                  ? "bg-gold text-black shadow-md shadow-gold/20"
                  : "bg-white/5 text-ivory/70 hover:bg-white/10 hover:text-ivory"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Dual Panel: Leads List & Detail Inspector */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-ivory/20 mb-3" />
          <h3 className="text-sm font-bold text-ivory">No inquiries found</h3>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column: Lead List */}
          <div className="space-y-3 lg:col-span-6 xl:col-span-5">
            {filteredContacts.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedLead(c);
                  setNotes(c.notes || "");
                }}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  selectedLead?.id === c.id
                    ? "border-gold bg-gold/5 shadow-lg shadow-gold/10"
                    : "border-white/10 bg-charcoal hover:border-white/20 hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ivory">{c.name}</h3>
                  <select
                    value={c.status || "New"}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(c.id, e.target.value);
                    }}
                    className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase ${
                      c.status === "New"
                        ? "border-amber-500/40 bg-amber-500/20 text-amber-300"
                        : c.status === "Contacted"
                        ? "border-blue-500/40 bg-blue-500/20 text-blue-300"
                        : c.status === "In Progress"
                        ? "border-purple-500/40 bg-purple-500/20 text-purple-300"
                        : "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    <option value="New" className="bg-charcoal text-amber-300">New</option>
                    <option value="Contacted" className="bg-charcoal text-blue-300">Contacted</option>
                    <option value="In Progress" className="bg-charcoal text-purple-300">In Progress</option>
                    <option value="Closed" className="bg-charcoal text-emerald-300">Closed</option>
                  </select>
                </div>

                <div className="mt-2 space-y-1 text-xs text-ivory/60">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="h-3.5 w-3.5 text-gold" />
                    <span>{c.email}</span>
                  </div>
                  {c.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{c.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-ivory/40">
                    <Building className="h-3.5 w-3.5" />
                    <span>{c.projectType || "General Enquiry"}</span>
                  </div>
                </div>

                {c.message && (
                  <p className="mt-3 text-xs text-ivory/50 line-clamp-1 italic bg-white/[0.02] p-2 rounded-lg border border-white/5">
                    "{c.message}"
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Selected Lead Details */}
          {selectedLead && (
            <div className="rounded-3xl border border-gold/30 bg-charcoal p-6 lg:col-span-6 xl:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-xl font-bold text-ivory">
                        {selectedLead.name}
                      </h2>
                      <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold text-gold border border-gold/20">
                        {selectedLead.status || "New"}
                      </span>
                    </div>
                    <p className="text-xs text-ivory/50 mt-0.5">
                      Received: {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : "Recent"}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedLead.id, selectedLead.name)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete Lead</span>
                  </button>
                </div>

                {/* Contact Cards Grid */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-ivory/50 uppercase mb-1">
                      <Mail className="h-3.5 w-3.5 text-gold" /> Email Address
                    </div>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-xs font-semibold text-ivory hover:text-gold transition-colors break-all"
                    >
                      {selectedLead.email}
                    </a>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-ivory/50 uppercase mb-1">
                      <Phone className="h-3.5 w-3.5 text-emerald-400" /> Phone Number
                    </div>
                    <a
                      href={selectedLead.phone ? `tel:${selectedLead.phone}` : "#"}
                      className="text-xs font-semibold text-ivory hover:text-gold transition-colors"
                    >
                      {selectedLead.phone || "Not provided"}
                    </a>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-ivory/50 uppercase mb-1">
                      <Building className="h-3.5 w-3.5 text-blue-400" /> Project Type
                    </div>
                    <span className="text-xs font-semibold text-ivory">
                      {selectedLead.projectType || "General Construction"}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-ivory/50 uppercase mb-1">
                      <DollarSign className="h-3.5 w-3.5 text-yellow-400" /> Estimated Budget
                    </div>
                    <span className="text-xs font-semibold text-ivory">
                      {selectedLead.budget || "To be discussed"}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mt-6">
                  <h3 className="text-xs font-bold text-ivory uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gold" />
                    Inquiry Details & Message
                  </h3>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-ivory/80 leading-relaxed min-h-[80px]">
                    {selectedLead.message || "No specific message provided. Client requested consultation."}
                  </div>
                </div>

                {/* Internal Notes Editor */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-ivory uppercase tracking-wider">
                      Internal CRM Follow-up Notes
                    </h3>
                    <button
                      onClick={handleSaveNotes}
                      disabled={savingNote}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-3 py-1 text-[11px] font-bold text-black hover:scale-105 transition-all disabled:opacity-50"
                    >
                      <Save className="h-3 w-3" />
                      <span>{savingNote ? "Saving..." : "Save Notes"}</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Record meeting notes, quotation updates, site visit scheduled dates..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
