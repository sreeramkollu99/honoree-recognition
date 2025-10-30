# HonorTrack - Honoree Recognition Management Platform

A comprehensive web application for tracking and managing official recognitions for honorees, including Capitol flags, Governor letters, Presidential greetings, and other milestone achievements.

## Features

### Authentication & User Management
- Role-based authentication (Parent, Leader, Honoree)
- Secure login and registration
- User profile management
- Customizable settings and preferences

### Dashboard & Honoree Management
- Visual dashboard with honoree cards
- Progress tracking across all recognitions
- Add, edit, and manage multiple honorees
- Real-time status updates with toast notifications

### Recognition Tracking
- Capitol Flag requests
- Governor Letter generation
- Presidential Greeting coordination
- NASA/DoD certificates
- Custom recognition types
- Status badges (Completed, In Progress, Not Started)
- File upload for documentation

### Letter Generator
- Professional letter templates
- Live preview with formatting
- Customizable content fields
- PDF download and text copy
- Auto-save functionality

### Public Ceremony Pages
- Shareable celebration pages
- Achievement showcase
- Downloadable certificates
- Social media sharing

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React
- **PDF Generation**: Browser print API

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone or download the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd honoree-recognition-app
   \`\`\`

2. **Install dependencies**
   
   Due to React 19 compatibility, use the legacy peer deps flag:
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
honoree-recognition-app/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx           # Authentication
│   ├── dashboard/page.tsx       # Main dashboard
│   ├── honoree/[id]/page.tsx    # Recognition actions
│   ├── letter/[id]/page.tsx     # Letter generator
│   ├── ceremony/[id]/page.tsx   # Public ceremony page
│   └── settings/page.tsx        # User settings
├── components/
│   ├── navbar.tsx               # Navigation bar
│   ├── sidebar.tsx              # Dashboard sidebar
│   ├── honoree-card.tsx         # Honoree display card
│   ├── recognition-card.tsx     # Recognition item
│   ├── letter-form.tsx          # Letter input form
│   ├── letter-preview.tsx       # Letter preview
│   └── ui/                      # shadcn components
├── context/
│   ├── auth-context.tsx         # Authentication state
│   └── honoree-context.tsx      # Honoree data management
├── utils/
│   └── templates.ts             # Letter templates
└── public/                      # Static assets
\`\`\`

## Configuration

### Environment Variables

Currently, the app uses mock data. To connect to a real backend, add these environment variables:

\`\`\`env
# Database (Supabase, Neon, etc.)
DATABASE_URL=your_database_url

# Authentication
AUTH_SECRET=your_auth_secret

# File Storage (Vercel Blob, S3, etc.)
BLOB_READ_WRITE_TOKEN=your_blob_token
\`\`\`

### Customization

**Colors & Branding**
- Edit `app/globals.css` to customize the color scheme
- Modify design tokens for consistent theming

**Letter Templates**
- Update `utils/templates.ts` to add or modify letter templates
- Customize formatting and content structure

**Recognition Types**
- Edit `context/honoree-context.tsx` to add new recognition categories
- Update the recognition cards in `app/honoree/[id]/page.tsx`

## Usage

### Adding an Honoree
1. Click the floating "+" button on the dashboard
2. Fill in honoree details (name, date, photo)
3. Submit to create a new honoree card

### Tracking Recognitions
1. Click on any honoree card
2. View all available recognitions
3. Use action buttons to generate letters or access external sites
4. Upload files to mark recognitions as complete

### Generating Letters
1. From the recognition page, click "Generate Letter"
2. Fill in the letter form with required details
3. Preview the formatted letter in real-time
4. Download as PDF or copy text
5. Save to update recognition status

### Sharing Achievements
1. Complete all recognitions for an honoree
2. Navigate to their ceremony page
3. Share the public URL with family and friends

## Development

### Building for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Linting
\`\`\`bash
npm run lint
\`\`\`

## Known Issues

- **Dependency Warning**: The `vaul` package shows a peer dependency warning with React 19. This is cosmetic and doesn't affect functionality. Use `--legacy-peer-deps` during installation.
- **Mock Data**: Currently uses in-memory state. Integrate a database for production use.
- **Authentication**: Uses simulated auth. Connect a real auth provider (Supabase Auth, NextAuth, etc.) for production.

## Future Enhancements

- [ ] Database integration (Supabase/Neon)
- [ ] Real authentication system
- [ ] Email notifications for recognition milestones
- [ ] Bulk honoree import
- [ ] Advanced letter customization
- [ ] Analytics dashboard

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

