require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



app.post("/send", async (req, res) => {
  const { name, email, message, phone, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your Gmail address
      pass: process.env.PASSWORD, // Your Gmail App Password
    },
    host: "smtp.gmail.com",
    port: 465,  // Use 465 for SSL (recommended), or 587 for TLS
    secure: true,
  });

    

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nPhone: ${phone}\nSubject: ${subject}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});


const values = [
  { title: "Innovation", description: "We embrace creativity and strive to innovate continuously, pushing the boundaries to deliver exceptional solutions." },
  { title: "Integrity", description: "Integrity is at the core of everything we do. We maintain transparency, honesty, and ethical practices in all our interactions." },
  { title: "Client-Centric Approach", description: "We prioritize our clients' needs and objectives, ensuring that we exceed their expectations and foster long-term partnerships." },
  { title: "Team Collaboration", description: "We foster a collaborative environment where every team member's expertise is valued, leading to collective success." },
  { title: "Excellence", description: "We are committed to excellence in all aspects of our work, from development to customer support, ensuring the highest quality standards." }
];

app.get("/api/values", (req, res) => {
  res.json(values);
});

// Sample data for AboutCounterSection and counters
const counterData = {
  countries: { start: 0, end: 50, duration: 2000 },
  workingHours: { start: 0, end: 100000, duration: 2000 },
  liveProjects: { start: 0, end: 500, duration: 2000 },
};

const aboutContent = {
  heading: "Our Achievements",
  paragraph:
    "Innovative Software Solutions Tailored to Your Business Needs.",
  description:
    "Welcome to Techinventive Software and Services Private Limited, a leading software company committed to excellence and innovation. As an ISO 9001:2015 and CMMI Level 3 certified organization, we pride ourselves on delivering high-quality, reliable, and cutting-edge solutions to our clients across the globe.",
  additionalContent: [
    "Welcome to Techinventive Software and Services Private Limited, a leading software company committed to excellence and innovation. As an ISO 9001:2015 and CMMI Level 3 certified organization, we pride ourselves on delivering high-quality, reliable, and cutting-edge solutions to our clients across the globe.",
    "Techinventive Software specializes in a wide range of services, including AI, Machine Learning, Blockchain, Game Development, Python, Node.js, Golang, Ruby on Rails, and Drupal. Our team of experienced professionals is dedicated to helping businesses harness the power of technology to drive growth and achieve their goals.",
    "With a strong presence in Delhi NCR, Noida, and Ghaziabad, we serve clients in the USA, UK, and beyond. Our expertise spans across various domains, including custom application development, responsive web designing, app designing, and PSD to HTML conversions.",
    "Our mission is to deliver exceptional software solutions that exceed our clients' expectations. We achieve this through a combination of innovative thinking, technical excellence, and a deep understanding of our clients' needs. Our commitment to quality and customer satisfaction has earned us a reputation as a trusted partner in the tech industry.",
    "Join us on our journey to transform ideas into reality and experience the difference that Techinventive Software can make for your business.",
    "Contact us today to learn more about how we can help you succeed in the digital age."
  ]
};

// API endpoint to fetch the counter data and content
app.get("/api/about", (req, res) => {
  res.json({ counterData, aboutContent });
});

const apartData = {
  heading: "What Sets Us Apart",
  paragraph: "Our Commitment to Excellence: Guiding Principles That Drive Us",
  items: [
    {
      title: "Expert Team",
      description: "Our team comprises highly skilled professionals with extensive experience in [mention relevant fields or technologies]",
      imageUrl: "https://www.techinventive.com/img/people.png",
    },
    {
      title: "Customized Solutions",
      description: "We understand that every business is unique. That's why we tailor our solutions to meet the specific requirements and goals of each client",
      imageUrl: "https://www.techinventive.com/img/bxs_customize.png",
    },
    {
      title: "Agile Methodology",
      description: "We follow an agile development approach, enabling us to adapt quickly to changes, deliver projects efficiently, and maintain high-quality standards",
      imageUrl: "https://www.techinventive.com/img/ic_baseline-work-history.png",
    },
    {
      title: "Continuous Support",
      description: "Our commitment doesn't end with project delivery. We provide ongoing support and maintenance to ensure our clients' success in the long run.",
      imageUrl: "https://www.techinventive.com/img/fluent_person-support-16-filled.png",
    },
  ],
};

// API route
app.get("/api/apart", (req, res) => {
  res.json(apartData);
});

const teamMembers = {
  heading: "Our Team",
  paragraph: "Meet Our Experts",
  items: [
    {
      name: "Gulshan",
      role: "Team Lead",
      image: "https://www.techinventive.com/team/picture-1006260-1439668625.jpg",
    },
    {
      name: "Diksha",
      role: "HR Manager",
      image: "https://www.techinventive.com/team/HR.jpg",
    },
    {
      name: "Surender",
      role: "Account Manager / Sr. Developer",
      image: "https://www.techinventive.com/team/surender.png",
    },
    {
      name: "Saurabh",
      role: "Team Leader",
      image: "https://www.techinventive.com/team/saurabh-panchal.jpg",
    },
    {
      name: "Nitin",
      role: "Sr. Developer",
      image: "https://www.techinventive.com/team/nitin.jpeg",
    },
    {
      name: "Yogendra",
      role: "UI/UX Designer",
      image: "https://www.techinventive.com/team/yogendra-patel.png",
    },
  ],
};

app.get("/api/team", (req, res) => {
  res.json(teamMembers); // ✅ Sending correct JSON structure
});
// Sample portfolio data
const portfolioItems = [
  {
    id: "1",
    image: "https://www.techinventive.com/img/carbon_education.png",
    category: "Ed. Tech",
    alt: "Ed Tech"
  },
  {
    id: "2",
    image: "https://www.techinventive.com/img/fluent_real-estate-20-regular.png",
    category: "Real Estate",
    alt: "Real Estate"
  },
  {
    id: "3",
    image: "https://www.techinventive.com/img/mdi_cart-outline.png",
    category: "Ecommerce",
    alt: "Ecommerce"
  },
  {
    id: "4",
    image: "https://www.techinventive.com/img/mdi_bank-outline.png",
    category: "Banking",
    alt: "Banking"
  },
  {
    id: "5",
    image: "https://www.techinventive.com/img/tabler_news.png",
    category: "News portal",
    alt: "News portal"
  },
  {
    id: "6",
    image: "https://www.techinventive.com/img/tabler_social.png",
    category: "Social Media",
    alt: "Social Media"
  },
  {
    id: "7",
    image: "https://www.techinventive.com/img/streamline_insurance-hand.png",
    category: "Insurance",
    alt: "Insurance"
  },
  {
    id: "8",
    image: "https://www.techinventive.com/img/mingcute_game-2-line.png",
    category: "Gaming",
    alt: "Gaming"
  }
];

// Paragraph content
const paragraph = "Our portfolio showcases a diverse range of projects where we've demonstrated our expertise in delivering innovative software solutions. From developing custom web applications that streamline business processes to creating intuitive mobile apps that engage users on the go, our portfolio reflects our commitment to excellence and client satisfaction. Explore our portfolio to see how we've helped businesses across various industries achieve their goals through tailored software solutions.";

// Portfolio API route
app.get("/api/portfolio", (req, res) => {
  res.json({
    portfolioItems,
    paragraph
  });
});

