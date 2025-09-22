// app/resume-builder/page.js
"use client";
import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EditResumeDialog } from "@/components/EditResumeDialog";
import styles from "@/app/styles/pages/resume-builder.module.css";

// Initial resume data
const initialResumesData = [
  {
    id: "1",
    title: "Default Resume",
    completion: 71,
    previewText:
      "First Name Preview\nLast Name\nTarget Job Title\n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters as...",
    lastEdited: "21 hours ago",
    createdAt: "2025-09-10T15:56:00Z",
    status: "draft",
  },
  {
    id: "2",
    title: "Software Engineer Resume",
    completion: 85,
    previewText:
      "John Doe\nSenior Software Engineer\n\nExperienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies...",
    lastEdited: "3 days ago",
    createdAt: "2025-09-07T09:23:00Z",
    status: "draft",
  },
  {
    id: "3",
    title: "Marketing Manager Resume",
    completion: 100,
    previewText:
      "Jane Smith\nMarketing Manager\n\nResults-driven marketing professional with 7+ years of experience in digital marketing, brand management, and campaign optimization...",
    lastEdited: "1 week ago",
    createdAt: "2025-09-03T14:20:00Z",
    status: "completed",
  },
];

// Resume Card Component
function ResumeCard({ resume, onEdit, onDelete, onDuplicate }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const { id, title, completion, previewText, lastEdited, createdAt } = resume;

  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 group" style={{borderColor: '#E1E4EB'}} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#2370FF'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E1E4EB'}>
      <div className="p-4 lg:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm" style={{background: 'linear-gradient(135deg, #2370FF, #2B49C2)'}}>
              <span className="text-lg lg:text-xl text-white">📄</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-semibold truncate text-sm lg:text-base" style={{color: '#192150'}}>
                  {title}
                </h3>
                <span
                  className="text-xs px-2 py-1 rounded-full flex-shrink-0 font-medium"
                  style={{
                    backgroundColor: completion >= 90 ? '#D1FAE5' : completion >= 70 ? '#E9F1FF' : completion >= 50 ? '#FEF3C7' : '#FEE2E2',
                    color: completion >= 90 ? '#065F46' : completion >= 70 ? '#2370FF' : completion >= 50 ? '#92400E' : '#991B1B'
                  }}
                >
                  {completion}%
                </span>
              </div>
              <div className="w-full rounded-full h-1.5" style={{backgroundColor: '#E1E4EB'}}>
                <div
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${completion}%`,
                    backgroundColor: completion >= 90 ? '#10B981' : completion >= 70 ? '#2370FF' : completion >= 50 ? '#F59E0B' : '#EF4444'
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2"
              style={{'&:hover': {backgroundColor: '#F6F7FA'}}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F6F7FA'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <svg
                className="w-4 h-4"
                style={{color: '#8A96C9'}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01"
                />
              </svg>
            </button>
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-20 py-1 min-w-[140px]" style={{borderColor: '#E1E4EB'}}>
                  <button
                    onClick={() => {
                      onEdit(resume);
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 transition-colors"
                    style={{color: '#23355C'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F6F7FA'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <span>✏️</span>
                    <span>Edit Resume</span>
                  </button>
                  <button
                    onClick={() => {
                      onDuplicate(resume);
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 transition-colors"
                    style={{color: '#23355C'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F6F7FA'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <span>📋</span>
                    <span>Duplicate</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                    <span>📤</span>
                    <span>Export PDF</span>
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this resume?")
                      ) {
                        onDelete(id);
                      }
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center space-x-2 transition-colors"
                  >
                    <span>🗑️</span>
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm line-clamp-3 leading-relaxed" style={{color: '#8A96C9'}}>
            {previewText.split("\n").slice(0, 3).join(" ")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs mb-4 gap-1" style={{color: '#8A96C9'}}>
          <span className="truncate">
            Created {new Date(createdAt).toLocaleDateString()}
          </span>
          <span className="truncate">Last edited {lastEdited}</span>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => onEdit(resume)}
              className="flex items-center justify-center space-x-2 px-3 py-2 text-sm flex-1 sm:flex-none font-medium rounded-lg border transition-all duration-300"
              style={{backgroundColor: '#F4F8FF', color: '#2370FF', borderColor: '#E9F1FF'}}
              onMouseEnter={(e) => {e.target.style.backgroundColor = '#E9F1FF'}}
              onMouseLeave={(e) => {e.target.style.backgroundColor = '#F4F8FF'}}
            >
              <span>✏️</span>
              <span>Edit</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-colors text-sm flex-1 sm:flex-none font-medium"
              style={{backgroundColor: '#ECFDF5', borderColor: '#BBF7D0', color: '#047857'}}
              onMouseEnter={(e) => {e.target.style.backgroundColor = '#D1FAE5'}}
              onMouseLeave={(e) => {e.target.style.backgroundColor = '#ECFDF5'}}
            >
              <span>🎯</span>
              <span>Match Job</span>
            </button>
            <button
              onClick={() => onDuplicate(resume)}
              className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-colors text-sm flex-1 sm:flex-none font-medium"
              style={{backgroundColor: '#F6F7FA', borderColor: '#E1E4EB', color: '#23355C'}}
              onMouseEnter={(e) => {e.target.style.backgroundColor = '#F3F7FF'}}
              onMouseLeave={(e) => {e.target.style.backgroundColor = '#F6F7FA'}}
            >
              <span>📋</span>
              <span>Clone</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="rounded-xl border p-8 lg:p-12 text-center" style={{background: 'linear-gradient(135deg, #F4F8FF 0%, #E9F1FF 100%)', borderColor: '#D5E4FF'}}>
      <div className="text-4xl lg:text-6xl mb-4">📄</div>
      <h3 className="text-lg lg:text-xl font-semibold mb-2" style={{color: '#192150'}}>
        No resumes yet
      </h3>
      <p className="mb-6 max-w-md mx-auto" style={{color: '#8A96C9'}}>
        Create your first professional resume and start landing your dream job
      </p>
      <Link href="/resume-builder/ai-generator">
        <button className="text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-300" style={{background: 'linear-gradient(135deg, #2370FF, #2B49C2)'}} onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
          Create New Resume
        </button>
      </Link>
    </div>
  );
}

export default function ResumeBuilderPage() {
  const [resumesData, setResumesData] = useState(initialResumesData);
  const [selectedOption, setSelectedOption] = useState(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiTailorChecked, setAiTailorChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingResume, setEditingResume] = useState(null);
  const fileInputRef = useRef(null);

  // Filter and sort resumes based on search and filter criteria
  const filteredResumes = useMemo(() => {
    let filtered = resumesData.filter((resume) => {
      const matchesSearch =
        resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resume.previewText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    // Sort by newest first when "newest" is selected
    if (filterType === "newest") {
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    }

    return filtered;
  }, [searchQuery, filterType]);

  const hasResumes = resumesData.length > 0;

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  const handleImportFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditResume = (resume) => {
    setEditingResume(resume);
    setIsEditDialogOpen(true);
  };

  const handleSaveResume = (updatedResume) => {
    setResumesData((prev) =>
      prev.map((resume) =>
        resume.id === updatedResume.id ? updatedResume : resume
      )
    );
  };

  const handleDeleteResume = (resumeId) => {
    setResumesData((prev) => prev.filter((resume) => resume.id !== resumeId));
  };

  const handleDuplicateResume = (resume) => {
    const duplicatedResume = {
      ...resume,
      id: Date.now().toString(),
      title: `${resume.title} (Copy)`,
      createdAt: new Date().toISOString(),
      lastEdited: "just now",
    };
    setResumesData((prev) => [duplicatedResume, ...prev]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        

        {/* Main Tabs */}
        <div className="w-full">
          <div className="bg-white rounded-xl shadow-sm border p-1" style={{borderColor: '#E1E4EB'}}>
            <div className="grid w-full grid-cols-3 lg:grid-cols-4 gap-1">
              <button
                onClick={() => setActiveTab("all")}
                className="py-3 px-3 lg:px-4 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeTab === "all" ? '#F4F8FF' : 'transparent',
                  color: activeTab === "all" ? '#2370FF' : '#8A96C9',
                  border: activeTab === "all" ? '1px solid #2370FF' : 'none',
                  boxShadow: activeTab === "all" ? '0 1px 3px rgba(35, 112, 255, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "all") {
                    e.target.style.backgroundColor = '#F6F7FA';
                    e.target.style.color = '#23355C';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "all") {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#8A96C9';
                  }
                }}
              >
                <span className="hidden lg:inline">My Resumes</span>
                <span className="lg:hidden">Resumes</span>
              </button>
              <button
                onClick={() => setActiveTab("existing")}
                className="py-3 px-3 lg:px-4 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeTab === "existing" ? '#F4F8FF' : 'transparent',
                  color: activeTab === "existing" ? '#2370FF' : '#8A96C9',
                  border: activeTab === "existing" ? '1px solid #2370FF' : 'none',
                  boxShadow: activeTab === "existing" ? '0 1px 3px rgba(35, 112, 255, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "existing") {
                    e.target.style.backgroundColor = '#F6F7FA';
                    e.target.style.color = '#23355C';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "existing") {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#8A96C9';
                  }
                }}
              >
                <span className="hidden lg:inline">Use Template</span>
                <span className="lg:hidden">Template</span>
              </button>
              <button
                onClick={() => setActiveTab("ai-prompt")}
                className="py-3 px-3 lg:px-4 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeTab === "ai-prompt" ? '#F4F8FF' : 'transparent',
                  color: activeTab === "ai-prompt" ? '#2370FF' : '#8A96C9',
                  border: activeTab === "ai-prompt" ? '1px solid #2370FF' : 'none',
                  boxShadow: activeTab === "ai-prompt" ? '0 1px 3px rgba(35, 112, 255, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "ai-prompt") {
                    e.target.style.backgroundColor = '#F6F7FA';
                    e.target.style.color = '#23355C';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "ai-prompt") {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#8A96C9';
                  }
                }}
              >
                <span className="hidden lg:inline">AI Assistant</span>
                <span className="lg:hidden">AI Write</span>
              </button>
              <button
                onClick={() => setActiveTab("linkedin")}
                className="py-3 px-3 lg:px-4 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeTab === "linkedin" ? '#F4F8FF' : 'transparent',
                  color: activeTab === "linkedin" ? '#2370FF' : '#8A96C9',
                  border: activeTab === "linkedin" ? '1px solid #2370FF' : 'none',
                  boxShadow: activeTab === "linkedin" ? '0 1px 3px rgba(35, 112, 255, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "linkedin") {
                    e.target.style.backgroundColor = '#F6F7FA';
                    e.target.style.color = '#23355C';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "linkedin") {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#8A96C9';
                  }
                }}
              >
                <span className="hidden lg:inline">LinkedIn Import</span>
                <span className="lg:hidden">LinkedIn</span>
              </button>
            </div>
          </div>

          {/* All Resumes Tab */}
          {activeTab === "all" && (
            <div className="space-y-6 mt-6">
              {hasResumes && (
                <div className="bg-white rounded-xl shadow-sm border p-4 lg:p-6" style={{borderColor: '#E1E4EB'}}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="relative flex-1 max-w-full lg:max-w-md">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{color: '#8A96C9'}}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search resumes..."
                        className="pl-10 pr-4 py-2.5 w-full border rounded-lg transition-all duration-200"
                        style={{borderColor: '#E1E4EB', backgroundColor: '#F3F7FF', color: '#192150'}}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2370FF';
                          e.target.style.boxShadow = '0 0 0 3px rgba(35, 112, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E1E4EB';
                          e.target.style.boxShadow = 'none';
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setFilterType(filterType === "all" ? "newest" : "all")
                        }
                        className="flex items-center space-x-2 px-4 py-2.5 border rounded-lg transition-colors text-sm font-medium"
                        style={{borderColor: '#E1E4EB', backgroundColor: '#FFFFFF', color: '#23355C'}}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#F6F7FA';
                          e.target.style.borderColor = '#2370FF';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#FFFFFF';
                          e.target.style.borderColor = '#E1E4EB';
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                          />
                        </svg>
                        <span className="hidden lg:inline">
                          Sort:{" "}
                          {filterType === "all" ? "Default" : "Newest First"}
                        </span>
                        <span className="lg:hidden">
                          {filterType === "all" ? "Default" : "Newest"}
                        </span>
                      </button>
                      <Link href="/resume-builder/ai-generator">
                        <button className="text-white px-4 py-2.5 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all duration-200" style={{background: 'linear-gradient(135deg, #2370FF, #2B49C2)'}} onMouseEnter={(e) => {e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 12px rgba(35, 112, 255, 0.3)';}} onMouseLeave={(e) => {e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none';}}>
                          <span>+</span>
                          <span className="hidden lg:inline">New Resume</span>
                          <span className="lg:hidden">New</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {hasResumes ? (
                filteredResumes.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredResumes.map((resume) => (
                      <ResumeCard
                        key={resume.id}
                        resume={resume}
                        onEdit={handleEditResume}
                        onDelete={handleDeleteResume}
                        onDuplicate={handleDuplicateResume}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border shadow-sm p-8 lg:p-12 text-center" style={{borderColor: '#E1E4EB'}}>
                    <div className="text-4xl lg:text-6xl mb-4">🔍</div>
                    <h3 className="text-lg lg:text-xl font-semibold mb-2" style={{color: '#192150'}}>
                      No resumes found
                    </h3>
                    <p className="mb-4" style={{color: '#8A96C9'}}>
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="font-medium transition-all duration-200"
                      style={{color: '#2370FF'}}
                      onMouseEnter={(e) => e.target.style.color = '#0355BE'}
                      onMouseLeave={(e) => e.target.style.color = '#2370FF'}
                    >
                      Clear search
                    </button>
                  </div>
                )
              ) : (
                <EmptyState />
              )}
            </div>
          )}

          {/* Select Existing Resume Tab */}
          {activeTab === "existing" && (
            <div className="space-y-6 mt-6">
              <div className="bg-white rounded-xl border shadow-sm" style={{borderColor: '#E1E4EB'}}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 p-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm" style={{background: 'linear-gradient(135deg, #2370FF, #2B49C2)'}}>
                    <span className="text-2xl text-white">📄</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold mb-1" style={{color: '#192150'}}>
                      Start with a Template
                    </h2>
                    <p style={{color: '#8A96C9'}}>
                      Choose from our professional templates or upload your
                      existing resume
                    </p>
                  </div>
                </div>

                <div className="space-y-6 p-6 pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="group p-6 rounded-xl border-2 cursor-pointer transition-all duration-200" style={{borderColor: '#E1E4EB'}} onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#2370FF'; e.currentTarget.style.backgroundColor = '#F4F8FF';}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = '#E1E4EB'; e.currentTarget.style.backgroundColor = 'transparent';}}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors" style={{backgroundColor: '#E9F1FF', color: '#2370FF'}}>
                          <span className="text-xl">✨</span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold mb-1" style={{color: '#192150'}}>
                            Professional Template
                          </h4>
                          <p className="text-sm" style={{color: '#8A96C9'}}>
                            Start with our ATS-optimized template
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={handleImportFileClick}
                      className="group p-6 rounded-xl border-2 cursor-pointer transition-all duration-200"
                      style={{borderColor: '#E1E4EB'}}
                      onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#10B981'; e.currentTarget.style.backgroundColor = '#ECFDF5';}}
                      onMouseLeave={(e) => {e.currentTarget.style.borderColor = '#E1E4EB'; e.currentTarget.style.backgroundColor = 'transparent';}}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors" style={{backgroundColor: '#D1FAE5', color: '#059669'}}>
                          <span className="text-xl">📤</span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold mb-1" style={{color: '#192150'}}>
                            Upload Resume
                          </h4>
                          <p className="text-sm" style={{color: '#8A96C9'}}>
                            Import PDF, DOC, or DOCX files
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="rounded-lg p-4" style={{backgroundColor: '#F6F7FA'}}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="ai-tailor-existing"
                        checked={aiTailorChecked}
                        onChange={(e) => setAiTailorChecked(e.target.checked)}
                        className="w-4 h-4 rounded"
                        style={{accentColor: '#2370FF'}}
                      />
                      <label
                        htmlFor="ai-tailor-existing"
                        className="text-sm font-medium"
                        style={{color: '#23355C'}}
                      >
                        🎯 Tailor resume to a specific job posting
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Link href="/resume-builder/ai-generator">
                      <button className="text-white px-8 py-3 rounded-lg font-medium shadow-sm transition-all duration-300" style={{background: 'linear-gradient(135deg, #2370FF, #2B49C2)'}} onMouseEnter={(e) => {e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 25px rgba(35, 112, 255, 0.3)';}} onMouseLeave={(e) => {e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';}}>
                        Continue with Template
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Start with AI Prompt Tab */}
          {activeTab === "ai-prompt" && (
            <div className="mt-6">
              <div className="rounded-2xl border shadow-sm min-h-[70vh] flex items-center justify-center" style={{background: 'linear-gradient(135deg, #F4F8FF 0%, #E9F1FF 100%)', borderColor: '#D5E4FF'}}>
                <div className="text-center max-w-2xl mx-auto px-8">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg" style={{background: 'linear-gradient(135deg, #2370FF, #79C7FF)'}}>
                    <span className="text-3xl">✨</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black mb-6" style={{color: '#2370FF'}}>
                    AI About to Glow You Up
                  </h1>
                  <p className="text-xl lg:text-2xl font-semibold mb-10 leading-relaxed" style={{color: '#23355C'}}>
                    Drop your vibe, let AI flex it into a resume that hits different ✨
                  </p>

                  <Link href="/resume-builder/ai-generator">
                    <button className="text-white px-10 py-4 rounded-xl transition-all duration-200 font-black text-lg lg:text-xl shadow-lg flex items-center gap-3 mx-auto" style={{background: 'linear-gradient(135deg, #2370FF, #2B49C2)'}} onMouseEnter={(e) => {e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 30px rgba(35, 112, 255, 0.4)';}} onMouseLeave={(e) => {e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(35, 112, 255, 0.2)';}}>
                      Start the Glow Up 🚀
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Build Using LinkedIn Tab */}
          {activeTab === "linkedin" && (
            <div className="space-y-6 mt-6">
              <div className="bg-white rounded-xl border shadow-sm" style={{borderColor: '#E1E4EB'}}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 p-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm" style={{background: 'linear-gradient(135deg, #0355BE, #002A79)'}}>
                    <span className="text-2xl text-white">💼</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                      <h2 className="text-xl font-semibold" style={{color: '#192150'}}>
                        LinkedIn Import
                      </h2>
                      <span className="text-xs px-3 py-1 rounded-full font-medium self-start" style={{backgroundColor: '#FEF3C7', color: '#92400E'}}>
                        🚧 Coming Soon
                      </span>
                    </div>
                    <p className="mt-1" style={{color: '#8A96C9'}}>
                      Import your LinkedIn profile to automatically generate a
                      professional resume
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="rounded-xl border p-8 text-center" style={{background: 'linear-gradient(135deg, #F4F8FF, #E9F1FF)', borderColor: '#D5E4FF'}}>
                    <div className="text-4xl mb-4">🔗</div>
                    <h3 className="text-lg font-semibold mb-2" style={{color: '#192150'}}>
                      LinkedIn Integration
                    </h3>
                    <p className="mb-6 max-w-md mx-auto" style={{color: '#8A96C9'}}>
                      We're working on seamless LinkedIn integration to make
                      resume creation even faster. Stay tuned!
                    </p>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
                      <button
                        disabled
                        className="px-6 py-3 rounded-lg cursor-not-allowed font-medium"
                        style={{backgroundColor: '#C4C9D6', color: '#8A96C9'}}
                      >
                        Connect LinkedIn Profile
                      </button>
                      <span className="text-sm" style={{color: '#8A96C9'}}>
                        Expected: Q2 2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <EditResumeDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveResume}
        resume={editingResume}
      />
    </DashboardLayout>
  );
}
