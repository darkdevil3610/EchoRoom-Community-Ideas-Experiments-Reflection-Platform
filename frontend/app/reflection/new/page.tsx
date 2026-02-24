"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";
import { PageLayout } from "../../community/PageLayout";
import Button from "@/app/components/ui/Button";
import { MagicCard } from "@/components/ui/magic-card";
import { RetroGrid } from "@/components/ui/retro-grid";

interface Outcome {
  id: number;
  experimentId: number;
  experimentTitle: string;
  result: string;
}

type Visibility = "private" | "public";

export default function NewReflectionPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    outcomeId: null as number | null,
    context: {
      emotionBefore: 3,
      confidenceBefore: 5,
    },
    breakdown: {
      whatHappened: "",
      whatWorked: "",
      whatDidntWork: "",
    },
    growth: {
      lessonLearned: "",
      nextAction: "",
    },
    result: {
      emotionAfter: 3,
      confidenceAfter: 5,
    },
    evidenceLink: "",
    visibility: "private" as Visibility,
  });

  useEffect(() => {
    const fetchOutcomes = async () => {
      try {
        const data = await apiFetch<Outcome[]>("/outcomes");
        setOutcomes(data);
      } catch {
        setError("Failed to load outcomes");
      }
    };
    fetchOutcomes();
  }, []);

  const validateURL = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateStep = () => {
    setError(null);

    if (step === 1) {
      if (!form.outcomeId) {
        setError("Please select an outcome before continuing.");
        return false;
      }
    }

    if (step === 3) {
      if (
        !form.breakdown.whatHappened.trim() ||
        !form.breakdown.whatWorked.trim() ||
        !form.breakdown.whatDidntWork.trim()
      ) {
        setError("All breakdown fields must be completed.");
        return false;
      }
    }

    if (step === 4) {
      if (
        !form.growth.lessonLearned.trim() ||
        !form.growth.nextAction.trim()
      ) {
        setError("Please complete all growth fields.");
        return false;
      }
    }

    if (step === 5) {
      if (!validateURL(form.evidenceLink)) {
        setError("Please enter a valid demo link URL.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setLoading(true);
      await apiFetch("/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      router.push("/reflection");
    } catch (err: any) {
      setError(err.message || "Failed to create reflection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <RetroGrid />
      </div>

      <PageLayout>
        <div className="section max-w-2xl mx-auto">

          <div className="mb-6">
            <Button
              onClick={() => router.push("/reflection")}
              className="rounded-full px-6 py-2"
            >
              ← Back to Reflections
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">
            Create New Reflection
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Structured reflection builds real growth.
          </p>

          <MagicCard
            gradientColor="rgba(59,130,246,0.6)"
            className="p-8 rounded-3xl bg-white/75 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/10 shadow-xl"
          >
            <p className="text-sm text-gray-500 mb-6">
              Step {step} of 5
            </p>

            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <label className="block text-sm font-medium">
                  Select Outcome
                </label>
                <select
                  className="w-full p-3 rounded-xl border bg-white dark:bg-zinc-950"
                  value={form.outcomeId ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, outcomeId: Number(e.target.value) })
                  }
                >
                  <option value="">Choose outcome</option>
                  {outcomes.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.experimentTitle}
                    </option>
                  ))}
                </select>

                <Button onClick={nextStep} className="w-full rounded-full py-3">
                  Next
                </Button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-semibold">Before Starting</h2>

                <div>
                  <label className="block text-sm mb-2">
                    Emotion (1–5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    className="w-full p-3 rounded-xl border"
                    value={form.context.emotionBefore}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        context: {
                          ...form.context,
                          emotionBefore: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Confidence (1–10)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="w-full p-3 rounded-xl border"
                    value={form.context.confidenceBefore}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        context: {
                          ...form.context,
                          confidenceBefore: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex justify-between">
                  <Button onClick={prevStep}>Back</Button>
                  <Button onClick={nextStep}>Next</Button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-semibold">Breakdown</h2>

                {[
                  { key: "whatHappened", label: "What happened?" },
                  { key: "whatWorked", label: "What worked?" },
                  { key: "whatDidntWork", label: "What didn’t work?" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm mb-2">
                      {field.label}
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-xl border"
                      value={(form.breakdown as any)[field.key]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          breakdown: {
                            ...form.breakdown,
                            [field.key]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}

                <div className="flex justify-between">
                  <Button onClick={prevStep}>Back</Button>
                  <Button onClick={nextStep}>Next</Button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-semibold">Growth</h2>

                <div>
                  <label className="block text-sm mb-2">
                    Lesson Learned
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-3 rounded-xl border"
                    value={form.growth.lessonLearned}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        growth: {
                          ...form.growth,
                          lessonLearned: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    What will you do differently next time?
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-3 rounded-xl border"
                    value={form.growth.nextAction}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        growth: {
                          ...form.growth,
                          nextAction: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex justify-between">
                  <Button onClick={prevStep}>Back</Button>
                  <Button onClick={nextStep}>Next</Button>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="font-semibold">After Outcome</h2>

                <div>
                  <label className="block text-sm mb-2">
                    Emotion (1–5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    className="w-full p-3 rounded-xl border"
                    value={form.result.emotionAfter}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        result: {
                          ...form.result,
                          emotionAfter: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Confidence (1–10)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="w-full p-3 rounded-xl border"
                    value={form.result.confidenceAfter}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        result: {
                          ...form.result,
                          confidenceAfter: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Experiment Demo Link (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    className="w-full p-3 rounded-xl border"
                    value={form.evidenceLink}
                    onChange={(e) =>
                      setForm({ ...form, evidenceLink: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Visibility
                  </label>
                  <select
                    className="w-full p-3 rounded-xl border"
                    value={form.visibility}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        visibility: e.target.value as Visibility,
                      })
                    }
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>

                <div className="flex justify-between">
                  <Button onClick={prevStep}>Back</Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="rounded-full px-6"
                  >
                    {loading ? "Creating..." : "Submit Reflection"}
                  </Button>
                </div>
              </div>
            )}

          </MagicCard>
        </div>
      </PageLayout>
    </>
  );
}