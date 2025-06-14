import { Bell, Home, Search, User } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="bg-background p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* <Home size={18} />
        <div className="text-sm text-foreground">Dashboard</div> */}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="w-[250px] pl-8 rounded-full bg-slate-50"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <span className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium">
            <User />
          </span>
        </Button>
      </div>
    </nav>
  );
}
