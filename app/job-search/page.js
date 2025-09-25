        "use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import JobCardNew from "@/components/JobCardNew";
import JobCardEnhanced from "@/components/JobCardEnhanced";

export default function JobSearchPage() {
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [showApplyBanner, setShowApplyBanner] = useState(false);
  const [currentApplyJobId, setCurrentApplyJobId] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [dismissedJobs, setDismissedJobs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  // const [hoveredJobId, setHoveredJobId] = useState(null);
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [showMatchDetails, setShowMatchDetails] = useState(new Set());

  const fullText = "Hey Advika! We've curated the perfect matches—Secure the bag!";

  useEffect(() => {
    let currentIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
      }
    }, 80);

    return () => clearInterval(typewriterInterval);
  }, []);

  // Enhanced job data with match scores and AI insights
  const allJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Flipkart",
      companyType: "E-commerce · Technology · Public Company",
      location: "Bangalore",
      remote: true,
      type: "Full-time",
      level: "Senior Level, 4-6 Years",
      salary: "₹25-35 LPA",
      posted: "6 hours ago",
      applicants: 130,
      matchScore: 83,
      matchLabel: "Good Match",
      h1bSponsor: false,
      experienceMatch: 100,
      skillsMatch: 75,
      industryMatch: 41,
      salaryMatch: 98,
      cultureMatch: 92,
      topPercentage: 3,
      requirements: 520,
      beats: 87,
      interviewRate: 78,
      applications: 23,
      isUrgent: true,
      matchDetails: {
        experience: "Perfect match for your React experience",
        skills: "75% skills overlap: React, JavaScript, TypeScript",
        salary: "Competitive package with stock options",
        culture: "Great fit for fast-paced e-commerce environment"
      }
    },
    {
      id: 2,
      title: "React Engineer",
      company: "Zomato",
      companyType: "Food Tech · Startup · Public Company",
      location: "Gurgaon",
      remote: false,
      type: "Full-time",
      level: "Mid Level, 3-5 Years",
      salary: "₹18-28 LPA",
      posted: "5 hours ago",
      applicants: 85,
      matchScore: 89,
      matchLabel: "Excellent Match",
      h1bSponsor: false,
      experienceMatch: 90,
      skillsMatch: 91,
      industryMatch: 85,
      salaryMatch: 85,
      cultureMatch: 91,
      topPercentage: 8,
      requirements: 340,
      beats: 74,
      interviewRate: 65,
      applications: 18,
      isUrgent: false,
      matchDetails: {
        experience: "Great match for mid-level position requirements",
        skills: "91% skills overlap: React, Node.js, GraphQL",
        salary: "Within your preferred range",
        culture: "Aligns with your preference for innovation-focused teams"
      }
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "Swiggy",
      companyType: "Food Delivery · Technology · Private Company",
      location: "Hyderabad",
      remote: true,
      type: "Full-time",
      level: "Mid Level, 2-4 Years",
      salary: "₹15-25 LPA",
      posted: "1 day ago",
      applicants: 203,
      matchScore: 84,
      matchLabel: "Good Match",
      h1bSponsor: false,
      experienceMatch: 85,
      skillsMatch: 87,
      industryMatch: 79,
      salaryMatch: 79,
      cultureMatch: 86,
      topPercentage: 12,
      requirements: 280,
      beats: 69,
      interviewRate: 58,
      applications: 31,
      isUrgent: false,
      matchDetails: {
        experience: "Good fit for full-stack role transition",
        skills: "87% overlap: React, Python, MongoDB",
        salary: "Meets salary expectations for experience level",
        culture: "Matches your interest in scalable systems"
      }
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "PhonePe",
      companyType: "FinTech · Payments · Private Company",
      location: "Mumbai",
      remote: true,
      type: "Full-time",
      level: "Mid Level, 3-5 Years",
      salary: "₹20-30 LPA",
      posted: "3 days ago",
      applicants: 156,
      matchScore: 78,
      matchLabel: "Fair Match",
      h1bSponsor: false,
      experienceMatch: 70,
      skillsMatch: 82,
      industryMatch: 65,
      salaryMatch: 71,
      cultureMatch: 81,
      topPercentage: 18,
      requirements: 195,
      beats: 54,
      interviewRate: 45,
      applications: 42,
      isUrgent: false,
      matchDetails: {
        experience: "Good match for fintech experience",
        skills: "82% overlap: React, CSS, HTML5",
        salary: "Competitive fintech salary range",
        culture: "Good match for product-focused teams"
      }
    },
    {
      id: 5,
      title: "JavaScript Developer",
      company: "Razorpay",
      companyType: "FinTech · Payments · Private Company",
      location: "Pune",
      remote: false,
      type: "Full-time",
      level: "Entry Level, 1-3 Years",
      salary: "₹12-18 LPA",
      posted: "1 week ago",
      applicants: 245,
      matchScore: 72,
      matchLabel: "Fair Match",
      h1bSponsor: false,
      experienceMatch: 65,
      skillsMatch: 76,
      industryMatch: 45,
      salaryMatch: 68,
      cultureMatch: 72,
      topPercentage: 25,
      requirements: 150,
      beats: 48,
      interviewRate: 38,
      applications: 67,
      isUrgent: false,
      matchDetails: {
        experience: "Good entry point for fintech career",
        skills: "76% overlap: JavaScript, React basics",
        salary: "Standard entry-level fintech package",
        culture: "Good fit for collaborative development environment"
      }
    }
  ];

  // Filter jobs with auto-filtering based on parsed resume
  const filteredJobs = useMemo(() => {
    let jobs = allJobs.filter(job => {
      if (dismissedJobs.has(job.id)) return false;
      
      if (filterBy === "remote") return job.remote;
      if (filterBy === "urgent") return job.isUrgent;
      if (filterBy === "high-match") return job.matchScore >= 85;
      
      return true;
    });

    // Sort jobs
    switch (sortBy) {
      case "match":
        jobs.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case "recent":
        jobs.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        break;
      case "salary":
        jobs.sort((a, b) => {
          const getSalaryMax = (salary) => parseInt(salary.split('-')[1].replace(/[^0-9]/g, ''));
          return getSalaryMax(b.salary) - getSalaryMax(a.salary);
        });
        break;
      default:
        jobs.sort((a, b) => b.matchScore - a.matchScore);
    }

    return jobs;
  }, [dismissedJobs, filterBy, sortBy]);

  const handleApply = (jobId) => {
    setIsLoading(true);
    setTimeout(() => {
      setAppliedJobs(prev => new Set(prev).add(jobId));
      setCurrentApplyJobId(jobId);
      setShowApplyBanner(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowApplyBanner(false);
        setCurrentApplyJobId(null);
      }, 10000);
    }, 1200);
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleDismiss = (jobId) => {
    setDismissedJobs(prev => new Set(prev).add(jobId));
  };

  const handleShare = (job) => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job: ${job.title} at ${job.company} - ${job.matchScore}% match!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${job.title} at ${job.company} - ${job.matchScore}% match! ${window.location.href}`);
    }
  };

  const handleBlock = (jobId) => {
    setDismissedJobs(prev => new Set(prev).add(jobId));
  };

  const handleAskOrion = (jobId) => {
    const job = allJobs.find(j => j.id === jobId);
    alert(`Orion says: This ${job.title} position at ${job.company} is a great match based on your skills and experience level!`);
  };

  const handleToggleMatchDetails = (jobId) => {
    setShowMatchDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return "#6366F1";
    if (score >= 80) return "#10B981";
    if (score >= 70) return "#F59E0B";
    return "#EF4444";
  };

  const getMatchScoreBg = (score) => {
    if (score >= 90) return "#EEF2FF";
    if (score >= 80) return "#ECFDF5";
    if (score >= 70) return "#FEF3C7";
    return "#FEE2E2";
  };

  const getMatchLabel = (score) => {
    if (score >= 90) return "Perfect Match";
    if (score >= 80) return "Excellent Match";
    if (score >= 70) return "Good Match";
    return "Fair Match";
  };

  // Enhanced Job Card Component
  const EnhancedJobCard = ({ job, onApply, onSave, onBlock, onAskOrion, isApplied, isSaved }) => {
    const isShowingMatchDetails = showMatchDetails.has(job.id);
    return (
      <div
        className="bg-white rounded-2xl border shadow-sm"
        style={{ borderColor: "#E5E7EB" }}
      >
        {/* Urgent Badge */}
        {job.isUrgent && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium z-10">
            🔥 Urgent
          </div>
        )}

        <div className="p-6">
          <div>
            {!isShowingMatchDetails ? (
              <>
                {/* Normal Card Content */}
                {/* Top Section: Job Info + Match Score */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                {/* Time and Early Applicant Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-gray-500">{job.posted}</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">
                    Be an early applicant
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h3>

                {/* Company Info */}
                <div className="text-gray-600 mb-4">
                  <span className="font-medium">{job.company}</span>
                  <span className="mx-1">/</span>
                  <span>{job.companyType}</span>
                </div>

                {/* Location and Job Details */}
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💼</span>
                    <span>{job.type}</span>         
  </div>
                  <div className="flex items-center gap-2">
                    <span>🏠</span>
                    <span>{job.remote ? "Remote" : "Onsite"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>{job.level}</span>
                  </div>
                </div>
              </div>

              {/* Match Score Section - Dark Green Card */}
              <div className="ml-6">
                <div
                  className="bg-gray-900 text-white rounded-2xl p-4 w-40 cursor-pointer transition-all duration-200 hover:bg-gray-800"
                  onClick={() => handleToggleMatchDetails(job.id)}
                >
                  {/* Match Score Circle */}
                  <div className="flex justify-center mb-3">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#10B981"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(job.matchScore / 100) * 175.929} 175.929`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {job.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Label */}
                  <div className="text-center">
                    <div className="text-sm font-bold text-white mb-1">
                      STRONG MATCH
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Applicants + Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Less than {job.applicants} applicants
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onBlock(job.id)}
                  className="p-2 rounded-lg"
                  title="Dismiss"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
                    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                
                <button
                  onClick={() => onSave(job.id)}
                  className={`p-2 rounded-lg ${
                    isSaved ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400'
                  }`}
                  title="Save Job"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 3V17L10 13L15 17V3H5Z" stroke="currentColor" strokeWidth="2" fill={isSaved ? 'currentColor' : 'none'}/>
                  </svg>
                </button>
                
                
                <button
                  onClick={() => onApply(job.id)}
                  disabled={isApplied}
                  className={`px-6 py-2 rounded-lg font-bold text-sm ${
                    isApplied
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-emerald-400 text-black'
                  }`}
                >
                  {isApplied ? 'APPLIED' : 'APPLY NOW'}
                </button>
              </div>
            </div>
              </>
            ) : (
              /* Match Details Content */
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-gray-500">{job.posted}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                        Match Analysis
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="text-gray-600 mb-4">
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>

                  {/* Match Score Section - Same as before */}
                  <div className="ml-6">
                    <div
                      className="bg-gray-900 text-white rounded-2xl p-4 w-40 cursor-pointer transition-all duration-200 hover:bg-gray-800"
                      onClick={() => handleToggleMatchDetails(job.id)}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="relative w-16 h-16">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="rgba(255,255,255,0.2)"
                              strokeWidth="4"
                              fill="none"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="#10B981"
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={`${(job.matchScore / 100) * 175.929} 175.929`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-white">
                              {job.matchScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-white mb-1">
                          STRONG MATCH
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Skills Match</span>
                      <span className="text-sm font-bold text-green-600">{job.skillsMatch}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{width: `${job.skillsMatch}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{job.matchDetails.skills}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Experience Match</span>
                      <span className="text-sm font-bold text-blue-600">{job.experienceMatch}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{width: `${job.experienceMatch}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{job.matchDetails.experience}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Salary Match</span>
                      <span className="text-sm font-bold text-purple-600">{job.salaryMatch}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{width: `${job.salaryMatch}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{job.matchDetails.salary}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Culture Match</span>
                      <span className="text-sm font-bold text-orange-600">{job.cultureMatch}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{width: `${job.cultureMatch}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{job.matchDetails.culture}</p>
                  </div>
                </div>

                {/* Overall Match Insights */}
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-2">🎯 Match Insights</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">You beat</span>
                      <span className="font-bold text-indigo-600 ml-1">{job.beats}%</span>
                      <span className="text-gray-600"> of applicants</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interview rate:</span>
                      <span className="font-bold text-green-600 ml-1">{job.interviewRate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Top</span>
                      <span className="font-bold text-purple-600 ml-1">{job.topPercentage}%</span>
                      <span className="text-gray-600"> candidate</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Requirements met:</span>
                      <span className="font-bold text-blue-600 ml-1">{job.requirements}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Less than {job.applicants} applicants
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onBlock(job.id)}
                      className="p-2 rounded-lg"
                      title="Dismiss"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
                        <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>

                    <button
                      onClick={() => onSave(job.id)}
                      className={`p-2 rounded-lg ${
                        isSaved ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400'
                      }`}
                      title="Save Job"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 3V17L10 13L15 17V3H5Z" stroke="currentColor" strokeWidth="2" fill={isSaved ? 'currentColor' : 'none'}/>
                      </svg>
                    </button>

                    <button
                      onClick={() => onApply(job.id)}
                      disabled={isApplied}
                      className={`px-6 py-2 rounded-lg font-bold text-sm ${
                        isApplied
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : 'bg-emerald-400 text-black'
                      }`}
                    >
                      {isApplied ? 'APPLIED' : 'APPLY NOW'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  };

  // Loading states for engaging UX
  const LoadingCard = () => (
    <div className="animate-pulse bg-white rounded-2xl shadow-sm border p-6" style={{ borderColor: "#E5E7EB" }}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                   
<div className="flex gap-4 mb-4">
            <div className="h-12 bg-gray-200 rounded-lg w-20"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-20"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-20"></div>
          </div>
        </div>
        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <div className="h-12 bg-gray-200 rounded-xl flex-1"></div>
        <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
        <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
        <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Apply Banner */}
        {showApplyBanner && currentApplyJobId && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg border-2 border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800">Application Submitted!</h3>
                  <p className="text-green-600">Did you apply? Bet!</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  onClick={() => setShowApplyBanner(false)}
                >
                  Yes
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  onClick={() => setShowApplyBanner(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl"></div>
          <div className="relative z-10 space-y-6">
            <div className="relative">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {typewriterText}
                <span
                  className="inline-block w-1 ml-2 bg-indigo-600"
                  style={{
                    animation: "blink 1s infinite",
                    opacity: showCursor ? 1 : 0,
                    transition: "opacity 0.1s ease-in-out"
                  }}
                >
                  |
                </span>
              </h1>
            </div>

            <div className="w-32 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AI analyzed 500+ requirements and these jobs hit different
            </p>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Updated 3 hours ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-gray-600">Auto-filtered from resume</span>
              </div>
            </div>

            <div className="absolute -top-4 right-8 text-6xl opacity-20">
              🎯
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>

        {/* Filters and Sort */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setFilterBy("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterBy === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Jobs ({filteredJobs.length})
              </button>
              <button
                onClick={() => setFilterBy("high-match")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterBy === "high-match"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🎯 85%+ Match
              </button>
              <button
                onClick={() => setFilterBy("remote")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterBy === "remote"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🏠 Remote
              </button>
              <button
                onClick={() => setFilterBy("urgent")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterBy === "urgent"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🔥 Urgent Hiring
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="match">Match Score</option>
                <option value="recent">Most Recent</option>
                <option value="salary">Highest Salary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Results */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Perfect Matches ({filteredJobs.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Beats {filteredJobs.length > 0 ? Math.max(...filteredJobs.map(j => j.beats)) : 0}% of jobs
                </div>
              </div>
              
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <EnhancedJobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onSave={handleSaveJob}
                    onBlock={handleBlock}
                    onAskOrion={handleAskOrion}
                    isApplied={appliedJobs.has(job.id)}
                    isSaved={savedJobs.has(job.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No matches found
              </h3>
              <p className="text-gray-600 mb-6">
                All jobs have been dismissed – we got you
              </p>
              <button
                onClick={() => setDismissedJobs(new Set())}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold  transition-colors"
              >
                Show all jobs
              </button>
            </div>
          )}
        </div>

        {/* AI Insights Footer */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl">
              🤖
            </div>
            <h2 className="text-2xl font-bold text-indigo-900">
              AI Insights – Understanding the assignment
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  👤
                </div>
                <h3 className="font-bold text-gray-900">Profile Analysis</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Based on your resume, skills, and preferences to find the perfect career fit
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  📊
                </div>
                <h3 className="font-bold text-gray-900">Market Intelligence</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Real-time job market data, salary trends, and demand insights
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  🎯
                </div>
                <h3 className="font-bold text-gray-900">Success Prediction</h3>
              </div>
              <p className="text-gray-600 text-sm">
                ML-powered match scoring and interview rate predictions
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/50 rounded-xl border border-indigo-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">AI is actively learning from your preferences</span>
              </div>
              <span className="text-indigo-600 font-medium">
                {filteredJobs.length} perfect matches found
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
            <div className="text-2xl font-bold text-indigo-600 mb-1">
              {filteredJobs.filter(j => j.matchScore >= 90).length}
            </div>
            <div className="text-gray-600 text-sm">Perfect Matches</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {filteredJobs.filter(j => j.isUrgent).length}
            </div>
            <div className="text-gray-600 text-sm">Urgent Jobs</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {filteredJobs.filter(j => j.remote).length}
            </div>
            <div className="text-gray-600 text-sm">Remote Jobs</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {appliedJobs.size}
            </div>
            <div className="text-gray-600 text-sm">Applications Sent</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}