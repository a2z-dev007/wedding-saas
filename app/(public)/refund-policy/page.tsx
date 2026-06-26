"use client";

import { motion } from "motion/react";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PageHero } from "@/components/ui/page-hero";
import { staggerContainer, fadeUp, viewportOnce } from "@/components/ui/motion-primitives";
import { Info, Warning, CreditCard, SealCheck, ArrowClockwise, CurrencyInr } from "@phosphor-icons/react";

export default function RefundPolicyPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto">
      <PageHero 
        eyebrow="Billing Terms" 
        title="Cancellation & Refund Policy" 
        subtitle="Last updated: March 7, 2026" 
      />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-8 text-xs text-stone-500 leading-relaxed font-sans"
      >
        <motion.div variants={fadeUp}>
          <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center text-accent-gold shrink-0">
                <Info size={18} weight="light" />
              </div>
              <h2 className="text-lg font-serif text-[#1F1F1F] dark:text-white font-normal">
                1. Digital Nature & Refund Limits
              </h2>
            </div>
            <p className="text-sm text-stone-650 dark:text-stone-400">
              Unfold is a customized digital service. Because each invitation webpage is uniquely generated based on your personal details, our refund policy is limited. Please read it carefully before making a purchase.
            </p>
          </DoubleBezelCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center text-accent-gold shrink-0">
                <Warning size={18} weight="light" />
              </div>
              <h2 className="text-lg font-serif text-[#1F1F1F] dark:text-white font-normal">
                2. Cancellation & Refund
              </h2>
            </div>
            <ul className="list-disc pl-5 space-y-3.5 text-sm text-stone-650 dark:text-stone-400">
              <li><strong>All purchases are final.</strong> Once payment is processed, the system assigns templates and configures routes.</li>
              <li>Cancellation is not available after successful payment.</li>
              <li>Refunds are not available for completed purchases.</li>
              <li>Refunds may only be considered for duplicate or erroneous payments.</li>
              <li>Technical delays, activation delays, temporary outages, or processing delays do not qualify for refunds — instead, the required plan access may be granted manually by our engineering team.</li>
            </ul>
          </DoubleBezelCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center text-accent-gold shrink-0">
                <CreditCard size={18} weight="light" />
              </div>
              <h2 className="text-lg font-serif text-[#1F1F1F] dark:text-white font-normal">
                3. Coupon Code Policy
              </h2>
            </div>
            <ul className="list-disc pl-5 space-y-3.5 text-sm text-stone-650 dark:text-stone-400">
              <li>Users are responsible for applying valid coupon codes before completing payment.</li>
              <li>If a valid coupon is not applied during checkout, the standard plan price will apply.</li>
              <li>Coupon benefits cannot be applied retroactively after payment.</li>
              <li>No refund, adjustment, or compensation will be provided for missed coupon usage.</li>
            </ul>
          </DoubleBezelCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center text-accent-gold shrink-0">
                <CurrencyInr size={18} weight="light" />
              </div>
              <h2 className="text-lg font-serif text-[#1F1F1F] dark:text-white font-normal">
                4. Duplicate or Erroneous Payments
              </h2>
            </div>
            <p className="text-sm text-stone-650 dark:text-stone-400 leading-relaxed">
              If a duplicate payment occurs, we will review the transaction and process a refund after deducting any applicable payment processing or administrative charges. Refunds will typically be completed within 7–10 business days.
            </p>
          </DoubleBezelCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center text-accent-gold shrink-0">
                <Warning size={18} weight="light" />
              </div>
              <h2 className="text-lg font-serif text-[#1F1F1F] dark:text-white font-normal">
                5. Payment Gateway Issues
              </h2>
            </div>
            <p className="text-sm text-stone-650 dark:text-stone-400 leading-relaxed">
              If a payment issue occurs due to a technical error from the payment gateway, we are not responsible for processing the refund directly, as payments are handled through the Razorpay payment gateway. In such cases, users may need to contact the payment provider for further assistance.
            </p>
          </DoubleBezelCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center text-accent-gold shrink-0">
                <ArrowClockwise size={18} weight="light" />
              </div>
              <h2 className="text-lg font-serif text-[#1F1F1F] dark:text-white font-normal">
                6. Payment Successful But Features Not Activated
              </h2>
            </div>
            <div className="text-sm text-stone-650 dark:text-stone-400 space-y-3">
              <p>
                If your payment is successfully processed but, due to technical or server-side issues, the paid features (such as invitation creation or editing) are not activated on your account, the following process will apply:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Our team will review and verify the payment transaction.</li>
                <li>Upon successful verification, access to paid features will be manually granted to your account.</li>
                <li>No refund will be issued in such cases — instead, the service will be activated as promised.</li>
                <li>Refunds are only applicable for duplicate or erroneous payments, not for activation delays caused by technical issues.</li>
              </ul>
            </div>
          </DoubleBezelCard>
        </motion.div>

        <motion.div variants={fadeUp}>
          <DoubleBezelCard className="bg-white dark:bg-[#0a0f0d]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center text-accent-gold shrink-0">
                <SealCheck size={18} weight="light" />
              </div>
              <h2 className="text-lg font-serif text-[#1F1F1F] dark:text-white font-normal">
                7. How to Request a Refund & Refund Method
              </h2>
            </div>
            <div className="text-sm text-stone-650 dark:text-stone-400 space-y-4">
              <p>
                Email us at <a href="mailto:contact@unfoldwed.com" className="text-accent-gold font-bold hover:underline">contact@unfoldwed.com</a> with your registered email address and payment reference number. We will review your request and respond within 48 hours.
              </p>
              <p>
                All approved refunds will be credited back to the original payment method (UPI, credit/debit card, net banking, etc.) used at the time of purchase.
              </p>
            </div>
          </DoubleBezelCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
