import { Users, MessageCircle, Lightbulb, Target, Zap, Clock, Brain, Palette, Heart, Shield } from "lucide-react";
export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  proficiency: number;
  category: string;
}

export const skills: Skill[] = [
  {
    id: "communication",
    name: "Communication",
    description: "Clear and effective verbal and written communication across diverse teams and stakeholders",
    icon: MessageCircle,
    proficiency: 95,
    category: "Interpersonal",
  },
  {
    id: "leadership",
    name: "Leadership",
    description: "Leading cross-functional teams and mentoring junior developers to achieve project goals",
    icon: Users,
    proficiency: 88,
    category: "Management",
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Analytical thinking and creative solutions to complex technical and business challenges",
    icon: Lightbulb,
    proficiency: 92,
    category: "Analytical",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    description: "Quick learning and flexibility when working with new technologies and changing requirements",
    icon: Zap,
    proficiency: 90,
    category: "Personal",
  },
  {
    id: "time-management",
    name: "Time Management",
    description: "Efficient prioritization and delivery of projects within tight deadlines and constraints",
    icon: Clock,
    proficiency: 87,
    category: "Organizational",
  },
  {
    id: "critical-thinking",
    name: "Critical Thinking",
    description: "Systematic evaluation of information and evidence-based decision making processes",
    icon: Brain,
    proficiency: 89,
    category: "Analytical",
  },
  {
    id: "creativity",
    name: "Creativity",
    description: "Innovative approach to user experience design and novel solutions to technical problems",
    icon: Palette,
    proficiency: 85,
    category: "Creative",
  },
  {
    id: "emotional-intelligence",
    name: "Emotional Intelligence",
    description: "Understanding team dynamics and building positive working relationships",
    icon: Heart,
    proficiency: 91,
    category: "Interpersonal",
  },
  {
    id: "attention-to-detail",
    name: "Attention to Detail",
    description: "Meticulous code review practices and quality assurance in all deliverables",
    icon: Target,
    proficiency: 94,
    category: "Quality",
  },
  {
    id: "conflict-resolution",
    name: "Conflict Resolution",
    description: "Diplomatic mediation and collaborative problem-solving in challenging situations",
    icon: Shield,
    proficiency: 86,
    category: "Management",
  },
];
