"use client";

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Home,
  PanelLeft,
  Settings,
  LucideIcon,
  HeartPulse,
  Album,
  BookImage,
  FileQuestion,
  BellRing,
  CalendarCheck,
  UserRound,
  FileVideo,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const NavItem = ({ href, icon: Icon, label }: NavItem) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const baseClasses = "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8";
  const activeClasses = "text-accent-foreground hover:text-foreground";
  const inactiveClasses = "text-muted-foreground hover:text-foreground";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            <Icon className="h-5 w-5" />
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const MobileNavItem = ({ href, icon: Icon, label }: NavItem) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const baseClasses = "flex items-center gap-4 px-2.5 text-lg font-medium";
  const activeClasses = "text-accent-foreground hover:text-foreground";
  const inactiveClasses = "text-muted-foreground hover:text-foreground";

  return (
    <Link href={href} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
};

export default function AdminSidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">MH</div>
          <NavItem href="/admin/dashboard" icon={Home} label="Dashboard" />
          <NavItem href="/admin/dashboard/blood_pressures" icon={HeartPulse} label="Blood Pressures" />
          <NavItem href="/admin/dashboard/bookmarks" icon={Album} label="Bookmarks" />
          <NavItem href="/admin/dashboard/brochures" icon={BookImage} label="Brochures" />
          <NavItem href="/admin/dashboard/questionnaires" icon={FileQuestion} label="Questionnaires" />
          <NavItem href="/admin/dashboard/reminders" icon={BellRing} label="Reminders" />
          <NavItem href="/admin/dashboard/schedules" icon={CalendarCheck} label="Schedules" />
          <NavItem href="/admin/dashboard/users" icon={UserRound} label="Users" />
          <NavItem href="/admin/dashboard/videos" icon={FileVideo} label="Videos" />
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <NavItem href="/admin/dashboard/settings" icon={Settings} label="Settings" />
        </nav>
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">RH</div>
              <MobileNavItem href="/admin/dashboard" icon={Home} label="Dashboard" />
              <MobileNavItem href="/admin/dashboard/blood_pressures" icon={HeartPulse} label="Blood Pressures" />
              <MobileNavItem href="/admin/dashboard/bookmarks" icon={Album} label="Bookmarks" />
              <MobileNavItem href="/admin/dashboard/brochures" icon={BookImage} label="Brochures" />
              <MobileNavItem href="/admin/dashboard/questionnaires" icon={FileQuestion} label="Questionnaires" />
              <MobileNavItem href="/admin/dashboard/reminders" icon={BellRing} label="Reminders" />
              <MobileNavItem href="/admin/dashboard/schedules" icon={CalendarCheck} label="Schedules" />
              <MobileNavItem href="/admin/dashboard/users" icon={UserRound} label="Users" />
              <MobileNavItem href="/admin/dashboard/videos" icon={FileVideo} label="Videos" />
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}