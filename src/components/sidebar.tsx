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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Settings,
  PanelLeft,
  PanelLeftClose,
  LogOut,
  Home,
} from "lucide-react";
import { useState, useEffect } from "react";
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
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, fullName, email, avatar } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <>
      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
        />
      )}
      
      {/* Mobile toggle button */}
      {isMobile && !mobileOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 md:hidden h-10 w-10 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md hover:text-[#F75C69] transition-colors border border-zinc-200/50 dark:border-zinc-800/50"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      )}

      <motion.div
        className={cn(
          "flex h-full flex-col border-r border-zinc-200/50 dark:border-zinc-800/50",
          isMobile 
            ? "fixed top-0 left-0 z-50 backdrop-blur-md bg-zinc-50/95 dark:bg-black/95 shadow-lg" 
            : "relative bg-zinc-50 dark:bg-black"
        )}
        style={{ height: isMobile ? '100vh' : '100%' }}
        animate={{
          width: isMobile ? (mobileOpen ? 256 : 0) : (collapsed ? 64 : 256),
          x: isMobile && !mobileOpen ? -256 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.4,
        }}
      >
      {/* Header */}
      <motion.div
        className="flex h-16 items-center px-4 border-b border-zinc-200/50 dark:border-zinc-800/50"
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
              className="text-lg font-bold tracking-tight text-black dark:text-white flex items-center gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              Watchout
              <span className="text-sm" style={{ color: '#F75C69' }}>®</span>
            </motion.h2>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => isMobile ? setMobileOpen(false) : setCollapsed(!collapsed)}
          className="h-9 w-9 hover:text-[#F75C69] transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {(isMobile || collapsed) ? (
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
              <Link key={item.href} href={item.href} onClick={() => isMobile && setMobileOpen(false)}>
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
                    variant="ghost"
                    className={cn(
                      "w-full relative overflow-hidden justify-start text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors",
                      isActive && "bg-transparent text-[#F75C69] hover:text-[#F75C69] font-semibold"
                    )}
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

      <Separator className="bg-zinc-200/50 dark:bg-zinc-800/50" />

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
                    className="w-full justify-start gap-3 h-auto p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Avatar className="h-9 w-9 border-2 border-zinc-200 dark:border-zinc-800">
                      <AvatarImage src={avatar || undefined} alt={fullName || "User"} />
                      <AvatarFallback className="bg-[#F75C69] text-white font-semibold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none truncate w-full text-black dark:text-white">
                        {fullName || "User"}
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate w-full mt-1">
                        {email || ""}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-[#F75C69] focus:text-[#F75C69] focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer justify-center"
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
                  <Button variant="ghost" size="icon" className="w-full h-12 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                    <Avatar className="h-8 w-8 border-2 border-zinc-200 dark:border-zinc-800">
                      <AvatarImage src={avatar || undefined} alt={fullName || "User"} />
                      <AvatarFallback className="bg-[#F75C69] text-white font-semibold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-[#F75C69] focus:text-[#F75C69] focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer justify-center"
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
    </>
  );
}
