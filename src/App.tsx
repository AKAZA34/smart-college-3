import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { CampusCopilot } from './components/copilot/CampusCopilot';

import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { AttendancePredictor } from './pages/AttendancePredictor';
import { CgpaPredictor } from './pages/CgpaPredictor';
import { StudyPlanner } from './pages/StudyPlanner';
import { AcademicRisk } from './pages/AcademicRisk';
import { DocumentIntelligence } from './pages/DocumentIntelligence';
import { RagKnowledgeBase } from './pages/RagKnowledgeBase';
import { AttendanceLogs } from './pages/AttendanceLogs';
import { MarksResults } from './pages/MarksResults';
import { TimetableExams } from './pages/TimetableExams';
import { AssignmentTracker } from './pages/AssignmentTracker';
import { LeaveApplication } from './pages/LeaveApplication';
import { CampusMapLabs } from './pages/CampusMapLabs';
import { FacultyDashboard } from './pages/FacultyDashboard';
import { ParentDashboard } from './pages/ParentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AiInsightsCenter } from './pages/AiInsightsCenter';
import { LoginPage } from './pages/LoginPage';
import { QuantumCampusState } from './components/quantum/QuantumCampusState';
import { Menu } from 'lucide-react';
import { useAppState } from './data/store';

export default function App() {
  const { isAuthenticated } = useAppState();
  const [currentRoute, setCurrentRoute] = useState<string>('student-dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [externalCopilotQuery, setExternalCopilotQuery] = useState<string | undefined>(undefined);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerCopilot = (prompt: string) => {
    setExternalCopilotQuery(prompt);
  };

  const renderActiveRoute = () => {
    // If not authenticated and not explicitly on landing, show LoginPage
    if (!isAuthenticated && currentRoute !== 'landing') {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    switch (currentRoute) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} onTriggerCopilot={handleTriggerCopilot} />;
      case 'student-dashboard':
        return <StudentDashboard onNavigate={handleNavigate} onTriggerCopilot={handleTriggerCopilot} />;
      case 'quantum-state':
        return (
          <div className="space-y-6 pb-12">
            <QuantumCampusState onNavigate={handleNavigate} />
          </div>
        );
      case 'attendance-predictor':
        return <AttendancePredictor />;
      case 'cgpa-predictor':
        return <CgpaPredictor />;
      case 'study-planner':
        return <StudyPlanner />;
      case 'academic-risk':
        return <AcademicRisk />;
      case 'doc-intelligence':
        return <DocumentIntelligence />;
      case 'rag-knowledge':
        return <RagKnowledgeBase />;
      case 'attendance':
      case 'faculty-attendance':
        return <AttendanceLogs />;
      case 'marks':
      case 'faculty-marks':
        return <MarksResults />;
      case 'timetable':
        return <TimetableExams />;
      case 'assignments':
        return <AssignmentTracker />;
      case 'leaves':
      case 'faculty-leaves':
        return <LeaveApplication />;
      case 'campus-map':
        return <CampusMapLabs />;
      case 'faculty-dashboard':
        return <FacultyDashboard />;
      case 'parent-dashboard':
        return <ParentDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'ai-insights':
        return <AiInsightsCenter onNavigate={handleNavigate} />;
      default:
        return <StudentDashboard onNavigate={handleNavigate} onTriggerCopilot={handleTriggerCopilot} />;
    }
  };

  const isFullscreen = currentRoute === 'landing' || currentRoute === 'login' || (!isAuthenticated && currentRoute !== 'landing');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex w-full">
        {/* Sidebar navigation (hidden on landing and login pages) */}
        {!isFullscreen && (
          <Sidebar
            currentRoute={currentRoute}
            onNavigate={handleNavigate}
            isOpen={isSidebarOpen}
            onCloseMobile={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Page Content Viewport */}
        <main className={`flex-1 w-full overflow-x-hidden ${isFullscreen ? '' : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'}`}>
          {/* Mobile Sidebar Toggle Button */}
          {!isFullscreen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden mb-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 flex items-center gap-2 text-xs"
            >
              <Menu className="w-4 h-4 text-cyan-400" />
              <span>Menu</span>
            </button>
          )}

          {renderActiveRoute()}
        </main>
      </div>

      {/* Global Modals & AI Floating Assistant */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onTriggerCopilot={handleTriggerCopilot}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleNavigate}
      />

      <CampusCopilot
        onNavigate={handleNavigate}
        externalQuery={externalCopilotQuery}
        onClearExternalQuery={() => setExternalCopilotQuery(undefined)}
      />
    </div>
  );
}
