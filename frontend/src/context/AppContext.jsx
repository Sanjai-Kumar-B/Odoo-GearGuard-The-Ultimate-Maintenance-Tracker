import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

// Mock Data
const mockEquipment = [
  {
    _id: '1',
    name: 'Centrifugal Pump CP-101',
    serialNumber: 'CP-101-2024',
    category: 'Pumps',
    department: 'Production',
    location: 'Building A - Floor 2',
    maintenanceTeam: 'Mechanical Team',
    defaultTechnician: 'John Smith',
    purchaseDate: '2024-01-15',
    warrantyExpiry: '2027-01-15',
    health: 85,
    status: 'Active',
  },
  {
    _id: '2',
    name: 'Hydraulic Press HP-502',
    serialNumber: 'HP-502-2024',
    category: 'Presses',
    department: 'Production',
    location: 'Building B - Floor 2',
    maintenanceTeam: 'Mechanical Team',
    defaultTechnician: 'John Smith',
    purchaseDate: '2024-02-20',
    warrantyExpiry: '2027-02-20',
    health: 45,
    status: 'Active',
  },
  {
    _id: '3',
    name: 'HVAC Unit HV-401',
    serialNumber: 'HV-401-2024',
    category: 'HVAC',
    department: 'Facilities',
    location: 'Building C - Roof',
    maintenanceTeam: 'HVAC Team',
    defaultTechnician: 'Alex Chen',
    purchaseDate: '2024-03-10',
    warrantyExpiry: '2029-03-10',
    health: 90,
    status: 'Active',
  },
  {
    _id: '4',
    name: 'Air Compressor AC-205',
    serialNumber: 'AC-205-2024',
    category: 'Compressors',
    department: 'Production',
    location: 'Building B - Floor 1',
    maintenanceTeam: 'Mechanical Team',
    defaultTechnician: 'Sarah Johnson',
    purchaseDate: '2024-04-05',
    warrantyExpiry: '2027-04-05',
    health: 72,
    status: 'Active',
  },
  {
    _id: '5',
    name: 'Motor Drive MD-303',
    serialNumber: 'MD-303-2024',
    category: 'Motors',
    department: 'Assembly',
    location: 'Building A - Floor 3',
    maintenanceTeam: 'Electrical Team',
    defaultTechnician: 'Emily Davis',
    purchaseDate: '2024-05-12',
    warrantyExpiry: '2027-05-12',
    health: 25,
    status: 'Under Maintenance',
  },
  {
    _id: '6',
    name: 'Conveyor Belt CB-601',
    serialNumber: 'CB-601-2024',
    category: 'Conveyors',
    department: 'Logistics',
    location: 'Warehouse - Section A',
    maintenanceTeam: 'Mechanical Team',
    defaultTechnician: 'Mike Wilson',
    purchaseDate: '2024-06-20',
    warrantyExpiry: '2027-06-20',
    health: 65,
    status: 'Active',
  },
  {
    _id: '7',
    name: 'CNC Machine XY200',
    serialNumber: 'XY200-2024',
    category: 'Machines',
    department: 'Manufacturing',
    location: 'Building A - Floor 1',
    maintenanceTeam: 'Mechanical Team',
    defaultTechnician: 'John Smith',
    purchaseDate: '2024-07-10',
    warrantyExpiry: '2029-07-10',
    health: 15,
    status: 'Active',
  },
  {
    _id: '8',
    name: 'Forklift FL-150',
    serialNumber: 'FL-150-2024',
    category: 'Vehicles',
    department: 'Warehouse',
    location: 'Warehouse - Loading Bay',
    maintenanceTeam: 'Mechanical Team',
    defaultTechnician: 'Mike Wilson',
    purchaseDate: '2024-08-15',
    warrantyExpiry: '2027-08-15',
    health: 55,
    status: 'Active',
  },
];

const mockTeams = [
  {
    _id: '1',
    name: 'Mechanical Team',
    members: ['John Smith', 'Sarah Johnson', 'Mike Wilson'],
    company: 'My Company (San Francisco)',
    activeRequests: 6,
  },
  {
    _id: '2',
    name: 'Electrical Team',
    members: ['Emily Davis', 'Robert Brown'],
    company: 'My Company (San Francisco)',
    activeRequests: 2,
  },
  {
    _id: '3',
    name: 'HVAC Team',
    members: ['Alex Chen', 'Maria Garcia'],
    company: 'My Company (San Francisco)',
    activeRequests: 3,
  },
  {
    _id: '4',
    name: 'IT Support',
    members: ['David Lee', 'Jennifer White'],
    company: 'My Company (San Francisco)',
    activeRequests: 1,
  },
];

