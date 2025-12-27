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
];

const mockTeams = [
  {
    _id: '1',
    name: 'Mechanical Team',
    members: ['John Smith', 'Sarah Johnson', 'Mike Wilson'],
    company: 'My Company (San Francisco)',
  },
  {
    _id: '2',
    name: 'Electrical Team',
    members: ['Emily Davis'],
    company: 'My Company (San Francisco)',
  },
  {
    _id: '3',
    name: 'HVAC Team',
    members: ['Alex Chen'],
    company: 'My Company (San Francisco)',
  },
];

const mockRequests = [
  {
    _id: '1',
    subject: 'Test activity',
    description: 'Test maintenance activity',
    equipmentId: '2',
    equipmentName: 'Hydraulic Press HP-502',
    category: 'Presses',
    maintenanceTeam: 'Mechanical Team',
    assignedTechnician: 'John Smith',
    type: 'Corrective',
    priority: 'Medium',
    stage: 'New',
    requestDate: '2025-12-18',
    scheduledDate: '2025-12-28',
    duration: 0,
    createdBy: 'Mitchell Admin',
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
