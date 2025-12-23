import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        items: [
            {
                _id: '1',
                title: 'Mastering Next.js 13',
                description: 'A comprehensive guide to the new App Router and server components.',
                content: 'Next.js 13 introduces a new paradigm...',
                author: 'Minimalistic Team',
                date: new Date().toISOString(),
                category: 'Web Development',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
                verified: true,
                rating: 4.8
            },
            {
                _id: '2',
                title: 'The Art of Minimalist Design',
                description: 'How to do more with less in UI/UX design.',
                content: '# Principals of Minimalism\n\nLess is more.',
                author: 'Jane Doe',
                date: new Date().toISOString(),
                category: 'Design',
                image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2',
                verified: true,
                rating: 4.9
            },
            {
                _id: '3',
                title: 'Effective State Management',
                description: 'Choosing the right tools for your React application.',
                content: 'Redux, Zustand, Context API...',
                author: 'John Smith',
                date: new Date().toISOString(),
                category: 'Development',
                image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
                verified: true,
                rating: 4.5
            }
        ]
    });
}
