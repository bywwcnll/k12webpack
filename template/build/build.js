'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const fs = require('fs')
const ora = require('ora')
const rm = require('rimraf')
const archiver = require('archiver')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const getZip = () => {
  var array = fs.readdirSync(path.resolve('./')).filter(el => /^\d+-\d+-\d+_\d+-\d+-\d+.zip$/.test(el))
  return array && array[0] ? array[0] : ''
}
const pv = (v) => v < 10 ? '0' + v : v

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // if you are using ts-loader, setting this to true will make typescript errors show up during build
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n') + chalk.cyan('  Zip compression start... \n'))
    const oldZip = getZip()
    if (oldZip) {
      console.log(chalk.bold.magenta(`  delete old zip file: `) + chalk.bold.red(`  ${oldZip}\n`))
      rm.sync(path.resolve(oldZip))
    }
  
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var newZipFileName = `${year}-${pv(month)}-${pv(day)}_${pv(hour)}-${pv(minute)}-${pv(second)}.zip`
    
    try {
      var zipoutput = fs.createWriteStream(path.resolve(newZipFileName))
      var archive = archiver('zip')
      archive.pipe(zipoutput)
      archive.directory(path.resolve('dist/'), false)
      archive.finalize()
    } catch (e) {
      console.log(chalk.red('  Zip compression failed with errors.\n'))
      process.exit(1)
    }
    console.log(chalk.bold.blue(`  ${newZipFileName} is built.\n`) + chalk.cyan('  Zip compression complete \n'))
    
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
