import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rider Support | Apex Wizard",
  description: "Get help with Apex Wizard — custom bikes, backups, and clicker vs turns explained.",
};

const FAQ = [
  {
    q: "Can I add a custom motorcycle?",
    a: "Yes. If your specific generation or model is missing from our 115+ factory list, simply select “Add Custom Bike” in the Garage. You can define exact suspension geometries, clickers, turns and electronics capabilities manually.",
  },
  {
    q: "Is my data backed up securely?",
    a: "All data strictly lives locally on your device for absolute privacy and maximum offline speed at the track. If you upgrade your phone, your setups will carry over if you use standard Apple iCloud or Google Drive system backups.",
  },
  {
    q: "Why do some recommendations say 'Turns' and some say 'Clicks'?",
    a: "Apex Wizard adapts to the hardware reality of your motorcycle. European superbikes typically use strictly “clicks”, while certain Japanese middleweights rely on measuring the internal needle depth via 1/4 or 1/2 “turns out”. Apex Wizard computes this automatically via your bike's defined capabilities.",
  },
];

export default function SupportPage() {
  return (
    <ContentPage title="Rider" accent="Support">
      <Card className="border-[var(--color-border-bright)] p-6 text-center">
        <h3 className="text-xl font-bold text-[var(--color-text)]">Need Direct Assistance?</h3>
        <p className="mt-2">
          Whether you&rsquo;ve found a bug, need help adding a custom bike profile or have a
          feature request, shoot us an email. We typically respond within 24 hours.
        </p>
        <div className="mt-5 flex justify-center">
          <Button asChild>
            <a href={`mailto:${CONTACT_EMAIL}`}>Email Support</a>
          </Button>
        </div>
      </Card>

      <h2 className="text-center">Frequently Asked Questions</h2>
      {FAQ.map((item) => (
        <Card key={item.q} className="p-6">
          <h3 className="font-semibold text-[var(--color-text)]">{item.q}</h3>
          <p className="mt-2 text-sm">{item.a}</p>
        </Card>
      ))}
    </ContentPage>
  );
}
