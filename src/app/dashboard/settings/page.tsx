"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, ChevronRight, Pencil } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { fullName, email, avatar } = useAuth();
  const router = useRouter();

  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailConfig, setEmailConfig] = useState(email || "");
  
  // Temporary state for dialog inputs (only saved on Save button)
  const [tempMobileNumber, setTempMobileNumber] = useState("");
  const [tempEmailConfig, setTempEmailConfig] = useState("");
  const [tempAvatar, setTempAvatar] = useState<string | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingAvatar(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result as string);
        setIsUploadingAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setNewAvatar(tempAvatar);
    toast.success("Profile picture updated");
    setShowProfileDialog(false);
  };

  const handleSavePhone = () => {
    setMobileNumber(tempMobileNumber);
    toast.success("Phone number updated");
    setShowPhoneDialog(false);
  };

  const handleSaveEmail = () => {
    setEmailConfig(tempEmailConfig);
    toast.success("Email updated");
    setShowEmailDialog(false);
  };
  
  const handleOpenProfileDialog = () => {
    setTempAvatar(newAvatar);
    setShowProfileDialog(true);
  };
  
  const handleOpenPhoneDialog = () => {
    setTempMobileNumber(mobileNumber);
    setShowPhoneDialog(true);
  };
  
  const handleOpenEmailDialog = () => {
    setTempEmailConfig(emailConfig);
    setShowEmailDialog(true);
  };

  const handleAlertsToggle = (enabled: boolean) => {
    setAlertsEnabled(enabled);
    if (!enabled) {
      setEmailAlerts(false);
      setSecurityAlerts(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
    setShowDeleteDialog(false);
  };

  const getInitials = () => {
    if (!fullName) return "U";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Handle ESC key to close dialogs
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowProfileDialog(false);
        setShowPhoneDialog(false);
        setShowEmailDialog(false);
        setShowDeleteDialog(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white text-center">
          Settings
        </h1>
      </motion.div>

      {/* User Settings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Card className="border-2 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <h2 className="text-lg font-bold text-black dark:text-white py-4 px-6 border-b border-zinc-200 dark:border-zinc-800">
              User Settings
            </h2>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {/* Profile Picture - Clickable */}
              <button
              onClick={handleOpenProfileDialog}
              className="w-full flex items-center justify-between py-4 px-6 text-left cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors first:rounded-t-lg"
            >
              <h3 className="text-sm font-bold text-black dark:text-white">
                Profile picture
              </h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-zinc-200 dark:border-zinc-800">
                  <AvatarImage src={newAvatar || avatar || undefined} />
                  <AvatarFallback className="bg-[#F75C69] text-white text-sm font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <ChevronRight className="h-5 w-5 text-zinc-400" />
              </div>
            </button>

            {/* Phone - Clickable */}
            <button
              onClick={handleOpenPhoneDialog}
              className="w-full flex items-center justify-between py-4 px-6 text-left cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <h3 className="text-sm font-bold text-black dark:text-white">
                Phone
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {mobileNumber || "Add phone number"}
                </span>
                <ChevronRight className="h-5 w-5 text-zinc-400" />
              </div>
            </button>

            {/* Email - Clickable */}
            <button
              onClick={handleOpenEmailDialog}
              className="w-full flex items-center justify-between py-4 px-6 pb-6 text-left cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors last:rounded-b-lg"
            >
              <h3 className="text-sm font-bold text-black dark:text-white">
                Email
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {emailConfig || "Add email"}
                </span>
                <ChevronRight className="h-5 w-5 text-zinc-400" />
              </div>
            </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Card className="border-2 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <h2 className="text-lg font-bold text-black dark:text-white py-4 px-6 border-b border-zinc-200 dark:border-zinc-800">
              Notification Settings
            </h2>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {/* Master Alerts Toggle */}
              <div className="flex items-center justify-between py-4 px-6">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-black dark:text-white mb-1">
                    Alerts
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Enable or disable all notifications
                  </p>
                </div>
                <button
                  onClick={() => handleAlertsToggle(!alertsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    alertsEnabled ? "bg-[#F75C69]" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alertsEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Email Alerts */}
              <div className={`flex items-center justify-between py-4 px-6 ${!alertsEnabled ? "opacity-50" : ""}`}>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-black dark:text-white mb-1">
                    Email alerts
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Receive alerts via email
                  </p>
                </div>
                <button
                  onClick={() => alertsEnabled && setEmailAlerts(!emailAlerts)}
                  disabled={!alertsEnabled}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alertsEnabled ? "cursor-pointer" : "cursor-not-allowed"
                  } ${
                    emailAlerts && alertsEnabled ? "bg-[#F75C69]" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailAlerts && alertsEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Security Alerts */}
              <div className={`flex items-center justify-between py-4 px-6 pb-6 ${!alertsEnabled ? "opacity-50" : ""}`}>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-black dark:text-white mb-1">
                    Security alerts
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Important security updates
                  </p>
                </div>
                <button
                  onClick={() => alertsEnabled && setSecurityAlerts(!securityAlerts)}
                  disabled={!alertsEnabled}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alertsEnabled ? "cursor-pointer" : "cursor-not-allowed"
                  } ${
                    securityAlerts && alertsEnabled ? "bg-[#F75C69]" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securityAlerts && alertsEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Account Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Card className="border-2 border-red-200 dark:border-red-900">
          <CardContent className="py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-bold text-red-600 dark:text-red-500 mb-1">
                  Delete account
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Picture Dialog */}
      <AnimatePresence>
        {showProfileDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowProfileDialog(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-black border-2 border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-bold text-center text-black dark:text-white mb-6">
                  Change profile picture
                </h2>
                <div className="flex flex-col items-center gap-4 py-4">
                  <label htmlFor="dialog-avatar-upload" className="relative cursor-pointer group">
                    <Avatar className="h-32 w-32 border-2 border-zinc-200 dark:border-zinc-800">
                      <AvatarImage src={tempAvatar || newAvatar || avatar || undefined} />
                      <AvatarFallback className="bg-[#F75C69] text-white text-3xl font-bold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-10 w-10 bg-white dark:bg-zinc-100 rounded-full border-2 border-zinc-200 dark:border-zinc-300 flex items-center justify-center group-hover:bg-zinc-50 dark:group-hover:bg-zinc-200 transition-colors">
                      <Pencil className="h-5 w-5 text-zinc-700" />
                    </div>
                  </label>
                  <input
                    id="dialog-avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  {isUploadingAvatar && (
                    <div className="h-6 w-6 border-4 border-[#F75C69] border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setShowProfileDialog(false)}
                    className="px-4 py-2 text-sm font-medium text-black dark:text-white bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#F75C69] hover:bg-[#e54d5a] rounded-lg transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Phone Dialog */}
      <AnimatePresence>
        {showPhoneDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowPhoneDialog(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-black border-2 border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-bold text-center text-black dark:text-white mb-6">
                  Change phone number
                </h2>
                <div className="space-y-4 py-4">
                  <input
                    type="tel"
                    value={tempMobileNumber}
                    onChange={(e) => setTempMobileNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-black text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F75C69] transition-colors"
                  />
                </div>
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setShowPhoneDialog(false)}
                    className="px-4 py-2 text-sm font-medium text-black dark:text-white bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePhone}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#F75C69] hover:bg-[#e54d5a] rounded-lg transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Email Dialog */}
      <AnimatePresence>
        {showEmailDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowEmailDialog(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-black border-2 border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-bold text-center text-black dark:text-white mb-6">
                  Change email
                </h2>
                <div className="space-y-4 py-4">
                  <input
                    type="email"
                    value={tempEmailConfig}
                    onChange={(e) => setTempEmailConfig(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-black text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F75C69] transition-colors"
                  />
                </div>
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setShowEmailDialog(false)}
                    className="px-4 py-2 text-sm font-medium text-black dark:text-white bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEmail}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#F75C69] hover:bg-[#e54d5a] rounded-lg transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Account Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowDeleteDialog(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-black border-2 border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-bold text-black dark:text-white mb-2">
                  Are you absolutely sure?
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowDeleteDialog(false)}
                    className="px-4 py-2 text-sm font-medium text-black dark:text-white bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
