"use client";

import { useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { DesktopShell } from "@/components/desktop/NavigationDesktop";
import { Badge, Button, Card, TextInput } from "@/components/shared/ui";
import styles from "./Desktop.module.css";

const examples = [
  "Water leakage in kitchen",
  "Book electrician tomorrow",
  "Show electricity usage",
  "How much maintenance is pending?"
];

function respond(message: string) {
  const text = message.toLowerCase();
  if (text.includes("leak") || text.includes("water")) return "Created complaint ticket TG-C-204 and categorized it as Plumbing.";
  if (text.includes("electrician") || text.includes("book")) return "Created service request TG-S-118 for an electrician tomorrow.";
  if (text.includes("usage") || text.includes("electricity")) return "This week electricity usage is 112 kWh. Water usage alert remains high.";
  if (text.includes("maintenance") || text.includes("pending")) return "Maintenance pending for Villa A-104 is Rs 12,500. Reminder is marked as sent.";
  return "I captured that request as a mock community assistant action.";
}

export function AssistantDesktop() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { by: "assistant", text: "Ask about complaints, services, groceries, utilities, maintenance dues, or community information." }
  ]);

  function send(value = input) {
    if (!value.trim()) return;
    setMessages((items) => [...items, { by: "user", text: value }, { by: "assistant", text: respond(value) }]);
    setInput("");
  }

  return (
    <DesktopShell title="Community Assistant" subtitle="Mock conversational workflows from the SRS.">
      <div className={styles.twoColumn}>
        <Card className="p-5">
          <div className="flex h-[560px] flex-col">
            <div className="flex-1 overflow-auto rounded-lg bg-[#f8fafc] p-4">
              <div className="grid gap-3">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-3 ${message.by === "user" ? "justify-end" : ""}`}>
                    {message.by === "assistant" ? <Bot className="mt-2 h-5 w-5 text-[#0f7780]" /> : null}
                    <div className={`max-w-[75%] rounded-lg p-3 text-sm ${message.by === "user" ? "bg-[#0f7780] text-white" : "bg-white text-[#202737]"}`}>{message.text}</div>
                    {message.by === "user" ? <User className="mt-2 h-5 w-5 text-[#0f7780]" /> : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <TextInput value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a resident request" onKeyDown={(event) => { if (event.key === "Enter") send(); }} />
              <Button onClick={() => send()}><Send className="h-4 w-4" />Send</Button>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className={styles.cardTitle}>Supported Mock Actions</h2>
          <div className="mt-4 grid gap-3">
            {examples.map((example) => (
              <button key={example} className="rounded-lg border border-[#e5e7eb] p-4 text-left font-bold hover:border-[#0f7780]" onClick={() => send(example)}>
                {example}
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-2">
            <Badge tone="info">Complaint auto-categorization</Badge>
            <Badge tone="info">Automatic ticket creation</Badge>
            <Badge tone="info">Utility and dues lookup</Badge>
          </div>
        </Card>
      </div>
    </DesktopShell>
  );
}
