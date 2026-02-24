"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../lib/api";
import { PageLayout } from "../community/PageLayout";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import BackButton from "../components/BackButton";
import Button from "@/app/components/ui/Button";
import RefreshIcon from "@/components/ui/refresh-icon";
import LibraryIcon from "@/components/ui/library-icon";
import { MagicCard } from "@/components/ui/magic-card";
import { MessageSquare, TrendingUp } from "lucide-react";

interface ReflectionApiResponse {
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

interface OutcomeApiResponse {
  id: number;
  experimentId: number;
  experimentTitle: string;
  result: string;
}

interface ReflectionViewModel {
  id: number;
  title: string;
  outcome: string;
  lesson: string;
  confidenceDelta: number;
  emotionBefore: number;
  emotionAfter: number;
  date: string;
}

const outcomeColors: Record<string, string> = {
  Success:
    "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
  Mixed:
    "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
  Failed:
    "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
};

const formatDate = (createdAt?: string): string => {
  if (!createdAt) return "Unknown date";
  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) return "Unknown date";
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const mapReflection = (
  reflection: ReflectionApiResponse,
  outcomeMap: Map<number, OutcomeApiResponse>
): ReflectionViewModel => {
  const outcome = outcomeMap.get(reflection.outcomeId);

  return {
    id: reflection.id,
    title: outcome?.experimentTitle || "Unknown Experiment",
    outcome: outcome?.result || "Unknown",
    lesson: reflection.growth.lessonLearned,
    confidenceDelta:
      reflection.result.confidenceAfter -
      reflection.context.confidenceBefore,
    emotionBefore: reflection.context.emotionBefore,
    emotionAfter: reflection.result.emotionAfter,
    date: formatDate(reflection.createdAt),
  };
};

export default function ReflectionPage() {
  const [reflections, setReflections] = useState<ReflectionViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [reflectionsData, outcomesData] = await Promise.all([
          apiFetch<ReflectionApiResponse[]>("/reflections"),
          apiFetch<OutcomeApiResponse[]>("/outcomes"),
        ]);

        const outcomeMap = new Map(
          outcomesData.map((o) => [o.id, o])
        );

        const mapped = reflectionsData.map((r) =>
          mapReflection(r, outcomeMap)
        );

        setReflections(mapped);
      } catch (err: any) {
        setError(err.message || "Failed to fetch reflections");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <LoadingState message="Loading reflections..." />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <ErrorState message={error} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="section">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <BackButton />
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <RefreshIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-4xl font-bold text-black dark:text-white">
                Reflection
              </h1>
            </div>

            <Button onClick={() => router.push("/reflection/new")}>
              + New Reflection
            </Button>
          </div>

          <p className="text-lg max-w-2xl text-black dark:text-white">
            Reflection is where learning becomes measurable growth.
          </p>
        </div>

        {/* Empty State */}
        {reflections.length === 0 ? (
          <div className="flex justify-center mt-14">
            <MagicCard
              className="p-[1px] rounded-xl w-full"
              gradientColor="rgba(59,130,246,0.6)"
            >
              <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl rounded-xl border border-white/10 px-10 py-12 text-center">
                <LibraryIcon className="w-10 h-10 mx-auto mb-5 text-blue-400 opacity-80" />
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  No reflections yet
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-7">
                  Start recording structured learning from your outcomes.
                </p>
                <Button onClick={() => router.push("/reflection/new")}>
                  + Add First Reflection
                </Button>
              </div>
            </MagicCard>
          </div>
        ) : (
          <div className="space-y-6">
            {reflections.map((ref) => (
              <div
                key={ref.id}
                onClick={() => router.push(`/reflection/${ref.id}`)}
                className="cursor-pointer hover:scale-[1.02] transition"
              >
                <MagicCard
                  className="p-[1px] rounded-xl"
                  gradientColor="rgba(59,130,246,0.6)"
                >
                  <div className="p-6 bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl rounded-xl border border-white/10">

                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-black dark:text-white">
                        {ref.title}
                      </h3>

                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          outcomeColors[ref.outcome] || ""
                        }`}
                      >
                        {ref.outcome}
                      </span>
                    </div>

                    {/* Lesson Preview */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <p className="text-sm italic line-clamp-2">
                          "{ref.lesson}"
                        </p>
                      </div>
                    </div>

                    {/* Growth Indicators */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">

                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span>
                          Confidence {ref.confidenceDelta >= 0 ? "+" : ""}
                          {ref.confidenceDelta}
                        </span>
                        <span>
                          Emotion {ref.emotionBefore} → {ref.emotionAfter}
                        </span>
                      </div>

                      <span>{ref.date}</span>
                    </div>

                  </div>
                </MagicCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}