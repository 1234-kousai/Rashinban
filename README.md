# TheBox - Construction Company Landing Page

A pixel-perfect recreation of a construction company landing page built with Next.js and Tailwind CSS.

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Work Sans** - Google Font

## Features

- 11 fully responsive sections
- Pixel-perfect design recreation from Figma
- Optimized images with Next.js Image component
- Modern design system with custom color palette
- Smooth animations and transitions

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles & Tailwind imports
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main landing page
├── components/
│   └── ui/
│       └── Button.tsx    # Reusable button component
├── public/
│   └── assets/           # All images and SVGs
└── tailwind.config.ts    # Tailwind configuration with design tokens
```

## Design System

### Colors
- Primary: `#2947A9` (Blue)
- Secondary: `#F9995D` (Orange)
- Neutral: 900 → 50 (Black to White scale)

### Typography
- Font: Work Sans
- Heading 1: 72px / SemiBold
- Heading 2: 60px / Bold
- Heading 4: 36px / Bold
- Body: 18-24px / Regular

## Sections

1. **Navbar** - Logo + Navigation
2. **Hero** - Main banner with feature project
3. **Our Reputation** - Three service cards
4. **About Us** - Company info with image
5. **Services** - 6 service offerings
6. **Stats** - Company statistics
7. **Free Consultation** - CTA banner
8. **Projects** - Project gallery with filtering
9. **Contact Form** - Lead capture form
10. **Bottom** - Contact info + Newsletter
11. **Footer** - Copyright

## License

This is a demo project created for portfolio purposes.
