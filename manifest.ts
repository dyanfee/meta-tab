import { defineManifest } from '@crxjs/vite-plugin'
import pkgJson from './package.json'
export default defineManifest({
  name: pkgJson.name,
  description: pkgJson.description,
  version: pkgJson.version,
  manifest_version: 3,
  author: pkgJson.author,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_popup: 'pages/popup.html',
    default_icon: 'img/logo-48.png',
  },
  background: {
    service_worker: 'src/background/index',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  host_permissions: ["https://*/", "http://*/"],
  permissions: ['tabs', 'contextMenus'],
  homepage_url: 'https://www.yanfee.com',
  chrome_url_overrides: {
    newtab: 'pages/index.html',
  }
})
