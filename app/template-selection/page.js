"use client";
import styles from "@/app/styles/pages/template-selection.module.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft, Crown, Star, User, Users, Palette } from "lucide-react";

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState("saanvi-patel-1");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState("there");

  // Filter states
  const [filters, setFilters] = useState({
    headshot: 'all', // 'with', 'without', 'all'
    columns: 'all', // '1', '2', 'all'
    style: 'all' // 'traditional', 'creative', 'contemporary', 'all'
  });

  useEffect(() => {
    // Get user name from prompt or use default
    const prompt = searchParams.get('prompt') || '';
    const nameMatch = prompt.match(/I'm\s+\*\*([A-Za-z]+)\*\*/);
    const extractedName = nameMatch ? nameMatch[1] : 'there';
    setUserName(extractedName);
  }, [searchParams]);

  const templates = [
    {
      id: "saanvi-patel-1",
      name: "Saanvi Patel",
      description: "Modern single-column template with photo",
      hasPhoto: true,
      columns: 1,
      style: "contemporary",
      colors: ["#1e40af", "#16a34a", "#7c3aed", "#ea580c", "#dc2626", "#1e3a8a", "multicolor"],
      isRecommended: true
    },
    {
      id: "saanvi-patel-2",
      name: "Saanvi Patel",
      description: "Clean traditional layout without photo",
      hasPhoto: false,
      columns: 1,
      style: "traditional",
      colors: ["#374151", "#16a34a", "#7c2d12", "#0369a1", "#7c3aed", "#1e40af", "multicolor"],
      isRecommended: true
    },
    {
      id: "saanvi-patel-3",
      name: "Saanvi Patel",
      description: "Creative two-column design with photo",
      hasPhoto: true,
      columns: 2,
      style: "creative",
      colors: ["#059669", "#0891b2", "#ea580c", "#dc2626", "#374151", "#1e40af", "multicolor"],
      isRecommended: true
    },
    {
      id: "template-4",
      name: "Modern Pro",
      description: "Professional single-column without photo",
      hasPhoto: false,
      columns: 1,
      style: "contemporary",
      colors: ["#1e40af", "#374151", "#7c3aed", "#ea580c", "#dc2626", "#16a34a", "multicolor"],
      isRecommended: false
    },
    {
      id: "template-5",
      name: "Creative Edge",
      description: "Artistic two-column with photo",
      hasPhoto: true,
      columns: 2,
      style: "creative",
      colors: ["#7c3aed", "#ea580c", "#0891b2", "#dc2626", "#16a34a", "#374151", "multicolor"],
      isRecommended: false
    },
    {
      id: "template-6",
      name: "Classic Business",
      description: "Traditional professional layout",
      hasPhoto: false,
      columns: 1,
      style: "traditional",
      colors: ["#374151", "#1e40af", "#7c2d12", "#0369a1", "#16a34a", "#7c3aed", "multicolor"],
      isRecommended: false
    }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      headshot: 'all',
      columns: 'all',
      style: 'all'
    });
  };

  const filteredTemplates = templates.filter(template => {
    if (filters.headshot !== 'all') {
      if (filters.headshot === 'with' && !template.hasPhoto) return false;
      if (filters.headshot === 'without' && template.hasPhoto) return false;
    }
    if (filters.columns !== 'all' && template.columns.toString() !== filters.columns) return false;
    if (filters.style !== 'all' && template.style !== filters.style) return false;
    return true;
  });

  const handleAdvancedEdit = (templateId) => {
    const params = new URLSearchParams(searchParams);
    params.set('template', templateId);
    params.set('loadingType', '2');
    router.push(`/loading-screen?${params.toString()}`);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      const params = new URLSearchParams(searchParams);
      params.set('template', selectedTemplate);
      params.set('loadingType', '2');
      router.push(`/loading-screen?${params.toString()}`);
    }
  };

  const handlePrev = () => {
    const isFromUpload = searchParams.get('from') === 'upload';
    if (isFromUpload) {
      router.push('/resume-feedback?' + searchParams.toString());
    } else {
      router.push('/ai-prompt?' + searchParams.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Templates that absolutely slay ✨
          </h1>
          <p className="text-gray-600">
            Pick your vibe bestie - you can switch it up later, no cap!
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Clear Filters
                </button>
              </div>

              {/* Headshot Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Headshot</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.headshot === 'with'}
                      onChange={(e) => handleFilterChange('headshot', e.target.checked ? 'with' : 'all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">With photo</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.headshot === 'without'}
                      onChange={(e) => handleFilterChange('headshot', e.target.checked ? 'without' : 'all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Without photo</span>
                  </label>
                </div>
              </div>

              {/* Columns Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Columns</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.columns === '1'}
                      onChange={(e) => handleFilterChange('columns', e.target.checked ? '1' : 'all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">1 Column</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.columns === '2'}
                      onChange={(e) => handleFilterChange('columns', e.target.checked ? '2' : 'all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">2 Columns</span>
                  </label>
                </div>
              </div>

              {/* Style Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Style</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.style === 'traditional'}
                      onChange={(e) => handleFilterChange('style', e.target.checked ? 'traditional' : 'all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Traditional</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.style === 'creative'}
                      onChange={(e) => handleFilterChange('style', e.target.checked ? 'creative' : 'all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Creative</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.style === 'contemporary'}
                      onChange={(e) => handleFilterChange('style', e.target.checked ? 'contemporary' : 'all')}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Contemporary</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all duration-200 hover:shadow-md relative ${
                    selectedTemplate === template.id ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                  }`}
                >
                  {/* Template Preview - Using standard letter size aspect ratio (8.5:11) */}
                  <div className="relative aspect-[8.5/11] bg-white rounded-t-lg overflow-hidden shadow-inner border border-gray-100">

                    {/* Template 1: Modern Two-Column with Photo */}
                    {template.id === "saanvi-patel-1" && (
                      <div className="h-full flex bg-white p-2 text-[4px] leading-tight">
                        {/* Left Sidebar - Dark Blue */}
                        <div className="w-1/3 bg-slate-700 text-white p-1.5 rounded-sm mr-1.5">
                          <div className="text-center mb-2">
                            <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto mb-1 border border-white"></div>
                            <div className="font-bold text-white text-[5px] leading-none">SAANVI</div>
                            <div className="font-bold text-white text-[5px] leading-none">PATEL</div>
                            <div className="text-[3.5px] text-gray-300 mt-0.5">RETAIL SALES ASSOCIATE</div>
                          </div>

                          <div className="mb-1.5">
                            <div className="text-white font-bold mb-0.5 text-[4px] uppercase tracking-wide">CONTACT</div>
                            <div className="text-[3.5px] text-gray-300 space-y-0.5">
                              <div>📧 saanvi.p@email.com</div>
                              <div>📱 (91) 98123-4567</div>
                              <div>🌐 linkedin.com/in/saanvi</div>
                              <div>📍 New Delhi, India</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="text-white font-bold mb-0.5 text-[4px] uppercase tracking-wide">SKILLS</div>
                            <div className="text-[3.5px] text-gray-300 space-y-0.5">
                              <div>• Customer Service Excellence</div>
                              <div>• Sales & Marketing Strategy</div>
                              <div>• Team Leadership</div>
                              <div>• Problem Solving</div>
                              <div>• Effective Communication</div>
                              <div>• Visual Merchandising</div>
                              <div>• Inventory Management</div>
                              <div>• POS Systems</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="text-white font-bold mb-0.5 text-[4px] uppercase tracking-wide">LANGUAGES</div>
                            <div className="text-[3.5px] text-gray-300 space-y-0.5">
                              <div>• English (Fluent)</div>
                              <div>• Hindi (Native)</div>
                              <div>• Punjabi (Conversational)</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="text-white font-bold mb-0.5 text-[4px] uppercase tracking-wide">CERTIFICATIONS</div>
                            <div className="text-[3.5px] text-gray-300 space-y-0.5">
                              <div>• Retail Management Cert.</div>
                              <div>• Customer Service Pro</div>
                              <div>• First Aid/CPR Certified</div>
                              <div>• Digital Marketing Basics</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-white font-bold mb-0.5 text-[4px] uppercase tracking-wide">INTERESTS</div>
                            <div className="text-[3.5px] text-gray-300 space-y-0.5">
                              <div>• Fashion & Style Trends</div>
                              <div>• Photography</div>
                              <div>• Yoga & Wellness</div>
                              <div>• Community Volunteering</div>
                              <div>• Travel & Culture</div>
                            </div>
                          </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="w-2/3 p-1.5">
                          <div className="mb-1.5">
                            <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide border-b border-slate-300 pb-0.5">PROFESSIONAL SUMMARY</div>
                            <div className="text-[3.5px] text-gray-600 leading-relaxed">
                              Highly motivated retail professional with 3+ years of progressive experience in customer service, sales, and team leadership. Consistently exceeded sales targets by 25%+ while maintaining exceptional customer satisfaction ratings. Proven ability to build rapport with diverse clientele, implement effective merchandising strategies, and mentor new team members. Passionate about creating positive shopping experiences and driving business growth through innovative sales approaches.
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide border-b border-slate-300 pb-0.5">WORK EXPERIENCE</div>
                            <div className="text-[3.5px] text-gray-600 space-y-1">
                              <div>
                                <div className="font-semibold text-gray-800">Senior Retail Sales Associate</div>
                                <div className="font-medium text-gray-600">Fashion Forward Boutique • 01/2022 - Present • New Delhi</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Achieved 125% of monthly sales targets for 18 consecutive months</div>
                                  <div>• Increased customer retention rate by 40% through personalized service</div>
                                  <div>• Led visual merchandising initiatives resulting in 20% boost in foot traffic</div>
                                  <div>• Mentored and trained 8 new sales associates on company policies</div>
                                  <div>• Managed inventory worth ₹2.5L+ and reduced shrinkage by 15%</div>
                                </div>
                              </div>

                              <div>
                                <div className="font-semibold text-gray-800">Retail Sales Associate</div>
                                <div className="font-medium text-gray-600">Style Hub • 05/2019 - 12/2021 • New Delhi</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Maintained 95% customer satisfaction rating across all evaluations</div>
                                  <div>• Assisted 50+ customers daily with product selection and styling advice</div>
                                  <div>• Collaborated with team to implement seasonal promotional campaigns</div>
                                  <div>• Processed transactions accurately using multiple POS systems</div>
                                </div>
                              </div>

                              <div>
                                <div className="font-semibold text-gray-800">Sales Intern</div>
                                <div className="font-medium text-gray-600">Trendy Threads • 01/2019 - 04/2019 • New Delhi</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Supported senior staff with customer inquiries and product demonstrations</div>
                                  <div>• Learned inventory management and stock organization procedures</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide border-b border-slate-300 pb-0.5">EDUCATION</div>
                            <div className="text-[3.5px] text-gray-600 space-y-0.5">
                              <div>
                                <div className="font-semibold text-gray-800">Diploma in Financial Accounting</div>
                                <div className="text-gray-600">Delhi University • 2018-2020 • CGPA: 8.2/10</div>
                                <div className="text-gray-500">Relevant Coursework: Business Mathematics, Economics, Financial Management</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">Higher Secondary Certificate (Commerce)</div>
                                <div className="text-gray-600">Modern Public School • 2016-2018 • 85%</div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide border-b border-slate-300 pb-0.5">KEY ACHIEVEMENTS</div>
                            <div className="text-[3.5px] text-gray-600 space-y-0.5">
                              <div>🏆 Employee of the Month Award (March 2023, July 2023, November 2023)</div>
                              <div>🏆 Top Sales Performer of the Year 2023 (₹15L+ in sales)</div>
                              <div>🏆 Customer Service Excellence Award 2022</div>
                              <div>🏆 Perfect Attendance Recognition 2021-2023</div>
                              <div>🏆 Team Leadership Award for training program development</div>
                              <div>🏆 Innovation Award for implementing customer feedback system</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide border-b border-slate-300 pb-0.5">VOLUNTEER EXPERIENCE</div>
                            <div className="text-[3.5px] text-gray-600 space-y-0.5">
                              <div>
                                <div className="font-semibold text-gray-800">Community Outreach Volunteer</div>
                                <div className="text-gray-600">Delhi Youth Foundation • 2020-Present</div>
                                <div>• Organized clothing drives for underprivileged communities</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide border-b border-slate-300 pb-0.5">ADDITIONAL INFORMATION</div>
                            <div className="text-[3.5px] text-gray-600 space-y-0.5">
                              <div>• Flexible schedule availability including weekends and holidays</div>
                              <div>• Strong proficiency in MS Office Suite (Word, Excel, PowerPoint)</div>
                              <div>• Experience with CRM software and sales analytics tools</div>
                              <div>• Valid driver's license and own transportation</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Template 2: Traditional Single Column */}
                    {template.id === "saanvi-patel-2" && (
                      <div className="h-full p-2 text-[4px] leading-tight bg-white">
                        {/* Header */}
                        <div className="text-center mb-2 pb-1 border-b-2 border-slate-700">
                          <div className="font-bold text-[8px] text-slate-700 tracking-wider">SAANVI PATEL</div>
                          <div className="text-[5px] text-gray-600 mt-0.5 font-medium">RETAIL SALES ASSOCIATE</div>
                          <div className="text-[3.5px] text-gray-500 mt-0.5">New Delhi, India • (91) 98 123-4567 • saanvi.patel@email.com • linkedin.com/in/saanvipatel</div>
                        </div>

                        {/* Professional Summary */}
                        <div className="mb-1.5">
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">PROFESSIONAL SUMMARY</div>
                          <div className="text-[3.5px] text-gray-600 leading-relaxed">
                            Dynamic and results-oriented Retail Sales Associate with 3+ years of progressive experience in high-volume retail environments. Demonstrated expertise in building strong client relationships, consistently exceeding sales targets by 25%+, and delivering exceptional customer service. Proven track record in team leadership, inventory management, visual merchandising, and store operations optimization. Passionate about creating memorable shopping experiences that drive customer loyalty and business growth.
                          </div>
                        </div>

                        {/* Core Competencies */}
                        <div className="mb-1.5">
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">CORE COMPETENCIES</div>
                          <div className="text-[3.5px] text-gray-600 grid grid-cols-3 gap-x-1">
                            <div>• Sales & Marketing Strategy</div>
                            <div>• Customer Relationship Mgmt</div>
                            <div>• Inventory Management</div>
                            <div>• Visual Merchandising</div>
                            <div>• Team Leadership & Training</div>
                            <div>• Problem Resolution</div>
                            <div>• POS Systems Operation</div>
                            <div>• Product Knowledge</div>
                            <div>• Loss Prevention</div>
                            <div>• Cash Handling</div>
                            <div>• Multi-tasking</div>
                            <div>• Bilingual Communication</div>
                          </div>
                        </div>

                        {/* Professional Experience */}
                        <div className="mb-1.5">
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">PROFESSIONAL EXPERIENCE</div>
                          <div className="text-[3.5px] text-gray-600 space-y-1">
                            <div>
                              <div className="font-semibold text-gray-800">Senior Retail Sales Associate</div>
                              <div className="font-medium text-gray-600">Fashion Forward Boutique • 01/2022 - Present • New Delhi, India</div>
                              <div className="mt-0.5 space-y-0.5">
                                <div>• Achieved 125% of monthly sales targets for 18 consecutive months, generating ₹15L+ in annual sales</div>
                                <div>• Improved customer satisfaction scores from 78% to 95% through personalized service approach</div>
                                <div>• Mentored and trained 8 new sales associates on company policies, product knowledge, and sales techniques</div>
                                <div>• Implemented visual merchandising strategies resulting in 20% increase in foot traffic and impulse purchases</div>
                                <div>• Managed inventory worth ₹2.5L+ and reduced shrinkage by 15% through effective loss prevention measures</div>
                                <div>• Led customer feedback initiative that improved store rating from 4.2 to 4.8 stars on Google Reviews</div>
                              </div>
                            </div>

                            <div>
                              <div className="font-semibold text-gray-800">Retail Sales Associate</div>
                              <div className="font-medium text-gray-600">Style Hub Fashion • 05/2019 - 12/2021 • New Delhi, India</div>
                              <div className="mt-0.5 space-y-0.5">
                                <div>• Maintained 95% customer satisfaction rating across all quarterly evaluations</div>
                                <div>• Assisted 50+ customers daily with product selection, styling advice, and outfit coordination</div>
                                <div>• Collaborated with team to implement seasonal promotional campaigns increasing sales by 30%</div>
                                <div>• Processed transactions accurately using multiple POS systems with 99.8% accuracy rate</div>
                                <div>• Participated in store layout redesign that improved customer flow and shopping experience</div>
                              </div>
                            </div>

                            <div>
                              <div className="font-semibold text-gray-800">Sales Intern</div>
                              <div className="font-medium text-gray-600">Trendy Threads Retail • 01/2019 - 04/2019 • New Delhi, India</div>
                              <div className="mt-0.5 space-y-0.5">
                                <div>• Supported senior staff with customer inquiries, product demonstrations, and sales assistance</div>
                                <div>• Learned comprehensive inventory management and stock organization procedures</div>
                                <div>• Gained hands-on experience in cash handling, returns processing, and customer service protocols</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Education */}
                        <div className="mb-1.5">
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">EDUCATION</div>
                          <div className="text-[3.5px] text-gray-600 space-y-0.5">
                            <div>
                              <div className="font-semibold text-gray-800">Diploma in Financial Accounting</div>
                              <div className="text-gray-600">Delhi University • 2018-2020 • CGPA: 8.2/10 • Delhi, India</div>
                              <div className="text-gray-500">Relevant Coursework: Business Mathematics, Economics, Financial Management, Cost Accounting</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">Higher Secondary Certificate (Commerce Stream)</div>
                              <div className="text-gray-600">Modern Public School • 2016-2018 • 85% • New Delhi, India</div>
                              <div className="text-gray-500">Subjects: Accountancy, Business Studies, Economics, English, Mathematics</div>
                            </div>
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="mb-1.5">
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">CERTIFICATIONS & TRAINING</div>
                          <div className="text-[3.5px] text-gray-600 space-y-0.5">
                            <div>• Retail Management Professional Certification - National Retail Federation (2023)</div>
                            <div>• Customer Service Excellence Certificate - Dale Carnegie Training (2022)</div>
                            <div>• First Aid and CPR Certified - Red Cross India (2023)</div>
                            <div>• Digital Marketing Fundamentals - Google Digital Garage (2023)</div>
                            <div>• Inventory Management Systems Training - Internal Certification (2022)</div>
                          </div>
                        </div>

                        {/* Key Achievements */}
                        <div className="mb-1.5">
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">KEY ACHIEVEMENTS & AWARDS</div>
                          <div className="text-[3.5px] text-gray-600 space-y-0.5">
                            <div>🏆 Employee of the Month Award (March 2023, July 2023, November 2023)</div>
                            <div>🏆 Top Sales Performer of the Year 2023 (₹15L+ in individual sales)</div>
                            <div>🏆 Customer Service Excellence Award 2022</div>
                            <div>🏆 Perfect Attendance Recognition 2021-2023</div>
                            <div>🏆 Team Leadership Award for successful training program development</div>
                            <div>🏆 Innovation Award for implementing customer feedback system</div>
                            <div>🏆 Best Visual Merchandising Display Award (Q3 2023)</div>
                          </div>
                        </div>

                        {/* Volunteer Experience */}
                        <div className="mb-1.5">
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">VOLUNTEER EXPERIENCE</div>
                          <div className="text-[3.5px] text-gray-600">
                            <div className="font-semibold text-gray-800">Community Outreach Volunteer</div>
                            <div className="text-gray-600">Delhi Youth Foundation • 2020 - Present</div>
                            <div className="mt-0.5 space-y-0.5">
                              <div>• Organized monthly clothing drives for underprivileged communities, collecting 500+ items</div>
                              <div>• Coordinated with local NGOs to distribute essential items during COVID-19 pandemic</div>
                              <div>• Mentored 15+ youth in developing professional and life skills</div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mb-1.5">
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">TECHNICAL SKILLS</div>
                          <div className="text-[3.5px] text-gray-600 grid grid-cols-2 gap-x-2">
                            <div>• MS Office Suite (Advanced)</div>
                            <div>• POS Systems (Multiple platforms)</div>
                            <div>• CRM Software (Salesforce basics)</div>
                            <div>• Inventory Management Systems</div>
                            <div>• Social Media Marketing</div>
                            <div>• Basic Photo Editing</div>
                          </div>
                        </div>

                        {/* Languages & Interests */}
                        <div>
                          <div className="font-bold text-slate-700 mb-0.5 text-[4px] uppercase tracking-wide">LANGUAGES & INTERESTS</div>
                          <div className="text-[3.5px] text-gray-600">
                            <div className="mb-0.5">
                              <span className="font-semibold">Languages:</span> English (Fluent), Hindi (Native), Punjabi (Conversational), Spanish (Basic)
                            </div>
                            <div>
                              <span className="font-semibold">Interests:</span> Fashion & Style Trends, Photography, Yoga & Wellness, Travel, Community Service, Reading Business Books
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Template 3: Creative Green Two-Column */}
                    {template.id === "saanvi-patel-3" && (
                      <div className="h-full flex bg-white">
                        {/* Left Column - Green Sidebar */}
                        <div className="w-2/5 bg-emerald-600 text-white p-3 text-[6px]">
                          <div className="text-center mb-3">
                            <div className="w-10 h-10 bg-white rounded-full mx-auto mb-2 shadow-md"></div>
                            <div className="font-bold text-[9px] leading-none">Saanvi Patel</div>
                            <div className="text-[6px] mt-1 font-medium opacity-90">RETAIL SALES ASSOCIATE</div>
                          </div>

                          <div className="mb-3">
                            <div className="text-white font-bold mb-1.5 text-[6px] uppercase tracking-wide">CONTACT</div>
                            <div className="text-[5px] space-y-1">
                              <div className="flex items-center gap-1">
                                <span>📧</span> saanvi.patel@email.com
                              </div>
                              <div className="flex items-center gap-1">
                                <span>📱</span> +91 98 123-4567
                              </div>
                              <div className="flex items-center gap-1">
                                <span>🌐</span> linkedin.com/in/saanvipatel
                              </div>
                              <div className="flex items-center gap-1">
                                <span>📍</span> New Delhi, India
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="text-white font-bold mb-1.5 text-[6px] uppercase tracking-wide">EDUCATION</div>
                            <div className="text-[5px]">
                              <div className="font-semibold">Diploma in Financial Accounting</div>
                              <div className="opacity-90">Delhi University</div>
                              <div className="opacity-90">2018 - 2020</div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="text-white font-bold mb-1.5 text-[6px] uppercase tracking-wide">SKILLS</div>
                            <div className="text-[5px] space-y-0.5">
                              <div>• Customer Service</div>
                              <div>• Sales Strategy</div>
                              <div>• Team Leadership</div>
                              <div>• Inventory Management</div>
                              <div>• Visual Merchandising</div>
                              <div>• Problem Solving</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-white font-bold mb-1.5 text-[6px] uppercase tracking-wide">LANGUAGES</div>
                            <div className="text-[5px] space-y-0.5">
                              <div>• English (Fluent)</div>
                              <div>• Hindi (Native)</div>
                              <div>• Punjabi (Conversational)</div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Main Content */}
                        <div className="w-3/5 p-3 text-[6px]">
                          <div className="mb-2">
                            <div className="font-bold text-emerald-700 mb-1 text-[7px] uppercase tracking-wide">PROFESSIONAL SUMMARY</div>
                            <div className="text-[5px] text-gray-600 leading-relaxed">
                              Dynamic retail professional with 3+ years of proven success in sales, customer service, and team leadership. Consistently exceeds targets while building lasting customer relationships. Passionate about creating exceptional shopping experiences and driving business growth.
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="font-bold text-emerald-700 mb-1 text-[7px] uppercase tracking-wide">PROFESSIONAL EXPERIENCE</div>
                            <div className="text-[5px] text-gray-600">
                              <div className="mb-1.5">
                                <div className="font-semibold text-gray-800">Senior Retail Sales Associate</div>
                                <div className="font-medium text-emerald-600">Fashion Forward • 05/2019 - Present</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Achieved 125% of sales targets for 18 consecutive months</div>
                                  <div>• Improved customer satisfaction ratings by 30%</div>
                                  <div>• Led training programs for 5 new team members</div>
                                  <div>• Implemented merchandising strategies increasing sales by 20%</div>
                                </div>
                              </div>

                              <div>
                                <div className="font-semibold text-gray-800">Sales Assistant</div>
                                <div className="font-medium text-emerald-600">Retail Plus • 01/2018 - 04/2019</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Maintained 95% customer satisfaction score</div>
                                  <div>• Assisted in inventory management and stock control</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="font-bold text-emerald-700 mb-1 text-[7px] uppercase tracking-wide">KEY ACHIEVEMENTS</div>
                            <div className="text-[5px] text-gray-600 space-y-0.5">
                              <div>🏆 Employee of the Month (3 times in 2023)</div>
                              <div>🏆 Top Sales Performer of the Year 2023</div>
                              <div>🏆 Customer Service Excellence Award 2022</div>
                              <div>🏆 Perfect Attendance Award 2021-2023</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-emerald-700 mb-1 text-[6px] uppercase tracking-wide">CERTIFICATIONS</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>• Retail Sales Certification (2023)</div>
                              <div>• Customer Service Excellence (2022)</div>
                              <div>• First Aid & CPR Certified (2023)</div>
                              <div>• Digital Marketing Basics (2023)</div>
                              <div>• Inventory Management Systems (2022)</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-emerald-700 mb-1 text-[6px] uppercase tracking-wide">VOLUNTEER WORK</div>
                            <div className="text-[4px] text-gray-600">
                              <div className="font-semibold text-gray-800">Community Outreach Volunteer</div>
                              <div className="font-medium text-emerald-600">Delhi Youth Foundation • 2020-Present</div>
                              <div className="mt-0.5 space-y-0.5">
                                <div>• Organized clothing drives collecting 500+ items</div>
                                <div>• Mentored 15+ youth in professional development</div>
                                <div>• Coordinated COVID-19 relief efforts</div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-emerald-700 mb-1 text-[6px] uppercase tracking-wide">PROJECTS</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>
                                <div className="font-semibold text-gray-800">Customer Feedback System Implementation</div>
                                <div>• Designed and implemented digital feedback collection system</div>
                                <div>• Increased response rate by 60% and improved store rating to 4.8/5</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">Store Layout Optimization Project</div>
                                <div>• Collaborated on redesigning store layout for improved customer flow</div>
                                <div>• Result: 25% increase in average transaction value</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-emerald-700 mb-1 text-[6px] uppercase tracking-wide">ADDITIONAL INFO</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>• Available for flexible scheduling including weekends</div>
                              <div>• Proficient in MS Office Suite and social media platforms</div>
                              <div>• Strong analytical skills with attention to detail</div>
                              <div>• Excellent interpersonal and cross-cultural communication</div>
                              <div>• Valid driver's license with reliable transportation</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Template 4: Modern Professional */}
                    {template.id === "template-4" && (
                      <div className="h-full p-4 text-[6px] bg-gray-50 leading-tight">
                        <div className="text-center mb-3 border-b-2 border-blue-600 pb-2">
                          <div className="font-bold text-[10px] text-gray-800 tracking-wider">ALEX JOHNSON</div>
                          <div className="text-blue-600 font-semibold text-[7px] mt-0.5">SOFTWARE ENGINEER</div>
                          <div className="text-[5px] text-gray-500 mt-1">alex.johnson@email.com • +1 (555) 123-4567 • San Francisco, CA</div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="font-bold text-gray-800 border-b border-blue-600 mb-1 text-[6px] uppercase tracking-wide">PROFESSIONAL SUMMARY</div>
                            <div className="text-[5px] text-gray-600 leading-relaxed">
                              Full-stack software engineer with 5+ years of experience building scalable web applications. Expertise in modern JavaScript frameworks, cloud technologies, and agile development methodologies.
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-gray-800 border-b border-blue-600 mb-1 text-[6px] uppercase tracking-wide">TECHNICAL SKILLS</div>
                            <div className="text-[5px] text-gray-600 grid grid-cols-2 gap-x-2">
                              <div>• React, Vue.js, Angular</div>
                              <div>• Node.js, Express, Django</div>
                              <div>• Python, JavaScript, TypeScript</div>
                              <div>• AWS, Docker, Kubernetes</div>
                              <div>• PostgreSQL, MongoDB</div>
                              <div>• Git, Jenkins, Agile</div>
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-gray-800 border-b border-blue-600 mb-1 text-[6px] uppercase tracking-wide">EXPERIENCE</div>
                            <div className="text-[5px] text-gray-600 space-y-1">
                              <div>
                                <div className="font-semibold text-gray-800">Senior Software Engineer</div>
                                <div className="font-medium text-blue-600">TechCorp Inc. • 2021 - Present • San Francisco, CA</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Led development of microservices architecture serving 1M+ users</div>
                                  <div>• Reduced application load time by 40% through optimization</div>
                                  <div>• Mentored 3 junior developers and conducted code reviews</div>
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">Software Engineer</div>
                                <div className="font-medium text-blue-600">StartupXYZ • 2019 - 2021 • San Francisco, CA</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Built RESTful APIs and responsive web applications</div>
                                  <div>• Implemented automated testing increasing code coverage to 90%</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="font-bold text-gray-800 border-b border-blue-600 mb-1 text-[5px] uppercase tracking-wide">EDUCATION</div>
                            <div className="text-[4px] text-gray-600">
                              <div className="font-semibold text-gray-800">B.S. Computer Science</div>
                              <div className="text-gray-600">Stanford University • 2015-2019 • GPA: 3.8/4.0</div>
                              <div className="text-gray-500">Relevant Coursework: Data Structures, Algorithms, Database Systems</div>
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="font-bold text-gray-800 border-b border-blue-600 mb-1 text-[5px] uppercase tracking-wide">PROJECTS</div>
                            <div className="text-[4px] text-gray-600 space-y-1">
                              <div>
                                <div className="font-semibold text-gray-800">E-Commerce Platform</div>
                                <div className="text-blue-600">React, Node.js, PostgreSQL • 2023</div>
                                <div>• Built full-stack application handling 10K+ concurrent users</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">ML Recommendation System</div>
                                <div className="text-blue-600">Python, TensorFlow, AWS • 2023</div>
                                <div>• Developed ML model improving accuracy by 35%</div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="font-bold text-gray-800 border-b border-blue-600 mb-1 text-[5px] uppercase tracking-wide">CERTIFICATIONS</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>• AWS Certified Solutions Architect (2023)</div>
                              <div>• Google Cloud Professional Developer (2023)</div>
                              <div>• Certified Kubernetes Administrator (2022)</div>
                              <div>• Scrum Master Certification (2022)</div>
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-gray-800 border-b border-blue-600 mb-1 text-[5px] uppercase tracking-wide">ADDITIONAL INFO</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>• Open source contributor with 50+ GitHub repositories</div>
                              <div>• Tech blog writer with 10K+ monthly readers</div>
                              <div>• Volunteer coding instructor for communities</div>
                              <div>• Fluent in English and Mandarin Chinese</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Template 5: Creative Edge */}
                    {template.id === "template-5" && (
                      <div className="h-full flex bg-white">
                        <div className="w-1/3 bg-purple-600 text-white p-3 text-[6px]">
                          <div className="text-center mb-3">
                            <div className="w-8 h-8 bg-white rounded-full mx-auto mb-1.5 shadow-md"></div>
                            <div className="font-bold text-[8px] leading-none">MAYA</div>
                            <div className="font-bold text-[8px] leading-none">CHEN</div>
                            <div className="text-[5px] mt-1 opacity-90">UI/UX DESIGNER</div>
                          </div>

                          <div className="mb-3">
                            <div className="text-white font-bold mb-1.5 text-[6px] uppercase tracking-wide">CONTACT</div>
                            <div className="text-[5px] space-y-1">
                              <div>📧 maya.chen@email.com</div>
                              <div>🎨 mayachen.design</div>
                              <div>💼 linkedin.com/in/mayachen</div>
                              <div>📱 +1 (555) 987-6543</div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="text-white font-bold mb-1.5 text-[6px] uppercase tracking-wide">DESIGN SKILLS</div>
                            <div className="text-[5px] space-y-0.5">
                              <div>• Figma & Sketch</div>
                              <div>• Adobe Creative Suite</div>
                              <div>• Prototyping</div>
                              <div>• User Research</div>
                              <div>• Wireframing</div>
                              <div>• Design Systems</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-white font-bold mb-1.5 text-[6px] uppercase tracking-wide">SOFTWARE</div>
                            <div className="text-[5px] space-y-0.5">
                              <div>• Figma</div>
                              <div>• Adobe XD</div>
                              <div>• Photoshop</div>
                              <div>• Illustrator</div>
                              <div>• InVision</div>
                            </div>
                          </div>
                        </div>

                        <div className="w-2/3 p-3 text-[6px]">
                          <div className="mb-2">
                            <div className="font-bold text-purple-600 mb-1 text-[7px] uppercase tracking-wide">CREATIVE SUMMARY</div>
                            <div className="text-[5px] text-gray-600 leading-relaxed">
                              Passionate UI/UX designer with 4+ years of experience creating intuitive digital experiences. Specialized in mobile-first design, user research, and design systems. Proven track record of increasing user engagement by 50%.
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="font-bold text-purple-600 mb-1 text-[7px] uppercase tracking-wide">DESIGN EXPERIENCE</div>
                            <div className="text-[5px] text-gray-600 space-y-1">
                              <div>
                                <div className="font-semibold text-gray-800">Senior UI/UX Designer</div>
                                <div className="font-medium text-purple-600">Creative Digital Agency • 2021 - Present</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Designed mobile apps with 4.8+ App Store ratings</div>
                                  <div>• Led design system implementation across 5 products</div>
                                  <div>• Conducted user research with 200+ participants</div>
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">UI Designer</div>
                                <div className="font-medium text-purple-600">Tech Startup • 2020 - 2021</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Redesigned web platform increasing conversion by 35%</div>
                                  <div>• Created prototypes and wireframes for 3 major features</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="font-bold text-purple-600 mb-1 text-[7px] uppercase tracking-wide">EDUCATION</div>
                            <div className="text-[5px] text-gray-600">
                              <div className="font-semibold text-gray-800">B.A. Graphic Design</div>
                              <div className="text-gray-600">Art Institute • 2016-2020</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-purple-600 mb-1 text-[6px] uppercase tracking-wide">AWARDS</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>🏆 Best Mobile App Design 2023</div>
                              <div>🏆 UX Design Excellence Award 2022</div>
                              <div>🏆 Creative Innovation Award 2021</div>
                              <div>🏆 Design Team Leadership Award 2023</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-purple-600 mb-1 text-[6px] uppercase tracking-wide">PROJECTS</div>
                            <div className="text-[4px] text-gray-600 space-y-1">
                              <div>
                                <div className="font-semibold text-gray-800">FinTech Mobile App Redesign</div>
                                <div className="text-purple-600">Lead Designer • 2023</div>
                                <div>• Increased user retention by 65% through UX improvements</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">E-Learning Platform Design System</div>
                                <div className="text-purple-600">Senior Designer • 2022</div>
                                <div>• Created design system adopted across 8 products</div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-purple-600 mb-1 text-[6px] uppercase tracking-wide">VOLUNTEER WORK</div>
                            <div className="text-[4px] text-gray-600">
                              <div className="font-semibold text-gray-800">Design Mentor</div>
                              <div className="text-purple-600">Design for Good Initiative • 2021-Present</div>
                              <div>• Mentored 20+ aspiring designers from underrepresented communities</div>
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-purple-600 mb-1 text-[6px] uppercase tracking-wide">ADDITIONAL INFO</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>• Speaker at design conferences and workshops</div>
                              <div>• Proficient in front-end development (HTML, CSS, JS)</div>
                              <div>• Fluent in English, Spanish, and Portuguese</div>
                              <div>• Photography enthusiast with published work</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Template 6: Classic Business */}
                    {template.id === "template-6" && (
                      <div className="h-full p-4 text-[6px] bg-white leading-tight">
                        <div className="text-center mb-3 border-b-2 border-gray-800 pb-2">
                          <div className="font-bold text-[10px] text-gray-800 tracking-wider">ROBERT WILLIAMS</div>
                          <div className="text-gray-600 text-[6px] mt-0.5 font-medium">BUSINESS ANALYST</div>
                          <div className="text-[5px] text-gray-500 mt-1">robert.williams@email.com • +1 (555) 555-0123 • New York, NY</div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="font-bold text-gray-800 mb-0.5 text-[6px] uppercase tracking-wide">PROFESSIONAL SUMMARY</div>
                            <div className="text-[5px] text-gray-600 leading-relaxed">
                              Results-driven Business Analyst with 6+ years of experience in data analysis, process improvement, and stakeholder management. Proven ability to translate business requirements into actionable insights and drive strategic decision-making.
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-gray-800 mb-0.5 text-[6px] uppercase tracking-wide">CORE COMPETENCIES</div>
                            <div className="text-[5px] text-gray-600 grid grid-cols-2 gap-x-2">
                              <div>• Data Analysis & Modeling</div>
                              <div>• Process Optimization</div>
                              <div>• SQL & Python</div>
                              <div>• Tableau & Power BI</div>
                              <div>• Stakeholder Management</div>
                              <div>• Requirements Gathering</div>
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-gray-800 mb-0.5 text-[6px] uppercase tracking-wide">PROFESSIONAL EXPERIENCE</div>
                            <div className="text-[5px] text-gray-600 space-y-1">
                              <div>
                                <div className="font-semibold text-gray-800">Senior Business Analyst</div>
                                <div className="font-medium text-gray-600">Global Finance Corp • 2020 - Present • New York, NY</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Analyzed business processes resulting in 25% efficiency improvement</div>
                                  <div>• Led cross-functional teams of 8+ members on strategic initiatives</div>
                                  <div>• Developed automated reporting dashboards saving 15 hours/week</div>
                                  <div>• Identified cost-saving opportunities worth $2.3M annually</div>
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">Business Analyst</div>
                                <div className="font-medium text-gray-600">TechSolutions Inc. • 2018 - 2020 • New York, NY</div>
                                <div className="mt-0.5 space-y-0.5">
                                  <div>• Conducted market research and competitive analysis</div>
                                  <div>• Created business requirements documentation for 10+ projects</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-gray-800 mb-0.5 text-[5px] uppercase tracking-wide">EDUCATION & CERTIFICATIONS</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>
                                <div className="font-semibold text-gray-800">MBA in Finance</div>
                                <div className="text-gray-600">Columbia Business School • 2018 • GPA: 3.9/4.0</div>
                                <div className="text-gray-500">Concentration: Corporate Finance, Investment Banking</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">B.S. Business Administration</div>
                                <div className="text-gray-600">New York University • 2016 • Summa Cum Laude</div>
                                <div className="text-gray-500">Major: Finance, Minor: Economics</div>
                              </div>
                              <div className="font-semibold text-gray-700 mt-1">Professional Certifications:</div>
                              <div>• Certified Business Analysis Professional (CBAP) - 2023</div>
                              <div>• Six Sigma Green Belt Certification - 2022</div>
                              <div>• Project Management Professional (PMP) - 2021</div>
                              <div>• Tableau Desktop Certified Professional - 2023</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-gray-800 mb-0.5 text-[5px] uppercase tracking-wide">KEY PROJECTS</div>
                            <div className="text-[4px] text-gray-600 space-y-1">
                              <div>
                                <div className="font-semibold text-gray-800">Digital Transformation Initiative</div>
                                <div className="text-gray-600">Project Lead • 2023</div>
                                <div>• Led cross-functional team of 15+ members across 4 departments</div>
                                <div>• Delivered $5M cost reduction through process automation</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">Market Entry Strategy Analysis</div>
                                <div className="text-gray-600">Senior Analyst • 2022</div>
                                <div>• Conducted comprehensive market research for European expansion</div>
                                <div>• Developed business case resulting in successful $20M market entry</div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-gray-800 mb-0.5 text-[5px] uppercase tracking-wide">TECHNICAL PROFICIENCIES</div>
                            <div className="text-[4px] text-gray-600 grid grid-cols-2 gap-x-2">
                              <div>• Advanced Excel & VBA</div>
                              <div>• SQL & Database Management</div>
                              <div>• Python for Data Analysis</div>
                              <div>• Tableau & Power BI</div>
                              <div>• SAP & ERP Systems</div>
                              <div>• JIRA & Confluence</div>
                              <div>• R Statistical Software</div>
                              <div>• Salesforce CRM</div>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <div className="font-bold text-gray-800 mb-0.5 text-[5px] uppercase tracking-wide">PROFESSIONAL ASSOCIATIONS</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>• International Institute of Business Analysis (IIBA) - Member since 2020</div>
                              <div>• Project Management Institute (PMI) - Active Member</div>
                              <div>• New York Business Analytics Association - Board Member</div>
                              <div>• Columbia Business School Alumni Network - Active Participant</div>
                            </div>
                          </div>

                          <div>
                            <div className="font-bold text-gray-800 mb-0.5 text-[5px] uppercase tracking-wide">ADDITIONAL INFORMATION</div>
                            <div className="text-[4px] text-gray-600 space-y-0.5">
                              <div>• Published researcher with 3 papers in business analytics journals</div>
                              <div>• Guest lecturer at NYU Stern School of Business</div>
                              <div>• Fluent in English, Spanish, and French</div>
                              <div>• Marathon runner and outdoor enthusiast</div>
                              <div>• Volunteer financial literacy instructor for non-profits</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Recommended Badge */}
                    {template.isRecommended && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">
                          RECOMMENDED
                        </span>
                      </div>
                    )}

                    {/* Selection Checkmark */}
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Template Name */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:border-blue-400 hover:text-blue-700 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`px-8 py-3 font-bold rounded-lg transition-all duration-300 flex items-center gap-2 ${
              !selectedTemplate
                ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}