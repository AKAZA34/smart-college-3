import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Users,
  Eye,
  EyeOff,
  ArrowRight,
  Fingerprint,
  Radio,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RefreshCw,
  HelpCircle,
  X,
  Building,
  Check,
  ChevronRight,
  Layers,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppState } from '../data/store';
import { UserRole, AuthUser } from '../types';

interface LoginPageProps {
  onNavigate: (route: string) => void;
}

interface DemoAccount {
  role: UserRole;
  name: string;
  avatar: string;
  identifier: string;
  password: string;
  label: string;
  department: string;
  rollNumber?: string;
  designation?: string;
  wardName?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, currentStudent } = useAppState();

  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [authMode, setAuthMode] = useState<'password' | 'biometric' | 'sso' | 'activate'>('password');
  
  // Form fields
  const [identifier, setIdentifier] = useState('CS23B1042');
  const [password, setPassword] = useState('pass@campus2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Activation form fields
  const [activateRollNo, setActivateRollNo] = useState('');
  const [activateDob, setActivateDob] = useState('');
  const [activateOtp, setActivateOtp] = useState('');
  const [activateNewPassword, setActivateNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // States
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [biometricSuccess, setBiometricSuccess] = useState(false);

  // Forgot password modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify' | 'success'>('request');
  const [simulatedCode, setSimulatedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');

  // 4 Demo Personas
  const demoAccounts: Record<UserRole, DemoAccount> = {
    STUDENT: {
      role: 'STUDENT',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      identifier: 'CS23B1042',
      password: 'pass@campus2026',
      label: 'Undergraduate Scholar • Sem 6',
      department: 'Computer Science & Engineering',
      rollNumber: 'CS23B1042'
    },
    FACULTY: {
      role: 'FACULTY',
      name: 'Dr. Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      identifier: 'FAC-8812',
      password: 'pass@campus2026',
      label: 'Professor & Head of Department',
      department: 'Computer Science & Engineering',
      designation: 'Senior Faculty & Academic Board'
    },
    PARENT: {
      role: 'PARENT',
      name: 'Robert Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      identifier: 'robert.chen@gmail.com',
      password: 'pass@campus2026',
      label: 'Guardian of Alex Chen (CS23B1042)',
      department: 'Parent Portal Network',
      wardName: 'Alex Chen (CS23B1042)'
    },
    ADMIN: {
      role: 'ADMIN',
      name: 'Dean Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      identifier: 'admin@smartcampus.edu',
      password: 'pass@campus2026',
      label: 'Dean of Academic Affairs & Registrar',
      department: 'Office of Institutional Governance',
      designation: 'Institutional Registrar'
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    const demo = demoAccounts[role];
    setIdentifier(demo.identifier);
    setPassword(demo.password);
  };

  const handleApplyDemoAccount = (demo: DemoAccount, autoLogin = false) => {
    setSelectedRole(demo.role);
    setIdentifier(demo.identifier);
    setPassword(demo.password);
    setErrorMessage(null);

    if (autoLogin) {
      executeAuthentication(demo.role, demo.name, demo.identifier, 'password');
    }
  };

  const executeAuthentication = (
    role: UserRole,
    name: string,
    loginId: string,
    method: 'password' | 'biometric' | 'sso'
  ) => {
    setIsAuthenticating(true);
    setErrorMessage(null);
    setAuthStep('Connecting to LDAP & Active Directory...');

    setTimeout(() => {
      setAuthStep('Validating Zero-Trust Security Token...');
    }, 450);

    setTimeout(() => {
      setAuthStep('Decrypting Institutional Access Credentials...');
    }, 900);

    setTimeout(() => {
      const demo = demoAccounts[role];
      const authUser: AuthUser = {
        id: role === 'STUDENT' ? currentStudent.id : `usr-${role.toLowerCase()}`,
        name: name || demo.name,
        email: loginId.includes('@') ? loginId : `${loginId.toLowerCase()}@smartcampus.edu`,
        role: role,
        avatar: demo.avatar,
        department: demo.department,
        rollNumber: role === 'STUDENT' ? loginId : undefined,
        designation: demo.designation,
        wardName: demo.wardName,
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        authMethod: method
      };

      login(authUser);
      setIsAuthenticating(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        console.log(e);
      }

      // Redirect to specific role dashboard
      if (role === 'STUDENT') onNavigate('student-dashboard');
      else if (role === 'FACULTY') onNavigate('faculty-dashboard');
      else if (role === 'PARENT') onNavigate('parent-dashboard');
      else if (role === 'ADMIN') onNavigate('admin-dashboard');
    }, 1400);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter your Institutional ID, Roll Number, or Email.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your campus password or security PIN.');
      return;
    }

    const demo = demoAccounts[selectedRole];
    executeAuthentication(selectedRole, demo.name, identifier, 'password');
  };

  const handleBiometricSimulate = () => {
    setBiometricScanning(true);
    setBiometricSuccess(false);

    setTimeout(() => {
      setBiometricScanning(false);
      setBiometricSuccess(true);

      setTimeout(() => {
        const demo = demoAccounts[selectedRole];
        executeAuthentication(selectedRole, demo.name, demo.identifier, 'biometric');
      }, 600);
    }, 1300);
  };

  const handleSsoLogin = (provider: string) => {
    const demo = demoAccounts[selectedRole];
    setIsAuthenticating(true);
    setAuthStep(`Authenticating with ${provider} SSO Gateway...`);

    setTimeout(() => {
      executeAuthentication(selectedRole, `${demo.name} (${provider})`, demo.identifier, 'sso');
    }, 1200);
  };

  const handleActivationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activateRollNo || !activateDob) {
      setErrorMessage('Please provide your Roll Number and Date of Birth.');
      return;
    }

    if (!otpSent) {
      setOtpSent(true);
      setErrorMessage(null);
      return;
    }

    if (!activateOtp || !activateNewPassword) {
      setErrorMessage('Please enter the 4-digit OTP and your new password.');
      return;
    }

    // Activated successfully
    setIsAuthenticating(true);
    setAuthStep('Registering cryptographic keys on campus HSM...');

    setTimeout(() => {
      executeAuthentication('STUDENT', `Scholar ${activateRollNo}`, activateRollNo, 'password');
    }, 1400);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Quantum Cyber Grids & Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Controls */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 mb-4">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors p-2 rounded-lg bg-slate-900/60 border border-slate-800"
        >
          <span>← Back to Campus Portal</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auth Gateway v3.8 • Quantum AES-256</span>
          </div>

          <button
            onClick={() => onNavigate('student-dashboard')}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all"
          >
            Guest Demo Mode →
          </button>
        </div>
      </div>

      {/* Main Dual-Column Authentication Layout */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Brand, 1-Click Quick Personas, Security Matrix */}
        <div className="lg:col-span-5 space-y-6">
          {/* Logo & Headline */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>INSTITUTIONAL ACCESS PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
              Sign in to <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                Smart Campus AI
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Unified zero-trust institutional access for learners, faculty members, guardians, and campus administrators.
            </p>
          </div>

          {/* 1-Click Quick Demo Switchers Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 shadow-xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                1-Click Quick Test Personas
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Tap to auto-fill</span>
            </div>

            <p className="text-xs text-slate-400">
              Select any role below to pre-fill verified institutional credentials or log in instantly:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {(Object.keys(demoAccounts) as UserRole[]).map((r) => {
                const acc = demoAccounts[r];
                const isSelected = selectedRole === r;
                return (
                  <div
                    key={r}
                    className={`p-3 rounded-xl border transition-all text-left group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                          {acc.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">{acc.identifier}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
                      <span className="font-mono text-cyan-400 font-semibold">{r}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleApplyDemoAccount(acc, false)}
                          className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Pre-fill form"
                        >
                          Fill
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyDemoAccount(acc, true)}
                          className="px-2 py-0.5 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:scale-105 transition-transform"
                          title="Instant sign in"
                        >
                          Login →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Institutional Compliance & Security Features */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs space-y-2 text-slate-400 font-mono">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Campus Security Architecture</span>
            </div>
            <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-400">
              <li>FERPA & GDPR Compliant Student Record Isolation</li>
              <li>End-to-End Quantum-Resistant Encryption (Ed25519)</li>
              <li>Autonomous Multi-Factor Anomaly Detection Engine</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Login Terminal */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-2xl relative">
            {/* Authenticating Overlay */}
            {isAuthenticating && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-3xl z-30 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                  <Cpu className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-white font-['Space_Grotesk']">
                    Authenticating Session
                  </p>
                  <p className="text-xs font-mono text-cyan-300 animate-pulse">{authStep}</p>
                </div>
                <div className="w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-full animate-pulse" />
                </div>
              </div>
            )}

            {/* Role Navigation Pills */}
            <div className="mb-6 space-y-2">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Select Your Campus Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { role: 'STUDENT' as UserRole, label: 'Student', icon: <GraduationCap className="w-4 h-4" /> },
                  { role: 'FACULTY' as UserRole, label: 'Faculty', icon: <Briefcase className="w-4 h-4" /> },
                  { role: 'PARENT' as UserRole, label: 'Parent', icon: <Users className="w-4 h-4" /> },
                  { role: 'ADMIN' as UserRole, label: 'Admin', icon: <ShieldCheck className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleChange(item.role)}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      selectedRole === item.role
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]'
                        : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Method Toggle Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-5 text-xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAuthMode('password')}
                  className={`pb-1 font-semibold transition-colors relative ${
                    authMode === 'password'
                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Password Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('biometric')}
                  className={`pb-1 font-semibold transition-colors relative flex items-center gap-1.5 ${
                    authMode === 'biometric'
                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>Biometric Pass</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('sso')}
                  className={`pb-1 font-semibold transition-colors relative ${
                    authMode === 'sso'
                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  SSO Single Sign-On
                </button>
              </div>

              {selectedRole === 'STUDENT' && (
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'activate' ? 'password' : 'activate')}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all ${
                    authMode === 'activate'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'text-slate-400 hover:text-amber-400'
                  }`}
                >
                  {authMode === 'activate' ? 'Back to Login' : 'Activate Account'}
                </button>
              )}
            </div>

            {/* Error Message banner */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* TAB 1: PASSWORD LOGIN */}
            {authMode === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {selectedRole === 'STUDENT'
                      ? 'Roll Number or Campus Email'
                      : selectedRole === 'FACULTY'
                      ? 'Faculty ID or Staff Email'
                      : selectedRole === 'PARENT'
                      ? 'Parent Registered Mobile or Email'
                      : 'Admin Security Identifier'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      {selectedRole === 'STUDENT' ? (
                        <GraduationCap className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={
                        selectedRole === 'STUDENT'
                          ? 'e.g. CS23B1042 or alex.chen@smartcampus.edu'
                          : selectedRole === 'FACULTY'
                          ? 'e.g. FAC-8812 or faculty@smartcampus.edu'
                          : selectedRole === 'PARENT'
                          ? 'e.g. robert.chen@gmail.com'
                          : 'e.g. admin@smartcampus.edu'
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Institutional Password / Access PIN
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotModalOpen(true);
                        setForgotStep('request');
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500/20"
                    />
                    <span>Remember this institutional workstation</span>
                  </label>

                  <span className="text-slate-500 font-mono text-[11px]">2FA: Auto-Verified</span>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>Authorize & Launch {selectedRole} OS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* TAB 2: BIOMETRIC / SMART PASS NFC */}
            {authMode === 'biometric' && (
              <div className="text-center py-6 space-y-5">
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                  {/* Pulsing ring animation */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 transition-all ${
                      biometricScanning
                        ? 'border-cyan-400 animate-ping'
                        : biometricSuccess
                        ? 'border-emerald-400'
                        : 'border-cyan-500/30'
                    }`}
                  />
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center border transition-all ${
                      biometricScanning
                        ? 'bg-cyan-500/20 border-cyan-400'
                        : biometricSuccess
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-cyan-400'
                    }`}
                  >
                    {biometricSuccess ? (
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                    ) : (
                      <Fingerprint
                        className={`w-12 h-12 transition-transform ${
                          biometricScanning ? 'scale-110 text-cyan-300 animate-pulse' : 'text-cyan-400'
                        }`}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-sm font-bold text-white">
                    {biometricScanning
                      ? 'Scanning Campus Pass / Biometric Data...'
                      : biometricSuccess
                      ? 'Identity Verified! Launching Session...'
                      : 'Campus WebAuthn & Smart Card Reader'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Touch your hardware fingerprint sensor, FaceID sensor, or place your physical
                    campus RFID smart badge near the reader.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleBiometricSimulate}
                    disabled={biometricScanning || biometricSuccess}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{biometricScanning ? 'Verifying...' : 'Simulate Biometric / NFC Tap'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: INSTITUTIONAL FEDERATED SSO */}
            {authMode === 'sso' && (
              <div className="space-y-4 py-3">
                <p className="text-xs text-slate-400 text-center">
                  Select your institution&apos;s identity provider for Single Sign-On with automatic
                  role delegation:
                </p>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleSsoLogin('Google Workspace for Education')}
                    className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs font-medium text-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-slate-900 text-xs">
                        G
                      </div>
                      <span>Sign in with Google Workspace for Education</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSsoLogin('Microsoft 365 Education')}
                    className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs font-medium text-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-sky-500 flex items-center justify-center font-bold text-white text-[10px]">
                        M
                      </div>
                      <span>Sign in with Microsoft 365 Entra ID</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSsoLogin('Eduroam Shibboleth SAML 2.0')}
                    className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs font-medium text-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-[10px]">
                        S
                      </div>
                      <span>Sign in with Eduroam / Shibboleth SAML 2.0</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: NEW STUDENT ACTIVATION */}
            {authMode === 'activate' && (
              <form onSubmit={handleActivationSubmit} className="space-y-3.5">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">
                  First-time admitted student? Activate your Smart Campus digital identity using your
                  admissions letter details.
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Student Roll Number
                  </label>
                  <input
                    type="text"
                    value={activateRollNo}
                    onChange={(e) => setActivateRollNo(e.target.value)}
                    placeholder="e.g. CS23B1042"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white uppercase font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Date of Birth (YYYY-MM-DD)
                  </label>
                  <input
                    type="date"
                    value={activateDob}
                    onChange={(e) => setActivateDob(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white"
                    required
                  />
                </div>

                {otpSent && (
                  <>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]">
                      Verification OTP sent to registered phone/email. (Simulated Demo Code: <span className="font-mono font-bold">8492</span>)
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Enter 4-Digit Verification OTP
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={activateOtp}
                        onChange={(e) => setActivateOtp(e.target.value)}
                        placeholder="8492"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white font-mono tracking-widest"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Set New Master Password
                      </label>
                      <input
                        type="password"
                        value={activateNewPassword}
                        onChange={(e) => setActivateNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-[1.01] transition-all"
                >
                  {otpSent ? 'Complete Activation & Sign In' : 'Send Verification OTP →'}
                </button>
              </form>
            )}

            {/* Bottom Support & Status info */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
              <span>Host: auth.smartcampus.edu</span>
              <span>Need help? helpdesk@smartcampus.edu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
              <KeyRound className="w-4 h-4" />
              <span>SECURITY CREDENTIAL RESET</span>
            </div>

            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Reset Campus Clearance PIN
            </h3>

            {forgotStep === 'request' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-400">
                  Enter your registered institutional email or roll number to receive a cryptographic reset token.
                </p>
                <input
                  type="text"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="e.g. CS23B1042 or alex.chen@smartcampus.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    const code = Math.floor(100000 + Math.random() * 900000).toString();
                    setSimulatedCode(code);
                    setForgotStep('verify');
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Send Reset Code
                </button>
              </div>
            )}

            {forgotStep === 'verify' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  Verification Code sent! (Simulated Token: <span className="font-mono font-bold">{simulatedCode}</span>)
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Enter 6-digit Code</label>
                  <input
                    type="text"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    placeholder="123456"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono tracking-widest text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Set New Password</label>
                  <input
                    type="password"
                    value={newResetPassword}
                    onChange={(e) => setNewResetPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForgotStep('success');
                    setTimeout(() => {
                      setIsForgotModalOpen(false);
                      setPassword(newResetPassword || 'pass@campus2026');
                    }, 1200);
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold"
                >
                  Update & Save Password
                </button>
              </div>
            )}

            {forgotStep === 'success' && (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-white">Password Updated Successfully!</p>
                <p className="text-xs text-slate-400">You can now sign in with your new credentials.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