const mockRequests = [
  {
    _id: '1',
    subject: 'Oil leakage detected',
    description: 'Hydraulic press showing oil leakage from main cylinder',
    equipmentId: '2',
    equipmentName: 'Hydraulic Press HP-502',
    category: 'Presses',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'John Smith',
    type: 'Corrective',
    priority: 'High',
    stage: 'New',
    requestDate: '2025-12-26',
    scheduledDate: '2025-12-27',
    duration: 4,
    createdBy: 'Mitchell Admin',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '2',
    subject: 'Motor overheating',
    description: 'Motor drive running at high temperature, needs inspection',
    equipmentId: '5',
    equipmentName: 'Motor Drive MD-303',
    category: 'Motors',
    maintenanceTeam: 'Electrical Team',
    assignedTechnician: 'Emily Davis',
    type: 'Corrective',
    priority: 'Critical',
    stage: 'In Progress',
    requestDate: '2025-12-20',
    scheduledDate: '2025-12-21',
    duration: 6,
    createdBy: 'Sarah Johnson',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '3',
    subject: 'Quarterly maintenance check',
    description: 'Routine quarterly maintenance for HVAC system',
    equipmentId: '3',
    equipmentName: 'HVAC Unit HV-401',
    category: 'HVAC',
    maintenanceTeam: 'HVAC Team',
    assignedTechnician: 'Alex Chen',
    type: 'Preventive',
    priority: 'Low',
    stage: 'Repaired',
    requestDate: '2025-12-15',
    scheduledDate: '2025-12-29',
    duration: 3,
    createdBy: 'Admin',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '4',
    subject: 'Belt replacement required',
    description: 'Conveyor belt showing wear and tear, replacement needed',
    equipmentId: '6',
    equipmentName: 'Conveyor Belt CB-601',
    category: 'Conveyors',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'Mike Wilson',
    type: 'Corrective',
    priority: 'Medium',
    stage: 'New',
    requestDate: '2025-12-25',
    scheduledDate: '2025-12-30',
    duration: 5,
    createdBy: 'John Smith',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '5',
    subject: 'Pump maintenance overdue',
    description: 'Centrifugal pump preventive maintenance is overdue',
    equipmentId: '1',
    equipmentName: 'Centrifugal Pump CP-101',
    category: 'Pumps',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'Sarah Johnson',
    type: 'Preventive',
    priority: 'Medium',
    stage: 'New',
    requestDate: '2025-12-18',
    scheduledDate: '2025-12-24',
    duration: 2,
    createdBy: 'System',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '6',
    subject: 'CNC calibration required',
    description: 'CNC machine needs calibration and alignment check',
    equipmentId: '7',
    equipmentName: 'CNC Machine XY200',
    category: 'Machines',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'John Smith',
    type: 'Corrective',
    priority: 'Critical',
    stage: 'In Progress',
    requestDate: '2025-12-22',
    scheduledDate: '2025-12-23',
    duration: 8,
    createdBy: 'Production Manager',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '7',
    subject: 'Air filter replacement',
    description: 'Air compressor filters need replacement',
    equipmentId: '4',
    equipmentName: 'Air Compressor AC-205',
    category: 'Compressors',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'Sarah Johnson',
    type: 'Preventive',
    priority: 'Low',
    stage: 'New',
    requestDate: '2025-12-27',
    scheduledDate: '2026-01-05',
    duration: 1,
    createdBy: 'Admin',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '8',
    subject: 'Hydraulic fluid top-up',
    description: 'Forklift needs hydraulic fluid level check and top-up',
    equipmentId: '8',
    equipmentName: 'Forklift FL-150',
    category: 'Vehicles',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'Mike Wilson',
    type: 'Preventive',
    priority: 'Low',
    stage: 'Repaired',
    requestDate: '2025-12-10',
    scheduledDate: '2025-12-28',
    duration: 1,
    createdBy: 'Warehouse Manager',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '9',
    subject: 'Complete overhaul needed',
    description: 'Equipment beyond repair, recommend scrapping',
    equipmentId: '5',
    equipmentName: 'Motor Drive MD-303',
    category: 'Motors',
    maintenanceTeam: 'Electrical Team',
    assignedTechnician: 'Robert Brown',
    type: 'Corrective',
    priority: 'High',
    stage: 'Scrap',
    requestDate: '2025-12-19',
    scheduledDate: '2025-12-20',
    duration: 0,
    createdBy: 'Maintenance Head',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '10',
    subject: 'Temperature sensor calibration',
    description: 'HVAC temperature sensors need calibration',
    equipmentId: '3',
    equipmentName: 'HVAC Unit HV-401',
    category: 'HVAC',
    maintenanceTeam: 'HVAC Team',
    assignedTechnician: 'Maria Garcia',
    type: 'Preventive',
    priority: 'Medium',
    stage: 'In Progress',
    requestDate: '2025-12-23',
    scheduledDate: '2026-01-02',
    duration: 2,
    createdBy: 'Alex Chen',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '11',
    subject: 'Compressor noise issue',
    description: 'Air compressor making unusual noise, needs inspection',
    equipmentId: '4',
    equipmentName: 'Air Compressor AC-205',
    category: 'Compressors',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'John Smith',
    type: 'Corrective',
    priority: 'Medium',
    stage: 'New',
    requestDate: '2025-12-27',
    scheduledDate: '2025-12-29',
    duration: 3,
    createdBy: 'Floor Supervisor',
    company: 'My Company (San Francisco)',
  },
  {
    _id: '12',
    subject: 'Annual safety inspection',
    description: 'Yearly safety inspection and certification',
    equipmentId: '2',
    equipmentName: 'Hydraulic Press HP-502',
    category: 'Presses',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'Sarah Johnson',
    type: 'Preventive',
    priority: 'High',
    stage: 'New',
    requestDate: '2025-12-26',
    scheduledDate: '2025-12-31',
    duration: 4,
    createdBy: 'Safety Officer',
    company: 'My Company (San Francisco)',
  },
];

