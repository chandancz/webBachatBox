import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit3, Save, X, Camera, User, Mail, Phone, Calendar, Lock, Eye, EyeOff } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Header from "./components/Header";

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

const initialFormData: FormData = {
  name: "John Doe",
  email: "john@example.com",
  password: "",
  confirmPassword: "",
  gender: "Male",
  age: "30",
  phone: "1234567890",
  image: null,
};

const Profile: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Determine if dark mode is active
  const isDarkMode = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const files = (e.target as HTMLInputElement).files;
    
    if (type === "file" && files && files[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (editing && formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if (validateForm()) {
      setEditing(false);
      console.log("Form Data:", formData);
      alert("Profile updated successfully! ✨");
    }
  };

  const handleCancel = (): void => {
    setEditing(false);
    setFormData(initialFormData);
    setImagePreview(null);
    setErrors({});
  };

  const themeClasses = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
    : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900";
    
  const cardClasses = isDarkMode
    ? "bg-gray-800/90 border border-gray-700 shadow-2xl shadow-purple-500/20 backdrop-blur-sm"
    : "bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl shadow-blue-500/10";
    
  const inputClasses = isDarkMode
    ? "bg-gray-700/80 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
    : "bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500";

  return (
    <>
      <Header />
      <div className={`min-h-screen transition-all duration-500 ease-in-out ${themeClasses}`}>
        <div className="flex min-h-screen items-center justify-center p-6 pt-24">
          <div className={`w-full max-w-4xl rounded-2xl p-8 transition-all duration-500 ${cardClasses}`}>
            
            {/* Desktop Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column - Avatar & Basic Info */}
              <div className="lg:col-span-1">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'}`}>
                    Profile Settings
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {editing ? 'Edit your information' : 'Manage your account'}
                  </p>
                </div>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 mb-4 ring-4 ring-offset-4 transition-all duration-300 group-hover:ring-8 ring-blue-500/30 ring-offset-transparent">
                      {imagePreview ? (
                        <AvatarImage src={imagePreview} alt={formData.name} className="object-cover" />
                      ) : (
                        <AvatarFallback className={`text-3xl font-bold ${isDarkMode ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'} text-white`}>
                          {formData.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {editing && (
                      <label className="absolute bottom-2 right-2 p-3 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                        <Camera className="h-5 w-5" />
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {!editing && (
                    <div className="text-center">
                      <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {formData.name}
                      </h3>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formData.email}
                      </p>
                    </div>
                  )}
                </div>

                {!editing && (
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105" 
                    onClick={() => setEditing(true)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* Right Column - Form/Display */}
              <div className="lg:col-span-2">
                {editing ? (
                  /* Edit Mode - Desktop Form Layout */
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'}`}>
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormItem>
                          <FormLabel className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <User className="h-4 w-4" />
                            Name *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              name="name" 
                              value={formData.name} 
                              onChange={handleChange} 
                              className={`transition-all duration-200 ${inputClasses} ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                          </FormControl>
                          {errors.name && <FormMessage className="text-red-500 text-sm mt-1">{errors.name}</FormMessage>}
                        </FormItem>

                        <FormItem>
                          <FormLabel className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <Mail className="h-4 w-4" />
                            Email *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              name="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleChange} 
                              className={`transition-all duration-200 ${inputClasses} ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                          </FormControl>
                          {errors.email && <FormMessage className="text-red-500 text-sm mt-1">{errors.email}</FormMessage>}
                        </FormItem>

                        <FormItem>
                          <FormLabel className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Gender
                          </FormLabel>
                          <FormControl>
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className={`w-full p-3 rounded-lg transition-all duration-200 ${inputClasses}`}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormLabel className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <Calendar className="h-4 w-4" />
                            Age *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              name="age" 
                              type="number" 
                              value={formData.age} 
                              onChange={handleChange} 
                              min="1"
                              max="120"
                              className={`transition-all duration-200 ${inputClasses} ${errors.age ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                          </FormControl>
                          {errors.age && <FormMessage className="text-red-500 text-sm mt-1">{errors.age}</FormMessage>}
                        </FormItem>

                        <FormItem className="md:col-span-2">
                          <FormLabel className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <Phone className="h-4 w-4" />
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              name="phone" 
                              type="tel" 
                              value={formData.phone} 
                              onChange={handleChange} 
                              placeholder="1234567890"
                              className={`transition-all duration-200 ${inputClasses} ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                          </FormControl>
                          {errors.phone && <FormMessage className="text-red-500 text-sm mt-1">{errors.phone}</FormMessage>}
                        </FormItem>
                      </div>
                    </div>

                    {/* Security */}
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'}`}>
                        Security (Optional)
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormItem>
                          <FormLabel className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <Lock className="h-4 w-4" />
                            New Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                name="password" 
                                type={showPassword ? "text" : "password"}
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder="Leave blank to keep current"
                                className={`pr-10 transition-all duration-200 ${inputClasses} ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          {errors.password && <FormMessage className="text-red-500 text-sm mt-1">{errors.password}</FormMessage>}
                        </FormItem>

                        <FormItem>
                          <FormLabel className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <Lock className="h-4 w-4" />
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                name="confirmPassword" 
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                placeholder="Confirm new password"
                                className={`pr-10 transition-all duration-200 ${inputClasses} ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          {errors.confirmPassword && <FormMessage className="text-red-500 text-sm mt-1">{errors.confirmPassword}</FormMessage>}
                        </FormItem>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6">
                      <Button 
                        onClick={handleSubmit} 
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        className={`px-6 transition-all duration-200 hover:scale-105 ${
                          isDarkMode 
                            ? "border-gray-600 hover:bg-gray-700 text-gray-300" 
                            : "border-gray-300 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div className="space-y-6">
                    <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Profile Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <Mail className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</span>
                        </div>
                        <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formData.email}</div>
                      </div>

                      <div className={`p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <Phone className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</span>
                        </div>
                        <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formData.phone}</div>
                      </div>

                      <div className={`p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <User className={`h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gender</span>
                        </div>
                        <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formData.gender}</div>
                      </div>

                      <div className={`p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Age</span>
                        </div>
                        <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formData.age} years old</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;