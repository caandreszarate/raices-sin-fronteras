# Raíces sin Fronteras — Sitio web oficial

> **Conectamos orígenes, construimos futuros.**
> Plataforma de cooperación afro-hispana entre **América Latina y Guinea Ecuatorial**:
> cultura, juventud, educación, medio ambiente, cooperación y turismo de raíces.

Sitio web institucional completo, responsive, accesible (WCAG 2.2 AA) y preparado
para producción. Construido con **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

---

## 🎨 Identidad visual (extraída del branding)

Todas las decisiones visuales parten de la lámina de marca
(`public/branding/branding_raices_sin_fronteras.png`) y del emblema
(`public/branding/emblema-raices.png`), usado como **fuente visual principal** del hero,
no como decoración aislada:

| Elemento del branding | Aplicación en el sitio |
|---|---|
| Ceiba con raíces | Logo, divisores de sección (`RootsDivider`), tarjeta "símbolo" |
| Dos rostros / dos orillas | Hero, gradiente `gradient-orillas` (verde→azul océano) |
| Ruta transatlántica punteada | `RouteLine`, fondos `route-line` |
| Textiles latinoamericanos / Kente | Textura `textile-pattern` en fondos y portadas |
| 6 íconos de programa | `src/components/icons.tsx` (tambor, personas, libro, hoja, manos, brújula) |
| Arco dorado + aves + brújula | Acentos en `CoverArt` y elementos decorativos |

**Paleta** (tokens en `src/app/globals.css`): verde profundo `#0D3B2A`, verde `#15693F`,
dorado `#DAA520`, naranja `#E67E22`, rojo tierra `#B23B2E`, azul profundo `#0B1D3A`,
marrón `#7A4E2D`, marfil `#EDE6D6`, salvia `#A8C5A1`, verde claro `#D4E5D7`.

**Tipografía**: Cormorant Garamond (titulares serif), Inter (texto/navegación),
Pacifico (acento manuscrito "sin Fronteras"). Cargadas con `next/font` (self-hosted, sin FOUT).

---

## 🚀 Puesta en marcha

Requisitos: **Node.js ≥ 20** y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno
cp .env.example .env.local   # edita los valores que necesites

# 3. Desarrollo
npm run dev                  # http://localhost:3000

# 4. Build de producción + arranque
npm run build
npm run start

# 5. Linter
npm run lint
```

> El sitio funciona **sin configurar ninguna variable**: usa datos mock y, sin
> pasarela ni email configurados, los formularios validan y muestran estados de
> éxito (las integraciones reales se activan vía `.env.local`).

---

## 📁 Estructura del proyecto

```
src/
├─ app/
│  ├─ layout.tsx              # Layout raíz: fuentes, metadatos, Header/Footer, skip-link
│  ├─ globals.css             # Sistema de diseño: tokens, utilidades de marca, base
│  ├─ page.tsx                # Inicio (hero, misión, programas, proyectos, noticias, galería)
│  ├─ nosotros/page.tsx       # Historia, misión/visión, ceiba, valores, equipo
│  ├─ programas/page.tsx      # 6 programas con objetivos, indicadores y proyectos
│  ├─ proyectos/
│  │  ├─ page.tsx             # Listado filtrable (programa, región, estado, orden)
│  │  └─ [slug]/page.tsx      # Detalle de proyecto (SSG)
│  ├─ noticias/
│  │  ├─ page.tsx             # Blog con búsqueda + categorías
│  │  └─ [slug]/page.tsx      # Detalle de artículo (SSG)
│  ├─ galeria/page.tsx        # Galería filtrable (programa, país, año)
│  ├─ contacto/page.tsx       # Formulario seguro + datos + mapa + redes
│  ├─ donar/page.tsx          # Donación con widget e integración de pasarela
│  ├─ privacidad/page.tsx     # Política de privacidad
│  ├─ not-found.tsx           # 404 con identidad de marca
│  ├─ loading.tsx             # Estado de carga global
│  ├─ sitemap.ts / robots.ts  # SEO
│  ├─ actions/                # Server actions (contacto, newsletter) con Zod
│  └─ api/donaciones/checkout # Punto de integración de pasarela de pago
├─ components/
│  ├─ layout/                 # Header (nav responsive), Footer
│  ├─ ui/                     # Button, Logo, Badge, SectionHeading, CTASection,
│  │                          # PageHeader, Section/Container, CoverArt
│  ├─ cards/                  # ProgramCard, ProjectCard, NewsCard
│  ├─ forms/                  # ContactForm, NewsletterForm (client, useActionState)
│  ├─ gallery/ projects/ news/# Exploradores filtrables (client)
│  ├─ home/Hero.tsx           # Hero con el emblema del branding
│  ├─ decor.tsx               # RootsDivider, RouteLine, TextileBand (SVG)
│  └─ icons.tsx               # Iconografía cultural (incl. 6 íconos de programa)
├─ lib/
│  ├─ site.ts                 # Configuración: navegación, contacto, redes
│  ├─ types.ts                # Modelos de dominio (Program, Project, News, Gallery…)
│  ├─ data/                   # Datos mock (programs, projects, news, gallery, org)
│  ├─ validation.ts           # Esquemas Zod compartidos
│  ├─ rate-limit.ts           # Rate limiter (memoria; sustituible por Redis)
│  └─ format.ts               # Formato de fechas, escape HTML
                             # (CSP y cabeceras de seguridad se definen en next.config.ts)
