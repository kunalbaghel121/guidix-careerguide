"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Brain, Zap, Target, CheckCircle, Sparkles, FileText, TrendingUp } from "lucide-react";

export default function AnalyzingResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const field = searchParams.get("field") || "";
  const education = searchParams.get("education") || "";
  const filename = searchParams.get("filename") || "your-resume.pdf";

  const analysisSteps = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Reading your resume...",
      subtitle: "Parsing through your content",
      duration: 1000
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI analyzing content...",
      subtitle: "Understanding your experience",
      duration: 1500
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Checking ATS compatibility...",
      subtitle: "Making sure robots love you",
      duration: 1200
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Identifying improvements...",
      subtitle: "Finding areas to level up",
      duration: 1000
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Generating insights...",
      subtitle: "Creating your review",
      duration: 800
    }
  ];

  useEffect(() => {
    let totalDuration = 0;
    const intervals = [];

    analysisSteps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index);
      }, totalDuration);

      intervals.push(timer);
      totalDuration += step.duration;
    });

    // Progress bar animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          // Navigate to review page after completion
          setTimeout(() => {
            router.push(`/resume-review?field=${field}&education=${education}&filename=${encodeURIComponent(filename)}`);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      intervals.forEach(clearTimeout);
      clearInterval(progressTimer);
    };
  }, [router, field, education, filename]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-400 rounded-full filter blur-xl opacity-30 animate-ping"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400 rounded-full filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-40 w-24 h-24 bg-pink-400 rounded-full filter blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 right-40 w-12 h-12 bg-indigo-400 rounded-full filter blur-xl opacity-50 animate-ping animation-delay-1000"></div>

        {/* Matrix-like rain effect */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-xs font-mono animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Brain className="h-12 w-12 text-white animate-bounce" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                <Sparkles className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Analyzing Your Resume
            </span>
            <span className="animate-pulse">...</span>
          </h1>

          <p className="text-xl text-gray-300 mb-2">
            Our AI is working its magic ✨
          </p>
          <p className="text-lg text-gray-400">
            Reviewing: <span className="text-blue-400 font-semibold">{decodeURIComponent(filename)}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-blue-400 font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Analysis Steps */}
        <div className="space-y-6">
          {analysisSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                index === currentStep
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 scale-105'
                  : index < currentStep
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-gray-800/30 border border-gray-700/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                index === currentStep
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse'
                  : index < currentStep
                  ? 'bg-green-500'
                  : 'bg-gray-700'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <div className={index === currentStep ? 'text-white animate-bounce' : 'text-gray-400'}>
                    {step.icon}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className={`font-semibold transition-colors duration-500 ${
                  index === currentStep
                    ? 'text-white'
                    : index < currentStep
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm transition-colors duration-500 ${
                  index === currentStep
                    ? 'text-gray-300'
                    : index < currentStep
                    ? 'text-green-300'
                    : 'text-gray-500'
                }`}>
                  {step.subtitle}
                </p>
              </div>

              {index === currentStep && (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fun Facts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-sm font-medium text-white">Powered by AI</div>
            <div className="text-xs text-gray-400">Next-gen analysis</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-medium text-white">Lightning Fast</div>
            <div className="text-xs text-gray-400">Results in seconds</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-medium text-white">Precision Built</div>
            <div className="text-xs text-gray-400">Tailored insights</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes matrix-rain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .animate-matrix-rain {
          animation: matrix-rain linear infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}