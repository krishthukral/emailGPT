ext.runtime.onExtensionClick.addListener(async () => {
    console.log('Extension Clicked')
    if (!tabOne) {
      tabOne = await ext.tabs.create({ text: 'Tutorial Tab', mutable: true, muted: false })
      windowOne = await ext.windows.create()
      websessionOne = await ext.websessions.create({ partition: 'Tutorial Extension', persistent: true, global: false, cache: true });
      const windowOneSize = await ext.windows.getSize(windowOne.id)
      webviewOne = await ext.webviews.create({
        window: windowOne,
        websession: websessionOne,
        bounds: { x: 0, y: 25, width: windowOneSize.width, height: windowOneSize.height - 25 },
        autoResize: { width: true, height: true }
      })
      await ext.webviews.loadURL(webviewOne.id, 'https://www.youtube.com/watch?v=bWr-DA5Wjfw')
      await ext.webviews.openDevTools(webviewOne.id, { mode: 'detach' })
      setTimeout(async () => {
        console.log('in timeout')
        await ext.webviews.executeJavaScript(webviewOne.id, "document.querySelector('#button-shape .style-scope').click();")
        await ext.webviews.executeJavaScript(webviewOne.id, "document.querySelectorAll('.style-scope .ytd-menu-popup-renderer')[3].click();")
        setTimeout(async () => {
          await ext.webviews.executeJavaScript(webviewOne.id, "var transcript = document.querySelectorAll('#body .ytd-transcript-search-panel-renderer')[0].innerText;")
          await ext.webviews.executeJavaScript(webviewOne.id, "console.log(transcript)")
        }, 1000)
      }, 1000)
    }
  })