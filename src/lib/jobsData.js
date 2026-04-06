// lib/jobsData.js
const jobsData = [
  {
    status: "Open",
    id: "1",
    postDate: "2026-02-27",
    expireDate: "2026-03-07",
    title: "Junior Flutter Developer",
    company: "Ahaz Software",
    type: "Full time",
    salary: "Monthly",
    location: "Addis Ababa, Bole",
    logo: "/images/logo/logo1.png",

    description: [
      "We are a dynamic and innovative tech company focused on delivering cutting-edge mobile applications. We are looking for a passionate Junior Flutter Developer to join our growing team and contribute to building high-quality applications for both iOS and Android.",
    ],

    responsibilities: [
      "Develop and maintain mobile applications using the Flutter framework.",
      "Collaborate with cross-functional teams to define, design, and ship new features.",
      "Write clean, maintainable, and efficient code.",
      "Participate in code reviews to ensure code quality and knowledge sharing.",
      "Troubleshoot and debug applications to optimize performance and reliability.",
      "Stay updated with the latest industry trends and technologies related to Flutter and mobile development.",
    ],

    requirements: [
      "Bachelor's degree in Computer Science or a related field (or equivalent experience).",
      "Basic understanding of Flutter and Dart programming.",
      "Familiarity with mobile app development principles and practices.",
      "Understanding of RESTful APIs and third-party libraries.",
      "Knowledge of version control systems such as Git.",
      "Strong problem-solving skills and attention to detail.",
      "Ability to work collaboratively in a team environment.",
      "Good communication skills.",
      "Experience with state management solutions such as Provider, Riverpod, or BLoC is a plus.",
      "Exposure to Agile development methodologies is a plus.",
      "Basic understanding of UI/UX principles is preferred.",
    ],

    overview: {
      category: "Software Development",
      experience: "Junior",
      degree: "Bachelor or Equivalent Experience",
      location: "Addis Ababa, Bole",
    },

    contact: {
      email: "recruitment@ahaz.io",
    },
  },
  {
  status: "closed", // open / closed
  id: "2",
  postDate: "2026-03-04", // Year - Month - Date  
  expireDate: "2026-03-07",
  title: "Junior Backend Developer (CRM Systems)",
  company: "Ahaz Software",
  type: "Full time",
  salary: "Negotiable",
  location: "On Site",
  logo: "/images/logo/logo1.png",
  email: "recruitment@ahaz.io",

  overview: {
    category: "Software Development",
    experience: "1–3 Years",
    degree: "Bachelor or Equivalent Experience",
  },

  livepreview: `#### About the Role

We are building a modular Customer Relationship Management (CRM) and automation platform designed to be reusable across multiple clients. The system includes core CRM modules, segmentation, workflow automation, and a built-in email campaign engine.

You will work closely with the Lead System Architect and collaborate with frontend and full stack developers to implement backend features and business logic.

#### Key Responsibilities

- Implement backend features based on defined architecture.
- Design and maintain relational database schemas.
- Develop and maintain REST or GraphQL APIs.
- Build core CRM modules such as Contacts, Organizations, Deals, Activities, and Tags.
- Implement background jobs and automation triggers.
- Integrate third-party services where required.
- Write clean, maintainable, and well-documented code.

#### Requirements

- 1–3 years of backend development experience.
- Experience working on CRM systems (custom-built or open-source).
- Strong understanding of relational databases and data modeling.
- Experience building business-oriented applications.
- Familiarity with API design and integration.
- Understanding of asynchronous processing or background job systems.
`,
}
];

export default jobsData;
