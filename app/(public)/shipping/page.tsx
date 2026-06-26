import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PageHero } from "@/components/ui/page-hero";

export default function ShippingPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto">
      <PageHero eyebrow="Delivery Terms" title="Shipping & Delivery" />

      <div className="space-y-8 font-sans text-xs text-stone-605 leading-relaxed">
        <DoubleBezelCard className="bg-white">
          <h2 className="text-lg font-serif text-primary mb-4">1. Instant Digital Delivery</h2>
          <p className="mb-4">
            Unfold operates as a digital-only software platform. We **do not print, pack, or ship physical paper cards** by default. 
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>**Access Timeline**: Immediately upon completing your payment checkout via Razorpay, your couple account is activated and access is granted to the customization dashboard.</li>
            <li>**Confirmation**: A transactional welcome email containing account credentials, login coordinates, and template configuration guides is sent to your registered email address within 2 minutes.</li>
          </ul>
        </DoubleBezelCard>

        <DoubleBezelCard className="bg-white">
          <h2 className="text-lg font-serif text-primary mb-4">2. Digital QR Code Standees (Add-on)</h2>
          <p>
            If you purchase the optional printable QR Standee PDF pack (₹299), a print-ready vector PDF file with high-definition styling matching your template is generated and made available for instant download in your couple dashboard. You are responsible for local printing of the files at your chosen physical location.
          </p>
        </DoubleBezelCard>
      </div>
    </div>
  );
}