// Sample portfolio data
const portfolioData = [
  {
    id: 1,
    title: "Stingo CRM",
    category: ["User Interface", "User Experience", "Web", "Mobile"],
    businessChallenge: "Stingo is looking for a solution to track and nurture the lead effectively.",
    solution: "TechInventive offered A CRM tool for tracking their Business leads at affordable cost. The system features drag-and-drop navigation, GPS-enabled field object tracking, call log and recording capabilities, and more.",
    link: "https://www.stingosales.com",
    websiteImages:[
        "https://www.techinventive.com/img/OR7V111%201.png",
    ],
    platformImages: [
      "https://www.techinventive.com/img/ggg (1).png",
      "https://www.techinventive.com/img/ggg (2).png"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/1/devicon_bootstrap.png",
      "https://www.techinventive.com/img/tech/1/skill-icons_php-dark.png",
      "https://www.techinventive.com/img/tech/1/ph_file-sql-fill.png",
      "https://www.techinventive.com/img/tech/1/teenyicons_laravel-solid.png"
    ],
    timeline: "8 months",
    team: "6 members"
  },
  {
    id: 2,
    title: "TrackIT NewsUSA",
    category: ["User Interface", "User Experience", "Mobile"],
    businessChallenge: "Client already has a website News portal but was looking for a tool to track various articles and research communities.",
    solution: "Techinventive Team developed an Article Tracking System with user-friendly interface, powerful search capabilities, and valuable insights.",
    link: "https://www.newsflow.newsusa.com",
    websiteImages:[
      "https://www.techinventive.com/img/tech/2/Frame%2087.png",
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/2/ph_desktop-fill.png",
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/2/nonicons_node-16.png",
      "https://www.techinventive.com/img/tech/2/mdi_language-ruby-on-rails.png",
      "https://www.techinventive.com/img/tech/2/akar-icons_postgresql-fill.png",
      "https://www.techinventive.com/img/tech/2/teenyicons_react-outline.png"
    ],
    timeline: "10 months",
    team: "4 members"
  },
  {
    id: 3,
    title: "INTERVENE (LMS)",
    category: ["User Interface", "LMS", "User Experience", "Web", "Mobile"],
    businessChallenge: "Client was looking for an application or platform used by educational professionals to create, manage, and deliver online courses and training programs.",
    solution: "We offered LMS (Learning Management System) for our client. This portal engages teachers and students by offering online classes and assessments.",
    link: "www.intervenk12.com",
    websiteImages: [
      "https://www.techinventive.com/img/tech/3/OR7V111 2.png"
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/3/ph_desktop-fill.png", 
      "https://www.techinventive.com/img/tech/3/clarity_mobile-solid.png"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/3/nonicons_node-16.png",
      "https://www.techinventive.com/img/tech/3/teenyicons_react-outline.png",
      "https://www.techinventive.com/img/tech/3/skill-icons_php-dark.png",
      "https://www.techinventive.com/img/tech/3/teenyicons_laravel-solid.png"
    ],
    timeline: "8",
    team: "5",
  },
  {
    id: 4,
    title: "DSCI",
    category: ["User Interface", "User Experience", "Web", "Mobile"],
    businessChallenge: "DSCI wanted to redesign and redevelop their Drupal 7 website and migrate to Drupal 9. Looking for React JS as frontend technology and Drupal 9 backend.",
    solution: "TechInventive redesigned the website from scratch, redeveloped their business website, and migrated it to Drupal 9 with React JS frontend technology.",
    link: "www.dsci.in",
    websiteImages: [
      "https://www.techinventive.com/img/tech/4/OR7V111 2.png"
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/4/ph_desktop-fill.png", 
      "https://www.techinventive.com/img/tech/4/clarity_mobile-solid.png"
    ],
    
    techStackImages: [
      "https://www.techinventive.com/img/tech/4/devicon_bootstrap.png",
      "https://www.techinventive.com/img/tech/4/bxl_drupal.png",
      "https://www.techinventive.com/img/tech/4/teenyicons_react-outline.png",
      "https://www.techinventive.com/img/tech/4/ph_file-sql-fill.png"
    ],
    timeline: "10",
    team: "6"
  },
  {
    id: 5,
    title: "EXCLUSIFE",
    category: ["User Interface", "User Experience", "Web", "Mobile"],
    businessChallenge: "Looking for a B2B marketing platform for offline retailers to generate more business and improve their performance.",
    solution: "Team developed a marketing platform for improving business performance of retailers via CRM, marketing automation, and targeting customers.",
    link: "www.exclusife.com",
    websiteImages: [
      "https://www.techinventive.com/img/tech/5/OR7V111 1.png"
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/5/ph_desktop-fill.png", 
      "https://www.techinventive.com/img/tech/5/clarity_mobile-solid.png"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/5/devicon_bootstrap.png",
      "https://www.techinventive.com/img/tech/5/ph_file-sql-fill.png",
      "https://www.techinventive.com/img/tech/5/nonicons_node-16.png",
      "https://www.techinventive.com/img/tech/5/teenyicons_react-outline.png",
      "https://www.techinventive.com/img/tech/5/skill-icons_php-dark.png"
    ],
    timeline: "6",
    team: "6"
  },
  {
    id: 6,
    title: "Localeye",
    category: ["B2B", "User Interface", "Desktop", "User Experience"],
    businessChallenge: "Client was looking for B2B platform for their Local area where Buyer and seller can list their services",
    solution: "To provide a wide range of features such as ad posting, search functionality, user verification, and monetization options, it can cater to a diverse user base and serve as a valuable online marketplace. This project has the potential to connect buyers and sellers, promote local businesses, and generate revenue through premium listings and advertisements.",
    link: "www.localeye.in",
    websiteImages: [
      "https://www.techinventive.com/img/tech/6/OR7V111 2.png"
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/6/ph_desktop-fill.png", 
      "https://www.techinventive.com/img/tech/6/clarity_mobile-solid.png"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/6/nonicons_node-16.png", 
      "https://www.techinventive.com/img/tech/6/teenyicons_react-outline.png", 
      "https://www.techinventive.com/img/tech/6/mdi_language-ruby-on-rails.png", 
      "https://www.techinventive.com/img/tech/6/akar-icons_postgresql-fill.png"
    ],
    timeline: "8",
    team: "5"
    
  },
  {
    id: 7,
    title: "SKAI",
    category: ["User Interface", "Web Development", "User Experience", "CMS"],
    businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
    solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
    link: "www.skai.org.au",
    websiteImages: [
      "https://www.techinventive.com/img/tech/7/OR7V111 2.png"
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/7/ph_desktop-fill.png", 
      "https://www.techinventive.com/img/tech/7/clarity_mobile-solid.png"
    ],
    
    techStackImages: [
      "https://www.techinventive.com/img/tech/7/nonicons_node-16.png", 
      "https://www.techinventive.com/img/tech/7/devicon_bootstrap.png", 
      "https://www.techinventive.com/img/tech/7/bxl_drupal.png", 
      "https://www.techinventive.com/img/tech/7/ph_file-sql-fill.png"
    ],
    timeline: "6",
    team: "6",
  },
  {
    id: 8,
    title: "Universe",
    category: ["User Interface", "User Experience", "Mobile"],
    businessChallenge: "Client already have a website, But he was looking for a better design and UX improvements.",
    solution: "To improve the overall design and user experience of the website.",
    link: "https://alphauniverse.sony-asia.com/",
    websiteImages: [
      "https://www.techinventive.com/img/tech/8/OR7V111 1.png"
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/8/ph_desktop-fill.png", 
      "https://www.techinventive.com/img/tech/8/clarity_mobile-solid.png"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/8/nonicons_node-16.png", 
      "https://www.techinventive.com/img/tech/8/fa-brands_app-store-ios.png", 
      "https://www.techinventive.com/img/tech/8/formkit_android.png", 
      "https://www.techinventive.com/img/tech/8/teenyicons_react-outline.png"
    ],
    timeline: "8",
    team: "5",
  },
  {
    id: 9,
    title: 'Silver Stonks',
    category: ['User Interface', 'Web Development', 'User Experience', 'CMS'],
    businessChallenge: 'Looking for an informative website for Healthcare professionals using CMS',
    solution: 'Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.',
    link: 'https://www.skai.org.au',
    websiteImages: [
      'https://www.techinventive.com/img/silver_stonk.png'
    ],
    platformImages: [
      'https://www.techinventive.com/img/tech/9/ph_desktop-fill.svg', 
      'https://www.techinventive.com/img/tech/9/clarity_mobile-solid.svg'
    ],
    techStackImages: [
      'https://www.techinventive.com/img/tech/9/nonicons_node-16.svg', 
      'https://www.techinventive.com/img/tech/9/mdi_language-ruby-on-rails.svg', 
      'https://www.techinventive.com/img/tech/9/akar-icons_postgresql-fill.svg', 
      'https://www.techinventive.com/img/tech/9/teenyicons_react-outline.svg'
    ],
    timeline: '6',
    team: '6'
  },
  {
    id: 10,
    title: 'CarbonPay',
    category: ['User Interface', 'User Experience', 'Mobile'],
    businessChallenge: 'Client already have a website, But he was looking for a better design and UX improvements.',
    solution: '',
    link: 'https://www.carbonpay.io//',
    websiteImages: [
      'https://www.techinventive.com/img/tech/10/carbonpay.png'
    ],
    platformImages: [
      'https://www.techinventive.com/img/tech/10/ph_desktop-fill.svg', 
      'https://www.techinventive.com/img/tech/10/clarity_mobile-solid.svg'
    ],
    techStackImages: [
      'https://www.techinventive.com/img/tech/10/Drupal.svg', 
      'https://www.techinventive.com/img/tech/10/PHP.svg', 
      'https://www.techinventive.com/img/tech/10/HTML.svg', 
      'https://www.techinventive.com/img/tech/10/JS.svg'
    ],
    timeline: '18',
    team: '6'
  },
  {
    id: 11,
    title: 'Debrandweer',
    category: ['User Interface', 'Web Development', 'User Experience', 'CMS'],
    businessChallenge: 'Looking for an informative website for Healthcare professionals using CMS',
    solution: 'Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.',
    link: 'https://debrandweer.be/nl/brandweercongres-2024',
    websiteImages: [
      'https://www.techinventive.com/img/tech/11/debrandweer.png'
    ],
    platformImages: [
      'https://www.techinventive.com/img/tech/11/desktop.svg', 
      'https://www.techinventive.com/img/tech/11/mobile.svg'
    ],
    techStackImages: [
      'https://www.techinventive.com/img/tech/11/PHP.svg', 
      'https://www.techinventive.com/img/tech/11/HTML.svg', 
      'https://www.techinventive.com/img/tech/11/Drupal.svg', 
      'https://www.techinventive.com/img/tech/11/JS.svg'
    ],
    timeline: '6',
    team: '6'
  },
  {
    id: 12,
    title: "WEX ESSO CARD",
    category: ["User Interface", "User Experience", "Mobile"],
    businessChallenge: "Client already have a website, But he was looking for a better design and UX improvements.",
    link: "https://www.wex.essocard.com//",
    websiteImages: [
      'https://www.techinventive.com/img/tech/12/WEX%20ESSO%20CARD.png'
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/12/desktop.svg",
      "https://www.techinventive.com/img/tech/12/mobile.svg"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/12/Drupal.svg",
      "https://www.techinventive.com/img/tech/12/PHP.svg",
      "https://www.techinventive.com/img/tech/12/JS.svg",
      "https://www.techinventive.com/img/tech/12/HTML.svg"
    ],
    timeline: 12,
    teamSize: 8,
  },
  {
    id: 13,
    title: "Monotype",
    category: ["User Interface", "Web Development", "User Experience", "CMS"],
    businessChallenge: "Looking for an informative website for Healthcare professionals using CMS",
    solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
    link: "https://www.monotype.com//",
    websiteImages: [
      'https://www.techinventive.com/img/tech/13/Monotype..png'
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/13/desktop.svg",
      "https://www.techinventive.com/img/tech/13/mobile.svg"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/13/PHP.svg",
      "https://www.techinventive.com/img/tech/13/HTML.svg",
      "https://www.techinventive.com/img/tech/13/Drupal.svg",
      "https://www.techinventive.com/img/tech/13/JS.svg"
    ],
    timeline: 18,
    teamSize: 6,
  },
  {
    id: 14,
    title: "Haas Automation Inc",
    category: ["User Interface", "User Experience", "Mobile"],
    businessChallenge: "Client already has a website, But he was looking for a better design and UX improvements.",
    link: "https://www.haascnc.com/",
    websiteImages: [
      'https://www.techinventive.com/img/tech/14/Haas Automation Inc.png'
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/14/desktop.svg",
      "https://www.techinventive.com/img/tech/14/mobile.svg"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/14/Drupal.svg",
      "https://www.techinventive.com/img/tech/14/PHP.svg",
      "https://www.techinventive.com/img/tech/14/JS.svg",
      "https://www.techinventive.com/img/tech/14/HTML.svg"
    ],
    timeline: 12,
    teamSize: 8,
  },
  {
    id: 15,
    title: "Culture trip",
    category: ["User Interface", "Web Development", "User Experience", "CMS"],
    businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
    solution: "Designed & Developed a Website from Scratch using the latest Drupal Version for Healthcare professionals and community members to exchange information about vaccinations.",
    link: "https://apps.apple.com/in/app/culture-trip-travel-explore/id1146832951?platform=iphone",
    websiteImages: [
      'https://www.techinventive.com/img/tech/15/Culture trip.png'
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/15/mobile.svg"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/15/Drupal.svg",
      "https://www.techinventive.com/img/tech/15/PHP.svg",
      "https://www.techinventive.com/img/tech/15/JS.svg",
      "https://www.techinventive.com/img/tech/15/HTML.svg"
    ],
    timeline: 18,
    team: 6 ,
  },
  {
    id: 16,
    title: "Pantelope",
    category: ["User Interface", "User Experience", "Mobile"],
    businessChallenge: "Client already have a website, But he was looking for a better design and UX improvements.",
    link: "https://www.pantelope.com/",
    websiteImages: [
      'https://www.techinventive.com/img/tech/16/pantelope.png'
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/16/desktop.svg",
      "https://www.techinventive.com/img/tech/16/mobile.svg"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/16/js.svg", 
      "https://www.techinventive.com/img/tech/16/postgresql.svg", 
      "https://www.techinventive.com/img/tech/16/ruby.svg", 
      "https://www.techinventive.com/img/tech/16/react.svg"
    ],
    timeline: 12,
    team: 8 ,
  },
  {
    id: 16,
    title: "MarketSim",
    category: ["User Interface", "Web Development", "User Experience", "CMS"],
    businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
    solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
    link: "https://apps.apple.com/us/app/marketsim/id1120425128?platform=iphone",
    websiteImages: [
      'https://www.techinventive.com/img/tech/17/MarketSim.png'
    ],
    platformImages: [
      "https://www.techinventive.com/img/tech/17/tablet.svg",
      "https://www.techinventive.com/img/tech/17/mobile.svg"
    ],
    techStackImages: [
      "https://www.techinventive.com/img/tech/17/PHP.svg" ,
      "https://www.techinventive.com/img/tech/17/HTML.svg" ,
      "https://www.techinventive.com/img/tech/17/Drupal.svg", 
      "https://www.techinventive.com/img/tech/17/JS.svg"
    ],
    timeline: 18,
    team: 6 ,
  },
  {
    id: 18,
    title: "Man Made Customs",
    category: ["User Interface", "User Experience", "Mobile"],
    businessChallenge: "Client already have a website, But he was looking for a better design and UX improvements.",
    solution: "",
    link: "https://www.manmadecustoms.com",
    websiteImages: [
     'https://www.techinventive.com/img/tech/18/man made customs.png'
    ],
    platformImages: [
        "https://www.techinventive.com/img/tech/18/desktop.svg",
        "https://www.techinventive.com/img/tech/18/mobile.svg"
    ],
    techStackImages: [
        "https://www.techinventive.com/img/tech/18/js.svg", 
        "https://www.techinventive.com/img/tech/18/postgresql.svg", 
        "https://www.techinventive.com/img/tech/18/ruby.svg", 
        "https://www.techinventive.com/img/tech/18/react.svg"
    ],
    timeline: 12,
    team: 8 ,                    
},    
{
    id: 19,
    title: "Times Internet",
    category: ["User Interface", "Web Development", "User Experience", "Mobile"],
    businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
    solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
    link: "https://timesinternet.in/",
    websiteImages: [
    'https://www.techinventive.com/img/tech/19/Times Internet.png',
    ],
    platformImages: [
        "https://www.techinventive.com/img/tech/19/desktop.svg",
        "https://www.techinventive.com/img/tech/19/mobile.svg"
    ],
    techStackImages: [
        "https://www.techinventive.com/img/tech/19/ruby.svg", 
        "https://www.techinventive.com/img/tech/19/react.svg", 
        "https://www.techinventive.com/img/tech/19/postgresql.svg"
    ],
    timeline: 18,
    team: 6 , 
},
{
    id: 20,
    title: "Palm Springs Small Hotels",
    category: ["User Interface", "User Experience", "Mobile" ],
    businessChallenge: "Client already have a website, But he was looking for a better design and UX improvements.",
    solution: "",
    link: "https://www.palmspringspreferredsmallhotels.com/",
    websiteImages: [
        "https://www.techinventive.com/img/tech/20/palm springs small hotels.png"
    ],
    platformImages: [
        "https://www.techinventive.com/img/tech/20/desktop.svg",
        "https://www.techinventive.com/img/tech/20/mobile.svg"
    ],
    techStackImages: [
        "https://www.techinventive.com/img/tech/20/js.svg", 
        "https://www.techinventive.com/img/tech/20/postgresql.svg", 
        "https://www.techinventive.com/img/tech/20/ruby.svg", 
        "https://www.techinventive.com/img/tech/20/react.svg"
    ],
    timeline: 12,
    team: 8 , 
},
{
  id: 21,
  title: "Datics",
  category: ["User Interface", "Web Development", "User Experience", "CMS"],
  businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
  solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
  link: "https://datics.ai/",
  websiteImages: [
    'https://www.techinventive.com/img/tech/21/Datics.png',
  ],
  platformImages: [
      "https://www.techinventive.com/img/tech/21/desktop.svg",
      "https://www.techinventive.com/img/tech/21/mobile.svg"
  ],
  techStackImages: [
      "https://www.techinventive.com/img/tech/21/ruby.svg", 
      "https://www.techinventive.com/img/tech/21/react.svg", 
      "https://www.techinventive.com/img/tech/21/postgresql.svg", 
      "https://www.techinventive.com/img/tech/21/JS.svg"
  ],
  timeline: 18,
  team: 6 , 
},
{
  id: 22,
  title: "old time meat & deli",
  category: ["User Interface", "User Experience", "Mobile"],
  businessChallenge: "Client already have a website, But he was looking for a better design and UX improvements.",
  solution: "",
  link: "https://oldtimemeatanddeli.com/",
  websiteImages: [
  'https://www.techinventive.com/img/tech/22/debrandweer.png',
  ],
  platformImages: [
      "https://www.techinventive.com/img/tech/22/desktop.svg",
      "https://www.techinventive.com/img/tech/22/mobile.svg"
  ],
  techStackImages: [
      "https://www.techinventive.com/img/tech/22/js.svg", 
      "https://www.techinventive.com/img/tech/22/postgresql.svg", 
      "https://www.techinventive.com/img/tech/22/ruby.svg", 
      "https://www.techinventive.com/img/tech/22/react.svg"
  ],
  timeline: 12,
  team: 8, 
},
{
  id: 23,
  title: "Blueair",
  category: ["User Interface", "Web Development", "User Experience", "CMS"],
  businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
  solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
  link: "https://www.blueair.com/in",
  websiteImages: [
     'https://www.techinventive.com/img/tech/23/debrandweer.png',
  ],
  platformImages: [
      "https://www.techinventive.com/img/tech/23/desktop.svg",
      "https://www.techinventive.com/img/tech/23/mobile.svg"
  ],
  techStackImages: [
      "https://www.techinventive.com/img/tech/23/ruby.svg", 
      "https://www.techinventive.com/img/tech/23/react.svg", 
      "https://www.techinventive.com/img/tech/23/postgresql.svg", 
  ],
  timeline: 18,
  team: 6 , 
},
{
  id: 24,
  title: "livingston lures",
  category: ["User Interface", "User Experience", "Mobile"],
  businessChallenge: "Client already have a website, But he was looking for a better design and UX improvements.",
  solution: "",
  link: "https://www.livingstonlures.com/",
  websiteImages: [
  'https://www.techinventive.com/img/tech/24/debrandweer.png',
  ],
  platformImages: [
  "https://www.techinventive.com/img/tech/24/desktop.svg",
  "https://www.techinventive.com/img/tech/24/mobile.svg"
  ],
  techStackImages: [
      "https://www.techinventive.com/img/tech/24/js.svg", 
      "https://www.techinventive.com/img/tech/24/postgresql.svg", 
      "https://www.techinventive.com/img/tech/24/ruby.svg", 
      "https://www.techinventive.com/img/tech/24/react.svg"
  ],
  timeline: 12,
  team: 8 , 
}
];

