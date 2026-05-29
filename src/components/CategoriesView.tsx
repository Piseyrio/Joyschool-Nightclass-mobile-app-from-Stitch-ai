import React, { useState } from 'react';
import { 
  Users, 
  Receipt, 
  Calendar, 
  Layers, 
  BookOpen, 
  UserSquare2, 
  Settings, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  Search, 
  ChevronRight, 
  Trash2, 
  Download, 
  Camera, 
  Printer, 
  GraduationCap, 
  Ticket,
  Briefcase,
  FolderLock,
  Workflow,
  Network
} from 'lucide-react';
import { Student } from '../types';

interface CategoriesViewProps {
  students: Student[];
  onDeleteStudent: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  onNavigateSubView: (view: string) => void;
}

export default function CategoriesView({
  students,
  onDeleteStudent,
  onNavigateTab,
  onNavigateSubView
}: CategoriesViewProps) {
  // Current view phase: 'categories_hub' | 'student_directory' | 'student_profile'
  const [viewPhase, setViewPhase] = useState<'categories_hub' | 'student_directory' | 'student_profile'>('categories_hub');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  // Search state inside Student Directory
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenderFilter, setSelectedGenderFilter] = useState<'All' | 'Female' | 'Male'>('All');

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  // List of 16 modules for Management Categories grid (Screen 4)
  const categoryModules = [
    { id: 'students', label: 'Students', icon: Users, color: 'bg-violet-100 text-violet-700', description: 'Student directory and records' },
    { id: 'invoices', label: 'Invoices', icon: Receipt, color: 'bg-emerald-100 text-emerald-700', description: 'Tuition fees and billing logs' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, color: 'bg-amber-100 text-amber-700', description: 'Timetables and class cycles' },
    { id: 'classes', label: 'Classes', icon: Layers, color: 'bg-blue-100 text-blue-700', description: 'Grade streams and classrooms' },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, color: 'bg-rose-100 text-rose-700', description: 'Curriculum papers and syllabus' },
    { id: 'teachers', label: 'Teachers', icon: UserSquare2, color: 'bg-indigo-100 text-indigo-700', description: 'Faculty staff bios and assignments' },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle2, color: 'bg-teal-100 text-teal-700', description: 'Biometric records summary' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-slate-100 text-slate-700', description: 'Terminal configurations and profile' },
    
    // Additional grids to reach high density matching Screen 4
    { id: 'grades', label: 'Gradebook', icon: GraduationCap, color: 'bg-pink-100 text-pink-700', description: 'Mark sheets and report cards' },
    { id: 'permits', label: 'Parking Permits', icon: Ticket, color: 'bg-orange-100 text-orange-700', description: 'Motorbike and parking codes' },
    { id: 'hr', label: 'Human Resources', icon: Briefcase, color: 'bg-yellow-105 text-yellow-800', description: 'Staff timesheets and payroll' },
    { id: 'security', label: 'Security Locks', icon: FolderLock, color: 'bg-red-50 text-red-600', description: 'Access control clearances' },
    { id: 'sync', label: 'Device Sync', icon: Workflow, color: 'bg-cyan-50 text-cyan-700', description: 'Attendance terminal networks' },
    { id: 'groups', label: 'Club Groups', icon: Network, color: 'bg-lime-50 text-lime-700', description: 'Extracurricular divisions' }
  ];

  const handleModuleClick = (modId: string) => {
    if (modId === 'students') {
      setViewPhase('student_directory');
    } else if (modId === 'invoices') {
      onNavigateTab('transactions');
    } else if (modId === 'schedule') {
      onNavigateSubView('new_schedule');
    } else if (modId === 'classes') {
      onNavigateSubView('new_class');
    } else if (modId === 'subjects') {
      onNavigateSubView('new_subject');
    } else if (modId === 'settings') {
      onNavigateTab('settings');
    } else {
      // Prompt option is active
      alert(`The "${modId.toUpperCase()}" module has been pre-verified and configured for this supervisor profile.`);
    }
  };

  // Directory filter logic
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (s.nameKhKh && s.nameKhKh.toLowerCase().includes(searchTerm.toLowerCase())) || 
                          s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = selectedGenderFilter === 'All' || s.gender === selectedGenderFilter;
    return matchesSearch && matchesGender;
  });

  // Export ID card mock action
  const [cardToast, setCardToast] = useState(false);
  const handlePrintIdCard = () => {
    setCardToast(true);
    setTimeout(() => setCardToast(false), 3000);
  };

  // PHASE 3: STUDENT PROFILE VIEW (Screen 6)
  if (viewPhase === 'student_profile' && selectedStudent) {
    return (
      <div className="pt-4 max-w-xl mx-auto space-y-6 animate-fade-in pb-10">
        {cardToast && (
          <div className="fixed top-20 right-4 z-50 bg-violet-900 text-white px-5 py-3 rounded-xl shadow-lg border border-violet-700 font-semibold text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Printing Student ID card to Office System...
          </div>
        )}

        <button 
          onClick={() => setViewPhase('student_directory')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-violet-700 bg-violet-100 hover:bg-violet-200 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </button>

        {/* Student Profile Main Layout (Screen 6) */}
        <section className="frozen-slab rounded-[2rem] p-6 md:p-8 space-y-6 border border-white/50 relative overflow-hidden">
          {/* Header layout */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-violet-200 shadow-md">
              <img src={selectedStudent.avatar} alt={selectedStudent.nameEn} className="w-full h-full object-cover" />
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 mt-4 leading-tight">{selectedStudent.nameEn}</h2>
            {selectedStudent.nameKhKh && (
              <p className="text-lg text-violet-700 font-bold Khmer-text mt-0.5">{selectedStudent.nameKhKh}</p>
            )}
            <p className="text-xs text-slate-400 uppercase font-black tracking-widest mt-1">ID: {selectedStudent.id}</p>

            <span className="mt-3.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-200 shadow-sm">
              {selectedStudent.status}
            </span>
          </div>

          {/* Grid Information blocks */}
          <div className="space-y-4 border-t border-slate-100 pt-5 text-sm">
            <h3 className="text-xs font-black text-violet-700 uppercase tracking-widest px-1">Detailed Profile Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 p-3.5 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gender</p>
                <p className="text-slate-800 font-bold mt-0.5">{selectedStudent.gender}</p>
              </div>
              <div className="bg-white/80 p-3.5 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Birthday</p>
                <p className="text-slate-800 font-bold mt-0.5">{selectedStudent.birthday}</p>
              </div>
              <div className="bg-white/80 p-3.5 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Join Date</p>
                <p className="text-slate-800 font-bold mt-0.5">{selectedStudent.joinDate}</p>
              </div>
              <div className="bg-white/80 p-3.5 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Motorbike Permit</p>
                <p className="text-slate-800 font-bold mt-0.5 flex items-center gap-1">
                  {selectedStudent.motorbike ? (
                    <span className="text-emerald-600">Yes (Authorized)</span>
                  ) : (
                    <span className="text-slate-500">No permit</span>
                  )}
                </p>
              </div>
            </div>

            <div className="bg-white/80 p-4 rounded-xl border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Phone Number</p>
                  <p className="text-slate-900 font-bold">{selectedStudent.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-50 pt-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Email Address</p>
                  <p className="text-slate-900 font-bold">{selectedStudent.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-50 pt-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Primary Address</p>
                  <p className="text-slate-900 font-bold Khmer-text">{selectedStudent.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic & Assign details */}
          <div className="space-y-4 border-t border-slate-100 pt-5 text-sm">
            <h3 className="text-xs font-black text-violet-700 uppercase tracking-widest px-1">Academic Assignment</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Class Level</span>
                <span className="font-extrabold text-slate-950">{selectedStudent.classLevel}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Subject Study</span>
                <span className="font-extrabold text-slate-950">{selectedStudent.subject}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500 font-medium">Assigned Teacher</span>
                <span className="font-extrabold text-slate-955">{selectedStudent.teacher}</span>
              </div>
            </div>
          </div>

          {/* Biometric Codes */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex justify-between items-center text-sm">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-amber-800 uppercase tracking-wider">Biometric Code System</p>
              <p className="text-slate-600 text-xs">ZK Attendance card stamp alignment</p>
            </div>
            <span className="bg-amber-100 text-amber-800 text-sm font-black px-3.5 py-1.5 rounded-xl border border-amber-200">
              {selectedStudent.biometricCode}
            </span>
          </div>

          {/* Attendance Performance */}
          <div className="space-y-4 border-t border-slate-100 pt-5">
            <h3 className="text-xs font-black text-violet-700 uppercase tracking-widest px-1">Biometric Attendance Log</h3>
            
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-xs font-bold text-slate-400">Present</p>
                <p className="text-xl font-black text-emerald-700 mt-1">{selectedStudent.attendance.present}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400">Late</p>
                <p className="text-xl font-black text-slate-700 mt-1">{selectedStudent.attendance.late}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                <p className="text-xs font-bold text-slate-400">Absent</p>
                <p className="text-xl font-black text-red-600 mt-1">{selectedStudent.attendance.absent}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-xs font-bold text-slate-400">Excused</p>
                <p className="text-xl font-black text-blue-700 mt-1">{selectedStudent.attendance.excused}</p>
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] text-slate-400">
              Calculated dynamically from live biometric synchronization databases.
            </div>
          </div>

          {/* PHYSICAL STUDENT ID CARD TEMPLATE SCREEN mockup */}
          <div className="space-y-4 border-t border-slate-100 pt-5">
            <h3 className="text-xs font-black text-violet-700 uppercase tracking-widest px-1">Student ID Badge Profile</h3>
            
            <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden bg-violet-950 text-white p-6 shadow-xl border border-white/10 flex flex-col justify-between aspect-[1.58/1]">
              {/* Overlay graphics */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-violet-600 rounded-full blur-2xl opacity-20 pointer-events-none"></div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-extrabold tracking-wide uppercase">JOY SCHOOL</h4>
                  <p className="text-[8px] tracking-widest opacity-75">INTERNATIONAL EDUCATION</p>
                </div>
                <span className="text-[10px] font-black border border-white/20 px-2 py-0.5 rounded uppercase">STUDENT</span>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/20 shrink-0">
                  <img src={selectedStudent.avatar} alt="Profile Card" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow space-y-1">
                  <p className="text-sm font-extrabold truncate">{selectedStudent.nameEn}</p>
                  {selectedStudent.nameKhKh && (
                    <p className="text-[10px] text-violet-300 font-bold Khmer-text">{selectedStudent.nameKhKh}</p>
                  )}
                  <p className="text-[9px] font-black text-violet-300 uppercase tracking-widest">CLASS: {selectedStudent.classLevel}</p>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/15 pt-3 mt-3">
                <div>
                  <p className="text-[7px] uppercase tracking-wider opacity-60">Bar Code Identifier</p>
                  <p className="text-[10px] font-black">JSNC-{selectedStudent.biometricCode}</p>
                </div>
                {/* Simulated barcode bars */}
                <div className="flex gap-0.5 items-end h-5">
                  <div className="w-0.5 h-full bg-white"></div>
                  <div className="w-1 h-5 bg-white"></div>
                  <div className="w-0.5 h-3 bg-white"></div>
                  <div className="w-1 h-4 bg-white"></div>
                  <div className="w-0.5 h-full bg-white"></div>
                  <div className="w-0.5 h-2 bg-white"></div>
                  <div className="w-1 h-4 bg-white"></div>
                  <div className="w-0.5 h-full bg-white"></div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <button 
                onClick={handlePrintIdCard}
                className="py-2.5 px-4 rounded-xl bg-violet-900 hover:bg-violet-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print PDF ID Card
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // PHASE 2: STUDENT DIRECTORY VIEW (Screen 8)
  if (viewPhase === 'student_directory') {
    return (
      <div className="pt-4 space-y-6 animate-fade-in pb-10">
        <button 
          onClick={() => setViewPhase('categories_hub')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-violet-700 bg-violet-100 hover:bg-violet-200 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </button>

        <section className="mb-2 space-y-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Student Directory</h1>
            <p className="text-slate-500 font-medium mt-1">Manage active enrollment, contact lists, and ID badging coordinates.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search students by English / Khmer / ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-white/50 focus:bg-white text-sm outline-none font-semibold focus:border-violet-600 shadow-sm"
              />
            </div>

            {/* Gender Switch Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 self-start md:self-auto shrink-0 shadow-sm">
              {(['All', 'Female', 'Male'] as const).map(gender => (
                <button
                  key={gender}
                  onClick={() => setSelectedGenderFilter(gender)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedGenderFilter === gender ? 'bg-white text-violet-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Students List */}
        <section className="space-y-4">
          {filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredStudents.map(student => (
                <div 
                  key={student.id}
                  onClick={() => {
                    setSelectedStudentId(student.id);
                    setViewPhase('student_profile');
                  }}
                  className="bg-white rounded-2xl p-4 border border-slate-200/50 shadow-sm flex items-center justify-between gap-4 hover:border-violet-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={student.avatar} 
                      alt={student.nameEn} 
                      className="w-14 h-14 rounded-full object-cover border border-slate-200" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-violet-950 transition-colors">{student.nameEn}</h4>
                        {student.nameKhKh && (
                          <span className="text-violet-600 font-bold text-xs Khmer-text">{student.nameKhKh}</span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-400 mt-0.5 uppercase font-black tracking-widest">ID: {student.id}</p>
                      
                      <div className="flex gap-4 text-xs font-semibold text-slate-500 mt-1.5">
                        <p className="flex items-center gap-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Class:</span>
                          <span className="text-slate-700">{student.classLevel}</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Code:</span>
                          <span className="text-violet-700 font-mono">{student.biometricCode}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // prevent opening profile
                        onDeleteStudent(student.id);
                      }}
                      className="w-8 h-8 rounded-full border border-slate-100 hover:border-red-100 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors hover:bg-red-50/20 cursor-pointer"
                      title="Archive Student Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-violet-900 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="frozen-slab p-12 text-center rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400 text-sm font-semibold">No students found matching your specifications.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-violet-100 text-violet-700 rounded-xl text-xs font-bold hover:bg-violet-200 transition-colors"
              >
                Clear Search filters
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }

  // PHASE 1: MANAGEMENT HUB (Screen 4 Layout)
  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <section className="mb-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Management Categories</h1>
        <p className="text-slate-500 font-medium mt-1">Select a registrar card module to access configuration controls and indices.</p>
      </section>

      {/* Grid of Modules (Screen 4) */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryModules.map(module => {
          const IconComponent = module.icon;
          return (
            <div 
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className="frozen-slab p-5 rounded-2xl flex flex-col justify-between gap-3 hover:-translate-y-1 hover:bg-violet-50/10 hover:border-violet-200 hover:shadow-md transition-all duration-300 cursor-pointer select-none group min-h-[148px]"
            >
              <div className="flex justify-between items-start">
                <div className={`w-11 h-11 rounded-xl ${module.color} flex items-center justify-center shadow-sm`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{module.label}</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-tight line-clamp-1">{module.description}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
