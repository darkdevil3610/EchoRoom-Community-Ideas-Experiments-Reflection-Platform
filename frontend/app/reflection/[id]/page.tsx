"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { PageLayout } from "@/app/community/PageLayout";
import LoadingState from "@/app/components/LoadingState";
import ErrorState from "@/app/components/ErrorState";
import BackButton from "@/app/components/BackButton";
import { MagicCard } from "@/components/ui/magic-card";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

interface Reflection {
  id: number;
  outcomeId: number;
  context: {
    emotionBefore: number;
    confidenceBefore: number;
  };
  breakdown: {
    whatHappened: string;
    whatWorked: string;
    whatDidntWork: string;
  };
  growth: {
    lessonLearned: string;
    nextAction: string;
  };
  result: {
    emotionAfter: number;
    confidenceAfter: number;
  };
  evidenceLink?: string;
  visibility: "private" | "public";
  createdAt: string;
}

export default function ReflectionDetailPage() {
  const { id } = useParams();
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchReflection = async () => {
      try {
        const data = await apiFetch(`/reflections/id/${id}`);
        setReflection(data);
      } catch (err: any) {
        setError(err.message || "Failed to load reflection");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReflection();
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <LoadingState message="Loading reflection..." />
      </PageLayout>
    );
  }

  if (error || !reflection) {
    return (
      <PageLayout>
        <ErrorState message={error || "Reflection not found"} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="section max-w-3xl mx-auto">

       <div className="mb-6">
        <Button
            onClick={() => router.push("/reflection")}
            className="rounded-full px-6 py-2"
        >
            ← Back to Reflections
        </Button>
        </div>

        <MagicCard
          className="p-8 rounded-3xl bg-white/75 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/10"
          gradientColor="rgba(59,130,246,0.6)"
        >
          <h2 className="text-2xl font-bold mb-6">
            Reflection Details
          </h2>

          <div className="space-y-6">

            <div>
              <h3 className="font-semibold mb-2">Before</h3>
              <p>Emotion: {reflection.context.emotionBefore}</p>
              <p>Confidence: {reflection.context.confidenceBefore}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Breakdown</h3>
              <p><strong>What happened:</strong> {reflection.breakdown.whatHappened}</p>
              <p><strong>What worked:</strong> {reflection.breakdown.whatWorked}</p>
              <p><strong>What didn’t work:</strong> {reflection.breakdown.whatDidntWork}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Growth</h3>
              <p><strong>Lesson:</strong> {reflection.growth.lessonLearned}</p>
              <p><strong>Next action:</strong> {reflection.growth.nextAction}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">After</h3>
              <p>Emotion: {reflection.result.emotionAfter}</p>
              <p>Confidence: {reflection.result.confidenceAfter}</p>
            </div>

            {reflection.evidenceLink && (
              <div>
                <h3 className="font-semibold mb-2">Demo Link</h3>
                <a
                  href={reflection.evidenceLink}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View Experiment
                </a>
              </div>
            )}

          </div>
        </MagicCard>
      </div>
    </PageLayout>
  );
}