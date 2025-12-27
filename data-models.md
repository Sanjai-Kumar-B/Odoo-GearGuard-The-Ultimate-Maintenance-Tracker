# Data Models

## 1. Equipment

```javascript
{
  id: "EQ001",
  name: "CNC Machine 01",
  serialNumber: "SN-12345-XYZ",
  category: "Production Equipment", // Computer, Vehicle, Machine
  department: "Production", // Production, IT, Logistics
  assignedTo: "John Doe", // Employee name
  location: "Factory Floor - Section A",
  purchaseDate: "2023-01-15",
  warrantyExpiry: "2026-01-15",
  maintenanceTeam: "Mechanics", // Team responsible
  defaultTechnician: "Alex Foster", // Default assigned tech
  health: 75, // 0-100% (for critical equipment alert)
  status: "Active", // Active, Under Maintenance, Scrapped
  createdAt: "2024-01-01T10:00:00Z"
}
```

## 2. Maintenance Team

```javascript
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
      avatar: "/avatars/alex.jpg"
    },
    {
      id: "TECH002",
      name: "Sarah Chen",
      role: "Technician",
      email: "sarah@company.com",
      avatar: "/avatars/sarah.jpg"
    }
  ],
  activeRequests: 5,
  utilizationRate: 85, // % (for Technician Load card)
  createdAt: "2024-01-01T10:00:00Z"
}
```

## 3. Maintenance Request

```javascript
{
  id: "REQ001",
  subject: "Leaking Oil - CNC Machine",
  description: "Oil leak detected from main hydraulic pump",
  equipment: "EQ001", // Equipment ID
  equipmentName: "CNC Machine 01", // Auto-filled
  category: "Production Equipment", // Auto-filled from equipment
  type: "Corrective", // Corrective, Preventive
  priority: "High", // Low, Medium, High, Critical
  stage: "New", // New, In Progress, Repaired, Scrap
  maintenanceTeam: "Mechanics", // Auto-filled from equipment
  assignedTechnician: "Alex Foster", // Assigned by manager or auto
  requestedBy: "Mitchell Admin", // User who created request
  scheduledDate: "2024-12-28T09:00:00Z", // For preventive
  startDate: null, // When work started
  completionDate: null, // When work completed
  duration: null, // Hours spent (filled on completion)
  company: "My Company",
  notes: [],
  isOverdue: false, // Calculated field
  createdAt: "2024-12-27T08:30:00Z",
  updatedAt: "2024-12-27T08:30:00Z"
}
```

## 4. Dashboard Stats (Calculated)

```javascript
{
  criticalEquipment: {
    count: 5,
    threshold: 30, // Health < 30%
    items: ["EQ001", "EQ023"]
  },
  technicianLoad: {
    averageUtilization: 85,
    teams: [
      { name: "Mechanics", utilization: 85 },
      { name: "IT Support", utilization: 60 }
    ]
  },
  openRequests: {
    total: 12,
    pending: 12,
    overdue: 3,
    byStage: {
      new: 5,
      inProgress: 7,
      repaired: 0,
      scrap: 0
    }
  }
}
```
