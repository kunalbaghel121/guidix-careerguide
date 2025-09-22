"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Star,
  Sparkles,
  Flame,
  Award
} from "lucide-react";

export default function ResumeReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [animationComplete, setAnimationComplete] = useState(false);

  const field = searchParams.get("field") || "";
  const education = searchParams.get("education") || "";
  const filename = searchParams.get("filename") || "your-resume.pdf";

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Mock analysis results with Gen Z language
  const analysisResults = {
    overallScore: 78,
    atsScore: 85,
    strengths: [
      {
        icon: <Flame className="h-5 w-5" />,
        title: "Your skills section is absolutely fire! 🔥",
        description: "Listed all the right tech stacks that recruiters are thirsting for",
        impact: "High"
      },
      {
        icon: <Award className="h-5 w-5" />,
        title: "Experience section hits different 👑",
        description: "Those project descriptions are chef's kiss - very detailed and impressive",
        impact: "High"
      },
      {
        icon: <Star className="h-5 w-5" />,
        title: "Contact info is clean AF ✨",
        description: "Professional email and phone number - no red flags here bestie",
        impact: "Medium"
      }
    ],
    improvements: [
      {
        icon: <AlertTriangle className="h-5 w-5" />,
        title: "Missing some keywords that would make ATS bots go brr 🤖",
        description: "Add more industry buzzwords to get past the robot gatekeepers",
        impact: "High",
        fix: "We'll sprinkle in some keyword magic"
      },
      {
        icon: <TrendingUp className="h-5 w-5" />,
        title: "Achievements need more flex energy 💪",
        description: "Numbers and metrics make recruiters go 'periodt' - add more of those",
        impact: "Medium",
        fix: "We'll quantify your wins"
      },
      {
        icon: <Target className="h-5 w-5" />,
        title: "Format could be more aesthetic 🎨",
        description: "Current layout is giving 2010 vibes - let's make it more modern",
        impact: "Medium",
        fix: "Fresh templates incoming"
      }
    ],
    quickFacts: [
      { label: "Reading Time", value: "6 seconds", emoji: "👀" },
      { label: "ATS Score", value: "85/100", emoji: "🤖" },
      { label: "Vibe Check", value: "Professional", emoji: "✨" },
      { label: "Improvement Potential", value: "High", emoji: "📈" }
    ]
  };

  const handleContinue = () => {
    router.push(`/template-selection?from=upload&field=${field}&education=${education}&filename=${encodeURIComponent(filename)}`);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreEmoji = (score) => {
    if (score >= 90) return "🔥";
    if (score >= 80) return "✨";
    if (score >= 70) return "👍";
    if (score >= 60) return "🤔";
    return "😅";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
              <Eye className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Resume Review is Here! 📊
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Your resume analysis just dropped and it's giving main character energy ✨
          </p>
          <div className="bg-white px-4 py-2 rounded-full border border-purple-200 shadow-sm inline-block">
            <span className="text-sm font-medium text-purple-700">
              📄 {decodeURIComponent(filename)}
            </span>
          </div>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 shadow-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {analysisResults.overallScore}
              </div>
              <div className="text-4xl">{getScoreEmoji(analysisResults.overallScore)}</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Resume Score
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {analysisResults.overallScore >= 80
                ? "This resume is absolutely sending! Just needs a few tweaks to be perfect 💅"
                : analysisResults.overallScore >= 60
                ? "Solid foundation bestie! Let's add some spice to make it pop off 🌶️"
                : "No worries babe, we're about to give this a complete glow-up! ✨"
              }
            </p>
            <div className="grid grid-cols-4 gap-4">
              {analysisResults.quickFacts.map((fact, index) => (
                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg mb-1">{fact.emoji}</div>
                  <div className="font-semibold text-gray-800 text-sm">{fact.value}</div>
                  <div className="text-xs text-gray-600">{fact.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="shadow-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <ThumbsUp className="h-5 w-5" />
                What's Absolutely Slaying 💅
              </CardTitle>
              <CardDescription>
                These parts of your resume are giving main character energy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResults.strengths.map((strength, index) => (
                <div
                  key={index}
                  className={`p-4 bg-white rounded-lg border border-green-200 transition-all duration-500 ${
                    animationComplete ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      {strength.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-800 mb-1">{strength.title}</h4>
                      <p className="text-sm text-green-700 mb-2">{strength.description}</p>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {strength.impact} Impact
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Improvements */}
          <Card className="shadow-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Zap className="h-5 w-5" />
                Glow-Up Opportunities 🌟
              </CardTitle>
              <CardDescription>
                Small tweaks that'll make your resume absolutely iconic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResults.improvements.map((improvement, index) => (
                <div
                  key={index}
                  className={`p-4 bg-white rounded-lg border border-orange-200 transition-all duration-500 ${
                    animationComplete ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${(index + 3) * 200}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                      {improvement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-800 mb-1">{improvement.title}</h4>
                      <p className="text-sm text-orange-700 mb-2">{improvement.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-orange-300 text-orange-700">
                          {improvement.impact} Impact
                        </Badge>
                        <span className="text-xs text-green-600 font-medium">
                          ✨ {improvement.fix}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ATS Compatibility */}
        <Card className="mb-8 shadow-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">ATS Compatibility Check 🤖</h3>
                <p className="text-blue-700">
                  How well your resume vibes with applicant tracking systems
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {analysisResults.atsScore}/100
                </div>
                <p className="text-sm text-blue-600">
                  {analysisResults.atsScore >= 80 ? "Robots are obsessed! 🤖💕" : "Needs some robot-friendly tweaks"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${analysisResults.atsScore}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="shadow-2xl border-2 border-purple-300 bg-gradient-to-r from-purple-100 to-pink-100">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Ready to Serve Looks? 💅✨
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Let's pick a template that'll make recruiters say "period!" and give your content the glow-up it deserves
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-semibold text-gray-800 text-sm">Modern Templates</div>
                <div className="text-xs text-gray-600">That hit different</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold text-gray-800 text-sm">AI Enhanced</div>
                <div className="text-xs text-gray-600">Smart improvements</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-semibold text-gray-800 text-sm">ATS Optimized</div>
                <div className="text-xs text-gray-600">Robot approved</div>
              </div>
            </div>

            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Let's Glow Up This Resume!
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>

            <p className="text-sm text-gray-600 mt-4">
              Time to make this resume absolutely iconic bestie! 💎
            </p>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}