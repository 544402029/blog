export const data = JSON.parse("{\"key\":\"v-0538ff2f\",\"path\":\"/posts/article/article2.html\",\"title\":\"文章 2\",\"lang\":\"en-US\",\"frontmatter\":{\"icon\":\"edit\",\"date\":\"2022-01-02T00:00:00.000Z\",\"category\":[\"CategoryA\"],\"tag\":[\"tag A\",\"tag B\"],\"star\":true},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"标题 2\",\"slug\":\"标题-2\",\"link\":\"#标题-2\",\"children\":[{\"level\":3,\"title\":\"标题 3\",\"slug\":\"标题-3\",\"link\":\"#标题-3\",\"children\":[]}]}],\"readingTime\":{\"minutes\":0.11,\"words\":34},\"filePathRelative\":\"posts/article/article2.md\",\"localizedDate\":\"January 2, 2022\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
