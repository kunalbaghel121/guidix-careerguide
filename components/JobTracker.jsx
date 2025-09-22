import { useState, useCallback, useMemo, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, X, Move } from "lucide-react";
import { JobCard } from "@/components/JobCard";
import { AddJobDialog } from "@/components/AddJobDialog";
import { MoveJobDialog } from "@/components/MoveJobDialog";
import styles from "@/app/styles/components/JobTracker.module.css";

const initialColumns = [
  { id: "shortlist", title: "Shortlist", jobs: [] },
  { id: "auto-apply", title: "Auto Apply", jobs: [] },
  { id: "applied", title: "Applied", jobs: [] },
  { id: "interview", title: "Interview", jobs: [] },
  { id: "rejected", title: "Rejected", jobs: [] },
];

const sampleJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    status: "shortlist",
    url: "https://example.com/job1",
    notes: "Interesting role with React and TypeScript",
    documents: [],
    jobDescription: "We are looking for a senior frontend developer...",
    salary: "$120,000 - $150,000",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    location: "Remote",
    status: "applied",
    url: "https://example.com/job2",
    notes: "Applied through company website",
    documents: [],
    jobDescription: "Full stack position with Node.js and React...",
    salary: "$100,000 - $130,000",
  },
  {
    id: "3",
    title: "Software Engineer",
    location: "New York, NY",
    status: "interview",
    url: "https://example.com/job3",
    notes: "Phone interview scheduled for Friday",
    documents: [],
    jobDescription: "Software engineer role at a growing startup...",
    salary: "$90,000 - $120,000",
  },
];

