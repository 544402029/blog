(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{439:function(t,s,a){"use strict";a.r(s);var e=a(65),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"javascript正则迷你书"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#javascript正则迷你书"}},[t._v("#")]),t._v(" JavaScript正则迷你书")]),t._v(" "),a("h2",{attrs:{id:"匹配攻略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#匹配攻略"}},[t._v("#")]),t._v(" 匹配攻略")]),t._v(" "),a("h3",{attrs:{id:"范围表示法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#范围表示法"}},[t._v("#")]),t._v(" 范围表示法")]),t._v(" "),a("p",[t._v("比如"),a("code",[t._v("[123456abcdefGHIJKLM]")]),t._v("，可以写成"),a("code",[t._v("[1-6a-fG-M]")]),t._v("。用连字符-来省略和简写。")]),t._v(" "),a("h3",{attrs:{id:"排除字符组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#排除字符组"}},[t._v("#")]),t._v(" 排除字符组")]),t._v(" "),a("p",[t._v('纵向模糊匹配，还有一种情形就是，某位字符可以是任何东西，但就不能是"a"、"b"、"c"。')]),t._v(" "),a("p",[t._v("此时就是排除字符组（反义字符组）的概念。例如"),a("code",[t._v("[^abc]")]),t._v('，表示是一个除"a"、"b"、"c"之外的任意一个字符。字符组的第一位放^（脱字符），表示求反的概念。')]),t._v(" "),a("h4",{attrs:{id:"常见的简写形式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常见的简写形式"}},[t._v("#")]),t._v(" 常见的简写形式:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("\\d")]),t._v("就是"),a("code",[t._v("[0-9]")]),t._v("。表示是一位数字。记忆方式：其英文是digit（数字）。")]),t._v(" "),a("li",[a("code",[t._v("\\D")]),t._v("就是"),a("code",[t._v("[^0-9]")]),t._v("。表示除数字外的任意字符。")]),t._v(" "),a("li",[a("code",[t._v("\\w")]),t._v("就是"),a("code",[t._v("[0-9a-zA-Z_]")]),t._v("。表示数字、大小写字母和下划线。记忆方式：w是word的简写，也称单词字符。")]),t._v(" "),a("li",[a("code",[t._v("\\W")]),t._v("是"),a("code",[t._v("[^0-9a-zA-Z_]")]),t._v("。非单词字符。")]),t._v(" "),a("li",[a("code",[t._v("\\s")]),t._v("是"),a("code",[t._v("[ \\t\\v\\n\\r\\f]")]),t._v("。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。")]),t._v(" "),a("li",[a("code",[t._v("\\S")]),t._v("是"),a("code",[t._v("[^ \\t\\v\\n\\r\\f]")]),t._v("。 非空白符。")]),t._v(" "),a("li",[a("code",[t._v(".")]),t._v("就是[^\\n\\r\\u2028\\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。记忆方式：想想省略号...中的每个点，都可以理解成占位符，表示任何类似的东西。")])]),t._v(" "),a("p",[t._v("如果要匹配任意字符怎么办？可以使用"),a("code",[t._v("[\\d\\D]")]),t._v("、"),a("code",[t._v("[\\w\\W]")]),t._v("、"),a("code",[t._v("[\\s\\S]")]),t._v("和"),a("code",[t._v("[^]")]),t._v("中任何的一个。")]),t._v(" "),a("h3",{attrs:{id:"贪婪匹配和惰性匹配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#贪婪匹配和惰性匹配"}},[t._v("#")]),t._v(" 贪婪匹配和惰性匹配")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\d{2,5}")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123 1234 12345 123456"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// => ["123", "1234", "12345", "12345"]')]),t._v("\n")])])]),a("p",[t._v("其中正则"),a("code",[t._v("/\\d{2,5}/")]),t._v("，表示数字连续出现2到5次。会匹配2位、3位、4位、5位连续数字。但是其是贪婪的，它会尽可能多的匹配。你能给我6个，我就要5个。你能给我3个，我就3要个。反正只要在能力范围内，越多越好。")]),t._v(" "),a("p",[t._v("我们知道有时贪婪不是一件好事。而惰性匹配，就是尽可能少的匹配：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" regex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\d{2,5}?")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" string "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123 1234 12345 123456"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("regex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// => ["12", "12", "34", "12", "34", "12", "34", "56"]')]),t._v("\n")])])]),a("p",[t._v("其中"),a("code",[t._v("/\\d{2,5}?/")]),t._v("表示，虽然2到5次都行，当2个就够的时候，就不在往下尝试了。")]),t._v(" "),a("p",[t._v("对惰性匹配的记忆方式是：量词后面加个问号，问一问你知足了吗，你很贪婪吗？")])])}),[],!1,null,null,null);s.default=r.exports}}]);