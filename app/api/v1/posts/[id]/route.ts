import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    // Mock data simulation
    return NextResponse.json({
        post: {
            _id: id,
            title: 'Demo Blog Post',
            description: 'This is a mock blog post to demonstrate functionality.',
            content: '# Full Content\n\nThis content is served from the mock API because the backend is not connected.\n\n## Features\n- Markdown support\n- Fast loading\n- Minimalist design',
            author: { name: 'Demo User' },
            date: new Date().toISOString(),
            category: 'Demo',
            image: 'https://images.unsplash.com/photo-1499750310159-529800cf2c5a',
            verified: true,
            rating: 5.0,
            tags: ['demo', 'mock', 'nextjs']
        }
    });
}
