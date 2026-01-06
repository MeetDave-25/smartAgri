import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  TrendingUp,
  Calendar,
  Wheat,
  Award,
  Upload,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface HistoryRecord {
  id: string;
  farmerName: string;
  cropName: string;
  season: string;
  year: string;
  fieldSize: number;
  yieldAmount: number;
  quality: string;
  profit: number;
  notes: string;
}

export function FarmerHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HistoryRecord | null>(null);

  const [history, setHistory] = useState<HistoryRecord[]>([
    {
      id: "1",
      farmerName: "Ramesh Kumar",
      cropName: "Wheat",
      season: "Rabi",
      year: "2023-24",
      fieldSize: 10,
      yieldAmount: 8.5,
      quality: "Excellent",
      profit: 125000,
      notes: "Used organic fertilizers",
    },
    {
      id: "2",
      farmerName: "Suresh Patel",
      cropName: "Cotton",
      season: "Kharif",
      year: "2023",
      fieldSize: 15,
      yieldAmount: 12.3,
      quality: "Good",
      profit: 180000,
      notes: "Drip irrigation implemented",
    },
    {
      id: "3",
      farmerName: "Priya Sharma",
      cropName: "Rice",
      season: "Kharif",
      year: "2023",
      fieldSize: 8,
      yieldAmount: 9.2,
      quality: "Excellent",
      profit: 95000,
      notes: "Followed AI recommendations",
    },
  ]);

  const [formData, setFormData] = useState({
    farmerName: "",
    cropName: "",
    season: "",
    year: "",
    fieldSize: "",
    yieldAmount: "",
    quality: "Good",
    profit: "",
    notes: "",
  });

  const handleAdd = () => {
    setEditingRecord(null);
    setFormData({
      farmerName: "",
      cropName: "",
      season: "",
      year: "",
      fieldSize: "",
      yieldAmount: "",
      quality: "Good",
      profit: "",
      notes: "",
    });
    setIsDialogOpen(true);
  };

  const filteredHistory = history.filter(
    (record) =>
      record.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.cropName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      label: "Total Records",
      value: history.length.toString(),
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      label: "Avg Yield",
      value: "10.0 t/acre",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      label: "Total Profit",
      value: "₹4.0L",
      icon: Award,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900",
    },
    {
      label: "Active Farmers",
      value: "3",
      icon: Wheat,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-800 dark:text-gray-100 mb-1">
            Farmer Past History
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage historical crop yield data
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl"
        >
          <Plus size={20} className="mr-2" />
          Add History
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
            placeholder="Search by farmer name or crop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-slate-700"
          />
        </div>
      </Card>

      {/* History Table */}
      <Card className="bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-slate-700">
                <TableHead>Farmer</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Season/Year</TableHead>
                <TableHead>Field Size</TableHead>
                <TableHead>Yield</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((record, index) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <TableCell className="text-gray-800 dark:text-gray-100">
                    {record.farmerName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wheat size={16} className="text-green-500" />
                      <span className="text-gray-800 dark:text-gray-100">{record.cropName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <div>
                        <div className="text-gray-800 dark:text-gray-100">{record.season}</div>
                        <div className="text-xs text-gray-500">{record.year}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-100">
                    {record.fieldSize} acres
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-500" />
                      <span className="text-gray-800 dark:text-gray-100">{record.yieldAmount} t/acre</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        record.quality === "Excellent"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : record.quality === "Good"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {record.quality}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">
                    ₹{(record.profit / 1000).toFixed(1)}K
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
                        <DropdownMenuItem>
                          <Upload size={14} className="mr-2" />
                          Upload Documents
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
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-slate-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">
              {editingRecord ? "Edit History Record" : "Add New History Record"}
            </DialogTitle>
            <DialogDescription>
              Enter crop yield history details
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label>Farmer Name</Label>
              <Input
                value={formData.farmerName}
                onChange={(e) =>
                  setFormData({ ...formData, farmerName: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Crop Name</Label>
              <Input
                value={formData.cropName}
                onChange={(e) =>
                  setFormData({ ...formData, cropName: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Season</Label>
              <Select
                value={formData.season}
                onValueChange={(value) =>
                  setFormData({ ...formData, season: value })
                }
              >
                <SelectTrigger className="bg-gray-50 dark:bg-slate-700">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kharif">Kharif</SelectItem>
                  <SelectItem value="Rabi">Rabi</SelectItem>
                  <SelectItem value="Zaid">Zaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="bg-gray-50 dark:bg-slate-700"
                placeholder="2023-24"
              />
            </div>
            <div className="space-y-2">
              <Label>Field Size (acres)</Label>
              <Input
                type="number"
                value={formData.fieldSize}
                onChange={(e) =>
                  setFormData({ ...formData, fieldSize: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Yield (tons/acre)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.yieldAmount}
                onChange={(e) =>
                  setFormData({ ...formData, yieldAmount: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Quality</Label>
              <Select
                value={formData.quality}
                onValueChange={(value) =>
                  setFormData({ ...formData, quality: value })
                }
              >
                <SelectTrigger className="bg-gray-50 dark:bg-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Profit (₹)</Label>
              <Input
                type="number"
                value={formData.profit}
                onChange={(e) =>
                  setFormData({ ...formData, profit: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="bg-gray-50 dark:bg-slate-700"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              {editingRecord ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