export const AppProvider = ({ children }) => {
  const [equipment, setEquipment] = useState(mockEquipment);
  const [teams, setTeams] = useState(mockTeams);
  const [requests, setRequests] = useState(mockRequests);

  // Equipment Functions
  const addEquipment = (newEquipment) => {
    const equipment = {
      ...newEquipment,
      _id: Date.now().toString(),
      health: 100,
      status: 'Active',
    };
    setEquipment((prev) => [...prev, equipment]);
    return equipment;
  };

  const updateEquipment = (id, updates) => {
    setEquipment((prev) =>
      prev.map((eq) => (eq._id === id ? { ...eq, ...updates } : eq))
    );
  };

  const deleteEquipment = (id) => {
    setEquipment((prev) => prev.filter((eq) => eq._id !== id));
  };

  // Team Functions
  const addTeam = (newTeam) => {
    const team = {
      ...newTeam,
      _id: Date.now().toString(),
    };
    setTeams((prev) => [...prev, team]);
    return team;
  };

  const updateTeam = (id, updates) => {
    setTeams((prev) =>
      prev.map((team) => (team._id === id ? { ...team, ...updates } : team))
    );
  };

  // Request Functions
  const addRequest = (newRequest) => {
    const request = {
      ...newRequest,
      _id: Date.now().toString(),
      stage: 'New',
      requestDate: new Date().toISOString().split('T')[0],
    };
    setRequests((prev) => [...prev, request]);
    return request;
  };

  const updateRequest = (id, updates) => {
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, ...updates } : req))
    );
  };

  const updateRequestStage = (id, newStage) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req._id === id) {
          // If moving to Scrap, mark equipment as unusable
          if (newStage === 'Scrap') {
            updateEquipment(req.equipmentId, { status: 'Scrapped' });
          }
          return { ...req, stage: newStage };
        }
        return req;
      })
    );
  };

  const deleteRequest = (id) => {
    setRequests((prev) => prev.filter((req) => req._id !== id));
  };

  const value = {
    equipment,
    teams,
    requests,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addTeam,
    updateTeam,
    addRequest,
    updateRequest,
    updateRequestStage,
    deleteRequest,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
