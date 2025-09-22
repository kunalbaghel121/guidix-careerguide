"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  GraduationCap,
  ArrowLeft,
  Check,
  Sparkles,
  Stars,
  Zap,
} from "lucide-react";

export default function EducationLevelPage() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("first");
  const [hoveredYear, setHoveredYear] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleContinue = () => {
    router.push(
      `/resume-builder/ai-generator/field-selection?education=${selectedYear}`
    );
  };

  const yearOptions = [
    {
      id: "first",
      title: "1st Year",
      subtitle: "Just getting started!",
      emoji: "🌱"
    },
    {
      id: "second",
      title: "2nd Year",
      subtitle: "Building momentum",
      emoji: "🚀"
    },
    {
      id: "third",
      title: "3rd Year",
      subtitle: "Getting serious",
      emoji: "⚡"
    },
    {
      id: "fourth",
      title: "4th Year",
      subtitle: "Ready to graduate!",
      emoji: "🎓"
    },
  ];

  return (
    <DashboardLayout>
      <div className="h-screen flex items-center justify-center py-4" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border p-4 lg:p-6"
            style={{ borderColor: "#e2e8f0", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg" style={{background: 'linear-gradient(135deg, #2370FF, #1d4ed8)'}}>
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Stars className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h1
                  className="text-2xl lg:text-3xl font-black"
                  style={{ color: "#2370FF" }}
                >
                  What year u reppin?
                </h1>
                <p
                  className="text-base lg:text-lg font-semibold leading-relaxed max-w-2xl mx-auto"
                  style={{ color: "#475569" }}
                >
                  Tell us where you're at so we can craft a resume that{" "}
                  <span style={{ color: "#2370FF" }} className="font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    hits different
                  </span>
                  <span className="inline-block ml-2">
                    <Sparkles className="w-4 h-4 text-yellow-400 inline animate-bounce" />
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl mx-auto mt-8">
              {yearOptions.map((year) => {
                const isSelected = selectedYear === year.id;
                const isHovered = hoveredYear === year.id;
                
                return (
                  <div
                    key={year.id}
                    onClick={() => setSelectedYear(year.id)}
                    onMouseEnter={() => setHoveredYear(year.id)}
                    onMouseLeave={() => setHoveredYear(null)}
                    className="group cursor-pointer"
                  >
                    <div
                      className={`bg-gradient-to-br rounded-2xl border-2 transition-all duration-300 p-6 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-1 relative ${
                        isSelected
                          ? "from-blue-50 to-purple-50/50 shadow-xl"
                          : "from-white to-blue-50/50"
                      }`}
                      style={{
                        borderColor: isSelected || isHovered ? "#2370FF" : "#e2e8f0",
                        boxShadow: isSelected || isHovered 
                          ? "0 25px 50px -12px rgba(35, 112, 255, 0.25)" 
                          : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        background: isSelected 
                          ? "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
                          : isHovered 
                            ? "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)"
                            : "linear-gradient(135deg, #ffffff 0%, #f0f9ff 20%)"
                      }}
                    >
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="w-6 h-6 rounded-full text-white flex items-center justify-center shadow-md animate-in fade-in duration-300" style={{ backgroundColor: "#2370FF" }}>
                            <Check className="w-3 h-3" />
                          </div>
                        </div>
                      )}

                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
                          isSelected ? "text-white" : ""
                        }`}
                        style={{
                          background: isSelected
                            ? "linear-gradient(135deg, #2370FF, #1d4ed8)"
                            : "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                          color: isSelected ? "white" : "#2370FF"
                        }}
                      >
                        <span className="text-xl">{year.emoji}</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-3">
                        <h3
                          className="text-lg font-black"
                          style={{ color: "#2370FF" }}
                        >
                          {year.title}
                        </h3>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      <p
                        className="text-sm font-medium leading-relaxed"
                        style={{ color: "#475569" }}
                      >
                        {year.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <Link
                href="/resume-builder/ai-generator"
                onMouseEnter={() => setHoveredButton('back')}
                onMouseLeave={() => setHoveredButton(null)}
                className="px-8 py-4 rounded-xl font-medium border-2 transition-all duration-300 flex items-center gap-3 text-sm group hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  backgroundColor: hoveredButton === 'back' ? "#f0f9ff" : "#f8fafc",
                  borderColor: hoveredButton === 'back' ? "#2370FF" : "#e2e8f0",
                  color: hoveredButton === 'back' ? "#2370FF" : "#475569",
                }}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Vibe Selection</span>
              </Link>

              <button
                onClick={handleContinue}
                onMouseEnter={() => setHoveredButton('continue')}
                onMouseLeave={() => setHoveredButton(null)}
                className="text-white px-8 py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 text-lg hover:scale-105 hover:-translate-y-0.5"
                style={{ 
                  background: hoveredButton === 'continue' 
                    ? "linear-gradient(135deg, #1d4ed8, #1e40af)" 
                    : "linear-gradient(135deg, #2370FF, #1d4ed8)",
                  boxShadow: hoveredButton === 'continue'
                    ? "0 10px 15px -3px rgba(35, 112, 255, 0.3)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              >
                Let's Build This Resume
                <Sparkles className="w-5 h-5 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}