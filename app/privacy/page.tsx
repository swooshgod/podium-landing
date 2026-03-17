import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Podium",
  description: "Podium privacy policy. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#888] mb-12">Last updated: March 17, 2026</p>

        <p className="mb-6">
          Podium (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the Podium
          mobile application. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our app.
        </p>

        <Section title="1. Information We Collect">
          <Subsection title="Account Information">
            <p>
              When you create an account we collect your name, email address, and profile photo
              (optional). If you sign in with Apple, we receive the identifiers Apple provides.
            </p>
          </Subsection>

          <Subsection title="Health &amp; Fitness Data">
            <p>
              With your explicit permission, we access Apple HealthKit data including steps, walking
              and running distance, active energy burned, active minutes, workout sessions, and body
              weight. This data is used solely to score competitions you participate in.
            </p>
          </Subsection>

          <Subsection title="Payment Information">
            <p>
              When you enter a paid competition, payment is processed by Stripe. We do not store
              your full card number. Stripe may collect card details, billing address, and
              transaction history in accordance with their own privacy policy.
            </p>
          </Subsection>

          <Subsection title="Location Data">
            <p>
              We collect approximate location (IP-based) to enforce geo-compliance requirements for
              paid competitions. We do not track precise GPS location.
            </p>
          </Subsection>

          <Subsection title="Usage Data">
            <p>
              We automatically collect device type, OS version, app version, crash logs, and
              general usage analytics to improve the app experience.
            </p>
          </Subsection>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>Running and scoring fitness competitions you join</li>
            <li>Processing entry fees and prize payouts</li>
            <li>Displaying leaderboards to competition participants</li>
            <li>Preventing fraud, cheating, and abuse</li>
            <li>Enforcing age and geographic eligibility requirements</li>
            <li>Sending competition updates and notifications you opt into</li>
            <li>Improving app performance and fixing bugs</li>
          </ul>
        </Section>

        <Section title="3. Apple HealthKit Data">
          <p className="mb-4">
            We treat HealthKit data with the highest level of care:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>HealthKit data is <strong className="text-white">never used for advertising</strong> or marketing purposes</li>
            <li>HealthKit data is <strong className="text-white">never sold</strong> to third parties</li>
            <li>HealthKit data is <strong className="text-white">never shared</strong> with third parties for their marketing or advertising purposes</li>
            <li>HealthKit data is only used to score and verify competition results</li>
            <li>Aggregated, non-identifying competition scores may be shown to other participants on leaderboards</li>
          </ul>
        </Section>

        <Section title="4. Third-Party Services">
          <p className="mb-4">We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Stripe</strong> — payment processing for entry fees and payouts</li>
            <li><strong className="text-white">Supabase</strong> — database and authentication infrastructure</li>
            <li><strong className="text-white">Apple HealthKit</strong> — fitness data with your permission</li>
            <li><strong className="text-white">Expo / EAS</strong> — app build and update delivery</li>
          </ul>
          <p className="mt-4">
            Each service operates under its own privacy policy. We only share the minimum data
            necessary for each service to function.
          </p>
        </Section>

        <Section title="5. Data Sharing">
          <p>
            We <strong className="text-white">do not sell your personal data</strong> to any third
            party. We may share information only in these cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>With service providers who process data on our behalf (listed above)</li>
            <li>To comply with legal obligations or valid legal process</li>
            <li>To protect the rights, safety, or property of Podium or its users</li>
            <li>In connection with a merger, acquisition, or sale of assets (with notice)</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We retain your account data for as long as your account is active. Competition results
            and leaderboard data are retained for record-keeping. If you delete your account, we
            remove your personal data within 30 days, except where retention is required by law
            (e.g., financial transaction records).
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong className="text-white">Delete your account</strong> — available in Profile &gt; Settings, or by emailing us</li>
            <li><strong className="text-white">Export your data</strong> — request a copy of your personal data by emailing us</li>
            <li><strong className="text-white">Revoke HealthKit access</strong> — at any time via iOS Settings &gt; Privacy &gt; Health</li>
            <li><strong className="text-white">Opt out of notifications</strong> — via app settings or iOS notification settings</li>
          </ul>
        </Section>

        <Section title="8. Security">
          <p>
            We use industry-standard measures to protect your data, including encryption in transit
            (TLS), encrypted database storage, and secure authentication. However, no method of
            electronic transmission or storage is 100% secure.
          </p>
        </Section>

        <Section title="9. Children&rsquo;s Privacy">
          <p>
            Podium is intended for users aged 18 and older. We do not knowingly collect data from
            anyone under 18. If we learn we have collected data from a minor, we will delete it
            promptly.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material
            changes via in-app notification or email. Continued use of the app after changes
            constitutes acceptance.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            If you have questions about this Privacy Policy or your data, contact us at:
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

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-[#CCC] mb-1">{title}</h3>
      <div className="leading-7">{children}</div>
    </div>
  );
}
