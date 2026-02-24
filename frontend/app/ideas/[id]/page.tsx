"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { PageLayout } from "../../community/PageLayout";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import { apiFetch } from "../../lib/api";
import IdeaTimeline from "../../components/IdeaTimeline";
import ShareButton from "../../components/ShareButton";
import HeartIcon from "@/components/ui/heart-icon";
import { Share2, Link2, Twitter, Linkedin, MessageCircle, Facebook, Check } from "lucide-react";


interface Idea {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface LikeData {
  [ideaId: number]: {
    count: number;
    liked: boolean;
  };
}

export default function IdeaDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState<LikeData>({});
  const [liking, setLiking] = useState(false);

  // Load likes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("echoroom_likes");
    if (stored) {
      try {
        setLikes(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse likes", e);
      }
    }
  }, []);

  // Save likes to localStorage
  const saveLikes = useCallback((newLikes: LikeData) => {
    setLikes(newLikes);
    localStorage.setItem("echoroom_likes", JSON.stringify(newLikes));
  }, []);

  // Handle like toggle
  const handleLike = () => {
    if (!idea || liking) return;
    setLiking(true);
    const ideaId = idea.id;
    const currentLike = likes[ideaId] || { count: 0, liked: false };
    const newLikeState = !currentLike.liked;
    const newCount = newLikeState ? currentLike.count + 1 : Math.max(0, currentLike.count - 1);
    
    const newLikes = {
      ...likes,
      [ideaId]: {
        count: newCount,
        liked: newLikeState,
      },
    };
    saveLikes(newLikes);
    setLiking(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Check out this idea on EchoRoom: ${idea?.title}`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this idea on EchoRoom: ${idea?.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  useEffect(() => {
    if (!id) return;

    const fetchIdea = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await apiFetch<Idea>(`/ideas/${id}`);
        setIdea(data);

      } catch (err: any) {
        setError(err.message || "Failed to load idea");
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <LoadingState message="Loading idea..." />
      </PageLayout>
    );
  }

  if (error || !idea) {
    return (
      <PageLayout>
        <ErrorState message={error || "Idea not found"} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="section max-w-3xl">

        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">
            {idea.title}
          </h1>
          <ShareButton title={idea.title} description={idea.description} type="idea" />
        </div>

        <p className="text-gray-600 mb-6">
          {idea.description}
        </p>

        <div className="text-sm text-gray-400 mb-6 flex items-center justify-between">
          <span>Status: {idea.status}</span>
          <button
            onClick={handleLike}
            disabled={liking}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              (likes[idea.id]?.liked ?? false)
                ? "text-red-500 bg-red-500/10 border border-red-500/20"
                : "text-gray-400 hover:text-red-500 hover:bg-red-500/10 border border-transparent"
            }`}
            title={(likes[idea.id]?.liked ?? false) ? "Unlike this idea" : "Like this idea"}
          >
            <HeartIcon 
              filled={(likes[idea.id]?.liked ?? false)} 
              className="w-5 h-5" 
            />
            <span className="text-sm font-medium">
              {(likes[idea.id]?.count ?? 0)}
            </span>
          </button>
        </div>

        {/* Share Section */}
        <div className="flex flex-col gap-4 mb-10 p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <Share2 className="w-4 h-4 text-blue-500" />
            Share This Idea
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${copied ? 'border-green-500 bg-green-50 text-green-600 dark:bg-green-500/10' : 'border-gray-200 hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:text-gray-300'}`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={handleShareTwitter}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-sky-400 hover:text-sky-500 dark:border-white/10 dark:text-gray-300 transition-all duration-200"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </button>
            <button
              onClick={handleShareLinkedIn}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-blue-600 hover:text-blue-700 dark:border-white/10 dark:text-gray-300 transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 dark:border-white/10 dark:text-gray-300 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={handleShareFacebook}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:text-gray-300 transition-all duration-200"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </button>
          </div>
        </div>

        {/* TIMELINE WILL GO HERE */}
       <IdeaTimeline current={idea.status} />

      </div>
    </PageLayout>
  );
}
