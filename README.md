# AcademyAI - AI-Powered Multilingual Academic Assistant

A comprehensive platform designed to empower Indian students by simplifying academic communication, helping them understand complex documents, navigate exam preparation, and apply for scholarships easily in their preferred Indian language.

---

## **Features**

### **Core Capabilities**

- **Document Upload & OCR** - Upload PDFs, images, and documents for automatic text extraction  
- **AI-Powered Simplification** - Convert complex academic documents into clear, conversational explanations  
- **10+ Indian Language Support** - Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, Urdu, Assamese  
- **Voice Interaction** - Web Speech API for accessibility and hands-free learning  
- **AI Chat Assistant** - Interactive chat powered by OpenAI/Gemini for personalized help  

---

### **Exam Preparation**

- Guided pathways for JEE Mains, NEET, UPSC, and GATE  
- Detailed preparation guidelines with resources  
- Progress tracking and study planning  
- Quiz generation from study materials  

---

### **Scholarships**

- Automatic fetching from trusted government sources (National Scholarships Portal, Ministry of Education, etc.)  
- Real-time scholarship information with eligibility criteria  
- Application tracking system  
- Direct links to official scholarship portals  

---

### **Admin Dashboard**

- User management and analytics  
- Exam pathway creation and management  
- Scholarship opportunity management  
- Content library management  

---

## **Tech Stack**

| Layer        | Technologies                                                                 |
|---------------|------------------------------------------------------------------------------|
| **Frontend**  | Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui                   |
| **Backend**   | Next.js API Routes                                                           |
| **Database**  | MongoDB (Local or Atlas)                                                     |
| **AI**        | Vercel AI SDK with OpenAI/Gemini models                                      |
| **Voice**     | Web Speech API (browser native)                                              |
| **OCR**       | Tesseract.js (client-side)                                                   |

---

## **Prerequisites**

- Node.js 18+ and npm/yarn  
- MongoDB (local or Atlas connection string)  
- For local MongoDB: Install from [MongoDB Community Edition](https://www.mongodb.com/try/download/community)

---

## **Installation**

### **1. Clone and Install**

```bash
# Clone the repository
git clone https://github.com/Ravindranbit/-Educathon.git
cd academyai

# Install dependencies
npm install
npm run dev
