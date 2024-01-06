const CracoLessPlugin = require('craco-less');
console.log('craco-less applied')
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderoptions: {
                    lessoptions: {
                        modifyVars: { '@primary-color ' : '#eeeeee'},
                        javascriptEnabled: true,
                    }
                }
            }
        }
    ]
}