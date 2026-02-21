"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { PageLayout } from "@/app/community/PageLayout";
import LoadingState from "@/app/components/LoadingState";
import ErrorState from "@/app/components/ErrorState";
import Button from "@/app/components/ui/Button";
import { MagicCard } from "@/components/ui/magic-card";
interface Experiment {
  id: number;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  progress: number;
}

export default function ExperimentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiment = async () => {
      try {
        setLoading(true);
        const data = await apiFetch<Experiment>(`/experiments/${id}`);
        setExperiment(data);
      } catch (err: any) {
        setError(err.message || "Failed to load experiment");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchExperiment();
  }, [id]);

  const updateStatus = async (status: "completed" | "in-progress") => {
  if (!experiment) return;

  try {
    const updated = await apiFetch<Experiment>(`/experiments/${experiment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setExperiment(updated);

    // If completed → redirect to create outcome
    if (status === "completed") {
      router.push(`/outcomes/new?experimentId=${experiment.id}`);
    }

  } catch (err: any) {
    alert(err.message || "Failed to update status");
  }
};

  if (loading) {
    return (
      <PageLayout>
        <LoadingState message="Loading experiment..." />
      </PageLayout>
    );
  }

  if (error || !experiment) {
    return (
      <PageLayout>
        <ErrorState message={error || "Experiment not found"} />
      </PageLayout>
    );
  }

  return (
  <PageLayout>
    <div className="flex justify-center py-16">
      <MagicCard
        className="p-[1px] rounded-2xl w-full max-w-3xl"
        gradientColor="rgba(59,130,246,0.6)"
      >
        <div className="bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-10 border border-white/10 space-y-8">

          <Button onClick={() => router.push("/experiments")}>
            ← Back to Experiments
          </Button>

          <div>
            <h1 className="text-3xl font-bold mb-3">
              {experiment.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-300">
              {experiment.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-medium">
              Status:{" "}
              <span
                className={
                  experiment.status === "completed"
                    ? "text-green-500"
                    : "text-blue-400"
                }
              >
                {experiment.status}
              </span>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => updateStatus("in-progress")}
              >
                Mark In Progress
              </Button>

              <Button
                onClick={() => updateStatus("completed")}
              >
                Mark Completed
              </Button>
            </div>
          </div>

        </div>
      </MagicCard>
    </div>
  </PageLayout>
);
}