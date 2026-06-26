# ✅ Checklist de QA — Raíces sin Fronteras

Lista de verificación antes de cada despliegue a producción.
Marca cada ítem (`[x]`) tras comprobarlo.

---

## 1. Build y tipado

- [ ] `npm run build` finaliza sin errores ni warnings.
- [ ] `npm run lint` sin errores.
- [ ] No hay `console.error` ni errores en la consola del navegador.
- [ ] Todas las páginas resuelven (sin 500): `/`, `/nosotros`, `/programas`,
      `/proyectos`, `/proyectos/[slug]`, `/noticias`, `/noticias/[slug]`,
      `/galeria`, `/contacto`, `/donar`, `/privacidad`, ruta inexistente → 404.

## 2. Responsive (móvil / tablet / escritorio)

- [ ] **Móvil (≤640px)**: menú hamburguesa abre/cierra; bloquea scroll del body;
      cierra con `Escape` y al navegar.
- [ ] Sin scroll horizontal en ninguna página ni breakpoint.
- [ ] Hero legible y emblema visible en móvil (apila en una columna).
- [ ] Grids de programas/proyectos/noticias/galería reflowean correctamente.
- [ ] **Tablet (768px)** y **escritorio (≥1024px)**: layouts a 2–3–4 columnas correctos.
- [ ] Footer: columnas se apilan en móvil; newsletter usable.
- [ ] Imágenes/portadas mantienen proporción (sin deformación).

## 3. Accesibilidad (WCAG 2.2 AA)

- [ ] Navegación completa solo con teclado (Tab/Shift+Tab/Enter/Espacio).
- [ ] Skip-link "Saltar al contenido" aparece al tabular y funciona.
- [ ] Foco visible (contorno dorado) en todos los enlaces, botones y campos.
- [ ] Un único `<h1>` por página; jerarquía de encabezados coherente.
- [ ] Imágenes con `alt`/`aria-label` significativos; decorativas con `aria-hidden`.
- [ ] Formularios: cada campo con `<label>`; errores con `role="alert"` y
      asociados por `aria-describedby`.
- [ ] Estados dinámicos anunciados (`aria-live`) en filtros y envíos.
- [ ] Contraste de texto ≥ 4.5:1 (≥ 3:1 para texto grande). Revisar texto sobre
      verdes oscuros y sobre marfil.
- [ ] `prefers-reduced-motion`: animaciones desactivadas.
- [ ] Auditoría Lighthouse Accesibilidad ≥ 95.

## 4. Formularios

- [ ] **Contacto — vacío**: muestra errores por campo y resumen general.
- [ ] **Contacto — email inválido**: error específico en el campo.
- [ ] **Contacto — sin consentimiento**: bloquea y avisa.
- [ ] **Contacto — válido**: muestra estado de éxito.
- [ ] **Honeypot**: rellenar el campo oculto `website` → respuesta de éxito
      silenciosa (no se procesa).
- [ ] **Rate limiting**: >5 envíos/min desde la misma IP → mensaje de espera.
- [ ] **Newsletter (footer)**: email inválido → error; válido → éxito.
- [ ] Estado de carga (spinner/disabled) visible durante el envío.

## 5. Seguridad

- [ ] Cabeceras presentes (DevTools → Network → documento):
      `Content-Security-Policy`, `X-Frame-Options: DENY`,
      `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
      `Strict-Transport-Security`.
- [ ] CSP sin violaciones en consola; los scripts de Next cargan con nonce.
- [ ] No aparece la cabecera `X-Powered-By`.
- [ ] Ninguna clave secreta en el bundle del cliente (buscar en DevTools →
      Sources). Solo variables `NEXT_PUBLIC_*`.
- [ ] El endpoint `/api/donaciones/checkout` valida importe y frecuencia (Zod) y
      aplica rate limit.
- [ ] Enlaces externos con `rel="noopener noreferrer"`.

## 6. Navegación y contenido

- [ ] Todos los enlaces del header/footer llegan a su destino.
- [ ] Filtros de **Proyectos** (programa/región/estado/orden) y empty state.
- [ ] Búsqueda y categorías de **Noticias**; empty state al no haber resultados.
- [ ] Filtros de **Galería** (programa/país/año); contador y empty state.
- [ ] Migas de pan correctas en páginas internas.
- [ ] Deep-links: `/proyectos?programa=cultura` y `/contacto?asunto=voluntariado`
      preseleccionan el filtro/asunto.

## 7. SEO

- [ ] `<title>` y `<meta description>` únicos y correctos por página.
- [ ] Open Graph/Twitter presentes (inspeccionar `<head>`).
- [ ] `/sitemap.xml` lista todas las rutas (incl. detalles dinámicos).
- [ ] `/robots.txt` permite el sitio y referencia el sitemap.
- [ ] `lang="es"` en `<html>`.
- [ ] Lighthouse SEO ≥ 95 y Best Practices ≥ 95.

## 8. Rendimiento

- [ ] Lighthouse Performance ≥ 90 (móvil).
- [ ] Hero con `priority`; sin CLS perceptible al cargar fuentes.
- [ ] Sin recursos 404 en Network.
