"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Users, Search, Brain, Star } from "lucide-react";
import styles from "@/app/styles/pages/home.module.css";

export default function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Resume Builder",
      description: "Generate professional resumes with intelligent suggestions"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Job Search & Tracking",
      description: "Find opportunities and track your applications"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Mock Interviews",
      description: "Practice with AI to ace your next interview"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "LinkedIn Optimization",
      description: "Enhance your professional profile visibility"
    }
  ];

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  const handleResumeBuilder = () => {
    router.push("/resume-builder");
  };

  if (!isLoaded) {
    return (
      <div className={styles.container}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className={styles.title}>
            Resume Builder Pro ✨
          </h1>
          <p className={styles.subtitle}>
            Build stunning resumes, track jobs, practice interviews, and land your dream career with AI-powered tools
          </p>
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>🎉 Ready to Build Your Perfect Resume?</h3>
            <p className={styles.ctaDescription}>
              Join thousands who've landed their dream jobs with our AI-powered platform
            </p>
            <div className={styles.ctaButtons}>
              <Button
                onClick={handleGetStarted}
                className={styles.primaryButton}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleResumeBuilder}
                className={styles.secondaryButton}
              >
                Build Resume Now
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
