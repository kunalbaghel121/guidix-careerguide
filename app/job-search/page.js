// app/job-search/page.js
"use client";
import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import styles from "@/app/styles/pages/job-search.module.css";

export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const jobFilters = [
    "Remote", "Full-time", "Part-time", "Contract", "Internship"
  ];

  const allJobs = [
    { id: 1, title: "Senior Frontend Developer", company: "TechCorp", location: "Remote", salary: "$120k-150k", posted: "2 days ago", type: "Full-time" },
    { id: 2, title: "Full Stack Engineer", company: "StartupXYZ", location: "San Francisco", salary: "$100k-130k", posted: "3 days ago", type: "Full-time" },
    { id: 3, title: "React Developer", company: "InnovateNow", location: "New York", salary: "$90k-120k", posted: "1 week ago", type: "Full-time" },
    { id: 4, title: "Frontend Developer", company: "RemoteCorp", location: "Remote", salary: "$80k-110k", posted: "5 days ago", type: "Remote" },
    { id: 5, title: "JavaScript Developer", company: "TechStartup", location: "Austin", salary: "$70k-95k", posted: "1 week ago", type: "Contract" },
    { id: 6, title: "Software Engineering Intern", company: "BigTech", location: "Seattle", salary: "$25/hour", posted: "3 days ago", type: "Internship" }
  ];

  const toggleFilter = (filter) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch = searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = locationQuery === "" ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchesFilters = activeFilters.length === 0 ||
        activeFilters.some(filter =>
          job.type === filter ||
          (filter === "Remote" && job.location === "Remote")
        );

      return matchesSearch && matchesLocation && matchesFilters;
    });
  }, [searchQuery, locationQuery, activeFilters, allJobs]);

  const handleSearch = () => {
    // Search is handled by the filteredJobs useMemo
    console.log("Searching with:", { searchQuery, locationQuery, activeFilters });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-sm text-white p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">AI Job Search</h1>
              <p className="text-green-100 text-sm lg:text-base">
                Find your perfect job with AI-powered matching
              </p>
            </div>
            <div className="mt-4 lg:mt-0 text-4xl lg:text-6xl">🔍</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Location"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="flex flex-wrap gap-2">
            {jobFilters.map((filter, index) => (
              <button
                key={index}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-full transition-colors text-sm ${
                  activeFilters.includes(filter)
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {activeFilters.map(filter => (
                <span key={filter} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {filter}
                  <button
                    onClick={() => toggleFilter(filter)}
                    className="ml-2 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={() => setActiveFilters([])}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Job Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Job Matches ({filteredJobs.length})
            </h2>
            {(searchQuery || locationQuery || activeFilters.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setLocationQuery("");
                  setActiveFilters([]);
                }}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{job.salary}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.type}</span>
                        <span className="text-gray-500">{job.posted}</span>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 flex gap-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Apply Now
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Save Job
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setLocationQuery("");
                  setActiveFilters([]);
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Job Recommendations</h2>
          <p className="text-gray-600 mb-4">Based on your profile and preferences, here are some personalized job suggestions:</p>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🤖</div>
            <p className="text-gray-500">Complete your profile to get personalized recommendations</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
