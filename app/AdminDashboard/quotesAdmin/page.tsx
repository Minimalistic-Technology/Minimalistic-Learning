"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

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

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/quotes/latest")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch(() => setError("Failed to load quotes"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    setDeletingId(id);
    try {
      await fetch(`http://localhost:5000/quotes/${id}`, {
        method: "DELETE",
      });
      setQuotes((prev) => prev.filter((q) => q._id !== id));
    } catch {
      alert("Failed to delete quote");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote: quoteInput,
          name: nameInput,
          title: titleInput,
        }),
      });

      if (!res.ok) throw new Error("Failed to add quote");

      const newQuote = await res.json();
      setQuotes((prev) => [newQuote, ...prev]);
      setQuoteInput("");
      setNameInput("");
      setTitleInput("");
    } catch {
      setError("Error creating quote. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg mb-16">
      <h2 className="text-4xl font-extrabold text-blue-800 mb-8 border-b-4 border-blue-500 pb-3">
        Manage Motivational Quotes
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-12 max-w-3xl mx-auto"
        aria-label="Add new quote form"
      >
        <div className="relative mb-6">
          <textarea
            id="quoteInput"
            className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none min-h-[100px]"
            placeholder=" "
            required
            value={quoteInput}
            onChange={(e) => setQuoteInput(e.target.value)}
          />
          <label
            htmlFor="quoteInput"
            className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            Enter quote
          </label>
        </div>

        <div className="flex gap-6 mb-6">
          <div className="relative flex-1">
            <input
              id="nameInput"
              type="text"
              className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder=" "
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <label
              htmlFor="nameInput"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Enter name
            </label>
          </div>

          <div className="relative flex-1">
            <input
              id="titleInput"
              type="text"
              className="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder=" "
              required
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <label
              htmlFor="titleInput"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Enter title
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Add Quote"
          )}
        </button>

        {error && (
          <p className="mt-4 text-red-600 font-medium" role="alert">
            {error}
          </p>
        )}
      </form>

      {/* Quotes Grid */}
      {loading && quotes.length === 0 ? (
        <p className="text-center text-gray-600">Loading quotes...</p>
      ) : quotes.length === 0 ? (
        <p className="text-center text-gray-600">No quotes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote) => (
            <article
              key={quote._id}
              className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <blockquote className="italic text-gray-800 mb-4 flex-grow">
                “{quote.quote}”
              </blockquote>
              <footer className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-1 sm:gap-0">
                <div>
                  <span className="font-semibold text-blue-700">{quote.name}</span>{" "}
                  <span className="text-sm text-gray-500">({quote.title})</span>
                </div>
                <div className="text-xs text-gray-400 italic">
                  {format(new Date(quote.createdAt), "PPP")}
                </div>
              </footer>

              <button
                onClick={() => handleDelete(quote._id)}
                disabled={deletingId === quote._id}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 focus:outline-none"
                title="Delete Quote"
                aria-label={`Delete quote by ${quote.name}`}
              >
                {deletingId === quote._id ? (
                  <svg
                    className="animate-spin h-5 w-5"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
