import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Data Types
export interface CropType {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface SoilType {
  id: string;
  name: string;
  icon: string;
}

export interface WeatherData {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "farmer" | "admin" | "superadmin";
  status: "active" | "inactive";
  createdAt: string;
}

// Default Data
const defaultCrops: CropType[] = [
  { id: "1", name: "Wheat", icon: "🌾", category: "Cereals" },
  { id: "2", name: "Rice", icon: "🌾", category: "Cereals" },
  { id: "3", name: "Corn", icon: "🌽", category: "Cereals" },
  { id: "4", name: "Cotton", icon: "🌸", category: "Fiber" },
  { id: "5", name: "Sugarcane", icon: "🎋", category: "Sugar" },
  { id: "6", name: "Potato", icon: "🥔", category: "Vegetables" },
];

const defaultSoilTypes: SoilType[] = [
  { id: "1", name: "Clay Soil", icon: "🟫" },
  { id: "2", name: "Sandy Soil", icon: "🟨" },
  { id: "3", name: "Loamy Soil", icon: "🟤" },
  { id: "4", name: "Black Soil", icon: "⬛" },
];

const defaultWeatherData: WeatherData[] = [
  {
    id: "1",
    location: "Mumbai",
    temperature: 32,
    humidity: 65,
    rainfall: 120,
    condition: "Partly Cloudy",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    location: "Delhi",
    temperature: 28,
    humidity: 45,
    rainfall: 80,
    condition: "Sunny",
    date: new Date().toISOString(),
  },
];

// Context Type
interface DataContextType {
  crops: CropType[];
  soilTypes: SoilType[];
  weatherData: WeatherData[];
  users: User[];
  addCrop: (crop: Omit<CropType, "id">) => void;
  updateCrop: (id: string, crop: Partial<CropType>) => void;
  deleteCrop: (id: string) => void;
  addSoilType: (soilType: Omit<SoilType, "id">) => void;
  updateSoilType: (id: string, soilType: Partial<SoilType>) => void;
  deleteSoilType: (id: string) => void;
  addWeather: (weather: Omit<WeatherData, "id">) => void;
  updateWeather: (id: string, weather: Partial<WeatherData>) => void;
  deleteWeather: (id: string) => void;
  addUser: (user: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider Component
export function DataProvider({ children }: { children: ReactNode }) {
  const [crops, setCrops] = useState<CropType[]>(() => {
    const stored = localStorage.getItem("agri_crops");
    return stored ? JSON.parse(stored) : defaultCrops;
  });

  const [soilTypes, setSoilTypes] = useState<SoilType[]>(() => {
    const stored = localStorage.getItem("agri_soil_types");
    return stored ? JSON.parse(stored) : defaultSoilTypes;
  });

  const [weatherData, setWeatherData] = useState<WeatherData[]>(() => {
    const stored = localStorage.getItem("agri_weather");
    return stored ? JSON.parse(stored) : defaultWeatherData;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem("agri_users");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("agri_crops", JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem("agri_soil_types", JSON.stringify(soilTypes));
  }, [soilTypes]);

  useEffect(() => {
    localStorage.setItem("agri_weather", JSON.stringify(weatherData));
  }, [weatherData]);

  useEffect(() => {
    localStorage.setItem("agri_users", JSON.stringify(users));
  }, [users]);

  // Crop CRUD
  const addCrop = (crop: Omit<CropType, "id">) => {
    const newCrop = { ...crop, id: Date.now().toString() };
    setCrops((prev) => [...prev, newCrop]);
  };

  const updateCrop = (id: string, crop: Partial<CropType>) => {
    setCrops((prev) => prev.map((c) => (c.id === id ? { ...c, ...crop } : c)));
  };

  const deleteCrop = (id: string) => {
    setCrops((prev) => prev.filter((c) => c.id !== id));
  };

  // Soil Type CRUD
  const addSoilType = (soilType: Omit<SoilType, "id">) => {
    const newSoilType = { ...soilType, id: Date.now().toString() };
    setSoilTypes((prev) => [...prev, newSoilType]);
  };

  const updateSoilType = (id: string, soilType: Partial<SoilType>) => {
    setSoilTypes((prev) => prev.map((s) => (s.id === id ? { ...s, ...soilType } : s)));
  };

  const deleteSoilType = (id: string) => {
    setSoilTypes((prev) => prev.filter((s) => s.id !== id));
  };

  // Weather CRUD
  const addWeather = (weather: Omit<WeatherData, "id">) => {
    const newWeather = { ...weather, id: Date.now().toString() };
    setWeatherData((prev) => [...prev, newWeather]);
  };

  const updateWeather = (id: string, weather: Partial<WeatherData>) => {
    setWeatherData((prev) => prev.map((w) => (w.id === id ? { ...w, ...weather } : w)));
  };

  const deleteWeather = (id: string) => {
    setWeatherData((prev) => prev.filter((w) => w.id !== id));
  };

  // User CRUD
  const addUser = (user: Omit<User, "id" | "createdAt">) => {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (id: string, user: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...user } : u)));
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        crops,
        soilTypes,
        weatherData,
        users,
        addCrop,
        updateCrop,
        deleteCrop,
        addSoilType,
        updateSoilType,
        deleteSoilType,
        addWeather,
        updateWeather,
        deleteWeather,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Hook to use the context
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
