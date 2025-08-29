import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Sections/HomepageSections/Footer";
import Navbar from "../Sections/HomepageSections/Navbar";
import WeeklyAnnouncement from "./WeeklyAnnouncement";
import "./Resources.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StatusMessage = ({ submitStatus }) => {
  if (!submitStatus.message) return null;
  return (
    <div className={`status-message ${submitStatus.success ? "success" : "error"}`}>
      {submitStatus.message}
    </div>
  );
};

// Helper function to extract readable error messages from Pydantic validation errors
const extractErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  
  // Handle Pydantic validation errors
  if (error.response?.data?.detail) {
    const detail = error.response.data.detail;
    
    // If detail is an array of validation errors (Pydantic format)
    if (Array.isArray(detail)) {
      return detail.map(err => {
        const field = err.loc ? err.loc.join('.') : 'field';
        return `${field}: ${err.msg}`;
      }).join('; ');
    }
    
    // If detail is a string
    if (typeof detail === 'string') {
      return detail;
    }
    
    // If detail is an object, try to get the message
    if (typeof detail === 'object' && detail.msg) {
      return detail.msg;
    }
  }
  
  // Fallback to generic error message
  return error.message || "An error occurred. Please try again.";
};

// Reusable Form Component
const ResourceForm = ({ fields, activeTab, endpoint, loading, handleSubmit, formData, handleChange, submitStatus }) => (
  <div className="form-section">
    {activeTab === "announcements" && <WeeklyAnnouncement />}
    <h3>
      {activeTab === "announcements" && "Inform us about your Announcement"}
      {activeTab === "prayer" && "Prayer Request"}
      {activeTab === "counselling" && "Request Counselling"}
      {activeTab === "dob" && "Submit your Date of Birth(Members Only)"}
    </h3>

    <form onSubmit={(e) => handleSubmit(e, endpoint)}>
      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label className="form-label">{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              rows={field.rows || 4}
              placeholder={field.placeholder || ""}
              className="form-textarea"
            ></textarea>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder || ""}
              className="form-input"
            />
          )}
        </div>
      ))}

      <button type="submit" disabled={loading} className="submit-button">
        {loading
          ? "Submitting..."
          : activeTab === "announcements"
          ? "Submit Announcement"
          : activeTab === "prayer"
          ? "Submit Prayer Request"
          : activeTab === "counselling"
          ? "Request Counselling"
          : "Update Details"}
      </button>
      <StatusMessage submitStatus={submitStatus} />
    </form>
  </div>
);

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [formData, setFormData] = useState({
    name: "",
    email_phone: "",
    dob: "",
    prayer_request: "",
    annoucement: "",
    counsel_description: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ success: false, message: "" });

    // Payloads mapped per tab
    const payloads = {
      announcements: {
        name: formData.name,
        email_phone: formData.email_phone,
        annoucement: formData.annoucement
      },
      prayer: {
        name: formData.name,
        email_phone: formData.email_phone,
        prayer_request: formData.prayer_request
      },
      counselling: {
        name: formData.name,
        email_phone: formData.email_phone,
        counsel_description: formData.counsel_description
      },
      dob: {
        name: formData.name,
        email_phone: formData.email_phone,
        dob: formData.dob
      }
    };

    try {
      const response = await axios.post(endpoint, payloads[activeTab], {
        headers: { "Content-Type": "application/json" }
      });

      setSubmitStatus({
        success: true,
        message: response.data.message || "Submission successful!"
      });

      // Reset form
      setFormData({
        name: "",
        email_phone: "",
        dob: "",
        prayer_request: "",
        annoucement: "",
        counsel_description: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
      
      // Use the helper function to extract readable error message
      const errorMessage = extractErrorMessage(error);
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(() => {
        setSubmitStatus({ success: false, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.message]);

  // Tab configurations
  const tabConfig = {
    announcements: {
      endpoint: `${API_BASE_URL}/public/submit_annoucement`,
      fields: [
        { name: "name", label: "Your Name", type: "text", placeholder: "Enter Full Name", required: true },
        {
          name: "email_phone",
          label: "Email or Phone",
          type: "text",
          required: true,
          placeholder: "e.g., john@example.com or +2348012345678"
        },
        { name: "annoucement", label: "Announcement", type: "textarea", placeholder: "Enter Announcement", required: true, rows: 4 }
      ]
    },
    prayer: {
      endpoint: `${API_BASE_URL}/public/prayer_request`,
      fields: [
        { name: "name", label: "Your Name", type: "text", placeholder:"Enter Full Name", required: true },
        {
          name: "email_phone",
          label: "Email or Phone",
          type: "text",
          required: false,
          placeholder: "e.g., john@example.com or +2348012345678"
        },
        { name: "prayer_request", label: "Prayer Request", placeholder:"Enter Prayer Request", type: "textarea", required: true, rows: 6 }
      ]
    },
    counselling: {
      endpoint: `${API_BASE_URL}/public/counselling`,
      fields: [
        { name: "name", label: "Your Name", placeholder:"Enter Full Name", type: "text", required: true },
        {
          name: "email_phone",
          label: "Email or Phone",
          type: "text",
          required: true,
          placeholder: "e.g., john@example.com or +2348012345678"
        },
        {
          name: "counsel_description",
          label: "Brief Description",
          type: "textarea",
          required: true,
          rows: 6,
          placeholder: "Please briefly describe what you'd like to discuss"
        }
      ]
    },
    dob: {
      endpoint: `${API_BASE_URL}/public/date_of_birth`,
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder:"Enter Full Name", required: true },
        {
          name: "email_phone",
          label: "Email or Phone",
          type: "text",
          required: true,
          placeholder: "e.g., john@example.com or +2348012345678"
        },
        { name: "dob", label: "Date of Birth", type: "date", required: true }
      ]
    }
  };

  return (
    <>
      <Navbar />
      <div className="resources-page">
        <h1>Church Resources</h1>

        {/* Navigation Tabs */}
        <div className="nav-tabs">
          {Object.keys(tabConfig).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`nav-tab ${activeTab === tab ? "active" : ""}`}
            >
              {tab === "announcements"
                ? "Announcements"
                : tab === "prayer"
                ? "Prayer Requests"
                : tab === "counselling"
                ? "Counselling"
                : "DOB"}
            </button>
          ))}
        </div>

        {/* Render Form Dynamically */}
        <ResourceForm
          fields={tabConfig[activeTab].fields}
          activeTab={activeTab}
          endpoint={tabConfig[activeTab].endpoint}
          loading={loading}
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          submitStatus={submitStatus}
        />
      </div>
      <Footer />
    </>
  );
};

export default ResourcesPage;