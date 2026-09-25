// One-off: convert the INBEST premium themes into kit palette entries.
const themes = [
  { id: 'midnight-navy', name: 'Midnight Navy', category: 'Corporate', c: { primary: '#14213D', secondary: '#1F4068', accent: '#D4AF37', background: '#F5F7FA', surface: '#FFFFFF', text: '#14213D', textSecondary: '#64748B', sidebar: '#14213D', sidebarText: '#E2E8F0', sidebarActive: '#1F4068', buttonText: '#FFFFFF', focusRing: '#D4AF37' } },
  { id: 'royal-indigo', name: 'Royal Indigo', category: 'SaaS', c: { primary: '#3730A3', secondary: '#6366F1', accent: '#A5B4FC', background: '#F5F5FF', surface: '#FFFFFF', text: '#1E1B4B', textSecondary: '#6366A1', sidebar: '#312E81', sidebarText: '#E0E7FF', sidebarActive: '#4F46E5', buttonText: '#FFFFFF', focusRing: '#6366F1' } },
  { id: 'emerald-luxury', name: 'Emerald Luxury', category: 'Premium', c: { primary: '#064E3B', secondary: '#047857', accent: '#D4AF37', background: '#F0FDF4', surface: '#FFFFFF', text: '#064E3B', textSecondary: '#527568', sidebar: '#064E3B', sidebarText: '#D1FAE5', sidebarActive: '#047857', buttonText: '#FFFFFF', focusRing: '#D4AF37' } },
  { id: 'charcoal-gold', name: 'Charcoal Gold', category: 'Luxury', c: { primary: '#202124', secondary: '#424242', accent: '#C9A227', background: '#F8F6F0', surface: '#FFFFFF', text: '#202124', textSecondary: '#686868', sidebar: '#202124', sidebarText: '#E5E5E5', sidebarActive: '#424242', buttonText: '#FFFFFF', focusRing: '#C9A227' } },
  { id: 'ocean-blue', name: 'Ocean Blue', category: 'Corporate', c: { primary: '#0C4A6E', secondary: '#0369A1', accent: '#38BDF8', background: '#F0F9FF', surface: '#FFFFFF', text: '#0C4A6E', textSecondary: '#52758B', sidebar: '#0C4A6E', sidebarText: '#E0F2FE', sidebarActive: '#0369A1', buttonText: '#FFFFFF', focusRing: '#0284C7' } },
  { id: 'slate-professional', name: 'Slate Professional', category: 'Enterprise', c: { primary: '#334155', secondary: '#64748B', accent: '#0EA5E9', background: '#F8FAFC', surface: '#FFFFFF', text: '#0F172A', textSecondary: '#64748B', sidebar: '#1E293B', sidebarText: '#E2E8F0', sidebarActive: '#334155', buttonText: '#FFFFFF', focusRing: '#0EA5E9' } },
  { id: 'royal-purple', name: 'Royal Purple', category: 'Premium', c: { primary: '#581C87', secondary: '#7E22CE', accent: '#C084FC', background: '#FAF5FF', surface: '#FFFFFF', text: '#3B0764', textSecondary: '#7E6597', sidebar: '#3B0764', sidebarText: '#F3E8FF', sidebarActive: '#6B21A8', buttonText: '#FFFFFF', focusRing: '#A855F7' } },
  { id: 'forest-luxury', name: 'Forest Luxury', category: 'Premium', c: { primary: '#1B4332', secondary: '#2D6A4F', accent: '#B7C9A8', background: '#F1F5EF', surface: '#FFFFFF', text: '#1B4332', textSecondary: '#607568', sidebar: '#1B4332', sidebarText: '#D8E8D8', sidebarActive: '#2D6A4F', buttonText: '#FFFFFF', focusRing: '#74A892' } },
  { id: 'burgundy-elegance', name: 'Burgundy Elegance', category: 'Luxury', c: { primary: '#6B0F1A', secondary: '#9B2226', accent: '#D4A373', background: '#FFF8F0', surface: '#FFFFFF', text: '#4A0B12', textSecondary: '#8A6262', sidebar: '#4A0B12', sidebarText: '#FCE7E7', sidebarActive: '#7F1D1D', buttonText: '#FFFFFF', focusRing: '#D4A373' } },
  { id: 'champagne-beige', name: 'Champagne Beige', category: 'Minimal', c: { primary: '#8C6A43', secondary: '#B89B72', accent: '#D6B98C', background: '#FAF7F0', surface: '#FFFFFF', text: '#443322', textSecondary: '#82715D', sidebar: '#443322', sidebarText: '#F5EBDD', sidebarActive: '#725638', buttonText: '#FFFFFF', focusRing: '#B89B72' } },
  { id: 'monochrome-modern', name: 'Monochrome Modern', category: 'Minimal', c: { primary: '#18181B', secondary: '#52525B', accent: '#A1A1AA', background: '#FAFAFA', surface: '#FFFFFF', text: '#18181B', textSecondary: '#71717A', sidebar: '#18181B', sidebarText: '#E4E4E7', sidebarActive: '#3F3F46', buttonText: '#FFFFFF', focusRing: '#71717A' } },
  { id: 'corporate-teal', name: 'Corporate Teal', category: 'Corporate', c: { primary: '#134E4A', secondary: '#0F766E', accent: '#5EEAD4', background: '#F0FDFA', surface: '#FFFFFF', text: '#134E4A', textSecondary: '#527C78', sidebar: '#134E4A', sidebarText: '#CCFBF1', sidebarActive: '#0F766E', buttonText: '#FFFFFF', focusRing: '#14B8A6' } },
  { id: 'steel-blue', name: 'Steel Blue', category: 'Enterprise', c: { primary: '#1E3A5F', secondary: '#456990', accent: '#9BC1BC', background: '#F4F7FA', surface: '#FFFFFF', text: '#1E3A5F', textSecondary: '#62768A', sidebar: '#1E3A5F', sidebarText: '#E2EAF2', sidebarActive: '#456990', buttonText: '#FFFFFF', focusRing: '#5B9BD5' } },
  { id: 'sapphire-gold', name: 'Sapphire Gold', category: 'Luxury', c: { primary: '#082F49', secondary: '#075985', accent: '#EAB308', background: '#F8FAFC', surface: '#FFFFFF', text: '#082F49', textSecondary: '#557185', sidebar: '#082F49', sidebarText: '#E0F2FE', sidebarActive: '#075985', buttonText: '#FFFFFF', focusRing: '#EAB308' } },
  { id: 'soft-lavender', name: 'Soft Lavender', category: 'Modern', c: { primary: '#5B4B8A', secondary: '#8B7BB5', accent: '#C4B5FD', background: '#F8F7FC', surface: '#FFFFFF', text: '#30264D', textSecondary: '#7B7195', sidebar: '#30264D', sidebarText: '#EDE9FE', sidebarActive: '#5B4B8A', buttonText: '#FFFFFF', focusRing: '#8B5CF6' } },
  { id: 'sage-minimal', name: 'Sage Minimal', category: 'Minimal', c: { primary: '#475569', secondary: '#71816D', accent: '#A3B18A', background: '#F6F7F2', surface: '#FFFFFF', text: '#29352B', textSecondary: '#6B756A', sidebar: '#29352B', sidebarText: '#E8EEE5', sidebarActive: '#475569', buttonText: '#FFFFFF', focusRing: '#71816D' } },
  { id: 'copper-luxury', name: 'Copper Luxury', category: 'Luxury', c: { primary: '#713F12', secondary: '#A16207', accent: '#D97736', background: '#FFFBEB', surface: '#FFFFFF', text: '#422006', textSecondary: '#876B4D', sidebar: '#422006', sidebarText: '#FEF3C7', sidebarActive: '#713F12', buttonText: '#FFFFFF', focusRing: '#D97736' } },
  { id: 'deep-ocean', name: 'Deep Ocean', category: 'Corporate', c: { primary: '#0F172A', secondary: '#164E63', accent: '#06B6D4', background: '#ECFEFF', surface: '#FFFFFF', text: '#0F172A', textSecondary: '#526B7A', sidebar: '#0F172A', sidebarText: '#CFFAFE', sidebarActive: '#164E63', buttonText: '#FFFFFF', focusRing: '#06B6D4' } },
  { id: 'rose-gold', name: 'Rose Gold', category: 'Luxury', c: { primary: '#881337', secondary: '#BE6478', accent: '#D4A5A5', background: '#FFF1F2', surface: '#FFFFFF', text: '#4C0519', textSecondary: '#8B6470', sidebar: '#4C0519', sidebarText: '#FFE4E6', sidebarActive: '#881337', buttonText: '#FFFFFF', focusRing: '#BE6478' } },
  { id: 'warm-taupe', name: 'Warm Taupe', category: 'Minimal', c: { primary: '#57534E', secondary: '#78716C', accent: '#C4A484', background: '#FAF8F5', surface: '#FFFFFF', text: '#292524', textSecondary: '#78716C', sidebar: '#292524', sidebarText: '#E7E5E4', sidebarActive: '#57534E', buttonText: '#FFFFFF', focusRing: '#C4A484' } },
  { id: 'electric-blue', name: 'Electric Blue', category: 'SaaS', c: { primary: '#1D4ED8', secondary: '#2563EB', accent: '#60A5FA', background: '#EFF6FF', surface: '#FFFFFF', text: '#172554', textSecondary: '#64748B', sidebar: '#172554', sidebarText: '#DBEAFE', sidebarActive: '#1D4ED8', buttonText: '#FFFFFF', focusRing: '#60A5FA' } },
  { id: 'midnight-plum', name: 'Midnight Plum', category: 'Premium', c: { primary: '#2E1065', secondary: '#581C87', accent: '#C084FC', background: '#FAF5FF', surface: '#FFFFFF', text: '#2E1065', textSecondary: '#7E6597', sidebar: '#2E1065', sidebarText: '#F3E8FF', sidebarActive: '#581C87', buttonText: '#FFFFFF', focusRing: '#C084FC' } },
  { id: 'olive-gold', name: 'Olive Gold', category: 'Luxury', c: { primary: '#3F4B27', secondary: '#687442', accent: '#C5A253', background: '#F7F6ED', surface: '#FFFFFF', text: '#30391F', textSecondary: '#747A5D', sidebar: '#30391F', sidebarText: '#E9EBD8', sidebarActive: '#3F4B27', buttonText: '#FFFFFF', focusRing: '#C5A253' } },
  { id: 'arctic-blue', name: 'Arctic Blue', category: 'Modern', c: { primary: '#164E63', secondary: '#0891B2', accent: '#67E8F9', background: '#F0F9FF', surface: '#FFFFFF', text: '#164E63', textSecondary: '#527C8A', sidebar: '#164E63', sidebarText: '#CFFAFE', sidebarActive: '#0E7490', buttonText: '#FFFFFF', focusRing: '#06B6D4' } },
  { id: 'onyx-platinum', name: 'Onyx Platinum', category: 'Luxury', c: { primary: '#171717', secondary: '#404040', accent: '#A3A3A3', background: '#F5F5F5', surface: '#FFFFFF', text: '#171717', textSecondary: '#737373', sidebar: '#171717', sidebarText: '#E5E5E5', sidebarActive: '#404040', buttonText: '#FFFFFF', focusRing: '#A3A3A3' } },
];

