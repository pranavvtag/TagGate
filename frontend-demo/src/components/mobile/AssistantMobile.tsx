"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { Button, TextInput } from "@/components/shared/ui";
import { MobileScreen } from "./NavigationMobile";
import styles from "./Mobile.module.css";

const examples = ["Water leakage in kitchen", "Book electrician tomorrow", "Show electricity usage", "How much maintenance is pending?"];

function respond(message: string) {
  const text = message.toLowerCase();
  if (text.includes("leak") || text.includes("water")) return "Created complaint TG-C-204 as Plumbing.";
  if (text.includes("electrician") || text.includes("book")) return "Service request TG-S-118 scheduled.";
  if (text.includes("usage") || text.includes("electricity")) return "Electricity usage this week is 112 kWh.";
  if (text.includes("maintenance") || text.includes("pending")) return "Maintenance due is Rs 12,500.";
  return "Mock assistant action captured.";
}

export function AssistantMobile() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ by: "assistant", text: "Ask about complaints, services, utilities, dues, or policies." }]);

  function send(value = input) {
    if (!value.trim()) return;
    setMessages((items) => [...items, { by: "user", text: value }, { by: "assistant", text: respond(value) }]);
    setInput("");
  }

  return (
    <MobileScreen title="Assistant">
      <section className={`${styles.softCard} h-[430px] overflow-auto bg-[#f8fafc]`}>
        <div className={styles.list}>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.by === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[82%] rounded-lg p-3 text-sm ${message.by === "user" ? "bg-[#0f7780] text-white" : "bg-white text-[#202737]"}`}>
                {message.by === "assistant" ? <Bot className="mb-2 h-4 w-4 text-[#0f7780]" /> : null}
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <TextInput value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type request" />
        <Button onClick={() => send()}><Send className="h-4 w-4" /></Button>
      </div>
      <section className="mt-5">
        <h2 className={styles.sectionTitle}>Examples</h2>
        <div className={styles.list}>
          {examples.map((example) => (
            <button key={example} className={`${styles.softCard} text-left text-sm font-bold`} onClick={() => send(example)}>
              {example}
            </button>
          ))}
        </div>
      </section>
    </MobileScreen>
  );
}
