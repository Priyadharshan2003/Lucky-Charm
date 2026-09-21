import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lucky Charm',
  description: 'Privacy Policy for Lucky Charm.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-neutral-400 font-light">
            Last updated: September 2026
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-neutral-400 prose-a:text-blue-400 hover:prose-a:text-blue-300">
          <section className="mb-12">
            <h2>Data Collection</h2>
            <p>
              Lucky Charm is designed to be a private, local-first desktop application. We do not collect any personal usage data, telemetry, or analytics from your desktop application. Your charms, themes, and configuration settings are stored locally on your device.
            </p>
          </section>

          <section className="mb-12">
            <h2>Analytics</h2>
            <p>
              Our website (luckycharm.app) uses basic, privacy-friendly analytics to count page views and understand aggregate traffic patterns. We do not use cookies for tracking or sell your data to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2>Purchases</h2>
            <p>
              When you purchase Lucky Charm, the transaction is processed securely through our payment provider (e.g., Stripe, Lemon Squeezy). We do not store or have access to your credit card information. We only retain the email address associated with your purchase to verify licenses and provide customer support.
            </p>
          </section>

          <section className="mb-12">
            <h2>Updates</h2>
            <p>
              The Lucky Charm desktop application periodically checks our servers for new software updates. This request only transmits your current application version and operating system to determine if an update is available.
            </p>
          </section>

          <section className="mb-12">
            <h2>Email Notifications</h2>
            <p>
              If you join our waitlist or subscribe to our newsletter, we will only use your email to send you relevant product updates. You can unsubscribe at any time.
            </p>
          </section>

          <section className="mb-12">
            <h2>Data Retention</h2>
            <p>
              We retain your license and purchase history indefinitely to ensure you always have access to your purchased software. If you would like your data completely deleted, please contact us.
            </p>
          </section>

          <section className="mb-12 p-8 glass-panel rounded-2xl border border-white/10 mt-16">
            <h2 className="mt-0 mb-4 text-2xl">Contact</h2>
            <p className="mb-0">
              If you have any questions about this Privacy Policy, please contact us at:<br/>
              <a href="mailto:priyadharshanchandranath@gmail.com" className="font-bold">priyadharshanchandranath@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
