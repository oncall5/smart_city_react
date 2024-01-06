// const path = require('path');
// console.log('Config overrides applied!')
// module.exports = function override(config, env) {
//   // 使用 less-loader 处理 Less 文件
//   console.log('Config overrides applied!')
//   config.module.rules.push({
//     test: /\.less$/,
//     use: [
//       {
//         loader: 'less-loader',
//         options: {
//           lessOptions: {
//             javascriptEnabled: true,
//           },
//         },
//       },
//     ],
//     include: path.resolve(__dirname, 'src'),
//   });

//   return config;
// };
// const { override, addLessLoader } = require('customize-cra');
// module.exports = override(
//   addLessLoader({
//     javascriptEnabled: true,
//     modifyVars: { '@primary-color': '#1DA57A' },
//   }),
// );
console.log('Config overrides applied!')
const { override, addLessLoader ,fixBabelImports} = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
}),
addLessLoader({
    lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': 'green' },
    }
}),
)