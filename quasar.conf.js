// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
let path = require("path");

module.exports = function(ctx) {
  return {
    supportIE: true,
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      "i18n",
      "axios",
      "notify-defaults",
      "calendar",
      "vuelidate",
      "vuehtml",
      "extra-plugins"
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ["app.sass"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      //'ionicons-v4',
      //'mdi-v4',
      "fontawesome-v5",
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font", // optional, you are not bound to itt
      "material-icons", // optional, you are not bound to it
      "material-icons-outlined", // optional, you are not bound to it
      "material-icons-round" // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: "material-icons", // Quasar icon set
      lang: "ru", // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: "auto",
      components: ["QScrollArea"],
      directives: [],
      // Quasar plugins
      plugins: ["Notify", "Cookies", "Dialog", "Loading"],
      config: {}
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: true,

    // default Settings for Source Files
    sourceFiles: {
      rootComponent: "src/App.vue",
      router: "src/router",
      store: "src/store",
      indexHtmlTemplate: "src/index.html"
    },
    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build .env variables
    build: {
      scopeHoisting: true,
      vueRouterMode: "history", // available values: 'hash', 'history'
      vueRouterBase: "/",
      showProgress: true,
      gzip: false,
      analyze: false,
      env: ctx.dev
        ? {
            VUE_APP_BASE_URL: JSON.stringify("http://10.8.8.70:4000/"),
            SOCKET_URL: JSON.stringify("http://10.8.8.70:4000/")
          }
        : {
            VUE_APP_BASE_URL: JSON.stringify("http://10.8.8.70:4000/"),
            SOCKET_URL: JSON.stringify("http://10.8.8.70:4000/")
          },
      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          //loader: 'eslint-loader',
          exclude: /node_modules/
          // options: {
          //   formatter: require('eslint').CLIEngine.getFormatter('stylish')
          // }
        });
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          "@": path.resolve(__dirname, "./src")
        };
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8088,
      // host: "10.8.8.70",
      open: true, // opens browser window automatically
      disableHostCheck: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: "NBU PERSONAL APP",
        short_name: "Pesonal",
        description: "Personal app for all Platforms",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "assets/statics/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "assets/statics/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "assets/statics/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "assets/statics/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "assets/statics/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: "org.cordova.quasar.app"
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "personal"
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  };
};