// API route to fetch portfolio data
app.get('/api/portfoliodata', (req, res) => {
  res.json({ portfolioDatas: portfolioData });
});

const blogs = [
  {
    id: 1,
    title: "Drupal Revolution",
    date: "April 24, 2024",
    image: "https://www.techinventive.com/img/blog_your-teams-technical.png",
    imageLarge:"https://www.techinventive.com/img/blog_your-teams-technical-guide-to-drupal-code-reviews.png",
    description: "Explore the Latest Updates Shaping the Future of Web Development",
    tags: ["Drupal"],
    article: {  // ❌ Changed from an array [] to an object {}
      introduction: "In the world of web development, Drupal has long been a revolutionary force. With its open-source nature and powerful capabilities, Drupal continues to evolve, shaping the future of web development. In this article, we'll explore the latest updates in Drupal that are driving this revolution forward.",
      sections: [  // ✅ Correctly formatted array
        {
          heading: "What is Drupal?",
          content: "Drupal is a free, open-source content management system (CMS) that powers millions of websites and applications. It is known for its flexibility, scalability, and security, making it a popular choice for organizations of all sizes."
        },
        {
          heading: "The Evolution of Drupal",
          content: "Over the years, Drupal has undergone several major updates that have transformed its capabilities. The latest version, Drupal 9, was released in June 2020 and marked a significant milestone in the evolution of the platform."
        },
        {
          heading: "Drupal 9: The Game-Changer",
          content: "Drupal 9 was more than just an update; it was a game-changer for the platform. It brought with it a host of new features and improvements, including:",
          list: [
            "Improved Performance: Drupal 9 is faster and more efficient than its predecessors, thanks to improvements in caching and database queries.",
            "Enhanced Security: Security has always been a top priority for Drupal, and Drupal 9 is no exception. It comes with the latest security updates and best practices to keep your website safe.",
            "Better Accessibility: Drupal 9 has improved accessibility features, making it easier for people with disabilities to use your website.",
            "Modern Development Tools: Drupal 9 has embraced modern development tools and practices, making it easier for developers to build and maintain Drupal websites."
          ]
        },
        {
          heading: "The Future of Drupal",
          content: 'Looking ahead, the future of Drupal looks bright. The community behind Drupal is active and vibrant, constantly working on new updates and improvements to the platform. Some of the key areas of focus for the future of Drupal include:',
          list: [
            "Headless Drupal: Headless Drupal is a new approach to web development that decouples the front-end presentation layer from the back-end content management system. This allows for greater flexibility and scalability in building websites and applications.",
            "Artificial Intelligence: Drupal is exploring ways to integrate artificial intelligence (AI) into the platform, opening up new possibilities for personalized content and user experiences.",
            "Blockchain Integration: There is also talk of integrating blockchain technology into Drupal, which could enhance security and transparency in content management"
          ]
        },
        {
          heading: "Conclusion",
          content: "Drupal continues to be at the forefront of web development, driving innovation and pushing the boundaries of what is possible. With its latest updates and future plans, Drupal is poised to shape the future of web development for years to come. Whether you're a developer, designer, or business owner, Drupal offers a powerful and flexible platform for building your online presence."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Revolutionizing the Web",
    date: "April 24, 2024",
    image: "https://www.techinventive.com/img/1690864573442.png",
    imageLarge:"https://www.techinventive.com/img/blog_your-teams-technical-guide-to-drupal-code-reviews.png",
    description: "AI's Role in Modern Development",
    tags: ["Revolutionizing"],
    article: {  // ❌ Changed from an array [] to an object {}
      introduction: "In the fast-paced world of technology, Artificial Intelligence (AI) is playing a pivotal role in revolutionizing web development. AI is not just a buzzword; it's a transformative technology that is reshaping how websites are created, managed, and optimized. From streamlining development processes to enhancing user experiences, AI is at the forefront of modern web development. This article explores the various ways in which AI is revolutionizing the web and how developers can leverage this technology to create more dynamic and engaging websites.",
      sections: [  // ✅ Correctly formatted array
        {
          heading: "Understanding AI in Web Development",
          content: "AI in web development refers to the use of artificial intelligence technologies, such as machine learning and natural language processing, to enhance the development process and improve website functionality. AI can automate repetitive tasks, analyze data to make informed decisions, and personalize user experiences. By integrating AI into web development, developers can create smarter, more efficient websites that deliver a superior user experience."
        },
        {
          heading: "Streamlining Development Processes",
          content: "One of the key ways AI is revolutionizing web development is by streamlining development processes. AI-powered tools and platforms can automate various tasks, such as code generation, testing, and deployment, reducing the time and effort required to build and maintain websites. This allows developers to focus more on creative aspects of development, such as design and user experience, leading to faster and more efficient development cycles."
        },
        {
          heading: "Enhancing User Experiences",
          content: "AI is also transforming user experiences on the web. AI-powered chatbots and virtual assistants can provide personalized assistance to users, helping them find information, make purchases, and navigate websites more easily. AI can also analyze user behavior and preferences to deliver tailored content and recommendations, making the browsing experience more engaging and relevant."
        },
        {
          heading: "Improving Website Performance",
          content: "Another area where AI is making a significant impact is in improving website performance. AI can analyze vast amounts of data to identify trends and patterns, helping developers optimize websites for speed, responsiveness, and SEO. By making websites more efficient and user-friendly, AI can help businesses attract more visitors and drive conversions."
        },
        {
          heading: "Leveraging AI in Modern Development",
          content: "To leverage AI in modern web development, developers can use a variety of tools and technologies. Machine learning frameworks, such as TensorFlow and PyTorch, can be used to build AI-powered features, such as image recognition and natural language processing. AI-powered content management systems, such as WordPress with AI plugins, can help developers create and manage content more effectively."
        },
        {
          heading: "Conclusion",
          content: "AI is revolutionizing web development by streamlining processes, enhancing user experiences, and improving website performance. By leveraging AI technologies, developers can create smarter, more efficient websites that deliver superior user experiences. As AI continues to evolve, its role in web development will only become more significant, shaping the future of the web for years to come."
        }
      ]
    }
  },
  {
    id: 3,
    title: "App Development",
    date: "April 24, 2024",
    image: "https://www.techinventive.com/img/app-development-banner.png",
    imageLarge:"https://www.techinventive.com/img/The-Best-Mobile-App.png",
    description: "The Ultimate Guide to Choosing the Best App Development Service for Your Business",
    tags: ["AI & ML"],
    article: {  // ❌ Changed from an array [] to an object {}
      introduction: "Are you ready to take your business to the next level with a mobile app? Choosing the right app development service is crucial for the success of your project. With so many options available, it can be overwhelming to make a decision. This ultimate guide will help you navigate the process and find the best app development service for your business.",
      sections: [
        {
          heading: "1. Define Your Requirements",
          content: "Before you start looking for an app development service, it's important to define your requirements. What are the goals of your app? Who is your target audience? What features do you need? By clearly defining your requirements, you'll be able to find a development service that can meet your needs."
        },
        {
          heading: "2. Research App Development Companies",
          content: "Once you've defined your requirements, it's time to start researching app development companies. Look for companies that have experience in your industry and have a strong portfolio of successful projects. Read reviews and testimonials to get an idea of their reputation and reliability."
        },
        {
          heading: "3. Consider Your Budget",
          content: "Budget is an important factor to consider when choosing an app development service. While you don't want to sacrifice quality for cost, you also don't want to overspend. Look for a company that offers competitive pricing and can work within your budget."
        },
        {
          heading: "4. Evaluate Their Expertise",
          content: "When choosing an app development service, it's important to evaluate their expertise. Do they have experience developing apps similar to yours? What technologies do they use? Are they up-to-date with the latest trends and best practices in app development?"
        },
        {
          heading: "5. Check Their Communication Skills",
          content: "Communication is key when working with an app development service. Make sure they are responsive to your inquiries and are able to clearly communicate their ideas and suggestions. A good development service will keep you updated on the progress of your project and address any concerns you may have."
        },
        {
          heading: "6. Review Their Portfolio",
          content: "Before making a decision, review the portfolio of the app development service. Look for projects that are similar to yours in terms of complexity and functionality. This will give you an idea of the quality of their work and their ability to deliver results."
        },
        {
          heading: "7. Ask for References",
          content: "Don't hesitate to ask for references from past clients. This will give you an idea of the app development service's reputation and reliability. Contacting references will also give you the opportunity to ask specific questions about their experience working with the company."
        },
        {
          heading: "8. Consider Their Support and Maintenance Services",
          content: "Once your app is developed, you'll need ongoing support and maintenance services. Consider whether the app development service offers these services and what their pricing structure is. A company that offers comprehensive support and maintenance will ensure that your app stays up-to-date and functional."
        },
        {
          heading: "9. Look for Transparency",
          content: "Transparency is important when choosing an app development service. Make sure the company is upfront about their pricing, timeline, and process. A transparent development service will provide you with regular updates and be honest about any challenges they encounter."
        },
        {
          heading: "10. Trust Your Instincts",
          content: "Finally, trust your instincts when choosing an app development service. If something doesn't feel right, it's okay to walk away. It's important to choose a company that you feel comfortable working with and that you trust to deliver results."
        },
        {
          heading: "Conclusion",
          content: "In conclusion, choosing the best app development service for your business is a crucial decision that should not be taken lightly. By defining your requirements, researching companies, considering your budget, evaluating expertise, checking communication skills, reviewing portfolios, asking for references, considering support and maintenance services, looking for transparency, and trusting your instincts, you can find a development service that meets your needs and helps you achieve your goals."
        }
      ]      
    }
  },
  {
    id: 4,
    title: "Python Service",
    date: "May 27, 2024",
    image: "https://www.techinventive.com/img/python-development-services.png",
    imageLarge:"https://www.techinventive.com/img/python-development.png",
    description: "In today's fast-paced digital landscape, businesses must leverage cutting-edge technologies to stay ahead of the curve.",
    tags: ["Python"],
    article: {  // ❌ Changed from an array [] to an object {}
      introduction: "In today's fast-paced digital landscape, businesses must leverage cutting-edge technologies to stay ahead of the curve. Python, a versatile and powerful programming language, has emerged as a game-changer for enterprises across various industries. At Techinventive Software, a premier Python company in Delhi, we harness the full potential of Python to revolutionize your business operations. Let's explore how Python services can drive growth, efficiency, and innovation for your organization.",
      sections: [  // ✅ Correctly formatted array
        {
          heading: "Streamlining Business Processes",
          content: "Python's simplicity and readability make it an ideal choice for developing automation scripts and tools. By automating repetitive and time-consuming tasks, Python can significantly reduce operational costs and free up your team to focus on strategic initiatives. For instance, Python can automate data entry, report generation, and other routine processes, enhancing productivity and accuracy."
        },
        {
          heading: "Enhancing Data Analysis and Decision-Making",
          content: "In the era of big data, businesses need robust data analysis capabilities to make informed decisions. Python's extensive libraries, such as Pandas, NumPy, and Matplotlib, enable seamless data manipulation, analysis, and visualization. Techinventive Software, a leading Python development company, leverages these tools to provide actionable insights, helping you make data-driven decisions that propel your business forward."
        },
        {
          heading: "Developing Custom Applications",
          content: "One of the standout features of Python is its flexibility, which allows developers to create custom applications tailored to your specific business needs. Whether you require a customer relationship management (CRM) system, an enterprise resource planning (ERP) solution, or a specialized web application, Python can deliver. Our team at Techinventive Software excels in developing scalable and secure applications that enhance your operational efficiency and customer engagement."
        },
        {
          heading: "Integrating Systems and APIs",
          content: "Modern businesses often rely on multiple software systems and services. Integrating these disparate systems can be a daunting task. Python simplifies this process with its extensive support for various APIs and its ability to seamlessly connect different technologies. As a top Python company in Delhi, Techinventive Software ensures smooth integration of your existing systems, facilitating seamless data flow and improved interoperability."
        },
        {
          heading: "Boosting Web Development",
          content: "Python's web frameworks, such as Django and Flask, are renowned for their efficiency and scalability. These frameworks provide the tools needed to build robust, secure, and high-performance web applications. Our Python services at Techinventive Software include end-to-end web development, from conceptualization to deployment, ensuring a strong online presence for your business."
        },
        {
          heading: "Ensuring Cybersecurity",
          content: "With the increasing threat of cyberattacks, businesses must prioritize cybersecurity. Python offers various libraries and frameworks, such as PyCrypto and Django Security, to develop secure applications and protect sensitive data. At Techinventive Software, we incorporate the best security practices in our Python development processes, safeguarding your business against potential threats."
        },
        {
          heading: "Enhancing Machine Learning and AI Capabilities",
          content: "Python is the go-to language for machine learning and artificial intelligence (AI) development. Its libraries, such as TensorFlow, Keras, and Scikit-learn, provide the tools necessary to build intelligent systems. Whether it's predictive analytics, natural language processing, or image recognition, Techinventive Software leverages Python to integrate AI capabilities into your business operations, driving innovation and competitive advantage."
        },
        {
          heading: "Conclusion",
          content: "Python's versatility and power make it an invaluable asset for modern businesses. From automation and data analysis to custom application development and cybersecurity, Python services can transform your business operations, enhancing efficiency, security, and innovation. As a premier Python development company, Techinventive Software is committed to delivering top-notch Python solutions that align with your business goals. Partner with us and unlock the full potential of Python to propel your business to new heights. Embrace the future of business with Techinventive Software, your trusted Python company in Delhi, India."
        }
      ]
    }
  },
  {
    id: 5,
    title: "Your Trusted Drupal Partner in India",
    date: "May 03, 2024",
    image: "https://www.techinventive.com/img/white-label-drupal_0.png",
    imageLarge:"https://www.techinventive.com/img/white-drupal.png",
    description: "When it comes to building robust, scalable, and highly customizable websites",
    tags: ["Trusted Partner"],
    article: {  // ❌ Changed from an array [] to an object {}
      introduction: "When it comes to building robust, scalable, and highly customizable websites, Techinventive Software stands out as a leading Drupal development company in India. Located in the heart of Delhi, we specialize in delivering top-notch Drupal development services tailored to meet the unique needs of our clients. At Techinventive, we understand that every business has its own set of requirements. Our team of expert Drupal developers is equipped with the skills and experience to create dynamic, feature-rich websites that drive engagement and growth. Whether you need a simple blog or a complex e-commerce platform, our Drupal development services in Delhi, India, are designed to bring your vision to life",
      sections: [  // ✅ Correctly formatted array
        {
          heading: "Why choose Techinventive as your Drupal partner? Here are a few reasons:",
          content: ""
        },
        {
          heading: "1. Expertise and Experience",
          content: "Our developers are proficient in the latest Drupal technologies and trends. We have successfully delivered numerous projects across various industries."
        },
        {
          heading: "2. Customized Solutions",
          content: "We believe in offering personalized solutions that align with your business goals. Our team works closely with you to understand your requirements and deliver a product that exceeds your expectations."
        },
        {
          heading: "3. Quality Assurance",
          content: "At Techinventive, quality is our top priority. We follow stringent testing protocols to ensure your website is free from bugs and performs seamlessly across all devices."
        },
        {
          heading: "4. Timely Delivery",
          content: "We value your time. Our streamlined processes and efficient project management ensure that we deliver your project on time, every time."
        },
        {
          heading: "5. Affordable Pricing",
          content: "We offer competitive pricing without compromising on quality. Our goal is to provide you with the best value for your investment."
        },
        {
          heading: "Conclusion",
          content: "Ready to take your website to the next level? Hire Drupal developers from Techinventive Software and experience the difference. Our team is dedicated to providing you with exceptional Drupal development services that set you apart from the competition."
        }
      ]
    }
  },
  {
    id: 6,
    title: "Leading AI Development",
    date: "JUN 12, 2024",
    image: "https://www.techinventive.com/img/Power-of-AI-for-Your-Business.png",
    imageLarge:"https://www.techinventive.com/img/Harnessing-the-Power-of-AI-for-Your-Business.png",
    description: "In the dynamic landscape of AI development",
    tags: ["AI Development Services"],
    article: {  // ❌ Changed from an array [] to an object {}
      introduction: "In the dynamic landscape of AI development, businesses strive to harness the power of artificial intelligence to innovate, optimize operations, and gain a competitive edge. As the demand for sophisticated AI solutions grows, the need for a reliable AI service provider becomes paramount. In this context, Techinventive Software emerges as a beacon of excellence, delivering unparalleled AI products and services in Delhi, India. Our expertise and commitment to quality make us the go-to AI company in Delhi, India for organizations seeking transformative AI solutions.",
      sections: 
      [
        {
          heading: "Unmatched Expertise in AI Development",
          content: "Techinventive Software boasts a team of highly skilled and experienced AI developers who excel in crafting custom AI solutions tailored to the unique needs of our clients. Our developers are proficient in cutting-edge technologies and frameworks, ensuring that our solutions are not only innovative but also robust and scalable. Whether it’s developing intelligent chatbots, predictive analytics systems, or automated decision-making tools, we have the expertise to deliver top-notch AI products that drive tangible business results."
        },
        {
          heading: "AI Consulting",
          content: "Our AI consulting services help businesses identify opportunities for AI integration, assess the feasibility of AI projects, and develop strategic AI roadmaps. We provide expert guidance to ensure that our clients leverage AI technologies effectively to achieve their business goals."
        },
        {
          heading: "Custom AI Development",
          content: "We specialize in developing custom AI solutions that are tailored to meet the specific requirements of our clients. From data collection and preprocessing to model development and deployment, we handle every aspect of the AI development lifecycle with precision and expertise."
        },
        {
          heading: "Machine Learning Solutions",
          content: "Our machine learning solutions empower businesses to make data-driven decisions, automate processes, and gain insights from vast amounts of data. We develop machine learning models for various applications, including predictive analytics, recommendation systems, and fraud detection."
        },
        {
          heading: "Natural Language Processing (NLP)",
          content: "Our NLP services enable businesses to process and analyze large volumes of textual data, extract meaningful insights, and automate customer interactions. We develop sophisticated NLP models for sentiment analysis, text classification, and language translation, among other applications."
        },
        {
          heading: "Computer Vision Solutions",
          content: "We harness the power of computer vision to enable businesses to interpret and understand visual data. Our computer vision solutions include image recognition, object detection, and facial recognition systems that enhance security, improve quality control, and streamline operations."
        },
        {
          heading: "1. Proven Track Record",
          content: "We have a proven track record of delivering successful AI projects for clients across various industries. Our portfolio showcases a diverse range of AI solutions that have helped businesses achieve significant improvements in efficiency, accuracy, and profitability."
        },
        {
          heading: "2. Client-Centric Approach",
          content: "At Techinventive Software, we prioritize our clients’ needs and goals. We work closely with our clients to understand their challenges and objectives, ensuring that our solutions align with their business strategies. Our client-centric approach fosters strong partnerships and drives successful project outcomes."
        },
        {
          heading: "3. Cutting-Edge Technology",
          content: "We stay at the forefront of technological advancements in the AI domain. Our developers continuously update their skills and knowledge to incorporate the latest AI techniques and tools into our solutions. This commitment to innovation ensures that our clients receive state-of-the-art AI products that deliver superior performance."
        },
        {
          heading: "4. End-to-End Solutions",
          content: "We offer end-to-end AI solutions, covering everything from initial consultation and project planning to development, deployment, and ongoing support. Our comprehensive service offering ensures a seamless and hassle-free experience for our clients."
        },
        {
          heading: "5. Commitment to Quality",
          content: "Quality is at the core of everything we do at Techinventive Software. We adhere to stringent quality standards and best practices throughout the AI development process to deliver solutions that are reliable, efficient, and scalable."
        },
        {
          heading: "Transform Your Business with AI",
          content: "In today’s competitive business environment, leveraging AI technologies is no longer optional but essential for staying ahead. Techinventive Software is your trusted partner in this journey, offering the expertise, innovation, and commitment needed to transform your business with AI. Our comprehensive range of AI services and custom AI products are designed to help you unlock new opportunities, enhance operational efficiency, and drive sustainable growth."
        }
      ]
      
    }
  },
  {
    id: 7,
    title: "How To Elevate Your Business With AI",
    date: "June 19, 2024",
    image: "https://www.techinventive.com/img/1738863139064.png",
    imageLarge:"https://www.techinventive.com/img/Elevate-Your-Business-With-AI.png",
    description: "In today's rapidly evolving digital landscape, artificial intelligence (AI) is not just a buzzword",
    tags: ["AI"],
    article: {  // ❌ Changed from an array [] to an object {}
      introduction: "In today's rapidly evolving digital landscape, artificial intelligence (AI) is not just a buzzword; it's a revolutionary force transforming businesses across the globe. For enterprises in Delhi, India, leveraging AI consulting services can be a game-changer. At Techinventive Software, we specialize in providing top-notch AI consulting services that can elevate your business to new heights. In this comprehensive article, we delve into the myriad benefits of AI consulting and how our expertise can help you stay ahead of the curve.",
      sections: [
        {
          heading: "Understanding the Power of AI Consulting",
          content: "AI consulting involves the use of advanced algorithms and machine learning techniques to solve complex business problems. Our team of seasoned AI consultants at Techinventive Software is adept at identifying opportunities for automation, optimization, and innovation. By harnessing the power of AI, businesses can improve operational efficiency, enhance customer experiences, and drive revenue growth."
        },
        {
          heading: "Why Choose AI Consulting?",
          content: ""
        },
        {
          heading: "1. Enhanced Decision-Making",
          content: "AI consulting equips businesses with powerful data analytics tools that provide deep insights into customer behavior, market trends, and operational performance. By leveraging these insights, companies can make informed decisions that drive strategic growth."
        },
        {
          heading: "2. Increased Efficiency",
          content: "AI technologies such as natural language processing (NLP) and machine learning enable businesses to deliver personalized customer experiences. By analyzing customer data, AI can predict preferences and behaviors, allowing for tailored marketing strategies and enhanced customer satisfaction."
        },
        {
          heading: "3. Personalized Customer Experiences",
          content: "AI enables hyper-personalized customer experiences through behavioral analysis and prediction models. This leads to more engaging interactions, higher customer satisfaction, and improved retention rates."
        },
        {
          heading: "AI Strategy Development",
          content: "Developing a robust AI strategy is crucial for success. Our consultants work closely with you to understand your business objectives and design a customized AI roadmap. This includes identifying key areas for AI implementation, setting achievable goals, and outlining a clear execution plan."
        },
        {
          heading: "Machine Learning Solutions",
          content: "Machine learning is at the heart of AI. Our experts develop sophisticated machine learning models that can analyze vast amounts of data, identify patterns, and make accurate predictions. These solutions are invaluable for tasks such as fraud detection, customer segmentation, and demand forecasting."
        },
        {
          heading: "Natural Language Processing (NLP)",
          content: "NLP enables machines to understand and interpret human language. We harness the power of NLP to develop chatbots, virtual assistants, and sentiment analysis tools that enhance customer interactions and improve service delivery."
        },
        {
          heading: "Computer Vision",
          content: "Computer vision technologies allow machines to interpret and understand visual information. Our team develops advanced computer vision solutions for applications such as image recognition, facial recognition, and video analysis, providing businesses with powerful tools for automation and security."
        },
        {
          heading: "The Techinventive Advantage",
          content: "Choosing Techinventive Software for AI consulting services in Delhi, India, means partnering with a team of dedicated experts committed to your success. Our advantages include:"
        },
        {
          heading: "Expertise and Experience",
          content: "Our team comprises seasoned AI professionals with extensive experience in various industries. We bring a wealth of knowledge and expertise to every project, ensuring that our solutions are tailored to meet your specific needs."
        },
        {
          heading: "Customized Solutions",
          content: "We understand that every business is unique. That's why we offer customized AI solutions that align with your business objectives. Our consultants work closely with you to develop strategies that drive meaningful results."
        },
        {
          heading: "At Techinventive Software, we leverage the latest AI technologies to deliver innovative solutions. From deep learning to advanced analytics, we use state-of-the-art tools to help you stay ahead in a competitive market.",
          content: ""
        },
        {
          heading: "Proven Track Record",
          content: "Our success stories speak for themselves. We have a proven track record of delivering successful AI projects that drive real business value. Our clients trust us to deliver results, and we consistently exceed their expectations."
        },
        {
          heading: "Get Started with AI Consulting Today",
          content: "Elevate your business with AI consulting services from Techinventive Software. Whether you're looking to improve operational efficiency, enhance customer experiences, or gain a competitive edge, our AI solutions are designed to help you achieve your goals. Contact us today to learn more about how we can transform your business with AI. Visit techinventive.com to get started."
        }
      ]      
    }
  }
];

app.get("/api/blogs", (req, res) => {
  res.json(blogs);
});

app.get("/api/blogs/:title", (req, res) => {
  const { title } = req.params;
  const blog = blogs.find((b) => b.title.toLowerCase().replace(/\s+/g, "-") === title.toLowerCase());

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json(blog);
});
// **API to fetch 3 random related blogs**
app.get("/api/blogs/related/:id", (req, res) => {
  const { id } = req.params;
  const filteredBlogs = blogs.filter((blog) => blog.id !== parseInt(id)); // Exclude current blog
  const relatedBlogs = filteredBlogs.sort(() => 0.5 - Math.random()).slice(0, 3); // Get 3 random blogs
  res.json(relatedBlogs);
});
// Services Data
const data = {
  title: "Our Services",
  subtitle: "Explore Our Offerings",
  services: [
  { id: 1, name: "Artificial Intelligence", description: "Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions.", image: "https://www.techinventive.com/img/Frame55.png", path: "/services/ai-services" },
  { id: 2, name: "Machine Learning", description: "We specialize in developing innovative machine learning solutions.", path: "/services/ml-services" },
  { id: 3, name: "Blockchain", description: "Offering comprehensive blockchain solutions to businesses worldwide.", path: "/services/blockchain-services" },
  { id: 4, name: "Game Development", description: "Premier game development company offering a wide range of services.", path: "/services/game-development-services" },
  { id: 5, name: "Python", description: "Providing a wide range of Python development services to clients worldwide.", path: "/services/python-services" },
  { id: 6, name: "Node.js", description: "Offering top-notch Node.js development services to clients worldwide.", image: "https://www.techinventive.com/img/Frame%2022.png", path: "/services/nodejs-services" },
  { id: 7, name: "Drupal", description: "Providing high-quality, scalable, and secure Drupal solutions worldwide.", image: "https://www.techinventive.com/img/Frame%205.png", path: "/services/drupal-services" },
  { id: 8, name: "Ruby on Rails", description: "Providing high-quality Ruby on Rails development services worldwide.", path: "/services/ruby-on-rails-services" },
  { id: 9, name: "Golang", description: "Offering top-notch Golang development services to clients worldwide.", path: "/services/golang-services" },
 ]
}

// API Route to Get Services
app.get("/api/services", (req, res) => {
  res.json(data);
});

// Another API with modified title and subtitle
app.get("/api/services/custom", (req, res) => {
  let customData = { ...data, title: "Web Development Services That Aligns With Your Business Goals", subtitle: "What we do" };
  res.json(customData);
});

const whyChooseUsData = {
  title: "Why Choose Us?",
  subtitle: "Your Success, Our Priority: Reasons to Choose Us",
  image: "https://www.techinventive.com/img/Rectangle212.png",
  reasons: [
    { title: "Expertise", description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries." },
    { title: "Customization", description: "We understand that every business is unique. That's why we offer customized solutions to meet your specific needs." },
    { title: "Agile Approach", description: "We follow agile development methodologies to ensure flexibility, transparency, and efficiency in project delivery." },
    { title: "Quality Assurance", description: "We maintain the highest quality standards throughout the development process to deliver robust and reliable solutions." },
    { title: "Client-Centric Focus", description: "Your satisfaction is our top priority. We collaborate closely with you to ensure that our solutions exceed your expectations." },
  ],
};

// API Route
app.get("/api/why-choose-us", (req, res) => {
  res.json(whyChooseUsData);
});

const privacyPolicy = {
  title: "Thank you for choosing Techinventive Software. This Privacy Policy describes how we collect, use, and disclose information when you use our services, including our website and any software applications.",
  sections: [
    {
      heading: "Information We Collect",
      subheading: "When you use our Services, we may collect certain information, including:",
      points: [
        "Personal Information: This may include your name, email address, phone number, and other similar information.",
        "Usage Information: We may collect information about how you use our Services, such as the pages you visit, the features you use, and the actions you take.",
        "Device Information: We may collect information about the device you use to access our Services, such as your IP address, browser type, and operating system.",
      ],
    },
    {
      heading: "How We Use Your Information",
      subheading: "We may use the information we collect for various purposes, including:",
      points: [
        "Providing and maintaining our Services.",
        "Improving our Services and developing new features.",
        "Communicating with you, including responding to your inquiries and providing customer support.",
        "Marketing and advertising our products and services.",
        "Protecting our rights and interests, and the rights and interests of other users.",
      ],
    },
    {
      heading: "Information Sharing and Disclosure",
      subheading: "We may share your information with third parties for various purposes, including:",
      points: [
        "With service providers who help us operate our Services.",
        "With our affiliates and partners for marketing and advertising purposes.",
        "In response to legal requests or to protect our rights.",
        "With your consent or as otherwise required or permitted by law.",
      ],
    },
    {
      heading: "Your Choices",
      content:
        "You may have certain choices regarding the information we collect and how it is used. For example, you can choose not to provide certain information or to opt out of certain uses of your information. Please note that some features of our Services may not be available if you choose not to provide certain information.",
    },
    {
      heading: "Security",
      content:
        "We take the security of your information seriously and take reasonable measures to protect it. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee its absolute security.",
    },
    {
      heading: "Changes to this Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
    },
    {
      heading: "Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at: marketing@techinventive.com",
    },
  ],
};

app.get("/api/privacy-policy", (req, res) => {
  res.json(privacyPolicy);
});

const termsConditions = {
  title:
    "Welcome to Techinventive Software. These terms and conditions outline the rules and regulations for the use of our website and services.",
  sections: [
    {
      heading: "Terms & Conditions",
      content:
        "These terms and conditions govern your use of the Techinventive Software website and any services provided by Techinventive Software.",
    },
    {
      heading: "1. Acceptance of Terms",
      content:
        "By accessing this website, you agree to be bound by these terms and conditions, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
    },
    {
      heading: "2. Use License",
      content:
        "Permission is granted to temporarily download one copy of the materials (information or software) on Techinventive Software's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
    },
    {
      heading: "3. Disclaimer",
      content:
        'The materials on Techinventive Software\'s website are provided "as is." Techinventive Software makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      heading: "4. Limitations",
      content:
        "In no event shall Techinventive Software or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Techinventive Software's website, even if Techinventive Software or a Techinventive Software authorized representative has been notified orally or in writing of the possibility of such damage.",
    },
    {
      heading: "5. Revisions and Errata",
      content:
        "The materials appearing on Techinventive Software's website could include technical, typographical, or photographic errors. Techinventive Software does not warrant that any of the materials on its website are accurate, complete, or current.",
    },
    {
      heading: "6. Links",
      content:
        "Techinventive Software has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Techinventive Software of the site. Use of any such linked website is at the user's own risk.",
    },
    {
      heading: "7. Governing Law",
      content:
        "Any claim relating to Techinventive Software's website shall be governed by the laws of the State of Delhi, India without regard to its conflict of law provisions.",
    },
    {
      heading: "8. Modifications",
      content:
        "Techinventive Software may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms of service.",
    },
    {
      heading: "9. Contact Information",
      content: "If you have any questions about these terms and conditions, please contact us at contact@techinventive.com.",
    },
    {
      heading: "10. Agreement",
      content:
        "By using this website, you signify your acceptance of these terms and conditions. If you do not agree to these terms, please do not use our website.",
    },
  ],
};

app.get("/api/terms-conditions", (req, res) => {
  res.json(termsConditions);
});

const webservices = [
  { id: 1, 
    title: "Artificial Intelligence", 
    intro: {
      title: "Artificial Intelligence Services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/ai_banner.png"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "What Sets Us Apart",
      subtitle: "Our Commitment to Excellence: Guiding Principles That Drive Us",
      items: [
        { label: "Techinventive for Your AI Needs", 
          text: "Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.", 
          image: "https://www.techinventive.com/img/techinventive_for_your_AI_Needs.svg" 
        },
        { label: "Unlocking Business Potential", 
          text: "With our AI services, we help businesses leverage AI technologies to automate processes, gain valuable insights from data, and enhance customer experiences. Whether you're looking to implement AI-powered chatbots, predictive analytics, or machine learning algorithms, we have the expertise to meet your needs.", 
          image: "https://www.techinventive.com/img/AI_2.png" 
        },
        { label: "Customized AI Solutions", 
          text: "At Techinventive Software, we understand that every business is unique, which is why we tailor our AI solutions to meet your specific requirements. Our goal is to help you stay ahead of the competition by leveraging the latest AI technologies.", 
          image: "https://www.techinventive.com/img/AI_3.png" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
          { label: "OpenAI", image: "https://www.techinventive.com/img/services_icon/eos-icons_ai.svg" },
          { label: "ChatGPT", image: "https://www.techinventive.com/img/services_icon/arcticons_openai-chatgpt.svg" },
          { label: "QuiliBot", image: "https://www.techinventive.com/img/services_icon/bx_bot.svg" },
          { label: "Playground AI", image: "https://www.techinventive.com/img/services_icon/tabler_input-ai.svg" },
          { label: "Python", image: "https://www.techinventive.com/img/services_icon/Python.svg" },
          { label: "Ruby", image: "https://www.techinventive.com/img/services_icon/Ruby.svg" },
          { label: "Pandas", image: "https://www.techinventive.com/img/services_icon/devicon_pandas.svg" },
          { label: "NumPy", image: "https://www.techinventive.com/img/services_icon/logos_numpy.svg" },
          { label: "PyTorch", image: "https://www.techinventive.com/img/services_icon/skill-icons_pytorch-light.svg" },
          { label: "LangChain", image: "https://www.techinventive.com/img/services_icon/file-icons_curl-lang.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our AI development and Integration services and how we can help you achieve your business goals with AI.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 2, 
    title: "Machine Learning", 
    intro: {
      title: "Machine Learning development services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/ml_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "What Sets Us Apart",
      subtitle: "Our Commitment to Excellence: Guiding Principles That Drive Us",
      items: [
        { label: "Unlocking Data Potential", 
          text: "Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data. Our team of machine learning experts is dedicated to delivering cutting-edge solutions tailored to your specific needs.", 
          image: "https://www.techinventive.com/img/ML1.png" 
        },
        { label: "Driving Growth with Precision", 
          text: "With our machine learning services, we help businesses harness the power of predictive analytics, natural language processing, and computer vision to drive business growth and efficiency. Whether you're looking to improve customer engagement, optimize operations, or gain valuable insights from your data, our machine learning solutions can help.", 
          image: "https://www.techinventive.com/img/ML2.png" 
        },
        { label: "Tailored Machine Learning Solutions", 
          text: "At Techinventive Software, we understand that every business is unique, which is why we work closely with our clients to understand their specific requirements and develop customized machine learning solutions that meet their needs. Our goal is to help you stay ahead of the competition by leveraging the latest machine learning technologies.", 
          image: "https://www.techinventive.com/img/ML3.png" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "OpenAI", image: "https://www.techinventive.com/img/services_icon/eos-icons_ai.svg" },
           { label: "ChatGPT", image: "https://www.techinventive.com/img/services_icon/arcticons_openai-chatgpt.svg" },
           { label: "QuiliBot", image: "https://www.techinventive.com/img/services_icon/bx_bot.svg" },
           { label: "Playground AI", image: "https://www.techinventive.com/img/services_icon/tabler_input-ai.svg" },
           { label: "Python", image: "https://www.techinventive.com/img/services_icon/Python.svg" },
           { label: "Ruby", image: "https://www.techinventive.com/img/services_icon/Ruby.svg" },
           { label: "Pandas", image: "https://www.techinventive.com/img/services_icon/devicon_pandas.svg" },
           { label: "NumPy", image: "https://www.techinventive.com/img/services_icon/logos_numpy.svg" },
           { label: "PyTorch", image: "https://www.techinventive.com/img/services_icon/skill-icons_pytorch-light.svg" },
           { label: "LangChain", image: "https://www.techinventive.com/img/services_icon/file-icons_curl-lang.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our Machine Learning services and how we can help you achieve your business goals.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 3, 
    title: "Website Development", 
    intro: {
      title: "Web Development services",
      description: "The instant project that bootstraps the response page portrays a full authentication when the websites are created in HTML and CSS layouts. The developers are the experts to understand and implements the complex data associated with different modules related to the projects.",
      image: "https://www.techinventive.com/img/webdesign_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "Web Development",
      subtitle: "The instant project that bootstraps the response page portrays a full authentication when the websites are created in HTML and CSS layouts. The developers are the experts to understand and implements the complex data associated with different modules related to the projects.",
      items: [
        { label: "Web & App Development", 
          text: "Techinventive is offering the world’s best web development services for a wide range of industries in all over the world.", 
          image: "https://www.techinventive.com/img/WDS1.png" 
        },
        { label: "Drupal Development", 
          text: "Techinventive has a team of professional Drupal website developers and designers providing the precisely tailored range of Drupal website.", 
          image: "https://www.techinventive.com/img/WDS2.png" 
        },
        { label: "Custom CMS development", 
          text: "Our innovative website design company offers A level of custom website development services.", 
          image: "https://www.techinventive.com/img/WDS3.png" 
        },
        { label: "E-Commerce Development", 
          text: "E-commerce website development services with utmost safety and security in each virtual transaction together with some pretty delightful features such as, advanced searching tools.", 
          image: "https://www.techinventive.com/img/WDS7.png" 
        },
        { label: "PHP Development", 
          text: "We possess outstanding skills in PHP development company India solutions and frameworks, like CodeIgniter, CakePHP, Fusebox, DIY, Symfony and other applications.", 
          image: "https://www.techinventive.com/img/WDS6.png" 
        },
        { label: "Wordpress Development", 
          text: "WordPress website development from Techinventive is the right choice for clients looking for a trustworthy name in this context.", 
          image: "https://www.techinventive.com/img/WDS4.png" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "Python", image: "https://www.techinventive.com/img/Python.svg" },
           { label: "Node.js", image: "https://www.techinventive.com/img/Node.js.svg" },
           { label: "PHP", image: "https://www.techinventive.com/img/PHP.svg" },
           { label: "Ruby", image: "https://www.techinventive.com/img/Ruby.svg" },
           { label: "Flutter", image: "https://www.techinventive.com/img/Flutter.svg" },
           { label: "React Native", image: "https://www.techinventive.com/img/React%20Native.svg" },
           { label: "Laravel", image: "https://www.techinventive.com/img/Laravel.svg" },
           { label: "Drupal", image: "https://www.techinventive.com/img/Drupal-new.svg" },
           { label: "Moodle", image: "https://www.techinventive.com/img/Moodle.svg" },
           { label: "Ruby on Rails", image: "https://www.techinventive.com/img/Ruby%20on%20Rails.svg" },
           { label: "Django & Flux", image: "https://www.techinventive.com/img/Django%20&%20Flux.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our web development service and how we can help you achieve your business goals with Drupal/ PHP/Ruby/Python/Nodejs/Golang.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 4, 
    title: "Website Designing", 
    intro: {
      title: "Web Designing services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/webdesign_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "Web Designing",
      subtitle: "Our web designers, design and attach codes in such a way that could be easily found in a one go on the internet. The visitors can seamlessly experience our special quality design while browsing on the iPhones, laptops and desktops.",
      items: [
        { label: "", 
          text: "Techinventive Software is a premier website designing company based in Delhi, India, offering a comprehensive range of web designing services to clients worldwide. Our team of experienced web designers is dedicated to delivering high-quality, visually appealing, and user-friendly websites that meet our clients' unique requirements.", 
          image: "https://www.techinventive.com/img/webdesign1.jpg" 
        },
        { label: "", 
          text: "At Techinventive Software, we understand that every business is unique, which is why we work closely with our clients to understand their specific requirements and deliver tailored solutions that meet their needs. Our goal is to help our clients succeed in the competitive digital landscape by providing them with innovative and effective web designing solutions.", 
          image: "https://www.techinventive.com/img/webdesign2.jpg" 
        },
        { label: "", 
          text: "With our web designing services, we help businesses create a strong online presence and effectively showcase their brand. Whether you're looking to build a new website from scratch or revamp your existing website, our web designers can help you achieve your goals.", 
          image: "https://www.techinventive.com/img/why_choose_us.jpeg" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "HTML5", image: "https://www.techinventive.com/img/services_icon/devicon_html5-wordmark.svg" },
           { label: "JS", image: "https://www.techinventive.com/img/services_icon/fa-brands_js-square.svg" },
           { label: "BootStrap", image: "https://www.techinventive.com/img/services_icon/devicon_bootstrap.svg" },
           { label: "Elementor", image: "https://www.techinventive.com/img/services_icon/simple-icons_elementor.svg" },
           { label: "React.js", image: "https://www.techinventive.com/img/services_icon/skill-icons_react-dark.svg" },
           { label: "Material UI", image: "https://www.techinventive.com/img/services_icon/skill-icons_materialui-light.svg" },
           { label: "Materialize", image: "https://www.techinventive.com/img/services_icon/devicon_materializecss.svg" },
           { label: "Tailwind CSS", image: "https://www.techinventive.com/img/services_icon/skill-icons_tailwindcss-light.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our web designing services and how we can help you achieve your business goals.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 5, 
    title: "Drupal", 
    intro: {
      title: "Drupal Development Services",
      description: "At Techinventive, we specialize in Drupal web development to help businesses build dynamic, scalable, and secure websites tailored to their unique needs. As one of the leading open-source content management systems, Drupal empowers organizations to achieve unmatched flexibility and customization for their online presence. Whether you’re looking to create a sleek corporate website, an engaging e-commerce platform, or a feature-rich enterprise portal, our Drupal experts are here to deliver cutting-edge solutions.",
      image: "https://www.techinventive.com/img/drupal_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "Our Drupal Development Services",
      subtitle: "At Techinventive, we offer a wide array of Drupal services designed to maximize your website's potential:",
      items: [
        { label: "Custom Drupal Website Development", 
          text: "We build bespoke websites from the ground up, tailored to your industry and specific requirements. Our development process ensures that your site reflects your brand while delivering optimal functionality and user experience.", 
          image: "https://www.techinventive.com/img/drupal2.png" 
        },
        { label: "Drupal Module and Theme Development", 
          text: "Extend your website’s capabilities with custom modules and themes. Our developers craft solutions that meet your business goals, enhance performance, and provide an aesthetic that aligns with your brand identity.", 
          image: "https://www.techinventive.com/img/drupal3.png" 
        },
        { label: "Migration to Drupal", 
          text: "Looking to migrate from another CMS? Our seamless Drupal migration service ensures zero data loss and minimal downtime, enabling a smooth transition to a more powerful platform.", 
          image: "https://www.techinventive.com/img/drupal2.png" 
        },
        { label: "Drupal Upgrades and Maintenance", 
          text: "Keep your website up-to-date with our maintenance and support services. From upgrading to the latest Drupal version to fixing bugs and optimizing performance, we ensure your site runs flawlessly.", 
          image: "https://www.techinventive.com/img/drupal3.png" 
        },
        { label: "E-commerce Solutions", 
          text: "Unlock the potential of your online store with Drupal-powered e-commerce platforms. Our team integrates top-notch features like product catalogs, secure payment gateways, and advanced analytics.", 
          image: "https://www.techinventive.com/img/drupal2.png" 
        }

      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "Drupal", image: "https://www.techinventive.com/img/services_icon/Drupal.svg" },
           { label: "PHP", image: "https://www.techinventive.com/img/services_icon/PHP.svg" },
           { label: "HTML5", image: "https://www.techinventive.com/img/services_icon/devicon_html5-wordmark.svg" },
           { label: "JS", image: "https://www.techinventive.com/img/services_icon/fa-brands_js-square.svg" },
           { label: "React.js", image: "https://www.techinventive.com/img/services_icon/skill-icons_react-dark.svg" },
           { label: "Composer", image: "https://www.techinventive.com/img/services_icon/arcticons_composer.svg" },
           { label: "Lando", image: "https://www.techinventive.com/img/services_icon/tabler_brand-zalando.svg" },
           { label: "BootStrap", image: "https://www.techinventive.com/img/services_icon/devicon_bootstrap.svg" },
           { label: "Docker", image: "https://www.techinventive.com/img/services_icon/skill-icons_docker.svg" },
           { label: "MySql", image: "https://www.techinventive.com/img/services_icon/ph_file-sql-fill.svg" },
           { label: "Postgresql", image: "https://www.techinventive.com/img/services_icon/akar-icons_postgresql-fill.svg" },
           { label: "MongoDB", image: "https://www.techinventive.com/img/services_icon/MongoDB.svg" },
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our Drupal website development service and how we can help you achieve your business goals with Drupal.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 6, 
    title: "Ruby on Rails", 
    intro: {
      title: "Ruby on Rail development services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/ruby_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "What Sets Us Apart",
      subtitle: "Our Commitment to Excellence: Guiding Principles That Drive Us",
      items: [
        { label: "Get Scalable Solutions", 
          text: "Techinventive Software is a leading Ruby on Rails development company offering high-quality Ruby on Rails development services to clients worldwide. Our team of experienced Ruby on Rails developers is dedicated to delivering robust, scalable, and efficient web applications that meet our clients' unique requirements.", 
          image: "https://www.techinventive.com/img/ruby1.png" 
        },
        { label: "Golang Mastery", 
          text: "With our Ruby on Rails development services, we help businesses build cutting-edge web applications, e-commerce platforms, and content management systems using the latest Ruby on Rails frameworks and technologies. Whether you're looking to develop a new web application or enhance your existing Ruby on Rails project, we have the expertise and resources to deliver exceptional results.", 
          image: "https://www.techinventive.com/img/ruby2.png" 
        },
        { label: "Custom Golang Solutions", 
          text: "At Techinventive Software, we understand the importance of delivering projects on time and within budget. That's why we work closely with our clients to understand their specific requirements and deliver tailored solutions that meet their needs. Our goal is to help our clients succeed in the competitive digital landscape by providing them with reliable, scalable, and innovative Ruby on Rails solutions.", 
          image: "https://www.techinventive.com/img/ruby3.png" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "Ruby", image: "https://www.techinventive.com/img/services_icon/Ruby.svg" },
           { label: "Ruby on Rails", image: "https://www.techinventive.com/img/services_icon/Ruby%20on%20Rails.svg" },
           { label: "React Native", image: "https://www.techinventive.com/img/services_icon/React%20Native.svg" },
           { label: "HTML5", image: "https://www.techinventive.com/img/services_icon/devicon_html5-wordmark.svg" },
           { label: "Shopify", image: "https://www.techinventive.com/img/services_icon/shopify.svg" },
           { label: "RSpec", image: "https://www.techinventive.com/img/services_icon/rspec.svg" },
           { label: "Sinatra", image: "https://www.techinventive.com/img/services_icon/sinatra.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our Ruby application development services and how we can help you achieve your business goals with Ruby & Ruby on Rails.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 7, 
    title: "Python", 
    intro: {
      title: "Python development services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/python_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "What Sets Us Apart",
      subtitle: "Our Commitment to Excellence: Guiding Principles That Drive Us",
      items: [
        { label: "Innovation with Python", 
          text: "Techinventive Software is a leading Python development company based in Delhi, India, offering a wide range of Python development services to clients worldwide. Our team of experienced Python developers is dedicated to delivering high-quality, scalable, and efficient Python solutions that meet our clients' unique requirements.", 
          image: "https://www.techinventive.com/img/python1.png" 
        },
        { label: "Python Development Expertise", 
          text: "With our Python development services, we help businesses leverage the power of Python programming language to develop robust web applications, data analytics solutions, machine learning models, and more. Whether you're looking to build a web application from scratch or enhance your existing Python-based system, we have the expertise and resources to make it happen.", 
          image: "https://www.techinventive.com/img/python2.png" 
        },
        { label: "Python Development Edge!", 
          text: "At Techinventive Software, we understand the importance of staying ahead of the curve in today's fast-paced digital world. That's why we stay up-to-date with the latest trends and technologies in Python development to ensure that our clients receive cutting-edge solutions that drive business growth and success.", 
          image: "https://www.techinventive.com/img/python3.png" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "Python", image: "https://www.techinventive.com/img/services_icon/Python.svg" },
           { label: "Django & Flux", image: "https://www.techinventive.com/img//Django%20&%20Flux.svg" },
           { label: "Node.js", image: "https://www.techinventive.com/img/services_icon/Node.js.svg" },
           { label: "Postgresql", image: "https://www.techinventive.com/img/services_icon/akar-icons_postgresql-fill.svg" },
           { label: "MongoDB", image: "https://www.techinventive.com/img/services_icon/MongoDB.svg" },
           { label: "NoSQL DB", image: "https://www.techinventive.com/img/services_icon/mdi_sql-query.svg" },
           { label: "DynamicDB", image: "https://www.techinventive.com/img/services_icon/material-symbols_dynamic-form-rounded.svg" },
           { label: "MySql", image: "https://www.techinventive.com/img/services_icon/ph_file-sql-fill.svg" },
           { label: "Docker", image: "https://www.techinventive.com/img/services_icon/skill-icons_docker.svg" },
           { label: "Pandas", image: "https://www.techinventive.com/img/services_icon/devicon_pandas.svg" },
           { label: "LangChain", image: "https://www.techinventive.com/img/services_icon/file-icons_curl-lang.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our Python development services and how we can help you achieve your business goals with Python.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 8, 
    title: "Blockchain", 
    intro: {
      title: "Blockchain Development Services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/Blockchain_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "What Sets Us Apart",
      subtitle: "Our Commitment to Excellence: Guiding Principles That Drive Us",
      items: [
        { label: "Empowering Businesses Globally", 
          text: "Techinventive Software is a leading blockchain development company based in Delhi, India, offering comprehensive blockchain solutions to businesses worldwide. Our team of blockchain experts is dedicated to delivering secure, transparent, and efficient blockchain solutions that drive business growth and innovation.", 
          image: "https://www.techinventive.com/img//Blockchain%201.png" 
        },
        { label: "Streamlined Blockchain Solutions", 
          text: "With our blockchain services, we help businesses leverage the power of blockchain technology to streamline operations, reduce costs, and enhance security. Whether you're looking to develop a blockchain-based application, implement smart contracts, or explore the potential of decentralized finance (DeFi), we have the expertise to meet your needs.", 
          image: "https://www.techinventive.com/img/Blockchain%202.png" 
        },
        { label: "Futuristic Solutions, Tailored for You", 
          text: "At Techinventive Software, we understand the importance of staying ahead of the curve in today's rapidly evolving business landscape. That's why we work closely with our clients to understand their specific requirements and develop customized blockchain solutions that align with their business goals.", 
          image: "https://www.techinventive.com/img/Blockchain%203.png" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "Cryptography", image: "https://www.techinventive.com/img/services_icon/unjs_uncrypto.svg" },
           { label: "Bitcoin", image: "https://www.techinventive.com/img/services_icon/logos_bitcoin.svg" },
           { label: "Ethereum", image: "https://www.techinventive.com/img/services_icon/logos_ethereum.svg" },
           { label: "Blockchain", image: "https://www.techinventive.com/img/services_icon/blockchain.svg" },
           { label: "Workflows", image: "https://www.techinventive.com/img/services_icon/workflow.svg" },
           { label: "Solidity", image: "https://www.techinventive.com/img/services_icon/Frame%2013.svg" },
           { label: "Python", image: "https://www.techinventive.com/img/services_icon/Python.svg" },
           { label: "Ruby on Rails", image: "https://www.techinventive.com/img/services_icon/Ruby%20on%20Rails.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our blockchain services and how we can help your business succeed in the digital age.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 9, 
    title: "Game Development", 
    intro: {
      title: "Game Development Services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/Game_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "What Sets Us Apart",
      subtitle: "Our Commitment to Excellence: Guiding Principles That Drive Us",
      items: [
        { label: "Crafting Immersive Experiences", 
          text: "Techinventive Software is a premier game development company based in Delhi, India, offering a wide range of game development services to clients worldwide. Our team of experienced game developers is passionate about creating engaging and immersive gaming experiences that captivate players and drive engagement.", 
          image: "https://www.techinventive.com/img/GD1.png" 
        },
        { label: "From Concept to Creation", 
          text: "With our game development services, we help businesses and individuals bring their game ideas to life. Whether you're looking to develop a mobile game, PC game, or console game, we have the expertise and resources to make it happen. From concept and design to development and testing, we handle every aspect of the game development process to ensure that your game meets the highest standards of quality and performance.", 
          image: "https://www.techinventive.com/img/GD2.png" 
        },
        { label: "Elevating Your Vision", 
          text:  "At Techinventive Software, we understand that every game is unique, which is why we work closely with our clients to understand their vision and requirements. Our goal is to create games that not only meet but exceed our clients' expectations, helping them stand out in the competitive gaming market.", 
          image: "https://www.techinventive.com/img/GD3.png" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "Java", image: "https://www.techinventive.com/img/services_icon/java.svg" },
           { label: "Node.js", image: "https://www.techinventive.com/img/services_icon/Node.js.svg" },
           { label: "Python", image: "https://www.techinventive.com/img/services_icon/Python.svg" },
           { label: "Ruby", image: "https://www.techinventive.com/img/services_icon/Ruby.svg" },
           { label: "PHP", image: "https://www.techinventive.com/img/services_icon/PHP.svg" },
           { label: "React Native", image: "https://www.techinventive.com/img/services_icon/React%20Native.svg" },
           { label: "Flutter", image: "https://www.techinventive.com/img/services_icon/Flutter.svg" },
           { label: "Angular.js", image: "https://www.techinventive.com/img/services_icon/skill-icons_angular-light.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our game applications development services and how we can help you achieve your business goals with game development service.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 10, 
    title: "Node.Js", 
    intro: {
      title: "Node Js development services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/nodejs_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "What Sets Us Apart",
      subtitle: "Our Commitment to Excellence: Guiding Principles That Drive Us",
      items: [
        { label: "Premier Node.js Services", 
          text: "Techinventive Software is a leading Node.js development company based in Delhi, India, offering top-notch Node.js development services to clients worldwide. Our team of skilled Node.js developers is passionate about leveraging the power of Node.js to create fast, scalable, and efficient web applications that meet our clients' unique requirements.", 
          image: "https://www.techinventive.com/img/node1.png" 
        },
        { label: "Driving Innovation", 
          text: "With our Node.js development services, we help businesses build high-performance web applications, real-time applications, and APIs using the latest Node.js frameworks and technologies. Whether you're looking to develop a new web application or enhance your existing Node.js project, we have the expertise and experience to deliver exceptional results.", 
          image: "https://www.techinventive.com/img/node2.png" 
        },
        { label: "Customized Node.js Solutions", 
          text: "At Techinventive Software, we understand that every project is unique, which is why we work closely with our clients to understand their specific requirements and deliver tailored solutions that exceed their expectations. Our goal is to help our clients succeed in the competitive digital landscape by providing them with reliable, scalable, and innovative Node.js solutions.", 
          image: "https://www.techinventive.com/img/node3.png" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "Node.js", image: "https://www.techinventive.com/img/services_icon/Node.js.svg" },
           { label: "Angular.js", image: "https://www.techinventive.com/img/services_icon/skill-icons_angular-light.svg" },
           { label: "React.js", image: "https://www.techinventive.com/img/services_icon/skill-icons_react-dark.svg" },
           { label: "MongoDB", image: "https://www.techinventive.com/img/services_icon/MongoDB.svg" },
           { label: "MySql", image: "https://www.techinventive.com/img/services_icon/ph_file-sql-fill.svg" },
           { label: "NPM", image: "https://www.techinventive.com/img/services_icon/skill-icons_npm-dark.svg" },
           { label: "Express.js", image: "https://www.techinventive.com/img/services_icon/la_js.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our MEAN/MERN development services and how we can help you achieve your business goals with Node.js/Express.js.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 11, 
    title: "Golang", 
    intro: {
      title: "Golang Development Services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/golang_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "What Sets Us Apart",
      subtitle: "Our Commitment to Excellence: Guiding Principles That Drive Us",
      items: [
        { label: "Get Scalable Solutions", 
          text: "Techinventive Software is a leading Golang development company based in Delhi, India, offering top-notch Golang development services to clients worldwide. Our team of experienced Golang developers is dedicated to delivering high-quality, scalable, and efficient Golang solutions that meet our clients' unique requirements.", 
          image: "https://www.techinventive.com/img//golang1.svg" 
        },
        { label: "Golang Mastery", 
          text: "With our Golang development services, we help businesses leverage the power of Golang programming language to develop robust and high-performance applications. Whether you're looking to build a web application, microservices, or APIs, our Golang experts can help you achieve your goals.", 
          image: "https://www.techinventive.com/img/golang2.svg" 
        },
        { label: "Custom Golang Solutions", 
          text: "At Techinventive Software, we understand the importance of delivering projects on time and within budget. That's why we work closely with our clients to understand their specific requirements and deliver tailored solutions that meet their needs. Our goal is to help our clients succeed in the competitive digital landscape by providing them with reliable, scalable, and innovative Golang solutions.", 
          image: "https://www.techinventive.com/img//golang3.svg" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
           { label: "GoLang", image: "https://www.techinventive.com/img/services_icon/golang.svg" },
           { label: "HTML5", image: "https://www.techinventive.com/img/services_icon/devicon_html5-wordmark.svg" },
           { label: "Docker", image: "https://www.techinventive.com/img/services_icon/skill-icons_docker.svg" },
           { label: "MySql", image: "https://www.techinventive.com/img/services_icon/ph_file-sql-fill.svg" },
           { label: "MongoDB", image: "https://www.techinventive.com/img/services_icon/MongoDB.svg" },
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our Golang development services and how we can help you achieve your business goals with Golang & Go.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  },
  { id: 12, 
    title: "PSD to HTML", 
    intro: {
      title: "PSD to HTML Conversion Services",
      description: "Our team consists of highly skilled professionals with expertise in a wide range of technologies and industries.",
      image: "https://www.techinventive.com/img/psdtohtml_banner.svg"
    },
    counters: [
      { label: "Countries", start: 0, end: 50, duration: 1000 },
      { label: "Working Hours", start: 0, end: 100000, duration: 1000 },
      { label: "Live Projects", start: 0, end: 500, duration: 1000 }
    ],
    highlights: {
      title: "PSD to HTML Conversion",
      subtitle: "Our web designers, design and attach codes in such a way that could be easily found in a one go on the internet. The visitors can seamlessly experience our special quality design while browsing on the iPhones, laptops and desktops. We can develop fresh websites from scratch and optimize your current website with the mobile responsive design guidelines.",
      items: [
        { label: "", 
          text: "Techinventive Software offers high-quality PSD to HTML conversion services to transform your designs into fully functional and responsive websites. Our team of skilled developers ensures pixel-perfect conversion with clean, well-structured HTML and CSS code.", 
          image: "https://www.techinventive.com/img/psd1.jpg" 
        },
        { label: "", 
          text: "With our PSD to HTML conversion services, you can expect fast turnaround times and high-quality results. We pay attention to detail to ensure that your website looks and functions exactly as intended across all devices and browsers.", 
          image: "https://www.techinventive.com/img/psd2.jpg" 
        },
        { label: "", 
          text: "Whether you have a single-page design or a complex website layout, we have the expertise to handle your PSD to HTML conversion needs. Contact us today to learn more about our PSD to HTML conversion services and how we can help you bring your designs to life on the web.", 
          image: "https://www.techinventive.com/img/webdesign1.jpg" 
        }
      ]
    },
    techStack: {
        title: "Programming Languages & Frameworks:",
        items: [
          { label: "HTML5", image: "https://www.techinventive.com/img/services_icon/devicon_html5-wordmark.svg" },
          { label: "JS", image: "https://www.techinventive.com/img/services_icon/fa-brands_js-square.svg" },
          { label: "BootStrap", image: "https://www.techinventive.com/img/services_icon/devicon_bootstrap.svg" },
          { label: "Elementor", image: "https://www.techinventive.com/img/services_icon/simple-icons_elementor.svg" },
          { label: "React.js", image: "https://www.techinventive.com/img/services_icon/skill-icons_react-dark.svg" },
          { label: "Material UI", image: "https://www.techinventive.com/img/services_icon/skill-icons_materialui-light.svg" },
          { label: "Materialize", image: "https://www.techinventive.com/img/services_icon/devicon_materializecss.svg" },
          { label: "Tailwind CSS", image: "https://www.techinventive.com/img/services_icon/skill-icons_tailwindcss-light.svg" }
        ],
    },  
    projects: {
      title: "Past projects we have completed",
      items:[
          {
            id: 1,
            title: "SKArtificial intelligence",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for an informative website for Healthcare professionals using CMS",
            solution: "Designed & Developed a Website from Scratch using latest Drupal Version. This is an informative website for their Community Members and Healthcare Professionals for Question & Answers related to Vaccination.",
            link: "https://www.skai.org.au",
            websiteImages:[
                "https://www.techinventive.com/img/OR7V111%202.png",
            ]
          },
          {
            id: 2,
            title: "EXCLUSIFE",
            category: ["User Interface", "User Experience", "Web", "Mobile"],
            businessChallenge: "looking for B2B Marketing platform for offline retailers to generate more business and improve their performance",
            solution: "Team developed a Marketing platform for improving business performance of retailers via CRM, Marketing Automation and target customers.",
            link: "https://www.exclusife.com",
            websiteImages:[
                "https://www.techinventive.com/img/tech/3/OR7V111%202.png",
            ]
          }
      ]
        
    },
    contact:{
      title: "Contact us today to learn more about our PSD2HTML5 services and how we can help you achieve your business goals.",
      link:"Get In Touch"
    },
    relatedServices:{
      title: "Other services",
      items:[
        {
          id:1,
          title: "Artificial intelligence",
          description:"Techinventive Software is a leading AI service provider based in Delhi, India, offering cutting-edge solutions to businesses seeking to harness the power of AI. Our team of AI experts is dedicated to delivering innovative AI solutions that drive business growth and efficiency.",
          link: "/services/artificial-intelligence",
          image: "https://www.techinventive.com/img/Frame55.png"
        },
        {
          id:2,
          title: "Machine learning",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/machine-learning"
        },
        {
          id:3,
          title: "Block Chain",
          description:"Techinventive Software is a premier provider of machine learning services in Delhi, India. We specialize in developing innovative machine learning solutions that help businesses unlock the full potential of their data.",
          link: "/services/blockchain"
        }
      ]
    }
  }
];

app.get("/api/webservices/:serviceName", (req, res) => {
  const { serviceName } = req.params; // ✅ Get from route params
  const formattedName = serviceName.toLowerCase().replace(/\s+/g, "-");

  const service = webservices.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, "-") === formattedName // ✅ Match by title
  );

  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: "Service not found" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
