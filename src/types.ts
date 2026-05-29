export interface Student {
  id: string;
  nameEn: string;
  nameKhKh?: string; // Khmer text if any
  gender: 'Male' | 'Female';
  birthday: string;
  phone: string;
  email: string;
  fatherName: string;
  motherName: string;
  address: string;
  classLevel: string;
  subject: string;
  teacher: string;
  avatar: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
  joinDate: string;
  biometricCode: string;
  motorbike: boolean;
  discount: number;
  attendance: {
    present: number;
    late: number;
    absent: number;
    excused: number;
  };
}

export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'PAID';
  paidDate?: string;
  method?: string;
  notes?: string;
}

export interface Schedule {
  id: string;
  label?: string;
  className: string;
  subjectName: string;
  teacherName: string;
  recurrence: 'Weekly' | 'Daily' | 'Custom';
  days: string[]; // e.g. ['M', 'T', 'W', 'T', 'F']
  startTime: string;
  endTime: string;
  rules: {
    scanOpens: number;
    presentGrace: number;
    lateLimit: number;
    checkoutClose: number;
  };
  requireCheckout: boolean;
  active: boolean;
}

export interface FeeType {
  name: string;
  defaultAmount: number;
  description?: string;
  isRecurring: boolean;
}

export interface ClassSession {
  name: string;
  gradeLevel: string;
  teacher: string;
  room: string;
  capacity: number;
  term: string;
}

export interface AcademicSubject {
  name: string;
  code: string;
  credits: number;
  department: string;
}
