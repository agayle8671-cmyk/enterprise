/**
 * Help Center - ALTOS Design
 * 
 * Documentation and support resources
 */

import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { TactileButton } from "@/components/Sovereign";
import { HelpCircle, Book, Video, MessageCircle } from "lucide-react";

export default function HelpCenterSOS() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleResourceClick = (resourceType: string, resourceTitle: string) => {
    switch (resourceType) {
      case 'documentation':
        toast({
          title: "OPENING GUIDE",
          description: "Loading getting started documentation...",
        });
        // Could navigate to docs page
        break;
      case 'video':
        toast({
          title: "LAUNCHING TUTORIALS",
          description: "Opening video tutorial library...",
        });
        window.open('https://www.youtube.com', '_blank');
        break;
      case 'support':
        toast({
          title: "CONTACT SUPPORT",
          description: "Opening support chat...",
        });
        break;
      default:
        toast({
          title: resourceTitle.toUpperCase(),
          description: `Opening ${resourceTitle}...`,
        });
    }
  };

  const resources = [
    { title: "getting started guide", type: "documentation", icon: Book },
    { title: "video tutorials", type: "video", icon: Video },
    { title: "contact support", type: "support", icon: MessageCircle },
  ];

  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <HelpCircle size={48} style={{ color: 'var(--color-sos-soul)', margin: '0 auto 16px' }} />
        <h1 className="text-5xl font-bold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
          help center
        </h1>
        <p className="text-lg lowercase" style={{ color: 'var(--color-sos-muted)' }}>
          everything you need to succeed
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-white/40 text-center cursor-pointer hover:border-[var(--color-sos-blue)] transition-colors"
              style={{
                background: 'var(--color-sos-panel)',
                boxShadow: 'var(--shadow-tactile-md)'
              }}
              onClick={() => handleResourceClick(resource.type, resource.title)}
              data-magnetic="true"
            >
              <Icon size={32} style={{ color: 'var(--color-sos-blue)', margin: '0 auto 16px' }} />
              <h3 className="text-lg font-semibold lowercase mb-2" style={{ color: 'var(--color-sos-text)' }}>
                {resource.title}
              </h3>
              <p className="text-sm lowercase" style={{ color: 'var(--color-sos-muted)' }}>
                {resource.type}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
