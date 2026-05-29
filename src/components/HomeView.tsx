import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  Layers, 
  UserPlus, 
  CheckSquare, 
  Receipt, 
  BarChart3, 
  ChevronRight,
  TrendingDown,
  Percent,
  CheckCircle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { Student, Invoice } from '../types';

interface HomeViewProps {
  students: Student[];
  invoices: Invoice[];
  teachers: any[];
  onNavigateTab: (tab: string) => void;
  onNavigateSubView: (view: string, extraData?: any) => void;
}

export default function HomeView({ 
  students, 
  invoices, 
  teachers, 
  onNavigateTab,
  onNavigateSubView
}: HomeViewProps) {
  const [viewMode, setViewMode] = useState<'active' | 'inactive'>('active');
  const [attendanceTrendType, setAttendanceTrendType] = useState<'Week' | 'Month' | 'Year'>('Week');

  // Active records counts
  const activeCount = students.filter(s => s.status === 'Active').length;
  const activeStudentsList = students.filter(s => s.status === 'Active');
  const maleCount = activeStudentsList.filter(s => s.gender === 'Male').length;
  const femaleCount = activeStudentsList.filter(s => s.gender === 'Female').length;

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      {/* Welcome Hero */}
      <section className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, Admin</h1>
        <p className="text-slate-500 font-medium mt-1">Here is what's happening at Joy School today.</p>
        
        {/* Toggle segmented control */}
        <div className="flex justify-start mt-5">
          <div className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200/50 shadow-sm">
            <button
              onClick={() => setViewMode('active')}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                viewMode === 'active' 
                  ? 'bg-white text-violet-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setViewMode('inactive')}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                viewMode === 'inactive' 
                  ? 'bg-white text-violet-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </section>

      {/* School Overview Card */}
      <section className="frozen-slab p-6 md:p-8 rounded-3xl border border-white/50 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>School Overview</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse"></span>
        </h2>

        {viewMode === 'active' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left overview */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-violet-100 text-violet-700 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Users className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Students</p>
                  <h3 className="text-4xl font-extrabold text-slate-950 mt-1">
                    {1280 + activeCount}
                  </h3>
                  
                  <div className="mt-4 space-y-2 max-w-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span className="text-sm font-medium text-slate-500">Male</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{580 + maleCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                        <span className="text-sm font-medium text-slate-500">Female</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{700 + femaleCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Staff</p>
                  <h4 className="text-lg font-bold text-slate-800">86 Members</h4>
                </div>
              </div>
            </div>

            {/* Right overview */}
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-black text-violet-700">94%</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</p>
                  <p className="text-lg font-bold text-slate-800">Very High</p>
                  <p className="text-xs text-slate-500">1,207 Present</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Revenue</p>
                    <h4 className="text-xl font-bold text-slate-900">$12,450</h4>
                  </div>
                  <span className="text-xs font-bold text-blue-600 mb-1">85% Goal</span>
                </div>
                
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                  <div className="h-full bg-violet-600 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                </div>
                
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-semibold text-slate-600">12% increase</span> from yesterday
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Users className="w-8 h-8 opacity-75" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Archived Records</p>
                  <h3 className="text-3xl font-extrabold text-slate-900">158</h3>
                  <p className="text-xs text-slate-500 mt-2">Historic student and teacher records</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/10 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Graduated</p>
                <p className="text-2xl font-bold text-slate-800">156</p>
                <p className="text-xs text-slate-500">Class of 2023-2025</p>
              </div>
              <div className="p-5 rounded-xl bg-red-50/20 border border-red-100 shadow-sm">
                <p className="text-[10px] font-bold text-red-500 uppercase mb-1">Suspended</p>
                <p className="text-2xl font-bold text-red-600">2</p>
                <p className="text-xs text-slate-500">Pending Review</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quick Summary Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-bold text-slate-800">Quick Summary</h2>
          <button 
            onClick={() => onNavigateTab('categories')}
            className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="frozen-slab p-4 rounded-3xl border border-white/50">
          <div className="divide-y divide-slate-100">
            {/* Subjects */}
            <div className="flex items-center gap-4 py-3 cursor-pointer hover:bg-slate-50/50 rounded-xl px-2 transition-all"
                 onClick={() => onNavigateSubView('new_subject')}>
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="flex-1 font-semibold text-slate-700 text-sm">Subjects</span>
              <div className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">12</div>
              <span className="text-xs font-bold text-violet-600 flex items-center gap-0.5 hover:underline">
                Open <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Classes */}
            <div className="flex items-center gap-4 py-3 cursor-pointer hover:bg-slate-50/50 rounded-xl px-2 transition-all"
                 onClick={() => onNavigateSubView('new_class')}>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <span className="flex-1 font-semibold text-slate-700 text-sm">Classes</span>
              <div className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">13</div>
              <span className="text-xs font-bold text-violet-600 flex items-center gap-0.5 hover:underline">
                Open <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Schedule */}
            <div className="flex items-center gap-4 py-3 cursor-pointer hover:bg-slate-50/50 rounded-xl px-2 transition-all"
                 onClick={() => onNavigateSubView('new_schedule')}>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="flex-1 font-semibold text-slate-700 text-sm">Schedule</span>
              <div className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">50</div>
              <span className="text-xs font-bold text-violet-600 flex items-center gap-0.5 hover:underline">
                Open <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Bento Grid: Charts & Teachers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column (8 cols width on large screens) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Actions horizontal strip */}
          <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
              <button onClick={() => onNavigateTab('add')} className="text-xs font-bold text-violet-600 hover:underline">View All</button>
            </div>

            <div className="flex flex-row gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin">
              <button 
                onClick={() => onNavigateSubView('new_student')}
                className="frozen-slab min-w-[110px] h-28 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:bg-violet-50/50 hover:-translate-y-1 transition-all shadow-sm cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 text-center">Add Student</span>
              </button>

              <button 
                onClick={() => onNavigateSubView('record_payment')}
                className="frozen-slab min-w-[110px] h-28 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:bg-violet-50/50 hover:-translate-y-1 transition-all shadow-sm cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 text-center">Mark Attendance</span>
              </button>

              <button 
                onClick={() => onNavigateSubView('new_fee_type')}
                className="frozen-slab min-w-[110px] h-28 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:bg-violet-50/50 hover:-translate-y-1 transition-all shadow-sm cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Receipt className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 text-center">New Invoice</span>
              </button>

              <button 
                onClick={() => onNavigateTab('transactions')}
                className="frozen-slab min-w-[110px] h-28 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:bg-violet-50/50 hover:-translate-y-1 transition-all shadow-sm cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 text-center">Reports</span>
              </button>
            </div>
          </section>

          {/* Attendance Trends Graph */}
          <section className="frozen-slab p-6 rounded-3xl border border-white/50 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Attendance Trends</h3>
                <p className="text-xs text-slate-400">Weekly student check-in analysis</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200/50">
                {(['Week', 'Month', 'Year'] as const).map(option => (
                  <button
                    key={option}
                    onClick={() => setAttendanceTrendType(option)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                      attendanceTrendType === option ? 'bg-white text-violet-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Attendance bars matching Screen 3 */}
            <div className="relative h-48 flex items-end justify-between gap-2 md:gap-4 px-2 pt-6">
              {/* Y-Axis scale indicators */}
              <div className="absolute left-0 top-0 h-full w-full pointer-events-none flex flex-col justify-between text-[10px] text-slate-400 font-bold opacity-60">
                <div className="border-t border-dashed border-slate-200 w-full pt-1">100%</div>
                <div className="border-t border-dashed border-slate-200 w-full pt-1">75%</div>
                <div className="border-t border-dashed border-slate-200 w-full pt-1">50%</div>
                <div className="border-t border-dashed border-slate-200 w-full pt-1 text-transparent font-normal">25%</div>
              </div>

              {[
                { label: 'Mon', h: '88%', active: true },
                { label: 'Tue', h: '92%', active: true },
                { label: 'Wed', h: '85%', active: true },
                { label: 'Thu', h: '98%', active: true },
                { label: 'Fri', h: '94%', active: true },
                { label: 'Sat', h: '40%', active: false },
                { label: 'Sun', h: '30%', active: false }
              ].map((bar, i) => (
                <div key={i} className={`flex-1 flex flex-col items-center gap-2 z-10 ${bar.active ? '' : 'opacity-40'}`}>
                  <div 
                    className="w-full bg-violet-600 rounded-t-lg shadow-sm transition-all duration-500 origin-bottom hover:bg-violet-700" 
                    style={{ height: bar.h }}
                  ></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{bar.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column (4 cols width) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Teacher Breakdown Details */}
          <section className="frozen-slab p-6 rounded-3xl border border-white/50 space-y-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-bold text-slate-800">Teacher Breakdown</h3>
              <span className="text-[10px] uppercase font-black text-slate-400">May Records</span>
            </div>

            <div className="space-y-4">
              {teachers.map((teacher, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col justify-between gap-3 shadow-sm hover:border-violet-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{teacher.name}</p>
                      <p className="text-xs text-slate-400 font-semibold">{teacher.studentsCount} Students Total</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs border-t border-slate-50 pt-2">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Motor Status</p>
                      <p className="text-slate-600">
                        <span className="font-bold text-emerald-600">{teacher.motorYes}</span> Have motor | {' '}
                        <span className="font-bold text-slate-500">{teacher.motorNo}</span> No motor
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payments Stats</p>
                      <p className="text-slate-600">
                        Paid: <span className="font-bold text-slate-900">${teacher.paid}</span> | {' '}
                        Pending: <span className="font-bold text-red-500">${teacher.pending}</span> | {' '}
                        Charge: <span className="font-bold text-violet-700">${teacher.chargePaid}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button 
                onClick={() => onNavigateTab('categories')}
                className="text-xs font-bold text-violet-600 hover:underline inline-flex items-center gap-0.5"
              >
                View All Teachers
              </button>
            </div>
          </section>

          {/* Cash Flow Spark Outline */}
          <section className="frozen-slab p-5 rounded-3xl border border-white/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-violet-700 flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                Cash Flow (7 days)
              </span>
              <span className="text-[10px] font-bold text-slate-400">91% Efficiency</span>
            </div>

            <div className="h-20 w-full flex items-end gap-1.5 pt-4">
              {[40, 60, 45, 80, 95, 70, 90].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-violet-500/20 hover:bg-violet-600 hover:bg-opacity-100 rounded-t transition-all origin-bottom cursor-pointer shadow-sm"
                  style={{ height: `${h}%` }}
                  title={`Day ${i + 1}: ${h}%`}
                ></div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
