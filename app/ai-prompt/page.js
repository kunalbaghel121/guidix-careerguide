"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Bot, Sparkles, Zap, Users, Heart, Copy, GraduationCap, Monitor } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/styles/pages/ai-prompt.module.css";

export default function AIPromptInput() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userField, setUserField] = useState("");
  const [userEducation, setUserEducation] = useState("");

  const MAX_WORDS = 50;

  const wordCount = prompt.trim().split(/\s+/).filter(word => word.length > 0).length;

  const clampToWords = (text, maxWords) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text.trim();
    return words.slice(0, maxWords).join(" ") + "...";
  };

  useEffect(() => {
    const field = searchParams.get("field");
    const education = searchParams.get("education");
    if (field) setUserField(field);
    if (education) setUserEducation(education);
  }, [searchParams]);

  const getFieldData = (fieldId) => {
    const fieldMap = {
      "cse": { name: "Computer Science & Engineering", skills: ["React", "Node.js", "Python", "JavaScript", "AWS"], projects: "web applications", companies: "Infosys", location: "Bangalore" },
      "ece": { name: "Electronics & Communication", skills: ["VHDL", "MATLAB", "PCB Design", "Signal Processing", "Embedded C"], projects: "IoT devices", companies: "Texas Instruments", location: "Bangalore" },
      "mechanical": { name: "Mechanical Engineering", skills: ["SolidWorks", "AutoCAD", "ANSYS", "3D Printing", "Manufacturing"], projects: "mechanical systems", companies: "Tata Motors", location: "Pune" },
      "civil": { name: "Civil Engineering", skills: ["AutoCAD", "Staad Pro", "Project Management", "Surveying", "Construction"], projects: "infrastructure projects", companies: "L&T", location: "Mumbai" },
      "electrical": { name: "Electrical Engineering", skills: ["MATLAB", "PLC Programming", "Power Systems", "Circuit Design", "Control Systems"], projects: "power systems", companies: "BHEL", location: "Hyderabad" },
      "chemical": { name: "Chemical Engineering", skills: ["Aspen Plus", "MATLAB", "Process Design", "Safety Analysis", "Quality Control"], projects: "chemical processes", companies: "Reliance", location: "Gujarat" },
      "aerospace": { name: "Aerospace Engineering", skills: ["CATIA", "ANSYS", "Flight Dynamics", "CFD", "Avionics"], projects: "aircraft components", companies: "HAL", location: "Bangalore" },
      "biotechnology": { name: "Biotechnology", skills: ["Bioinformatics", "Cell Culture", "PCR", "Data Analysis", "Lab Techniques"], projects: "biotech research", companies: "Biocon", location: "Bangalore" },
      "ai-ml": { name: "AI & Machine Learning", skills: ["Python", "TensorFlow", "Deep Learning", "NLP", "Computer Vision"], projects: "AI models", companies: "Google", location: "Hyderabad" },
      "cybersecurity": { name: "Cybersecurity", skills: ["Ethical Hacking", "Network Security", "Penetration Testing", "Risk Assessment", "Cryptography"], projects: "security solutions", companies: "Wipro", location: "Bangalore" },
      "data-science": { name: "Data Science", skills: ["Python", "R", "SQL", "Machine Learning", "Data Visualization"], projects: "analytics dashboards", companies: "Flipkart", location: "Bangalore" },
      "biomedical": { name: "Biomedical Engineering", skills: ["Medical Devices", "Signal Processing", "Biomechanics", "CAD", "Regulatory Affairs"], projects: "medical equipment", companies: "Siemens Healthineers", location: "Mumbai" }
    };
    return fieldMap[fieldId] || fieldMap["cse"];
  };

  const generateDynamicPrompts = () => {
    const field = getFieldData(userField);
    const yearText = userEducation === "first" ? "1st Year" : userEducation === "second" ? "2nd Year" : userEducation === "third" ? "3rd Year" : "4th Year";
    const isInternship = userEducation === "first" || userEducation === "second";

    return [
      {
        title: `Quick Fill Template`,
        type: 'fillable',
        prompt: `I'm [YOUR NAME], a ${yearText} ${field.name} student from [YOUR CITY]. Contact me at [YOUR EMAIL] or [YOUR PHONE]. I'm skilled in ${field.skills.slice(0, 3).join(", ")}. I've worked on [NUMBER] projects including ${field.projects} that [YOUR ACHIEVEMENT]. Currently studying at [YOUR COLLEGE] with [YOUR CGPA] CGPA. Looking for ${isInternship ? "internship" : "full-time"} opportunities.`
      },
      {
        title: `Ready-to-Go Example`,
        type: 'complete',
        prompt: `I'm Rahul Singh, a ${yearText} ${field.name} student from ${field.location}. Contact me at rahul.singh@email.com or +91-9876543210. I'm skilled in ${field.skills.slice(0, 3).join(", ")}. I've worked on 5+ projects including ${field.projects} that improved efficiency by 30%. Currently studying at NIT Warangal with 8.5 CGPA. Looking for ${isInternship ? "internship" : "full-time"} opportunities.`
      },
      {
        title: `Achievement Focused`,
        type: 'complete',
        prompt: `I'm Sneha Patel, a ${yearText} ${field.name} student from Mumbai. Contact me at sneha.patel@email.com or +91-8765432109. I'm proficient in ${field.skills.slice(1, 4).join(", ")}. Led a team of 4 to build ${field.projects} that won college hackathon and got 50K+ downloads. Studying at VJTI Mumbai with 9.1 CGPA. Ready to bring innovation to ${isInternship ? "internship" : "full-time"} roles.`
      }
    ];
  };

  const dynamicPrompts = generateDynamicPrompts();

  const handleNext = () => {
    if (prompt.trim() && wordCount <= MAX_WORDS) {
      router.push(`/template-selection?from=ai&prompt=${encodeURIComponent(prompt)}&field=${userField}&education=${userEducation}`);
    }
  };

  const handlePrev = () => {
    router.push(`/resume-builder/ai-generator/field-selection?education=${userEducation}`);
  };

  const handleSamplePrompt = (samplePrompt) => {
    setPrompt(clampToWords(samplePrompt, MAX_WORDS));
  };

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden relative" style={{background: 'linear-gradient(135deg, #F4F8FF 0%, #E9F1FF 100%)'}}>

      {/* Subtle Background Elements (minimal) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-10 w-12 h-12 rounded-full opacity-10" style={{background: 'linear-gradient(135deg, #2370FF, #79C7FF)'}}></div>
        <div className="absolute top-20 right-16 w-10 h-10 rounded-full opacity-10" style={{background: 'linear-gradient(135deg, #79C7FF, #A3D5FF)'}}></div>
        <div className="absolute bottom-16 left-20 w-8 h-8 rounded-full opacity-10" style={{background: 'linear-gradient(135deg, #2370FF, #4F87FF)'}}></div>
        <div className="absolute bottom-20 right-10 w-10 h-10 rounded-full opacity-10" style={{background: 'linear-gradient(135deg, #A3D5FF, #C4E4FF)'}}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 h-full flex flex-col justify-center relative z-10">

        {/* Page Heading and Context */}
        <div className="text-center mb-6">
          <h1 className="text-5xl mt-25 font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pick a Vibe & Go!
          </h1>
          {userField && userEducation && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1" style={{backgroundColor: '#E9F1FF', color: '#2370FF'}}>
                <GraduationCap className="h-3 w-3" /> {userEducation === "first" ? "1st Year" : userEducation === "second" ? "2nd Year" : userEducation === "third" ? "3rd Year" : "4th Year"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1" style={{backgroundColor: '#F0F9FF', color: '#0369A1'}}>
                <Monitor className="h-3 w-3" /> {getFieldData(userField).name}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 grid grid-cols-2 gap-8 items-start">
          {/* Left Side - Examples */}
          <div className="pr-4 h-full flex flex-col justify-center">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 font-semibold">
                Tap any example to auto-fill - no typing needed!
              </p>
            </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {dynamicPrompts.map((example, index) => (
              <div
                key={index}
                onClick={() => handleSamplePrompt(example.prompt)}
                className="bg-white rounded-xl shadow-sm border border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer p-3 hover:border-blue-400 group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300" style={{background: 'linear-gradient(135deg, #2370FF, #79C7FF)'}}>
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="font-black text-sm text-gray-800 group-hover:text-blue-700 transition-colors">
                      {example.title}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed font-medium pl-10">
                    {example.type === 'fillable' ? (
                      <span>
                        <span className="bg-yellow-100 px-1 rounded">[Fill-in-the-blank]</span> {clampToWords(example.prompt, MAX_WORDS)}
                      </span>
                    ) : (
                      clampToWords(example.prompt, MAX_WORDS)
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

          {/* Right Side - Input */}
          <div className="pl-4 h-full flex flex-col justify-center">

          {/* Input Card */}
          <div className="bg-white rounded-2xl shadow-sm border-2 p-4 mb-4" style={{borderColor: '#D5E4FF', background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)', backdropFilter: 'blur(10px)'}}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5" style={{color: '#2370FF'}} />
                <span className="font-black text-base" style={{color: '#1a56db'}}>Spill the Tea!</span>
              </div>

              <div className="relative">
                <Textarea
                  placeholder="Drop your story... 'I'm [Your Name], [Your Role] from [City]...'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={8}
                  className={`w-full text-sm resize-none border-2 rounded-xl p-4 font-medium leading-relaxed transition-all duration-300 focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-500 ${
                    wordCount > MAX_WORDS
                      ? 'border-red-400 bg-red-50 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-blue-400 focus:border-transparent'
                  }`}
                  style={wordCount <= MAX_WORDS ? {backgroundColor: '#F6F7FA'} : {}}
                />
                <div className="absolute bottom-2 right-2">
                  <div className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    wordCount > MAX_WORDS
                      ? 'bg-red-100 text-red-700'
                      : wordCount > 40
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'text-blue-700'
                  }`} style={wordCount <= 40 ? {backgroundColor: '#E9F1FF'} : {}}>
                    {wordCount}/{MAX_WORDS}
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-3 border" style={{backgroundColor: '#F4F8FF', borderColor: '#D5E4FF'}}>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4" style={{color: '#1a56db'}} />
                  <span className="font-black" style={{color: '#1a56db'}}>Pro Tip:</span>
                  <span className="text-gray-600 font-semibold">Use the fill-in template to save time!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold border border-gray-300 hover:border-blue-400 hover:text-blue-700 transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!prompt.trim() || wordCount > MAX_WORDS}
              className={`px-6 py-2 text-sm font-black rounded-lg transition-all duration-300 flex items-center gap-2 ${
                !prompt.trim() || wordCount > MAX_WORDS
                  ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                  : 'text-white shadow-sm hover:shadow-md'
              }`}
              style={!prompt.trim() || wordCount > MAX_WORDS ? {} : {background: 'linear-gradient(135deg, #2370FF, #2B49C2)'}}
            >
              Build with AI
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
