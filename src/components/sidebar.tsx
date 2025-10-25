"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Video,
  Settings,
  Users,
  BarChart3,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Video Feeds",
    href: "/dashboard/video-feeds",
    icon: Video,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      className="relative flex h-full flex-col border-r bg-background"
      animate={{
        width: collapsed ? 64 : 256,
      }}
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: 0.4,
      }}
    >
      {/* Header */}
      <motion.div
        className="flex h-16 items-center px-4 border-b"
        animate={{
          justifyContent: collapsed ? "center" : "space-between",
        }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.4,
          delay: 0.1,
        }}
      >
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.h2
              className="text-lg font-semibold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              HackPSU
            </motion.h2>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-9 w-9"
        >
          <AnimatePresence mode="wait" initial={false}>
            {collapsed ? (
              <motion.div
                key="panel-left"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.3,
                }}
              >
                <PanelLeft className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="panel-left-close"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.3,
                }}
              >
                <PanelLeftClose className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full relative overflow-hidden"
                    title={collapsed ? item.title : undefined}
                  >
                    <motion.div
                      className="flex items-center gap-3"
                      animate={{
                        justifyContent: collapsed ? "center" : "flex-start",
                        width: "100%",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4,
                        delay: 0.1,
                      }}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="help-text"
              className="rounded-lg bg-muted p-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
            >
              <p className="text-xs font-medium">Need help?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Check our documentation
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="help-icon"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
            >
              <Button variant="ghost" size="icon" className="w-full">
                <Settings className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
