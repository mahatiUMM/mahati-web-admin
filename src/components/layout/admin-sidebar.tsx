"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  PanelLeft,
  Settings,
  LucideIcon,
  HeartPulse,
  Album,
  BookImage,
  FileQuestion,
  CircleHelp,
  MessageCircleQuestion,
  FileStack,
  BellRing,
  CalendarCheck,
  UserRound,
  FileVideo,
} from "lucide-react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";

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
  const router = useRouter();
  const { setTheme } = useTheme();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("mahatiToken");
    router.push("/");
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleConfirmLogout = () => {
    handleLogout();
    handleCloseDialog();
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src="/mahati-logo.png"
                alt="Mahati Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/admin/profile")}>My Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenDialog}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavItem href="/admin/dashboard" icon={Home} label="Dashboard" />
          <NavItem href="/admin/dashboard/blood_pressures" icon={HeartPulse} label="Blood Pressures" />
          <NavItem href="/admin/dashboard/bookmarks" icon={Album} label="Bookmarks" />
          <NavItem href="/admin/dashboard/brochures" icon={BookImage} label="Brochures" />
          <NavItem href="/admin/dashboard/questionnaires" icon={FileQuestion} label="Questionnaires" />
          <NavItem href="/admin/dashboard/questionnaire_questions" icon={CircleHelp} label="Questionnaire Questions" />
          <NavItem href="/admin/dashboard/questionnaire_answers" icon={MessageCircleQuestion} label="Questionnaire Answer" />
          <NavItem href="/admin/dashboard/questionnaire_histories" icon={FileStack} label="Questionnaire Histories" />
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
              <div className="flex justify-start gap-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Image
                      src="/mahati-logo.png"
                      alt="Mahati Logo"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/admin/profile")}>My Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOpenDialog}>Log Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Separator className="w-5" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="mr-5">
                      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <MobileNavItem href="/admin/dashboard" icon={Home} label="Dashboard" />
              <MobileNavItem href="/admin/dashboard/blood_pressures" icon={HeartPulse} label="Blood Pressures" />
              <MobileNavItem href="/admin/dashboard/bookmarks" icon={Album} label="Bookmarks" />
              <MobileNavItem href="/admin/dashboard/brochures" icon={BookImage} label="Brochures" />
              <MobileNavItem href="/admin/dashboard/questionnaires" icon={FileQuestion} label="Questionnaires" />
              <MobileNavItem href="/admin/dashboard/questionnaire_questions" icon={CircleHelp} label="Questionnaire Questions" />
              <MobileNavItem href="/admin/dashboard/questionnaire_answers" icon={MessageCircleQuestion} label="Questionnaire Answers" />
              <MobileNavItem href="/admin/dashboard/questionnaire_histories" icon={FileStack} label="Questionnaire Histories" />
              <MobileNavItem href="/admin/dashboard/reminders" icon={BellRing} label="Reminders" />
              <MobileNavItem href="/admin/dashboard/schedules" icon={CalendarCheck} label="Schedules" />
              <MobileNavItem href="/admin/dashboard/users" icon={UserRound} label="Users" />
              <MobileNavItem href="/admin/dashboard/videos" icon={FileVideo} label="Videos" />
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you want to Log Out?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out from your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLogout}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
