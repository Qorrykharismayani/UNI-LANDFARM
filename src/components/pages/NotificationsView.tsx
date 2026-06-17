import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  ShieldCheck, 
  Zap, 
  LayoutTemplate, 
  Clock, 
  Sparkles,
  CheckCircle2,
  Trash2,
  BellOff,
  X
} from 'lucide-react';

export interface Notification {
  id: number;
  type: 'token' | 'template' | 'system' | 'welcome' | 'success' | string;
  title: string;
  desc: string;
  time: string;
  read?: boolean;
}

interface NotificationsViewProps {
  user: any;
  notifications: Notification[];
  onMarkAllRead?: () => void;
  onClearAll?: () => void;
  onMarkRead?: (id: number) => void;
}

const NotificationsView = ({ user, notifications, onMarkAllRead, onClearAll, onMarkRead }: NotificationsViewProps) => {
  const [selectedNotif, setSelectedNotif] = React.useState<Notification | null>(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'token': return <Zap className="w-5 h-5" />;
      case 'success': return <CheckCircle2 className="w-5 h-5" />;
      case 'template': return <LayoutTemplate className="w-5 h-5" />;
      case 'welcome': return <Sparkles className="w-5 h-5" />;
      case 'system': return <ShieldCheck className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getIconStyle = (type: string) => {
    switch (type) {
      case 'token': return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-400/20';
      case 'success': return 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-md shadow-emerald-400/20';
      case 'template': return 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20';
      case 'welcome': return 'bg-gradient-to-br from-fuchsia-400 to-purple-500 text-white shadow-md shadow-purple-400/20';
      case 'system': return 'bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-md shadow-slate-400/20';
      default: return 'bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-md shadow-slate-400/20';
    }
  };

  const getIllustration = (type: string) => {
    // We can use different realistic or stylized images depending on type
    switch (type) {
      case 'token': 
      case 'success': return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80'; // Finance/Tokens
      case 'template': return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'; // Website/Template
      case 'welcome': return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80'; // Welcome/Team
      default: return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80'; // System/Tech
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
            <Bell className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Notifikasi</h2>
            <p className="text-xs text-slate-400 font-medium">
              {notifications.length === 0 
                ? 'Belum ada notifikasi' 
                : `${unreadCount} belum dibaca dari ${notifications.length} notifikasi`}
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            {unreadCount > 0 && onMarkAllRead && (
              <button 
                onClick={onMarkAllRead}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-500 hover:text-brand-blue hover:border-brand-blue/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Tandai Semua Dibaca
              </button>
            )}
            {onClearAll && (
              <button 
                onClick={onClearAll}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-500 hover:text-red-500 hover:border-red-300 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus Semua
              </button>
            )}
          </div>
        )}
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-16 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center"
        >
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700">
            <BellOff className="w-10 h-10 text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Belum Ada Notifikasi</h3>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            Anda belum memiliki notifikasi apapun. Notifikasi akan muncul saat Anda membeli token, menyimpan template, atau ada pembaruan sistem.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
        >
          <AnimatePresence>
            {notifications.map((notif, index) => (
              <motion.div 
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedNotif(notif);
                  if (!notif.read && onMarkRead) {
                    onMarkRead(notif.id as number);
                  }
                }}
                className={`p-5 flex gap-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer ${
                  index !== notifications.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''
                } ${!notif.read ? 'bg-brand-blue/[0.02]' : ''}`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${getIconStyle(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm ${!notif.read ? 'font-black text-slate-900 dark:text-white' : 'font-bold text-slate-700 dark:text-slate-300'}`}>{notif.title}</h4>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-brand-blue shrink-0 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 shrink-0 whitespace-nowrap">
                      <Clock className="w-3 h-3" /> {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{notif.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modal for Notification Details */}
      <AnimatePresence>
        {selectedNotif && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="relative h-40 w-full">
                <img 
                  src={getIllustration(selectedNotif.type)} 
                  alt="Notification Illustration" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <button 
                  onClick={() => setSelectedNotif(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className={`absolute -bottom-6 left-6 w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white dark:border-slate-900 ${getIconStyle(selectedNotif.type)}`}>
                  {getIcon(selectedNotif.type)}
                </div>
              </div>
              
              <div className="p-6 pt-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {selectedNotif.type}
                  </span>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selectedNotif.time}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3">
                  {selectedNotif.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {selectedNotif.desc}
                </p>
                
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button 
                    onClick={() => setSelectedNotif(null)}
                    className="px-6 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all shadow-md shadow-brand-blue/20"
                  >
                    Tutup Pesan
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsView;
