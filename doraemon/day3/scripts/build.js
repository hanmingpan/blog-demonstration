import esbuild from 'esbuild'
import glob from 'tiny-glob'

const isDev = process.env.NODE_ENV === 'development'

// 入口文件
const getEntryPoints = async () => {
  return await glob('./src/*.ts')
}

// 默认配置
const defaultConfig = {
  outdir: 'dist',
  format: 'esm',
  platform: 'browser',
  target: ['esnext', 'node16'],
}

async function build() {
  const entryPoints = await getEntryPoints()
  const config = {
    ...defaultConfig,
    entryPoints,
  }

  const devConfig = {
    ...config,
    bundle: true,
    sourcemap: 'inline',
    watch: {
      onRebuild(err, result) {
        if (err) {
          console.error('watch build error', JSON.stringify(err))
          return
        }
        console.log('watch build success')
      },
    },
  }

  const productConfig = {
    ...config,
    bundle: false,
  }

  try {
    await esbuild.build(isDev ? devConfig : productConfig)
  } catch (err) {
    console.error(JSON.stringify(err))
  }
}

build()
