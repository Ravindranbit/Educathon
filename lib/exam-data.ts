export const EXAM_PREP_DATA = {
  JEE_MAINS: {
    name: "JEE Mains",
    fullName: "Joint Entrance Examination Main",
    description: "Engineering entrance exam for IIT, NIT, and GFTI admission",
    totalMarks: 300,
    duration: "3 hours",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    topics: [
      {
        subject: "Physics",
        chapters: [
          "Mechanics",
          "Thermodynamics",
          "Electrostatics",
          "Current Electricity",
          "Magnetism",
          "Optics",
          "Modern Physics",
        ],
      },
      {
        subject: "Chemistry",
        chapters: [
          "Atomic Structure",
          "Chemical Bonding",
          "Thermodynamics",
          "Kinetics",
          "Equilibrium",
          "Redox",
          "Coordination Compounds",
        ],
      },
      {
        subject: "Mathematics",
        chapters: [
          "Algebra",
          "Trigonometry",
          "Coordinate Geometry",
          "Calculus",
          "Vectors & 3D",
          "Statistics & Probability",
        ],
      },
    ],
    resources: [
      { name: "NCERT Textbooks", type: "Official", url: "https://ncert.nic.in" },
      { name: "JEE Main Official", type: "Official", url: "https://jeemain.nta.ac.in" },
      { name: "Physics Wallah", type: "YouTube", url: "https://youtube.com/@PhysicsWallah" },
      { name: "Khan Academy", type: "Online", url: "https://www.khanacademy.org" },
    ],
    timeline: "Typically held 2-4 times a year",
    website: "https://jeemain.nta.ac.in",
  },
  NEET: {
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    description: "Medical entrance exam for MBBS and BDS programs",
    totalMarks: 720,
    duration: "3 hours 20 minutes",
    subjects: ["Physics", "Chemistry", "Biology"],
    topics: [
      {
        subject: "Physics",
        chapters: [
          "Mechanics",
          "Thermodynamics",
          "Electromagnetism",
          "Optics",
          "Modern Physics",
          "Current Electricity",
        ],
      },
      {
        subject: "Chemistry",
        chapters: [
          "Atomic Structure",
          "Chemical Bonding",
          "Organic Chemistry",
          "Inorganic Chemistry",
          "Physical Chemistry",
          "Reaction Mechanisms",
        ],
      },
      {
        subject: "Biology",
        chapters: [
          "Cell Biology",
          "Genetics",
          "Evolution",
          "Human Physiology",
          "Plant Physiology",
          "Ecology",
          "Molecular Biology",
        ],
      },
    ],
    resources: [
      { name: "NCERT Biology", type: "Official", url: "https://ncert.nic.in" },
      { name: "NEET Official", type: "Official", url: "https://neet.nta.ac.in" },
      { name: "Amoeba Sisters", type: "YouTube", url: "https://youtube.com/amoebasisters" },
      { name: "Khan Academy", type: "Online", url: "https://www.khanacademy.org" },
    ],
    timeline: "Held once a year (typically July-August)",
    website: "https://neet.nta.ac.in",
  },
  UPSC: {
    name: "UPSC",
    fullName: "Union Public Service Commission Civil Services Exam",
    description: "Examination for IAS, IPS, and other civil services",
    totalMarks: 2025,
    duration: "6 hours per paper",
    subjects: ["General Studies", "Optional Subject", "CSAT"],
    topics: [
      {
        subject: "General Studies I",
        chapters: ["History", "Geography", "Polity", "Economics", "Culture", "Society"],
      },
      {
        subject: "General Studies II",
        chapters: ["Ethics", "Governance", "International Relations", "Social Issues", "Science & Technology"],
      },
      {
        subject: "General Studies III",
        chapters: ["Economy", "Infrastructure", "Environment", "Agriculture", "Science", "Security"],
      },
      {
        subject: "General Studies IV",
        chapters: ["Ethics", "Integrity", "Aptitude", "Emotional Intelligence"],
      },
    ],
    resources: [
      { name: "UPSC Official", type: "Official", url: "https://upsc.gov.in" },
      { name: "Civil Services Manual", type: "Official", url: "https://upsc.gov.in/exams/syllabus" },
      { name: "The Hindu Editorial", type: "Newspaper", url: "https://www.thehindu.com" },
      { name: "Indian Express", type: "Newspaper", url: "https://indianexpress.com" },
    ],
    timeline: "Held once a year (typically starts March-April)",
    website: "https://upsc.gov.in",
  },
  GATE: {
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    description: "National entrance exam for postgraduate engineering programs",
    totalMarks: 100,
    duration: "3 hours",
    subjects: ["Engineering", "General Aptitude", "Mathematics"],
    topics: [
      {
        subject: "Engineering Subjects",
        chapters: ["Core Engineering", "Advanced Topics", "Problem Solving", "Design", "Systems"],
      },
      {
        subject: "General Aptitude",
        chapters: ["Verbal", "Numerical", "Reasoning"],
      },
    ],
    resources: [
      { name: "GATE Official", type: "Official", url: "https://gate.iitg.ac.in" },
      { name: "IIT GATE Portal", type: "Official", url: "https://www.iitg.ac.in/gate" },
      { name: "NPTEL", type: "Online", url: "https://nptel.ac.in" },
      { name: "GeeksforGeeks GATE", type: "Online", url: "https://www.geeksforgeeks.org/gate" },
    ],
    timeline: "Held once a year (typically February)",
    website: "https://gate.iitg.ac.in",
  },
}

export type ExamType = keyof typeof EXAM_PREP_DATA
