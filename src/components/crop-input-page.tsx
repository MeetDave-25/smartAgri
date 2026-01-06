import { motion } from "framer-motion";
import { useState } from "react";
import { Wheat, MapPin, Droplets, Mountain, Sprout, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AnimatedBackground } from "./animated-background";
import { useData } from "../contexts/data-context";
import { useLanguage } from "../contexts/language-context";

interface CropInputPageProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

interface FormData {
  cropType: string;
  fieldSize: string;
  soilType: string;
  location: string;
}

export function CropInputPage({ onSubmit, onBack }: CropInputPageProps) {
  const { crops, soilTypes } = useData();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<FormData>({
    cropType: "",
    fieldSize: "",
    soilType: "",
    location: "",
  });

  const [selectedField, setSelectedField] = useState<string>("");

  // Convert data context crops to the format needed for display
  const cropTypes = crops.map(crop => ({
    value: crop.id,
    label: crop.name,
    icon: crop.icon
  }));

  // Convert data context soil types to the format needed for display
  const soilTypesList = soilTypes.map(soil => ({
    value: soil.id,
    label: soil.name,
    icon: soil.icon
  }));

  const handleFieldClick = (field: string) => {
    setSelectedField(field);
  };

  const handleSubmit = () => {
    if (formData.cropType && formData.fieldSize && formData.soilType && formData.location) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.cropType && formData.fieldSize && formData.soilType && formData.location;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100 hover:bg-green-100 dark:hover:bg-green-900 rounded-full"
          >
            ← {t('back')}
          </Button>
          
          <h1 className="text-green-800 dark:text-green-100 mb-2">{t('tellUsAboutFarm')}</h1>
          <p className="text-green-600 dark:text-green-300">{t('selectCropDetails')}</p>
        </motion.div>

        {/* Form */}
        <div className="space-y-6">
          {/* Crop Type Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-green-100 dark:border-green-800 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Wheat className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h2 className="text-green-800 dark:text-green-100">{t('cropType')}</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cropTypes.map((crop) => (
                  <motion.button
                    key={crop.value}
                    onClick={() => {
                      setFormData({ ...formData, cropType: crop.value });
                      handleFieldClick("crop");
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.cropType === crop.value
                        ? "border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900"
                        : "border-green-200 dark:border-green-700 bg-white dark:bg-slate-700 hover:border-green-400 dark:hover:border-green-500"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      selectedField === "crop" && formData.cropType === crop.value
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                  >
                    <div className="text-3xl mb-2">{crop.icon}</div>
                    <div className="text-green-800 dark:text-green-100">{crop.label}</div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Field Size */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-green-100 dark:border-green-800 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
                  <Mountain className="text-amber-600 dark:text-amber-400" size={24} />
                </div>
                <h2 className="text-green-800 dark:text-green-100">{t('fieldSize')}</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["1-5 acres", "5-10 acres", "10-20 acres", "20+ acres"].map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => {
                      setFormData({ ...formData, fieldSize: size });
                      handleFieldClick("size");
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.fieldSize === size
                        ? "border-amber-600 dark:border-amber-400 bg-amber-50 dark:bg-amber-900"
                        : "border-amber-200 dark:border-amber-700 bg-white dark:bg-slate-700 hover:border-amber-400 dark:hover:border-amber-500"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      selectedField === "size" && formData.fieldSize === size
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                  >
                    <div className="text-amber-800 dark:text-amber-100">{size}</div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Soil Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-green-100 dark:border-green-800 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <Sprout className="text-orange-600 dark:text-orange-400" size={24} />
                </div>
                <h2 className="text-green-800 dark:text-green-100">{t('soilType')}</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {soilTypesList.map((soil) => (
                  <motion.button
                    key={soil.value}
                    onClick={() => {
                      setFormData({ ...formData, soilType: soil.value });
                      handleFieldClick("soil");
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.soilType === soil.value
                        ? "border-orange-600 dark:border-orange-400 bg-orange-50 dark:bg-orange-900"
                        : "border-orange-200 dark:border-orange-700 bg-white dark:bg-slate-700 hover:border-orange-400 dark:hover:border-orange-500"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      selectedField === "soil" && formData.soilType === soil.value
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                  >
                    <div className="text-3xl mb-2">{soil.icon}</div>
                    <div className="text-orange-800 dark:text-orange-100 text-sm">{soil.label}</div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-green-100 dark:border-green-800 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h2 className="text-green-800 dark:text-green-100">{t('location')}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t('enterLocation')}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  onFocus={() => handleFieldClick("location")}
                  className="p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-600 dark:focus:border-blue-400 focus:outline-none transition-all"
                />
                
                <Button
                  variant="outline"
                  className="border-2 border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-2xl"
                  onClick={() => {
                    setFormData({ ...formData, location: "Auto-detected: Mumbai, Maharashtra" });
                    handleFieldClick("location");
                  }}
                >
                  <MapPin className="mr-2" size={20} />
                  Auto-Detect Location
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-6 rounded-full text-lg transition-all ${
                isFormValid
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              size="lg"
            >
              {isFormValid ? (
                <>
                  {t('predictYield')}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2" size={24} />
                  </motion.div>
                </>
              ) : (
                "Please fill all fields"
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}