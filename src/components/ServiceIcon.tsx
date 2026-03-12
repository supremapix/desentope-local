import {
  Bath, ShowerHead, Home, Building2, Utensils, Waves, Camera, Truck,
  CircleDot, Factory, AlertTriangle, Wrench, Store, Droplet, HardHat,
  Cog, GlassWater, Flame, Search, type LucideIcon,
  Shield, DollarSign, Scale, Leaf, Cpu, HelpCircle, MapPin, ClipboardList
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  // Serviços de desentupimento
  bath: Bath,
  'shower-head': ShowerHead,
  home: Home,
  'building-2': Building2,
  utensils: Utensils,
  waves: Waves,
  camera: Camera,
  truck: Truck,
  'circle-dot': CircleDot,
  factory: Factory,
  'alert-triangle': AlertTriangle,
  // Serviços de encanamento
  wrench: Wrench,
  store: Store,
  droplet: Droplet,
  'hard-hat': HardHat,
  cog: Cog,
  'glass-water': GlassWater,
  'shower-head-2': ShowerHead,
  flame: Flame,
  search: Search,
  // FAQ categorias
  shield: Shield,
  'dollar-sign': DollarSign,
  scale: Scale,
  leaf: Leaf,
  cpu: Cpu,
  'help-circle': HelpCircle,
  'map-pin': MapPin,
  'clipboard-list': ClipboardList,
};

interface ServiceIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function ServiceIcon({ name, className = 'h-5 w-5', size }: ServiceIconProps) {
  const Icon = iconMap[name] || Wr  ench;
  return <Icon className={className} size={size} />;
}

export default ServiceIcon;
