import React, { useState } from "react";
import { 
  Eye, 
  EyeOff, 
  Moon, 
  Sun, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Calendar, 
  Users, 
  Camera,
  Upload,
  Check,
  X
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: string;
  phone: string;
  image: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  age?: string;
  phone?: string;
  image?: string;
  submit?: string;
}

interface PasswordStrength {
  score: number;
  feedback: string;
  color: string;
}

const Signup: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    phone: "",
    image: null,
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Mock AuthContext for demo
  const signup = (): void => console.log("Signup attempted");
  const navigate = (): void => console.log("Navigate to profile");

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const strength = {
      0: { feedback: "Very Weak", color: "bg-red-500" },
      1: { feedback: "Weak", color: "bg-red-400" },
      2: { feedback: "Fair", color: "bg-yellow-500" },
      3: { feedback: "Good", color: "bg-blue-500" },
      4: { feedback: "Strong", color: "bg-green-500" },
      5: { feedback: "Very Strong", color: "bg-green-600" },
    };

    return { score, ...strength[score as keyof typeof strength] };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const files = (e.target as HTMLInputElement).files;
    
    if (type === "file" && files && files[0]) {
      const file = files[0];
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "File size must be less than 5MB" }));
        return;
      }
      
      setForm(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: "" }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
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
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!form.gender) {
      newErrors.gender = "Please select your gender";
    }
    
    if (!form.age) {
      newErrors.age = "Age is required";
    } else if (parseInt(form.age) < 13 || parseInt(form.age) > 120) {
      newErrors.age = "Age must be between 13 and 120";
    }
    
    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(form.phone) || form.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>): Promise<void> => {
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
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
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

  const nextStep = (): void => {
    if (currentStep === 1) {
      // Validate first step
      const stepErrors: FormErrors = {};
      if (!form.name.trim()) stepErrors.name = "Name is required";
      if (!form.email) stepErrors.email = "Email is required";
      if (!form.password) stepErrors.password = "Password is required";
      if (!form.confirmPassword) stepErrors.confirmPassword = "Please confirm password";
      
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = (): void => {
    setCurrentStep(currentStep - 1);
  };

  const removeImage = (): void => {
    setForm(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    setErrors(prev => ({ ...prev, image: "" }));
  };

  const passwordStrength = calculatePasswordStrength(form.password);

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
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${themeClasses}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-300'}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${isDarkMode ? 'bg-pink-500' : 'bg-pink-300'}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'}`}></div>
      </div>
      
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full transition-all duration-300 hover:scale-110 z-50 ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
            : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg'
        }`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className={`w-full max-w-lg relative z-10 rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02] ${cardClasses}`}>
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep >= 1 ? 'bg-purple-500 text-white' : isDarkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > 1 ? <Check size={16} /> : '1'}
            </div>
            <div className={`w-16 h-1 rounded ${
              currentStep >= 2 ? 'bg-purple-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep >= 2 ? 'bg-purple-500 text-white' : isDarkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
          }`}>
            <User className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {currentStep === 1 ? 'Enter your basic information' : 'Complete your profile'}
          </p>
        </div>

        <div onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* Name Field */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name *
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                      errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
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
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
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

              {/* Password Field */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password *
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                      errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {passwordStrength.feedback}
                      </span>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                      errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
              >
                Continue
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Gender Field */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Gender *
                </label>
                <div className="relative">
                  <Users className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 appearance-none cursor-pointer ${inputClasses} ${
                      errors.gender ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
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

              {/* Age Field */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Age *
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                  <input
                    name="age"
                    type="number"
                    min="13"
                    max="120"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                      errors.age ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                    }`}
                    required
                  />
                </div>
                {errors.age && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${inputClasses} ${
                      errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
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

              {/* Profile Image Field */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Profile Image (Optional)
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                  isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                }`}>
                  {imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Click the X to remove image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <Camera className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={24} />
                      </div>
                      <div>
                        <label className="cursor-pointer">
                          <span className={`inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium`}>
                            <Upload size={16} className="mr-2" />
                            Choose Image
                          </span>
                          <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3">
                  {errors.submit}
                </p>
              )}

              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 border ${
                    isDarkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Back
                </button>
                <button
                  type="button"
                  // onClick={handleSubmit}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-opacity-50 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-purple-500 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
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
  );
};

export default Signup;