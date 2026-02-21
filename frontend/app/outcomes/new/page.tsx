"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { PageLayout } from "@/app/community/PageLayout";
import Button from "@/app/components/ui/Button";
import { MagicCard } from "@/components/ui/magic-card";
import { apiFetch } from "@/app/lib/api";

export default function NewOutcomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const experimentId = searchParams.get("experimentId");

  const [result, setResult] = useState("Success");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!experimentId) return;

    try {
      setIsSubmitting(true);

      await apiFetch("/outcomes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experimentId: Number(experimentId),
          result,
          notes,
        }),
      });

      router.push("/outcomes");
    } catch (err: any) {
      alert(err.message || "Failed to create outcome");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center py-16">
        <MagicCard
          className="p-[1px] rounded-2xl w-full max-w-2xl"
          gradientColor="rgba(59,130,246,0.6)"
        >
          <div className="bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-10 border border-white/10 space-y-8">

            <h1 className="text-2xl font-bold">
              Create Outcome
            </h1>

            <div>
              <label className="block mb-2 font-medium">
                Result
              </label>

              <select
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border bg-background"
              >
                <option>Success</option>
                <option>Mixed</option>
                <option>Failed</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Notes (optional)
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border bg-background"
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={() => router.back()}>
                Cancel
              </Button>

              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Outcome"}
              </Button>
            </div>

          </div>
        </MagicCard>
      </div>
    </PageLayout>
  );
}