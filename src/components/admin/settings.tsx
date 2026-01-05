import { useState } from "react";
import { motion } from "motion/react";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Mail,
  Globe,
  Database,
  Palette,
  Shield,
  Key,
  Clock,
  DollarSign,
  Languages,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";

export function Settings() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  
  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    appName: "Smart Agri Yield",
    appDescription: "AI-Powered Crop Yield Prediction & Optimization System",
    supportEmail: "support@smartagriyield.com",
    companyName: "Smart Agri Technologies",
    timezone: "Asia/Kolkata",
    language: "en",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
  });

  // Email Settings State
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@smartagriyield.com",
    smtpPassword: "",
    fromEmail: "noreply@smartagriyield.com",
    fromName: "Smart Agri Yield",
    enableSSL: true,
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weatherAlerts: true,
    yieldAlerts: true,
    systemAlerts: true,
    marketingEmails: false,
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    minPasswordLength: "8",
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: true,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    twoFactorAuth: false,
    ipWhitelist: "",
  });

  // API Settings State
  const [apiSettings, setApiSettings] = useState({
    apiKey: "",
    rateLimit: "1000",
    enableCors: true,
    allowedOrigins: "https://example.com",
    webhookUrl: "",
    apiVersion: "v1",
  });

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    defaultTheme: "light",
    primaryColor: "#10b981",
    accentColor: "#059669",
    logoUrl: "",
    faviconUrl: "",
    customCss: "",
  });

  // Backup Settings State
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionDays: "30",
    backupLocation: "cloud",
    lastBackup: "2024-11-07 02:00 AM",
  });

  const handleSave = (section: string) => {
    setSaveStatus("saving");
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const settingsSections = [
    {
      id: "system",
      label: "System",
      icon: SettingsIcon,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      color: "text-red-600 dark:text-red-400",
    },
    {
      id: "api",
      label: "API",
      icon: Key,
      color: "text-green-600 dark:text-green-400",
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
      color: "text-pink-600 dark:text-pink-400",
    },
    {
      id: "backup",
      label: "Backup",
      icon: Database,
      color: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-800 dark:text-gray-100 mb-1">
            System Settings
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Configure your application settings and preferences
          </p>
        </div>
        {saveStatus === "saved" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-700 dark:text-green-300">
                Settings saved successfully!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="system" className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-800 p-1 rounded-xl border-2 border-gray-100 dark:border-gray-700 flex-wrap h-auto">
          {settingsSections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="rounded-lg data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900"
            >
              <section.icon className={`mr-2 ${section.color}`} size={16} />
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* System Settings */}
        <TabsContent value="system">
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                  <SettingsIcon className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100">
                    System Configuration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Basic system information and regional settings
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="appName">Application Name</Label>
                  <Input
                    id="appName"
                    value={systemSettings.appName}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, appName: e.target.value })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={systemSettings.companyName}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, companyName: e.target.value })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="appDescription">Application Description</Label>
                  <Textarea
                    id="appDescription"
                    value={systemSettings.appDescription}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        appDescription: e.target.value,
                      })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={systemSettings.supportEmail}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        supportEmail: e.target.value,
                      })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">
                    <Clock className="inline mr-2" size={16} />
                    Timezone
                  </Label>
                  <Select
                    value={systemSettings.timezone}
                    onValueChange={(value) =>
                      setSystemSettings({ ...systemSettings, timezone: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">
                    <Languages className="inline mr-2" size={16} />
                    Default Language
                  </Label>
                  <Select
                    value={systemSettings.language}
                    onValueChange={(value) =>
                      setSystemSettings({ ...systemSettings, language: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                      <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">
                    <DollarSign className="inline mr-2" size={16} />
                    Currency
                  </Label>
                  <Select
                    value={systemSettings.currency}
                    onValueChange={(value) =>
                      setSystemSettings({ ...systemSettings, currency: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={systemSettings.dateFormat}
                    onValueChange={(value) =>
                      setSystemSettings({ ...systemSettings, dateFormat: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("system")}
                  disabled={saveStatus === "saving"}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                >
                  {saveStatus === "saving" ? (
                    <>
                      <RefreshCw className="mr-2 animate-spin" size={16} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" size={16} />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                  <Mail className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100">
                    Email Configuration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SMTP settings for sending emails
                  </p>
                </div>
              </div>

              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  Configure your SMTP server to enable email notifications and alerts.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                    placeholder="587"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, fromEmail: e.target.value })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={emailSettings.fromName}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, fromName: e.target.value })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <div>
                      <Label htmlFor="enableSSL" className="cursor-pointer">
                        Enable SSL/TLS
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Use secure connection for email sending
                      </p>
                    </div>
                    <Switch
                      id="enableSSL"
                      checked={emailSettings.enableSSL}
                      onCheckedChange={(checked) =>
                        setEmailSettings({ ...emailSettings, enableSSL: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline">Test Email Connection</Button>
                <Button
                  onClick={() => handleSave("email")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <Save className="mr-2" size={16} />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
                  <Bell className="text-amber-600 dark:text-amber-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100">
                    Notification Preferences
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage notification channels and alerts
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h4 className="text-gray-700 dark:text-gray-200 mb-4">
                    Notification Channels
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            smsNotifications: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive browser push notifications
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            pushNotifications: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h4 className="text-gray-700 dark:text-gray-200 mb-4">
                    Alert Types
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weather Alerts</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified about weather changes
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.weatherAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            weatherAlerts: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Yield Alerts</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notifications about crop yield predictions
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.yieldAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            yieldAlerts: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>System Alerts</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Important system notifications
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            systemAlerts: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Promotional and marketing content
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            marketingEmails: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("notifications")}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white"
                >
                  <Save className="mr-2" size={16} />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl">
                  <Shield className="text-red-600 dark:text-red-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100">
                    Security Settings
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Password policies and security configurations
                  </p>
                </div>
              </div>

              <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-700 dark:text-red-300">
                  Changes to security settings will affect all users. Proceed with caution.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minPasswordLength">
                    <Lock className="inline mr-2" size={16} />
                    Minimum Password Length
                  </Label>
                  <Input
                    id="minPasswordLength"
                    type="number"
                    value={securitySettings.minPasswordLength}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        minPasswordLength: e.target.value,
                      })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    <Clock className="inline mr-2" size={16} />
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: e.target.value,
                      })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        maxLoginAttempts: e.target.value,
                      })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist">IP Whitelist (comma-separated)</Label>
                  <Input
                    id="ipWhitelist"
                    value={securitySettings.ipWhitelist}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        ipWhitelist: e.target.value,
                      })
                    }
                    className="bg-gray-50 dark:bg-slate-700"
                    placeholder="192.168.1.1, 10.0.0.1"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl space-y-4">
                <h4 className="text-gray-700 dark:text-gray-200 mb-4">
                  Password Requirements
                </h4>

                <div className="flex items-center justify-between">
                  <Label>Require Special Characters</Label>
                  <Switch
                    checked={securitySettings.requireSpecialChar}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        requireSpecialChar: checked,
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Require Numbers</Label>
                  <Switch
                    checked={securitySettings.requireNumber}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        requireNumber: checked,
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Require Uppercase Letters</Label>
                  <Switch
                    checked={securitySettings.requireUppercase}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        requireUppercase: checked,
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Two-Factor Authentication</Label>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: checked,
                      })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("security")}
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white"
                >
                  <Save className="mr-2" size={16} />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api">
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                  <Key className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100">
                    API Configuration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    API keys and integration settings
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiKey"
                      type="password"
                      value={apiSettings.apiKey}
                      onChange={(e) =>
                        setApiSettings({ ...apiSettings, apiKey: e.target.value })
                      }
                      className="bg-gray-50 dark:bg-slate-700"
                    />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                    <Input
                      id="rateLimit"
                      type="number"
                      value={apiSettings.rateLimit}
                      onChange={(e) =>
                        setApiSettings({ ...apiSettings, rateLimit: e.target.value })
                      }
                      className="bg-gray-50 dark:bg-slate-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiVersion">API Version</Label>
                    <Select
                      value={apiSettings.apiVersion}
                      onValueChange={(value) =>
                        setApiSettings({ ...apiSettings, apiVersion: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-50 dark:bg-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v1">v1 (Current)</SelectItem>
                        <SelectItem value="v2">v2 (Beta)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="allowedOrigins">Allowed Origins (CORS)</Label>
                    <Textarea
                      id="allowedOrigins"
                      value={apiSettings.allowedOrigins}
                      onChange={(e) =>
                        setApiSettings({ ...apiSettings, allowedOrigins: e.target.value })
                      }
                      className="bg-gray-50 dark:bg-slate-700"
                      placeholder="https://example.com, https://app.example.com"
                      rows={3}
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      type="url"
                      value={apiSettings.webhookUrl}
                      onChange={(e) =>
                        setApiSettings({ ...apiSettings, webhookUrl: e.target.value })
                      }
                      className="bg-gray-50 dark:bg-slate-700"
                      placeholder="https://your-app.com/webhook"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable CORS</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow cross-origin requests
                      </p>
                    </div>
                    <Switch
                      checked={apiSettings.enableCors}
                      onCheckedChange={(checked) =>
                        setApiSettings({ ...apiSettings, enableCors: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline">View API Documentation</Button>
                <Button
                  onClick={() => handleSave("api")}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                >
                  <Save className="mr-2" size={16} />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-xl">
                  <Palette className="text-pink-600 dark:text-pink-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100">
                    Appearance Settings
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customize branding and theme
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultTheme">Default Theme</Label>
                  <Select
                    value={appearanceSettings.defaultTheme}
                    onValueChange={(value) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        defaultTheme: value,
                      })
                    }
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        value={appearanceSettings.primaryColor}
                        onChange={(e) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="bg-gray-50 dark:bg-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={appearanceSettings.accentColor}
                        onChange={(e) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            accentColor: e.target.value,
                          })
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        value={appearanceSettings.accentColor}
                        onChange={(e) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            accentColor: e.target.value,
                          })
                        }
                        className="bg-gray-50 dark:bg-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      type="url"
                      value={appearanceSettings.logoUrl}
                      onChange={(e) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          logoUrl: e.target.value,
                        })
                      }
                      className="bg-gray-50 dark:bg-slate-700"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faviconUrl">Favicon URL</Label>
                    <Input
                      id="faviconUrl"
                      type="url"
                      value={appearanceSettings.faviconUrl}
                      onChange={(e) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          faviconUrl: e.target.value,
                        })
                      }
                      className="bg-gray-50 dark:bg-slate-700"
                      placeholder="https://example.com/favicon.ico"
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="customCss">Custom CSS</Label>
                    <Textarea
                      id="customCss"
                      value={appearanceSettings.customCss}
                      onChange={(e) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          customCss: e.target.value,
                        })
                      }
                      className="bg-gray-50 dark:bg-slate-700 font-mono"
                      placeholder=".custom-class { color: #10b981; }"
                      rows={6}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline">Preview Changes</Button>
                <Button
                  onClick={() => handleSave("appearance")}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                >
                  <Save className="mr-2" size={16} />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-xl">
                  <Database className="text-cyan-600 dark:text-cyan-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100">
                    Backup & Maintenance
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Configure automated backups and system maintenance
                  </p>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />
                  <div>
                    <div className="text-gray-800 dark:text-gray-100">
                      Last Backup: {backupSettings.lastBackup}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Backup completed successfully
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label>Automatic Backup</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enable scheduled automatic backups
                      </p>
                    </div>
                    <Switch
                      checked={backupSettings.autoBackup}
                      onCheckedChange={(checked) =>
                        setBackupSettings({ ...backupSettings, autoBackup: checked })
                      }
                    />
                  </div>

                  {backupSettings.autoBackup && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="backupFrequency">Backup Frequency</Label>
                        <Select
                          value={backupSettings.backupFrequency}
                          onValueChange={(value) =>
                            setBackupSettings({
                              ...backupSettings,
                              backupFrequency: value,
                            })
                          }
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backupTime">Backup Time</Label>
                        <Input
                          id="backupTime"
                          type="time"
                          value={backupSettings.backupTime}
                          onChange={(e) =>
                            setBackupSettings({
                              ...backupSettings,
                              backupTime: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-slate-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="retentionDays">Retention Period (days)</Label>
                        <Input
                          id="retentionDays"
                          type="number"
                          value={backupSettings.retentionDays}
                          onChange={(e) =>
                            setBackupSettings({
                              ...backupSettings,
                              retentionDays: e.target.value,
                            })
                          }
                          className="bg-white dark:bg-slate-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backupLocation">Backup Location</Label>
                        <Select
                          value={backupSettings.backupLocation}
                          onValueChange={(value) =>
                            setBackupSettings({
                              ...backupSettings,
                              backupLocation: value,
                            })
                          }
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cloud">Cloud Storage</SelectItem>
                            <SelectItem value="local">Local Storage</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full">
                    <Database className="mr-2" size={16} />
                    Backup Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="mr-2" size={16} />
                    Restore Backup
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Backup History
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("backup")}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                >
                  <Save className="mr-2" size={16} />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
