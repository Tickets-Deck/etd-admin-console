"use client";

import type React from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Building2,
  Users,
  User,
  CreditCard,
  FileText,
  Package,
  List,
  Shield,
  History,
  Settings,
  LogOut,
  Home,
  CalendarCheck,
  Settings2,
  TrendingUp,
  Ticket,
  Users2,
  Gift,
  Info,
  MessageCircle,
  Newspaper,
  Star,
  StarsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import images from "@/public/images";
import Link from "next/link";
import { ApplicationRoutes } from "@/constants/applicationRoutes";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  link: string;
  active?: boolean;
}

function SidebarItem({ icon, label, active, link }: SidebarItemProps) {
  return (
    <Link
      href={link}
      className={cn(
        "w-full justify-start gap-2 pl-4 pr-4 py-2 rounded-md text-sm text-muted-foreground hover:bg-slate-200/50 transition-colors flex items-center",
        active ? "bg-slate-200 text-foreground font-medium" : "font-normal"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-56 bg-background border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 flex flex-col justify-items-start">
            <Image
              src={images.logo}
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 py-4 overflow-auto hideScrollbar">
        <div className="px-3 mb-5">
          <SidebarItem
            link={ApplicationRoutes.Home}
            icon={<Home size={18} />}
            label="Dashboard"
            active={pathname === ApplicationRoutes.Home}
          />
        </div>

        <div className="px-3 mb-2">
          <p className="text-[10px] font-medium text-muted-foreground mb-2 px-4">
            MAIN MENU
          </p>
          <div className="space-y-1">
            <SidebarItem
              link={ApplicationRoutes.Events}
              icon={<CalendarCheck size={18} />}
              label="Events"
              active={pathname === ApplicationRoutes.Events}
            />
            <SidebarItem
              link={ApplicationRoutes.Tickets}
              icon={<Ticket size={18} />}
              label="Tickets"
              active={pathname === ApplicationRoutes.Tickets}
            />
            <SidebarItem
              link={ApplicationRoutes.Users}
              icon={<Users2 size={18} />}
              label="Users"
              active={pathname === ApplicationRoutes.Users}
            />
            <SidebarItem
              link={ApplicationRoutes.TicketOrders}
              icon={<Ticket size={18} />}
              label="Ticket Orders"
              active={pathname === ApplicationRoutes.TicketOrders}
            />
            <SidebarItem
              link={ApplicationRoutes.Payments}
              icon={<Ticket size={18} />}
              label="Payments"
              active={pathname === ApplicationRoutes.Payments}
            />
            <SidebarItem
              link={ApplicationRoutes.Analytics}
              icon={<TrendingUp size={18} />}
              label="Analytics"
              active={pathname === ApplicationRoutes.Analytics}
            />
            <SidebarItem
              link={ApplicationRoutes.Payouts}
              icon={<FileText size={18} />}
              label="Payouts"
              active={pathname === ApplicationRoutes.Payouts}
            />
            <SidebarItem
              link={ApplicationRoutes.Coupons}
              icon={<Gift size={18} />}
              label="Coupons"
              active={pathname === ApplicationRoutes.Coupons}
            />
            <SidebarItem
              link={ApplicationRoutes.OrganizerReviews}
              icon={<StarsIcon size={18} />}
              label="Organizer Reviews"
              active={pathname === ApplicationRoutes.OrganizerReviews}
            />
            <SidebarItem
              link={ApplicationRoutes.Enquiries}
              icon={<MessageCircle size={18} />}
              label="Enquiries"
              active={pathname === ApplicationRoutes.Enquiries}
            />
            <SidebarItem
              link={ApplicationRoutes.Newsletter}
              icon={<Newspaper size={18} />}
              label="Newsletter"
              active={pathname === ApplicationRoutes.Newsletter}
            />
            <SidebarItem
              link={ApplicationRoutes.Settings}
              icon={<Settings2 size={18} />}
              label="Settings"
              active={pathname === ApplicationRoutes.Settings}
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500 cursor-pointer hover:bg-red-100 hover:text-red-600"
          onClick={() => {
            signOut();
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
