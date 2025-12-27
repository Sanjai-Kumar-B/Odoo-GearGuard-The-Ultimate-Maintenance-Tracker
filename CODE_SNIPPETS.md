# 📝 Code Snippets Library

Copy-paste these when you need them!

---

## 🎨 Common Tailwind Classes

### Buttons

```javascript
// Primary Button
className =
  "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium";

// Secondary Button
className =
  "bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium";

// Danger Button
className =
  "bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium";
```

### Cards

```javascript
className = "bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow";
```

### Input Fields

```javascript
className =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
```

---

## 🔌 API Call Templates

### GET Request

```javascript
const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/endpoint");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### POST Request

```javascript
const createItem = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### PUT Request (Update)

```javascript
const updateItem = async (id, updates) => {
  try {
    const response = await fetch(`http://localhost:5000/api/endpoint/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## 📋 Form Component Template

```javascript
import React, { useState } from "react";

const FormComponent = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Form Title</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="field1"
          placeholder="Field 1"
          value={formData.field1}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="field2"
          placeholder="Field 2"
          value={formData.field2}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div className="flex gap-2 mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
```

---

## 📊 Table Component Template

```javascript
import React from "react";

const TableComponent = ({ data, onRowClick }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Column 1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Column 2
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick(item)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">{item.field1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.field2}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
```

---

## 🎯 Modal Component Template

```javascript
import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

// Usage:
// const [isOpen, setIsOpen] = useState(false);
// <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
//   <p>Content goes here</p>
// </Modal>
```

---

## 🔘 Smart Button Component

```javascript
import React from "react";
import { Wrench } from "lucide-react";

const SmartButton = ({ count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
    >
      <Wrench className="w-5 h-5" />
      <span>Maintenance</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

export default SmartButton;
```

---

## 🎨 Status Badge Component

```javascript
const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    const colors = {
      "New Request": "bg-yellow-100 text-yellow-800",
      "In Progress": "bg-blue-100 text-blue-800",
      Repaired: "bg-green-100 text-green-800",
      Scrap: "bg-red-100 text-red-800",
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
```

---

## 📅 Date Formatting

```javascript
// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format date for input field
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

// Check if date is overdue
const isOverdue = (dateString) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};
```

---

## 🎭 Loading Spinner

```javascript
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default LoadingSpinner;
```

---

## 🚨 Error Message Component

```javascript
import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
      <div>
        <h3 className="font-semibold text-red-800">Error</h3>
        <p className="text-red-700 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
```

---

## 🎯 Search/Filter Component

```javascript
import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
```

---

## 🎨 Avatar Component

```javascript
const Avatar = ({ name, size = "md" }) => {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`${sizes[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-bold`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
```

---

## 🔔 Toast Notification

```javascript
import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };

  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed top-4 right-4 border rounded-lg p-4 shadow-lg flex items-center gap-3 ${styles[type]} z-50`}
    >
      <Icon className="w-5 h-5" />
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default Toast;

// Usage:
// const [showToast, setShowToast] = useState(false);
// {showToast && <Toast message="Success!" onClose={() => setShowToast(false)} />}
```

---

## 💡 Pro Tips

1. **Reuse components** - Don't repeat yourself!
2. **Test as you build** - Don't wait until the end
3. **Use browser DevTools** - Check console for errors
4. **Git commit often** - "Save" your progress
5. **Ask for help** - Your teammates are there!

---

Happy coding! 🚀
