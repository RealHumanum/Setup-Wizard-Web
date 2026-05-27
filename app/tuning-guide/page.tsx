import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Motorcycle Suspension Tuning Guide | Apex Wizard",
  description:
    "Master sag, rebound and compression damping to drop lap times. A practical motorcycle suspension tuning guide.",
};

export default function TuningGuidePage() {
  return (
    <ContentPage title="Suspension Tuning" accent="Guide">
      <p>
        Mastering your motorcycle&rsquo;s geometry to drop lap times and eliminate tank slappers.
      </p>

      <h2>The Basics of Motorcycle Suspension</h2>
      <p>
        Motorcycle suspension isn&rsquo;t a dark art—it&rsquo;s physics. Every clicker on your fork
        or shock is designed to control how the spring compresses and rebounds under the immense
        dynamic forces of braking, accelerating, and cornering.
      </p>

      <h3>1. Setting Sag (Preload)</h3>
      <p>
        Rider sag is the foundational metric of your setup. It dictates the chassis geometry.
        Without properly setting your sag using the spring preload collars, your bike will never
        steer correctly, regardless of how you adjust your damping clickers. Generally, sportbikes
        aim for 30-38mm of front sag and 25-30mm of rear sag, though specific geometries dictate
        exact numbers.
      </p>

      <h3>2. Rebound Damping</h3>
      <p>
        Rebound controls the speed at which the spring returns to its natural length after being
        compressed. If your rebound is too slow (too much damping), the suspension
        &ldquo;packs down&rdquo; over multiple bumps. If it&rsquo;s too fast (too little damping),
        the bike behaves like a pogo stick, lacking stability.
      </p>

      <Card className="border-[var(--color-border-bright)] p-6 text-center">
        <h3 className="text-xl font-bold text-[var(--color-text)]">Tired of Guessing?</h3>
        <p className="mt-2">
          Don&rsquo;t blindly twist clickers at the track. Apex Wizard calculates exact damping
          adjustments based on your corner phase symptoms.
        </p>
        <div className="mt-5 flex justify-center">
          <Button asChild>
            <Link href="/#cta">Download Apex Wizard</Link>
          </Button>
        </div>
      </Card>

      <h3>3. Compression Damping</h3>
      <p>
        Compression controls the speed at which the spring compresses. It takes the harshness out
        of bumps and controls pitch changes. <strong>High-speed compression</strong> deals with
        sudden, sharp impacts (like a curb or pothole), while{" "}
        <strong>low-speed compression</strong> manages slow, rolling weight transfers (like heavy
        trail braking or smooth acceleration).
      </p>

      <h2>Diagnosing Track Issues</h2>
      <p>When solving track handling issues, always break the corner down into phases:</p>
      <ul>
        <li>
          <strong>Braking &amp; Turn-in:</strong> Front forks dive. Rear shock extends.
        </li>
        <li>
          <strong>Mid-Corner:</strong> Suspension is somewhat settled, geometry relies on trail.
        </li>
        <li>
          <strong>Exit &amp; Acceleration:</strong> Rear shock compresses under load, front forks
          extend.
        </li>
      </ul>
      <p>
        A bike that exhibits &ldquo;understeer&rdquo; (running wide) on corner entry is often a
        completely different mechanical fix than a bike that runs wide on corner exit. Always
        diagnose your clickers by the specific phase the issue occurs in.
      </p>
    </ContentPage>
  );
}
