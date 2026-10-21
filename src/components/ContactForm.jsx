"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Send, ArrowUpRight } from "lucide-react";
import {
  VISIBLE_SERVICES,
  SERVICE_OPTIONS,
  defaultServiceOption,
  WHATSAPP,
  formatINR,
  submitToHubSpot,
} from "../lib/config";

export const contactInputCls =
  "w-full rounded-xl border border-white/10 bg-ink-850/80 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30";

/**
 * Deliberately four inputs only: name, email, phone, message.
 *
 * The visitor-facing extras (service, project details, resource URL) are
 * composed into the single HubSpot `message` property on submit, so the form
 * stays short enough to convert well and the HubSpot form needs nothing beyond
 * the four standard contact properties. See buildMessage() below.
 */
function buildMessage({ service, project_details, resourceurl }) {
  const parts = [];

  if (service) parts.push(`Service: ${service}`);
  if (project_details) parts.push(project_details);
  if (resourceurl) parts.push(`Resource URL: ${resourceurl}`);

  return parts.join("\n\n");
}

/** Splits a full name into the firstname/lastname pair HubSpot stores. */
function splitName(fullName) {
  const trimmed = fullName.trim().replace(/\s+/g, " ");
  if (!trimmed) return { firstname: "", lastname: "" };

  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace === -1) return { firstname: trimmed, lastname: "" };

  return {
    firstname: trimmed.slice(0, lastSpace),
    lastname: trimmed.slice(lastSpace + 1),
  };
}

export function ContactForm({
  defaultService = "",
  defaultAddOns = [],
  compact = false,
}) {
  const addOnsMessage = defaultAddOns.length
    ? `Selected add-ons:\n${defaultAddOns
        .map((addOn) => {
          const price =
            addOn.price > 0 ? formatINR(addOn.price) : (addOn.freeLabel ?? "At cost");
          return `- ${addOn.label} (${price})`;
        })
        .join("\n")}`
    : "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultServiceOption(defaultService),
    project_details: addOnsMessage,
    resourceurl: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setForm((currentForm) => ({
      ...currentForm,
      service: defaultServiceOption(defaultService),
    }));
  }, [defaultService]);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const { firstname, lastname } = splitName(form.name);

    const result = await submitToHubSpot({
      firstname,
      lastname,
      email: form.email,
      phone: form.phone,
      message: buildMessage(form),
    });

    setStatus(result.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-white">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
          Thanks {splitName(form.name).firstname || "there"}. I&apos;ll reply
          within 24 hours. For urgent matters, ping me on WhatsApp.
        </p>
        <a
          href={WHATSAPP.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25d366]/15 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-[#25d366]/25"
        >
          Chat on WhatsApp <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-4" : "space-y-5"}
    >
      <div>
        <label
          htmlFor="lead-name"
          className="mb-1.5 block text-xs font-semibold text-zinc-300"
        >
          Name *
        </label>
        <input
          id="lead-name"
          required
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          placeholder="Jane Doe"
          className={contactInputCls}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lead-email"
            className="mb-1.5 block text-xs font-semibold text-zinc-300"
          >
            Email *
          </label>
          <input
            id="lead-email"
            required
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            placeholder="jane@company.com"
            className={contactInputCls}
          />
        </div>
        <div>
          <label
            htmlFor="lead-phone"
            className="mb-1.5 block text-xs font-semibold text-zinc-300"
          >
            Phone / WhatsApp *
          </label>
          <input
            id="lead-phone"
            required
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91 98765 43210"
            className={contactInputCls}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="lead-service"
          className="mb-1.5 block text-xs font-semibold text-zinc-300"
        >
          Service you want *
        </label>
        <select
          id="lead-service"
          required
          value={form.service}
          onChange={update("service")}
          className={`${contactInputCls} appearance-none ${form.service ? "text-white" : "text-zinc-500"}`}
        >
          <option value="" disabled className="bg-ink-900">
            Select a service
          </option>
          {VISIBLE_SERVICES.map((s) => {
            const options = SERVICE_OPTIONS.filter((o) => o.slug === s.slug);
            if (options.length === 0) return null;

            return (
              <optgroup key={s.slug} label={s.name} className="bg-ink-900">
                {options.map((o) => (
                  <option key={o.key} value={o.value} className="bg-ink-900">
                    {o.label}
                  </option>
                ))}
              </optgroup>
            );
          })}
          <option value="Other / Not sure yet" className="bg-ink-900">
            Other / Not sure yet
          </option>
        </select>
      </div>

      <div>
        <label
          htmlFor="lead-project-details"
          className="mb-1.5 block text-xs font-semibold text-zinc-300"
        >
          Tell me about your project *
        </label>
        <textarea
          id="lead-project-details"
          required
          rows={compact ? 3 : 5}
          value={form.project_details}
          onChange={update("project_details")}
          placeholder="Your goals, timeline, budget range, existing brand…"
          className={`${contactInputCls} resize-none`}
        />
      </div>

      <div>
        <label
          htmlFor="lead-resourceurl"
          className="mb-1.5 block text-xs font-semibold text-zinc-300"
        >
          Resource URL{" "}
          <span className="font-normal text-zinc-500">
            (Google Drive, optional)
          </span>
        </label>
        <input
          id="lead-resourceurl"
          type="url"
          value={form.resourceurl}
          onChange={update("resourceurl")}
          placeholder="https://drive.google.com/…"
          className={contactInputCls}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
          Something went wrong sending your message. Please try again or reach
          out on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-3.5 text-sm font-semibold text-on-brand shadow-glow transition-all duration-300 hover:shadow-glow-cyan hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
