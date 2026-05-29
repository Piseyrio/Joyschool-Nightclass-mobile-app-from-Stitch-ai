import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  PhoneCall, 
  MapPin, 
  Fingerprint, 
  ShieldCheck, 
  Server, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  BellRing, 
  Laptop, 
  Lock, 
  Wrench,
  BookOpen,
  MessageSquare,
  LogOut,
  X,
  Check,
  Calendar,
  Star,
  Download,
  Printer,
  History,
  Cake,
  Users,
  Edit2
} from 'lucide-react';

import { AdminProfile } from '../types';

interface SettingsViewProps {
  adminInfo: AdminProfile;
  onUpdateAdminInfo: React.Dispatch<React.SetStateAction<AdminProfile>>;
  onEditProfileClick?: () => void;
}

export default function SettingsView({ adminInfo, onUpdateAdminInfo, onEditProfileClick }: SettingsViewProps) {
  // Editor modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...adminInfo });

  // Custom Cambodian student profile state matching user template
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

  const [innerEditMode, setInnerEditMode] = useState(false);
  const [cardToast, setCardToast] = useState(false);

  // Help support detail overlay states
  const [activeHelpArea, setActiveHelpArea] = useState<'kb' | 'chat' | null>(null);

  // System notification flags
  const [pushNotif, setPushNotif] = useState(true);
  const [emailSum, setEmailSum] = useState(true);
  const [systemLogs, setSystemLogs] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');

  // Terminals database list
  const [devices, setDevices] = useState([
    { name: 'ZK-Main-01', status: 'ONLINE', location: 'North Gate Entrance', lastSync: '10 mins ago' },
    { name: 'ZK-Lib-04', status: 'ONLINE', location: 'Library Corridor', lastSync: '3 mins ago' },
    { name: 'ZK-Staff-02', status: 'OFFLINE', location: 'Staff Lounge', lastSync: '12 hours ago' }
  ]);

  // Local feedback banner inside settings view
  const [localFeedback, setLocalFeedback] = useState<string | null>(null);

  const triggerFeedback = (message: string) => {
    setLocalFeedback(message);
    setTimeout(() => {
      setLocalFeedback(null);
    }, 4000);
  };

  const handleDeviceScan = () => {
    setScanState('scanning');
    triggerFeedback("Pinging ZK-Terminals network...");
    setTimeout(() => {
      setDevices(prev => 
        prev.map(dev => ({ ...dev, status: 'ONLINE', lastSync: 'Just now' }))
      );
      setScanState('complete');
      triggerFeedback("Network scan complete. ZK-Staff-02 terminal recovered!");
      setTimeout(() => setScanState('idle'), 2000);
    }, 1800);
  };

  const saveProfileChanges = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAdminInfo({ ...editForm });
    setIsEditing(false);
    triggerFeedback("Your administrative profile was updated successfully.");
  };

  const handleLogOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to end your administration login session?");
    if (confirmLogout) {
      triggerFeedback("Logged out! Admin session has been safely flushed.");
    }
  };

  return (
    <div className="space-y-6 pt-4 animate-fade-in pb-12 relative">
      
      {/* Settings Header Title */}
      <section className="mb-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 font-sans">Settings & Profile</h1>
        <p className="text-slate-500 font-medium mt-1">Manage super admin credentials, biometric peripherals, and support hubs.</p>
      </section>

      {/* Internal Feedback Banner */}
      {localFeedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-4 flex items-center gap-3 animate-slide-down">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold">{localFeedback}</p>
        </div>
      )}

      {/* 1. Admin Bio Profile Card */}
      <section className="frozen-slab rounded-[2rem] p-6 md:p-8 border border-white/50 relative overflow-hidden flex flex-col items-center text-center shadow-lg">
        {/* Avatar badge structure */}
        <div className="relative mb-4 group">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-xl">
            <img 
              src={adminInfo.avatar} 
              alt={adminInfo.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="absolute bottom-0 right-1 bg-violet-900 text-white p-1 rounded-full border-2 border-white shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-950 font-sans tracking-tight">{adminInfo.name}</h2>
        <p className="text-violet-800 text-xs font-black uppercase tracking-wider bg-violet-50 px-3 py-1 rounded-full border border-violet-100 mt-1 mb-6">
          {adminInfo.role}
        </p>

        {/* Edit Button Options */}
        <div className="flex gap-3 w-full">
          <button 
            type="button"
            onClick={() => {
              if (onEditProfileClick) {
                onEditProfileClick();
              } else {
                setEditForm({ ...adminInfo });
                setIsEditing(true);
              }
            }}
            className="flex-1 py-3 px-4 bg-violet-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-violet-950 transition-all active:scale-95 cursor-pointer"
          >
            Edit Profile
          </button>
          <button 
            type="button"
            onClick={() => {
              if (onEditProfileClick) {
                onEditProfileClick();
              } else {
                triggerFeedback("Advanced database security parameters are locked by Cloud Run.");
              }
            }}
            className="flex-1 py-3 px-4 bg-slate-100/80 hover:bg-slate-200/80 text-slate-800 rounded-xl text-xs font-bold border border-slate-200/60 transition-all active:scale-95 cursor-pointer"
          >
            Account Settings
          </button>
        </div>
      </section>

      {/* 2. Account Information Block */}
      <section className="space-y-3">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest px-1">Account Information</h3>
        <div className="frozen-slab rounded-2xl overflow-hidden divide-y divide-slate-100 border border-slate-200/40">
          
          {/* Email Row */}
          <div className="p-4 flex items-center gap-4 bg-white/40">
            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none">Email</p>
              <p className="text-sm font-bold text-slate-800 mt-1.5">{adminInfo.email}</p>
            </div>
          </div>

          {/* Phone Row */}
          <div className="p-4 flex items-center gap-4 bg-white/40">
            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none">Phone Number</p>
              <p className="text-sm font-bold text-slate-800 mt-1.5">{adminInfo.phone}</p>
            </div>
          </div>

          {/* Location Row */}
          <div className="p-4 flex items-center gap-4 bg-white/40">
            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none">Primary Office</p>
              <p className="text-sm font-bold text-slate-800 mt-1.5">{adminInfo.office}</p>
            </div>
          </div>

          {/* Employee ID Row */}
          <div className="p-4 flex items-center gap-4 bg-white/40">
            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
              <Fingerprint className="w-5 h-5 hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none">Employee ID</p>
              <p className="text-sm font-mono font-bold text-slate-800 mt-1.5">{adminInfo.employeeId}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Notification Flags with Custom Toggle Switches */}
      <section className="space-y-3">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest px-1">Notifications</h3>
        <div className="frozen-slab rounded-2xl p-2 space-y-1.5 border border-slate-200/40">
          
          {/* Push Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/40 transition-colors">
            <span className="text-sm font-bold text-slate-800">Push Notifications</span>
            <button
              type="button"
              onClick={() => {
                setPushNotif(!pushNotif);
                triggerFeedback(pushNotif ? "Push alerts deactivated." : "Push notifications primed!");
              }}
              className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                pushNotif ? 'bg-violet-900' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                  pushNotif ? 'translate-x-[20px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Email Summaries Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/40 transition-colors">
            <span className="text-sm font-bold text-slate-800">Email Summaries</span>
            <button
              type="button"
              onClick={() => {
                setEmailSum(!emailSum);
                triggerFeedback(emailSum ? "Daily digest de-listed." : "Automated email PDFs scheduled.");
              }}
              className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                emailSum ? 'bg-violet-900' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                  emailSum ? 'translate-x-[20px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* System Logs Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/40 transition-colors">
            <span className="text-sm font-bold text-slate-800">System Logs</span>
            <button
              type="button"
              onClick={() => {
                setSystemLogs(!systemLogs);
                triggerFeedback(systemLogs ? "Diagnostic logging muted." : "Biometric verbose telemetry active.");
              }}
              className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                systemLogs ? 'bg-violet-900' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                  systemLogs ? 'translate-x-[20px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Biometric Device Management */}
      <section className="space-y-3">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Device Management</h3>
          <button 
            type="button"
            onClick={handleDeviceScan}
            disabled={scanState === 'scanning'}
            className="text-[11px] text-violet-800 font-extrabold bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100 hover:bg-violet-100 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Radio className={`w-3.5 h-3.5 ${(scanState === 'scanning') ? 'animate-spin' : ''}`} />
            Scan Devices
          </button>
        </div>

        <div className="frozen-slab rounded-2xl overflow-hidden divide-y divide-slate-100 border border-slate-200/40">
          {devices.map((dev, i) => (
            <div key={i} className="p-4 flex items-center justify-between bg-white/40">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${dev.status === 'ONLINE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-500'}`}>
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{dev.name}</p>
                  <p className="text-[10px] text-slate-400 font-semibold leading-none mt-1">{dev.location} • Sync: {dev.lastSync}</p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black border uppercase ${
                dev.status === 'ONLINE' 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                {dev.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Support & Help */}
      <section className="space-y-3">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest px-1">Support & Help</h3>
        <div className="grid grid-cols-2 gap-4">
          
          <button 
            type="button"
            onClick={() => setActiveHelpArea('kb')}
            className="frozen-slab p-5 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/80 transition-all text-center cursor-pointer border border-slate-200/40"
          >
            <div className="w-12 h-12 bg-violet-50 text-violet-700 rounded-full flex items-center justify-center shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-xs text-slate-800">Knowledge Base</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Documentation Hub</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => {
              setActiveHelpArea('chat');
              triggerFeedback("Connecting to live support agents at the main campus...");
            }}
            className="frozen-slab p-5 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/80 transition-all text-center cursor-pointer border border-slate-200/40"
          >
            <div className="w-12 h-12 bg-violet-50 text-violet-700 rounded-full flex items-center justify-center shadow-inner">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="font-extrabold text-xs text-slate-800">Direct Support</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Chat with our staff</p>
            </div>
          </button>
        </div>
      </section>

      {/* 6. Admin Logout Module & Footprints */}
      <footer className="pt-8 pb-4 flex flex-col items-center space-y-4">
        <button 
          type="button"
          onClick={handleLogOut}
          className="flex items-center gap-3 text-red-700 font-extrabold text-xs px-10 py-4 rounded-full bg-red-50 hover:bg-red-100 border border-red-200/60 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          Log Out Now
        </button>
        <div className="text-center space-y-1">
          <p className="text-[10px] text-slate-400 font-extrabold">Joy School Administrator</p>
          <p className="text-[9px] text-slate-350 tracking-widest font-mono uppercase">v4.2.1-Build-90</p>
        </div>
      </footer>


      {/* --- EDIT PROFILE SHEETS MODAL (OVERLAY) --- */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-[520px] bg-gradient-to-b from-[#f9f9ff] to-[#eef2ff] rounded-3xl shadow-2xl border border-white/60 animate-slide-down flex flex-col h-[90vh] max-h-[850px] relative">
            
            {/* Header top-bar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200/50 bg-white/60 backdrop-blur-md sticky top-0 z-30 rounded-t-3xl">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Student Profile Settings</h3>
                <p className="text-[10px] text-slate-500 font-semibold">Joy School Night Class Terminal</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => setInnerEditMode(!innerEditMode)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    innerEditMode 
                      ? 'bg-violet-900 text-white hover:bg-violet-950' 
                      : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                  }`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  {innerEditMode ? 'View Profile' : 'Edit Details'}
                </button>
                <button 
                  type="button" 
                  onClick={() => { setIsEditing(false); setInnerEditMode(false); }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable content container matching user's exact mockup */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 pt-4">
              
              {/* Optional Local PDF Download Banner */}
              {cardToast && (
                <div className="bg-violet-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-violet-800 font-semibold text-xs flex items-center gap-2 animate-slide-down">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Generating high-resolution security ID badge PDF...</span>
                </div>
              )}

              {innerEditMode ? (
                /* --- FULL INTERACTIVE CHANGE FORM MODE --- */
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Sync up with parental adminInfo state
                    onUpdateAdminInfo({
                      name: `${profileForm.nameEn} ${profileForm.nameKh}`,
                      role: 'Super Admin',
                      email: profileForm.email,
                      phone: profileForm.phone,
                      office: profileForm.address,
                      employeeId: profileForm.code,
                      avatar: adminInfo.avatar
                    });
                    setInnerEditMode(false);
                    triggerFeedback("Student profile details updated successfully!");
                  }}
                  className="space-y-4 bg-white/60 p-5 rounded-2xl border border-slate-200/50"
                >
                  <h4 className="text-xs font-black text-violet-800 uppercase tracking-widest border-b border-slate-100 pb-2">Modify Personal Variables</h4>
                  
                  {/* Name EN */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">First Name En / Khmer</label>
                    <input 
                      type="text" 
                      value={profileForm.nameEn} 
                      required
                      onChange={(e) => setProfileForm(prev => ({ ...prev, nameEn: e.target.value }))}
                      className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                    />
                  </div>

                  {/* Slashed Last Name / Khmer translation */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5 font-sans">Surname / Khmer Slashed Translation</label>
                    <input 
                      type="text" 
                      value={profileForm.nameKh} 
                      required
                      onChange={(e) => setProfileForm(prev => ({ ...prev, nameKh: e.target.value }))}
                      className="w-full rounded-xl border-[#d3ccff] text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                    />
                  </div>

                  {/* Birthday */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Birthday</label>
                    <input 
                      type="text" 
                      value={profileForm.birthday} 
                      required
                      onChange={(e) => setProfileForm(prev => ({ ...prev, birthday: e.target.value }))}
                      className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Phone Contact</label>
                    <input 
                      type="text" 
                      value={profileForm.phone} 
                      required
                      onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Account Email</label>
                    <input 
                      type="email" 
                      value={profileForm.email} 
                      required
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                    />
                  </div>

                  {/* Father's Name */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Father's Name</label>
                    <input 
                      type="text" 
                      value={profileForm.fatherName} 
                      required
                      onChange={(e) => setProfileForm(prev => ({ ...prev, fatherName: e.target.value }))}
                      className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                    />
                  </div>

                  {/* Mother's Name */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Mother's Name</label>
                    <input 
                      type="text" 
                      value={profileForm.motherName} 
                      required
                      onChange={(e) => setProfileForm(prev => ({ ...prev, motherName: e.target.value }))}
                      className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Primary Address (Khmer)</label>
                    <input 
                      type="text" 
                      value={profileForm.address} 
                      required
                      onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                    />
                  </div>

                  {/* Code */}
                  <div>
                    <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Registration Code (Read-Only)</label>
                    <input 
                      type="text" 
                      value={profileForm.code} 
                      readOnly 
                      className="w-full rounded-xl border-slate-100 bg-slate-100 text-xs font-mono font-bold text-slate-500 p-3 cursor-not-allowed border" 
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setInnerEditMode(false)}
                      className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 cursor-pointer"
                    >
                      View Profile Card
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-3 bg-violet-900 text-white font-bold rounded-xl text-xs hover:bg-violet-950 shadow-md cursor-pointer"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              ) : (
                /* --- EXACT HIGH-FIDELITY VIEW MODE INSPIRED FROM USER HTML --- */
                <div className="space-y-6">
                  
                  {/* Profile Header Section */}
                  <section className="bg-white/85 border border-white/50 backdrop-blur-xl rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
                    <div className="relative inline-block mb-4">
                      <div className="w-28 h-36 mx-auto rounded-xl overflow-hidden border-4 border-white shadow-md">
                        <img 
                          className="w-full h-full object-cover" 
                          alt="Student Portrait" 
                          referrerPolicy="no-referrer"
                          src={adminInfo.avatar} 
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#ffffff] border border-slate-200/55 px-3 py-1 rounded-full shadow-sm">
                        <span className="text-[10px] font-bold text-emerald-800 tracking-widest">ACTIVE</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight mt-1">
                      {profileForm.nameEn} {profileForm.nameKh}
                    </h2>
                    
                    <div className="mt-5 flex flex-col gap-2 text-xs">
                      <div className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-100 animate-pulse-subtle">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Star className="w-4 h-4 text-violet-700 fill-violet-700 animate-spin-slow" />
                          <span className="font-semibold text-slate-500">Code</span>
                        </div>
                        <span className="font-bold text-slate-900 font-mono">{profileForm.code}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Fingerprint className="w-4 h-4 text-violet-700" />
                          <span className="font-semibold text-slate-500">Biometric Alignment</span>
                        </div>
                        <span className="font-bold text-slate-900 font-mono">{profileForm.biometric}</span>
                      </div>
                    </div>
                  </section>

                  {/* Personal & Contact Section */}
                  <section className="bg-white/85 border border-white/50 backdrop-blur-xl rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Personal &amp; Contact</h3>
                      <span className="text-[10px] font-extrabold text-[#797584]">Joined Dec 2025</span>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
                          <Cake className="w-4 h-4 text-orange-500 shrink-0" />
                          <span>Birthday</span>
                        </div>
                        <span className="font-extrabold text-slate-900">{profileForm.birthday}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
                          <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Phone</span>
                        </div>
                        <span className="font-extrabold text-slate-900">{profileForm.phone}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
                          <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                          <span>Account Email</span>
                        </div>
                        <span className="font-extrabold text-slate-900">{profileForm.email}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
                          <Users className="w-4 h-4 text-violet-500 shrink-0" />
                          <span>Father's Name</span>
                        </div>
                        <span className="font-extrabold text-slate-900">{profileForm.fatherName}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
                          <Users className="w-4 h-4 text-pink-500 shrink-0" />
                          <span>Mother's Name</span>
                        </div>
                        <span className="font-extrabold text-slate-900">{profileForm.motherName}</span>
                      </div>

                      <div className="flex items-start justify-between border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
                          <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                          <span>Address</span>
                        </div>
                        <span className="font-extrabold text-slate-900 Khmer-text text-right max-w-[200px]">{profileForm.address}</span>
                      </div>

                    </div>
                  </section>

                  {/* Enrollment Section */}
                  <section className="bg-white/85 border border-white/50 backdrop-blur-xl rounded-2xl p-5 shadow-sm space-y-3">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">Enrollment Settings</h3>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">Class Assigned</span>
                        <span className="font-extrabold text-violet-900 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-100">{profileForm.classLevel}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-semibold">Subjects Study</span>
                        <span className="font-extrabold text-violet-900 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-100">{profileForm.subject}</span>
                      </div>
                    </div>
                  </section>

                  {/* Lifetime Attendance Section */}
                  <section className="bg-white/85 border border-white/50 backdrop-blur-xl rounded-2xl p-5 shadow-sm">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">Lifetime Attendance Stats</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="text-base font-black text-emerald-800">109</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Present</div>
                      </div>
                      <div className="text-center p-2.5 bg-yellow-50 rounded-xl border border-yellow-100">
                        <div className="text-base font-black text-yellow-700">0</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Late</div>
                      </div>
                      <div className="text-center p-2.5 bg-red-50 rounded-xl border border-red-100">
                        <div className="text-base font-black text-red-650">96</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Absent</div>
                      </div>
                      <div className="text-center p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="text-base font-black text-blue-700">20</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Excused</div>
                      </div>
                    </div>
                  </section>

                  {/* Student Timetable Section */}
                  <section className="bg-white/85 border border-white/50 backdrop-blur-xl rounded-2xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-violet-700 animate-bounce-slow" />
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Enrolled Weekly Schedule</h3>
                    </div>
                    
                    <div className="overflow-x-auto pb-1">
                      <div className="flex gap-2 min-w-max">
                        {/* Sunday */}
                        <div className="flex flex-col items-center gap-1.5 p-1">
                          <span className="text-[11px] font-bold text-slate-900">Sun</span>
                          <div className="bg-violet-50/80 p-2 rounded-xl border border-violet-100 text-[10px] text-center w-24">
                            <div className="font-extrabold text-violet-955 truncate">Combine...</div>
                            <div className="text-slate-400 mt-0.5">10:00 - 11:00</div>
                          </div>
                        </div>

                        {/* Monday */}
                        <div className="flex flex-col items-center gap-1.5 p-1">
                          <span className="text-[11px] font-bold text-slate-900">Mon</span>
                          <div className="bg-violet-50/80 p-2 rounded-xl border border-violet-100 text-[10px] text-center w-24">
                            <div className="font-extrabold text-violet-955 truncate">HSK 5 - F...</div>
                            <div className="text-slate-400 mt-0.5">18:00 - 19:00</div>
                          </div>
                        </div>

                        {/* Tuesday */}
                        <div className="flex flex-col items-center gap-1.5 p-1">
                          <span className="text-[11px] font-bold text-slate-900">Tue</span>
                          <div className="bg-violet-50/80 p-2 rounded-xl border border-violet-100 text-[10px] text-center w-24">
                            <div className="font-extrabold text-violet-955 truncate">HSK 5 - F...</div>
                            <div className="text-slate-400 mt-0.5">18:00 - 19:00</div>
                          </div>
                        </div>

                        {/* Wednesday */}
                        <div className="flex flex-col items-center gap-1.5 p-1">
                          <span className="text-[11px] font-bold text-slate-900">Wed</span>
                          <div className="bg-violet-50/80 p-2 rounded-xl border border-violet-100 text-[10px] text-center w-24">
                            <div className="font-extrabold text-violet-955 truncate">HSK 5 - F...</div>
                            <div className="text-slate-400 mt-0.5">18:00 - 19:00</div>
                          </div>
                        </div>

                        {/* Thursday */}
                        <div className="flex flex-col items-center gap-1.5 p-1">
                          <span className="text-[11px] font-bold text-slate-900 font-sans">Thu</span>
                          <div className="bg-violet-50/80 p-2 rounded-xl border border-violet-100 text-[10px] text-center w-24">
                            <div className="font-extrabold text-violet-955 truncate">Thu - Ser...</div>
                            <div className="text-slate-400 mt-0.5">18:00 - 19:00</div>
                          </div>
                        </div>

                        {/* Friday */}
                        <div className="flex flex-col items-center gap-1.5 p-1">
                          <span className="text-[11px] font-bold text-slate-900">Fri</span>
                          <div className="bg-violet-50/80 p-2 rounded-xl border border-violet-100 text-[10px] text-center w-24">
                            <div className="font-extrabold text-violet-955 truncate">HSK 5 - F...</div>
                            <div className="text-slate-400 mt-0.5">18:00 - 19:00</div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <p className="text-[10px] text-[#797584] mt-2 text-center italic">Read-only timetable based on enrolled sessions.</p>
                  </section>

                  {/* Student ID Card Section */}
                  <section className="bg-white/85 border border-white/50 backdrop-blur-xl rounded-2xl p-4 shadow-sm space-y-4">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 px-1">Student ID Card (Badging)</h3>
                    
                    {/* Simulated visual identity card */}
                    <div className="w-full bg-gradient-to-br from-white to-[#f0f4ff] rounded-2xl p-5 shadow-lg border border-slate-200/50 relative overflow-hidden flex flex-col justify-between">
                      {/* Radial decoration element mimics native rendering */}
                      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(96,22,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
                      
                      <div className="flex justify-between items-start mb-5 z-10">
                        <div>
                          <h4 className="text-[13px] font-extrabold text-violet-800 leading-tight">សាលាអសប្បាយសិក្សា</h4>
                          <p className="text-[11px] font-extrabold text-red-600">喜乐学校夜学班</p>
                          <p className="text-[9px] font-extrabold text-slate-700 tracking-wider mt-0.5 uppercase">Joy School Night Class</p>
                        </div>
                        <div className="bg-violet-900/10 px-2 py-1 text-[9px] font-black text-violet-955 rounded uppercase font-sans">
                          វេនយប់
                        </div>
                      </div>

                      <div className="flex gap-4 z-10">
                        <div className="w-20 h-28 rounded-lg overflow-hidden border-2 border-white shadow-md bg-white flex-shrink-0">
                          <img 
                            className="w-full h-full object-cover" 
                            alt="Student ID Portrait" 
                            referrerPolicy="no-referrer"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8QsTVOR_mnHtYYSFvGVqgapfGpL7AiEA6mIq20KASEvOUu5T15jJ61KcA0R2WXPSX4RQNPelZUi6L-R7_C4VZEBvw6hpg8cLsc9aCY_3_mdqA9JuNlvjmG69KLBvMSe6euxYIwZFlgC0LVP_Q6xjZIynd4ZE-yo9Vi93oBzhigx7PHgWdBGkxwIOVacXDuCkCfvNta8v-RZolHFTzJM6y8UNYa74SU7i-Yki9VfZTyoX7RRBVgk3hQfoYAIKYgB_F-h6AWqQ6ZCEE" 
                          />
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <h5 className="text-[15px] font-extrabold text-slate-900 leading-tight Khmer-text">{profileForm.nameEn}</h5>
                          <h5 className="text-[14px] font-extrabold text-[#ba1a1a] leading-tight font-sans">{profileForm.nameKh}</h5>
                          
                          <div className="space-y-1 pt-3.5 text-[9px]">
                            <div className="flex justify-between border-b border-dashed border-slate-200 pb-0.5">
                              <span className="text-slate-400">Code :</span> 
                              <span className="font-extrabold text-slate-800">{profileForm.code}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Scan :</span> 
                              <span className="font-extrabold text-slate-800">{profileForm.biometric}</span>
                            </div>
                          </div>

                          <div className="pt-3 block">
                            <span className="inline-flex items-center gap-1 bg-yellow-400/25 text-yellow-900 text-[8px] font-black px-2 py-0.5 rounded-full border border-yellow-400/40">
                              <Star className="w-2.5 h-2.5 text-yellow-600 fill-yellow-600" />
                              STUDENT
                              <Star className="w-2.5 h-2.5 text-yellow-600 fill-yellow-600" />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex justify-between items-end border-t border-slate-200/50 pt-3 z-10 text-[9px]">
                        <div className="space-y-1">
                          <div className="flex gap-1.5"><span className="text-slate-400">Class :</span> <span className="font-extrabold text-slate-800">{profileForm.classLevel}</span></div>
                          <div className="flex gap-1.5"><span className="text-slate-400">Subject :</span> <span className="font-extrabold text-[#ba1a1a]">{profileForm.subject}</span></div>
                          <div className="flex gap-1.5"><span className="text-slate-400">Teacher :</span> <span className="font-extrabold text-slate-800">{profileForm.teacher}</span></div>
                        </div>
                        <div className="w-14 h-14 bg-white p-1 rounded-md border border-slate-200/60 shrink-0">
                          <img 
                            alt="ID Card Signature QR" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_0H9FqLzBSUytiiLKJI-0cn55m9ot7G6AyrA_Ayr9e8oyNUZXzP5IsH148NZDGcDRc18JLpvPKNPBGywbEjJq06PeFM3eIrwWzQ5lu7ObrMwyRIqybMRK-Zr3dEFEgfHVIXO3mBucaiqv8_xTeJf3KM6AwjzPDm3xI4rhU4EF7cAQ3SNxBBgpd1wfGnXWAUuPhFBSkxr5Qcm-fWF0wNsvnQgOdTynMAoo4eyv2b2k_siLof9pizHk4VzMvC9h6r-lqtOUX9hzdnzU" 
                            className="w-full h-full"
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-3.5 border-t border-dashed border-slate-200/60 flex justify-between items-center text-[7.5px] text-[#797584]">
                        <p className="max-w-[220px] leading-relaxed">អាស័យដ្ឋាន : ផ្ទះលេខ51 ផ្លូវ193/384 សង្កាត់ទួលស្វាយព្រៃ1 ខណ្ឌបឹងកេងកង ភ្នំពេញ</p>
                        <p className="italic shrink-0">Issued by JoySchool-NightClass</p>
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        setCardToast(true);
                        triggerFeedback("Successfully prepared Student ID card PDF.");
                        setTimeout(() => setCardToast(false), 2800);
                      }}
                      className="w-full mt-3 flex items-center justify-center gap-2 py-3 px-4 bg-violet-150 hover:bg-violet-200 rounded-xl text-violet-700 font-extrabold text-xs transition-colors border border-violet-200/50"
                    >
                      <Download className="w-4 h-4" />
                      Export this card as PDF
                    </button>
                  </section>

                  {/* Latest Attendance Scan Section */}
                  <section className="bg-white/85 border border-white/50 backdrop-blur-xl rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <History className="w-4 h-4 text-violet-700" />
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Latest Attendance Scan</h3>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-600">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-semibold">Class</span>
                        <span className="font-extrabold text-slate-800">{profileForm.classLevel}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-semibold">Subject</span>
                        <span className="font-extrabold text-slate-800">{profileForm.subject}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-semibold">Teacher</span>
                        <span className="font-extrabold text-slate-800">{profileForm.teacher}</span>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-100 space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-semibold">Last Scan Date</span>
                          <span className="font-extrabold text-slate-800">May 25, 2026</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-semibold">Last Check IN</span>
                          <span className="font-extrabold text-slate-800">May 26, 2026, 05:44 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-semibold">Final Status</span>
                          <span className="font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">PRESENT</span>
                        </div>
                      </div>
                    </div>
                  </section>

                </div>
              )}
              
            </div>

            {/* Footer buttons row */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/50 flex justify-end sticky bottom-0 z-20 rounded-b-3xl">
              <button 
                type="button" 
                onClick={() => { setIsEditing(false); setInnerEditMode(false); }}
                className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer transition-colors"
              >
                Close Settings
              </button>
            </div>

          </div>
        </div>
      )}


      {/* --- KNOWLEDGE BASE / CHAT OVERLAY --- */}
      {activeHelpArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-[450px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-slide-down">
            
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                {activeHelpArea === 'kb' ? 'Joy School Knowledge Base' : 'Joy School Direct Chat'}
              </h3>
              <button 
                type="button" 
                onClick={() => setActiveHelpArea(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeHelpArea === 'kb' ? (
              <div className="space-y-3.5 text-xs text-slate-600 font-semibold max-h-[300px] overflow-y-auto scrollbar-thin pr-1">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <h4 className="font-black text-slate-800">1. How do I sync biometric terminals?</h4>
                  <p>In "Device Management", click "Scan Devices". It performs a handshake check across all registered TCP/IP ZK access terminals.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <h4 className="font-black text-slate-800">2. How are invoice fee trace codes linked?</h4>
                  <p>When you register a new Fee Category, the database generates automatic pending traces linked to top enrolled students default billing rates.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <h4 className="font-black text-slate-800">3. Class session scheduling conflicts?</h4>
                  <p>The billing ledger enforces class timetables to prevent dual teacher assignments for matching blocks.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-violet-50 text-violet-950 rounded-2xl text-xs font-semibold space-y-1.5">
                  <p className="font-black text-violet-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 uppercase animate-pulse"></span>
                    Support Desk Status: Active
                  </p>
                  <p className="text-slate-600 font-bold leading-normal">
                    Welcome Dr. Samuel Richardson. You have been connected with our global campus technician line. Describe any issues below:
                  </p>
                </div>
                <div className="space-y-3">
                  <textarea 
                    placeholder="Enter message..." 
                    className="w-full text-xs font-bold text-slate-800 rounded-xl border-slate-200 p-3 h-20 focus:ring-violet-500 focus:border-violet-500"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setActiveHelpArea(null);
                      triggerFeedback("Support request submitted safely to regional campus.");
                    }}
                    className="w-full py-3 bg-violet-900 hover:bg-violet-950 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button 
                type="button" 
                onClick={() => setActiveHelpArea(null)}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
