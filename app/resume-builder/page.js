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
    <div
      className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 group"
      style={{ borderColor: "var(--neutral-medium-light)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--brand-primary)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--neutral-medium-light)")
      }
    >
      <div className="p-4 lg:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))",
              }}
            >
              <span className="text-lg lg:text-xl text-white">📄</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3
                  className="font-semibold truncate text-sm lg:text-base"
                  style={{ color: "var(--neutral-darkest)" }}
                >
                  {title}
                </h3>
                <span
                  className="text-xs px-2 py-1 rounded-full flex-shrink-0 font-medium"
                  style={{
                    backgroundColor:
                      completion >= 90
                        ? "#D1FAE5"
                        : completion >= 70
                        ? "var(--brand-secondary-light)"
                        : completion >= 50
                        ? "#FEF3C7"
                        : "#FEE2E2",
                    color:
                      completion >= 90
                        ? "#065F46"
                        : completion >= 70
                        ? "var(--brand-primary)"
                        : completion >= 50
                        ? "#92400E"
                        : "#991B1B",
                  }}
                >
                  {completion}%
                </span>
              </div>
              <div
                className="w-full rounded-full h-1.5"
                style={{ backgroundColor: "var(--neutral-medium-light)" }}
              >
                <div
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${completion}%`,
                    backgroundColor:
                      completion >= 90
                        ? "#10B981"
                        : completion >= 70
                        ? "var(--brand-primary)"
                        : completion >= 50
                        ? "#F59E0B"
                        : "#EF4444",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2"
              style={{
                "&:hover": { backgroundColor: "var(--neutral-lightest)" },
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "var(--neutral-lightest)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              <svg
                className="w-4 h-4"
                style={{ color: "var(--neutral-medium-dark)" }}
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
                <div
                  className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-20 py-1 min-w-[140px]"
                  style={{ borderColor: "var(--neutral-medium-light)" }}
                >
                  <button
                    onClick={() => {
                      onEdit(resume);
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm flex items-center space-x-2 transition-colors"
                    style={{ color: "var(--neutral-darker)" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor =
                        "var(--neutral-lightest)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
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
                    style={{ color: "var(--neutral-darker)" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor =
                        "var(--neutral-lightest)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
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
          <p
            className="text-sm line-clamp-3 leading-relaxed"
            style={{ color: "var(--neutral-medium-dark)" }}
          >
            {previewText.split("\n").slice(0, 3).join(" ")}
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs mb-4 gap-1"
          style={{ color: "var(--neutral-medium-dark)" }}
        >
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
              style={{
                backgroundColor: "var(--brand-secondary-lightest)",
                color: "var(--brand-primary)",
                borderColor: "#E9F1FF",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#E9F1FF";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor =
                  "var(--brand-secondary-lightest)";
              }}
            >
              <span>✏️</span>
              <span>Edit</span>
            </button>
            <button
              className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-colors text-sm flex-1 sm:flex-none font-medium"
              style={{
                backgroundColor: "#ECFDF5",
                borderColor: "#BBF7D0",
                color: "#047857",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#D1FAE5";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ECFDF5";
              }}
            >
              <span>🎯</span>
              <span>Match Job</span>
            </button>
            <button
              onClick={() => onDuplicate(resume)}
              className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-colors text-sm flex-1 sm:flex-none font-medium"
              style={{
                backgroundColor: "var(--neutral-lightest)",
                borderColor: "var(--neutral-medium-light)",
                color: "var(--neutral-darker)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--neutral-light)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "var(--neutral-lightest)";
              }}
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
    <div
      className="rounded-xl border p-8 lg:p-12 text-center"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-secondary-lightest) 0%, #E9F1FF 100%)",
        borderColor: "#D5E4FF",
      }}
    >
      <div className="text-4xl lg:text-6xl mb-4">📄</div>
      <h3
        className="text-lg lg:text-xl font-semibold mb-2"
        style={{ color: "var(--neutral-darkest)" }}
      >
        No resumes yet
      </h3>
      <p
        className="mb-6 max-w-md mx-auto"
        style={{ color: "var(--neutral-medium-dark)" }}
      >
        Create your first professional resume and start landing your dream job
      </p>
      <Link href="/resume-builder/ai-generator">
        <button
          className="text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-300"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-1px)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        >
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
  const [activeTab, setActiveTab] = useState("ai-prompt");
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
        <div className="bg-gradient-to-r from-[#679CFF] to-[#2370FF] rounded-xl shadow-sm text-white p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                AI Job Apply
              </h1>
              <p className="text-pink-100 text-sm lg:text-base">
                Automate your job applications with intelligent targeting
              </p>
            </div>
            <div className="mt-4 lg:mt-0 text-4xl lg:text-6xl">📤</div>
          </div>
        </div>
        {/* Main Tabs */}
        <div className="w-full">
          <div
            className="bg-white rounded-xl shadow-sm border p-1"
            style={{ borderColor: "var(--neutral-medium-light)" }}
          >
            <div className="grid w-full grid-cols-3 gap-1">
              <button
                onClick={() => setActiveTab("ai-prompt")}
                className="py-3 px-3 lg:px-4 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    activeTab === "ai-prompt"
                      ? "var(--brand-secondary-lightest)"
                      : "transparent",
                  color:
                    activeTab === "ai-prompt"
                      ? "var(--brand-primary)"
                      : "var(--neutral-medium-dark)",
                  border:
                    activeTab === "ai-prompt"
                      ? "1px solid var(--brand-primary)"
                      : "none",
                  boxShadow:
                    activeTab === "ai-prompt"
                      ? "0 1px 3px rgba(35, 112, 255, 0.1)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "ai-prompt") {
                    e.target.style.backgroundColor = "var(--neutral-lightest)";
                    e.target.style.color = "var(--neutral-darker)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "ai-prompt") {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "var(--neutral-medium-dark)";
                  }
                }}
              >
                <span className="hidden lg:inline">AI Assistant</span>
                <span className="lg:hidden">AI Write</span>
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className="py-3 px-3 lg:px-4 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    activeTab === "all"
                      ? "var(--brand-secondary-lightest)"
                      : "transparent",
                  color:
                    activeTab === "all"
                      ? "var(--brand-primary)"
                      : "var(--neutral-medium-dark)",
                  border:
                    activeTab === "all"
                      ? "1px solid var(--brand-primary)"
                      : "none",
                  boxShadow:
                    activeTab === "all"
                      ? "0 1px 3px rgba(35, 112, 255, 0.1)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "all") {
                    e.target.style.backgroundColor = "var(--neutral-lightest)";
                    e.target.style.color = "var(--neutral-darker)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "all") {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "var(--neutral-medium-dark)";
                  }
                }}
              >
                <span className="hidden lg:inline">My Resumes</span>
                <span className="lg:hidden">Resumes</span>
              </button>
              <button
                onClick={() => setActiveTab("linkedin")}
                className="py-3 px-3 lg:px-4 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    activeTab === "linkedin"
                      ? "var(--brand-secondary-lightest)"
                      : "transparent",
                  color:
                    activeTab === "linkedin"
                      ? "var(--brand-primary)"
                      : "var(--neutral-medium-dark)",
                  border:
                    activeTab === "linkedin"
                      ? "1px solid var(--brand-primary)"
                      : "none",
                  boxShadow:
                    activeTab === "linkedin"
                      ? "0 1px 3px rgba(35, 112, 255, 0.1)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== "linkedin") {
                    e.target.style.backgroundColor = "var(--neutral-lightest)";
                    e.target.style.color = "var(--neutral-darker)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "linkedin") {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "var(--neutral-medium-dark)";
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
                <div
                  className="bg-white rounded-xl shadow-sm border p-4 lg:p-6"
                  style={{ borderColor: "var(--neutral-medium-light)" }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="relative flex-1 max-w-full lg:max-w-md">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: "var(--neutral-medium-dark)" }}
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
                        style={{
                          borderColor: "var(--neutral-medium-light)",
                          backgroundColor: "var(--neutral-light)",
                          color: "var(--neutral-darkest)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--brand-primary)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(35, 112, 255, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "var(--neutral-medium-light)";
                          e.target.style.boxShadow = "none";
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
                        style={{
                          borderColor: "var(--neutral-medium-light)",
                          backgroundColor: "#FFFFFF",
                          color: "var(--neutral-darker)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor =
                            "var(--neutral-lightest)";
                          e.target.style.borderColor = "var(--brand-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#FFFFFF";
                          e.target.style.borderColor =
                            "var(--neutral-medium-light)";
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
                        <button
                          className="text-white px-4 py-2.5 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all duration-200"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow =
                              "0 4px 12px rgba(35, 112, 255, 0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "none";
                          }}
                        >
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
                  <div
                    className="bg-white rounded-xl border shadow-sm p-8 lg:p-12 text-center"
                    style={{ borderColor: "var(--neutral-medium-light)" }}
                  >
                    <div className="text-4xl lg:text-6xl mb-4">🔍</div>
                    <h3
                      className="text-lg lg:text-xl font-semibold mb-2"
                      style={{ color: "var(--neutral-darkest)" }}
                    >
                      No resumes found
                    </h3>
                    <p
                      className="mb-4"
                      style={{ color: "var(--neutral-medium-dark)" }}
                    >
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="font-medium transition-all duration-200"
                      style={{ color: "var(--brand-primary)" }}
                      onMouseEnter={(e) => (e.target.style.color = "#0355BE")}
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--brand-primary)")
                      }
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

          {/* Resume Choice Tab */}
          {activeTab === "ai-prompt" && (
            <div className="space-y-6 mt-6">
              <div
                className="min-h-[70vh] flex items-center justify-center p-4"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-secondary-lightest) 0%, #E9F1FF 100%)",
                }}
              >
                <div className="max-w-4xl mx-auto w-full relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--brand-primary), #79C7FF)",
                        }}
                      >
                        <span className="text-3xl">✨</span>
                      </div>
                    </div>
                    <h1
                      className="text-4xl lg:text-5xl font-bold mb-4"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      Choose your creation path
                    </h1>
                    <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                      Pick your preferred method to create your perfect resume
                    </p>
                  </div>

                  {/* Options Grid */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Start from Scratch Option */}
                    <Link href="/resume-confirmation?path=ai">
                      <div
                        className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 rounded-2xl bg-white p-6"
                        style={{
                          borderColor: "#D5E4FF",
                        }}
                      >
                        <div className="text-center pb-4">
                          <h3
                            className="text-2xl font-bold mb-2"
                            style={{ color: "var(--brand-primary)" }}
                          >
                            Start with AI
                          </h3>
                          <p className="text-gray-600 font-medium">
                            Let AI create your resume from scratch using
                            intelligent prompts
                          </p>
                        </div>
                        <button
                          className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))",
                          }}
                        >
                          <span className="mr-2">🪄</span>
                          AI Create
                        </button>
                      </div>
                    </Link>

                    {/* Upload Resume Option */}
                    <Link href="/resume-confirmation?path=upload">
                      <div
                        className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 rounded-2xl bg-white p-6"
                        style={{
                          borderColor: "#D5E4FF",
                        }}
                      >
                        <div className="text-center pb-4">
                          <h3
                            className="text-2xl font-bold mb-2"
                            style={{ color: "var(--brand-primary)" }}
                          >
                            Upload & Enhance
                          </h3>
                          <p className="text-gray-600 font-medium">
                            Upload your existing resume and let AI enhance it
                            for better results
                          </p>
                        </div>
                        <button
                          className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))",
                          }}
                        >
                          <span className="mr-2">📤</span>
                          Upload Resume
                        </button>
                      </div>
                    </Link>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div
                      className="bg-white rounded-xl p-6 text-center shadow-sm border-2 transition-all duration-300 hover:shadow-md"
                      style={{ borderColor: "#D5E4FF" }}
                    >
                      <div
                        className="flex items-center justify-center gap-2 mb-2"
                        style={{ color: "var(--brand-primary)" }}
                      >
                        <span className="text-xl">✅</span>
                        <span className="text-2xl font-bold">95%</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-600 tracking-wide">
                        Success Rate
                      </div>
                    </div>
                    <div
                      className="bg-white rounded-xl p-6 text-center shadow-sm border-2 transition-all duration-300 hover:shadow-md"
                      style={{ borderColor: "#D5E4FF" }}
                    >
                      <div
                        className="flex items-center justify-center gap-2 mb-2"
                        style={{ color: "var(--brand-primary)" }}
                      >
                        <span className="text-xl">⚡</span>
                        <span className="text-2xl font-bold">2 min</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-600 tracking-wide">
                        Setup Time
                      </div>
                    </div>
                    <div
                      className="bg-white rounded-xl p-6 text-center shadow-sm border-2 transition-all duration-300 hover:shadow-md"
                      style={{ borderColor: "#D5E4FF" }}
                    >
                      <div
                        className="flex items-center justify-center gap-2 mb-2"
                        style={{ color: "var(--brand-primary)" }}
                      >
                        <span className="text-xl">📄</span>
                        <span className="text-2xl font-bold">ATS</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-600 tracking-wide">
                        Optimized
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Build Using LinkedIn Tab */}
          {activeTab === "linkedin" && (
            <div className="space-y-6 mt-6">
              <div
                className="bg-white rounded-xl border shadow-sm"
                style={{ borderColor: "var(--neutral-medium-light)" }}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 p-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #0355BE, #002A79)",
                    }}
                  >
                    <span className="text-2xl text-white">💼</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                      <h2
                        className="text-xl font-semibold"
                        style={{ color: "var(--neutral-darkest)" }}
                      >
                        LinkedIn Import
                      </h2>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-medium self-start"
                        style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
                      >
                        🚧 Coming Soon
                      </span>
                    </div>
                    <p
                      className="mt-1"
                      style={{ color: "var(--neutral-medium-dark)" }}
                    >
                      Import your LinkedIn profile to automatically generate a
                      professional resume
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div
                    className="rounded-xl border p-8 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-secondary-lightest), #E9F1FF)",
                      borderColor: "#D5E4FF",
                    }}
                  >
                    <div className="text-4xl mb-4">🔗</div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--neutral-darkest)" }}
                    >
                      LinkedIn Integration
                    </h3>
                    <p
                      className="mb-6 max-w-md mx-auto"
                      style={{ color: "var(--neutral-medium-dark)" }}
                    >
                      We're working on seamless LinkedIn integration to make
                      resume creation even faster. Stay tuned!
                    </p>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
                      <button
                        disabled
                        className="px-6 py-3 rounded-lg cursor-not-allowed font-medium"
                        style={{
                          backgroundColor: "#C4C9D6",
                          color: "var(--neutral-medium-dark)",
                        }}
                      >
                        Connect LinkedIn Profile
                      </button>
                      <span
                        className="text-sm"
                        style={{ color: "var(--neutral-medium-dark)" }}
                      >
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
