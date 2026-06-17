import React from 'react';
import { Camera, LogOut } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  profileData: { name: string; email: string; phone: string; location: string };
  setProfileData: (data: any) => void;
  isEditingProfile: boolean;
  setIsEditingProfile: (v: boolean) => void;
  handleSaveProfile: () => void;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileImageInputRef: React.RefObject<HTMLInputElement>;
  setIsChangingPassword: (v: boolean) => void;
  setOldPassword: (v: string) => void;
  setNewPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
  setShowLogoutConfirm: (v: boolean) => void;
}

const ProfilePage = ({
  user,
  profileData,
  setProfileData,
  isEditingProfile,
  setIsEditingProfile,
  handleSaveProfile,
  handleProfileImageChange,
  profileImageInputRef,
  setIsChangingPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  setShowLogoutConfirm,
}: ProfilePageProps) => {
  const initials = user?.name 
    ? user.name.charAt(0).toUpperCase() 
    : (user?.email ? user.email.charAt(0).toUpperCase() : '?');
  const isSubscribed = user?.plan && user?.plan !== 'Regular Access' && user?.plan !== '-';
  const planDisplay = user?.plan || 'Regular Access';
  const tokensDisplay = `${(user?.tokens ?? 0).toLocaleString()} PTS`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 relative">
      {/* Profile Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 blur-[100px] rounded-full -z-10 animate-pulse"></div>

      <div className="flex items-center gap-6 mb-6">
        <div 
          onClick={() => profileImageInputRef.current?.click()}
          className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl relative group cursor-pointer shrink-0"
        >
          {user?.image ? (
            <img src={user.image} alt={profileData.name || user?.email} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center text-3xl font-black">
              {initials}
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <Camera className="w-5 h-5 text-white" />
          </div>
        </div>
        <input 
          type="file" 
          ref={profileImageInputRef} 
          onChange={handleProfileImageChange} 
          accept="image/*" 
          className="hidden" 
        />
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">
            {user?.name || user?.email}
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 rounded-full border border-brand-blue/10 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
              <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
              <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest">
                {isSubscribed ? user?.plan : 'Regular Access'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card Kiri: Informasi Akun */}
        <div className="bg-gradient-to-br from-white to-blue-50/20 dark:from-slate-900/60 dark:to-slate-950/60 backdrop-blur-3xl p-6 rounded-[24px] border border-slate-200/60 dark:border-brand-blue/25 shadow-[0_10px_35px_-5px_rgba(255,176,0,0.12)] dark:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.25)] flex flex-col justify-between hover:border-brand-blue/30 dark:hover:border-brand-blue/40 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
              <h4 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Informasi Akun</h4>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all ${
                  isEditingProfile 
                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                    : 'text-brand-blue hover:bg-brand-blue/5'
                }`}
              >
                {isEditingProfile ? 'Batal' : 'Edit Profil'}
              </button>
            </div>

            {isEditingProfile ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profileData.name || ''}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-xs font-black outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Bisnis (Tetap)</label>
                  <input
                    type="email"
                    value={profileData.email || ''}
                    disabled
                    className="w-full bg-slate-100/80 dark:bg-slate-900/80 border-2 border-transparent rounded-2xl p-4 text-xs font-black outline-none transition-all text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nomor Telepon</label>
                  <input
                    type="text"
                    value={profileData.phone || ''}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-xs font-black outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="Contoh: 0812-3456-7890"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Domisili</label>
                  <input
                    type="text"
                    value={profileData.location || ''}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-xs font-black outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="Contoh: Jakarta, Indonesia"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="w-full py-4 bg-brand-blue text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: 'Nama', value: user?.name || '-' },
                  { label: 'Email', value: user?.email || '-', breakWord: true },
                  { label: 'Phone', value: user?.phone || '-' },
                  { label: 'Location', value: user?.location || '-' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100/50 dark:border-white/5 rounded-2xl">
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 sm:mb-0">{item.label}</span>
                    <span className={`text-[12px] font-bold text-slate-900 dark:text-white sm:text-right ${item.breakWord ? 'break-all sm:break-normal max-w-[240px] sm:max-w-[400px]' : ''}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card Kanan: Status & Keamanan */}
        <div className="bg-gradient-to-br from-white to-blue-50/20 dark:from-slate-900/60 dark:to-slate-950/60 backdrop-blur-3xl p-6 rounded-[24px] border border-slate-200/60 dark:border-brand-blue/25 shadow-[0_10px_35px_-5px_rgba(255,176,0,0.12)] dark:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.25)] flex flex-col justify-between min-h-[350px] hover:border-brand-blue/30 dark:hover:border-brand-blue/40 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
              <h4 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status & Keamanan</h4>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3.5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100/50 dark:border-white/5 rounded-2xl">
                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tipe Akun</span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                  isSubscribed 
                    ? 'bg-brand-blue/15 text-brand-blue dark:bg-brand-blue/20' 
                    : 'bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-500'
                }`}>
                  {planDisplay}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100/50 dark:border-white/5 rounded-2xl">
                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Token Point</span>
                <span className="text-[12px] font-bold text-slate-900 dark:text-white">
                  {tokensDisplay}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => {
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setIsChangingPassword(true);
              }}
              className="w-full py-3.5 text-[9px] font-black text-white bg-brand-blue hover:bg-blue-600 uppercase tracking-widest rounded-2xl transition-all shadow-md shadow-brand-blue/20 flex items-center justify-center"
            >
              Ubah Password
            </button>
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full py-3.5 text-[9px] font-black text-red-500 hover:text-red-600 hover:border-red-500/50 uppercase tracking-widest border border-red-200/50 dark:border-red-900/30 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
