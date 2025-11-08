import "dotenv/config"; // loads .env
import express, { Request, Response } from "express";
import cors from "cors";

import { addReminder, listReminders } from "./remindersStore";
import { startScheduler } from "./scheduler";
import { Reminder } from "./types";

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin (Vue dev server / Netlify)
app.use(express.json()); // Parse JSON body

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// List reminders (optional, useful for debugging)
app.get("/api/reminders", (_req: Request, res: Response) => {
  res.json({ reminders: listReminders() });
});

// Create a reminder
app.post("/api/reminders", (req: Request, res: Response) => {
  const { email, subject, message, sendAt } = req.body as {
    email?: string;
    subject?: string;
    message?: string;
    sendAt?: string;
  };

  if (!email || !subject || !message || !sendAt) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sendAtDate = new Date(sendAt);
  if (isNaN(sendAtDate.getTime())) {
    return res.status(400).json({ error: "Invalid sendAt date" });
  }

  const reminder: Reminder = {
    id: Date.now().toString(),
    email,
    subject,
    message,
    sendAt: sendAtDate,
    sent: false,
    createdAt: new Date(),
  };

  addReminder(reminder);

  return res.status(201).json({ reminder });
});

// Start server + scheduler
const port = Number(process.env.PORT) || 4000;

app.listen(port, () => {
  // server is now ready
  console.log(`Server running on port ${port}`);
  // start cron jobs
  startScheduler();
});
