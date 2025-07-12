export const batteryData = {
  percentage: 78,
  range: 42, // in km
  timeRemaining: 5.2, // in hours
  swapStations: 3, // nearby
};

export const weatherData = {
  current: {
    temp: 29, // in Celsius
    condition: "Partly Cloudy",
    windSpeed: 12, // in km/h
    windDirection: "NE",
    waveHeight: 1.2, // in meters
  },
  forecast: [
    { time: "12 PM", temp: 30, condition: "Sunny" },
    { time: "3 PM", temp: 31, condition: "Partly Cloudy" },
    { time: "6 PM", temp: 28, condition: "Cloudy" },
    { time: "9 PM", temp: 26, condition: "Clear" },
  ],
};

export const swapStations = [
  {
    id: "1",
    name: "Kochi Harbor Station",
    distance: 3.2, // in km
    batteries: 5,
    isOpen: true,
    coordinates: { latitude: 9.9672, longitude: 76.2674 },
  },
  {
    id: "2",
    name: "Vypeen Beach Station",
    distance: 5.7,
    batteries: 2,
    isOpen: true,
    coordinates: { latitude: 10.0137, longitude: 76.2432 },
  },
  {
    id: "3",
    name: "Fort Kochi Station",
    distance: 7.1,
    batteries: 0,
    isOpen: true,
    coordinates: { latitude: 9.9658, longitude: 76.2422 },
  },
  {
    id: "4",
    name: "Maradu Junction Station",
    distance: 8.5,
    batteries: 3,
    isOpen: false, // closed
    coordinates: { latitude: 9.9499, longitude: 76.3233 },
  },
];

export const diagnosticsData = {
  alerts: [
    {
      id: "1",
      type: "warning",
      title: "Motor Temperature High",
      description: "Motor is running hot. Consider reducing speed.",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "info",
      title: "Maintenance Due",
      description: "Scheduled maintenance in 5 days.",
      timestamp: "1 day ago",
    },
  ],
  systemHealth: {
    battery: "Good",
    motor: "Warning",
    controller: "Good",
    propeller: "Good",
  },
};

export const userProfile = {
  name: "Rajesh Kumar",
  village: "Kochi",
  phone: "+91 98765 43210",
  boatName: "Samudra Shakti",
  boatId: "KL-03-MM-2023",
  language: "Malayalam",
  ecoImpact: {
    fuelSaved: 342, // liters
    co2Reduced: 912, // kg
    treesEquivalent: 41,
    tripsTaken: 87,
  },
};

export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "bn", name: "বাংলা (Bengali)" },
];