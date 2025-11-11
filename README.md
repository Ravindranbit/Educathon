# AcademyAI - AI-Powered Multilingual Academic Assistant

A comprehensive platform designed to empower Indian students by simplifying academic communication, helping them understand complex documents, navigate exam preparation, and apply for scholarships easily in their preferred Indian language.

## Features

### Core Capabilities
- **Document Upload & OCR** - Upload PDFs, images, and documents for automatic text extraction
- **AI-Powered Simplification** - Convert complex academic documents into clear, conversational explanations
- **11+ Indian Language Support** - Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, Urdu, Assamese
- **Voice Interaction** - Web Speech API for accessibility and hands-free learning
- **AI Chat Assistant** - Interactive chat powered by OpenAI/Gemini for personalized help

### Exam Preparation
- Guided pathways for JEE Mains, NEET, UPSC, and GATE
- Detailed preparation guidelines with resources
- Progress tracking and study planning
- Quiz generation from study materials

### Scholarships
- Automatic fetching from trusted government sources (National Scholarships Portal, Ministry of Education, etc.)
- Real-time scholarship information with eligibility criteria
- Application tracking system
- Direct links to official scholarship portals

### Admin Dashboard
- User management and analytics
- Exam pathway creation and management
- Scholarship opportunity management
- Content library management

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Local or Atlas)
- **AI**: Vercel AI SDK with OpenAI/Gemini models
- **Voice**: Web Speech API (browser native)
- **OCR**: Tesseract.js (client-side)

## Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local or Atlas connection string)
- For local MongoDB: Install from https://www.mongodb.com/try/download/community

## Installation

### Clone the repository
git clone https://github.com/Ravindranbit/-Educathon.git
cd academyai

# Install dependencies
npm install

### 2. Setup Local MongoDB

**Option A: Local MongoDB**
\`\`\`bash
# Install MongoDB Community Edition
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
mongosh
\`\`\`

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string

### 3. Environment Setup

\`\`\`bash
# Create .env.local file
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` with your values:

\`\`\`bash
# For Local MongoDB
DATABASE_URL=mongodb://localhost:27017/academyai

# For MongoDB Atlas, use:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/academyai

# Generate SESSION_SECRET
openssl rand -base64 32

# Add to .env.local
SESSION_SECRET=<your-generated-secret>
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

## Usage

### Student Features

1. **Sign Up/Login** - Create account with email and password
2. **Upload Documents** - Upload academic documents for simplification
3. **View Simplified Content** - Read clear explanations in your preferred language
4. **Ask Voice Questions** - Use voice interface to ask questions
5. **Explore Exams** - Browse JEE, NEET, UPSC, GATE with prep guides
6. **Find Scholarships** - Search and apply for available scholarships
7. **Chat with AI** - Get instant answers from AI assistant

### Admin Features

1. Navigate to `/admin` with admin credentials
2. Manage users, exams, scholarships, and content
3. Monitor platform analytics

## Default Credentials (Development)

Create your first admin account via signup, then contact support to upgrade to admin.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/list` - List user documents
- `GET /api/documents/[id]` - Get document details
- `POST /api/documents/[id]/simplify` - Simplify document
- `POST /api/documents/[id]/ask` - Ask questions via voice

### Exams
- `GET /api/exam-pathways/list` - Get exam pathways
- `POST /api/exam-pathways/create` - Create exam pathway
- `GET /api/exam-pathways/[id]` - Get pathway details

### Scholarships
- `GET /api/scholarships/list` - List scholarships
- `POST /api/scholarships/apply` - Apply for scholarship
- `GET /api/scholarships/fetch` - Fetch from trusted sources

### Chat
- `POST /api/chat` - Send message to AI assistant

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com and connect your repo
3. Add environment variables:
   - `DATABASE_URL` - Your MongoDB connection string
   - `SESSION_SECRET` - Generated secret key
4. Deploy!

\`\`\`bash
npm run build
npm start
\`\`\`

## File Structure

\`\`\`
academyai/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Auth pages
│   ├── dashboard/        # User dashboard
│   ├── admin/            # Admin pages
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # UI components
│   ├── chat-assistant.tsx # Chat widget
│   ├── home-navigation.tsx
│   └── ...
├── hooks/
│   ├── use-chat.ts       # Chat hook
│   ├── use-speech-recognition.ts
│   └── ...
├── lib/
│   ├── db.ts             # MongoDB connection
│   ├── env.ts            # Environment validation
│   ├── exam-data.ts      # Exam information
│   ├── scholarship-data.ts
│   └── languages.ts      # Multilingual support
├── .env.example          # Environment template
├── .env.local            # Local env variables
└── README.md
\`\`\`

## Troubleshooting

### MongoDB Connection Issues

**Error: "connect ECONNREFUSED"**
- Ensure MongoDB is running: \`brew services list\` (macOS)
- Check DATABASE_URL format: \`mongodb://localhost:27017/academyai\`

**Error: "authentication failed"**
- Verify MongoDB Atlas credentials
- Create a new database user if needed
- Ensure IP whitelist includes your address

### AI Chat Not Working

**Error: "Failed to get response from AI"**
- Verify DATABASE_URL and SESSION_SECRET are set
- Check that you're authenticated (logged in)
- Review API response in browser console

### Environment Variables Not Loading

**Error: "Missing required environment variables"**
- Confirm \`.env.local\` exists in project root
- Restart development server after changes
- Check for typos in variable names

## Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@academyai.example

## Future Roadmap

- Integration with national education platforms
- Offline functionality
- Mobile app (React Native)
- Advanced analytics dashboard
- Peer-to-peer study groups
- Video tutorials
- Live doubt sessions with experts

## Acknowledgments

- Ministry of Education, India
- National Test Abhyasa Platform
- Scholarship Portal India
- Open source community

