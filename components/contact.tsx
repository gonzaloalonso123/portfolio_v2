"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPortal() {
  const contactInfo = {
    email: "gonalonso.gar@gmail.com",
    phone: "+34620684555",
    linkedin: "www.linkedin.com/in/galonsog/",
    github: "github.com/gonzaloalonso123",
    cv: "/gonzalo.pdf",
  };

  return (
    <div className="max-w-md w-full mx-auto p-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-50 rounded-3xl blur-xl"></div>
        <div className="relative bg-black/80 backdrop-blur-md rounded-3xl p-8 border border-blue-500/30">
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Establish Contact
          </h2>

          <div className="space-y-6">
            <ContactItem
              icon={<Mail className="h-6 w-6" />}
              label="Email"
              value={contactInfo.email}
              href={`mailto:${contactInfo.email}`}
            />
            <ContactItem
              icon={<Phone className="h-6 w-6" />}
              label="Phone"
              value={contactInfo.phone}
              href={`tel:${contactInfo.phone}`}
            />
            <ContactItem
              icon={<Linkedin className="h-6 w-6" />}
              label="LinkedIn"
              value="Gonzalo Alonso"
              href={`https://${contactInfo.linkedin}`}
              isExternal
            />
            <ContactItem
              icon={<Github className="h-6 w-6" />}
              label="GitHub"
              value="gonzaloalonso123"
              href={`https://${contactInfo.github}`}
              isExternal
            />
          </div>
          <div className="mt-10">
            <Button
              className="w-full py-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-[0_0_15px_rgba(0,200,255,0.3)]"
              asChild
            >
              <a href={contactInfo.cv} download="Gonzalo_Alonso_CV.pdf">
                <FileText className="mr-2 h-5 w-5" /> Download CV
              </a>
            </Button>
          </div>
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-500/30 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-500/30 rounded-br-3xl"></div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value, href, isExternal = false }) {
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : ""}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center p-4 bg-black/40 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mr-4 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-blue-400">{label}</div>
        <div className="text-white font-medium">{value}</div>
      </div>
      {isExternal && <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />}
    </motion.a>
  );
}
