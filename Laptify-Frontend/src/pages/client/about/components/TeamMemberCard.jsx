import React from "react";
// import { Twitter, Instagram, Linkedin } from "lucide-react";

const TeamMemberCard = ({ member }) => {
  return (
    <div className="group">
      {/* Image Container with Hover Effects */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 w-[370px] h-[470px] mb-6 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
          {member.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-gray-600">
          {member.role}
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
          {/* Twitter */}
          {/* <a
            href={member.socialLinks.twitter}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a> */}

          {/* Instagram */}
          {/* <a
            href={member.socialLinks.instagram}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a> */}

          {/* LinkedIn */}
          {/* <a
            href={member.socialLinks.linkedin}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
