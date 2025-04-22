/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { ipcRenderer } = require('electron')

console.log('preload.js')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
    }
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  document.addEventListener('click', (event) => {
    let target = event.target
    if (target && target.href && target.href.indexOf('.xuxiaowei.com.cn') !== -1) {
      const npmPackageName = `${process.env.npm_package_name || process.env.__CFBundleIdentifier}`.replace('cn.com.xuxiaowei.', '')
      const npmPackageNameSplit = npmPackageName.split('-')
      const npmPackageNameSplitLength = npmPackageNameSplit.length
      event.preventDefault()
      if (npmPackageNameSplitLength === 2) {
        const domain = `kubernetes-${npmPackageNameSplit[1].replace('.', '-')}.xuxiaowei.com.cn`
        if (target.href.indexOf(domain) !== -1) {
          window.location.reload()
        } else {
          let projectName = new URL(target.href).host.split('.')[0].replace('kubernetes-v1-', 'kubernetes-website-1.')
          if (projectName === 'kubernetes') {
            projectName = 'kubernetes-website'
          }
          const url = `https://github.com/xuxiaowei-io/${projectName}/releases`
          ipcRenderer.send('open-external', url)
        }
      }
    }
  })
})
