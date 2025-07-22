import React, { useState } from "react";
import { Moon, Sun, Mail, User, Phone, Calendar, Users } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  gender: string;
  birthDate?: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  submit?: string;
}

const Signup: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    gender: "",
    birthDate: "",
    phone: "",
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mock AuthContext for demo
  const signup = (): void => console.log("Signup attempted");
  const navigate = (): void => console.log("Navigate to profile");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(form.phone) || form.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!form.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    } else {
      const birth = new Date(form.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      const dayDiff = today.getDate() - birth.getDate();
      const isTooYoung =
        age < 13 ||
        (age === 13 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));

      if (birth > today) {
        newErrors.birthDate = "Birth date cannot be in the future";
      } else if (isTooYoung) {
        newErrors.birthDate = "You must be at least 13 years old";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      signup();
      navigate();
    } catch (error) {
      setErrors({ submit: "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  // Generate avatar from name
  const getNameInitials = (name: string): string => {
    if (!name.trim()) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Generate consistent color from name
  const getAvatarColor = (name: string): string => {
    if (!name) return "bg-purple-500";
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const themeClasses: string = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gradient-to-br from-purple-50 to-pink-100 text-gray-900";

  const cardClasses: string = isDarkMode
    ? "bg-gray-800 border-gray-700 shadow-2xl"
    : "bg-white/80 backdrop-blur-sm border-white/20 shadow-xl";

  const inputClasses: string = isDarkMode
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500";

  return (
   <div className={`min-h-screen flex items-center justify-center px-4 py-8 md:py-16 ${themeClasses}`}>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${
            isDarkMode ? "bg-pink-500" : "bg-pink-300"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 ${
            isDarkMode ? "bg-indigo-500" : "bg-indigo-300"
          }`}
        ></div>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full transition-all duration-300 hover:scale-110 z-50 ${
          isDarkMode
            ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
            : "bg-white hover:bg-gray-50 text-gray-700 shadow-lg"
        }`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div
  className={`w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative z-10 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${cardClasses} max-h-[95vh] flex flex-col`}
>

        {/* Header - Fixed */}
        <div className="text-center p-8 pb-4 flex-shrink-0">
          {/* Avatar */}
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-xl font-bold ${getAvatarColor(
              form.name
            )}`}
          >
            {getNameInitials(form.name) || <User size={24} />}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p
            className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Enter your information to get started
          </p>
        </div>

        {/* Scrollable Form Container */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pb-8 scrollbar-hide">

          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name *
              </label>
              <div className="relative">
                <User
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : ""
                  }`}
                  required
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address *
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : ""
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Phone Number *
              </label>
              <div className="relative">
                <Phone
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : ""
                  }`}
                  required
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Gender Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Gender *
              </label>
              <div className="relative">
                <Users
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 appearance-none cursor-pointer ${inputClasses} ${
                    errors.gender
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : ""
                  }`}
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  {errors.gender}
                </p>
              )}
            </div>

            {/* Birth Date Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Date of Birth *
              </label>
              <div className="relative">
                <Calendar
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <input
                  name="birthDate"
                  type="date"
                  max={new Date().toISOString().split("T")[0]} // Disable future dates
                  value={form.birthDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                    errors.birthDate
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : ""
                  }`}
                  required
                />
              </div>
              {errors.birthDate && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  {errors.birthDate}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Footer */}
            <div className="text-center pt-4">
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
