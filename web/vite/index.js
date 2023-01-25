import vite from '@vitejs/plugin-vue'

// import createAutoImport from './plugins/auto-import'
import createMock from './plugins/mock'
import createRestart from './plugins/restart'
import createSvgIcon from './plugins/svg-icon'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vite()]
  !isBuild && vitePlugins.push(createRestart())
  vitePlugins.push(createMock(viteEnv, isBuild))
  vitePlugins.push(createSvgIcon(isBuild))
  return vitePlugins
}
