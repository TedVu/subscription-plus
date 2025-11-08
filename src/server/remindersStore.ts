import { Reminder } from "./types";

const reminders: Reminder[] = [];

// Create
export function addReminder(reminder: Reminder): Reminder {
  reminders.push(reminder);
  return reminder;
}

// Get due reminders
export function getDueReminders(now: Date): Reminder[] {
  return reminders.filter((r) => !r.sent && r.sendAt <= now);
}

// Mark as sent
export function markAsSent(ids: string[]): void {
  ids.forEach((id) => {
    const r = reminders.find((r) => r.id === id);
    if (r) {
      r.sent = true;
    }
  });
}

// (optional) list all reminders
export function listReminders(): Reminder[] {
  return reminders;
}
