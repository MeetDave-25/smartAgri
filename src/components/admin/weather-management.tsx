import { useState } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";

interface WeatherData {
  id: string;
  date: string;
  location: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

export function WeatherManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<WeatherData | null>(null);

  const [weatherData, setWeatherData] = useState<WeatherData[]>([
    {
      id: "1",
      date: "2024-11-07",
      location: "Punjab",
      temperature: 28,
      rainfall: 5.2,
      humidity: 65,
      windSpeed: 12,
      condition: "Partly Cloudy",
    },
    {
      id: "2",
      date: "2024-11-06",
      location: "Haryana",
      temperature: 30,
      rainfall: 0,
      humidity: 45,
      windSpeed: 8,
      condition: "Sunny",
    },
    {
      id: "3",
      date: "2024-11-06",
      location: "Gujarat",
      temperature: 32,
      rainfall: 12.5,
      humidity: 75,
      windSpeed: 15,
      condition: "Rainy",
    },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    location: "",
    temperature: "",
    rainfall: "",
    humidity: "",
    windSpeed: "",
    condition: "",
  });

  const handleAdd = () => {
    setEditingRecord(null);
    setFormData({
      date: "",
      location: "",
      temperature: "",
      rainfall: "",
      humidity: "",
      windSpeed: "",
      condition: "",
    });
    setIsDialogOpen(true);
  };

  const filteredData = weatherData.filter(
    (record) =>
      record.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      label: "Avg Temperature",
      value: "29°C",
      icon: Thermometer,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
    {
      label: "Total Rainfall",
      value: "17.7mm",
      icon: Droplets,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      label: "Avg Humidity",
      value: "62%",
      icon: CloudRain,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-900",
    },
    {
      label: "Avg Wind Speed",
      value: "11 km/h",
      icon: Wind,
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-100 dark:bg-gray-700",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-800 dark:text-gray-100 mb-1">
            Weather Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage weather data and forecasts
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl"
        >
          <Plus size={20} className="mr-2" />
          Add Weather Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <div>
                  <div className="text-2xl text-gray-800 dark:text-gray-100">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <Card className="p-4 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search by location or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-slate-700"
          />
        </div>
      </Card>

      {/* Weather Table */}
      <Card className="bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-slate-700">
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Rainfall</TableHead>
                <TableHead>Humidity</TableHead>
                <TableHead>Wind Speed</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record, index) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-800 dark:text-gray-100">{record.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-100">
                    {record.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Thermometer size={16} className="text-orange-500" />
                      <span className="text-gray-800 dark:text-gray-100">{record.temperature}°C</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Droplets size={16} className="text-blue-500" />
                      <span className="text-gray-800 dark:text-gray-100">{record.rainfall}mm</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-100">
                    {record.humidity}%
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wind size={16} className="text-gray-500" />
                      <span className="text-gray-800 dark:text-gray-100">{record.windSpeed} km/h</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        record.condition === "Sunny"
                          ? "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
                          : record.condition === "Rainy"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {record.condition}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">
              {editingRecord ? "Edit Weather Data" : "Add New Weather Data"}
            </DialogTitle>
            <DialogDescription>
              Enter weather information for the specified date and location
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Temperature (°C)</Label>
              <Input
                type="number"
                value={formData.temperature}
                onChange={(e) =>
                  setFormData({ ...formData, temperature: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Rainfall (mm)</Label>
              <Input
                type="number"
                value={formData.rainfall}
                onChange={(e) =>
                  setFormData({ ...formData, rainfall: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Humidity (%)</Label>
              <Input
                type="number"
                value={formData.humidity}
                onChange={(e) =>
                  setFormData({ ...formData, humidity: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Wind Speed (km/h)</Label>
              <Input
                type="number"
                value={formData.windSpeed}
                onChange={(e) =>
                  setFormData({ ...formData, windSpeed: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Condition</Label>
              <Input
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              {editingRecord ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
