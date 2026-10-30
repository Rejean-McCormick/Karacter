"""Optional isolated Chromium UI smoke test: pip install playwright + Chromium available.
Does NOT certify native IndexedDB persistence; navigation is not required.
"""
import asyncio, os, shutil
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]


def inline_document():
    html=(ROOT/'index.html').read_text(encoding='utf-8')
    html=html.replace('<link rel="stylesheet" href="src/styles.css">',f'<style>{(ROOT/"src/styles.css").read_text()}</style>')
    for name in ('seed','core','engine','storage','narrative','batch','txt','i18n','app'):
        html=html.replace(f'<script defer src="src/{name}.js"></script>',f'<script>{(ROOT/"src"/f"{name}.js").read_text()}</script>')
    return html


async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or None,args=['--no-sandbox'])
        page=await browser.new_page(viewport={'width':320,'height':760})
        errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        await page.set_content(inline_document())
        await page.wait_for_function('!!window.KaracterApp')
        await page.locator('[data-view="understand"]').click()
        await page.locator('input[data-axis][data-side="left"]').first.fill('5')
        assert (await page.locator('output[id^="out-"]').all_text_contents())[:2]==['5','1']
        await page.locator('[data-view="simulate"]').click()
        await page.locator('[data-action="run-generate"]').click()
        assert await page.locator('.candidate').count()==3
        await page.locator('[data-action="compare"]').click()
        assert await page.locator('[data-action="compare-open"]').count()==1
        await page.locator('[data-action="scenario-add"]').click()
        await page.locator('#f-newScenarioTitle').fill('Storm')
        await page.locator('#f-newScenarioContext').fill('A storm reaches the village')
        await page.locator('[data-action="scenario-save"]').click()
        await page.locator('[data-action="scenario-edit"]').click()
        await page.locator('#f-editScenarioContext').fill('A stronger storm reaches the village')
        await page.locator('[data-action="scenario-update"]').click()
        assert (await page.evaluate('KaracterApp.getWorkspace().scenarios.at(-1).context'))=='A stronger storm reaches the village'
        await page.locator('#langToggle').click()
        assert await page.evaluate('document.documentElement.lang')=='fr'
        for section in ('create','understand','simulate','story','gallery'):
            await page.locator(f'[data-view="{section}"]').click()
            assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
        assert not errors, errors
        print('PASS: isolated UI, sliders, simulation, history, scenarios, FR/EN, 320px layout')
        await browser.close()

if __name__=='__main__':asyncio.run(main())
