import { Configuration } from 'electron-builder'

export default <Configuration>{
  // 应用唯一标识
  appId: `cn.com.xuxiaowei.${process.env.npm_package_name}`,
  // 版权信息
  copyright: 'Copyright © 徐晓伟 https://xuxiaowei.com.cn',
  // 打包产物名称
  artifactName: '${productName}-${version}-${platform}-${arch}.${ext}',
  // 使用 asar 打包
  asar: true,
  // asar 打包后解压的文件（运行前会自动解压）
  asarUnpack: [],
  // 打包 删除 package.json 的 scripts
  removePackageScripts: true,
  // 打包 删除 package.json 的 keywords
  removePackageKeywords: true,
  // 是否从应用程序版本号推断更新通道。例如，如果版本为 0.12.1-alpha.1，则 channel 将被设置为 alpha。否则为 latest。
  detectUpdateChannel: true,
  // 是否在发布时自动生成更新文件。如果设置为 true，则会在发布时自动生成更新文件，否则需要手动生成。
  generateUpdatesFilesForAllChannels: true,
  // 打包的文件
  files: [
    // Vite 打包后的文件
    'dist/**/*',
    // 程序入口文件
    'main.js',
    // 预加载文件
    'preload.js',
  ],
  // 生成资源的目录
  directories: {
    output: 'release/${version}',
  },
}
