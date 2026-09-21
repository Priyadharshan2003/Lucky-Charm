import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Lucky Charm',
  description: 'Terms of Service for Lucky Charm.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-neutral-400 font-light">
            Last updated: September 2026
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-neutral-400 prose-a:text-blue-400 hover:prose-a:text-blue-300">
          <section className="mb-12">
            <h2>One Purchase</h2>
            <p>
              A single purchase of Lucky Charm grants you a personal, non-transferable license to use the software on both Windows and macOS platforms. 
            </p>
          </section>

          <section className="mb-12">
            <h2>Updates Included</h2>
            <p>
              Your purchase includes all minor updates (e.g., v1.x) and bug fixes for the current major version. Major version upgrades (e.g., v2.0) may require an additional upgrade fee, though we strive to provide long-term support for all releases.
            </p>
          </section>

          <section className="mb-12">
            <h2>Usage Rights</h2>
            <p>
              You may install and use Lucky Charm on multiple devices that you personally own and operate. You may not distribute, resell, lease, or share your license key or the software installer with third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2>Team Licensing</h2>
            <p>
              For businesses or teams requiring multiple installations across different users, please purchase individual licenses for each user or contact us for volume licensing options.
            </p>
          </section>

          <section className="mb-12">
            <h2>Disclaimer</h2>
            <p>
              Lucky Charm is provided &quot;as is&quot; without warranties of any kind, either expressed or implied. We do not guarantee that the software will be error-free or function uninterrupted. In no event shall the creator be liable for any damages arising out of the use or inability to use the software.
            </p>
          </section>

          <section className="mb-12 p-8 glass-panel rounded-2xl border border-white/10 mt-16">
            <h2 className="mt-0 mb-4 text-2xl">Contact</h2>
            <p className="mb-0">
              For licensing inquiries or questions regarding these terms, please contact us at:<br/>
              <a href="mailto:priyadharshanchandranath@gmail.com" className="font-bold">priyadharshanchandranath@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
