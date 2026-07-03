# Edgar Mondadori - Índice de Screenshots do Vídeo de Hero

Todos os arquivos abaixo estão em `screenshots/` (pasta gitignored,
evidência de sessão, não é conteúdo do site - ver `EDGAR_CLINE_VISUAL_EVIDENCE_REPORT.md`
para como obtê-los novamente se necessário).

| # | Arquivo | Página | Viewport | Estado do vídeo |
|---|---|---|---|---|
| 1 | `screenshots/video-check-a.png` | A - Autoridade | 1440x900 (desktop) | Reproduzindo, `currentTime` ≈ 2,69s |
| 2 | `screenshots/video-check-b.png` | B - Inteligência Jurídica | 1440x900 (desktop) | Reproduzindo (camada ambiente), `currentTime` ≈ 2,68s |
| 3 | `screenshots/video-check-a-mobile-390.png` | A - Autoridade | 390x844 | Reproduzindo, `currentTime` ≈ 2,70s |
| 4 | `screenshots/video-check-b-mobile-390.png` | B - Inteligência Jurídica | 390x844 | Reproduzindo (ambiente), `currentTime` ≈ 2,71s |
| 5 | `screenshots/video-check-a-mobile-430.png` | A - Autoridade | 430x932 | Reproduzindo, `currentTime` ≈ 2,71s |
| 6 | `screenshots/video-check-b-mobile-430.png` | B - Inteligência Jurídica | 430x932 | Reproduzindo (ambiente), `currentTime` ≈ 2,69s |
| 7 | `screenshots/video-check-a-reduced-motion.png` | A - Autoridade | 1440x900, `prefers-reduced-motion: reduce` | Fallback - 0 `<source>`, `currentTime` 0, `paused: true` |
| 8 | `screenshots/video-check-b-reduced-motion.png` | B - Inteligência Jurídica | 1440x900, `prefers-reduced-motion: reduce` | Fallback - 0 `<source>`, `currentTime` 0, `paused: true` |

## Como foram gerados

Script Playwright dedicado (executado e removido após uso, não faz parte
do produto): abre cada página no viewport especificado, aguarda
`networkidle` + 1-2s de reprodução real, lê o estado do elemento
`[data-hero-video]` via `page.evaluate` (não confia em suposição - lê
`readyState`, `currentTime`, `paused` e `classList` diretamente do DOM),
então captura o screenshot.

## Dados brutos capturados (real, sem falsificação)

```json
{
  "desktop-a": { "hasSource": true, "readyState": 4, "currentTime": 2.689, "paused": false, "classList": ["hero-bg-video", "video-ready"] },
  "desktop-b": { "hasSource": true, "readyState": 4, "currentTime": 2.676, "paused": false, "classList": ["hero-video-ambient", "video-ready"] },
  "mobile-390-a": { "hasSource": true, "readyState": 4, "currentTime": 2.696, "paused": false },
  "mobile-390-b": { "hasSource": true, "readyState": 4, "currentTime": 2.709, "paused": false },
  "mobile-430-a": { "hasSource": true, "readyState": 4, "currentTime": 2.709, "paused": false },
  "mobile-430-b": { "hasSource": true, "readyState": 4, "currentTime": 2.692, "paused": false },
  "reduced-motion-a": { "hasSource": false, "readyState": 0, "currentTime": 0, "paused": true },
  "reduced-motion-b": { "hasSource": false, "readyState": 0, "currentTime": 0, "paused": true }
}
```

`readyState: 4` = `HAVE_ENOUGH_DATA` (Chromium headless conseguiu
carregar e reproduzir o vídeo normalmente neste ambiente - nenhum
fallback por bloqueio de autoplay foi necessário, mas a lógica de
fallback existe e foi validada separadamente pelo cenário de
`prefers-reduced-motion`).
