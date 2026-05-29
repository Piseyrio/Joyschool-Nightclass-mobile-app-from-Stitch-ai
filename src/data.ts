import { Student, Invoice, Schedule, FeeType, ClassSession, AcademicSubject } from './types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'JSNC-20',
    nameEn: 'Srey Neath',
    nameKhKh: 'ហាង / 苏玲娜',
    gender: 'Female',
    birthday: '2022-08-11',
    phone: '090222753',
    email: 'JSNC-20@gmail.com',
    fatherName: 'Yes',
    motherName: 'Yes',
    address: 'ដង្កោ',
    classLevel: 'C.5 Fan Xia',
    subject: 'Hsk 5 Fan Xai',
    teacher: 'Fan xia',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJEZ3d8_SqgGKRrJ2rDCsbd-pkXksBpQK22cKrKh9i7fiRMzwbebmLQ_CqCicyWVddi_Xl4d4jOeNFMiyQpjStDwjFNaw0QOYaqMBTb8lt8gzC7pFoU6YsChW6zDs6yJK_tru-2QdyILRqmgy8-kGGLHMYFPvsZJzqlInyMVTtDkPOHeC6Iv-hT7_wsYrsIcmnIDr0vjYhL9cR2cVxw4KyQ4Ikg3-9EW4b73z0P2gKruA8n6m9jmiD__QMI_IolSmX2u-h3J1j77g6',
    status: 'Active',
    joinDate: '2025-12-01',
    biometricCode: '20',
    motorbike: true,
    discount: 0,
    attendance: {
      present: 109,
      late: 0,
      absent: 96,
      excused: 20
    }
  },
  {
    id: 'JSNC-26',
    nameEn: 'Sovanndara',
    nameKhKh: 'ជឹង',
    gender: 'Male',
    birthday: '2005-04-12',
    phone: '098555123',
    email: 'sovanndara.jeng@gmail.com',
    fatherName: 'Yes',
    motherName: 'Yes',
    address: 'ច្បារអំពៅ',
    classLevel: 'C.4 Lifang',
    subject: 'En - Siling',
    teacher: 'Siling',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdpDWEkU_7SGR5gmfPQ6ga6z17c25qm4m8sn_xZW72THzZCYpZIdMTHcjGaaZhj5Y9zzCC5dzIbZy1kdWB4pdzRl_IEMXeTamJsZtee21j4iKY37XscsSM7Gj7VudyqfJW4Urwkk0Dysfg4T4i5_QMZecNKhsp_rpaMN3knvdTmJ6iF2R6DWdNyeNcYoRW1VLizdAUJL36_dVAJX8tU-grsnheVY5e3Q95JnwjZxzuXJQzd_bmGEuvdjmBmTlZH6ChnJdjCCaZV61I',
    status: 'Active',
    joinDate: '2025-11-15',
    biometricCode: '26',
    motorbike: true,
    discount: 10,
    attendance: {
      present: 94,
      late: 2,
      absent: 10,
      excused: 4
    }
  },
  {
    id: 'JSNC-80',
    nameEn: 'Chan Srey',
    nameKhKh: 'យោង',
    gender: 'Female',
    birthday: '2006-09-24',
    phone: '085444988',
    email: 'chan.srey.yo@gmail.com',
    fatherName: 'Yes',
    motherName: 'Yes',
    address: 'ទួលគោក',
    classLevel: 'En - Taily',
    subject: 'HSK1(B)',
    teacher: 'Taily',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyVnI5bx3fTzB5GIA2I3Mv4Pg6QMnVn3-nCCUph14kGjggVso25yuZg2CBFR20D8Q8iZlpZzbMwvUMZPt-Va-Gp5EITFiUlzxZ3Rnob-DEv6nbJLUwLYW6ySHP7rdsn0cAUjIWvfW9GbdGDJbbq4MoOXE9zvCPGzq35v_OhcrFqPNLE5_Nok7C1a7qCBD0knUjUconfjUYU08wECLI6EsK9IqR2rVMVKyLq0Wd00jUgpIMJE_SsimZvctOJdIr18uMIOEjLzPvAlK_',
    status: 'Active',
    joinDate: '2025-12-05',
    biometricCode: '80',
    motorbike: false,
    discount: 0,
    attendance: {
      present: 120,
      late: 5,
      absent: 3,
      excused: 12
    }
  },
  {
    id: 'JSNC-48',
    nameEn: 'Vicheka',
    nameKhKh: 'លី',
    gender: 'Male',
    birthday: '2004-12-30',
    phone: '012999333',
    email: 'vicheka.ly@gmail.com',
    fatherName: 'Yes',
    motherName: 'Yes',
    address: 'មានជ័យ',
    classLevel: 'C.2 Zhi Long',
    subject: 'Zhi Long HSK 2',
    teacher: 'Zhi Long',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7dICP045lrrqhyPnB6s0pOJgGc_CRNCbuDKrijM1RTuVMJs1r3mQeKxh9Kadk4b6mZ963s9d4u1wuzL0sfzT8CsbULk60OVY64fzKSYGNLKFe2eKG2pZfrBR5XMkmNh2CklZc3CI2H1NDuyrQOGwEZ1SM0hGXAFkVOTU2v8RvpJo-QCOEjYU4wESoGuaYBHh-zvABDba2wuzX0tY_JcgkIqBn5VFnGALb0w2CsGoJQzUMW7OtyfUa97WQYxZV9KzlCe4GTrFUZEHB',
    status: 'Active',
    joinDate: '2025-08-10',
    biometricCode: '48',
    motorbike: true,
    discount: 15,
    attendance: {
      present: 88,
      late: 0,
      absent: 15,
      excused: 8
    }
  },
  {
    id: 'JSNC-81',
    nameEn: 'Lita',
    nameKhKh: 'យិន',
    gender: 'Female',
    birthday: '2007-02-18',
    phone: '093777111',
    email: 'lita.yin@gmail.com',
    fatherName: 'Yes',
    motherName: 'Yes',
    address: 'បឹងកេងកង',
    classLevel: 'En - Lyya',
    subject: 'HSK1(B)',
    teacher: 'Ly ya',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSMEJ9VPm8qUasR5PA_U1izCePAD09Qh0BJ-1WpRdOahKHnfR0IH3KVbIuBLaLKokRjW6Srk0WSFCy-_WQNdjqpTlbXN07F743HmxoKbnaySJpZ4Lnu1hmGFln6q8jtyo1Raqp18liNLEsbWRxabiaumQmU3icM4wXi5fasuV-RN_PxaWvfeGFEA5qOasqsj9nshvPjZy5PhHd7MWY03Bg5W1mWYDLQ-hE459xLNZ6AU3s3KPXxeFBevxGC-wKpdWaySwHGs0x9cOb',
    status: 'Active',
    joinDate: '2025-12-10',
    biometricCode: '81',
    motorbike: false,
    discount: 5,
    attendance: {
      present: 104,
      late: 1,
      absent: 8,
      excused: 2
    }
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'f6a2b6e1',
    studentId: 'JSNC-20',
    studentName: 'Srey Neath (ហាង / 苏玲娜)',
    feeType: 'Tuition Part-time',
    amount: 3.00,
    dueDate: '2026-06-15',
    status: 'Pending'
  },
  {
    id: 'd3aa7c9f',
    studentId: 'JSNC-81',
    studentName: 'Lita (យិន)',
    feeType: 'Transportation',
    amount: 3.00,
    dueDate: '2026-06-20',
    status: 'Pending'
  },
  {
    id: 'INV-9902',
    studentId: 'JSNC-20',
    studentName: 'David Smith',
    feeType: 'Monthly Tuition',
    amount: 450.00,
    dueDate: '2026-05-15',
    status: 'PAID',
    paidDate: '2026-05-15',
    method: 'cash',
    notes: 'Paid fully'
  },
  {
    id: 'INV-9905',
    studentId: 'JSNC-26',
    studentName: 'JSNC-236 - លីលី ហួត',
    feeType: 'Registration Fee',
    amount: 120.00,
    dueDate: '2026-05-20',
    status: 'Pending'
  }
];

