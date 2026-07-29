"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({ id, eyebrow, title, children, className = "" }: { id: string; eyebrow: string; title: ReactNode; children: ReactNode; className?: string }) {
  return <section id={id} className={`section-shell ${className}`} aria-labelledby={`${id}-title`}>
    <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2></div>{children}
  </section>;
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <motion.article whileHover={{ y: -6, scale: 1.012 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className={`glass-card ${className}`}>{children}</motion.article>;
}
export function Badge({ children }: { children: ReactNode }) { return <span className="badge">{children}</span>; }
export function Button({ href, children, variant = "primary", external = false }: { href: string; children: ReactNode; variant?: "primary" | "secondary"; external?: boolean }) {
  return <a className={`button button-${variant}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
}
