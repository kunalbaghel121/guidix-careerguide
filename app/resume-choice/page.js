"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Upload, Wand2, FileText, Zap, CheckCircle, User, Brain, GraduationCap, Target } from "lucide-react";

export default function ResumeChoicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [field, setField] = useState("");
  const [education, setEducation] = useState("");

  useEffect(() => {
    const fieldParam = searchParams.get("field");
    const educationParam = searchParams.get("education");
    if (fieldParam) setField(fieldParam);
    if (educationParam) setEducation(educationParam);
  }, [searchParams]);

  const handleStartFromScratch = () => {
    router.push(`/ai-prompt?field=${field}&education=${education}&from=scratch`);
  };

  const handleUploadResume = () => {
    router.push(`/upload-resume?field=${field}&education=${education}`);
  };

  const handleBack = () => {
    router.push(`/resume-builder/ai-generator/field-selection?education=${education}`);
  };

  const getFieldDisplayName = (fieldId) => {
    const fieldMap = {
      "cse": "Computer Science & Engineering",
      "ece": "Electronics & Communication",
      "mechanical": "Mechanical Engineering",
      "civil": "Civil Engineering",
      "electrical": "Electrical Engineering",
      "chemical": "Chemical Engineering",
      "aerospace": "Aerospace Engineering",
      "biotechnology": "Biotechnology",
      "ai-ml": "AI & Machine Learning",
      "cybersecurity": "Cybersecurity",
      "data-science": "Data Science",
      "biomedical": "Biomedical Engineering"
    };
    return fieldMap[fieldId] || fieldId;
  };

  const getEducationDisplayName = (educationLevel) => {
    const educationMap = {
      "first": "1st Year",
      "second": "2nd Year",
      "third": "3rd Year",
      "fourth": "4th Year"
    };
    return educationMap[educationLevel] || educationLevel;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Choose your creation path
          </h1>


          {/* Selected Field & Education Display */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="bg-white px-4 py-2 rounded-full border border-blue-200 shadow-sm flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                {getEducationDisplayName(education)}
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full border border-purple-200 shadow-sm flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                {getFieldDisplayName(field)}
              </span>
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Start from Scratch Option */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
              selectedOption === 'scratch'
                ? 'border-blue-500 shadow-lg bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedOption('scratch')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl ring-1 ring-blue-300/40">
                <Brain className="h-9 w-9 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Start with AI
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/70 backdrop-blur rounded-lg p-3 border border-blue-100 flex items-center justify-center gap-2">
                  <Wand2 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-white/70 backdrop-blur rounded-lg p-3 border border-blue-100 flex items-center justify-center gap-2">
                  <Brain className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-white/70 backdrop-blur rounded-lg p-3 border border-blue-100 flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
              </div>

              <Button
                onClick={handleStartFromScratch}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Start with AI
              </Button>
            </CardContent>
          </Card>

          {/* Upload Resume Option */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
              selectedOption === 'upload'
                ? 'border-purple-500 shadow-lg bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => setSelectedOption('upload')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl ring-1 ring-purple-300/40">
                <Upload className="h-9 w-9 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Upload & Enhance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/70 backdrop-blur rounded-lg p-3 border border-purple-100 flex items-center justify-center gap-2">
                  <Upload className="h-4 w-4 text-purple-600" />
                </div>
                <div className="bg-white/70 backdrop-blur rounded-lg p-3 border border-purple-100 flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                </div>
                <div className="bg-white/70 backdrop-blur rounded-lg p-3 border border-purple-100 flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </div>
              </div>

              <Button
                onClick={handleUploadResume}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
              <CheckCircle className="h-5 w-5" />
              <span className="text-xl font-bold">95%</span>
            </div>
            <div className="text-xs text-gray-600 tracking-wide">Success</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="flex items-center justify-center gap-2 text-purple-600 mb-1">
              <Zap className="h-5 w-5" />
              <span className="text-xl font-bold">2 min</span>
            </div>
            <div className="text-xs text-gray-600 tracking-wide">Speed</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
              <FileText className="h-5 w-5" />
              <span className="text-xl font-bold">ATS</span>
            </div>
            <div className="text-xs text-gray-600 tracking-wide">Ready</div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleBack}
            className="bg-white border-gray-300 hover:border-blue-400 hover:text-blue-700 transition-all duration-300 gap-2 px-6 py-2 font-semibold rounded-lg shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Field Selection
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
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