```

### Modelos de datos (`src/lib/types.ts`)

`Program`, `Project`, `NewsArticle`, `GalleryItem`, `TeamMember`, `Value`.
Diseñados para mapear 1:1 con tablas PostgreSQL/Supabase o colecciones de un CMS
headless. Para conectar un origen real, basta reemplazar las funciones de
`src/lib/data/*` por consultas (Server Components con `await`), sin tocar la UI.

---

## 🔐 Seguridad implementada

- **Content-Security-Policy** (`next.config.ts`): CSP estática compatible con el
  prerender estático (SSG). Directivas estrictas: `default-src 'self'`,
  `object-src 'none'`, `base-uri`/`form-action 'self'`, `frame-ancestors 'none'`,
  `img/font/connect/frame-src` acotadas y `upgrade-insecure-requests`. Se usa
  `'unsafe-inline'` solo en `script-src`/`style-src` porque el App Router emite
  scripts/estilos inline en el HTML estático (un enfoque con nonce obligaría a
  renderizar todo por petición y rompe el SSG).
- **Cabeceras de seguridad** (`next.config.ts`): `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` restrictiva y `Strict-Transport-Security` (HSTS).
- **Validación server-side con Zod** en toda entrada (server actions y API). El
  cliente nunca es fuente de verdad.
- **Anti-spam / anti-fuerza bruta**: honeypot (`website`), rate limiting por IP y
  validación estricta. El honeypot se trata como éxito silencioso para no informar
  a los bots. Límites: contacto 5/min, newsletter 4/min, donaciones 10/min.
- **CSRF**: las server actions de Next validan el origen de forma nativa; la API
  route de donaciones añade además una comprobación explícita de `Origin`/`Referer`
  contra el `Host` (rechaza peticiones cross-origin, _fail-closed_).
- **Sin XSS**: no se usa `dangerouslySetInnerHTML`; todo el contenido dinámico se
  renderiza como texto (los cuerpos de proyectos/noticias son arrays de párrafos).
- **Caracteres de control bloqueados** en texto (mitiga inyección de cabeceras).
- **Secretos solo en servidor**: ninguna clave de email/pago/BD llega al cliente;
  solo variables `NEXT_PUBLIC_*` se exponen. `poweredByHeader` desactivado.
- **Enlaces externos** con `rel="noopener noreferrer"`.

> **Producción multi-instancia (recomendado):** el rate limiter es en memoria
> (efectivo por instancia). Para frenar fuerza bruta distribuida en Vercel,
> sustituir por **Upstash Redis / Vercel KV** (misma firma en `src/lib/rate-limit.ts`)
> y activar **Vercel Firewall (WAF) + BotID** desde el panel para bloqueo de bots
> y reglas de rate limiting a nivel de plataforma.

> Para producción multi-instancia, sustituye el rate limiter en memoria por
> Upstash Redis / Vercel KV (misma firma en `src/lib/rate-limit.ts`).

---

## ♿ Accesibilidad (WCAG 2.2 AA)

- HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`, `dl`).
- Skip-link "Saltar al contenido", `lang="es"`, jerarquía de encabezados correcta.
- Foco visible y elegante en todo el sitio (`:focus-visible` dorado global).
- Navegación por teclado completa; menú móvil cierra con `Escape` y bloquea scroll.
- `aria-current`, `aria-expanded`, `aria-controls`, `aria-live` en estados dinámicos.
- Labels y mensajes de error asociados (`aria-describedby`, `role="alert"`).
- Texto alternativo significativo en imágenes y portadas (`role="img"` + `aria-label`).
- Respeta `prefers-reduced-motion` (desactiva animaciones).
- Contraste cuidado con la paleta de marca (texto sobre fondos oscuros/claros).

---

## 🌐 SEO y rendimiento

- Metadatos por página (`title` template, Open Graph, Twitter Card).
- `sitemap.xml` y `robots.txt` generados dinámicamente.
- Páginas de detalle **prerenderizadas (SSG)** con `generateStaticParams`.
- Fuentes self-hosted con `display: swap`; imágenes vía `next/image` (AVIF/WebP).
- Sin dependencias pesadas: iconografía y decoración en SVG inline.

---

## 🚢 Despliegue

### Vercel (recomendado)

1. Sube el repositorio a GitHub/GitLab e impórtalo en Vercel.
2. Configura las variables de entorno (ver `.env.example`) en el panel de Vercel.
3. Deploy automático. Framework detectado: **Next.js** (sin configuración extra).

### Otro hosting Node

```bash
npm run build && npm run start   # sirve en el puerto 3000 (configurable con PORT)
```

> En Vercel funciona de forma nativa, sin configuración adicional.

---

## 🧪 Testing

Tests unitarios con **Vitest** sobre la lógica crítica (`tests/`):

```bash
npm test          # ejecuta todos los tests una vez
npm run test:watch
```

- `tests/validation.test.ts` — esquemas Zod (contacto/newsletter): válido, email
  inválido, honeypot, caracteres de control, consentimiento, longitudes.
- `tests/rate-limit.test.ts` — el limitador permite hasta el tope, bloquea, se
  reinicia tras la ventana, y extracción de IP de cabeceras.
- `tests/format.test.ts` — formato de fecha por idioma y `escapeHtml` (anti-XSS).

> Próximos pasos sugeridos: tests de componentes con Testing Library y E2E con
> Playwright (flujo de formularios y cambio de idioma).

---

## ✅ Checklist de QA

Ver **[`QA_CHECKLIST.md`](./QA_CHECKLIST.md)** para la lista completa de pruebas de
responsive, accesibilidad, formularios, seguridad y SEO.

---

## 📌 Notas de mantenimiento

- **Imágenes**: las viñetas ilustradas de `public/branding/cuts/` son recortes del
  emblema oficial (ceiba, dos rostros, las dos orillas) mapeados en
  `src/lib/images.ts`. Para usar fotos reales, sustituye esas rutas; `CoverArt`
  renderiza cualquier `src` con velo de color de marca, o cae a un panel
  ilustrado si no hay imagen.
- **Contenido**: edita `src/lib/data/*` o conéctalo a un CMS/BD.
- **Marca**: ajusta tokens en `src/app/globals.css` (`@theme`).
- **Navegación / contacto / redes**: `src/lib/site.ts`.
- **Pasarela de pago**: implementa el bloque marcado en
  `src/app/api/donaciones/checkout/route.ts`.
- **Email**: conecta tu proveedor en `src/app/actions/contact.ts` y `newsletter.ts`.

Código limpio, tipado y comentado en español para facilitar el relevo a futuros
desarrolladores.
