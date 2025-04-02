import type { Profile } from "./types"

export const mockProfiles: Profile[] = [
  {
    id: "p1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    description:
      "Experienced software engineer with a passion for building scalable web applications. Specializes in React, Node.js, and cloud architecture. Has led multiple teams to deliver successful products.",
    avatar: "/placeholder.svg?height=128&width=128",
    address: {
      street: "123 Tech Avenue",
      city: "San Francisco",
      zipCode: "94105",
      country: "USA",
    },
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    experience: [
      {
        role: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        period: "2020 - Present",
        description: "Leading development of cloud-based solutions and mentoring junior developers.",
      },
      {
        role: "Software Engineer",
        company: "WebSolutions Co.",
        period: "2017 - 2020",
        description: "Developed and maintained multiple client-facing web applications.",
      },
    ],
  },
  {
    id: "p2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 987-6543",
    title: "UX/UI Designer",
    company: "Creative Designs LLC",
    description:
      "Creative designer with an eye for detail and user experience. Specializes in creating intuitive and visually appealing interfaces for web and mobile applications.",
    avatar: "/placeholder.svg?height=128&width=128",
    address: {
      street: "456 Design Boulevard",
      city: "New York",
      zipCode: "10001",
      country: "USA",
    },
    skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "Prototyping"],
    experience: [
      {
        role: "UX/UI Designer",
        company: "Creative Designs LLC",
        period: "2019 - Present",
        description: "Creating user-centered designs for various clients across different industries.",
      },
      {
        role: "Junior Designer",
        company: "ArtWorks Studio",
        period: "2016 - 2019",
        description: "Assisted in designing marketing materials and basic web interfaces.",
      },
    ],
  },
  {
    id: "p3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 456-7890",
    title: "Data Scientist",
    company: "DataMinds Analytics",
    description:
      "Data scientist with expertise in machine learning and statistical analysis. Passionate about turning data into actionable insights and solving complex business problems.",
    avatar: "/placeholder.svg?height=128&width=128",
    address: {
      street: "789 Analytics Drive",
      city: "Boston",
      zipCode: "02108",
      country: "USA",
    },
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "TensorFlow"],
    experience: [
      {
        role: "Data Scientist",
        company: "DataMinds Analytics",
        period: "2018 - Present",
        description: "Developing predictive models and performing data analysis for clients in finance and healthcare.",
      },
      {
        role: "Data Analyst",
        company: "FinTech Solutions",
        period: "2015 - 2018",
        description: "Analyzed financial data and created reports for internal stakeholders.",
      },
    ],
  },
  {
    id: "p4",
    name: "Sarah Rodriguez",
    email: "sarah.rodriguez@example.com",
    phone: "+1 (555) 789-0123",
    title: "Marketing Manager",
    company: "Global Brands Inc.",
    description:
      "Strategic marketing professional with experience in digital marketing, brand management, and campaign development. Skilled in creating marketing strategies that drive growth and engagement.",
    avatar: "/placeholder.svg?height=128&width=128",
    address: {
      street: "321 Marketing Street",
      city: "Chicago",
      zipCode: "60601",
      country: "USA",
    },
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
    experience: [
      {
        role: "Marketing Manager",
        company: "Global Brands Inc.",
        period: "2019 - Present",
        description: "Managing marketing campaigns and overseeing brand strategy for multiple product lines.",
      },
      {
        role: "Marketing Specialist",
        company: "Retail Enterprises",
        period: "2016 - 2019",
        description: "Executed marketing initiatives and assisted in campaign development.",
      },
    ],
  },
  {
    id: "p5",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "+1 (555) 234-5678",
    title: "Product Manager",
    company: "Innovate Solutions",
    description:
      "Product manager with a background in software development. Experienced in leading cross-functional teams and delivering user-centered products that meet business objectives.",
    avatar: "/placeholder.svg?height=128&width=128",
    address: {
      street: "567 Product Lane",
      city: "Seattle",
      zipCode: "98101",
      country: "USA",
    },
    skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping", "Market Research"],
    experience: [
      {
        role: "Product Manager",
        company: "Innovate Solutions",
        period: "2020 - Present",
        description:
          "Leading product development from conception to launch, working with engineering and design teams.",
      },
      {
        role: "Associate Product Manager",
        company: "Tech Startups Co.",
        period: "2017 - 2020",
        description: "Assisted in feature prioritization and gathered user feedback for product improvements.",
      },
    ],
  },
  {
    id: "p6",
    name: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    phone: "+1 (555) 345-6789",
    title: "HR Director",
    company: "Corporate Enterprises",
    description:
      "Human resources professional with expertise in talent acquisition, employee relations, and organizational development. Committed to creating positive workplace cultures and effective HR strategies.",
    avatar: "/placeholder.svg?height=128&width=128",
    address: {
      street: "890 HR Avenue",
      city: "Atlanta",
      zipCode: "30303",
      country: "USA",
    },
    skills: ["Recruitment", "Employee Relations", "Training & Development", "HR Policy", "Conflict Resolution"],
    experience: [
      {
        role: "HR Director",
        company: "Corporate Enterprises",
        period: "2018 - Present",
        description:
          "Overseeing all HR functions and developing strategic initiatives to improve employee engagement and retention.",
      },
      {
        role: "HR Manager",
        company: "Business Solutions Inc.",
        period: "2014 - 2018",
        description: "Managed recruitment processes and handled employee relations issues.",
      },
    ],
  },
]

