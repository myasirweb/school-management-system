const STORAGE_KEY = "school_policies";

export const POLICIES = [
  {
    id: "POL001",
    title: "Code of Conduct",
    category: "HR",
    tag: "HR",
    tagColor: "rgb(82,107,177)",
    description: [
      "The Code of Conduct outlines the behavioral standards expected of all students, staff members, and visitors within the premises of Global School. Every member of the school community is responsible for maintaining an environment that promotes learning, respect, and professionalism at all times.",
      "Students are expected to conduct themselves with integrity, show respect toward teachers, peers, and support staff, and uphold the values of the institution. Any behavior that disrupts the learning environment, including verbal aggression, physical intimidation, or deliberate property damage, will be subject to disciplinary review by the school administration.",
      "Staff members are held to a higher standard of professional conduct and are expected to model the values they wish to instill in students. This includes punctuality, respectful communication, confidentiality of student records, and adherence to all institutional policies and guidelines.",
      "Violations of this Code of Conduct will be addressed through a structured disciplinary process, which may include verbal warnings, parental notifications, suspension, or in severe cases, expulsion. All parties are entitled to a fair hearing before any disciplinary action is finalized.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "15 Aug 2024",
    createdBy: "Principal's Office",
  },
  {
    id: "POL002",
    title: "Attendance Policy",
    category: "Academic",
    tag: "ACE",
    tagColor: "rgb(100,196,178)",
    description: [
      "Regular attendance is a fundamental requirement for academic success at Global School. Students are expected to be present for all scheduled classes, examinations, and school-sanctioned activities unless prevented by illness or other legitimate circumstances approved in advance by the school administration.",
      "A student who is absent for more than 25% of the total school days in an academic term without valid justification may be considered ineligible to sit for end-of-term examinations. Parents or guardians must provide a written explanation for any absence exceeding three consecutive school days.",
      "Late arrivals are recorded separately and three instances of tardiness will be counted as one absence. Students who are habitually late disrupt classroom activities and will be counseled by their class teacher. Persistent tardiness will be escalated to the Vice Principal and parents will be formally notified.",
      "In cases of extended illness or medical emergencies, parents must submit a doctor's certificate and a formal request for leave of absence to the school office. The administration will work with the student to develop a catch-up plan ensuring no academic progress is lost during the period of absence.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "01 Sep 2024",
    createdBy: "Academic Committee",
  },
  {
    id: "POL003",
    title: "Anti-Bullying Policy",
    category: "Safety",
    tag: "SAF",
    tagColor: "rgb(232,19,123)",
    description: [
      "Global School is committed to providing a safe, inclusive, and supportive learning environment for every student. Bullying in any form — whether physical, verbal, relational, or cyberbullying — is strictly prohibited and will not be tolerated within or outside school premises during school-related activities.",
      "Bullying is defined as repeated, intentional behavior intended to hurt, intimidate, or humiliate another individual. This includes name-calling, spreading rumors, deliberate exclusion from peer groups, threats, physical violence, and harassment through digital platforms such as social media and messaging applications.",
      "Any student who witnesses or experiences bullying is encouraged to report the incident immediately to a teacher, counselor, or school administrator. All reports will be treated confidentially and investigated promptly. Retaliatory behavior toward a student who has reported bullying will itself be treated as a serious disciplinary offense.",
      "Consequences for confirmed bullying behavior range from a formal written warning and mandatory counseling sessions to suspension or expulsion, depending on the severity and frequency of incidents. The school will also work with parents of both parties to ensure a safe and rehabilitative outcome for all students involved.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "10 Jul 2024",
    createdBy: "Student Welfare Committee",
  },
  {
    id: "POL004",
    title: "Examination Policy",
    category: "Academic",
    tag: "ACE",
    tagColor: "rgb(100,196,178)",
    description: [
      "Examinations at Global School are conducted to assess student learning, measure academic progress, and identify areas where additional support may be needed. All examinations are administered under strictly controlled conditions to ensure fairness and integrity across all year groups.",
      "Students must arrive at the examination hall at least fifteen minutes before the scheduled start time. Late arrivals after the first thirty minutes will not be permitted to enter. Students are required to bring valid identification, their examination registration number, and approved stationery items to each examination.",
      "Any form of academic dishonesty, including copying, unauthorized use of notes, communication with other students during an examination, or use of electronic devices, will result in immediate disqualification. A formal academic misconduct record will be created and the student will be subject to further disciplinary action.",
      "Students with special educational needs or disabilities may apply for examination accommodations such as extended time or the use of assistive technology through the school's Special Educational Needs Coordinator. Applications must be submitted at least four weeks prior to the commencement of examinations.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "20 Aug 2024",
    createdBy: "Examinations Board",
  },
  {
    id: "POL005",
    title: "Fee Payment Policy",
    category: "Finance",
    tag: "FIN",
    tagColor: "rgb(180,140,0)",
    description: [
      "School fees at Global School are due at the beginning of each academic term as outlined in the fee schedule provided at the start of the academic year. All fees must be paid by the specified due date to avoid the application of late payment charges. Receipts will be issued for all payments made through the school's official payment channels.",
      "A grace period of fourteen calendar days is granted after the fee due date, during which payments may be made without penalty. After this grace period, a late payment surcharge of 2% per week will be applied to the outstanding balance. Students with outstanding fees beyond thirty days may be suspended from class attendance pending resolution.",
      "Parents experiencing genuine financial hardship may apply for a fee deferral, installment plan, or scholarship assistance by submitting a formal written request to the Finance Office accompanied by supporting documentation. Applications will be reviewed by the Finance Committee on a case-by-case basis within ten working days.",
      "Refund requests for fees paid in advance must be submitted in writing within the first two weeks of the academic term. The school reserves the right to deduct administrative costs from any approved refunds. No refunds will be issued for fees covering services already rendered, including tuition, examination fees, and extracurricular activity charges.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "01 Jan 2024",
    createdBy: "Finance Department",
  },
  {
    id: "POL006",
    title: "Leave Policy",
    category: "HR",
    tag: "HR",
    tagColor: "rgb(82,107,177)",
    description: [
      "The Leave Policy of Global School governs the entitlement, application, and approval process for all types of leave available to teaching and non-teaching staff. The policy is designed to balance the operational needs of the school with the personal wellbeing of its employees.",
      "Full-time teaching staff are entitled to 30 days of annual leave per academic year, exclusive of public holidays and school vacations. Non-teaching staff are entitled to 21 days of annual leave per calendar year. Leave entitlement for part-time staff is calculated on a pro-rata basis relative to their contracted working hours.",
      "All leave applications must be submitted through the official HR system at least five working days in advance for planned leave. Emergency or medical leave must be reported to the immediate supervisor as early as possible, with supporting documentation provided upon return to work. Leave taken without prior approval will be marked as unauthorized absence.",
      "Unused annual leave may be carried forward to the following year, subject to a maximum accrual cap of 15 days. Any leave balance exceeding this cap at the close of the academic year will be forfeited. Staff are strongly encouraged to utilize their leave entitlement throughout the year for personal wellbeing and work-life balance.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "01 Jan 2024",
    createdBy: "Human Resources Department",
  },
  {
    id: "POL007",
    title: "Data Privacy Policy",
    category: "Admin",
    tag: "ADM",
    tagColor: "rgb(69,198,238)",
    description: [
      "Global School is committed to protecting the privacy and security of personal data belonging to students, parents, staff, and other stakeholders. This policy sets out the principles and practices governing the collection, storage, use, and disclosure of personal information in compliance with applicable data protection legislation.",
      "Personal data is collected only for legitimate educational and administrative purposes and is limited to what is strictly necessary. Data is stored securely in encrypted systems with access restricted to authorized personnel. The school employs robust cybersecurity measures, including regular security audits and staff training, to prevent unauthorized access or loss of data.",
      "The school will not share personal data with third parties without explicit consent, except where required by law or as necessary for the provision of educational services. Any third-party service providers with access to school data are contractually bound to adhere to equivalent data protection standards.",
      "Individuals have the right to access, correct, or request deletion of their personal data held by the school. Data subject access requests must be submitted in writing to the Data Protection Officer. The school will respond to all verified requests within 30 calendar days. Concerns may be directed to the Data Protection Officer or the relevant national supervisory authority.",
    ],
    effectiveDate: "25 May 2023",
    lastUpdated: "01 Jun 2024",
    createdBy: "Data Protection Officer",
  },
  {
    id: "POL008",
    title: "Health and Safety Policy",
    category: "Safety",
    tag: "SAF",
    tagColor: "rgb(232,19,123)",
    description: [
      "The Health and Safety Policy of Global School demonstrates the institution's commitment to providing a safe and healthy environment for all students, staff, visitors, and contractors. The school recognizes its legal and moral obligations to prevent accidents, injuries, and health hazards on its premises.",
      "The school maintains comprehensive emergency response plans, including fire evacuation procedures, first aid protocols, and crisis management frameworks. Fire drills are conducted at least twice per academic year. First aid kits are maintained in every block and the school nurse is available on campus during all school hours.",
      "All staff members are required to complete mandatory health and safety training as part of their induction and to participate in refresher training at least once every two years. Staff are responsible for reporting all hazards, near-miss incidents, and accidents to the Safety Officer within 24 hours of occurrence.",
      "Students are prohibited from engaging in activities that pose an unacceptable risk of injury. Science laboratories, woodwork rooms, and sports facilities have specific safety rules that must be strictly followed. Protective equipment must be worn in designated areas. Failure to comply with safety rules will result in exclusion from the relevant facility.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "01 Jan 2024",
    createdBy: "Safety Officer",
  },
  {
    id: "POL009",
    title: "Social Media Policy",
    category: "Admin",
    tag: "ADM",
    tagColor: "rgb(69,198,238)",
    description: [
      "The Social Media Policy governs the use of social media platforms by students and staff in relation to Global School. The school recognizes the value of social media as a communication tool while also acknowledging the potential risks associated with its misuse, including reputational damage, cyberbullying, and breach of privacy.",
      "Students are prohibited from posting content on social media that is derogatory, discriminatory, or defamatory toward any member of the school community. This includes content that targets individuals based on race, religion, gender, disability, sexual orientation, or socioeconomic background. Such conduct will be treated as a violation of the school's Anti-Bullying Policy.",
      "Staff members must maintain clear boundaries between their professional and personal social media presence. Staff must not engage with students via personal social media accounts, share confidential student information online, or post content that may be construed as representing the views of the school without prior authorization from the Communications Department.",
      "The school reserves the right to request the removal of social media content that violates this policy or causes harm to the school community. Persistent violations by students may result in loss of ICT privileges and disciplinary action. Staff violations may result in formal disciplinary proceedings under the school's HR disciplinary policy.",
    ],
    effectiveDate: "01 Sep 2023",
    lastUpdated: "01 Sep 2024",
    createdBy: "Communications Department",
  },
  {
    id: "POL010",
    title: "Dress Code Policy",
    category: "HR",
    tag: "HR",
    tagColor: "rgb(82,107,177)",
    description: [
      "Global School maintains a formal dress code policy that promotes a professional, inclusive, and distraction-free learning environment. Adherence to the dress code is mandatory for all students and reflects the values of discipline, equality, and institutional pride that the school seeks to cultivate.",
      "The official school uniform must be worn on all regular school days and during school-sanctioned events unless otherwise specified. The uniform consists of the school blazer, formal shirt or blouse in the prescribed color, school trousers or skirt of regulation length, black leather shoes, and the school tie.",
      "Clothing must be clean, well-fitted, and in good repair at all times. Jewelry is restricted to a single pair of plain stud earrings for female students and a simple wristwatch for all students. Visible tattoos, nail polish, unnatural hair colors, and extreme hairstyles are not permitted on school premises during school hours.",
      "Students not in compliance with the dress code will be issued a warning and may be required to contact a parent or guardian for a change of clothing before joining classes. Repeated violations will be escalated to the Head of Year and may result in a formal note being placed on the student's record.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "01 Jan 2024",
    createdBy: "Student Affairs Office",
  },
  {
    id: "POL011",
    title: "Homework Policy",
    category: "Academic",
    tag: "ACE",
    tagColor: "rgb(100,196,178)",
    description: [
      "The Homework Policy at Global School establishes a structured and consistent approach to out-of-class learning assignments across all year groups. Homework is a valuable extension of classroom instruction that reinforces learning, builds independent study habits, and prepares students for the demands of higher education.",
      "Teachers are expected to assign homework that is purposeful, clearly linked to current classroom learning, and appropriately calibrated to the student's year level. The estimated time required to complete homework should align with the guidelines set by the Academic Department. Assignments that are excessively lengthy or insufficiently related to curriculum objectives are not in keeping with this policy.",
      "Students are responsible for recording homework assignments in their school planners, completing work to the best of their ability, and submitting assignments on time. Late submissions will incur a grade penalty unless the student has received prior approval from the subject teacher. Teachers are required to provide timely and constructive feedback on all submitted homework.",
      "Parents are encouraged to support a consistent homework routine at home by providing a quiet study space and monitoring the completion of assignments. The school is committed to maintaining a healthy balance between academic workload and students' leisure and family time.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "15 Sep 2024",
    createdBy: "Academic Committee",
  },
  {
    id: "POL012",
    title: "Grievance Policy",
    category: "HR",
    tag: "HR",
    tagColor: "rgb(82,107,177)",
    description: [
      "The Grievance Policy provides a clear and fair mechanism through which students, parents, and staff members may raise concerns or complaints about matters that affect their experience within Global School. The school is committed to resolving all grievances promptly, transparently, and in a manner consistent with principles of natural justice.",
      "Any individual wishing to raise a grievance should initially attempt to resolve the matter informally by speaking directly with the relevant person — for example, a student's class teacher, head of department, or the individual whose actions have given rise to the concern. Many matters can be resolved swiftly through open and respectful communication at this informal stage.",
      "Where informal resolution is not possible or appropriate, a formal grievance may be submitted in writing to the school's Grievance Officer, setting out the nature of the complaint, the date of the incident, the parties involved, and the desired outcome. The Grievance Officer will acknowledge receipt within three working days and conduct a thorough investigation.",
      "The investigation will be completed within 15 working days unless exceptional circumstances require a longer period, in which case the complainant will be kept informed of the timeline. All parties have the right to be heard and to be accompanied by a support person. The outcome will be communicated in writing, including details of any appeal process.",
    ],
    effectiveDate: "01 Jan 2024",
    lastUpdated: "01 Jan 2024",
    createdBy: "Human Resources Department",
  },
];

export const seedPolicies = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(POLICIES));
  }
};

export const getPoliciesFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : POLICIES;
  } catch {
    return POLICIES;
  }
};

export const savePoliciesToStorage = (policies) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
  } catch {}
};
