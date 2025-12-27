import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

const API_URL = 'http://localhost:5000/api';

export const AppProvider = ({ children }) => {
  const [equipment, setEquipment] = useState([]);
  const [teams, setTeams] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [equipmentRes, teamsRes, requestsRes] = await Promise.all([
        fetch(`${API_URL}/equipment`),
        fetch(`${API_URL}/teams`),
        fetch(`${API_URL}/requests`),
      ]);

      const equipmentData = await equipmentRes.json();
      const teamsData = await teamsRes.json();
      const requestsData = await requestsRes.json();

      setEquipment(equipmentData);
      setTeams(teamsData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
      alert('Backend server is not running. Please start the backend server with: cd backend && npm start');
    } finally {
      setLoading(false);
    }
  };

  // Equipment Functions
  const addEquipment = async (newEquipment) => {
    try {
      const response = await fetch(`${API_URL}/equipment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEquipment),
      });
      const equipment = await response.json();
      setEquipment((prev) => [...prev, equipment]);
      return equipment;
    } catch (error) {
      console.error('Error adding equipment:', error);
      throw error;
    }
  };

  const updateEquipment = async (id, updates) => {
    try {
      await fetch(`${API_URL}/equipment/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      setEquipment((prev) =>
        prev.map((eq) => (eq._id === id ? { ...eq, ...updates } : eq))
      );
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  const deleteEquipment = async (id) => {
    try {
      await fetch(`${API_URL}/equipment/${id}`, { method: 'DELETE' });
      setEquipment((prev) => prev.filter((eq) => eq._id !== id));
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  // Team Functions
  const addTeam = async (newTeam) => {
    try {
      const response = await fetch(`${API_URL}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeam),
      });
      const team = await response.json();
      setTeams((prev) => [...prev, team]);
      return team;
    } catch (error) {
      console.error('Error adding team:', error);
      throw error;
    }
  };

  const updateTeam = async (id, updates) => {
    try {
      await fetch(`${API_URL}/teams/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      setTeams((prev) =>
        prev.map((team) => (team._id === id ? { ...team, ...updates } : team))
      );
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  // Request Functions
  const addRequest = async (newRequest) => {
    try {
      const response = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newRequest,
          equipment: newRequest.equipmentId,
        }),
      });
      const request = await response.json();
      setRequests((prev) => [...prev, request]);
      return request;
    } catch (error) {
      console.error('Error adding request:', error);
      throw error;
    }
  };

  const updateRequest = async (id, updates) => {
    try {
      await fetch(`${API_URL}/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, ...updates } : req))
      );
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const updateRequestStage = async (id, newStage) => {
    try {
      await fetch(`${API_URL}/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });
      
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
    } catch (error) {
      console.error('Error updating request stage:', error);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await fetch(`${API_URL}/requests/${id}`, { method: 'DELETE' });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const value = {
    equipment,
    teams,
    requests,
    loading,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addTeam,
    updateTeam,
    addRequest,
    updateRequest,
    updateRequestStage,
    deleteRequest,
    refetch: fetchAllData,
  };

  if (loading) {
    return (
      <AppContext.Provider value={value}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading data from server...</p>
          </div>
        </div>
      </AppContext.Provider>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
