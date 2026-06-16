// Domains / Tracks per assignment brief
export const DOMAINS = [
  'AI/ML',
  'Web Dev',
  'IoT',
  'Cyber Security',
  'Blockchain',
];

// Years of Study (1st, 2nd, 3rd, 4th year)
export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

// Courses
export const COURSES = [
  'B.Tech',
  'M.Tech',
  'BCA',
  'MCA',
  'BSc',
  'Other',
];

// Branches
export const BRANCHES = [
  'CSE',
  'IT',
  'ECE',
  'ME',
  'CE',
  'Other',
];

// Pre-defined list of colleges (dropdown)
export const COLLEGES = [
  'IIT Bombay',
  'IIT Delhi',
  'IIT Madras',
  'IIT Kanpur',
  'IIT Kharagpur',
  'IIT Roorkee',
  'NIT Trichy',
  'NIT Warangal',
  'NIT Surathkal',
  'NIT Calicut',
  'BITS Pilani',
  'BITS Goa',
  'BITS Hyderabad',
  'VIT Vellore',
  'VIT Chennai',
  'SRM Institute of Science and Technology',
  'Manipal Institute of Technology',
  'Amrita Vishwa Vidyapeetham',
  'PSG College of Technology',
  'Coimbatore Institute of Technology',
  'Anna University',
  'Pune Institute of Computer Technology',
  'Symbiosis Institute of Technology',
  'MIT Pune',
  'VJTI Mumbai',
  'K.J. Somaiya College of Engineering',
  'DY Patil College of Engineering',
  'Pillai College of Engineering',
  'Fr. Conceicao Rodrigues College of Engineering',
  'Thadomal Shahani Engineering College',
  'Sinhgad College of Engineering',
  'Savitribai Phule Pune University',
  'University of Mumbai',
  'Osmania University',
  'JNTU Hyderabad',
  'Chaitanya Bharathi Institute of Technology',
  'VNR Vignana Jyothi Institute of Engineering and Technology',
  'Institute of Aeronautical Engineering',
  'Jawaharlal Nehru Technological University Anantapur',
  'Other',
];

// Team Sizes (1-5)
export const TEAM_SIZES = [1, 2, 3, 4, 5];

export const FAQ_DATA = [
  {
    question: 'Who can participate in the hackathon?',
    answer:
      'Students from any college/university pursuing undergraduate or postgraduate courses in any discipline can participate.',
  },
  {
    question: 'What is the team size?',
    answer:
      'Teams can consist of 1-5 members. Solo participants are also welcome.',
  },
  {
    question: 'Is there any registration fee?',
    answer:
      'No, the hackathon is completely free to participate.',
  },
  {
    question: 'What should I submit?',
    answer:
      'You need to submit your project presentation (PPT), prototype link, and optionally a demo video.',
  },
  {
    question: 'When is the deadline?',
    answer:
      'The registration deadline will be announced soon. Stay tuned!',
  },
  {
    question: 'How will winners be selected?',
    answer:
      'Projects will be evaluated based on innovation, technical implementation, impact, and presentation.',
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export const TIMELINE_DATA = [
  {
    phase: 'Registration',
    date: `Jan 15 - Feb 15, ${CURRENT_YEAR}`,
    description: 'Register your team and submit project details',
  },
  {
    phase: 'Ideation',
    date: `Feb 16 - Feb 28, ${CURRENT_YEAR}`,
    description: 'Refine your idea and start building',
  },
  {
    phase: 'Development',
    date: `Mar 1 - Mar 20, ${CURRENT_YEAR}`,
    description: 'Build your prototype and prepare presentation',
  },
  {
    phase: 'Submission',
    date: `Mar 21 - Mar 25, ${CURRENT_YEAR}`,
    description: 'Submit your final project and demo',
  },
  {
    phase: 'Evaluation',
    date: `Mar 26 - Mar 31, ${CURRENT_YEAR}`,
    description: 'Jury evaluates all submissions',
  },
  {
    phase: 'Results',
    date: `April 5, ${CURRENT_YEAR}`,
    description: 'Winners announcement and prize distribution',
  },
];

export const PRIZES = [
  {
    position: '1st Prize',
    amount: '₹50,000',
    icon: '🥇',
  },
  {
    position: '2nd Prize',
    amount: '₹30,000',
    icon: '🥈',
  },
  {
    position: '3rd Prize',
    amount: '₹20,000',
    icon: '🥉',
  },
];