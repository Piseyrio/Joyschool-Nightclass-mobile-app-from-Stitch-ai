import React, { useState } from 'react';
import { 
  ArrowLeft,
  Calendar, 
  Star, 
  Download, 
  History, 
  Cake, 
  Users, 
  MapPin, 
  Mail, 
  PhoneCall, 
  Fingerprint, 
  Edit2, 
  Check, 
  Undo2
} from 'lucide-react';
import { AdminProfile } from '../types';

interface ProfileViewProps {
  adminInfo: AdminProfile;
  onUpdateAdminInfo: (updated: AdminProfile) => void;
  onNavigateTab: (tab: 'home' | 'transactions' | 'add' | 'categories' | 'settings' | 'profile') => void;
}

export default function ProfileView({ adminInfo, onUpdateAdminInfo, onNavigateTab }: ProfileViewProps) {
  // Local editable student variables initialized to user template specs
  const [profileForm, setProfileForm] = useState({
    nameEn: 'ស្រីនុត',
    nameKh: 'ហាង/苏玲娜',
    code: 'JSNC-20',
    biometric: '20',
    birthday: 'Aug 11, 2022',
    phone: '090222753',
    email: 'JSNC-20@gmail.com',
    fatherName: 'Yes',
    motherName: 'Yes',
    address: 'ដង្កោ',
    classLevel: 'C.5 Fan Xia',
    subject: 'Hsk 5 Fan Xai',
    teacher: 'Fan xia'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({ ...profileForm });
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [localMessage, setLocalMessage] = useState<string | null>(null);

  const triggerFeedback = (message: string) => {
    setLocalMessage(message);
    setTimeout(() => {
      setLocalMessage(null);
    }, 4000);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileForm({ ...editFields });
    
    // Sync the global admin state in App component to propagate avatar & name updates instantly
    onUpdateAdminInfo({
      name: `${editFields.nameEn} ${editFields.nameKh}`,
      role: 'Student Admin',
      email: editFields.email,
      phone: editFields.phone,
      office: editFields.address,
      employeeId: editFields.code,
      avatar: adminInfo.avatar
    });

    setIsEditing(false);
    triggerFeedback("Profile details saved successfully.");
  };

  const handleExportPDF = () => {
    setDownloadProgress(true);
    triggerFeedback("Generating official student ID credential card as high-resolution PDF...");
    setTimeout(() => {
      setDownloadProgress(false);
      triggerFeedback("Download completed! Credential PDF generated.");
    }, 2500);
  };

  return (
    <div className="space-y-6 pt-2 animate-fade-in pb-16">
      
      {/* Dynamic Local View Feedback Banner */}
      {localMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-slate-800 text-white font-semibold text-xs px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-slide-down">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
          <span>{localMessage}</span>
        </div>
      )}

      {/* Screen Header */}
      <section className="flex items-center justify-between pb-2 border-b border-slate-200/50">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => onNavigateTab('settings')}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer transition-colors"
            title="Return to Administration panel"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-950 font-sans tracking-tight">User Profile</h1>
            <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider">Joy School Night Class</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => {
            if (isEditing) {
              setIsEditing(false);
            } else {
              setEditFields({ ...profileForm });
              setIsEditing(true);
            }
          }}
          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            isEditing 
              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200' 
              : 'bg-violet-900 text-white hover:bg-violet-950 shadow-sm'
          }`}
        >
          {isEditing ? (
            <>
              <Undo2 className="w-3.5 h-3.5" />
              Cancel Edit
            </>
          ) : (
            <>
              <Edit2 className="w-3.5 h-3.5" />
              Edit Profile
            </>
          )}
        </button>
      </section>

      {isEditing ? (
        /* --- INTEGRATED PROFILE EDIT FORM ENTRY VIEW --- */
        <form onSubmit={handleProfileSave} className="space-y-4 animate-fade-in">
          <div className="frozen-slab rounded-2xl p-6 border border-slate-200/50 space-y-4">
            <h3 className="text-xs font-black text-violet-800 uppercase tracking-widest border-b border-slate-100 pb-2">
              Modify Credentials
            </h3>

            {/* Language Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">First Name EN</label>
                <input 
                  type="text" 
                  value={editFields.nameEn} 
                  required
                  onChange={(e) => setEditFields(prev => ({ ...prev, nameEn: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Surname / Translations</label>
                <input 
                  type="text" 
                  value={editFields.nameKh} 
                  required
                  onChange={(e) => setEditFields(prev => ({ ...prev, nameKh: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>
            </div>

            {/* Email & Phone Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Account Email</label>
                <input 
                  type="email" 
                  value={editFields.email} 
                  required
                  onChange={(e) => setEditFields(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Phone Contact</label>
                <input 
                  type="text" 
                  value={editFields.phone} 
                  required
                  onChange={(e) => setEditFields(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>
            </div>

            {/* Birthday and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Birthday</label>
                <input 
                  type="text" 
                  value={editFields.birthday} 
                  required
                  onChange={(e) => setEditFields(prev => ({ ...prev, birthday: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Address Khmer</label>
                <input 
                  type="text" 
                  value={editFields.address} 
                  required
                  onChange={(e) => setEditFields(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>
            </div>

            {/* Parents details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Father's Record Status</label>
                <input 
                  type="text" 
                  value={editFields.fatherName} 
                  required
                  onChange={(e) => setEditFields(prev => ({ ...prev, fatherName: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Mother's Record Status</label>
                <input 
                  type="text" 
                  value={editFields.motherName} 
                  required
                  onChange={(e) => setEditFields(prev => ({ ...prev, motherName: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>
            </div>

            {/* Read-Only Terminal Codes */}
            <div>
              <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Registration Card ID (Read-only)</label>
              <input 
                type="text" 
                value={editFields.code} 
                readOnly 
                className="w-full rounded-xl border-slate-100 bg-slate-50 text-xs font-mono font-bold text-slate-500 p-3 cursor-not-allowed border" 
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-5 border border-slate-200 cursor-pointer"
              >
                Discard edits
              </button>
              <button 
                type="submit"
                className="flex-1 py-3 bg-violet-900 text-white font-bold rounded-xl text-xs hover:bg-violet-950 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* --- DEDICATED HIGH-FIDELITY USER VIEW SCREEN --- */
        <div className="space-y-6">
          
          {/* PROFILE CARD & HEADER */}
          <section className="frozen-slab rounded-[2rem] p-6 text-center border border-white/50 relative overflow-hidden flex flex-col items-center shadow-md">
            <div className="relative inline-block mb-4">
              <div className="w-28 h-36 rounded-2xl overflow-hidden bg-slate-100 border-4 border-white shadow-xl">
                <img 
                  src={adminInfo.avatar} 
                  alt={profileForm.nameEn} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -to-x-1/2 -translate-x-1/2 bg-white border border-slate-200/50 px-3.5 py-1 rounded-full shadow-md z-15">
                <span className="text-[9.5px] font-black text-emerald-800 tracking-widest uppercase">ACTIVE</span>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-slate-950 font-sans tracking-tight leading-none mt-2">
              {profileForm.nameEn}
            </h2>
            <p className="text-[#ba1a1a] text-sm font-black mt-1.5 italic Khmer-text">
              {profileForm.nameKh}
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 w-full max-w-[340px]">
              <div className="flex-1 flex items-center justify-between p-3 bg-slate-50/50 border border-slate-200/40 rounded-xl">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Star className="w-4 h-4 text-violet-700 fill-violet-400 shrink-0" />
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Code</span>
                </div>
                <span className="font-bold text-xs text-slate-800 font-mono">{profileForm.code}</span>
              </div>

              <div className="flex-1 flex items-center justify-between p-3 bg-slate-50/50 border border-slate-200/40 rounded-xl">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Fingerprint className="w-4 h-4 text-violet-700 shrink-0" />
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Biometric</span>
                </div>
                <span className="font-bold text-xs text-slate-800 font-mono">{profileForm.biometric}</span>
              </div>
            </div>
          </section>

          {/* PERSONAL & CONTACT INFORMATION PANEL */}
          <section className="frozen-slab rounded-2xl p-5 border border-slate-200/40 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest leading-none">Personal & Contact</h3>
              <span className="text-[10px] font-extrabold text-slate-400 tracking-wider">Joined Dec 2025</span>
            </div>

            <div className="space-y-3.5 text-xs">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <Cake className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Birthday</span>
                </div>
                <span className="font-extrabold text-slate-800">{profileForm.birthday}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Phone Number</span>
                </div>
                <span className="font-extrabold text-slate-850">{profileForm.phone}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Account Email</span>
                </div>
                <span className="font-extrabold text-slate-800 select-all">{profileForm.email}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <Users className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Father's Name</span>
                </div>
                <span className="font-extrabold text-slate-800">{profileForm.fatherName}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <Users className="w-4 h-4 text-pink-500 shrink-0" />
                  <span>Mother's Name</span>
                </div>
                <span className="font-extrabold text-slate-800">{profileForm.motherName}</span>
              </div>

              <div className="flex items-start justify-between border-t border-slate-100/60 pt-3">
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Primary Address</span>
                </div>
                <span className="font-extrabold text-slate-850 Khmer-text text-right max-w-[200px]">
                  {profileForm.address}
                </span>
              </div>

            </div>
          </section>

          {/* ENROLLMENT INFORMATION BLOCK */}
          <section className="frozen-slab rounded-2xl p-5 border border-slate-200/40 shadow-sm space-y-3.5">
            <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest leading-none mb-1">
              Enrollment Details
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-slate-500 font-bold">Active Class</span>
                <span className="font-extrabold text-violet-900 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-100 leading-normal">
                  {profileForm.classLevel}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Study Syllabi</span>
                <span className="font-extrabold text-violet-900 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-100 leading-normal">
                  {profileForm.subject}
                </span>
              </div>
            </div>
          </section>

          {/* LIFETIME ATTENDANCE COUNTERS */}
          <section className="frozen-slab rounded-2xl p-5 border border-slate-200/40 shadow-sm">
            <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest leading-none mb-4">
              Lifetime Attendance Stats
            </h3>

            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-base font-black text-emerald-800">109</p>
                <p className="text-[9.5px] text-slate-450 font-extrabold tracking-tight mt-0.5">Present</p>
              </div>
              <div className="text-center p-3 bg-amber-55 bg-yellow-50 border border-yellow-100 rounded-xl">
                <p className="text-base font-black text-yellow-700">0</p>
                <p className="text-[9.5px] text-slate-450 font-extrabold tracking-tight mt-0.5">Late</p>
              </div>
              <div className="text-center p-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-base font-black text-red-700">96</p>
                <p className="text-[9.5px] text-slate-450 font-extrabold tracking-tight mt-0.5">Absent</p>
              </div>
              <div className="text-center p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="text-base font-black text-blue-700">20</p>
                <p className="text-[9.5px] text-slate-450 font-extrabold tracking-tight mt-0.5">Excused</p>
              </div>
            </div>
          </section>

          {/* WEEKLY CLASS SCHEDULE */}
          <section className="frozen-slab rounded-2xl p-4 border border-slate-200/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Calendar className="w-5 h-5 text-violet-700 shrink-0" />
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest leading-none">
                Enrolled Weekly Schedule
              </h3>
            </div>

            <div className="overflow-x-auto pb-1 scrollbar-thin">
              <div className="flex gap-2 min-w-max">
                
                {/* Sun */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-slate-450 uppercase">Sun</span>
                  <div className="bg-violet-50/50 p-2 border border-violet-100/50 rounded-xl text-center w-24">
                    <p className="font-extrabold text-[10px] text-violet-950 truncate">Combine...</p>
                    <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">10:00 - 11:00</p>
                  </div>
                </div>

                {/* Mon */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-slate-450 uppercase">Mon</span>
                  <div className="bg-violet-50/50 p-2 border border-violet-100/50 rounded-xl text-center w-24">
                    <p className="font-extrabold text-[10px] text-violet-950 truncate">HSK 5 - F...</p>
                    <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">18:00 - 19:00</p>
                  </div>
                </div>

                {/* Tue */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-slate-450 uppercase">Tue</span>
                  <div className="bg-violet-50/50 p-2 border border-violet-100/50 rounded-xl text-center w-24">
                    <p className="font-extrabold text-[10px] text-violet-950 truncate">HSK 5 - F...</p>
                    <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">18:00 - 19:00</p>
                  </div>
                </div>

                {/* Wed */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-slate-450 uppercase">Wed</span>
                  <div className="bg-violet-50/50 p-2 border border-violet-100/50 rounded-xl text-center w-24">
                    <p className="font-extrabold text-[10px] text-violet-950 truncate">HSK 5 - F...</p>
                    <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">18:00 - 19:00</p>
                  </div>
                </div>

                {/* Thu */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-slate-450 uppercase">Thu</span>
                  <div className="bg-violet-50/50 p-2 border border-violet-100/50 rounded-xl text-center w-24">
                    <p className="font-extrabold text-[10px] text-violet-950 truncate">Thu - Ser...</p>
                    <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">18:00 - 19:00</p>
                  </div>
                </div>

                {/* Fri */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-slate-450 uppercase">Fri</span>
                  <div className="bg-violet-50/50 p-2 border border-violet-100/50 rounded-xl text-center w-24">
                    <p className="font-extrabold text-[10px] text-violet-950 truncate">HSK 5 - F...</p>
                    <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">18:00 - 19:00</p>
                  </div>
                </div>

              </div>
            </div>
            <p className="text-[9.5px] text-slate-400 italic text-center leading-normal">
              Read-only weekly matrix based on dynamic registrar profiles.
            </p>
          </section>

          {/* VIRTUAL STUDENT ID BADGE BLOCK WITH PDF ACTION */}
          <section className="frozen-slab rounded-2xl p-4 border border-slate-200/40 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none px-1">
              Student ID Card
            </h3>

            {/* Credential Card Card Board */}
            <div className="w-full bg-gradient-to-br from-white to-[#f0f4ff] rounded-2xl p-5 shadow-lg border border-slate-200/55 relative overflow-hidden flex flex-col justify-between">
              
              {/* Overlay radial mesh styling */}
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(96,22,255,0.035)_0%,transparent_70%)] pointer-events-none" />

              <div className="flex justify-between items-start mb-5 z-10">
                <div>
                  <h4 className="text-[13px] font-extrabold text-violet-800 leading-tight">សាលាអសប្បាយសិក្សា</h4>
                  <p className="text-[11px] font-extrabold text-red-655 text-red-650">喜乐学校夜学班</p>
                  <p className="text-[9px] font-extrabold text-slate-700 tracking-wider mt-0.5 uppercase">Joy School Night Class</p>
                </div>
                <div className="bg-violet-900/10 px-2 py-0.5 text-[8.5px] font-black text-violet-955 rounded uppercase font-sans">
                  វេនយប់
                </div>
              </div>

              <div className="flex gap-4 z-10">
                {/* ID Portrait Frame */}
                <div className="w-20 h-28 rounded-lg overflow-hidden border-2 border-white shadow-md bg-white shrink-0">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8QsTVOR_mnHtYYSFvGVqgapfGpL7AiEA6mIq20KASEvOUu5T15jJ61KcA0R2WXPSX4RQNPelZUi6L-R7_C4VZEBvw6hpg8cLsc9aCY_3_mdqA9JuNlvjmG69KLBvMSe6euxYIwZFlgC0LVP_Q6xjZIynd4ZE-yo9Vi93oBzhigx7PHgWdBGkxwIOVacXDuCkCfvNta8v-RZolHFTzJM6y8UNYa74SU7i-Yki9VfZTyoX7RRBVgk3hQfoYAIKYgB_F-h6AWqQ6ZCEE" 
                    alt="Student Card Portrait" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="flex-1 space-y-0.5">
                  <h5 className="text-[15px] font-extrabold text-slate-900 leading-tight Khmer-text">{profileForm.nameEn}</h5>
                  <h5 className="text-[13px] font-extrabold text-[#ba1a1a] leading-tight font-sans mt-0.5">{profileForm.nameKh}</h5>

                  <div className="space-y-1.5 pt-3 text-[9px]">
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-0.5">
                      <span className="text-slate-400">Code:</span>
                      <span className="font-extrabold text-slate-800">{profileForm.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Scan:</span>
                      <span className="font-extrabold text-slate-800">{profileForm.biometric}</span>
                    </div>
                  </div>

                  <div className="pt-3 block">
                    <span className="inline-flex items-center gap-1 bg-yellow-400/25 text-yellow-900 text-[8px] font-black px-2 py-0.5 rounded-full border border-yellow-400/40">
                      <Star className="w-2.5 h-2.5 text-yellow-600 fill-yellow-600 animate-pulse" />
                      STUDENT
                      <Star className="w-2.5 h-2.5 text-yellow-600 fill-yellow-600 animate-pulse" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom footer blocks */}
              <div className="mt-5 flex justify-between items-end border-t border-slate-200/50 pt-3 z-10 text-[9px]">
                <div className="space-y-1 text-[8.5px]">
                  <p className="flex gap-1.5">
                    <span className="text-slate-400">Class:</span>
                    <span className="font-extrabold text-slate-800">{profileForm.classLevel}</span>
                  </p>
                  <p className="flex gap-1.5">
                    <span className="text-slate-400">Subject:</span>
                    <span className="font-extrabold text-[#ba1a1a]">{profileForm.subject}</span>
                  </p>
                  <p className="flex gap-1.5">
                    <span className="text-slate-400">Teacher:</span>
                    <span className="font-extrabold text-slate-800">{profileForm.teacher}</span>
                  </p>
                </div>

                <div className="w-12 h-12 bg-white p-1 rounded-md border border-slate-200/50 shrink-0">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_0H9FqLzBSUytiiLKJI-0cn55m9ot7G6AyrA_Ayr9e8oyNUZXzP5IsH148NZDGcDRc18JLpvPKNPBGywbEjJq06PeFM3eIrwWzQ5lu7ObrMwyRIqybMRK-Zr3dEFEgfHVIXO3mBucaiqv8_xTeJf3KM6AwjzPDm3xI4rhU4EF7cAQ3SNxBBgpd1wfGnXWAUuPhFBSkxr5Qcm-fWF0wNsvnQgOdTynMAoo4eyv2b2k_siLof9pizHk4VzMvC9h6r-lqtOUX9hzdnzU" 
                    alt="ID badge bar alignment QR"
                    className="w-full h-full" 
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-slate-200/60 flex justify-between items-center text-[7.5px] text-slate-400">
                <p className="max-w-[210px] leading-relaxed">
                  អាស័យដ្ឋាន : ផ្ទះលេខ51 ផ្លូវ193/384 សង្កាត់ទួលស្វាយព្រៃ1 ខណ្ឌបឹងកេងកង ភ្នំពេញ
                </p>
                <p className="italic font-bold">Tip: JoySchool Allowed Only</p>
              </div>

            </div>

            <button 
              type="button"
              onClick={handleExportPDF}
              disabled={downloadProgress}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-violet-100/60 hover:bg-violet-100 text-violet-750 text-violet-700 font-black text-xs rounded-xl border border-violet-200/40 cursor-pointer disabled:opacity-40 transition-colors"
            >
              <Download className={`w-4 h-4 ${downloadProgress ? 'animate-bounce' : ''}`} />
              {downloadProgress ? 'Processing Generation...' : 'Export this card as PDF'}
            </button>
          </section>

          {/* ATTENDANCE SCANS CHRONOLOGY LOG */}
          <footer className="frozen-slab rounded-2xl p-5 border border-slate-200/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <History className="w-4 h-4 text-violet-700" />
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest leading-none">
                Latest Attendance Scan
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Class</span>
                <span className="font-extrabold text-slate-800">{profileForm.classLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Subject</span>
                <span className="font-extrabold text-slate-800">{profileForm.subject}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold">Teacher</span>
                <span className="font-extrabold text-slate-800">{profileForm.teacher}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Last Scan Date</span>
                  <span className="font-extrabold text-slate-800">May 25, 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Last Check IN</span>
                  <span className="font-extrabold text-slate-850">May 26, 2026, 05:44 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Final Status</span>
                  <span className="font-black text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase">PRESENT</span>
                </div>
              </div>
            </div>
          </footer>

        </div>
      )}

    </div>
  );
}
