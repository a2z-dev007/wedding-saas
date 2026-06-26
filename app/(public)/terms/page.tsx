import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PageHero } from "@/components/ui/page-hero";

export default function TermsPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto">
      <PageHero eyebrow="Legal Agreement" title="Terms & Conditions" />

      <div className="space-y-6 font-sans text-sm text-stone-500 dark:text-stone-400 leading-relaxed mt-12">
        
        {/* Intro */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <p className="font-semibold text-stone-850 dark:text-stone-250 mb-2">
            Last updated: March 4, 2026
          </p>
          <p>
            By using our platform Unfold, you agree to the terms below.
          </p>
        </DoubleBezelCard>

        {/* 1. Introduction */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">1. Introduction</h2>
          <p>
            Welcome to Unfold. We provide personalized digital wedding invitation webpages featuring interactive elements such as scratch-to-reveal dates, live countdowns, guest messaging, background music, and multilingual support. Each invitation is delivered as a unique, shareable link accessible from any device.
          </p>
        </DoubleBezelCard>

        {/* 2. Eligibility */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age to use Unfold. By creating an account, you confirm that you meet this requirement.
          </p>
        </DoubleBezelCard>

        {/* 3. Demo Invitations */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">3. Demo Invitations</h2>
          <p className="mb-4">
            Demo invitation templates and pages displayed on the platform are provided solely for showcasing template designs and platform functionality.
          </p>
          <p className="mb-4">
            Demo content does not represent real people, real weddings, or real events. All names, dates, venues, and other details shown in demo invitations are fictitious and used strictly for presentation and demonstration purposes only.
          </p>
          <p>
            Any resemblance to actual persons or events is purely coincidental.
          </p>
        </DoubleBezelCard>

        {/* 4. Account Registration */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">4. Account Registration</h2>
          <p>
            You agree to provide accurate, current, and complete information during registration. You are solely responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.
          </p>
        </DoubleBezelCard>

        {/* 5. Payment Terms */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">5. Payment Terms</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Unfold operates on a one-time payment model. There are no recurring subscriptions.</li>
            <li>All pricing is displayed clearly before checkout.</li>
            <li>Payments are processed securely via Razorpay. Unfold does not store your card or banking details.</li>
            <li>There are no hidden charges. The price shown at checkout is the final amount.</li>
          </ul>
        </DoubleBezelCard>

        {/* 6. Service Delivery */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">6. Service Delivery</h2>
          <p>
            Your personalized invitation webpage is generated after successful payment and completion of the invitation details form. Delivery is entirely digital — no physical items are shipped. Your invitation link and dashboard access are provided immediately upon generation.
          </p>
        </DoubleBezelCard>

        {/* 7. User Responsibilities */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">7. User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>All content you submit must comply with applicable laws and must not contain abusive, defamatory, obscene, or illegal material.</li>
            <li>You are responsible for the accuracy of the wedding details you provide.</li>
          </ul>
        </DoubleBezelCard>

        {/* 8. Public Visibility & User Responsibility */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">8. Public Visibility & User Responsibility</h2>
          <p className="mb-4">
            By creating a wedding invitation webpage on Unfold, you acknowledge and agree that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The information you provide — including names, event details, images, audio, and any other content — will be publicly accessible via a unique shareable link.</li>
            <li>Anyone who obtains or is given access to that link will be able to view the invitation and its contents, without requiring an account or further authentication.</li>
            <li>Unfold is not responsible for how that link is distributed, forwarded, or accessed by third parties once it has been shared by you.</li>
            <li>You are solely responsible for the content you upload and for the level of personal information you choose to include in your invitation.</li>
          </ul>
        </DoubleBezelCard>

        {/* 9. Uploaded Music, Media & Copyright */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">9. Uploaded Music, Media & Copyright</h2>
          <p className="mb-4">
            You are fully responsible for any music, audio, images, or media you upload to the platform. By uploading content, you confirm that:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>You own the rights to the content, or it is royalty-free, properly licensed, or you otherwise have permission to use it.</li>
            <li>Uploading copyrighted content without proper authorization is strictly prohibited.</li>
            <li>Unfold does not claim ownership of any user-uploaded content.</li>
            <li>Unfold reserves the right to remove content that may violate copyright laws or platform policies without prior notice.</li>
            <li>Any legal responsibility arising from uploaded content remains entirely with the user who uploaded it.</li>
          </ul>
          <p>
            The default background music tracks provided by Unfold are licensed, royalty-free stock music intended solely for use within your invitation.
          </p>
        </DoubleBezelCard>

        {/* 10. Plan Usage & Credit Policy */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">10. Plan Usage & Credit Policy</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Purchase of the base plan grants the right to create one wedding invitation webpage.</li>
            <li>That invitation may be edited an unlimited number of times, strictly until the wedding date and time configured for that specific invitation.</li>
            <li>After the wedding date and time has passed, editing access may be restricted in accordance with platform rules then in effect.</li>
            <li>To create additional invitation webpages, you must purchase additional credits or eligible add-on plans.</li>
            <li>Credits and add-on plans are non-transferable between accounts.</li>
          </ul>
        </DoubleBezelCard>

        {/* 11. Automatic Privacy Policy (30-Day Rule) */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">11. Automatic Privacy Policy (30-Day Rule)</h2>
          <p className="mb-4">
            To protect the privacy of our users and prevent indefinite public exposure of personal event details, Unfold enforces an automatic privacy policy on every invitation:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Each invitation is publicly accessible via its unique link from the time of creation until 30 days after the wedding date and time set for that invitation.</li>
            <li>Upon expiry of this 30-day window, the invitation is automatically made private. Its public link is permanently deactivated and will no longer resolve to the invitation page.</li>
            <li>The invitation record itself is not deleted. The owner retains read-only access to it from within their authenticated account dashboard.</li>
            <li>This privacy transition is non-reversible. Once an invitation has been made private — whether automatically or manually by the owner — it cannot be restored to a public state.</li>
            <li>This policy is an integral part of Unfold's privacy design and applies uniformly to all plans and accounts.</li>
          </ul>
        </DoubleBezelCard>

        {/* 12. Hosting & Custom Domains */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">12. Hosting & Custom Domains</h2>
          <p>
            We do not provide custom domains for invitation webpages. All invitations are hosted on our platform domain using a unique slug or ID. Personal or third-party domains cannot be mapped to individual invitations.
          </p>
        </DoubleBezelCard>

        {/* 13. Intellectual Property */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">13. Intellectual Property</h2>
          <p>
            All platform design, templates, code, and branding are the intellectual property of Unfold. You retain full ownership of the personal content (names, photos, messages) you submit to create your invitation.
          </p>
        </DoubleBezelCard>

        {/* 14. Limitation of Liability */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">14. Limitation of Liability</h2>
          <p>
            Unfold is provided on an "as is" basis. We are not liable for any damages arising from third-party misuse of your invitation link, internet connectivity issues, or browser incompatibilities. We do not guarantee uninterrupted service availability.
          </p>
        </DoubleBezelCard>

        {/* 15. Termination */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">15. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms, submit abusive content, or engage in fraudulent activity — without prior notice and without refund.
          </p>
        </DoubleBezelCard>

        {/* 16. Governing Law */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">16. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
          </p>
        </DoubleBezelCard>

        {/* 17. Cancellation & Refund */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">17. Cancellation & Refund</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>All purchases are final.</li>
            <li>Cancellation is not available after successful payment.</li>
            <li>Refunds are not available for completed purchases.</li>
            <li>Refunds may only be considered for duplicate or erroneous payments.</li>
            <li>Technical delays, activation delays, temporary outages, or processing delays do not qualify for refunds — instead, the required plan access may be granted manually.</li>
          </ul>
        </DoubleBezelCard>

        {/* 18. Coupon Code Policy */}
        <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
          <h2 className="text-lg font-serif text-primary dark:text-[#f3e5ab] mb-4">18. Coupon Code Policy</h2>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Users are responsible for applying valid coupon codes before completing payment.</li>
            <li>If a valid coupon is not applied during checkout, the standard plan price will apply.</li>
            <li>Coupon benefits cannot be applied retroactively after payment.</li>
            <li>No refund, adjustment, or compensation will be provided for missed coupon usage.</li>
          </ul>
          <p>
            For questions about these terms, contact us at <a href="mailto:contact@unfoldwed.com" className="text-accent-gold underline">contact@unfoldwed.com</a>.
          </p>
        </DoubleBezelCard>

      </div>
    </div>
  );
}
