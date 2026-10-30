"""Isolated frontend check for source-aware Kristal profiles, not native disk persistence."""
import asyncio,os,shutil
from pathlib import Path
from playwright.async_api import async_playwright
R=Path(__file__).resolve().parents[1]
def html_inline():
    h=(R/'index.html').read_text()
    h=h.replace('<link rel="stylesheet" href="src/styles.css">','<style>'+(R/'src/styles.css').read_text()+'</style>')
    for name in ('seed','kristal-pack','kristal-integration','core','engine','storage','narrative','batch','presets','txt','i18n','app'):
        h=h.replace(f'<script defer src="src/{name}.js"></script>',f'<script>{(R/"src"/f"{name}.js").read_text()}</script>')
    from base64 import b64encode
    logo=b64encode((R/'assets/logo.svg').read_bytes()).decode()
    h=h.replace('src="assets/logo.svg"',f'src="data:image/svg+xml;base64,{logo}"')
    return h
async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),args=['--no-sandbox'])
        page=await browser.new_page(viewport={'width':1300,'height':900})
        errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        await page.set_content(html_inline())
        await page.wait_for_function('!!window.KaracterApp')
        assert await page.evaluate('KaracterApp.getWorkspace().characters.length')==20
        assert await page.locator('[data-action="kristal-import"]').count()==1
        assert await page.locator('.charChoice').count()==20
        await page.locator('.charChoice').filter(has_text='Aïda Mansour').click()
        assert await page.get_by_text('Source and creative proposals').count()==1
        assert await page.get_by_text('Source-supported elements').count()==1
        await page.locator('#langToggle').click()
        assert await page.get_by_text('Source et propositions créatives').count()==1
        await page.locator('[data-view="understand"]').click()
        await page.locator('input[data-axis][data-side="left"]').first.fill('5')
        assert (await page.locator('output[id^="out-"]').all_text_contents())[:2]==['5','1']
        await page.locator('[data-view="simulate"]').click()
        await page.locator('[data-action="run-generate"]').click()
        assert await page.locator('.candidate').count()==3
        assert not errors,errors
        await page.locator('[data-view="create"]').click()
        await page.evaluate("document.querySelector('#toast').hidden=true")
        await page.screenshot(path='/mnt/data/Karacter_7_1_Kristal_preview.png',full_page=False)
        await browser.close()
        print('PASS: Kristal 20 visible profiles (19 imported + Mira), evidence panel FR/EN, linked 0–6 sliders, simulation')
if __name__=='__main__':asyncio.run(main())
