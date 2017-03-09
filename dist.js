/**
 * Created by hujun on 2017/2/28.
 */

const path = require("path");
const nunjucks = require("nunjucks");
const fse = require('fs-extra');

let files = [
  'web/index.html',
  'web/login.html',
  // 施工日志管理
  'web/shigongrizhiguanli.html',
  // 报检管理
  'web/baojianguanli.html',
  'web/baojianguanli_new.html',
  // 混凝土使用管理
  'web/hunningtushiyongguanli.html',
  'web/hunningtushiyongguanli_new.html',
  // 用户权限管理
  'web/yonghuquanxianguanli.html',
  'web/yonghuquanxianguanli_new.html',
  'web/yonghuquanxianguanli_mima.html',
  'web/yonghuquanxianguanli_quanxian.html',
  // 知识管理
  'web/zhishiguanli.html',
  'web/zhishiguanli_guifan.html',
  'web/zhishiguanli_zoyezhidaoshu.html',
  'web/zhishiguanli_zhiliangkongzhidian.html',
  'web/zhishiguanli_tuzhi.html',
  'web/zhishiguanli_gongzuojihua.html',
];

files = [];

fse.readdirSync( path.join(__dirname, "src/web") ).forEach(function(item) {
  files.push('web/'+item);
});

fse.readdirSync( path.join(__dirname, "src/wap") ).forEach(function(item) {
  files.push('wap/'+item);
});

console.log(files);

//return;

let tpl = nunjucks.configure(path.join(__dirname, "src"), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  noCache: false,
  watch:false
});

// 先清空目录
console.log("清空dist目录...");
fse.emptydirSync(path.join(__dirname, "../proManagement/src"));

// 拷贝文件目录
console.log("拷贝static目录...");
fse.copySync(path.join(__dirname, "src/static"), path.join(__dirname, "../proManagement/src/static"));


// 渲染模板，然后写入文件
files.forEach((item, index) => {
  console.log(item, index);
  tpl.render(item, {}, (err, result) => {
    console.log(result);
    let file = path.join(__dirname, "../proManagement/src", item);

    fse.ensureFile(file, err => {
      if(err) {
        console.log("创建目录失败");
      } else {
        fse.writeFile(file, result, (e) => {
          console.log("写入文件成功");
        });
      }
    });

  });
});

