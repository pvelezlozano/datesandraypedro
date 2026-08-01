# datesandraypedro.com 🌸

Sitio estático de una sola página. Sin build, sin dependencias, sin framework.

```
index.html    · las dos pantallas (pregunta + tarjetas)
styles.css    · paleta "cake", lasaña en CSS, transiciones
script.js     · botón "No" escurridizo, navegación de tarjetas, link de WhatsApp
CNAME         · dominio para GitHub Pages
```

Para editar textos, fechas o el número de WhatsApp: `CONFIG` arriba de `script.js` y el HTML de las tarjetas en `index.html`.

## Probar en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Publicar (GitHub Pages + dominio de Squarespace)

Squarespace es solo el **registrador** del dominio. No necesitas su hosting: basta con editar los registros DNS ahí y apuntarlos a GitHub Pages.

### 1 · Subir el código

```bash
git add -A
git commit -m "Sitio de la cita"
git push -u origin main
```

### 2 · Activar Pages

En el repo → **Settings → Pages**

- Source: **Deploy from a branch**
- Branch: **main** / carpeta **/ (root)** → Save
- Custom domain: `datesandraypedro.com` → Save
- Cuando se habilite (puede tardar hasta 24 h), marca **Enforce HTTPS**

### 3 · DNS en Squarespace

Squarespace → **Domains → datesandraypedro.com → DNS → DNS Settings**.

Borra los registros por defecto que Squarespace haya puesto en `@` (los que apuntan a su propio hosting) y agrega:

| Host | Tipo    | Valor / Data              |
| ---- | ------- | ------------------------- |
| `@`  | `A`     | `185.199.108.153`         |
| `@`  | `A`     | `185.199.109.153`         |
| `@`  | `A`     | `185.199.110.153`         |
| `@`  | `A`     | `185.199.111.153`         |
| `www`| `CNAME` | `pvelezlozano.github.io`  |

> El `CNAME` apunta a `pvelezlozano.github.io` — **sin** el nombre del repo.

Opcional, para IPv6, agrega también cuatro registros `AAAA` en `@`:
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`

### 4 · Verificar

```bash
dig datesandraypedro.com +noall +answer -t A
```

Los DNS pueden tardar hasta 24 h en propagar. **Manda el link solo cuando ya cargue con `https://`** — si lo abre antes, puede ver un error de certificado.

## Notas

- El botón **No** se desvanece con `pointerdown` *antes* de que el clic se registre, así que también es imposible de tocar en celular. Verificado en Chrome: 0 clics registrados.
- Las tarjetas se ven **una a la vez** (Atrás / Siguiente, o flechas del teclado). Todas comparten la misma celda del grid, así que la altura no brinca al navegar.
- El sitio es mobile-first: ella lo va a abrir en el teléfono.
- `inspiration.MP4` está en `.gitignore` a propósito: el repo es público y GitHub Pages serviría el archivo en `datesandraypedro.com/inspiration.MP4`.
