# AcademyAI - Environment Setup Guide

## Quick Start

### 1. MongoDB Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new project

2. **Create a Cluster**
   - Click "Create Deployment" → Choose "Free" tier
   - Select your region (preferably close to your location)
   - Wait for cluster to be deployed (5-10 minutes)

3. **Get Connection String**
   - Go to "Connect" → "Drivers"
   - Select "Node.js" driver
   - Copy the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/academyai`

4. **Create Database User**
   - Go to "Security" → "Database Access"
   - Click "Add New Database User"
   - Create username and strong password
   - Replace `<username>` and `<password>` in connection string

### 2. Local Environment Setup

1. **Copy Environment Template**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. **Add MongoDB URL**
   \`\`\`bash
   # In .env.local
   DATABASE_URL=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/academyai
   \`\`\`

3. **Generate Session Secret**
   \`\`\`bash
   # On macOS/Linux
   openssl rand -base64 32
   
   # Copy the output and add to .env.local
   SESSION_SECRET=your-generated-string-here
   \`\`\`

4. **Verify Setup**
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`
   - Open http://localhost:3000
   - You should see no error warnings if setup is correct


### 3. Troubleshooting

#### "DATABASE_URL is not set" Error
- Check `.env.local` exists in project root
- Verify `DATABASE_URL` is set with valid MongoDB connection string
- Restart development server: `npm run dev`

#### "SESSION_SECRET is not set" Error
- Generate new secret: `openssl rand -base64 32`
- Add to `.env.local`
- Restart development server

#### MongoDB Connection Timeout
- Check internet connection
- Verify IP whitelist in MongoDB Atlas (Security → IP Access List)
- Add `0.0.0.0/0` for development (restrict in production)

#### "Cannot connect to database" on Vercel
- Double-check `DATABASE_URL` in Vercel Environment Variables
- Ensure MongoDB IP whitelist includes Vercel IPs (add `0.0.0.0/0`)
- Redeploy after adding environment variables

## Optional: AI Model Configuration


For alternative models:
- **Groq**: Add `GROQ_API_KEY` from [console.groq.com](https://console.groq.com)
- **xAI/Grok**: Add `XAI_API_KEY` from [console.x.ai](https://console.x.ai)
- **Deep Infra**: Add `DEEPINFRA_API_KEY` from [deepinfra.com](https://deepinfra.com)

## Database Collections

The app automatically creates these collections:
- `users` - Student accounts and authentication
- `documents` - Uploaded academic documents
- `exam_pathways` - Exam preparation study plans
- `scholarship_applications` - Scholarship tracking
- `scholarships` - Available scholarship opportunities

## First Time Usage

1. Sign up for an account on the app
2. Admin access: Update user role in MongoDB (add `"role": "admin"` to user document)
3. Access admin dashboard at `/admin`

## Support

For issues:
1. Check [SETUP.md](./SETUP.md) troubleshooting section
2. Review error messages in browser console
3. Check MongoDB Atlas connection status
4. Contact support at vercel.com/help
