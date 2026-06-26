import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PageHero } from "@/components/ui/page-hero";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto">
      <PageHero eyebrow="Data Protection" title="Privacy Policy" />

      <div className="space-y-8 font-sans text-xs text-stone-605 leading-relaxed">
        <DoubleBezelCard className="bg-white">
          <h2 className="text-lg font-serif text-primary mb-4">1. Data Collection</h2>
          <p className="mb-4">
            At Unfold, we value your privacy. We collect only the information necessary to provide and manage your digital invitations:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>**Couple Information**: Email address, phone number, dashboard passwords, names, and event itinerary locations.</li>
            <li>**Guest RSVP Responses**: Guest names, attendance status (Yes/No), guest count details, and messages submitted via invitation forms.</li>
            <li>**Media Files**: Photographs uploaded by couples for display inside the dynamic template sliders.</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal data or guest RSVP details with third-party advertising companies.
          </p>
        </DoubleBezelCard>

        <DoubleBezelCard className="bg-white">
          <h2 className="text-lg font-serif text-primary mb-4">2. Integrations & Payment Gateway</h2>
          <p className="mb-4">
            We partner with reliable third-party providers to power premium services:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>**Razorpay**: Financial transactions are handled strictly via Razorpay. We do not store or process card numbers, UPI PINs, or bank passwords on our servers.</li>
            <li>**Cloudinary/GCS**: Media files and custom couple pictures are stored securely in cloud buckets.</li>
            <li>**Google Maps**: Integrated API maps display wedding locations.</li>
          </ul>
        </DoubleBezelCard>

        <DoubleBezelCard className="bg-white">
          <h2 className="text-lg font-serif text-primary mb-4">3. Data Retention</h2>
          <p className="mb-4">
            Active invitations are kept visible online until the wedding date. Thirty days following the wedding, guest RSVPs, lists, and uploaded photographs are eligible for automatic database archiving or deletion depending on the dashboard settings.
          </p>
          <p>
            You can request immediate deletion of your account and associated media assets at any time by emailing us at hello@unfoldwed.com.
          </p>
        </DoubleBezelCard>
      </div>
    </div>
  );
}
