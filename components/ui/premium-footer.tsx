"use client";

import Link from "next/link";
import { PremiumButton } from "@/components/ui/premium-button";

const FOOTER_LINKS = {
  Product: [
    { href: "/templates", label: "Templates" },
    { href: "/preview/emerald-noir", label: "Live Demo" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#how-it-works", label: "How It Works" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/affiliate", label: "Affiliate" },
  ],
  Legal: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/refund-policy", label: "Refunds" },
    { href: "/shipping", label: "Delivery" },
  ],
};

export function PremiumFooter() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="page-container py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <Link href="/" className="text-2xl font-serif text-primary lowercase">
              unfold
            </Link>
            <p className="text-sm text-stone-500 mt-3 max-w-sm leading-relaxed">
              Premium animated digital wedding invitations for couples across India.
            </p>
            <div className="mt-5">
              <Link href="/templates">
                <PremiumButton>Start My Invitation</PremiumButton>
              </Link>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="lg:col-span-2">
              <h4 className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-3">{group}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-stone-600 hover:text-accent-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <span>© 2026 Unfold. All rights reserved.</span>
          <span>Made with care for couples across India</span>
        </div>
      </div>
    </footer>
  );
}
