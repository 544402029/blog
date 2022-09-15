export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-4eaf9f84","v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690","v-2e3eac9e","v-4c863446","v-bf720700","v-0978b044","v-fffb8e28","v-3fe70238","v-3ff1c3c2","v-aa868a64","v-7ebd115b","v-93549d90","v-6904a759","v-dfaaaf36","v-a00db5e0","v-167efcb8","v-496c8ece","v-325b9b85","v-054c9f46","v-59fd6398","v-33eb7b2a","v-59dc0289","v-5bd04617","v-6499f143","v-e8cab32e","v-d16eb3ce","v-9319eb5a","v-25acfb74","v-6c96681a","v-032caf0c","v-4372152d","v-1a431f1a","v-ae876fde","v-040e490f","v-ba921afe","v-64404260","v-1924ed22","v-7b91f602","v-8163926e","v-0c285c48","v-0e8cf552","v-47234dee","v-4b350b36","v-12a814e1"]}},"encrypted":{"/":{"path":"/encrypted/","keys":["v-bf720700"]}},"slide":{"/":{"path":"/slide/","keys":["v-2e3eac9e"]}},"star":{"/":{"path":"/star/","keys":["v-4eaf9f84","v-5deafbd7","v-0c0c61ab","v-0538ff2f"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690","v-4eaf9f84"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