export const INITIAL_SCHEDULES: Schedule[] = [
  {
    id: 'SCH-01',
    label: 'HSK 5 Evening Session',
    className: 'C.5 Fan Xia',
    subjectName: 'Hsk 5 Fan Xai',
    teacherName: 'Fan xia',
    recurrence: 'Weekly',
    days: ['M', 'T', 'W', 'F'],
    startTime: '18:00',
    endTime: '19:00',
    rules: {
      scanOpens: 60,
      presentGrace: 15,
      lateLimit: 45,
      checkoutClose: 30
    },
    requireCheckout: true,
    active: true
  },
  {
    id: 'SCH-02',
    label: 'Combine Academic Assembly',
    className: 'Grade 10-A',
    subjectName: 'General Assembly',
    teacherName: 'Dr. Samuel Richardson',
    recurrence: 'Weekly',
    days: ['S'],
    startTime: '10:00',
    endTime: '11:00',
    rules: {
      scanOpens: 30,
      presentGrace: 10,
      lateLimit: 30,
      checkoutClose: 15
    },
    requireCheckout: false,
    active: true
  }
];

export const INITIAL_FEES: FeeType[] = [
  {
    name: 'Monthly Tuition Fee',
    defaultAmount: 450.00,
    description: 'Billed monthly on the 10th of every month',
    isRecurring: true
  },
  {
    name: 'Textbook & Reading Material',
    defaultAmount: 25.00,
    description: 'One-time registration learning resources fee',
    isRecurring: false
  },
  {
    name: 'Motorbike Parking Permit',
    defaultAmount: 10.00,
    description: 'Security perimeter permit code for motorbike gate access',
    isRecurring: true
  }
];

export const INITIAL_CLASSES: ClassSession[] = [
  {
    name: 'C.5 Fan Xia',
    gradeLevel: 'Grade 11',
    teacher: 'Fan Xia',
    room: 'Room 304',
    capacity: 35,
    term: '2024 - 25'
  },
  {
    name: 'C.4 Lifang',
    gradeLevel: 'Grade 10',
    teacher: 'Siling Phally',
    room: 'Room 201',
    capacity: 30,
    term: '2024 - 25'
  }
];

export const INITIAL_SUBJECTS: AcademicSubject[] = [
  {
    name: 'Hsk 5 Fan Xai',
    code: 'HSK5-FX',
    credits: 3,
    department: 'Science'
  },
  {
    name: 'Advanced Mathematics',
    code: 'MATH301',
    credits: 4,
    department: 'Science'
  },
  {
    name: 'General Assembly',
    code: 'GASM-01',
    credits: 1,
    department: 'Arts'
  }
];
