import { useState } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Wheat,
  Droplets,
  Sprout,
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
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useData } from "../../contexts/data-context";
import { toast } from "sonner@2.0.3";

// Crop Categories Component
export function CropCategories() {
  const { crops } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", description: "", icon: "🌾" });

  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Cereals",
      description: "Grain crops like wheat, rice, and corn",
      icon: "🌾",
      count: crops.filter(c => c.category === "Cereals").length,
    },
    {
      id: "2",
      name: "Pulses",
      description: "Legume crops rich in protein",
      icon: "🫘",
      count: crops.filter(c => c.category === "Pulses").length,
    },
    {
      id: "3",
      name: "Cash Crops",
      description: "Commercial crops like cotton and sugarcane",
      icon: "💰",
      count: crops.filter(c => c.category === "Cash Crops").length,
    },
    {
      id: "4",
      name: "Vegetables",
      description: "Edible plant crops",
      icon: "🥬",
      count: crops.filter(c => c.category === "Vegetables").length,
    },
  ]);

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editingCategory.id
            ? { ...cat, name: formData.name, description: formData.description, icon: formData.icon }
            : cat
        )
      );
      toast.success("Category updated successfully");
    } else {
      // Add new category
      const newCategory = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        count: 0,
      };
      setCategories(prev => [...prev, newCategory]);
      toast.success("Category added successfully");
    }

    setIsDialogOpen(false);
    setFormData({ name: "", description: "", icon: "🌾" });
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast.success("Category deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800 dark:text-gray-100">Crop Categories</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage crop classification categories
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: "", description: "", icon: "🌾" });
            setIsDialogOpen(true);
          }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{category.icon}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingCategory(category);
                        setFormData({
                          name: category.name,
                          description: category.description,
                          icon: category.icon,
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit size={14} className="mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h4 className="text-lg text-gray-800 dark:text-gray-100 mb-2">
                {category.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {category.description}
              </p>
              <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                {category.count} crops
              </Badge>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Cereals"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Icon (Emoji)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., 🌾"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe this crop category..."
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              onClick={handleSave}
            >
              {editingCategory ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Crops Component
export function Crops() {
  const { crops, addCrop, updateCrop, deleteCrop } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "🌾",
  });

  const handleSave = () => {
    if (!formData.name || !formData.category) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingCrop) {
      updateCrop(editingCrop.id, formData);
      toast.success("Crop updated successfully");
    } else {
      addCrop(formData);
      toast.success("Crop added successfully");
    }

    setIsDialogOpen(false);
    setFormData({ name: "", category: "", icon: "🌾" });
    setEditingCrop(null);
  };

  const handleDelete = (id: string) => {
    deleteCrop(id);
    toast.success("Crop deleted successfully");
  };

  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800 dark:text-gray-100">Crops Database</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage crop information and requirements
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCrop(null);
            setFormData({ name: "", category: "", icon: "🌾" });
            setIsDialogOpen(true);
          }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl"
        >
          <Plus size={20} className="mr-2" />
          Add Crop
        </Button>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-slate-700"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-slate-700">
                <TableHead>Crop</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCrops.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No crops found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCrops.map((crop) => (
                  <TableRow key={crop.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{crop.icon}</div>
                        <span className="text-gray-800 dark:text-gray-100">{crop.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                        {crop.category}
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
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingCrop(crop);
                              setFormData({
                                name: crop.name,
                                category: crop.category,
                                icon: crop.icon,
                              });
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(crop.id)}
                          >
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">
              {editingCrop ? "Edit Crop" : "Add New Crop"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Crop Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Wheat"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Cereals"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Icon (Emoji)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., 🌾"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              onClick={handleSave}
            >
              {editingCrop ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Seasons Component
export function Seasons() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSeason, setEditingSeason] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    startMonth: "",
    endMonth: "",
    description: "",
    icon: "🌧️",
  });

  const [seasons, setSeasons] = useState([
    {
      id: "1",
      name: "Kharif",
      startMonth: "June",
      endMonth: "October",
      description: "Monsoon season crops",
      icon: "🌧️",
      color: "bg-blue-500",
    },
    {
      id: "2",
      name: "Rabi",
      startMonth: "November",
      endMonth: "April",
      description: "Winter season crops",
      icon: "❄️",
      color: "bg-cyan-500",
    },
    {
      id: "3",
      name: "Zaid",
      startMonth: "March",
      endMonth: "June",
      description: "Summer season crops",
      icon: "☀️",
      color: "bg-amber-500",
    },
  ]);

  const handleSave = () => {
    if (!formData.name || !formData.startMonth || !formData.endMonth || !formData.description) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingSeason) {
      setSeasons(prev =>
        prev.map(season =>
          season.id === editingSeason.id
            ? { ...season, ...formData }
            : season
        )
      );
      toast.success("Season updated successfully");
    } else {
      const newSeason = {
        id: Date.now().toString(),
        ...formData,
        color: "bg-green-500",
      };
      setSeasons(prev => [...prev, newSeason]);
      toast.success("Season added successfully");
    }

    setIsDialogOpen(false);
    setFormData({ name: "", startMonth: "", endMonth: "", description: "", icon: "🌧️" });
    setEditingSeason(null);
  };

  const handleDelete = (id: string) => {
    setSeasons(prev => prev.filter(season => season.id !== id));
    toast.success("Season deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800 dark:text-gray-100">Crop Seasons</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage agricultural seasons and timelines
          </p>
        </div>
        <Button 
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl"
          onClick={() => {
            setEditingSeason(null);
            setFormData({ name: "", startMonth: "", endMonth: "", description: "", icon: "🌧️" });
            setIsDialogOpen(true);
          }}
        >
          <Plus size={20} className="mr-2" />
          Add Season
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {seasons.map((season, index) => (
          <motion.div
            key={season.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${season.color} rounded-xl text-white text-3xl`}>
                  {season.icon}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingSeason(season);
                        setFormData({
                          name: season.name,
                          startMonth: season.startMonth,
                          endMonth: season.endMonth,
                          description: season.description,
                          icon: season.icon,
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit size={14} className="mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDelete(season.id)}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h4 className="text-xl text-gray-800 dark:text-gray-100 mb-2">
                {season.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {season.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600 dark:text-gray-300">
                  <div className="text-xs text-gray-400">Start</div>
                  <div>{season.startMonth}</div>
                </div>
                <div className="text-gray-400">→</div>
                <div className="text-gray-600 dark:text-gray-300">
                  <div className="text-xs text-gray-400">End</div>
                  <div>{season.endMonth}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">
              {editingSeason ? "Edit Season" : "Add New Season"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Season Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Kharif"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Icon (Emoji)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., 🌧️"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Month</Label>
                <Input
                  value={formData.startMonth}
                  onChange={(e) => setFormData({ ...formData, startMonth: e.target.value })}
                  placeholder="e.g., June"
                  className="bg-gray-50 dark:bg-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label>End Month</Label>
                <Input
                  value={formData.endMonth}
                  onChange={(e) => setFormData({ ...formData, endMonth: e.target.value })}
                  placeholder="e.g., October"
                  className="bg-gray-50 dark:bg-slate-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this season..."
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              onClick={handleSave}
            >
              {editingSeason ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Soil Types Component
export function SoilTypes() {
  const { soilTypes, addSoilType, updateSoilType, deleteSoilType } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSoil, setEditingSoil] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "🟤",
  });

  const handleSave = () => {
    if (!formData.name) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingSoil) {
      updateSoilType(editingSoil.id, formData);
      toast.success("Soil type updated successfully");
    } else {
      addSoilType(formData);
      toast.success("Soil type added successfully");
    }

    setIsDialogOpen(false);
    setFormData({ name: "", icon: "🟤" });
    setEditingSoil(null);
  };

  const handleDelete = (id: string) => {
    deleteSoilType(id);
    toast.success("Soil type deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-gray-800 dark:text-gray-100">Soil Types</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage soil classifications and properties
          </p>
        </div>
        <Button 
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl"
          onClick={() => {
            setEditingSoil(null);
            setFormData({ name: "", icon: "🟤" });
            setIsDialogOpen(true);
          }}
        >
          <Plus size={20} className="mr-2" />
          Add Soil Type
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {soilTypes.map((soil, index) => (
          <motion.div
            key={soil.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-100 dark:bg-gray-700">
                  {soil.icon}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingSoil(soil);
                        setFormData({
                          name: soil.name,
                          icon: soil.icon,
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit size={14} className="mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDelete(soil.id)}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h4 className="text-lg text-gray-800 dark:text-gray-100 mb-2">
                {soil.name}
              </h4>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">
              {editingSoil ? "Edit Soil Type" : "Add New Soil Type"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Soil Type Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Loamy Soil"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Icon (Emoji)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., 🟤"
                className="bg-gray-50 dark:bg-slate-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              onClick={handleSave}
            >
              {editingSoil ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Main Crop Management Component with Tabs
export function CropManagement() {
  return (
    <div className="p-6">
      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-800 p-1 rounded-xl border-2 border-gray-100 dark:border-gray-700">
          <TabsTrigger value="categories" className="rounded-lg">
            Crop Categories
          </TabsTrigger>
          <TabsTrigger value="crops" className="rounded-lg">
            Crops
          </TabsTrigger>
          <TabsTrigger value="seasons" className="rounded-lg">
            Seasons
          </TabsTrigger>
          <TabsTrigger value="soil" className="rounded-lg">
            Soil Types
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <CropCategories />
        </TabsContent>
        <TabsContent value="crops">
          <Crops />
        </TabsContent>
        <TabsContent value="seasons">
          <Seasons />
        </TabsContent>
        <TabsContent value="soil">
          <SoilTypes />
        </TabsContent>
      </Tabs>
    </div>
  );
}
