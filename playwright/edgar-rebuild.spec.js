const { test, expect } = require('@playwright/test');
const path = require('path');

const PAGES = [
  { name: 'Pagina A - Autoridade', file: 'modelo-a-autoridade/index.html', minSections: 9, hasHeroVideo: true },
  { name: 'Pagina B - Inteligencia Juridica', file: 'modelo-b-inteligencia-juridica/index.html', minSections: 8, hasHeroVideo: false },
];

const VIEWPORTS = [
  { name: '390px (mobile)', width: 390, height: 844, mobileNav: true },
  { name: '430px (mobile)', width: 430, height: 932, mobileNav: true },
  { name: '768px (tablet)', width: 768, height: 1024, mobileNav: true },
  { name: '1366px (laptop)', width: 1366, height: 768, mobileNav: false },
  { name: '1440px (desktop)', width: 1440, height: 900, mobileNav: false },
  { name: '1920px (full hd)', width: 1920, height: 1080, mobileNav: false },
];

const FORBIDDEN_WORDS = [
  /ganhe sua causa/i,
  /garantimos (a )?vit[oó]ria/i,
  /melhor advogado/i,
  /n[uú]mero\s*1\b/i,
  /consulta gr[aá]tis/i,
  /desconto/i,
  /\bgarantem\b/i,
  /\bgarantia\b/i,
  /\bgarantido\b/i,
  /blindagem garantida/i,
];

function fileUrl(rel) {
  const full = path.join(__dirname, '..', rel);
  return 'file://' + full.replace(/\\/g, '/');
}

