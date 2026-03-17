import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Podium",
  description: "Podium terms of service. Rules, eligibility, and competition guidelines.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-[#888] mb-12">Last updated: March 17, 2026</p>

        <p className="mb-6">
          Welcome to Podium. By downloading, accessing, or using the Podium mobile application
          (&ldquo;the App&rdquo;), you agree to be bound by these Terms of Service
          (&ldquo;Terms&rdquo;). If you do not agree, do not use the App.
        </p>

        <Section title="1. Nature of Competitions">
          <p>
            Podium hosts <strong className="text-white">skill-based fitness competitions</strong>.
            Outcomes are determined entirely by participants&rsquo; athletic effort and measurable
            fitness performance — including steps taken, distance covered, calories burned, active
            minutes logged, and verified weight change — as tracked by Apple HealthKit.
          </p>
          <p className="mt-4">
            Podium competitions are <strong className="text-white">not gambling</strong>. Winners
            are determined by objective, verifiable fitness metrics, not by chance. No element of
            luck determines the outcome of any competition.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <p>To use Podium and participate in paid competitions, you must:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Be at least <strong className="text-white">18 years of age</strong></li>
            <li>Complete age verification when required</li>
            <li>Reside in a jurisdiction where skill-based competitions are permitted</li>
          </ul>

          <p className="mt-4">
            Paid competitions are <strong className="text-white">not available</strong> to residents
            of the following U.S. states: Arizona (AZ), Arkansas (AR), Connecticut (CT),
            Delaware (DE), Indiana (IN), Louisiana (LA), Maine (ME), Montana (MT), South
            Carolina (SC), South Dakota (SD), and Tennessee (TN).
          </p>

          <p className="mt-4">
            You may participate in free competitions regardless of your location, subject to the
            age requirement.
          </p>
        </Section>

        <Section title="3. Account">
          <p>
            You are responsible for maintaining the security of your account credentials. You may
            not share your account or allow others to compete on your behalf. Each person may
            maintain only one Podium account.
          </p>
        </Section>

        <Section title="4. Entry Fees and Payouts">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              Entry fees are collected via Stripe when you join a paid competition. By joining, you
              authorize the charge.
            </li>
            <li>
              <strong className="text-white">Entry fees are non-refundable</strong> once a
              competition has started. If a competition is canceled before it begins, entry fees
              are refunded in full.
            </li>
            <li>
              Podium charges a <strong className="text-white">10% service fee</strong> on the total
              prize pool. The winner receives 90% of the pot.
            </li>
            <li>
              Payouts are processed via Podium Credits, which can be redeemed to your bank account
              or applied to future entry fees.
            </li>
            <li>
              Podium is not responsible for taxes on winnings. You are responsible for reporting
              competition winnings as required by your jurisdiction.
            </li>
          </ul>
        </Section>

        <Section title="5. Fair Play and Anti-Cheat Policy">
          <p>
            Podium is committed to fair competition. The following are prohibited:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Falsifying or manipulating HealthKit data</li>
            <li>Using devices, apps, or methods to artificially inflate fitness metrics</li>
            <li>Having another person perform activities on your behalf</li>
            <li>Colluding with other participants to manipulate outcomes</li>
            <li>Creating multiple accounts to gain an unfair advantage</li>
          </ul>
          <p className="mt-4">
            If we detect or reasonably suspect fraud or cheating, we reserve the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Disqualify you from the competition without refund</li>
            <li>Forfeit any pending winnings</li>
            <li>Suspend or permanently terminate your account</li>
            <li>Report activity to relevant authorities if warranted</li>
          </ul>
        </Section>

        <Section title="6. HealthKit Data Usage">
          <p>
            Podium accesses Apple HealthKit data solely to score competitions. HealthKit data is
            never used for advertising, is never sold to third parties, and is handled in strict
            compliance with Apple&rsquo;s HealthKit guidelines. You can revoke HealthKit access at
            any time via iOS Settings.
          </p>
        </Section>

        <Section title="7. Account Termination">
          <p>We may suspend or terminate your account at our discretion if you:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Violate these Terms of Service</li>
            <li>Engage in fraudulent or abusive behavior</li>
            <li>Fail age or geographic verification requirements</li>
            <li>Are subject to a valid legal or regulatory order</li>
          </ul>
          <p className="mt-4">
            You may delete your account at any time from the Profile screen or by contacting
            support. Deletion forfeits any unredeemed credits or pending payouts.
          </p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>
            All content, design, code, and branding in the Podium app are owned by Podium and
            protected by intellectual property laws. You may not copy, modify, distribute, or
            reverse-engineer any part of the App.
          </p>
        </Section>

        <Section title="9. Disclaimer of Warranties">
          <p>
            The App is provided <strong className="text-white">&ldquo;as is&rdquo;</strong> and
            {" "}<strong className="text-white">&ldquo;as available&rdquo;</strong> without
            warranties of any kind, either express or implied. We do not guarantee that the App
            will be uninterrupted, error-free, or free of harmful components.
          </p>
          <p className="mt-4">
            We are not responsible for the accuracy of HealthKit data provided by Apple or
            third-party fitness devices. Competition scores are based on the data available to us.
          </p>
        </Section>

        <Section title="10. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Podium and its officers, directors, employees,
            and agents shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of the App, including but not limited to loss of
            profits, data, or goodwill.
          </p>
          <p className="mt-4">
            Our total liability for any claim arising from these Terms shall not exceed the amount
            you paid to Podium in the 12 months preceding the claim.
          </p>
        </Section>

        <Section title="11. Dispute Resolution">
          <p>
            Any disputes arising from these Terms or your use of the App shall be resolved through
            binding arbitration in accordance with the rules of the American Arbitration
            Association, conducted in the state of California. You waive any right to participate
            in a class action lawsuit or class-wide arbitration.
          </p>
        </Section>

        <Section title="12. Changes to These Terms">
          <p>
            We may update these Terms from time to time. Material changes will be communicated via
            in-app notification or email. Continued use of the App after changes constitutes
            acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="13. Governing Law">
          <p>
            These Terms are governed by the laws of the State of California, without regard to
            conflict of law principles.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p>
            For questions about these Terms, contact us at:
          </p>
          <p className="mt-4">
            <a href="mailto:support@podiumapp.fit" className="text-[#FF5A1F] hover:underline">
              support@podiumapp.fit
            </a>
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="leading-7">{children}</div>
    </section>
  );
}
