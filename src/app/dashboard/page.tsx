"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AlertTriangle, X, Maximize2, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Alert {
  id: string;
  crimeTypeID: string;
  crimeType: string;
  summary: string;
  timestamp: string;
  severity: 'warning' | 'error';
  notificationsSent: number;
}

export default function DashboardPage() {
  const [fullscreenVideo, setFullscreenVideo] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch alerts from API
  const fetchAlerts = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      const response = await fetch('/api/gemini?limit=10');
      const data = await response.json();
      
      if (data.success) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAlerts();
    
    // Poll for new alerts every 10 seconds
    const interval = setInterval(() => {
      fetchAlerts();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Format timestamp as relative time
  const formatTime = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now.getTime() - alertTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Sample video feeds data
  const videoFeeds = [
    { id: 1, name: "Camera 1 - Entrance", status: "online" },
    { id: 2, name: "Camera 2 - Lobby", status: "online" },
    { id: 3, name: "Camera 3 - Parking Lot", status: "online" },
    { id: 4, name: "Camera 4 - Back Door", status: "online" },
    { id: 5, name: "Camera 5 - Hallway", status: "offline" },
    { id: 6, name: "Camera 6 - Office", status: "online" },
    { id: 7, name: "Camera 7 - Storage", status: "online" },
    { id: 8, name: "Camera 8 - Roof", status: "online" },
  ];

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullscreenVideo(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleFullscreen = (videoId: number) => {
    setFullscreenVideo(videoId);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  const copyAlertToClipboard = async (alert: Alert) => {
    const time = formatTime(alert.timestamp);
    const text = `${alert.crimeType}: ${alert.summary} - ${time}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Alert copied to clipboard!", {
        duration: 2000,
        style: {
          background: "#F75C69",
          color: "white",
          border: "none",
        },
      });
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Centered Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white text-center">
          Dashboard
        </h1>
      </motion.div>

      {/* Alerts Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Card className="border-2 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between py-4 px-6 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-black dark:text-white">
                Live Alerts
              </h2>
              <button
                onClick={() => fetchAlerts(true)}
                disabled={refreshing}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                title="Refresh alerts"
              >
                <RefreshCw className={`h-4 w-4 text-zinc-600 dark:text-zinc-400 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="py-8 text-center text-zinc-500 dark:text-zinc-400">
                  Loading alerts...
                </div>
              ) : alerts.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 dark:text-zinc-400">
                  No alerts yet. Alerts will appear here when crimes are detected by the AI system.
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center gap-4 py-4 px-6 group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <AlertTriangle
                      className={`h-5 w-5 flex-shrink-0 ${
                        alert.severity === "error"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black dark:text-white">
                        {alert.crimeType}: {alert.summary}
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        {formatTime(alert.timestamp)} • {alert.notificationsSent} notification{alert.notificationsSent !== 1 ? 's' : ''} sent
                      </p>
                    </div>
                    <button
                      onClick={() => copyAlertToClipboard(alert)}
                      className="flex-shrink-0 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100 active:scale-95 cursor-pointer"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Video Feeds Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Card className="border-2 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <h2 className="text-lg font-bold text-black dark:text-white py-4 px-6 border-b border-zinc-200 dark:border-zinc-800">
              Video Feeds
            </h2>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videoFeeds.map((feed) => (
                  <div key={feed.id} className="space-y-2">
                    <div
                      className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden group cursor-pointer"
                      onClick={() => handleFullscreen(feed.id)}
                    >
                      {/* Simulated video feed */}
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                      </div>

                      {/* Fullscreen button overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    
                    {/* Label below feed */}
                    <p className="text-sm font-medium text-black dark:text-white text-center">
                      {feed.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {fullscreenVideo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={closeFullscreen}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-[70%] aspect-video bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closeFullscreen}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Video feed content */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                </div>

                {/* Video label */}
                <div className="absolute bottom-4 left-0 right-0 z-10 text-center">
                  <span className="px-4 py-2 text-lg font-medium text-white bg-black/50 rounded">
                    {videoFeeds.find((f) => f.id === fullscreenVideo)?.name}
                  </span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
