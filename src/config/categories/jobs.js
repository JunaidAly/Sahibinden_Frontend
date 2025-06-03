// 📁 src/config/categories/jobs.js
export const jobsConfig = {
  title: 'Job Postings',
  level1: [
    { id: 'fullTime', label: 'Full Time' },
    { id: 'partTime', label: 'Part Time' },
    { id: 'freelance', label: 'Freelance' },
    { id: 'internship', label: 'Internship' },
    { id: 'contract', label: 'Contract' },
  ],
  level2: {
    fullTime: [
      { id: 'technology', label: 'Technology' },
      { id: 'marketing', label: 'Marketing' },
      { id: 'sales', label: 'Sales' },
      { id: 'finance', label: 'Finance' },
      { id: 'healthcare', label: 'Healthcare' },
      { id: 'education', label: 'Education' },
    ],
    partTime: [
      { id: 'retail', label: 'Retail' },
      { id: 'hospitality', label: 'Hospitality' },
      { id: 'tutoring', label: 'Tutoring' },
      { id: 'customerService', label: 'Customer Service' },
    ],
    freelance: [
      { id: 'writing', label: 'Writing' },
      { id: 'design', label: 'Design' },
      { id: 'development', label: 'Development' },
      { id: 'consulting', label: 'Consulting' },
    ],
    internship: [
      { id: 'technology', label: 'Technology' },
      { id: 'marketing', label: 'Marketing' },
      { id: 'finance', label: 'Finance' },
      { id: 'engineering', label: 'Engineering' },
    ],
    contract: [
      { id: 'project', label: 'Project Based' },
      { id: 'temporary', label: 'Temporary' },
      { id: 'seasonal', label: 'Seasonal' },
    ]
  },
  level3: {
    technology: [
      { id: 'software', label: 'Software Development' },
      { id: 'dataScience', label: 'Data Science' },
      { id: 'cybersecurity', label: 'Cybersecurity' },
      { id: 'devops', label: 'DevOps' },
    ],
    marketing: [
      { id: 'digital', label: 'Digital Marketing' },
      { id: 'social', label: 'Social Media' },
      { id: 'content', label: 'Content Marketing' },
      { id: 'seo', label: 'SEO' },
    ]
  }
};