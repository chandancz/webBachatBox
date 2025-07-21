import React, { useState } from "react";
import { Moon, Sun, Shield, Info, Mail, ChevronRight } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 w-full p-4 rounded-xl transition-all duration-300 hover:scale-105 group ${
        isActive 
          ? darkMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
          : darkMode 
            ? 'hover:bg-gray-700/50 text-gray-300' 
            : 'hover:bg-gray-50 text-gray-700'
      }`}
    >
      <div className={`p-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-white/20 text-white' 
          : darkMode 
            ? 'bg-gray-700 text-gray-400 group-hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
      } group-hover:scale-110`}>
        <Icon size={20} />
      </div>
      <span className="font-medium flex-1 text-left">
        {label}
      </span>
      <ChevronRight size={16} className={`transition-transform duration-300 ${
        isActive ? 'rotate-90' : 'group-hover:translate-x-1'
      }`} />
    </button>
  );

  const SettingsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-semibold transition-colors ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Theme Preferences
          </h3>
          <p className={`text-sm mt-1 transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Switch between light and dark modes
          </p>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode 
              ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
              : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );

  const PrivacyContent = () => (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold transition-colors ${
        darkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Privacy Policy
      </h3>
      <div className={`prose transition-colors ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        <p className="mb-4">
          We are committed to protecting your privacy and ensuring the security of your personal information.
        </p>
        <h4 className={`font-semibold mt-4 mb-2 ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Information We Collect
        </h4>
        <p className="mb-3">
          We collect only the information necessary to provide our services, including account details and usage preferences.
        </p>
        <h4 className={`font-semibold mt-4 mb-2 ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          How We Use Your Data
        </h4>
        <p className="mb-3">
          Your data is used solely to improve your experience and is never shared with third parties without your consent.
        </p>
        <h4 className={`font-semibold mt-4 mb-2 ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Data Security
        </h4>
        <p>
          We implement industry-standard security measures to protect your information from unauthorized access.
        </p>
      </div>
    </div>
  );

  const AboutContent = () => (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold transition-colors ${
        darkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        About Us
      </h3>
      <div className={`transition-colors ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        <p className="mb-4">
          We're passionate about creating intuitive, user-friendly applications that make your digital life easier.
        </p>
        <h4 className={`font-semibold mt-4 mb-2 ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Our Mission
        </h4>
        <p className="mb-3">
          To deliver exceptional digital experiences that prioritize user needs and satisfaction.
        </p>
        <h4 className={`font-semibold mt-4 mb-2 ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Our Values
        </h4>
        <ul className="list-disc list-inside space-y-1">
          <li>User-centric design</li>
          <li>Privacy and security first</li>
          <li>Continuous improvement</li>
          <li>Accessibility for all</li>
        </ul>
        <div className={`mt-6 p-4 rounded-lg ${
          darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
        }`}>
          <p className="text-sm font-medium">Version 2.1.0</p>
          <p className={`text-xs mt-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );

  const ContactContent = () => (
    <div className="space-y-4">
      <h3 className={`text-xl font-semibold transition-colors ${
        darkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Contact Us
      </h3>
      <div className={`transition-colors ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        <p className="mb-6">
          We'd love to hear from you. Get in touch with our team for support, feedback, or questions.
        </p>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
            darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Email Support
            </h4>
            <p className="text-sm mb-2">For general inquiries and support</p>
            <a href="mailto:support@company.com" className="text-blue-500 hover:text-blue-600 font-medium">
              support@company.com
            </a>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
            darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Business Inquiries
            </h4>
            <p className="text-sm mb-2">For partnerships and business matters</p>
            <a href="mailto:business@company.com" className="text-blue-500 hover:text-blue-600 font-medium">
              business@company.com
            </a>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
            darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Response Time
            </h4>
            <p className="text-sm">We typically respond within 24-48 hours during business days.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'privacy':
        return <PrivacyContent />;
      case 'about':
        return <AboutContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return <SettingsContent />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className={`w-full max-w-6xl transform transition-all duration-500 hover:scale-[1.02] ${
          darkMode 
            ? 'bg-gray-800/80 backdrop-blur-xl border border-gray-700' 
            : 'bg-white/80 backdrop-blur-xl border border-white/20'
        } rounded-2xl shadow-2xl overflow-hidden`}>
          
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Sidebar */}
            <div className={`lg:w-80 p-6 border-b lg:border-b-0 lg:border-r transition-colors ${
              darkMode ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Settings
                </h2>
                <p className={`mt-1 text-sm transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Manage your preferences
                </p>
              </div>

              <nav className="space-y-2">
                <TabButton
                  id="settings"
                  label="General"
                  icon={Sun}
                  isActive={activeTab === 'settings'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="privacy"
                  label="Privacy Policy"
                  icon={Shield}
                  isActive={activeTab === 'privacy'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="about"
                  label="About Us"
                  icon={Info}
                  isActive={activeTab === 'about'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="contact"
                  label="Contact Us"
                  icon={Mail}
                  isActive={activeTab === 'contact'}
                  onClick={setActiveTab}
                />
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 lg:p-8">
              <div className="max-w-3xl">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-10 animate-pulse ${
              darkMode ? 'bg-purple-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Settings;