import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, HelpCircle, Home } from "lucide-react";
import { Button } from "./components/ui/button";

// Context Providers
import { DataProvider } from "./contexts/data-context";
import { LanguageProvider } from "./contexts/language-context";

// Farmer-facing components
import { LandingPage } from "./components/landing-page";
import { LoginPage } from "./components/login-page";
import { CropInputPage } from "./components/crop-input-page";
import { LoadingPlant } from "./components/loading-plant";
import { PredictionResultPage } from "./components/prediction-result-page";
import { OptimizationDashboard } from "./components/optimization-dashboard";
import { FarmerHelpPage } from "./components/farmer-help-page";

// Admin components
import { AdminLayout } from "./components/admin/admin-layout";
import { SuperAdminDashboard } from "./components/admin/dashboard";
import { UserManagement } from "./components/admin/user-management";
import { CropManagement } from "./components/admin/crop-management";
import { WeatherManagement } from "./components/admin/weather-management";
import { FarmerHistory } from "./components/admin/farmer-history";
import { Settings } from "./components/admin/settings";

type UserRole = "farmer" | "superadmin" | null;
type FarmerPage = "landing" | "login" | "input" | "loading" | "result" | "dashboard" | "help";
type AdminPage = "dashboard" | "admin-users" | "farmer-users" | "crop-categories" | "crops" | "seasons" | "soil-types" | "weather-management" | "farmer-history" | "settings";

export default function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </DataProvider>
  );
}

function AppContent() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentFarmerPage, setCurrentFarmerPage] = useState<FarmerPage>("landing");
  const [currentAdminPage, setCurrentAdminPage] = useState<AdminPage>("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleLogin = (role: "farmer" | "superadmin") => {
    setUserRole(role);
    if (role === "farmer") {
      setCurrentFarmerPage("landing");
    } else {
      setCurrentAdminPage("dashboard");
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentFarmerPage("login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Render Login Page if not authenticated
  if (!userRole) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <div className="relative">
          {/* Dark Mode Toggle on Login Page */}
          <div className="fixed top-6 right-6 z-50">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={toggleDarkMode}
                className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg"
                size="icon"
              >
                <motion.div
                  animate={{ rotate: darkMode ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
          <LoginPage onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  // Render Farmer Interface
  if (userRole === "farmer") {
    const handleStartPrediction = () => {
      setCurrentFarmerPage("input");
    };

    const handleFormSubmit = () => {
      setCurrentFarmerPage("loading");
      setTimeout(() => {
        setCurrentFarmerPage("result");
      }, 3000);
    };

    const handleOptimize = () => {
      setCurrentFarmerPage("dashboard");
    };

    const handleLanguageChange = (lang: string) => {
      setLanguage(lang);
    };

    return (
      <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {/* Home Button - Show on all pages except landing */}
          {currentFarmerPage !== "landing" && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={() => setCurrentFarmerPage("landing")}
                className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
                size="icon"
              >
                <Home size={24} />
              </Button>
            </motion.div>
          )}
          
          {/* Help Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={() => setCurrentFarmerPage("help")}
              className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              size="icon"
            >
              <HelpCircle size={24} />
            </Button>
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={toggleDarkMode}
              className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg"
              size="icon"
            >
              <motion.div
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {darkMode ? <Moon size={24} /> : <Sun size={24} />}
              </motion.div>
            </Button>
          </motion.div>

          {/* Logout Button - Show on landing page */}
          {currentFarmerPage === "landing" && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={handleLogout}
                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg"
                size="icon"
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </motion.div>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Page Transitions */}
        <AnimatePresence mode="wait">
          {currentFarmerPage === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage
                onStartPrediction={handleStartPrediction}
                onLanguageChange={handleLanguageChange}
              />
            </motion.div>
          )}

          {currentFarmerPage === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <CropInputPage
                onSubmit={handleFormSubmit}
                onBack={() => setCurrentFarmerPage("landing")}
              />
            </motion.div>
          )}

          {currentFarmerPage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <LoadingPlant />
            </motion.div>
          )}

          {currentFarmerPage === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
            >
              <PredictionResultPage
                onOptimize={handleOptimize}
                onBack={() => setCurrentFarmerPage("input")}
              />
            </motion.div>
          )}

          {currentFarmerPage === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <OptimizationDashboard onBack={() => setCurrentFarmerPage("result")} />
            </motion.div>
          )}

          {currentFarmerPage === "help" && (
            <motion.div
              key="help"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <FarmerHelpPage onBack={() => setCurrentFarmerPage("landing")} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer - only show on landing page */}
        {currentFarmerPage === "landing" && (
          <motion.footer
            className="relative z-10 py-8 text-center text-green-700 dark:text-green-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-sm">
              Made with 💚 for Indian Farmers | Smart Agri Yield © 2025
            </p>
          </motion.footer>
        )}
      </div>
    );
  }

  // Render Super Admin Interface
  if (userRole === "superadmin") {
    const renderAdminContent = () => {
      switch (currentAdminPage) {
        case "dashboard":
          return <SuperAdminDashboard />;
        case "admin-users":
          return <UserManagement userType="admin" />;
        case "farmer-users":
          return <UserManagement userType="farmer" />;
        case "crop-categories":
        case "crops":
        case "seasons":
        case "soil-types":
          return <CropManagement />;
        case "weather-management":
          return <WeatherManagement />;
        case "farmer-history":
          return <FarmerHistory />;
        case "settings":
          return <Settings />;
        default:
          return <SuperAdminDashboard />;
      }
    };

    return (
      <div className={darkMode ? "dark" : ""}>
        <AdminLayout
          currentPage={currentAdminPage}
          onNavigate={(page) => setCurrentAdminPage(page as AdminPage)}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        >
          {renderAdminContent()}
        </AdminLayout>
      </div>
    );
  }

  return null;
}