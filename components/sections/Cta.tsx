import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { DownloadButtons } from "@/components/DownloadButtons";
import { CONTACT_EMAIL, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

const QR = (data: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(data)}`;

export function Cta() {
  return (
    <section id="cta" className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeader
          tag="Get Started"
          title={<>Ready to Find Your <span className="aw-gradient-text">Apex?</span></>}
          sub="Join riders worldwide who are using Apex Wizard to dial in their suspension and dominate the track."
        />
        <div className="flex justify-center">
          <DownloadButtons />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-center">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-2">
              <Image src={QR(APP_STORE_URL)} alt="iOS App Store QR" width={140} height={140} unoptimized />
            </div>
            <span className="mt-2 block font-mono text-xs text-[var(--color-text-muted)]">
              iOS App Store
            </span>
          </a>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-center">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-2">
              <Image src={QR("https://play.google.com/store/apps/details?id=com.apexwizard.app")} alt="Android QR" width={140} height={140} unoptimized />
            </div>
            <span className="mt-2 block font-mono text-xs text-[var(--color-text-muted)]">
              Google Play Store
            </span>
          </a>
        </div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-10 inline-block text-sm font-semibold text-[var(--color-primary)] hover:brightness-110"
        >
          Questions? Contact Support &rarr;
        </a>
      </div>
    </section>
  );
}
