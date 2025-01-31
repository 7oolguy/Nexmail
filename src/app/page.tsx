"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { folders, emails, type Folder, type Email } from "../lib/mock-data";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  PenSquare,
  Search,
  Menu,
  Sun,
  Moon,
  ChevronRight,
  Plus,
  FolderIcon,
  Settings,
  HelpCircle,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function GmailClone() {
  const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filteredEmails = emails.filter((email) =>
    email.folder.startsWith(selectedFolder),
  );

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedEmail(null);
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const renderFolders = (folderList: Folder[], depth = 0) => {
    return folderList.map((folder) => (
      <div key={folder.id}>
        <Button
          variant={selectedFolder === folder.id ? "secondary" : "ghost"}
          className={`mb-1 w-full justify-start ${depth > 0 ? "ml-4" : ""}`}
          onClick={() => handleFolderClick(folder.id)}
        >
          <folder.icon className="mr-2 h-4 w-4" />
          {folder.name}
          {folder.count !== undefined && (
            <span className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-1 text-xs">
              {folder.count}
            </span>
          )}
        </Button>
        {folder.subfolders && renderFolders(folder.subfolders, depth + 1)}
      </div>
    ));
  };

  const getBreadcrumbs = () => {
    const parts = selectedFolder.split("/");
    return parts.map((part, index) => {
      const folder = folders.find((f) => f.id === part) ?? {
        name: part,
        icon: FolderIcon,
      };
      return (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
          <Button
            variant="ghost"
            className="p-1"
            onClick={() =>
              handleFolderClick(parts.slice(0, index + 1).join("/"))
            }
          >
            <folder.icon className="mr-2 h-4 w-4" />
            {folder.name}
          </Button>
        </div>
      );
    });
  };

  if (!mounted) return null;

  return (
    <div className="bg-background text-foreground flex h-screen flex-col">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground flex h-12 items-center justify-between px-4">
        <div className="text-lg font-bold">Nexmail</div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="bg-secondary flex w-64 flex-col p-4">
            <Button className="mb-4 w-full" size="lg">
              <PenSquare className="mr-2 h-4 w-4" />
              Compose
            </Button>
            <ScrollArea className="flex-grow">
              {renderFolders(folders)}
              <Button variant="ghost" className="mb-1 w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create new folder
              </Button>
            </ScrollArea>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="bg-secondary flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="ml-4 flex items-center">{getBreadcrumbs()}</div>
            </div>
            <div className="flex items-center">
              <div className="relative mr-4">
                <Search className="text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2 transform" />
                <Input
                  type="search"
                  placeholder="Search mail"
                  className="w-64 pl-8"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Email list and content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Email list */}
            <div className="border-border w-80 overflow-auto border-r">
              <ScrollArea className="h-full">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className={`border-border cursor-pointer border-b p-4 ${
                      email.read ? "" : "bg-secondary font-semibold"
                    } ${selectedEmail?.id === email.id ? "bg-accent" : ""}`}
                    onClick={() => handleEmailClick(email)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{email.from}</span>
                      <span className="text-muted-foreground text-sm">
                        {format(new Date(email.date), "MMM d")}
                      </span>
                    </div>
                    <div className="truncate">{email.subject}</div>
                    <div className="text-muted-foreground truncate text-sm">
                      {email.body}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            {/* Email content */}
            <div className="flex-1 overflow-auto p-6">
              {selectedEmail ? (
                <div>
                  <h2 className="mb-4 text-2xl font-bold">
                    {selectedEmail.subject}
                  </h2>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <span className="font-semibold">
                        {selectedEmail.from}
                      </span>
                      <span className="text-muted-foreground"> to </span>
                      <span className="font-semibold">{selectedEmail.to}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {format(
                        new Date(selectedEmail.date),
                        "MMM d, yyyy h:mm a",
                      )}
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <div className="whitespace-pre-wrap">
                    {selectedEmail.body}
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground flex h-full items-center justify-center">
                  Select an email to read
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
