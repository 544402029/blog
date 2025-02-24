# Electron+Vue3+AI+云存储--实战跨平台桌面应用

> [Electron+Vue3+AI+云存储--实战跨平台桌面应用](https://coding.imooc.com/learn/list/907.html)课程笔记记录。有需要请购买正版课程。



##  **Electron基础快速入门**

![image-20250218111810746](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218111810746.png)

![image-20250218111907933](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218111907933.png)![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218112048678.png)

### Electron的缺点

![image-20250218112337060](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218112337060.png)

- **优点**：
  - 允许开发者使用熟悉的Web技术栈高效地开发跨平台桌面应用。
  - 提供丰富的API和工具支持。
- **缺点**：
  - 打包体积较大。
  - 性能通常不如原生应用。



### 预加载脚本preload的使用

![image-20250218113626837](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218113626837.png)

![image-20250218113726442](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250218113726442.png)



![image-20250218140554150](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/image-20250224095745335.png)

1. **进程间通信**：Electron应用中有两种类型的进程 - 主进程和渲染进程。它们通过IPC（进程间通信）进行交流。主进程使用`ipcMain`模块来定义通信通道，而渲染进程则利用`ipcRenderer`来调用这些通道。

2. **安全性问题**：直接启用Node集成并关闭上下文隔离虽然让渲染进程能够轻松访问Node.js API，但这样也带来了安全隐患，因为第三方脚本可能滥用这个权限执行恶意操作。

3. **预加载脚本的作用**：为了解决上述安全问题，推荐使用预加载脚本来增强应用程序的安全性。预加载脚本可以在保持与DOM和Node API的交互的同时限制渲染进程对某些API的直接访问。

4. **如何设置预加载脚本**：

   - 在主进程中配置`webPreferences`选项时指定`preload`属性指向预加载脚本文件。
   - 使用`contextBridge`API在预加载脚本里暴露特定的方法或变量给渲染进程，从而控制哪些功能是可访问的。

   