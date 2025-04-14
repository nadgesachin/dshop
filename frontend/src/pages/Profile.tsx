import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { BsShop } from "react-icons/bs";
import { getUserProfile } from "@/services/signupService";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    profilePhoto: "",
    email: "",
    phone: "Not Provided",
    gender: "Not Provided",
    dob: "",
    location: "Not Provided",
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        let userData = await getUserProfile(token);
        console.log("userData",userData)
        userData = userData?.user;
        if (isMounted) {
          setUser({
            name: userData?.name || "",
            profilePhoto: userData?.profilePhoto || "",
            email: userData?.email || "",
            phone: userData?.phone || "Not Provided",
            gender: userData?.gender || "Not Provided",
            dob: userData?.dob || "",
            location: userData?.location || "Not Provided",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-16 sm:px-8 lg:px-12 xl:px-24">
        <div className="w-[100%] mx-auto px-6 py-4 sm:px-8 sm:py-6 lg:py-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your</h1>
          <div className="text-3xl sm:text-4xl font-bold text-orange-500">
            Profile<span className="text-black"> Overview</span>
          </div>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Here’s what we know about you 👇
          </p>
        </div>
  
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Banner & Avatar */}
          <div className="relative">
            <div className="h-40 sm:h-52 bg-gradient-to-r from-orange-500 via-purple-500 to-yellow-500 flex justify-center items-center">
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center text-white">
                <BsShop className="h-9 w-9 sm:h-10 sm:w-10" />
                <span className="ml-2 text-2xl sm:text-3xl font-bold">SpeakUp</span>
              </div>
            </div>
  
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 sm:-bottom-20">
              <div className="w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 rounded-full bg-gray-200 border-4 border-white overflow-hidden shadow-md">
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-full h-full p-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>
  
          {/* Details Section */}
          <div className="pt-20 sm:pt-24 px-6 sm:px-10 pb-8 sm:pb-12 space-y-5 sm:space-y-6">
            {/* Name */}
            <div className="flex items-center gap-3">
              <User className="text-gray-400 w-6 h-6" />
              <p className="text-gray-700 font-medium text-base sm:text-lg">{user?.name || "N/A"}</p>
            </div>
  
            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="text-gray-400 w-6 h-6" />
              <p className="text-gray-700 font-medium text-base sm:text-lg">{user?.email || "N/A"}</p>
            </div>
  
            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="text-gray-400 w-6 h-6" />
              <p className="text-gray-700 font-medium text-base sm:text-lg">{user?.phone || "N/A"}</p>
              {user?.phone && <CheckCircle2 className="text-green-500 w-5 h-5" />}
            </div>
  
            {/* Gender */}
            {user?.gender && (
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-lg">{user.gender === "male" ? "👨" : "👩"}</span>
                <p className="text-gray-700 font-medium text-base sm:text-lg capitalize">{user.gender}</p>
              </div>
            )}
  
            {/* DOB */}
            {user?.dob && (
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-400 w-6 h-6" />
                <p className="text-gray-700 font-medium text-base sm:text-lg">{user.dob}</p>
              </div>
            )}
  
            {/* Location */}
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-400 w-6 h-6" />
              <p className="text-gray-700 font-medium text-base sm:text-lg">
                {user?.location || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Profile;
