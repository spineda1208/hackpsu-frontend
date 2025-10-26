"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  MoreVertical,
  Circle,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface VideoFeed {
  id: string;
  name: string;
  location: string;
  status: "live" | "offline" | "recording";
  resolution: string;
  fps: number;
}

const mockFeeds: VideoFeed[] = [
  {
    id: "1",
    name: "Camera 1 - Entrance",
    location: "Main Entrance",
    status: "live",
    resolution: "1920x1080",
    fps: 30,
  },
  {
    id: "2",
    name: "Camera 2 - Parking",
    location: "Parking Lot A",
    status: "live",
    resolution: "1920x1080",
    fps: 30,
  },
  {
    id: "3",
    name: "Camera 3 - Lobby",
    location: "Reception Lobby",
    status: "recording",
    resolution: "2560x1440",
    fps: 60,
  },
  {
    id: "4",
    name: "Camera 4 - Hallway",
    location: "2nd Floor Hallway",
    status: "live",
    resolution: "1920x1080",
    fps: 30,
  },
  {
    id: "5",
    name: "Camera 5 - Garage",
    location: "Underground Garage",
    status: "offline",
    resolution: "1280x720",
    fps: 24,
  },
  {
    id: "6",
    name: "Camera 6 - Courtyard",
    location: "Central Courtyard",
    status: "live",
    resolution: "1920x1080",
    fps: 30,
  },
  {
    id: "7",
    name: "Camera 7 - Rooftop",
    location: "Rooftop Access",
    status: "live",
    resolution: "3840x2160",
    fps: 60,
  },
  {
    id: "8",
    name: "Camera 8 - Storage",
    location: "Storage Room B",
    status: "recording",
    resolution: "1920x1080",
    fps: 30,
  },
];

function VideoFeedCard({ feed, index }: { feed: VideoFeed; index: number }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    live: "bg-green-500",
    offline: "bg-red-500",
    recording: "bg-blue-500",
  };

  const statusLabels = {
    live: "Live",
    offline: "Offline",
    recording: "Recording",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        bounce: 0.3,
        duration: 0.5,
        delay: index * 0.05,
      }}
    >
      <Card
        className="overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video bg-muted">
          {/* Video Feed Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="text-center space-y-2">
              <Circle className="h-12 w-12 mx-auto text-slate-600" />
              <p className="text-sm text-slate-400">Video Feed {feed.id}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            <Badge
              variant="secondary"
              className={`${statusColors[feed.status]} text-white border-0`}
            >
              <Circle className="h-2 w-2 mr-1 fill-current" />
              {statusLabels[feed.status]}
            </Badge>
          </div>

          {/* Video Info Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.3,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:bg-white/20"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white hover:bg-white/20"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-base">{feed.name}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{feed.location}</span>
            <span className="text-xs">
              {feed.resolution} • {feed.fps}fps
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

export default function VideoFeedsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">Video Feeds</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Filter</Button>
          <Button>Add Camera</Button>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.4,
        }}
      >
        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Feeds
                </p>
                <p className="text-2xl font-bold">
                  {mockFeeds.filter((f) => f.status === "live").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Circle className="h-6 w-6 text-green-500 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Recording
                </p>
                <p className="text-2xl font-bold">
                  {mockFeeds.filter((f) => f.status === "recording").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Circle className="h-6 w-6 text-blue-500 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Offline
                </p>
                <p className="text-2xl font-bold">
                  {mockFeeds.filter((f) => f.status === "offline").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <Circle className="h-6 w-6 text-red-500 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockFeeds.map((feed, index) => (
          <VideoFeedCard key={feed.id} feed={feed} index={index} />
        ))}
      </div>
    </div>
  );
}
