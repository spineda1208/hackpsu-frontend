"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Video,
  Settings,
  Users,
  BarChart3,
  PanelLeft,
  PanelLeftClose,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/contexts/auth-context";
import { authClient } from "@/lib/auth-client";

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
  const { user, fullName, email, avatar } = useAuth();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const getInitials = () => {
    if (!fullName) return "U";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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

      {/* User Card Footer */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="user-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-auto p-3 hover:bg-muted"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={avatar || undefined} alt={fullName || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none truncate w-full">
                        {fullName || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate w-full mt-1">
                        {email || ""}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ) : (
            <motion.div
              key="user-avatar"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-full h-12">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatar || undefined} alt={fullName || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{fullName || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {email || ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
