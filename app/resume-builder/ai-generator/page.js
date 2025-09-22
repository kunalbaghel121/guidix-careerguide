"use client";
import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import styles from "@/app/styles/pages/ai-generator.module.css";
import { GraduationCap, Briefcase, Sparkles, ArrowLeft, Stars, Zap } from "lucide-react";

export default function AIGeneratorPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen py-8" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)" }}>
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border p-6 lg:p-8"
            style={{ borderColor: "#e2e8f0", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg" style={{background: 'linear-gradient(135deg, #2370FF, #1d4ed8)'}}>
                  <Sparkles className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Stars className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h1
                  className="text-3xl lg:text-4xl font-black"
                  style={{ color: "#2370FF" }}
                >
                  Hey! What's Your Vibe?
                </h1>
                <div
                  className="flex items-center justify-center gap-2 text-sm font-semibold"
                  style={{ color: "#8A96C9" }}
                ></div>
              </div>

              <p
                className="text-lg lg:text-xl font-semibold leading-relaxed max-w-2xl mx-auto"
                style={{ color: "#475569" }}
              >
                Pick your career move and watch AI craft a resume that{" "}
                <span style={{ color: "#2370FF" }} className="font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  absolutely slaps
                </span>
                <span className="inline-block ml-2">
                  <Sparkles className="w-5 h-5 text-yellow-400 inline animate-bounce" />
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl mx-auto mt-12">
              <Link
                href="/resume-builder/ai-generator/education"
                className="group"
              >
                <div
                  className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border-2 transition-all duration-300 cursor-pointer p-8 text-center group hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
                  style={{ borderColor: "#e2e8f0" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2370FF";
                    e.currentTarget.style.background = "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)";
                    e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(35, 112, 255, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "linear-gradient(135deg, #ffffff 0%, #f0f9ff 20%)";
                    e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "linear-gradient(135deg, #2370FF, #1d4ed8)", color: "white" }}
                  >
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <h3
                      className="text-xl font-black"
                      style={{ color: "#2370FF" }}
                    >
                      Internship Grind
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p
                    className="text-base font-medium leading-relaxed"
                    style={{ color: "#475569" }}
                  >
                    Ready to start your career journey with that{" "}
                    <span style={{ color: "#2370FF" }} className="font-black">
                      first internship flex
                    </span>
                  </p>
                  <div className="mt-6 flex justify-center">
                    {/* <span
                      className="text-xs px-4 py-2 rounded-full font-bold border"
                      style={{ backgroundColor: "#f0f9ff", color: "#2370FF", borderColor: "#bfdbfe" }}
                    >
                      Perfect for beginners
                    </span> */}
                  </div>
                </div>
              </Link>

              <Link
                href="/resume-builder/ai-generator/education"
                className="group"
              >
                <div
                  className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border-2 transition-all duration-300 cursor-pointer p-8 text-center group hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
                  style={{ borderColor: "#e2e8f0" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2370FF";
                    e.currentTarget.style.background = "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)";
                    e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(35, 112, 255, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "linear-gradient(135deg, #ffffff 0%, #faf5ff 20%)";
                    e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "white" }}
                  >
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <h3
                      className="text-xl font-black"
                      style={{ color: "#2370FF" }}
                    >
                      Full-Time Energy
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center animate-pulse">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p
                    className="text-base font-medium leading-relaxed"
                    style={{ color: "#475569" }}
                  >
                    Time to{" "}
                    <span style={{ color: "#2370FF" }} className="font-black">
                      level up your career
                    </span>{" "}
                    with that dream job opportunity
                  </p>
                  <div className="mt-6 flex justify-center">
                    {/* <span
                      className="text-xs px-4 py-2 rounded-full font-bold border"
                      style={{ backgroundColor: "#faf5ff", color: "#7c3aed", borderColor: "#d8b4fe" }}
                    >
                      Career growth mode
                    </span> */}
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex justify-center mt-12">
              <Link
                href="/resume-builder"
                className="px-8 py-4 rounded-xl font-medium border-2 transition-all duration-300 flex items-center gap-3 text-sm group hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#e2e8f0",
                  color: "#475569",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#2370FF";
                  e.target.style.color = "#2370FF";
                  e.target.style.backgroundColor = "#f0f9ff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.color = "#475569";
                  e.target.style.backgroundColor = "#f8fafc";
                }}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Resume Builder</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
