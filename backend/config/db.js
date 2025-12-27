// In-memory database (for quick hackathon MVP)
// Replace with MongoDB/PostgreSQL for production

export const db = {
  equipment: [
    {
      id: "EQ001",
      name: "CNC Machine 01",
      serialNumber: "SN-12345-XYZ",
      category: "Production Equipment",
      department: "Production",
      assignedTo: "John Doe",
      location: "Factory Floor - Section A",
      purchaseDate: "2023-01-15",
      warrantyExpiry: "2026-01-15",
      maintenanceTeam: "Mechanics",
      defaultTechnician: "Alex Foster",
      health: 25,
      status: "Active",
      createdAt: new Date().toISOString(),
    },
    {
      id: "EQ002",
      name: "Laptop - Dell XPS 15",
      serialNumber: "DELL-789-ABC",
      category: "Computer",
      department: "IT",
      assignedTo: "Jane Smith",
      location: "Office Building - 3rd Floor",
      purchaseDate: "2024-06-10",
      warrantyExpiry: "2027-06-10",
      maintenanceTeam: "IT Support",
      defaultTechnician: "Mike Johnson",
      health: 90,
      status: "Active",
      createdAt: new Date().toISOString(),
    },
  ],

  teams: [
    {
      id: "TEAM001",
      name: "Mechanics",
      specialty: "Heavy Machinery",
      members: [
        {
          id: "TECH001",
          name: "Alex Foster",
          role: "Senior Technician",
          email: "alex@company.com",
          avatar: "/avatars/alex.jpg",
        },
        {
          id: "TECH002",
          name: "Sarah Chen",
          role: "Technician",
          email: "sarah@company.com",
          avatar: "/avatars/sarah.jpg",
        },
      ],
      activeRequests: 5,
      utilizationRate: 85,
      createdAt: new Date().toISOString(),
    },
    {
      id: "TEAM002",
      name: "IT Support",
      specialty: "Computer & Network",
      members: [
        {
          id: "TECH003",
          name: "Mike Johnson",
          role: "IT Specialist",
          email: "mike@company.com",
          avatar: "/avatars/mike.jpg",
        },
      ],
      activeRequests: 2,
      utilizationRate: 60,
      createdAt: new Date().toISOString(),
    },
  ],

  requests: [
    {
      id: "REQ001",
      subject: "Past activity",
      description: "Routine maintenance check",
      equipment: "EQ001",
      equipmentName: "CNC Machine 01",
      category: "computer",
      type: "Corrective",
      priority: "Medium",
      stage: "New Request",
      maintenanceTeam: "Mechanics",
      assignedTechnician: "Alex Foster",
      requestedBy: "Mitchell Admin",
      scheduledDate: null,
      startDate: null,
      completionDate: null,
      duration: null,
      company: "My company",
      notes: [],
      isOverdue: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

// Helper function to generate IDs
export const generateId = (prefix) => {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
};
