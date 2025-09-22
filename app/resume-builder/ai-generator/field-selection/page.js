"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Monitor,
  Radio,
  Settings,
  Building,
  Zap,
  FlaskConical,
  Plane,
  Dna,
  Brain,
  Shield,
  BarChart3,
  Heart,
  ArrowLeft,
  Check,
  Target
} from "lucide-react";

const mainEngineeringBranches = [
  { id: "cse", name: "Computer Science & Engineering", icon: Monitor, description: "Software development, algorithms, programming" },
  { id: "ece", name: "Electronics & Communication", icon: Radio, description: "Electronics, telecommunications, circuits" },
  { id: "mechanical", name: "Mechanical Engineering", icon: Settings, description: "Machines, manufacturing, design" },
  { id: "civil", name: "Civil Engineering", icon: Building, description: "Construction, infrastructure, planning" },
  { id: "electrical", name: "Electrical Engineering", icon: Zap, description: "Power systems, electrical circuits" },
  { id: "chemical", name: "Chemical Engineering", icon: FlaskConical, description: "Chemical processes, production" },
  { id: "aerospace", name: "Aerospace Engineering", icon: Plane, description: "Aircraft, spacecraft design" },
  { id: "biotechnology", name: "Biotechnology", icon: Dna, description: "Bio-tech, pharmaceuticals" },
  { id: "ai-ml", name: "AI & Machine Learning", icon: Brain, description: "Artificial intelligence, machine learning" },
  { id: "cybersecurity", name: "Cybersecurity", icon: Shield, description: "Network security, ethical hacking" },
  { id: "data-science", name: "Data Science", icon: BarChart3, description: "Big data, analytics, statistics" },
  { id: "biomedical", name: "Biomedical Engineering", icon: Heart, description: "Medical devices, healthcare technology" }
];

export default function FieldSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedField, setSelectedField] = useState("cse");
  const [educationLevel, setEducationLevel] = useState("");

  useEffect(() => {
    const education = searchParams.get("education");
    if (education) {
      setEducationLevel(education);
    }
  }, [searchParams]);

  const handleContinue = () => {
    router.push(`/resume-choice?field=${selectedField}&education=${educationLevel}`);
  };


  return (
    <DashboardLayout>
      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 w-full">

          {/* Engineering Field Selection */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">

            <div className="text-center space-y-4 mb-8">
              <div className="w-12 h-12 rounded-full mx-auto bg-blue-600 text-white flex items-center justify-center">
                <Target size={20} />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Select Your Engineering Branch
                </h1>
                <p className="text-sm text-gray-600">
                  Choose your field of specialization
                </p>
              </div>

              {educationLevel && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                  {educationLevel === "first" ? "1st Year" : educationLevel === "second" ? "2nd Year" : educationLevel === "third" ? "3rd Year" : "4th Year"}
                </div>
              )}
            </div>

            {/* Main Branches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {mainEngineeringBranches.map((field) => {
                const IconComponent = field.icon;
                return (
                  <div
                    key={field.id}
                    onClick={() => setSelectedField(field.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedField === field.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Selection Indicator */}
                    {selectedField === field.id && (
                      <div className="flex justify-end mb-3">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        selectedField === field.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <IconComponent size={20} />
                      </div>

                      <div className="space-y-1">
                        <h3 className={`font-medium text-sm leading-tight ${
                          selectedField === field.id ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {field.name}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {field.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-3">
              <Link
                href="/resume-builder/ai-generator/education"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </Link>

              <button
                onClick={handleContinue}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}