解决 UG 及 Wechat Web Browser flex 布局问题
1.  一些简单的宽度就不要用flex布局了，百分比和float配合兼容性更好。
2.  如果非要使用flex，flex布局元素的子元素一定要是块元素（inline-block都不行）
3.  tranform应用需要display:block;