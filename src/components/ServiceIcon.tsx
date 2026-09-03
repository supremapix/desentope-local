import {
  Bath, ShowerHead, Home, Building2, Utensils, Waves, Camera, Truck,
  CircleDot, Factory, AlertTriangle, Wrench, Store, Droplet, HardHat,
  Cog, GlassWater, Flame, Search, Bike, Package, type LucideIcon,
  Shield, DollarSign, Scale, Leaf, Cpu, HelpCircle, MapPin, ClipboardList,
  Shirt, Wind, Sparkles, WashingMachine, BedDouble, Sofa, Briefcase, Scissors,
  Snowflake, Refrigerator, ThermometerSnowflake, AirVent, Wine, Warehouse, Boxes
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
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
  wrench: Wrench,
  store: Store,
  droplet: Droplet,
  'hard-hat': HardHat,
  cog: Cog,
  'glass-water': GlassWater,
  flame: Flame,
  search: Search,
  bike: Bike,
  package: Package,
  shield: Shield,
  'dollar-sign': DollarSign,
  scale: Scale,
  leaf: Leaf,
  cpu: Cpu,
  'help-circle': HelpCircle,
  'map-pin': MapPin,
  'clipboard-list': ClipboardList,
  shirt: Shirt,
  wind: Wind,
  sparkles: Sparkles,
  'washing-machine': WashingMachine,
  'bed-double': BedDouble,
  sofa: Sofa,
  briefcase: Briefcase,
  scissors: Scissors,
  snowflake: Snowflake,
  refrigerator: Refrigerator,
  'thermometer-snowflake': ThermometerSnowflake,
  'air-vent': AirVent,
  wine: Wine,
  warehouse: Warehouse,
  boxes: Boxes,
};

interface ServiceIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function ServiceIcon({ name, className = 'h-5 w-5', size }: ServiceIconProps) {
  const Icon = iconMap[name] || Wrench;
  return <Icon className={className} size={size} />;
}

export default ServiceIcon;
