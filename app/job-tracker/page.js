'use client'
import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { JobTracker } from "@/components/JobTracker";
import styles from "@/app/styles/pages/job-tracker.module.css";

export default function JobTrackerPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-sm text-white p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">AI Job Tracker</h1>
              <p className="text-purple-100 text-sm lg:text-base">
                Track and manage all your job applications in one place
              </p>
            </div>
            <div className="mt-4 lg:mt-0 text-4xl lg:text-6xl">🎯</div>
          </div>
        </div>

        {/* Kanban Board */}
        <JobTracker />
      </div>
    </DashboardLayout>
  );
}