"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  MessageSquareQuote,
  PenSquare,
  Quote,
  Sparkles,
  Trash2,
} from "lucide-react";
import ScrollProgressBar from "@/app/components/ScrollerProgress";
import { adminAPI } from "@/app/lib/api";
import { toast } from "react-hot-toast";
interface Quote {
  _id: string;
  quote: string;
  name: string;
  title: string;
  createdAt: string;
}

export default function QuotesAdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quoteInput, setQuoteInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch quotes from API
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setIsFetching(true);
        const response = await adminAPI.getQuotes();
        const apiQuotes = response.data.quotes || [];
        
        const mappedQuotes: Quote[] = apiQuotes.map((quote: any) => ({
          _id: quote._id || quote.id,
          quote: quote.text || quote.quote,
          name: quote.authorName || quote.name || "Unknown",
          title: quote.authorTitle || quote.title || "",
          createdAt: quote.createdAt || new Date().toISOString(),
        }));
        
        setQuotes(mappedQuotes);
      } catch (error: any) {
        console.error("Failed to fetch quotes:", error);
        toast.error(error.response?.data?.message || "Failed to load quotes");
      } finally {
        setIsFetching(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    setDeletingId(id);
    try {
      await adminAPI.deleteQuote(id);
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      toast.success("Quote deleted successfully");
    } catch (error: any) {
      console.error("Failed to delete quote:", error);
      toast.error(error.response?.data?.message || "Failed to delete quote");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await adminAPI.createQuote({
        text: quoteInput,
        authorName: nameInput ? `${nameInput}${titleInput ? `, ${titleInput}` : ""}` : undefined,
      });
      
      const newQuote: Quote = {
        _id: response.data.quote._id || response.data.quote.id,
        quote: response.data.quote.text || quoteInput,
        name: nameInput || response.data.quote.authorName || "Unknown",
        title: titleInput || "",
        createdAt: response.data.quote.createdAt || new Date().toISOString(),
      };
      
      setQuotes((prev) => [newQuote, ...prev]);
      setQuoteInput("");
      setNameInput("");
      setTitleInput("");
      toast.success("Quote created successfully");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Error creating quote. Try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const total = quotes.length;
    const recentDate = quotes[0]?.createdAt
      ? format(new Date(quotes[0].createdAt), "PPP")
      : "—";
    return {
      total,
      recentDate,
    };
  }, [quotes]);

  return (
    <div className="min-h-screen bg-[#f5f4ff] pb-16">
      <ScrollProgressBar />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pt-10">
        <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/95 px-8 py-10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/10 via-sky-200/20 to-transparent blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                <MessageSquareQuote className="h-4 w-4 text-[#2563eb]" />
                Quotes Library
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
                Inspire readers with curated micro-stories.
              </h1>
              <p className="max-w-2xl text-sm text-slate-500">
                Publish motivational snippets that appear across the platform.
                Keep the voice cohesive with the AdminDashboard aesthetic.
              </p>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-auto">
              {[
                {
                  label: "Published Quotes",
                  value: stats.total,
                  icon: Sparkles,
                  accent: "from-[#2563eb] to-indigo-500",
                },
                {
                  label: "Last Submission",
                  value: stats.recentDate,
                  icon: PenSquare,
                  accent: "from-slate-900 to-slate-700",
                },
              ].map(({ label, value, icon: Icon, accent }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                    {label}
                    <Icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <p
                    className={`bg-gradient-to-r ${accent} bg-clip-text text-2xl font-bold text-transparent`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/70 bg-white/95 p-6 shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-3xl border border-slate-100 bg-slate-50/70 p-6 shadow-inner"
            aria-label="Add new quote form"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Compose
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                Add a new quote
              </h2>
            </div>
            <div className="relative">
              <textarea
                id="quoteInput"
                className="peer block w-full rounded-2xl border border-slate-200 bg-white px-4 pb-3 pt-5 text-sm text-slate-900 outline-none ring-2 ring-transparent transition focus:border-[#2563eb]/40 focus:ring-[#2563eb]/20"
                placeholder=" "
                required
                value={quoteInput}
                onChange={(e) => setQuoteInput(e.target.value)}
                rows={4}
              />
              <label
                htmlFor="quoteInput"
                className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-3 peer-focus:text-[0.75rem] peer-focus:tracking-[0.3em]"
              >
                Quote
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  id: "nameInput",
                  label: "Author name",
                  value: nameInput,
                  onChange: (value: string) => setNameInput(value),
                },
                {
                  id: "titleInput",
                  label: "Role / Title",
                  value: titleInput,
                  onChange: (value: string) => setTitleInput(value),
                },
              ].map(({ id, label, value, onChange }) => (
                <div key={id} className="relative">
                  <input
                    id={id}
                    type="text"
                    className="peer block w-full rounded-2xl border border-slate-200 bg-white px-4 pb-2 pt-5 text-sm text-slate-900 outline-none ring-2 ring-transparent transition focus:border-[#2563eb]/40 focus:ring-[#2563eb]/20"
                    placeholder=" "
                    required
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                  <label
                    htmlFor={id}
                    className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-3 peer-focus:text-[0.75rem] peer-focus:tracking-[0.3em]"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                ) : (
                  <>
                    <Quote className="h-4 w-4" />
                    Add Quote
                  </>
                )}
              </button>

              {error && (
                <p className="text-sm font-semibold text-rose-500" role="alert">
                  {error}
                </p>
              )}
            </div>
          </form>

          <div className="rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-inner">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Recent quotes
              </div>
              <span className="text-xs text-slate-400">
                {quotes.length} curated entries
              </span>
            </div>

            {quotes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center text-sm text-slate-500">
                No quotes yet. Start the inspiration above.
              </div>
            ) : (
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <article
                    key={quote._id}
                    className="relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-white p-5 shadow"
                  >
                    <button
                      onClick={() => handleDelete(quote._id)}
                      disabled={deletingId === quote._id}
                      className="absolute right-4 top-4 text-rose-500 transition hover:text-rose-600"
                      title="Delete Quote"
                      aria-label={`Delete quote by ${quote.name}`}
                    >
                      {deletingId === quote._id ? (
                        <svg
                          className="h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                    <blockquote className="text-base font-medium leading-relaxed text-slate-700">
                      “{quote.quote}”
                    </blockquote>
                    <footer className="mt-4 flex flex-wrap items-center justify-between text-sm text-slate-500">
                      <div>
                        <span className="font-semibold text-slate-900">
                          {quote.name}
                        </span>
                        <span className="text-slate-400"> • {quote.title}</span>
                      </div>
                      <span>{format(new Date(quote.createdAt), "PPP")}</span>
                    </footer>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
