import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { DownloadButtons } from "@/components/DownloadButtons";
import { CONTACT_EMAIL, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

// QR codes are pre-generated at build time into public/assets/ to drop the
// two extra cross-origin HTTPS handshakes the old api.qrserver.com calls
// added to the CTA.

export function Cta() {
  return (
    <section id="cta" className="relative overflow-hidden px-6 py-28">
      <div
        className="aw-glow size-[700px] bg-[var(--color-primary)]"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.18 }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionHeader
          tag="Get Started"
          title={
            <>
              Ready to Find Your <span className="aw-gradient-text">Apex?</span>
            </>
          }
          sub="Join riders worldwide who are using Apex Wizard to dial in their suspension and dominate the track."
        />
        <div className="flex justify-center">
          <DownloadButtons />
        </div>

        <div className="mt-16">
          <div className="relative flex items-center justify-center">
            <div className="h-px flex-1 bg-[var(--color-border)]" />
            <span className="px-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
              Available on
            </span>
            <div className="h-px flex-1 bg-[var(--color-border)]" />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="rounded-2xl border border-[var(--color-border)] bg-white p-2 transition-transform group-hover:scale-105">
                <Image
                  src="/assets/qr-ios.png"
                  alt="iOS App Store QR"
                  width={160}
                  height={160}
                  loading="lazy"
                  unoptimized
                />
              </div>
              <span className="mt-3 block font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]">
                iOS App Store
              </span>
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="rounded-2xl border border-[var(--color-border)] bg-white p-2 transition-transform group-hover:scale-105">
                <Image
                  src="/assets/qr-android.png"
                  alt="Android QR"
                  width={160}
                  height={160}
                  loading="lazy"
                  unoptimized
                />
              </div>
              <span className="mt-3 block font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]">
                Google Play Store
              </span>
            </a>
          </div>
        </div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-12 inline-block text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-80"
        >
          Questions? Contact Support &rarr;
        </a>
      </div>
    </section>
  );
}
