"""Isolated browser interface integration with an in-memory storage stub.
This is NOT a native IndexedDB persistence test.
"""
import asyncio, shutil, os
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]


def html():
    text=(ROOT/'index.html').read_text()
    text=text.replace('<link rel="stylesheet" href="src/styles.css">',f'<style>{(ROOT/"src/styles.css").read_text()}</style>')
    for name in ('seed','core','engine','storage','narrative','batch','presets','txt','i18n','app'):
        stub='''<script>
          KStorage.openDB=async()=>true;
          KStorage.recoverInterruptedRestore=async()=>false;
          KStorage.loadWorkspacePersistent=async()=>null;
          KStorage.saveWorkspace=async()=>true;
          KStorage.commitWorkspace=async()=>true;
          KStorage.listAssets=async()=>[];
        </script>''' if name=='app' else ''
        text=text.replace(f'<script defer src="src/{name}.js"></script>',stub+f'<script>{(ROOT/"src"/f"{name}.js").read_text()}</script>')
    return text

async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True,executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),args=['--no-sandbox'])
  page=await b.new_page(viewport={'width':1120,'height':780})
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await page.set_content(html())
  await page.wait_for_function('!!window.KaracterApp')
  await page.locator('[data-view="simulate"]').click()
  await page.locator('[data-action="run-generate"]').click()
  assert await page.locator('.candidate').count()==3
  await page.locator('[data-action="candidate-canon"]').first.click()
  await page.locator('#f-canonOutcome').fill('The village stayed safe, and everyone was heard.')
  await page.locator('[data-action="canon-save"]').click()
  assert await page.locator('.storyEvent').count()==1
  assert await page.evaluate('KaracterApp.getWorkspace().extensions.storyCanon.length')==1
  await page.locator('[data-action="story-run"]').click()
  await page.locator('[data-action="run-generate"]').click()
  assert await page.evaluate('KaracterApp.getCurrentRun().candidates.some(c=>c.evidence.some(e=>e.sourceType==="story"))')
  await page.locator('[data-view="understand"]').click()
  assert await page.locator('.polarityContexts').count()>=4
  await page.locator('[data-action="axis-down"]').first.click()
  await page.locator('[data-view="create"]').click()
  await page.locator('[data-action="preset-open"]').click()
  assert await page.locator('.presetOption').count()==12
  await page.locator('.presetOption').first.click()
  assert await page.evaluate('KaracterApp.getWorkspace().characters.length')==3
  await page.locator('#langToggle').click()
  assert await page.evaluate('document.documentElement.lang')=='fr'
  for view in ('create','understand','simulate','story','gallery'):
   await page.locator(f'[data-view="{view}"]').click()
   assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),view
  assert not errors,errors
  print('PASS: canon event, later memory, both polar contexts, reorder, presets, bilingual 5-view UI')
  await b.close()
if __name__=='__main__':asyncio.run(main())
