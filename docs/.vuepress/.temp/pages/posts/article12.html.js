export const data = JSON.parse("{\"key\":\"v-5deafbd7\",\"path\":\"/posts/article12.html\",\"title\":\"文章 12\",\"lang\":\"en-US\",\"frontmatter\":{\"icon\":\"edit\",\"date\":\"2022-01-12T00:00:00.000Z\",\"category\":[\"CategoryA\",\"CategoryB\"],\"tag\":[\"tag A\",\"tag B\"],\"star\":true},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"标题 2\",\"slug\":\"标题-2\",\"link\":\"#标题-2\",\"children\":[{\"level\":3,\"title\":\"标题 3\",\"slug\":\"标题-3\",\"link\":\"#标题-3\",\"children\":[]}]}],\"readingTime\":{\"minutes\":0.12,\"words\":35},\"filePathRelative\":\"posts/article12.md\",\"localizedDate\":\"January 12, 2022\"}")

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
