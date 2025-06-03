// 📁 src/config/categories/help.js
export const helpConfig = {
  title: 'Those Seeking Help',
  level1: [
    { id: 'financial', label: 'Financial Assistance' },
    { id: 'medical', label: 'Medical Help' },
    { id: 'education', label: 'Educational Support' },
    { id: 'housing', label: 'Housing Assistance' },
    { id: 'emergency', label: 'Emergency Help' },
    { id: 'legal', label: 'Legal Aid' },
  ],
  level2: {
    financial: [
      { id: 'loans', label: 'Loan Requests' },
      { id: 'donations', label: 'Donation Requests' },
      { id: 'crowdfunding', label: 'Crowdfunding' },
      { id: 'business', label: 'Business Support' },
    ],
    medical: [
      { id: 'treatment', label: 'Medical Treatment' },
      { id: 'surgery', label: 'Surgery Funding' },
      { id: 'medication', label: 'Medication Help' },
      { id: 'equipment', label: 'Medical Equipment' },
    ],
    education: [
      { id: 'tuition', label: 'Tuition Fees' },
      { id: 'books', label: 'Books & Materials' },
      { id: 'scholarship', label: 'Scholarship Info' },
      { id: 'mentorship', label: 'Mentorship' },
    ],
    housing: [
      { id: 'temporary', label: 'Temporary Shelter' },
      { id: 'permanent', label: 'Permanent Housing' },
      { id: 'repairs', label: 'Home Repairs' },
    ],
    emergency: [
      { id: 'disaster', label: 'Disaster Relief' },
      { id: 'accident', label: 'Accident Support' },
      { id: 'family', label: 'Family Crisis' },
    ],
    legal: [
      { id: 'consultation', label: 'Legal Consultation' },
      { id: 'representation', label: 'Legal Representation' },
      { id: 'documentation', label: 'Legal Documentation' },
    ]
  },
  level3: {
    loans: [
      { id: 'personal', label: 'Personal Loans' },
      { id: 'business', label: 'Business Loans' },
      { id: 'education', label: 'Education Loans' },
    ],
    treatment: [
      { id: 'cancer', label: 'Cancer Treatment' },
      { id: 'heart', label: 'Heart Treatment' },
      { id: 'kidney', label: 'Kidney Treatment' },
    ]
  }
};