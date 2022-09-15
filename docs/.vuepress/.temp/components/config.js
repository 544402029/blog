import { h } from "vue";
import { defineClientConfig } from "@vuepress/client";
import Badge from "E:/代码示例/vuepress-starter2.0/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "E:/代码示例/vuepress-starter2.0/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "E:/代码示例/vuepress-starter2.0/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Badge", Badge);
    app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
    
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
    
  ],
});