export function JobTracker() {
  const [columns, setColumns] = useState(() => {
    const columnsWithJobs = initialColumns.map((column) => ({
      ...column,
      jobs: sampleJobs.filter((job) => job.status === column.id),
    }));
    return columnsWithJobs;
  });

  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("shortlist");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [jobToMove, setJobToMove] = useState(null);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  // Detect mobile/tablet devices
  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => {
      // Be aggressive about detecting touch devices
      const isSmallScreen = window.innerWidth < 1200; // Increased threshold
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsMobile(isSmallScreen || isTouchDevice || isMobileUA);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const availableFilters = [
    "Remote",
    "On-site",
    "Hybrid",
    "High Salary",
    "Recent",
  ];

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredColumns = useMemo(() => {
    if (!searchQuery && activeFilters.length === 0) {
      return columns;
    }

    return columns.map((column) => ({
      ...column,
      jobs: column.jobs.filter((job) => {
        const matchesSearch =
          !searchQuery ||
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (job.notes &&
            job.notes.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilters =
          activeFilters.length === 0 ||
          activeFilters.every((filter) => {
            switch (filter) {
              case "Remote":
                return job.location.toLowerCase().includes("remote");
              case "On-site":
                return (
                  !job.location.toLowerCase().includes("remote") &&
                  !job.location.toLowerCase().includes("hybrid")
                );
              case "Hybrid":
                return job.location.toLowerCase().includes("hybrid");
              case "High Salary":
                return (
                  job.salary &&
                  (job.salary.includes("120") ||
                    job.salary.includes("130") ||
                    job.salary.includes("150"))
                );
              case "Recent":
                return job.notes && job.notes.toLowerCase().includes("recent");
              default:
                return true;
            }
          });

        return matchesSearch && matchesFilters;
      }),
    }));
  }, [columns, searchQuery, activeFilters]);

  const handleDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const sourceColumn = columns.find((col) => col.id === source.droppableId);
      const destColumn = columns.find(
        (col) => col.id === destination.droppableId
      );
      if (!sourceColumn || !destColumn) return;

      const draggedJob = sourceColumn.jobs.find(
        (job) => job.id === draggableId
      );
      if (!draggedJob) return;

      const updatedJob = { ...draggedJob, status: destination.droppableId };

      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.id === source.droppableId) {
            return {
              ...column,
              jobs: column.jobs.filter((job) => job.id !== draggableId),
            };
          } else if (column.id === destination.droppableId) {
            const newJobs = [...column.jobs];
            newJobs.splice(destination.index, 0, updatedJob);
            return { ...column, jobs: newJobs };
          }
          return column;
        })
      );
    },
    [columns]
  );

  const handleAddJob = useCallback((columnId) => {
    setSelectedColumn(columnId);
    setIsAddJobOpen(true);
  }, []);

  const handleSaveJob = useCallback((newJob) => {
    const job = { ...newJob, id: Date.now().toString() };
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === job.status
          ? { ...column, jobs: [...column.jobs, job] }
          : column
      )
    );
    setIsAddJobOpen(false);
  }, []);

  const handleUpdateJob = useCallback((updatedJob) => {
    setColumns((prevColumns) => {
      // Find the original job to check if status changed
      const originalJob = prevColumns
        .flatMap((col) => col.jobs)
        .find((job) => job.id === updatedJob.id);

      if (!originalJob) return prevColumns;

      // If status hasn't changed, just update the job in place
      if (originalJob.status === updatedJob.status) {
        return prevColumns.map((column) =>
          column.jobs.some((job) => job.id === updatedJob.id)
            ? {
                ...column,
                jobs: column.jobs.map((job) =>
                  job.id === updatedJob.id ? updatedJob : job
                ),
              }
            : column
        );
      }

      // If status changed, move the job to the new column
      return prevColumns.map((column) => {
        if (column.id === updatedJob.status) {
          // Add to new column
          return {
            ...column,
            jobs: [...column.jobs, updatedJob],
          };
        } else {
          // Remove from old column
          return {
            ...column,
            jobs: column.jobs.filter((job) => job.id !== updatedJob.id),
          };
        }
      });
    });
  }, []);

  const handleDeleteJob = useCallback((jobId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        jobs: column.jobs.filter((job) => job.id !== jobId),
      }))
    );
  }, []);

  const handleMoveJob = useCallback(
    (jobId, newStatus) => {
      const sourceColumn = columns.find((col) =>
        col.jobs.some((job) => job.id === jobId)
      );
      if (!sourceColumn) return;

      const job = sourceColumn.jobs.find((job) => job.id === jobId);
      if (!job) return;

      const updatedJob = { ...job, status: newStatus };

      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.id === sourceColumn.id) {
            return {
              ...column,
              jobs: column.jobs.filter((job) => job.id !== jobId),
            };
          } else if (column.id === newStatus) {
            return {
              ...column,
              jobs: [...column.jobs, updatedJob],
            };
          }
          return column;
        })
      );

      setIsMoveDialogOpen(false);
      setJobToMove(null);
    },
    [columns]
  );

  const openMoveDialog = useCallback((job) => {
    setJobToMove(job);
    setIsMoveDialogOpen(true);
  }, []);

  // Show loading state until client-side detection is complete
  if (!isClient) {
    return (
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              Job Tracker
            </h2>
            <p className={styles.subtitle}>
              Track your job applications through every stage
            </p>
          </div>
        </div>

        {/* Loading skeleton */}
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Job Tracker</h2>
          <p className={styles.subtitle}>
            Track your job applications through every stage
          </p>
          {/* Debug indicator */}
          <div className={styles.modeIndicator}>
            <span
              className={
                isMobile ? styles.mobileMode : styles.desktopMode
              }
            >
              {isMobile
                ? "Mobile Interface (Move Buttons)"
                : "Desktop Interface (Drag & Drop)"}
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className={styles.searchFilterContainer}>
        <div className={styles.searchFilterRow}>
          {/* Search Input */}
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Search jobs..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <div className={styles.filterControls}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={styles.filterButton}
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>

            {/* Clear All */}
            {(searchQuery || activeFilters.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilters([]);
                }}
                className={styles.clearButton}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className={styles.filterOptions}>
            <div className={styles.filterTags}>
              {availableFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={
                    activeFilters.includes(filter) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => toggleFilter(filter)}
                  className={styles.filterTag}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {(searchQuery || activeFilters.length > 0) && (
        <div className={styles.resultsSummary}>
          <p className={styles.resultsText}>
            Showing{" "}
            {filteredColumns.reduce((total, col) => total + col.jobs.length, 0)}{" "}
            jobs
            {searchQuery && ` matching "${searchQuery}"`}
            {activeFilters.length > 0 &&
              ` with filters: ${activeFilters.join(", ")}`}
          </p>
        </div>
      )}

      {/* Kanban Board */}
      {isMobile ? (
        // Mobile View: No drag and drop
        <div className="space-y-4">
          {filteredColumns.map((column) => (
            <Card key={column.id} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium text-gray-900">
                    {column.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                  >
                    {column.jobs.length}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddJob(column.id)}
                  className="w-full mt-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add job
                </Button>
              </CardHeader>

              <CardContent className="space-y-3 min-h-[100px]">
                {column.jobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <div className="text-2xl mb-2">📋</div>
                    <p className="text-sm">No jobs yet</p>
                  </div>
                ) : (
                  column.jobs.map((job) => (
                    <div key={job.id} className="relative">
                      <JobCard
                        job={job}
                        onUpdate={handleUpdateJob}
                        onDelete={handleDeleteJob}
                        onMove={() => openMoveDialog(job)}
                        isMobile={true}
                      />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Desktop/Tablet View: With drag and drop
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Desktop View */}
          <div className="overflow-x-auto">
            <div className="flex gap-6 min-w-max pb-4">
              {filteredColumns.map((column) => {
                const columnAccents = {
                  shortlist: "border-t-blue-500",
                  "auto-apply": "border-t-purple-500",
                  applied: "border-t-yellow-500",
                  interview: "border-t-green-500",
                  rejected: "border-t-red-500",
                };

                return (
                  <div key={column.id} className="w-80 flex-shrink-0">
                    <Card
                      className={`h-full border border-gray-200 border-t-4 ${
                        columnAccents[column.id]
                      }`}
                    >
                      <CardHeader className="pb-3 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-medium text-gray-900">
                            {column.title}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="bg-white border border-gray-200 text-gray-700"
                          >
                            {column.jobs.length}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddJob(column.id)}
                          className="w-full mt-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add job
                        </Button>
                      </CardHeader>

                      <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                          <CardContent
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`space-y-3 min-h-[500px] p-4 transition-colors ${
                              snapshot.isDraggingOver
                                ? "bg-gray-50 border-2 border-dashed border-gray-300"
                                : ""
                            }`}
                          >
                            {column.jobs.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <div className="text-4xl mb-3 opacity-50">
                                  📋
                                </div>
                                <p className="text-sm font-medium">
                                  No jobs yet
                                </p>
                                <p className="text-xs text-center mt-1">
                                  Drag jobs here or click "Add job"
                                </p>
                              </div>
                            ) : (
                              column.jobs.map((job, index) => (
                                <Draggable
                                  key={job.id}
                                  draggableId={job.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`transition-transform ${
                                        snapshot.isDragging
                                          ? "opacity-75 rotate-2 scale-105 shadow-lg"
                                          : "hover:scale-[1.01]"
                                      }`}
                                    >
                                      <JobCard
                                        job={job}
                                        onUpdate={handleUpdateJob}
                                        onDelete={handleDeleteJob}
                                        isMobile={false}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))
                            )}
                            {provided.placeholder}
                          </CardContent>
                        )}
                      </Droppable>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </DragDropContext>
      )}

      <AddJobDialog
        isOpen={isAddJobOpen}
        onClose={() => setIsAddJobOpen(false)}
        onSave={handleSaveJob}
        defaultStatus={selectedColumn}
      />

      <MoveJobDialog
        isOpen={isMoveDialogOpen}
        onClose={() => {
          setIsMoveDialogOpen(false);
          setJobToMove(null);
        }}
        onMove={handleMoveJob}
        job={jobToMove}
        columns={initialColumns}
      />
    </div>
  );
}
