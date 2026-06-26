import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export default function AffiliatePage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto mt-12">
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-gold block mb-3">Partner Program</span>
        <h1 className="font-serif text-4xl md:text-6xl font-normal tracking-tight text-stone-900 leading-tight">
          become an affiliate partner
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <DoubleBezelCard className="bg-white h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-serif text-primary mb-4">Earn 20% commission on referrals</h2>
              <p className="text-sm text-stone-500 leading-relaxed mb-6 font-sans">
                Are you a wedding photographer, event planner, makeup artist, or content creator? Partner with Unfold and help couples design premium digital invitations.
              </p>
              
              <ul className="space-y-4 text-xs text-stone-605">
                <li className="flex items-start gap-3">
                  <Sparkle className="h-4.5 w-4.5 text-accent-gold shrink-0 mt-0.5" weight="fill" />
                  <span>**Generous Commission**: Get a 20% cut of every verified plan purchased through your link (up to ₹260 per invite).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkle className="h-4.5 w-4.5 text-accent-gold shrink-0 mt-0.5" weight="fill" />
                  <span>**Real-time Tracking**: Monitor visitor clicks, conversions, and accrued commissions inside a dedicated dashboard.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkle className="h-4.5 w-4.5 text-accent-gold shrink-0 mt-0.5" weight="fill" />
                  <span>**Monthly Payouts**: Guaranteed bank transfers/UPI payouts on the 5th of every month.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 text-[10px] font-mono text-stone-400">
              * Subject to Affiliate Terms & Conditions.
            </div>
          </DoubleBezelCard>
        </div>

        {/* Application Form Column */}
        <div className="lg:col-span-6">
          <DoubleBezelCard className="bg-white">
            <h2 className="text-lg font-serif text-primary mb-6">Apply for Partnership</h2>
            <form className="space-y-4 font-sans text-xs text-stone-700">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 text-stone-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Sharma"
                  className="w-full bg-stone-50 border border-black/5 rounded-full px-4 py-3 outline-none focus:border-accent-gold/40 text-stone-800 placeholder-stone-400"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 text-stone-400">
                  Business / Profession
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wedding Photographer"
                  className="w-full bg-stone-50 border border-black/5 rounded-full px-4 py-3 outline-none focus:border-accent-gold/40 text-stone-800 placeholder-stone-400"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 text-stone-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. contact@vikramstudio.com"
                  className="w-full bg-stone-50 border border-black/5 rounded-full px-4 py-3 outline-none focus:border-accent-gold/40 text-stone-800 placeholder-stone-400"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 text-stone-400">
                  Instagram / Portfolio Link
                </label>
                <input
                  type="url"
                  placeholder="e.g. instagram.com/vikramphotography"
                  className="w-full bg-stone-50 border border-black/5 rounded-full px-4 py-3 outline-none focus:border-accent-gold/40 text-stone-800 placeholder-stone-400"
                />
              </div>

              <div className="pt-2">
                <PremiumButton type="button" className="w-full justify-center">
                  Submit Application
                </PremiumButton>
              </div>
            </form>
          </DoubleBezelCard>
        </div>

      </div>
    </div>
  );
}
