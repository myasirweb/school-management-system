import { Clock } from "lucide-react";
import React from "react";

const UserNameCard = () => {
  return (
    <div className="bg-[#45C6EE] rounded-2xl p-6 md:p-8 text-white mb-2 mt-2 relative overflow-hidden shadow-lg">

      {/* Text Content */}
      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome Back, Mr. Yasir
        </h1>

        <p className="text-white/80 text-sm">
          Have a Good day at work
        </p>

        <div className="mt-4 text-[10px] text-white flex items-center">
          <Clock size={12} className="mr-1" /> Updated Recently on 15 Jun 2024
        </div>
      </div>

      {/* Premium Blur Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#64C4B2] rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="absolute bottom-0 left-20 w-32 h-32 bg-[#45C6EE] rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>

    </div>
  );
};

export default UserNameCard;
