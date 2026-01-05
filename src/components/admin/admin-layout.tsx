import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Users,
  Sprout,
  CloudRain,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  UserCog,
  Wheat,
  Calendar,
  Mountain,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function AdminLayout({
  children,
  currentPage,
  onNavigate,
  onLogout,
  darkMode,
  onToggleDarkMode,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: "user-management",
      label: "User Management",
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      submenu: [
        { id: "admin-users", label: "Admin Users" },
        { id: "farmer-users", label: "Farmer Users" },
      ],
    },
    {
      id: "crop-management",
      label: "Crop Management",
      icon: Sprout,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900",
      submenu: [
        { id: "crop-categories", label: "Crop Categories" },
        { id: "crops", label: "Crops" },
        { id: "seasons", label: "Seasons" },
        { id: "soil-types", label: "Soil Types" },
      ],
    },
    {
      id: "weather-management",
      label: "Weather Management",
      icon: CloudRain,
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-100 dark:bg-sky-900",
    },
    {
      id: "farmer-history",
      label: "Farmer History",
      icon: History,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-100 dark:bg-gray-900",
    },
  ];

  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 shadow-lg"
      >
        {/* Logo & Toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                  <Sprout className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-green-800 dark:text-green-100">Smart Agri</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Super Admin</div>
                </div>
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <motion.button
                onClick={() => {
                  if (item.submenu) {
                    setExpandedMenu(expandedMenu === item.id ? null : item.id);
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  currentPage === item.id || currentPage.startsWith(item.id)
                    ? `${item.bgColor} ${item.color}`
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-2 rounded-lg ${currentPage === item.id || currentPage.startsWith(item.id) ? "bg-white/50 dark:bg-black/20" : ""}`}>
                  <item.icon size={20} />
                </div>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: expandedMenu === item.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    )}
                  </>
                )}
              </motion.button>

              {/* Submenu */}
              {sidebarOpen && item.submenu && (
                <AnimatePresence>
                  {expandedMenu === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-8 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.submenu.map((subitem) => (
                        <button
                          key={subitem.id}
                          onClick={() => onNavigate(subitem.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                            currentPage === subitem.id
                              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            onClick={onToggleDarkMode}
            className={`w-full justify-start gap-3 rounded-xl ${sidebarOpen ? "" : "justify-center"}`}
          >
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900">
              {darkMode ? <Moon className="text-amber-600 dark:text-amber-400" size={20} /> : <Sun className="text-amber-600" size={20} />}
            </div>
            {sidebarOpen && <span className="text-gray-700 dark:text-gray-300">Toggle Theme</span>}
          </Button>

          <Button
            variant="ghost"
            onClick={onLogout}
            className={`w-full justify-start gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl ${sidebarOpen ? "" : "justify-center"}`}
          >
            <div className="p-2 rounded-lg">
              <LogOut size={20} />
            </div>
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-800 shadow-2xl z-50 flex flex-col"
            >
              {/* Same content as desktop sidebar */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                    <Sprout className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-green-800 dark:text-green-100">Smart Agri</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Super Admin</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (item.submenu) {
                          setExpandedMenu(expandedMenu === item.id ? null : item.id);
                        } else {
                          onNavigate(item.id);
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        currentPage === item.id || currentPage.startsWith(item.id)
                          ? `${item.bgColor} ${item.color}`
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.submenu && <ChevronRight size={16} />}
                    </button>
                    {item.submenu && expandedMenu === item.id && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.submenu.map((subitem) => (
                          <button
                            key={subitem.id}
                            onClick={() => {
                              onNavigate(subitem.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                              currentPage === subitem.id
                                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {subitem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Button
                  variant="ghost"
                  onClick={onToggleDarkMode}
                  className="w-full justify-start gap-3 rounded-xl"
                >
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                  <span>Toggle Theme</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="w-full justify-start gap-3 text-red-600 dark:text-red-400 rounded-xl"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </Button>
            <h1 className="text-xl text-gray-800 dark:text-gray-100">
              {menuItems.find(item => item.id === currentPage)?.label || "Dashboard"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600">
              <AvatarFallback className="text-white">SA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}
