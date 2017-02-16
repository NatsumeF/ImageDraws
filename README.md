# ImageDraws
//JavaScript 插件  图片点击弹出一个层 可以放大 缩小 下载图片;


使用方法
项目引入 <script src="imageDraws.js"></script> 无依赖项;
由于未使用CSS文件 UI需要修改JS文件 如有需求 可以issues;


 var xxx = new ImageDraws(doms);
 

 
 //doms 可以是单独的dom 也可以是一个nodelist集合(document.getElementsByClassName | document.querySelectorAll)
 // html文件中 如果dom不存在data-down-src 打开和下载的图片将会是dom的src；

   自定义功能；
   
  xxx.colseCallBack(fn);点击关闭按钮时触发的回调函数;
  
  xxx.dowImagAll(); 点击下载Dom所有图片文件;  关于这个下载功能存在一个问题：非Google浏览器如果未设置默认下载，
                      会弹出Doms个对话框来，影响用户体验；
  xxx.removeDown(); 移除下载按钮；



  ps： 还未兼容ie9哟 兼容IE10+ 

   

 
  欢迎issues;

  554096147@qq.com || llandpp11@gmail.com
