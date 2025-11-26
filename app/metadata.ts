import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'LayerNLooms | Custom Software Development, Web & Mobile Apps, AI Solutions',
    description: 'Premium software development agency specializing in custom web applications, mobile app development, AI integration, and enterprise software solutions for brands that demand excellence.',
    keywords: [
        'custom software development',
        'web application development',
        'mobile app development',
        'AI software solutions',
        'enterprise software development',
        'software development agency',
        'full-stack development',
        'AI integration services',
        'digital transformation',
        'custom web development',
        'iOS Android app development',
        'machine learning solutions',
    ],
    authors: [{ name: 'LayerNLooms' }],
    creator: 'LayerNLooms',
    publisher: 'LayerNLooms',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://layernlooms.com',
        siteName: 'LayerNLooms',
        title: 'Custom Software Development & AI Solutions | LayerNLooms',
        description: 'Weaving Digital Experiences with Precision, Depth & AI. Web • Mobile • AI • Custom Software built for brands that want excellence.',
        images: [
            {
                url: 'https://layernlooms.com/og-image.png',
                width: 1200,
                height: 630,
                alt: 'LayerNLooms - Software Development Agency',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Custom Software Development & AI Solutions | LayerNLooms',
        description: 'Web • Mobile • AI • Custom Software — Built exclusively for brands that want excellence.',
        images: ['https://layernlooms.com/twitter-image.png'],
        creator: '@layernlooms',
    },
    alternates: {
        canonical: 'https://layernlooms.com',
    },
}

export const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'LayerNLooms',
    url: 'https://layernlooms.com',
    logo: 'https://layernlooms.com/logo.png',
    description: 'Weaving Digital Experiences with Precision, Depth & AI',
    areaServed: 'Worldwide',
    serviceType: ['Custom Software Development', 'Web Development', 'Mobile App Development', 'AI Solutions'],
    sameAs: [
        'https://www.linkedin.com/company/divinify',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'hello@layernlooms.com',
    },
    priceRange: '$$',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        ratingCount: '50',
    },
}