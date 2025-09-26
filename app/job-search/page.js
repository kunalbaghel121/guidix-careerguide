'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { DashboardLayout } from "@/components/layout/dashboard-layout"

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
      teamSize: "50-100",
      linkedinUrl: "https://linkedin.com/company/flipkart",
      foundedYear: 2007,
      companyDescription: "Flipkart is India's leading e-commerce marketplace offering a wide range of products across categories like electronics, fashion, home & kitchen, and more.",
      companyLogo: "https://logo.clearbit.com/flipkart.com",
      companyWebsite: "https://www.flipkart.com/careers",
      learningOpportunities: 90,
      isUrgent: true,
      matchDetails: {
        experience: "Perfect match for your React experience",
        skills: "75% skills overlap: React, JavaScript, TypeScript",
        salary: "Competitive package with stock options",
        growth: "Great match based on where you live"
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
      teamSize: "20-50",
      linkedinUrl: "https://linkedin.com/company/zomato",
      foundedYear: 2008,
      companyDescription: "Zomato is a leading food delivery and restaurant discovery platform connecting millions of customers with restaurants across India and globally.",
      companyLogo: "https://logo.clearbit.com/zomato.com",
      companyWebsite: "https://www.zomato.com/careers",
      learningOpportunities: 95,
      isUrgent: false,
      matchDetails: {
        experience: "Great match for mid-level position requirements",
        skills: "91% skills overlap: React, Node.js, GraphQL",
        salary: "Within your preferred range",
        growth: "Great match based on where you live"      }
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
      teamSize: "100+",
      linkedinUrl: "https://linkedin.com/company/swiggy",
      foundedYear: 2014,
      companyDescription: "Swiggy is India's leading on-demand convenience platform that delivers food, groceries, and essentials to customers across 500+ cities.",
      companyLogo: "https://logo.clearbit.com/swiggy.com",
      companyWebsite: "https://careers.swiggy.com",
      learningOpportunities: 88,
      isUrgent: false,
      matchDetails: {
        experience: "Good fit for full-stack role transition",
        skills: "87% overlap: React, Python, MongoDB",
        salary: "Meets salary expectations for experience level",
        growth: "Great match based on where you live"      }
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
      teamSize: "50-100",
      linkedinUrl: "https://linkedin.com/company/phonepe",
      foundedYear: 2015,
      companyDescription: "PhonePe is India's leading digital payments platform, enabling secure and seamless transactions for millions of users across the country.",
      companyLogo: "https://logo.clearbit.com/phonepe.com",
      companyWebsite: "https://www.phonepe.com/careers",
      learningOpportunities: 85,
      isUrgent: false,
      matchDetails: {
        experience: "Good match for fintech experience",
        skills: "82% overlap: React, CSS, HTML5",
        salary: "Competitive fintech salary range",
        growth: "Great match based on where you live"      }
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
      teamSize: "20-50",
      linkedinUrl: "https://linkedin.com/company/razorpay",
      foundedYear: 2014,
      companyDescription: "Razorpay is a full-stack financial solutions company that enables businesses to accept, process and disburse payments with ease.",
      companyLogo: "https://logo.clearbit.com/razorpay.com",
      companyWebsite: "https://razorpay.com/jobs",
      learningOpportunities: 92,
      isUrgent: false,
      matchDetails: {
        experience: "Good entry point for fintech career",
        skills: "76% overlap: JavaScript, React basics",
        salary: "Standard entry-level fintech package",
        growth: "Great match based on where you live"      }
    }
  ];

