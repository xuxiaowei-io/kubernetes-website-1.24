import { ConfigEnv, Plugin, UserConfig, ViteDevServer } from 'vite'
import electron from 'electron'
import { spawn } from 'child_process'

export interface ElectronPluginOptions {
  /**
   * Electron 主进程入口文件路径
   * @default 'main.js'
   */
  entry?: string
}

export default function electronPlugin(options: ElectronPluginOptions = {}): Plugin {
  return {
    name: 'vite-electron-plugin',
    apply: function (config: UserConfig, env: ConfigEnv) {
      return env.command === 'serve'
    },
    configureServer(server: ViteDevServer) {
      const { entry = 'main.js' } = options

      const resolvedUrl =
        server.resolvedUrls?.local[0] ||
        server.resolvedUrls?.network[0] ||
        `http://localhost:${server.config.server.port}`

      process.env.VITE_DEV_SERVER_URL = resolvedUrl

      const electronCmd = electron.toString()

      const electronProcess = spawn(electronCmd, [entry], {
        stdio: 'inherit',
        env: {
          ...process.env,
        },
      })
    },
  }
}
