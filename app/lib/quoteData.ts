export interface QuoteData {
  id: string;
  quote: string;
  name: string;
  title: string;
  createdAt: string;
}

export const quotesData: QuoteData[] = [
  {
    id: "quote-1",
    quote:
      "Learning happens fastest when creativity meets structure and curiosity.",
    name: "Mahesh Kumar",
    title: "Lead Mentor, AI Labs",
    createdAt: "2024-10-18T10:00:00Z",
  },
  {
    id: "quote-2",
    quote: "Ship ideas, gather feedback, iterate with kindness, repeat.",
    name: "Varshini Patel",
    title: "Curriculum Strategist",
    createdAt: "2024-10-15T10:00:00Z",
  },
  {
    id: "quote-3",
    quote: "Minimal interfaces invite maximal focus.",
    name: "Sandip Baranwal",
    title: "Design Lead",
    createdAt: "2024-10-05T10:00:00Z",
  },
  {
    id: "quote-4",
    quote: "Sharing knowledge is the fastest way to keep learning.",
    name: "Sunny Radhakrishna",
    title: "Community Manager",
    createdAt: "2024-09-30T10:00:00Z",
  },
];