const EnhancedJobCard = ({
  job,
  onApply,
  onSave,
  onBlock,
  isApplied,
  isSaved,
}) => {
  const [isHoveringMatchScore, setIsHoveringMatchScore] = useState(false)

  return (
    <div
      className="bg-gradient-to-br from-white to-blue-50 rounded-lg border border-blue-200 shadow-md relative transition-all duration-300 ease-in-out hover:shadow-lg hover:border-blue-300"
      style={{ minHeight: '220px', marginBottom: '1rem' }}
      onMouseLeave={() => setIsHoveringMatchScore(false)}
    >
      {job.isUrgent && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-medium z-10 shadow-lg animate-pulse">
          🔥 Urgent
        </div>
      )}
      <div className="p-3">
        {!isHoveringMatchScore ? (
          <>
            {/* Default content */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-gray-500 text-xs">
                  <span>{job.posted}</span>
                  <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-medium shadow-sm">
                    ⭐ Be an early applicant
                  </span>
                </div>
                <h3 className="text-lg font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-1">{job.title}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <img src={job.companyLogo} alt={`${job.company} logo`} className="w-8 h-8 rounded object-cover" />
                  <div className="text-gray-600 font-semibold text-sm">
                    <span>{job.company}</span>
                    <span className="mx-1">/</span>
                    <span>{job.companyType}</span>
                  </div>
                  <a href={job.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors" title="View LinkedIn Profile">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-gray-600 text-[11px] mb-2 line-clamp-2">{job.companyDescription}</p>
                <div className="grid grid-cols-2 gap-y-1 text-[11px] text-gray-600">
                  <div className="flex items-center gap-1"><span>📍</span><span>{job.location}</span></div>
                  <div className="flex items-center gap-1"><span>💼</span><span>{job.type}</span></div>
                  <div className="flex items-center gap-1"><span>🏠</span><span>{job.remote ? 'Remote' : 'Onsite'}</span></div>
                  <div className="flex items-center gap-1"><span>📊</span><span>{job.level}</span></div>
                </div>
              </div>
              <div className="ml-4">
                <div
                  className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl p-3 w-28 h-24 cursor-pointer transition-all duration-200 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 hover:shadow-xl relative flex flex-col items-center justify-center shadow-lg border border-emerald-300/20"
                  onMouseEnter={() => setIsHoveringMatchScore(true)}
                  onMouseLeave={() => setIsHoveringMatchScore(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>

                  {/* Circular Progress */}
                  <div className="relative flex items-center justify-center">
                    <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${(job.matchScore / 100) * 163.363} 163.363`}
                        strokeLinecap="round"
                        className="drop-shadow-sm"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-extrabold text-white drop-shadow-sm leading-none">{job.matchScore}%</span>
                    </div>
                  </div>

                  {/* Match Label Below Circle */}
                  <div className="mt-1 text-center text-white/90 font-bold text-[8px] tracking-wider uppercase drop-shadow-sm px-1">
                    {job.matchLabel}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end pt-2 border-t border-blue-100 mt-2">
              <div className="flex items-center gap-2">
                <button onClick={() => onBlock(job.id)} className="p-1.5 rounded-lg" title="Dismiss">
                  <svg width="18" height="18" fill="none" className="text-gray-400">
                    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button onClick={() => onSave(job.id)} className={`p-1.5 rounded-lg ${isSaved ? "text-yellow-500 bg-yellow-50" : "text-gray-400"}`} title="Save Job">
                  <svg width="18" height="18" fill="none">
                    <path d="M5 3V17L10 13L15 17V3H5Z" stroke="currentColor" strokeWidth="2" fill={isSaved ? "currentColor" : "none"} />
                  </svg>
                </button>
                <button onClick={() => onApply(job.id)} disabled={isApplied} className={`px-5 py-1.5 rounded-lg font-bold text-xs transition-all ${isApplied ? "bg-green-500 text-white cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105"}`}>
                  {isApplied ? "APPLIED" : "APPLY NOW"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3 min-h-[200px]">
            {/* Match details content */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                  <span>{job.posted}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                    Match Analysis
                  </span>
                </div>
                <h3 className="text-lg font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-1">{job.title}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <img src={job.companyLogo} alt={`${job.company} logo`} className="w-8 h-8 rounded object-cover" />
                  <div className="text-gray-600 font-semibold">{job.company}</div>
                  <a href={job.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors" title="View LinkedIn Profile">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-gray-600 text-[11px] mb-2 line-clamp-2">{job.companyDescription}</p>
              </div>
              <div className="ml-4">
                <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 text-white rounded-xl p-3 w-28 h-24 relative flex flex-col items-center justify-center shadow-lg border border-slate-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                  {/* Circular Progress */}
                  <div className="relative flex items-center justify-center">
                    <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${(job.matchScore / 100) * 163.363} 163.363`}
                        strokeLinecap="round"
                        className="drop-shadow-sm"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-extrabold text-white drop-shadow-sm leading-none">{job.matchScore}%</span>
                    </div>
                  </div>

                  {/* Match Label Below Circle */}
                  <div className="mt-1 text-center text-white/90 font-bold text-[8px] tracking-wider uppercase drop-shadow-sm px-1">
                    {job.matchLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Skills Match", value: job.skillsMatch, color: "green", desc: job.matchDetails.skills },
                { label: "Experience Match", value: job.experienceMatch, color: "blue", desc: job.matchDetails.experience },
                { label: "Salary Match", value: job.salaryMatch, color: "purple", desc: job.matchDetails.salary },
                { label: "Location match", value: job.learningOpportunities, color: "orange", desc: job.matchDetails.growth }
              ].map(({ label, value, color, desc }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">{label}</span>
                    <span className={`text-xs font-bold text-${color}-600`}>{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className={`h-1 rounded-full bg-${color}-500`} style={{ width: `${value}%` }} />
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1">{desc}</p>
                </div>
              ))}
            </div>

            {/* Company Insights */}
            <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-200 text-xs">
              <span className="font-bold text-indigo-900">🏢 Company Insights</span>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <span className="text-gray-600">Team Size:</span> <span className="font-bold text-indigo-600 ml-1">{job.teamSize}</span> <span className="text-gray-600"> engineers</span>
                </div>
                <div>
                  <span className="text-gray-600">Founded:</span> <span className="font-bold text-green-600 ml-1">{job.foundedYear}</span>
                </div>
                <div>
                  <span className="text-gray-600">Industry:</span> <span className="font-bold text-purple-600 ml-1">{job.companyType.split(' · ')[0]}</span>
                </div>
                <div>
                  <span className="text-gray-600">Salary Range:</span> <span className="font-bold text-blue-600 ml-1">{job.salary}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button onClick={() => onBlock(job.id)} className="p-1.5 rounded-lg" title="Dismiss">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-gray-400">
                    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button onClick={() => onSave(job.id)} className={`p-1.5 rounded-lg ${isSaved ? "text-yellow-500 bg-yellow-50" : "text-gray-400"}`} title="Save Job">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M5 3V17L10 13L15 17V3H5Z" stroke="currentColor" strokeWidth="2" fill={isSaved ? "currentColor" : "none"} />
                  </svg>
                </button>
                <button onClick={() => onApply(job.id)} disabled={isApplied} className={`px-5 py-1.5 rounded-lg font-bold text-xs transition-all ${isApplied ? "bg-green-500 text-white cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105"}`}>
                  {isApplied ? "APPLIED" : "APPLY NOW"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default function JobSearchPage() {
  const [appliedJobs, setAppliedJobs] = useState(new Set())
  const [savedJobs, setSavedJobs] = useState(new Set())
  const [dismissedJobs, setDismissedJobs] = useState(new Set())
  const [showApplyBanner, setShowApplyBanner] = useState(false)

  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("match")

  // Banner typewriter effect
  const [typewriterText, setTypewriterText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Hey Advika! We've curated the perfect matches Secure the bag!"

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      setTypewriterText(fullText.slice(0, currentIndex))
      currentIndex++
      if (currentIndex > fullText.length) {
        clearInterval(interval)
        setShowCursor(false)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  const filteredJobs = useMemo(() => {
    let jobs = allJobs.filter(job => !dismissedJobs.has(job.id))
    if (filterBy === "remote") jobs = jobs.filter(job => job.remote)
    else if (filterBy === "urgent") jobs = jobs.filter(job => job.isUrgent)
    else if (filterBy === "high-match") jobs = jobs.filter(job => job.matchScore >= 85)

    if (sortBy === "match") jobs.sort((a, b) => b.matchScore - a.matchScore)
    else if (sortBy === "recent") jobs.sort((a, b) => b.id - a.id)
    else if (sortBy === "salary") {
      const getSalaryMax = salary => {
        const parts = salary.split("-")
        if (parts.length === 2) return parseInt(parts[1].replace(/[^\d]/g, ""), 10)
        return parseInt(parts[0].replace(/[^\d]/g, ""), 10)
      }
      jobs.sort((a, b) => getSalaryMax(b.salary) - getSalaryMax(a.salary))
    }
    return jobs
  }, [filterBy, sortBy, dismissedJobs])

  const handleApply = jobId => {
    const job = allJobs.find(j => j.id === jobId)
    if (job && job.companyWebsite) {
      // Open company website in new tab
      window.open(job.companyWebsite, '_blank')
    }
    // Mark as applied
    setTimeout(() => {
      setAppliedJobs(prev => new Set(prev).add(jobId))
      setShowApplyBanner(true)
    }, 500)
  }

  const handleSaveJob = jobId => {
    setSavedJobs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) newSet.delete(jobId)
      else newSet.add(jobId)
      return newSet
    })
  }

  const handleBlock = jobId => {
    setDismissedJobs(prev => new Set(prev).add(jobId))
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          {typewriterText}
          {showCursor && <span className="animate-pulse">|</span>}
        </h1>
      </div>
      <div className="pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            {["all", "high-match", "remote", "urgent"].map(filter => (
              <button
                key={filter}
                onClick={() => setFilterBy(filter)}
                className={`px-4 py-2 rounded-full ${filterBy === filter ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"}`}
              >
                {{
                  all: "All",
                  "high-match": "85+ Match",
                  remote: "Remote",
                  urgent: "Urgent"
                }[filter]}
              </button>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mr-3">Sort by</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-black"
            >
              <option value="match">Match Score</option>
              <option value="recent">Most Recent</option>
              <option value="salary">Salary</option>
            </select>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-700 py-12 bg-white rounded-2xl border border-gray-300">
            <div className="text-5xl mb-6">😞</div>
            <div>No jobs match your criteria</div>
            <button
              onClick={() => setDismissedJobs(new Set())}
              className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredJobs.map(job => (
            <EnhancedJobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              onSave={handleSaveJob}
              onBlock={handleBlock}
              isApplied={appliedJobs.has(job.id)}
              isSaved={savedJobs.has(job.id)}
            />
          ))
        )}
      </div>
      {showApplyBanner && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4">
          <span>Successfully applied!</span>
          <button onClick={() => setShowApplyBanner(false)} className="underline hover:text-green-200">
            Close
          </button>
        </div>
      )}
    </DashboardLayout>
  )
}
