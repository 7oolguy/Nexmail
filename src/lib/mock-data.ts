import { Inbox, Send, File, AlertCircle, Trash2, FolderIcon } from "lucide-react"
import type React from "react"

export interface Folder {
  id: string
  name: string
  icon: React.ElementType
  count?: number
  subfolders?: Folder[]
}

export interface Email {
  id: string
  from: string
  to: string
  subject: string
  body: string
  date: string
  read: boolean
  folder: string
}

export const folders: Folder[] = [
  {
    id: "inbox",
    name: "Inbox",
    icon: Inbox,
    count: 4,
    subfolders: [
      { id: "inbox/important", name: "Important", icon: FolderIcon, count: 2 },
      { id: "inbox/starred", name: "Starred", icon: FolderIcon, count: 1 },
    ],
  },
  { id: "sent", name: "Sent", icon: Send },
  { id: "drafts", name: "Drafts", icon: File, count: 2 },
  { id: "spam", name: "Spam", icon: AlertCircle },
  { id: "trash", name: "Trash", icon: Trash2 },
]

export const emails: Email[] = [
  {
    id: "1",
    from: "john@example.com",
    to: "me@example.com",
    subject: "Meeting tomorrow",
    body: "Hi,\n\nJust a reminder about our meeting tomorrow at 10 AM. Please bring your project updates.\n\nBest regards,\nJohn",
    date: "2023-05-20T15:45:00",
    read: false,
    folder: "inbox",
  },
  {
    id: "2",
    from: "jane@example.com",
    to: "me@example.com",
    subject: "Project update",
    body: "Hello,\n\nI've finished the first draft of the project proposal. Could you please review it and provide your feedback?\n\nThanks,\nJane",
    date: "2023-05-19T09:30:00",
    read: true,
    folder: "inbox/important",
  },
  {
    id: "3",
    from: "newsletter@example.com",
    to: "me@example.com",
    subject: "Your weekly digest",
    body: "Dear subscriber,\n\nHere are the top stories in your industry this week:\n\n1. AI advancements in healthcare\n2. New renewable energy breakthroughs\n3. Global economic trends\n\nHappy reading!",
    date: "2023-05-18T08:00:00",
    read: true,
    folder: "inbox/starred",
  },
  {
    id: "4",
    from: "me@example.com",
    to: "client@example.com",
    subject: "Proposal for upcoming project",
    body: "Dear Client,\n\nPlease find attached our proposal for the upcoming project. Let me know if you have any questions or need any clarifications.\n\nBest regards,\nMe",
    date: "2023-05-17T14:20:00",
    read: true,
    folder: "sent",
  },
]