for (const pageDef of PAGES) {
  test.describe(pageDef.name, () => {
    test('1/2. carrega sem erros de console, page errors ou requests falhos', async ({ page }) => {
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];
      page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('requestfailed', (req) => failedRequests.push(req.url() + ' :: ' + (req.failure()?.errorText || 'unknown')));

      await page.goto(fileUrl(pageDef.file));
      await page.waitForLoadState('networkidle');

      expect(consoleErrors, 'console errors: ' + consoleErrors.join(' | ')).toHaveLength(0);
      expect(pageErrors, 'page errors: ' + pageErrors.join(' | ')).toHaveLength(0);
      expect(failedRequests, 'failed requests: ' + failedRequests.join(' | ')).toHaveLength(0);
    });

    test('7/8. todas as imagens carregam (nenhum asset quebrado)', async ({ page }) => {
      await page.goto(fileUrl(pageDef.file));
      await page.waitForLoadState('networkidle');
      const brokenImages = await page.$$eval('img', (imgs) =>
        imgs.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src)
      );
      expect(brokenImages, 'broken images: ' + brokenImages.join(' | ')).toHaveLength(0);
    });

    test('13/14. sem href="#", sem links falsos', async ({ page }) => {
      await page.goto(fileUrl(pageDef.file));
      const hashLinks = await page.$$eval('a[href="#"]', (as) => as.map((a) => a.outerHTML));
      expect(hashLinks, 'links href="#": ' + hashLinks.join(' | ')).toHaveLength(0);
      const emptyLinks = await page.$$eval('a', (as) =>
        as.filter((a) => !a.getAttribute('href') || a.getAttribute('href').trim() === '').map((a) => a.outerHTML)
      );
      expect(emptyLinks, 'links sem href: ' + emptyLinks.join(' | ')).toHaveLength(0);
    });

    test('15. sem CSS inline (style="")', async ({ page }) => {
      const fs = require('fs');
      const html = fs.readFileSync(path.join(__dirname, '..', pageDef.file), 'utf8');
      const matches = html.match(/style="/g) || [];
      expect(matches, 'CSS inline encontrado: ' + matches.length + ' ocorrencias').toHaveLength(0);
    });

    test('16/17. sem travessao longo e sem palavras proibidas OAB', async ({ page }) => {
      await page.goto(fileUrl(pageDef.file));
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.includes('—'), 'travessao longo (em dash) encontrado').toBe(false);
      for (const pattern of FORBIDDEN_WORDS) {
        expect(bodyText, 'palavra proibida encontrada: ' + pattern).not.toMatch(pattern);
      }
    });

    test('18. foto da aeronave nao e usada como hero (nem em nenhum lugar desta reconstrucao)', async ({ page }) => {
      await page.goto(fileUrl(pageDef.file));
      const aeronaveImgs = await page.$$eval('img', (imgs) =>
        imgs.filter((img) => /aeronave/i.test(img.src)).map((img) => img.src)
      );
      expect(aeronaveImgs, 'imagem de aeronave encontrada: ' + aeronaveImgs.join(' | ')).toHaveLength(0);
      const heroImg = await page.locator('.hero-cinematic img, .hero-cinematic video, .hero-editorial img').first();
      const heroSrc = await heroImg.getAttribute('src').catch(() => null);
      if (heroSrc) expect(heroSrc, 'hero nao pode ser a foto de aeronave').not.toMatch(/aeronave/i);
    });

    test('19. "registro a confirmar" aparece apenas em tratamento discreto de rodape', async ({ page }) => {
      await page.goto(fileUrl(pageDef.file));
      const discreteText = await page.locator('.footer-oab-discrete').innerText();
      expect(discreteText.toLowerCase()).toContain('a confirmar');
      // nao pode aparecer fora do rodape discreto (ex: hero, cta, nav)
      const heroText = await page.locator('.hero-cinematic, .hero-editorial').innerText().catch(() => '');
      expect(heroText.toLowerCase()).not.toContain('a confirmar');
    });

    test('3/5/6. video de hero: sem controles, carrega source correta, sem erros', async ({ page }) => {
      test.skip(!pageDef.hasHeroVideo, 'este modelo nao usa video de hero por design (hero fotografico editorial)');
      const consoleErrors = [];
      page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(fileUrl(pageDef.file));
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      const video = page.locator('[data-hero-video]').first();
      await expect(video).toHaveCount(1);
      const hasControls = await video.evaluate((el) => el.hasAttribute('controls'));
      expect(hasControls, 'video nao pode ter controles visiveis').toBe(false);

      const sourceSrc = await video.evaluate((el) => {
        const source = el.querySelector('source');
        return source ? source.getAttribute('src') : null;
      });
      expect(sourceSrc, 'video deveria ter source desktop carregada').toContain('edgar-hero-video-desktop.mp4');
      expect(consoleErrors, 'console errors no video: ' + consoleErrors.join(' | ')).toHaveLength(0);
    });

    test('4/9. video de hero tem fallback (poster/layer) e nao carrega source com prefers-reduced-motion', async ({ browser }) => {
      test.skip(!pageDef.hasHeroVideo, 'este modelo nao usa video de hero por design (hero fotografico editorial)');
      const context = await browser.newContext({ reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(fileUrl(pageDef.file));
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);

      const video = page.locator('[data-hero-video]').first();
      const sourceCount = await video.evaluate((el) => el.querySelectorAll('source').length);
      expect(sourceCount, 'com reduced motion, nenhuma source de video deveria ser carregada').toBe(0);
      await context.close();
    });

    test('mobile: video de hero usa a fonte mobile otimizada', async ({ page }) => {
      test.skip(!pageDef.hasHeroVideo, 'este modelo nao usa video de hero por design (hero fotografico editorial)');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(fileUrl(pageDef.file));
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);
      const video = page.locator('[data-hero-video]').first();
      const sourceSrc = await video.evaluate((el) => {
        const source = el.querySelector('source');
        return source ? source.getAttribute('src') : null;
      });
      expect(sourceSrc, 'video mobile deveria usar a fonte otimizada mobile').toContain('edgar-hero-video-mobile.mp4');
    });

    test('20. formulario de contato e honesto (painel de status visivel antes do envio, sem simular envio)', async ({ page }) => {
      await page.goto(fileUrl(pageDef.file));
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.locator('[data-open-contact]').first().click();
      const modal = page.locator('#contact-modal');
      await expect(modal).toHaveClass(/open/);
      const pendingPanel = page.locator('.channel-pending-panel');
      await expect(pendingPanel).toBeVisible();
      await expect(pendingPanel).toContainText('validação');
      // o link para Instagram deve estar sempre visivel, nunca escondido atras de "enviar" falso
      const igLink = page.locator('[data-instagram-link]');
      await expect(igLink).toBeVisible();
      await page.locator('[data-close-contact]').click();
      await expect(modal).not.toHaveClass(/open/);
    });

    test('24. meta title e conteudo sem mencao a "protótipo"', async ({ page }) => {
      await page.goto(fileUrl(pageDef.file));
      const title = await page.title();
      expect(title.toLowerCase()).not.toContain('prototipo');
      expect(title.toLowerCase()).not.toContain('protótipo');
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).not.toContain('protótipo');
    });

    test('25. estrutura de secoes com peso equivalente (Pagina B nao e apenas uma variacao menor)', async ({ page }) => {
      await page.goto(fileUrl(pageDef.file));
      const sectionCount = await page.locator('main > section').count();
      expect(sectionCount, 'quantidade de secoes principais').toBeGreaterThanOrEqual(pageDef.minSections);
    });

    for (const vp of VIEWPORTS) {
      test(`viewport ${vp.name}: overflow, nav, motion, headline`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(fileUrl(pageDef.file));
        await page.waitForLoadState('networkidle');

        // 12. overflow
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, 'overflow horizontal detectado: ' + overflow + 'px').toBeLessThanOrEqual(2);

        // 3/4. nav
        if (vp.mobileNav) {
          await expect(page.locator('.hamburger')).toBeVisible();
          await page.locator('#hamburger-btn').click();
          await expect(page.locator('#nav-mobile')).toHaveClass(/open/);
        } else {
          await expect(page.locator('.nav-links')).toBeVisible();
          await expect(page.locator('.nav-cta')).toBeVisible();
        }

        // 23. headline mobile com tamanho adequado
        if (vp.width <= 430) {
          const fontSize = await page.locator('h1').first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
          expect(fontSize, 'headline mobile deveria ter pelo menos 28px').toBeGreaterThanOrEqual(28);
        }

        await page.screenshot({
          path: path.join(__dirname, '..', 'screenshots', `${pageDef.file.split('/')[0]}-${vp.width}.png`),
          fullPage: false,
        });
      });
    }

    test('21. motion respeita prefers-reduced-motion', async ({ browser }) => {
      const context = await browser.newContext({ reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto(fileUrl(pageDef.file));
      await page.waitForTimeout(300);
      const revealOpacities = await page.$$eval('.reveal, [data-reveal]', (els) => els.map((el) => getComputedStyle(el).opacity));
      expect(revealOpacities.length, 'nenhum elemento de reveal encontrado nesta pagina').toBeGreaterThan(0);
      for (const op of revealOpacities) {
        expect(parseFloat(op), 'secao de reveal deveria estar visivel com reduced motion').toBeGreaterThan(0.9);
      }
      await context.close();
    });
  });
}

test('pagina inicial (chooser) carrega e linka para os dois modelos', async ({ page }) => {
  await page.goto(fileUrl('index.html'));
  await expect(page.locator('a[href="modelo-a-autoridade/index.html"]')).toBeVisible();
  await expect(page.locator('a[href="modelo-b-inteligencia-juridica/index.html"]')).toBeVisible();
});
