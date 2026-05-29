import React, { useState } from 'react';
import { 
  Home, 
  Receipt, 
  Plus, 
  Grid, 
  Settings, 
  Bell, 
  Search, 
  School,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Subcomponents
import HomeView from './components/HomeView';
import TransactionsView from './components/TransactionsView';
import AddView from './components/AddView';
import CategoriesView from './components/CategoriesView';
import SettingsView from './components/SettingsView';

// Decoupled types & seed data
import { Student, Invoice, Schedule, FeeType, ClassSession, AcademicSubject } from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_INVOICES, 
  INITIAL_SCHEDULES, 
  INITIAL_FEES, 
  INITIAL_CLASSES, 
  INITIAL_SUBJECTS 
} from './data';

export default function App() {
  // Current active navigation tab
  const [activeTab, setActiveTab] = useState<'home' | 'transactions' | 'add' | 'categories' | 'settings'>('home');
  
  // Custom router state to pass automatic form selection to the Add tab
  const [addTabFormKey, setAddTabFormKey] = useState<string | null>(null);

  // Core Persistent States representing the ERP databases
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [schedules, setSchedules] = useState<Schedule[]>(INITIAL_SCHEDULES);
  const [classes, setClasses] = useState<ClassSession[]>(INITIAL_CLASSES);
  const [subjects, setSubjects] = useState<AcademicSubject[]>(INITIAL_SUBJECTS);
  const [fees, setFees] = useState<FeeType[]>(INITIAL_FEES);

  // Teacher breakdowns (recalculated dynamically or configured to match Screen 3)
  const [teachers, setTeachers] = useState([
    { name: 'Fan xia', studentsCount: 5, motorYes: 3, motorNo: 2, paid: 0, pending: 0, chargePaid: 13.00 },
    { name: 'Siling', studentsCount: 8, motorYes: 5, motorNo: 3, paid: 1200, pending: 200, chargePaid: 45.00 },
    { name: 'Taily', studentsCount: 4, motorYes: 4, motorNo: 0, paid: 800, pending: 50, chargePaid: 20.00 },
    { name: 'Zhi Long', studentsCount: 3, motorYes: 2, motorNo: 1, paid: 450, pending: 15, chargePaid: 15.00 }
  ]);

  // Alert notification banner state
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setGlobalNotification(message);
    setTimeout(() => {
      setGlobalNotification(null);
    }, 4500);
  };

  // State modifiers
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
    
    // Dynamically update the teacher counts!
    setTeachers(prev => prev.map(t => {
      if (t.name.toLowerCase() === newStudent.teacher.toLowerCase() || 
          newStudent.teacher.toLowerCase().includes(t.name.toLowerCase())) {
        return {
          ...t,
          studentsCount: t.studentsCount + 1,
          motorYes: newStudent.motorbike ? t.motorYes + 1 : t.motorYes,
          motorNo: !newStudent.motorbike ? t.motorNo + 1 : t.motorNo,
        };
      }
      return t;
    }));

    showNotification(`Added Student ${newStudent.nameEn} successfully to our records.`);
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    setStudents(prev => prev.filter(s => s.id !== id));
    
    // Re-adjust teachers state count
    setTeachers(prev => prev.map(t => {
      if (t.name.toLowerCase() === student.teacher.toLowerCase() || 
          student.teacher.toLowerCase().includes(t.name.toLowerCase())) {
        return {
          ...t,
          studentsCount: Math.max(0, t.studentsCount - 1),
          motorYes: student.motorbike ? Math.max(0, t.motorYes - 1) : t.motorYes,
          motorNo: !student.motorbike ? Math.max(0, t.motorNo - 1) : t.motorNo,
        };
      }
      return t;
    }));

    showNotification(`Archived student record of ${id}.`);
  };

  const handleAddInvoice = (newInvoice: Invoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
    showNotification(`New Invoice #${newInvoice.id} generated.`);
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
    showNotification(`Invoice Record #${id} deleted.`);
  };

  const handleUpdateInvoiceStatus = (id: string, status: 'Pending' | 'PAID', payload?: any) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status,
          paidDate: payload?.paidDate || new Date().toISOString().split('T')[0],
          method: payload?.method || 'cash',
          notes: payload?.notes || ''
        };
      }
      return inv;
    }));

    // Update teacher transaction paid metrics dynamically!
    const targetInvoice = invoices.find(inv => inv.id === id);
    if (targetInvoice && status === 'PAID') {
      const parentStudent = students.find(s => s.id === targetInvoice.studentId || targetInvoice.studentName.includes(s.nameEn));
      if (parentStudent) {
        setTeachers(prev => prev.map(t => {
          if (t.name.toLowerCase() === parentStudent.teacher.toLowerCase() || 
              parentStudent.teacher.toLowerCase().includes(t.name.toLowerCase())) {
            return {
              ...t,
              paid: t.paid + targetInvoice.amount,
              chargePaid: t.chargePaid + targetInvoice.amount
            };
          }
          return t;
        }));
      }
    }
  };

  const handleAddClass = (newClass: ClassSession) => {
    setClasses(prev => [newClass, ...prev]);
    showNotification(`Successfully configured class: "${newClass.name}".`);
  };

  const handleAddSchedule = (newSchedule: Schedule) => {
    setSchedules(prev => [newSchedule, ...prev]);
    showNotification(`Schedule established for ${newSchedule.className}.`);
  };

  const handleAddFeeType = (newFee: FeeType) => {
    setFees(prev => [newFee, ...prev]);
    
    // Add a corresponding pending invoice to one of our active students automatically to build a trace link!
    const targetStudent = students[0]; // Srey Neath
    if (targetStudent) {
      const autoInvoice: Invoice = {
        id: `f6-${Math.floor(Math.random() * 10000)}`,
        studentId: targetStudent.id,
        studentName: `${targetStudent.nameEn} (${targetStudent.nameKhKh || ''})`,
        feeType: newFee.name,
        amount: newFee.defaultAmount,
        dueDate: '2026-06-15',
        status: 'Pending'
      };
      setInvoices(prev => [autoInvoice, ...prev]);
    }

    showNotification(`New Fee Type "${newFee.name}" is now active in pricing systems.`);
  };

  const handleAddSubject = (newSubject: AcademicSubject) => {
    setSubjects(prev => [newSubject, ...prev]);
    showNotification(`Academic syllabus code ${newSubject.code} registered.`);
  };

  // Navigation redirect wrapper to cross-link tabs cleanly (e.g. from Quick Actions clicking "Add Student" takes them to form)
  const handleNavigateSubView = (viewKey: string, extraData?: any) => {
    setAddTabFormKey(viewKey);
    setActiveTab('add');
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            students={students}
            invoices={invoices}
            teachers={teachers}
            onNavigateTab={setActiveTab}
            onNavigateSubView={handleNavigateSubView}
          />
        );
      case 'transactions':
        return (
          <TransactionsView 
            students={students}
            invoices={invoices}
            onAddInvoice={handleAddInvoice}
            onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
            onDeleteInvoice={handleDeleteInvoice}
            onNavigateSubView={handleNavigateSubView}
          />
        );
      case 'add':
        return (
          <AddView 
            onAddStudent={handleAddStudent}
            onAddClass={handleAddClass}
            onAddSchedule={handleAddSchedule}
            onAddFeeType={handleAddFeeType}
            onAddSubject={handleAddSubject}
            onNavigateTab={setActiveTab}
            initialFormView={addTabFormKey}
            onClearFormView={() => setAddTabFormKey(null)}
          />
        );
      case 'categories':
        return (
          <CategoriesView 
            students={students}
            onDeleteStudent={handleDeleteStudent}
            onNavigateTab={setActiveTab}
            onNavigateSubView={handleNavigateSubView}
          />
        );
      case 'settings':
        return <SettingsView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      
      {/* Dynamic Global Toast Banner */}
      {globalNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-slate-800 text-white font-semibold text-xs px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 animate-slide-down">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
          <span>{globalNotification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="w-full max-w-[640px] px-4 md:px-6 pt-6 pb-28 flex-grow flex flex-col gap-6 relative">
        
        {/* Top Header Navigation Panel */}
        <header className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            {/* Visual Logo Icon */}
            <div className="w-10 h-10 bg-violet-900 text-white rounded-xl flex items-center justify-center shadow-md">
              <School className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-violet-800 uppercase leading-none">Joy School</p>
              <h2 className="text-sm font-extrabold tracking-tight text-slate-800 mt-1">Management Portal</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => showNotification("You have zero unread notification logs.")}
              className="w-10 h-10 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-500 shadow-sm transition-all cursor-pointer"
              title="System Alerts"
            >
              <Bell className="w-5 h-5" />
            </button>

            <button 
              type="button"
              onClick={() => { setActiveTab('settings'); setAddTabFormKey(null); }}
              className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                activeTab === 'settings' 
                  ? 'border-violet-700 ring-2 ring-violet-200 scale-105' 
                  : 'border-slate-200 hover:scale-105 hover:border-violet-500'
              }`}
              title="Admin Profile"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF0A6h66Sg9jP0X7SPhfT7fU1_aN3V8N4Bv1HqPf9eE5i7j8sX5C6b8_7D2wJ9X3sW6J3f9m4H5f7Y8wP5iY6d5W8W" 
                alt="Dr. Samuel Richardson" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </button>
          </div>
        </header>

        {/* Dynamic Route View */}
        <section className="flex-grow">
          {renderActiveTabContent()}
        </section>

        {/* Polished Fixed Bottom-Navigation Bar */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[580px] bg-white/75 backdrop-blur-xl border border-slate-200/60 shadow-2xl rounded-3xl p-2 z-40 flex items-center justify-between">
          
          {/* TAB 1: Home */}
          <button 
            type="button"
            onClick={() => { setActiveTab('home'); setAddTabFormKey(null); }}
            className={`flex-1 py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer ${
              activeTab === 'home' 
                ? 'text-violet-950 font-extrabold bg-violet-50/50' 
                : 'text-slate-400 hover:text-slate-800'
            }`}
          >
            <Home className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
            <span className="text-[9.5px] uppercase tracking-wider font-bold">Home</span>
          </button>

          {/* TAB 2: Invoices */}
          <button 
            type="button"
            onClick={() => { setActiveTab('transactions'); setAddTabFormKey(null); }}
            className={`flex-1 py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer ${
              activeTab === 'transactions' 
                ? 'text-violet-950 font-extrabold bg-violet-50/50' 
                : 'text-slate-400 hover:text-slate-800'
            }`}
          >
            <Receipt className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
            <span className="text-[9.5px] uppercase tracking-wider font-bold">Billing</span>
          </button>

          {/* TAB 3: Add (Floating Button representation) */}
          <button 
            type="button"
            onClick={() => { setActiveTab('add'); setAddTabFormKey(null); }}
            className="flex-1 -mt-6 flex flex-col items-center justify-center group cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all border-4 border-slate-50 group-hover:scale-105 ${
              activeTab === 'add' 
                ? 'bg-violet-950 text-white shadow-violet-950/25' 
                : 'bg-violet-900 text-white'
            }`}>
              <Plus className="w-7 h-7" />
            </div>
            <span className={`text-[9.5px] uppercase tracking-wider font-bold mt-1.5 ${
              activeTab === 'add' ? 'text-violet-950 font-extrabold' : 'text-slate-400'
            }`}>Add</span>
          </button>

          {/* TAB 4: Categories */}
          <button 
            type="button"
            onClick={() => { setActiveTab('categories'); setAddTabFormKey(null); }}
            className={`flex-1 py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer ${
              activeTab === 'categories' 
                ? 'text-violet-950 font-extrabold bg-violet-50/50' 
                : 'text-slate-400 hover:text-slate-800'
            }`}
          >
            <Grid className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
            <span className="text-[9.5px] uppercase tracking-wider font-bold">Modules</span>
          </button>

          {/* TAB 5: Settings */}
          <button 
            type="button"
            onClick={() => { setActiveTab('settings'); setAddTabFormKey(null); }}
            className={`flex-1 py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer ${
              activeTab === 'settings' 
                ? 'text-violet-950 font-extrabold bg-violet-50/50' 
                : 'text-slate-400 hover:text-slate-800'
            }`}
          >
            <Settings className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
            <span className="text-[9.5px] uppercase tracking-wider font-bold">Admin</span>
          </button>

        </nav>
      </main>
    </div>
  );
}
