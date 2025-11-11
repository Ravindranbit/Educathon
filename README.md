# AcademyAI - AI-Powered Multilingual Academic Assistant

A comprehensive platform designed to empower Indian students by simplifying academic communication, helping them understand complex documents, navigate exam preparation, and apply for scholarships easily in their preferred Indian language.

---

## Table of Contents

1. [Features](#features)
   - [Core Capabilities](#core-capabilities)
   - [Exam Preparation](#exam-preparation)
   - [Scholarships](#scholarships)
   - [Admin Dashboard](#admin-dashboard)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)
9. [Support](#support)
10. [Future Roadmap](#future-roadmap)
11. [Acknowledgments](#acknowledgments)

---

## Features

### Core Capabilities

- **Document Upload & OCR** - Upload PDFs, images, and documents for automatic text extraction  
- **AI-Powered Simplification** - Convert complex academic documents into clear, conversational explanations  
- **10+ Indian Language Support** - Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, Urdu, Assamese  
- **Voice Interaction** - Web Speech API for accessibility and hands-free learning  
- **AI Chat Assistant** - Interactive chat powered by OpenAI/Gemini for personalized help  

---

### Exam Preparation

- Guided pathways for JEE Mains, NEET, UPSC, and GATE  
- Detailed preparation guidelines with resources  
- Progress tracking and study planning  
- Quiz generation from study materials  

---

### Scholarships

- Automatic fetching from trusted government sources (National Scholarships Portal, Ministry of Education, etc.)  
- Real-time scholarship information with eligibility criteria  
- Application tracking system  
- Direct links to official scholarship portals  

---

### Admin Dashboard

- User management and analytics  
- Exam pathway creation and management  
- Scholarship opportunity management  
- Content library management  

---

## Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB (Local or Atlas) |
| **AI** | Vercel AI SDK with OpenAI/Gemini models |
| **Voice** | Web Speech API (browser native) |
| **OCR** | Tesseract.js (client-side) |

---

## Prerequisites

- Node.js 18+ and npm/yarn  
- MongoDB (local or Atlas connection string)  
- For local MongoDB: Install from [MongoDB Community Edition](https://www.mongodb.com/try/download/community)

---

## Installation

### 1. Clone and Install

```
# Clone the repository
git clone https://github.com/Ravindranbit/-Educathon.git
cd academyai

# Install dependencies
npm install
```
###2. Setup Local MongoDB
Option A: Local MongoDB
```
# Install MongoDB Community Edition
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
mongosh
```
Option B: MongoDB Atlas (Cloud)
```
Go to MongoDB Atlas

Create a free account and cluster

Get your connection string
```
###3. Environment Setup
```
# Create .env.local file
cp .env.example .env.local
Edit .env.local with your values:

# For Local MongoDB
DATABASE_URL=mongodb://localhost:27017/academyai

# For MongoDB Atlas
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/academyai

# Generate SESSION_SECRET
openssl rand -base64 32

# Add to .env.local
SESSION_SECRET=your-generated-secret
```
###4. Run Development Server
```
npm run dev

Visit http://localhost:3000
```
Usage
Student Features

Sign Up/Login - Create account with email and password

Upload Documents - Upload academic documents for simplification

View Simplified Content - Read clear explanations in your preferred language

Ask Voice Questions - Use voice interface to ask questions

Explore Exams - Browse JEE, NEET, UPSC, GATE with prep guides

Find Scholarships - Search and apply for available scholarships

Chat with AI - Get instant answers from AI assistant

Admin Features

Navigate to /admin with admin credentials

Manage users, exams, scholarships, and content

Monitor platform analytics

Default Credentials (Development)

Create your first admin account via signup, then contact support to upgrade to admin.

## Troubleshooting

### MongoDB Connection Issues

- **Error: "connect ECONNREFUSED"**
  - Ensure MongoDB is running: `brew services list` (macOS)
  - Check `DATABASE_URL` format: `mongodb://localhost:27017/academyai`

- **Error: "authentication failed"**
  - Verify MongoDB Atlas credentials
  - Create a new database user if needed
  - Ensure IP whitelist includes your address

---

### AI Chat Not Working

- **Error: "Failed to get response from AI"**
  - Verify `DATABASE_URL` and `SESSION_SECRET` are set
  - Check that you're authenticated (logged in)
  - Review API response in browser console

---

### Environment Variables Not Loading

- **Error: "Missing required environment variables"**
  - Confirm `.env.local` exists in project root
  - Restart development server after changes
  - Check for typos in variable names

---

## Contributing

- Contributions are welcome.  
- To contribute Please follow these steps:
```
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Commit changes
git commit -m 'Add amazing feature'

# 4. Push to branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```
