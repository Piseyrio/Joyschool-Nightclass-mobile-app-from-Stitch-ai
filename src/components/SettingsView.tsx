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
  Check
} from 'lucide-react';

export default function SettingsView() {
  // Persistent or editable Admin state
  const [adminInfo, setAdminInfo] = useState({
    name: 'Dr. Samuel Richardson',
    role: 'Super Admin',
    email: 's.richardson@joyschool.edu',
    phone: '+1 (555) 234-8890',
    office: 'Administrative Wing, Floor 4',
    employeeId: 'ADM-99230-SR',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF0A6h66Sg9jP0X7SPhfT7fU1_aN3V8N4Bv1HqPf9eE5i7j8sX5C6b8_7D2wJ9X3sW6J3f9m4H5f7Y8wP5iY6d5W8W'
  });

  // Editor modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...adminInfo });

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
    setAdminInfo({ ...editForm });
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
              setEditForm({ ...adminInfo });
              setIsEditing(true);
            }}
            className="flex-1 py-3 px-4 bg-violet-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-violet-950 transition-all active:scale-95 cursor-pointer"
          >
            Edit Profile
          </button>
          <button 
            type="button"
            onClick={() => triggerFeedback("Advanced database security parameters are locked by Cloud Run.")}
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-slide-down">
            
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Edit Admin Profile Information</h3>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveProfileChanges} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Full Legal Name</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  required
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={editForm.email} 
                  required
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Contact Phone</label>
                <input 
                  type="text" 
                  value={editForm.phone} 
                  required
                  onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>

              {/* Primary Office Location */}
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Primary Office Location</label>
                <input 
                  type="text" 
                  value={editForm.office} 
                  required
                  onChange={(e) => setEditForm(prev => ({ ...prev, office: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-800 p-3 focus:ring-violet-500 focus:border-violet-500" 
                />
              </div>

              {/* Employee ID */}
              <div>
                <label className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1.5">Employee ID (Read Only)</label>
                <input 
                  type="text" 
                  value={editForm.employeeId} 
                  readOnly 
                  className="w-full rounded-xl border-slate-100 bg-slate-50 text-xs font-mono font-bold text-slate-500 p-3 cursor-not-allowed border" 
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-violet-900 text-white font-bold rounded-xl text-xs hover:bg-violet-950 shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

            </form>
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
