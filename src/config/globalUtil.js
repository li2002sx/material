/**
 * 自定义常用类
 */

const global = module.exports

global.tip = (type, text) => {
  this.$vux.toast.show({
    type: type,
    text: text,
    position: 'middle'
  })
}

// module.exports = {
//   global
// }
