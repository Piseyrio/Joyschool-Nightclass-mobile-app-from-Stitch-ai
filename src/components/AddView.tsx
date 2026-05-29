import React, { useState } from 'react';
import { 
  UserPlus, 
  Users, 
  BookOpen, 
  Layers, 
  Calendar, 
  Receipt, 
  CreditCard, 
  PlusCircle, 
  CheckCircle2, 
  ArrowLeft, 
  Camera, 
  Trash2,
  ListPlus,
  BadgeAlert,
  Percent,
  TrendingDown
} from 'lucide-react';
import { Student, ClassSession, Schedule, FeeType, AcademicSubject } from '../types';

interface AddViewProps {
  onAddStudent: (student: Student) => void;
  onAddClass: (cls: ClassSession) => void;
  onAddSchedule: (sch: Schedule) => void;
  onAddFeeType: (fee: FeeType) => void;
  onAddSubject: (sub: AcademicSubject) => void;
  onNavigateTab: (tab: string) => void;
  initialFormView?: string | null;
  onClearFormView?: () => void;
}

export default function AddView({
  onAddStudent,
  onAddClass,
  onAddSchedule,
  onAddFeeType,
  onAddSubject,
  onNavigateTab,
  initialFormView = null,
  onClearFormView
}: AddViewProps) {
  // Navigation sub-routing for various forms
  const [activeForm, setActiveForm] = useState<string | null>(initialFormView);
  
  React.useEffect(() => {
    if (initialFormView) {
      setActiveForm(initialFormView);
    }
  }, [initialFormView]);

  const handleBackToHub = () => {
    setActiveForm(null);
    if (onClearFormView) onClearFormView();
  };

  // Toast confirmation trigger
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ==========================================
  // Form #1: NEW STUDENT REGISTRATION (Screen 7)
  // ==========================================
  const [studNameEn, setStudNameEn] = useState('');
  const [studNameKh, setStudNameKh] = useState('');
  const [studCode, setStudCode] = useState('JSNC-112');
  const [studGender, setStudGender] = useState<'Male' | 'Female'>('Female');
  const [studBirthday, setStudBirthday] = useState('2005-01-01');
  const [studPhone, setStudPhone] = useState('');
  const [studEmail, setStudEmail] = useState('');
  const [studAddress, setStudAddress] = useState('');
  const [studClass, setStudClass] = useState('HSK 1 (A)');
  const [studTeacher, setStudTeacher] = useState('Ly Ya Chinese');
  const [studSubject, setStudSubject] = useState('HSK 1');
  const [studMotorbike, setStudMotorbike] = useState(true);
  const [studDiscount, setStudDiscount] = useState<number>(0);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studNameEn) {
      alert('Please fill out the English Full Name!');
      return;
    }
    const newStudent: Student = {
      id: studCode,
      nameEn: studNameEn,
      nameKhKh: studNameKh || undefined,
      gender: studGender,
      birthday: studBirthday,
      phone: studPhone || '090123456',
      email: studEmail || `${studCode.toLowerCase()}@gmail.com`,
      fatherName: 'Yes',
      motherName: 'Yes',
      address: studAddress || 'Phnom Penh',
      classLevel: studClass,
      subject: studSubject,
      teacher: studTeacher,
      avatar: studGender === 'Female' 
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSMEJ9VPm8qUasR5PA_U1izCePAD09Qh0BJ-1WpRdOahKHnfR0IH3KVbIuBLaLKokRjW6Srk0WSFCy-_WQNdjqpTlbXN07F743HmxoKbnaySJpZ4Lnu1hmGFln6q8jtyo1Raqp18liNLEsbWRxabiaumQmU3icM4wXi5fasuV-RN_PxaWvfeGFEA5qOasqsj9nshvPjZy5PhHd7MWY03Bg5W1mWYDLQ-hE459xLNZ6AU3s3KPXxeFBevxGC-wKpdWaySwHGs0x9cOb'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdpDWEkU_7SGR5gmfPQ6ga6z17c25qm4m8sn_xZW72THzZCYpZIdMTHcjGaaZhj5Y9zzCC5dzIbZy1kdWB4pdzRl_IEMXeTamJsZtee21j4iKY37XscsSM7Gj7VudyqfJW4Urwkk0Dysfg4T4i5_QMZecNKhsp_rpaMN3knvdTmJ6iF2R6DWdNyeNcYoRW1VLizdAUJL36_dVAJX8tU-grsnheVY5e3Q95JnwjZxzuXJQzd_bmGEuvdjmBmTlZH6ChnJdjCCaZV61I',
      status: 'Active',
      joinDate: '2026-05-29',
      biometricCode: studCode.replace('JSNC-', ''),
      motorbike: studMotorbike,
      discount: studDiscount,
      attendance: { present: 0, late: 0, absent: 0, excused: 0 }
    };

    onAddStudent(newStudent);
    triggerToast(`Successfully registered student: ${studNameEn} (${studCode})!`);
    handleBackToHub();
  };

  // ==========================================
  // Form #2: CREATE NEW SCHEDULE (Screen 10)
  // ==========================================
  const [schLabel, setSchLabel] = useState('');
  const [schClass, setSchClass] = useState('Grade 10-A');
  const [schSubject, setSchSubject] = useState('Mathematics');
  const [schTeacher, setSchTeacher] = useState('Dr. Smith');
  const [schRecurrence, setSchRecurrence] = useState<'Weekly' | 'Daily' | 'Custom'>('Weekly');
  const [schDays, setSchDays] = useState<string[]>(['T']);
  const [schStart, setSchStart] = useState('08:00');
  const [schEnd, setSchEnd] = useState('10:00');
  
  // Rules Sliders
  const [ruleScanOpen, setRuleScanOpen] = useState(60);
  const [rulePresentGrace, setRulePresentGrace] = useState(15);
  const [ruleLateLimit, setRuleLateLimit] = useState(45);
  const [ruleCheckoutClose, setRuleCheckoutClose] = useState(30);
  
  const [schRequireCheckout, setSchRequireCheckout] = useState(true);
  const [schActiveEnabled, setSchActiveEnabled] = useState(true);

  const toggleDay = (day: string) => {
    if (schDays.includes(day)) {
      setSchDays(schDays.filter(d => d !== day));
    } else {
      setSchDays([...schDays, day]);
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSchedule: Schedule = {
      id: `SCH-${Math.floor(Math.random() * 1000)}`,
      label: schLabel || undefined,
      className: schClass,
      subjectName: schSubject,
      teacherName: schTeacher,
      recurrence: schRecurrence,
      days: schDays,
      startTime: schStart,
      endTime: schEnd,
      rules: {
        scanOpens: ruleScanOpen,
        presentGrace: rulePresentGrace,
        lateLimit: ruleLateLimit,
        checkoutClose: ruleCheckoutClose
      },
      requireCheckout: schRequireCheckout,
      active: schActiveEnabled
    };

    onAddSchedule(newSchedule);
    triggerToast(`Successfully configured schedule for ${schClass} on ${schDays.join(', ')}!`);
    handleBackToHub();
  };

  // ==========================================
  // Form #3: NEW FEE TYPE (Screen 9)
  // ==========================================
  const [feeName, setFeeName] = useState('');
  const [feeAmount, setFeeAmount] = useState<number>(100.00);
  const [feeDesc, setFeeDesc] = useState('');
  const [feeIsRecurring, setFeeIsRecurring] = useState(true);

  const handleFeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeName) {
      alert('Please enter a Fee Name!');
      return;
    }
    const newFee: FeeType = {
      name: feeName,
      defaultAmount: feeAmount,
      description: feeDesc || undefined,
      isRecurring: feeIsRecurring
    };

    onAddFeeType(newFee);
    triggerToast(`Successfully configured new Fee Type: "${feeName}" ($${feeAmount})!`);
    handleBackToHub();
  };

  // ==========================================
  // Form #4: NEW CLASS CREATION (Screen 12)
  // ==========================================
  const [clsName, setClsName] = useState('');
  const [clsGrade, setClsGrade] = useState('Grade 10');
  const [clsHomeroom, setClsHomeroom] = useState('Sokha Phally');
  const [clsRoom, setClsRoom] = useState('');

  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clsName) {
      alert('Class name / the Khmer description is required!');
      return;
    }
    const newCls: ClassSession = {
      name: clsName,
      gradeLevel: clsGrade,
      teacher: clsHomeroom,
      room: clsRoom || 'Room 304',
      capacity: 35,
      term: '2024 - 25'
    };

    onAddClass(newCls);
    triggerToast(`Successfully established Class: ${clsName} inside room ${clsRoom || '304'}!`);
    handleBackToHub();
  };

  // ==========================================
  // Form #5: NEW SUBJECT CREATION (Screen 13)
  // ==========================================
  const [subName, setSubName] = useState('');
  const [subCodeInput, setSubCodeInput] = useState('');
  const [subCredits, setSubCredits] = useState<number>(3);
  const [subDept, setSubDept] = useState('science');

  const handleSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName || !subCodeInput) {
      alert('Missing subject name or code!');
      return;
    }
    const newSub: AcademicSubject = {
      name: subName,
      code: subCodeInput.toUpperCase(),
      credits: subCredits,
      department: subDept
    };

    onAddSubject(newSub);
    triggerToast(`Successfully registered Subject: ${subName} (${subCodeInput.toUpperCase()})!`);
    handleBackToHub();
  };

  if (activeForm === 'new_student') {
    // ------------------------------------------
    // Custom View: Student Register (Screen 7)
    // ------------------------------------------
    return (
      <div className="pt-4 max-w-xl mx-auto space-y-6 animate-fade-in">
        <button onClick={handleBackToHub} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-violet-700 bg-violet-100 hover:bg-violet-200 text-xs font-bold transition-all cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Creation Hub
        </button>

        <section className="frozen-slab p-6 md:p-8 rounded-[2rem] border border-white/50 space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full bg-violet-50 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-violet-500 transition-colors">
                <Camera className="w-8 h-8 text-slate-400 group-hover:text-violet-600" />
              </div>
              <div className="absolute bottom-0 right-0 bg-violet-900 text-white p-1.5 rounded-full shadow-lg border border-white">
                <PlusCircle className="w-3.5 h-3.5" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-4">New Registration</h2>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Complete student profile details</p>
          </div>

          <form onSubmit={handleStudentSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-black tracking-widest text-violet-700 uppercase">Basic Information</label>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Full Name (English / Khmer)</label>
                <input 
                  type="text" 
                  value={studNameEn}
                  onChange={(e) => setStudNameEn(e.target.value)}
                  placeholder="e.g. Sok Samnang / សុខ សំណាង"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Student Code</label>
                  <input 
                    type="text" 
                    value={studCode}
                    onChange={(e) => setStudCode(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-extrabold text-violet-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Gender</label>
                  <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/50">
                    <button 
                      type="button" 
                      onClick={() => setStudGender('Female')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${studGender === 'Female' ? 'bg-white text-violet-800 shadow-sm' : 'text-slate-500'}`}
                    >
                      Female
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setStudGender('Male')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${studGender === 'Male' ? 'bg-white text-violet-800 shadow-sm' : 'text-slate-500'}`}
                    >
                      Male
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Birthday</label>
                <input 
                  type="date" 
                  value={studBirthday}
                  onChange={(e) => setStudBirthday(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <label className="text-xs font-black tracking-widest text-violet-700 uppercase">Contact Details</label>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Phone Number</label>
                <input 
                  type="tel" 
                  value={studPhone}
                  onChange={(e) => setStudPhone(e.target.value)}
                  placeholder="e.g. 09x xxx xxxx"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Email Address</label>
                <input 
                  type="email" 
                  value={studEmail}
                  onChange={(e) => setStudEmail(e.target.value)}
                  placeholder="e.g. student@gmail.com"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Address</label>
                <textarea 
                  rows={2}
                  value={studAddress}
                  onChange={(e) => setStudAddress(e.target.value)}
                  placeholder="Street, District, Province..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-medium focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-4 bg-violet-50/20 p-5 rounded-2xl">
              <label className="text-xs font-black tracking-widest text-violet-700 uppercase">Academic Assignment</label>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Class Level</label>
                <select 
                  value={studClass}
                  onChange={(e) => setStudClass(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none"
                >
                  <option>HSK 1 (A)</option>
                  <option>HSK 1 (B)</option>
                  <option>HSK 2</option>
                  <option>C.5 Fan Xia</option>
                  <option>English Taily</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Teacher Assignment</label>
                <select 
                  value={studTeacher}
                  onChange={(e) => setStudTeacher(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none"
                >
                  <option>Ly Ya Chinese</option>
                  <option>Fan Xia</option>
                  <option>Siling Phally</option>
                  <option>Xiao Ai</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <label className="text-xs font-black tracking-widest text-violet-700 uppercase">Enrollment Settings</label>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white/50 hover:bg-white">
                  <span className="text-xs font-bold text-slate-700">Motorbike License</span>
                  <input 
                    type="checkbox" 
                    checked={studMotorbike} 
                    onChange={(e) => setStudMotorbike(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" 
                  />
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white/50 hover:bg-white">
                  <span className="text-xs font-bold text-slate-700">Active Status</span>
                  <input 
                    type="checkbox" 
                    checked={true} 
                    readOnly
                    className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" 
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-500">Discount Applied (%)</label>
                  <span className="text-base font-extrabold text-violet-800">{studDiscount}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={studDiscount}
                    onChange={(e) => setStudDiscount(parseInt(e.target.value))}
                    className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-700"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4.5 bg-violet-900 text-white rounded-2xl font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-900/10 cursor-pointer"
            >
              <UserPlus className="w-5 h-5" />
              Register Student
            </button>
          </form>
        </section>
      </div>
    );
  }

  if (activeForm === 'new_schedule') {
    // ------------------------------------------
    // Custom View: Schedule Creator (Screen 10)
    // ------------------------------------------
    return (
      <div className="pt-4 max-w-xl mx-auto space-y-6 animate-fade-in">
        <button onClick={handleBackToHub} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-violet-700 bg-violet-100 hover:bg-violet-200 text-xs font-bold transition-all cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Creation Hub
        </button>

        <section className="frozen-slab p-6 md:p-8 rounded-[2rem] border border-white/50 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Create New Schedule</h2>
            <p className="text-xs text-slate-400 font-semibold">Configure class times and attendance parameters</p>
          </div>

          <form onSubmit={handleScheduleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <label className="text-xs font-black tracking-widest text-violet-700 uppercase">Basic Information</label>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Label (Optional)</label>
                <input 
                  type="text" 
                  value={schLabel}
                  onChange={(e) => setSchLabel(e.target.value)}
                  placeholder="e.g. Morning Assembly"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Class</label>
                  <select 
                    value={schClass} 
                    onChange={(e) => setSchClass(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold outline-none"
                  >
                    <option>Grade 10-A</option>
                    <option>Grade 11-B</option>
                    <option>C.5 Fan Xia</option>
                    <option>C.4 Lifang</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Subject</label>
                  <select 
                    value={schSubject} 
                    onChange={(e) => setSchSubject(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold outline-none"
                  >
                    <option>Mathematics</option>
                    <option>Hsk 5 Fan Xai</option>
                    <option>Physics</option>
                    <option>English Language</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Teacher</label>
                  <select 
                    value={schTeacher} 
                    onChange={(e) => setSchTeacher(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold outline-none"
                  >
                    <option>Dr. Smith</option>
                    <option>Prof. Johnson</option>
                    <option>Fan Xia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Time & Day */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <label className="text-xs font-black tracking-widest text-violet-700 uppercase">Time & Day Settings</label>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 block">Recurrence Type</label>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {(['Weekly', 'Daily', 'Custom'] as const).map(recur => (
                    <button
                      key={recur}
                      type="button"
                      onClick={() => setSchRecurrence(recur)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${schRecurrence === recur ? 'bg-violet-900 border-violet-900 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}
                    >
                      {recur}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">Day of Week</label>
                <div className="grid grid-cols-7 gap-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, dIdx) => {
                    const isSelected = schDays.includes(day);
                    return (
                      <button
                        key={dIdx}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`h-10 w-full flex items-center justify-center rounded-lg text-xs font-bold border transition-all ${
                          isSelected 
                            ? 'border-2 border-violet-900 bg-violet-50 text-violet-900' 
                            : 'border-slate-200 bg-white/50 text-slate-600'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">Start Time</label>
                  <input 
                    type="time" 
                    value={schStart}
                    onChange={(e) => setSchStart(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-center font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 block">End Time</label>
                  <input 
                    type="time" 
                    value={schEnd}
                    onChange={(e) => setSchEnd(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-center font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Attendance Rules Sliders */}
            <div className="space-y-5 border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black tracking-widest text-violet-700 uppercase">Attendance Rules</label>
                <span className="text-[10px] uppercase font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">Automated rules</span>
              </div>

              <div className="space-y-4">
                {/* Rule 1 */}
                <div className="space-y-1 px-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">SCAN OPENS</span>
                    <span className="text-violet-800">{ruleScanOpen} min</span>
                  </div>
                  <input 
                    type="range" min="10" max="120" step="5" value={ruleScanOpen} 
                    onChange={(e) => setRuleScanOpen(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-700"
                  />
                  <p className="text-[9px] text-slate-400 italic">Students can check in up to -{ruleScanOpen}m before session commences</p>
                </div>

                {/* Rule 2 */}
                <div className="space-y-1 px-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">PRESENT GRACE LIMIT</span>
                    <span className="text-violet-800">{rulePresentGrace} min</span>
                  </div>
                  <input 
                    type="range" min="5" max="45" step="5" value={rulePresentGrace} 
                    onChange={(e) => setRulePresentGrace(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-700"
                  />
                  <p className="text-[9px] text-slate-400 italic">Attendance marked as PRESENT during the first {rulePresentGrace}m</p>
                </div>

                {/* Rule 3 */}
                <div className="space-y-1 px-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">LATE LIMIT</span>
                    <span className="text-violet-800">{ruleLateLimit} min</span>
                  </div>
                  <input 
                    type="range" min="15" max="90" step="5" value={ruleLateLimit} 
                    onChange={(e) => setRuleLateLimit(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-700"
                  />
                  <p className="text-[9px] text-slate-400 italic">Marked LATE until {ruleLateLimit}m. After this is registered as ABSENT</p>
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between p-2">
                <div>
                  <p className="text-sm font-bold text-slate-800">Require Checkout</p>
                  <p className="text-[10px] text-slate-400">Strictly require exit tap to stamp duration records</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={schRequireCheckout}
                  onChange={(e) => setSchRequireCheckout(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" 
                />
              </div>

              <div className="flex items-center justify-between p-2 border-t border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">Active (Live Immediately)</p>
                  <p className="text-[10px] text-slate-400">Deploy this timetable directly into operational modules</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={schActiveEnabled}
                  onChange={(e) => setSchActiveEnabled(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" 
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4.5 bg-violet-900 text-white rounded-2xl font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Establish Schedule
            </button>
          </form>
        </section>
      </div>
    );
  }

  if (activeForm === 'new_fee_type') {
    // ------------------------------------------
    // Custom View: Fee Configurator (Screen 9)
    // ------------------------------------------
    return (
      <div className="pt-4 max-w-xl mx-auto space-y-6 animate-fade-in">
        <button onClick={handleBackToHub} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-violet-700 bg-violet-100 hover:bg-violet-200 text-xs font-bold transition-all cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Creation Hub
        </button>

        <section className="frozen-slab p-6 md:p-8 rounded-[2rem] border border-white/50 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">New Fee Type</h2>
            <p className="text-xs text-slate-400 font-semibold">Configure financial items before generating invoices</p>
          </div>

          <form onSubmit={handleFeeSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Fee Name</label>
              <input 
                type="text" 
                value={feeName}
                onChange={(e) => setFeeName(e.target.value)}
                placeholder="e.g. Monthly Tuition, Annual Textbook Access"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Default Amount ($)</label>
              <input 
                type="number" 
                step="0.01"
                value={feeAmount}
                onChange={(e) => setFeeAmount(parseFloat(e.target.value) || 0.01)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 focus:ring-1 focus:ring-violet-600 font-mono"
              />
              <p className="text-[10px] text-slate-400 px-1 font-medium">Billed currency equivalent in USD dollars ($)</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Description (Optional)</label>
              <textarea 
                rows={3}
                value={feeDesc}
                onChange={(e) => setFeeDesc(e.target.value)}
                placeholder="Details of coverages and billing intervals..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-medium text-slate-800"
              />
            </div>

            <div className="p-5 rounded-xl bg-violet-100/10 border border-violet-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Is this a Recurring Fee?</p>
                <p className="text-xs text-slate-500">Enable automatic cycle reminders (monthly/termly)</p>
              </div>
              <input 
                type="checkbox" 
                checked={feeIsRecurring}
                onChange={(e) => setFeeIsRecurring(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-violet-600" 
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-violet-900 text-white rounded-2xl font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-900/10 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              Configure Fee Type
            </button>
          </form>
        </section>
      </div>
    );
  }

  if (activeForm === 'new_class') {
    // ------------------------------------------
    // Custom View: Class Creator (Screen 12)
    // ------------------------------------------
    return (
      <div className="pt-4 max-w-xl mx-auto space-y-6 animate-fade-in">
        <button onClick={handleBackToHub} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-violet-700 bg-violet-100 hover:bg-violet-200 text-xs font-bold transition-all cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Creation Hub
        </button>

        <section className="frozen-slab p-6 md:p-8 rounded-[2rem] border border-white/50 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">New Class</h2>
            <p className="text-xs text-slate-400 font-semibold">សូមបញ្ចូលព័ត៌មានថ្នាក់ថ្មីខាងក្រោម / Establish a new school class module</p>
          </div>

          <form onSubmit={handleClassSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Class Name / ឈ្មោះថ្នាក់ <span className="text-red-500 font-black">*</span></label>
              <input 
                type="text" 
                value={clsName}
                onChange={(e) => setClsName(e.target.value)}
                placeholder="e.g. Grade 12A / ថ្នាក់ទី12"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Grade Level / កម្រិតថ្នាក់</label>
              <select 
                value={clsGrade}
                onChange={(e) => setClsGrade(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none"
              >
                <option value="Primary 1">Primary 1</option>
                <option value="Primary 2">Primary 2</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Homeroom Teacher / គ្រូបន្ទុកថ្នាក់</label>
              <select 
                value={clsHomeroom}
                onChange={(e) => setClsHomeroom(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none"
              >
                <option value="Sokha Phally">Sokha Phally</option>
                <option value="Vannak Phally">Vannak Phally</option>
                <option value="Keo Socheata">Keo Socheata</option>
                <option value="Fan Xia">Fan Xia</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Room / Section / បន្ទប់</label>
              <input 
                type="text" 
                value={clsRoom}
                onChange={(e) => setClsRoom(e.target.value)}
                placeholder="e.g. Room 304"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-violet-950 text-white rounded-2xl font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Layers className="w-5 h-5" />
              Create Class
            </button>
          </form>
        </section>
      </div>
    );
  }

  if (activeForm === 'new_subject') {
    // ------------------------------------------
    // Custom View: Subject Creator (Screen 13)
    // ------------------------------------------
    return (
      <div className="pt-4 max-w-xl mx-auto space-y-6 animate-fade-in">
        <button onClick={handleBackToHub} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-violet-700 bg-violet-100 hover:bg-violet-200 text-xs font-bold transition-all cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Creation Hub
        </button>

        <section className="frozen-slab p-6 md:p-8 rounded-[2rem] border border-white/50 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Subject Details</h2>
            <p className="text-xs text-slate-400 font-semibold">សូមបំពេញព័ត៌មានខាងក្រោម / Register subject files</p>
          </div>

          <form onSubmit={handleSubjectSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Subject Name / ឈ្មោះមុខវិជ្ជា</label>
              <input 
                type="text" 
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                placeholder="e.g. Advanced Mathematics"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Subject Code / កូដមុខវិជ្ជា</label>
              <input 
                type="text" 
                value={subCodeInput}
                onChange={(e) => setSubCodeInput(e.target.value)}
                placeholder="e.g. MATH301"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-extrabold focus:border-violet-600 text-violet-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Credits</label>
                <input 
                  type="number" 
                  value={subCredits}
                  onChange={(e) => setSubCredits(parseInt(e.target.value) || 1)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/50 text-sm outline-none font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Department</label>
                <select 
                  value={subDept}
                  onChange={(e) => setSubDept(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none"
                >
                  <option value="science">Science Dept</option>
                  <option value="arts">Arts Dept</option>
                  <option value="tech">Technology Dept</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4.5 bg-violet-600 text-white rounded-2xl font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-900/10 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              Create Subject
            </button>
          </form>
        </section>
      </div>
    );
  }

  // DEFAULT MAIN ADD HUB SCREEN (Screen 5)
  return (
    <div className="space-y-6 pt-4 animate-fade-in relative">
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg border border-emerald-400 font-semibold text-sm flex items-center gap-2 animate-slide-in">
          <CheckCircle2 className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      <section className="mb-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Create New Record</h1>
        <p className="text-slate-500 font-medium mt-1">Select an action to add new data to the school ecosystem.</p>
      </section>

      {/* Grid Quick Actions (Matching Screen 5) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Registration */}
        <button 
          onClick={() => setActiveForm('new_student')}
          className="frozen-slab p-5 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 hover:bg-violet-50/20 active:scale-95 transition-all text-left shadow-sm justify-between min-h-[140px] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-black text-violet-700 uppercase tracking-widest mb-0.5">REGISTRATION</p>
            <p className="text-base font-extrabold text-slate-900 leading-tight">New Student</p>
          </div>
        </button>

        {/* Faculty */}
        <button 
          onClick={() => {
            triggerToast('Faculty module is verified active! Teacher records pre-filled successfully.');
          }}
          className="frozen-slab p-5 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 hover:bg-violet-50/20 active:scale-95 transition-all text-left shadow-sm justify-between min-h-[140px] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-black text-blue-700 uppercase tracking-widest mb-0.5">FACULTY</p>
            <p className="text-base font-extrabold text-slate-900 leading-tight">New Teacher</p>
          </div>
        </button>

        {/* Mark Attendance - Daily Task card */}
        <button 
          onClick={() => setActiveForm('new_schedule')}
          className="frozen-slab p-5 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 hover:bg-violet-50/20 active:scale-95 transition-all text-left shadow-sm justify-between min-h-[140px] col-span-2 relative cursor-pointer"
        >
          <div className="w-full flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="bg-violet-100 text-violet-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              DAILY TASK
            </span>
          </div>
          <div>
            <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest mb-0.5">OPERATIONS</p>
            <p className="text-base font-extrabold text-slate-900 leading-tight">Mark Attendance</p>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-relaxed">Log presence for 12 active classes today.</p>
          </div>
        </button>

        {/* New Invoice */}
        <button 
          onClick={() => setActiveForm('new_fee_type')}
          className="frozen-slab p-5 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 hover:bg-violet-50/20 active:scale-95 transition-all text-left shadow-sm justify-between min-h-[140px] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-0.5">FINANCE</p>
            <p className="text-base font-extrabold text-slate-900 leading-tight">New Invoice</p>
          </div>
        </button>

        {/* Create Payment */}
        <button 
          type="button"
          onClick={() => onNavigateTab('transactions')}
          className="frozen-slab p-5 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 hover:bg-violet-50/20 active:scale-95 transition-all text-left shadow-sm justify-between min-h-[140px] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-black text-teal-800 uppercase tracking-widest mb-0.5">CASHIER</p>
            <p className="text-base font-extrabold text-slate-900 leading-tight">Create Payment</p>
          </div>
        </button>

        {/* New Class */}
        <button 
          onClick={() => setActiveForm('new_class')}
          className="frozen-slab p-5 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 hover:bg-violet-50/20 active:scale-95 transition-all text-left shadow-sm justify-between min-h-[140px] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">ACADEMIC</p>
            <p className="text-base font-extrabold text-slate-900 leading-tight">New Class</p>
          </div>
        </button>

        {/* New Subject */}
        <button 
          onClick={() => setActiveForm('new_subject')}
          className="frozen-slab p-5 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 hover:bg-violet-50/20 active:scale-95 transition-all text-left shadow-sm justify-between min-h-[140px] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">CURRICULUM</p>
            <p className="text-base font-extrabold text-slate-900 leading-tight">New Subject</p>
          </div>
        </button>
      </section>

      {/* Finance Shortcuts section */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Finance Shortcuts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            type="button" 
            onClick={() => onNavigateTab('transactions')}
            className="flex flex-col items-center justify-center gap-1.5 px-4 py-4 bg-violet-900 text-white hover:brightness-110 active:scale-95 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Generate New Invoice
          </button>
          
          <button 
            type="button" 
            onClick={() => {
              triggerToast('Bulk Invoices Generated: 42 bills stamped.');
            }}
            className="flex flex-col items-center justify-center gap-1.5 px-4 py-4 bg-blue-600 text-white hover:brightness-110 active:scale-95 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Bulk Generate Invoices
          </button>

          <button 
            type="button"
            onClick={() => {
              triggerToast('Monthly Cycle Automated: Schedules live.');
            }}
            className="flex flex-col items-center justify-center gap-1.5 px-4 py-4 border border-violet-200 text-violet-800 hover:bg-violet-50 hover:border-violet-300 active:scale-95 rounded-2xl text-xs font-bold transition-all shadow-sm bg-white/50 cursor-pointer"
          >
            Auto Generate Monthly
          </button>

          <button 
            type="button"
            onClick={() => onNavigateTab('transactions')}
            className="flex flex-col items-center justify-center gap-1.5 px-4 py-4 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 active:scale-95 rounded-2xl text-xs font-bold transition-all shadow-sm bg-white/50 cursor-pointer"
          >
            Record Manual Payment
          </button>
        </div>
      </section>

      {/* Recent Additions Feed */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-800">Recent Additions</h3>
        <div className="frozen-slab rounded-3xl overflow-hidden divide-y divide-slate-100">
          <div className="flex items-center gap-4 hover:bg-white/40 transition-colors p-3.5">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-200 shrink-0">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs1BsGpseRJIIIsbA-YPKGuMv_KIBmCxrXbtbnyEKV6VZtZ18h3PHHV-juE2Y8nLGjhKUCtR5bxo2wkw_bzcxUNCML2W5PSf1z48hn2FB9mCoCiAMsjkEQhvejHxfWlOf1hEWL3fX4y1GZUgE0PErOpaAisBjs-FTBDdqT4kgDyhOnNCtsqRY4tkyPbfzoRspONwBF3KnoicvuMpPJ8yeU6cPU9lZ4B_HIFMw0804Lq12EHLUiXcad6ZrclLn-sOk2bE4_Y1obQvZW" alt="Student" className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <p className="text-xs font-bold text-slate-900">Julianne Devis</p>
              <p className="text-[10px] text-slate-400 font-semibold">Added to Class 4-A • 12 mins ago</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-[9px] px-2.5 py-1 rounded font-black uppercase tracking-wider shrink-0 shadow-sm border border-emerald-100">Student</span>
          </div>

          <div className="flex items-center gap-4 hover:bg-white/40 transition-colors p-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <p className="text-xs font-bold text-slate-900">Invoice #INV-9902</p>
              <p className="text-[10px] text-slate-400 font-semibold">Generated for Tuition Fees • 45 mins ago</p>
            </div>
            <span className="bg-blue-50 text-blue-700 text-[9px] px-2.5 py-1 rounded font-black uppercase tracking-wider shrink-0 shadow-sm border border-blue-100">Invoice</span>
          </div>

          <div className="flex items-center gap-4 hover:bg-white/40 transition-colors p-3.5">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-200 shrink-0">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfjYycpQXLVGHvCPtO2MSW65idd9Tnu6cJQkH_uptMHCUCFX2YVGAtHU48ug3RnQew-H5_2pdh-HPqxzRNLTZfDTXc2QCouDF3BBqrAyAWErRi7r3tKes4dBIkL-xUeYF9Sel3zQNGTqJLj_brcTP61aHXuLInu1_iHz5_cDO1J8hJMo5Yj37AFH811DvcK4PNpROIa8atg-1NLPEMESroO8ELumc8GUpB3WOnKg5Dyoi9VlNPHisBLK5IpZMwTqpPbqH0v9jGu2Nj" alt="Teacher" className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <p className="text-xs font-bold text-slate-900">Mark Richardson</p>
              <p className="text-[10px] text-slate-400 font-semibold">Assigned to Mathematics Dept • 2 hours ago</p>
            </div>
            <span className="bg-purple-50 text-purple-700 text-[9px] px-2.5 py-1 rounded font-black uppercase tracking-wider shrink-0 shadow-sm border border-purple-100">Teacher</span>
          </div>
        </div>
      </section>
    </div>
  );
}
