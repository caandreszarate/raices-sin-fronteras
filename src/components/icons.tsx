import type { SVGProps } from "react";

/**
 * Iconografía cultural del branding. Los seis primeros corresponden a los
 * íconos de programa de la lámina (tambor, personas, libro, planta, manos,
 * brújula). Trazo consistente, `aria-hidden` por defecto (decorativos).
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function DrumIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8c0-1.7 2.7-3 6-3s6 1.3 6 3-2.7 3-6 3-6-1.3-6-3Z" />
      <path d="M6 8v6c0 1.7 2.7 3 6 3s6-1.3 6-3V8" />
      <path d="m4 4 3 3M20 4l-3 3M9 11l2 3M15 11l-2 3" />
    </svg>
  );
}

export function PeopleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M15.5 6.5a2.5 2.5 0 0 1 0 5" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M15 14.5a5.5 5.5 0 0 1 5.5 4.5" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 6.5C10.5 5 8.5 4.5 4 5v13c4.5-.5 6.5 0 8 1.5 1.5-1.5 3.5-2 8-1.5V5c-4.5-.5-6.5 0-8 1.5Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-7 4-12 14-13 .5 6-2 13-9 13-2.5 0-5-1.3-5-1.3Z" />
      <path d="M5 19c2-5 5-7 9-8.5" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m11 17 2 2 4-4 3 1 1-2-5-5-3 1-2-2-4 4 1 3Z" />
      <path d="m9 11 3 3M13 8l2 2" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

/** Ceiba estilizada (árbol con raíces) — sello del proyecto. */
export function CeibaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c-2.2 0-3.5 1.4-3.5 3 0 .6-1.5.8-1.5 2.4C7 10 8.4 10.5 9 10.5M12 3c2.2 0 3.5 1.4 3.5 3 0 .6 1.5.8 1.5 2.4C17 10 15.6 10.5 15 10.5" />
      <path d="M12 6v12" />
      <path d="M12 18c-1.5 0-2 1.5-3.5 1.5M12 18c1.5 0 2 1.5 3.5 1.5M12 18v3" />
      <path d="M9 10.5h6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L18 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4 2 20h20L12 4Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/** Mapa de claves de icono → componente, usado por datos (programas/valores). */
export const iconMap = {
  drum: DrumIcon,
  people: PeopleIcon,
  book: BookIcon,
  leaf: LeafIcon,
  handshake: HandshakeIcon,
  compass: CompassIcon,
  ceiba: CeibaIcon,
} as const;

export type IconKey = keyof typeof iconMap;

export function ProgramIcon({ name, ...props }: { name: string } & IconProps) {
  const Cmp = iconMap[name as IconKey] ?? CeibaIcon;
  return <Cmp {...props} />;
}

/** Marca de WhatsApp (glifo relleno, no sigue el trazo del set cultural). */
export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-3.53 3.6c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47Z" />
    </svg>
  );
}