const hexToRgb = (hex) => { const v = parseInt(hex.slice(1), 16); return [(v >> 16) & 255, (v >> 8) & 255, v & 255]; };
const rgbToHex = ([r, g, b]) => '#' + [r, g, b].map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('');
const shade = (hex, t) => { const [r, g, b] = hexToRgb(hex); if (t >= 0) return rgbToHex([r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t]); const k = 1 + t; return rgbToHex([r * k, g * k, b * k]); };
const mix = (a, b, t) => { const [ar, ag, ab] = hexToRgb(a); const [br, bg, bb] = hexToRgb(b); return rgbToHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]); };

const build = ({ id, name, category, c }) => {
  const { primary, secondary, accent, background, sidebar, sidebarActive, sidebarText, text } = c;
  // 50->900 accent scale anchored on secondary at 600/700 so buttons/links use the brand hue.
  const anchor = secondary;
  const shades = [
    shade(anchor, 0.92), shade(anchor, 0.82), shade(anchor, 0.66), shade(anchor, 0.46),
    shade(anchor, 0.26), shade(anchor, 0.12), anchor, shade(anchor, -0.18), shade(anchor, -0.34), shade(anchor, -0.5),
  ];
  // Brand gradient from the sidebar colors (deep -> active -> lighter mix).
  const brand = [sidebar, mix(sidebar, sidebarActive, 0.6), sidebarActive];
  const darkBrand = brand.map((x) => shade(x, -0.25));
  const onBrand = sidebarText;
  const surface = shade(background, 0.4);
  const darkSurface = shade(sidebar, -0.15);
  const login = [shade(sidebar, -0.35), sidebar, mix(sidebar, sidebarActive, 0.6)];
  const swatches = [primary, secondary, accent, shade(accent, 0.4), background];
  return { id, label: name, category, premium: true, description: `${category} theme`, swatches, shades, brand, darkBrand, onBrand, surface, darkSurface, login, accent };
};

const fmt = (arr) => `[${arr.map((x) => `'${x}'`).join(', ')}]`;
const out = themes.map((t) => {
  const p = build(t);
  return `  '${p.id}': {
    label: '${p.label}',
    category: '${p.category}',
    premium: true,
    description: '${p.description}',
    swatches: ${fmt(p.swatches)},
    shades: ${fmt(p.shades)},
    brand: ${fmt(p.brand)},
    darkBrand: ${fmt(p.darkBrand)},
    onBrand: '${p.onBrand}',
    surface: '${p.surface}',
    darkSurface: '${p.darkSurface}',
    login: ${fmt(p.login)},
    accent: '${p.accent}',
  },`;
}).join('\n');

console.log(out);
