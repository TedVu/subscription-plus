import cron from "node-cron";
import { getDueReminders, markAsSent } from "./remindersStore";
import { sendEmail } from "./email";

export function startScheduler(): void {
  // Runs every minute: "* * * * *"
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    const dueReminders = getDueReminders(now);
    if (dueReminders.length === 0) return;

    console.log(`Found ${dueReminders.length} due reminders`);

    const sentIds: string[] = [];

    for (const reminder of dueReminders) {
      try {
        await sendEmail({
          to: reminder.email,
          subject: reminder.subject,
          text: reminder.message,
        });

        console.log("Sent reminder", reminder.id);
        sentIds.push(reminder.id);
      } catch (err) {
        console.error("Error sending reminder", reminder.id, err);
        // you could add retry logic / failure flags here
      }
    }

    markAsSent(sentIds);
  });
}
