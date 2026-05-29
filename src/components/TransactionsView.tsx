import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Eye, 
  PlusCircle, 
  Calendar, 
  Trash2, 
  CheckCircle2, 
  ArrowUpRight, 
  CreditCard, 
  Search, 
  TrendingUp, 
  ArrowLeft,
  XCircle,
  HelpCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Invoice, Student } from '../types';

interface TransactionsViewProps {
  students: Student[];
  invoices: Invoice[];
  onAddInvoice: (invoice: Invoice) => void;
  onUpdateInvoiceStatus: (id: string, status: 'Pending' | 'PAID', payload?: any) => void;
  onDeleteInvoice: (id: string) => void;
  onNavigateSubView: (view: string) => void;
}

export default function TransactionsView({
  students,
  invoices,
  onAddInvoice,
  onUpdateInvoiceStatus,
  onDeleteInvoice,
  onNavigateSubView
}: TransactionsViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<'March 2026' | 'April 2026' | 'May 2026' | 'June 2026'>('May 2026');
  
  // Interactive "Record Manual Payment" screen state (Screen 11)
  const [isRecordManualOpen, setIsRecordManualOpen] = useState(false);
  const [searchStudentTerm, setSearchStudentTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [paymentAmount, setPaymentAmount] = useState<number>(450.00);
  const [paymentDate, setPaymentDate] = useState<string>('29/05/2026');
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [paymentNotes, setPaymentNotes] = useState<string>('');
  
  // Alert banner if successfully posted
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filter students based on search
  const filteredStudents = students.filter(s => 
    s.nameEn.toLowerCase().includes(searchStudentTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchStudentTerm.toLowerCase())
  );

  // Invoices for selected students
  const studentInvoices = invoices.filter(inv => 
    inv.status === 'Pending' && (selectedStudents.length === 0 || selectedStudents.includes(inv.studentId))
  );

  // Calculations
  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending');
  const paidInvoices = invoices.filter(inv => inv.status === 'PAID');
  
  const totalBalance = invoices.reduce((acc, current) => acc + (current.status === 'Pending' ? current.amount : 0), 0);
  const paidTotal = invoices.reduce((acc, current) => acc + (current.status === 'PAID' ? current.amount : 0), 0);
  const discountSum = students.reduce((acc, current) => acc + (current.discount * 10), 0); // simulated discount pool

  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInvoices.length === 0) {
      alert('Please check at least one pending invoice to record a payment!');
      return;
    }

    // Update selected invoices to PAID
    selectedInvoices.forEach(invId => {
      onUpdateInvoiceStatus(invId, 'PAID', {
        paidDate: '2026-05-29',
        method: paymentMethod,
        notes: paymentNotes
      });
    });

    setSuccessToast(`Successfully recorded $${paymentAmount} payment for selected invoices.`);
    setIsRecordManualOpen(false);
    
    // Reset form states
    setSelectedStudents([]);
    setSelectedInvoices([]);
    setPaymentNotes('');
    
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  const toggleStudentSelection = (id: string) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sid => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const toggleInvoiceSelection = (id: string, amount: number) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(selectedInvoices.filter(iid => iid !== id));
      setPaymentAmount(prev => Math.max(0.01, prev - amount));
    } else {
      setSelectedInvoices([...selectedInvoices, id]);
      setPaymentAmount(prev => prev + amount);
    }
  };

  // Quick export mock trigger
  const triggerExport = (format: string) => {
    setSuccessToast(`Exporting transactions report to ${format}... Download started!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  if (isRecordManualOpen) {
    // Return High Fidelity Screen 11
    return (
      <div className="pt-4 max-w-xl mx-auto space-y-6 animate-fade-in">
        <button 
          onClick={() => setIsRecordManualOpen(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-violet-700 bg-violet-100 hover:bg-violet-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Billing
        </button>

        <section className="frozen-slab rounded-3xl p-6 md:p-8 space-y-6 border border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Record Payment</h2>
              <p className="text-xs text-slate-400 font-semibold">Fill details to record student payment manually</p>
            </div>
          </div>

          <form onSubmit={handleRecordPaymentSubmit} className="space-y-5">
            {/* Payment Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Payment Type</label>
              <select className="w-full h-12 px-4 rounded-xl bg-white/50 border border-slate-200/50 shadow-sm focus:border-violet-600 focus:ring-1 focus:ring-violet-600 outline-none text-sm font-semibold">
                <option>Pay Existing Invoice</option>
                <option>Direct Deposit</option>
                <option>Advance Credit Deposit</option>
              </select>
            </div>

            {/* Students select section */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/20">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1">Select Students (Filter options)</label>
                <div className="relative w-1/2">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchStudentTerm}
                    onChange={(e) => setSearchStudentTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {filteredStudents.map(student => {
                  const isSelected = selectedStudents.includes(student.id);
                  return (
                    <div 
                      key={student.id} 
                      onClick={() => toggleStudentSelection(student.id)}
                      className={`p-2.5 rounded-xl flex items-center justify-between border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-violet-50/50 border-violet-200' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={student.avatar} 
                          alt={student.nameEn} 
                          className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{student.id} - {student.nameEn}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-black">{student.classLevel}</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by div click
                        className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Invoices select section */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/20">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1">Select Invoices</label>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {studentInvoices.length > 0 ? (
                  studentInvoices.map(inv => {
                    const isSelected = selectedInvoices.includes(inv.id);
                    return (
                      <div 
                        key={inv.id} 
                        onClick={() => toggleInvoiceSelection(inv.id, inv.amount)}
                        className={`p-3 rounded-xl flex items-center justify-between border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-violet-50/50 border-violet-200 shadow-sm' 
                            : 'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-bold text-violet-700">{inv.id}</p>
                            <p className="text-xs font-extrabold text-slate-900">${inv.amount.toFixed(2)}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div>
                              <p className="text-[9px] text-slate-400 uppercase font-bold">Fee Type</p>
                              <p className="text-[10px] font-semibold text-slate-700 truncate max-w-[140px]">{inv.feeType}</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 uppercase font-bold">Due Date</p>
                              <p className="text-[10px] font-semibold text-slate-700">{inv.dueDate}</p>
                            </div>
                          </div>
                        </div>
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // handled by div click
                          className="w-5 h-5 ml-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 text-center font-semibold py-4">
                    {selectedStudents.length === 0 
                      ? "Search/select student(s) to view pending invoices" 
                      : "No pending invoices found for selected student(s)"}
                  </p>
                )}
              </div>
            </div>

            {/* Amount / Date side-by-side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Amount</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                    className="w-full h-12 pl-8 pr-3 rounded-xl bg-white/50 border border-slate-200/50 shadow-sm font-bold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Payment Date</label>
                <input 
                  type="text" 
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/50 border border-slate-200/50 shadow-sm font-semibold text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Payment Method</label>
              <select 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/50 border border-slate-200/50 shadow-sm focus:border-violet-600 focus:outline-none text-sm font-semibold"
              >
                <option value="cash">Cash Payment</option>
                <option value="bank">Bank Transfer / ABA</option>
                <option value="visa">Credit Card / VISA</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase ml-1 block">Notes</label>
              <textarea 
                rows={2}
                value={paymentNotes}
                onChange={(e) => setPaymentNotes(e.target.value)}
                placeholder="Reference # or receipt remarks..."
                className="w-full p-3 rounded-xl bg-white/50 border border-slate-200/50 shadow-sm text-sm font-medium focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4.5 bg-violet-900 text-white rounded-2xl font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-900/10 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              Record Payment
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      {successToast && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg border border-emerald-400 font-semibold text-sm flex items-center gap-2 animate-slide-in">
          <CheckCircle2 className="w-5 h-5" />
          {successToast}
        </div>
      )}

      {/* Header section with description */}
      <section className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">Transactions</h1>
        <p className="text-slate-500 font-medium max-w-2xl mt-1">
          Manage your school billing, track tuition payments, and monitor extracurricular activity balances in one crystalline view.
        </p>
      </section>

      {/* Primary manual payment button */}
      <section className="space-y-4">
        <button 
          onClick={() => setIsRecordManualOpen(true)}
          className="w-full py-4 px-6 rounded-2xl bg-violet-900 text-white flex items-center justify-center gap-2 font-bold shadow-lg shadow-violet-900/20 hover:bg-violet-950 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Record Manual Payment
        </button>

        {/* Quick horizontal buttons */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-2 scrollbar-thin">
          <button 
            onClick={() => triggerExport('CSV')}
            className="flex-none flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs whitespace-nowrap transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-400" />
            Export CSV
          </button>
          <button 
            onClick={() => triggerExport('PDF')}
            className="flex-none flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs whitespace-nowrap transition-all shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            Export Full Report
          </button>
          <button 
            onClick={() => triggerExport('Live PDF')}
            className="flex-none flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs whitespace-nowrap transition-all shadow-md cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Live PDF
          </button>
          <button 
            onClick={() => triggerExport('Excel')}
            className="flex-none flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs whitespace-nowrap transition-all shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            Export Excel
          </button>
        </div>
      </section>

      {/* Select Month list */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Month</h3>
          <button className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:underline">
            <Calendar className="w-3.5 h-3.5" />
            Calendar
          </button>
        </div>

        <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 scrollbar-thin">
          {(['March 2026', 'April 2026', 'May 2026', 'June 2026'] as const).map(month => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`flex-none px-5 py-2.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
                selectedMonth === month 
                  ? 'bg-violet-900 border-violet-900 text-white shadow-violet-950/10' 
                  : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white hover:text-slate-800'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </section>

      {/* Balanced Bento Cards Grid */}
      <section className="grid grid-cols-1 gap-6">
        {/* Money figures slab */}
        <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-tr from-cyan-900 to-teal-700 text-white shadow-xl">
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-75 mb-2">Total Balance (Pending Invoices)</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            ${totalBalance ? (totalBalance + 18000).toLocaleString() : '18,240'}
          </h2>

          <div className="flex justify-between w-full max-w-md border-t border-white/20 pt-6">
            <div>
              <p className="text-[9px] font-bold opacity-75 uppercase tracking-widest mb-1">PAY HISTORY</p>
              <p className="text-base font-extrabold">${(paidTotal + 8500).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold opacity-75 uppercase tracking-widest mb-1">CHARGE</p>
              <p className="text-base font-extrabold">$4,820</p>
            </div>
            <div>
              <p className="text-[9px] font-bold opacity-75 uppercase tracking-widest mb-1">DISCOUNT</p>
              <p className="text-base font-extrabold">${(discountSum + 4000).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Quick controls row */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 text-sm font-bold rounded-xl bg-teal-800 hover:bg-teal-900 text-white flex items-center justify-center gap-2 shadow-md">
            <ArrowUpRight className="w-4 h-4" /> Send
          </button>
          <button className="flex-1 py-3 text-sm font-bold rounded-xl bg-white hover:bg-slate-50 text-teal-800 border border-teal-100 flex items-center justify-center gap-2 shadow-sm">
            <CreditCard className="w-4 h-4" /> Receive
          </button>
          <button className="flex-1 py-3 text-sm font-bold rounded-xl bg-white hover:bg-slate-50 text-teal-800 border border-teal-100 flex items-center justify-center gap-2 shadow-sm">
            <TrendingUp className="w-4 h-4" /> Convert
          </button>
        </div>

        {/* Feature Promo Card */}
        <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-cyan-900 to-teal-800 text-white flex justify-between items-center shadow-md">
          <div className="space-y-1 z-10">
            <h3 className="text-lg font-bold">Be In Control Of<br />Your Finance</h3>
            <p className="text-[10px] opacity-75 max-w-[200px]">Nova gives you clarity and control over your money.</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Clock className="w-8 h-8 text-white opacity-45" />
          </div>
        </div>
      </section>

      {/* Pending Payments Section */}
      <section className="bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden space-y-4 pb-4">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-amber-500/5">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </span>
            <h3 className="font-bold text-slate-800">Pending Payments</h3>
            <span className="bg-white px-2 py-0.5 rounded-md text-xs font-black text-amber-800 border border-amber-200 shadow-sm">
              {pendingInvoices.length}
            </span>
          </div>

          <button 
            onClick={() => setIsRecordManualOpen(true)}
            className="text-xs font-bold text-violet-600 flex items-center gap-0.5 hover:underline"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {pendingInvoices.map((inv) => (
            <div 
              key={inv.id} 
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3 group hover:border-violet-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold">Invoice ID</p>
                  <p className="text-xs font-bold text-slate-900">#{inv.id}</p>
                </div>
                <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border border-amber-100 shadow-sm">
                  {inv.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-600 pt-1">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold mb-0.5">Student</p>
                  <p className="text-slate-800 truncate">{inv.studentName}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold mb-0.5">Fee Type</p>
                  <p className="text-slate-800 truncate">{inv.feeType}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold">Amount</span>
                  <span className="text-base font-extrabold text-slate-900">${inv.amount.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => onDeleteInvoice(inv.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50/50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                  title="Remove Invoice Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Success Payments */}
      <section className="bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden space-y-4 pb-4">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-500/5">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-800">Recent Success Payments</h3>
            <span className="bg-white px-2 py-0.5 rounded-md text-xs font-black text-emerald-800 border border-emerald-200">
              {paidInvoices.length}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {paidInvoices.map((inv) => (
            <div 
              key={inv.id} 
              className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-50 flex flex-col gap-3 group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Invoice Details</p>
                  <p className="text-xs font-bold text-slate-900">{inv.feeType}</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border border-emerald-100">
                  PAID
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Student</p>
                  <p className="text-slate-800 truncate font-semibold">{inv.studentName}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Processed Date</p>
                  <p className="text-slate-800 font-semibold">{inv.paidDate || '2026-05-29'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block">Paid Amount</span>
                  <span className="text-base font-extrabold text-emerald-700">${inv.amount.toFixed(2)}</span>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50/50">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
