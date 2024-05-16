### 你能讲一下 diff 算法吗？

diff 算法是 v-dom 中最核心，最关键的部分。

diff 即对比， 是一个广泛的概念， 如 linux diff 命令， git diff 等。

首先 DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异。那么需要的时间复杂度会是 O(n ^ 3)，这个复杂度肯定是不能接受的。

- 第一， 遍历 tree1；
- 第二， 遍历 tree2
- 第三， 排序
- 1000 个节点，要计算 1 亿次， 算法不可用

于是 React 团队优化了算法，实现了 O(n) 的复杂度来对比差异。

- 只比较同一层级， 不跨级对比
- 在实际业务中很少会去跨层的移动 DOM 元素。

只比较同一层级示意图：

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648432718451-3a70008e-afd8-4f08-8052-a507bc0141b0.png)

- 第一步先比较 tag，tag 不相同， 则直接删掉重建， 不再深度比较

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648432718383-bfda0463-52bb-4410-976d-7d78cc74bdfc.png)

如图，D 和 G 的 tag 不相同，直接删掉重建为 G，即便 E 和 F 相同， 也不会再向下进行比较

- tag 和 key， 两者都相同， 则认为是相同节点， 不再深度比较

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648432718335-2cb7306f-6d62-402f-a330-89f7f8217980.png)

示例图：


#### patchVnode



![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1647771883472-df1f0bad-45fb-45cb-968b-505c660e8d9d.png)

<a name="SVgMt"></a>

#### updateChildren

接下来就要讲一下 updateChildren 函数了。

```javascript
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx, idxInOld, elmToMove, refElm;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      nodeOps.insertBefore(
        parentElm,
        oldStartVnode.elm,
        nodeOps.nextSibling(oldEndVnode.elm)
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      let elmToMove = oldCh[idxInOld];
      if (!oldKeyToIdx)
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;
      if (!idxInOld) {
        createElm(newStartVnode, parentElm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        if (sameVnode(elmToMove, newStartVnode)) {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          createElm(newStartVnode, parentElm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  }

  if (oldStartIdx > oldEndIdx) {
    refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}
```

看到代码那么多先不要着急，我们还是一点一点地讲解。

首先我们定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 VNode 的两边的索引，同时 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 分别指向这几个索引对应的 VNode 节点。

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433115816-e7a906ae-7f7d-44fa-b180-ae5702af45a6.webp)

接下来是一个 while 循环，在这过程中，oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 会逐渐向中间靠拢。

```javascript
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx)
```

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433115788-20ed85db-fec8-470d-a659-53e508b39d6b.webp)

首先当 oldStartVnode 或者 oldEndVnode 不存在的时候，oldStartIdx 与 oldEndIdx 继续向中间靠拢，并更新对应的 oldStartVnode 与 oldEndVnode 的指向（注：下面讲到的 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 移动都会伴随着 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 的指向的变化，之后的部分只会讲 Idx 的移动)。

```javascript
if (!oldStartVnode) {
  oldStartVnode = oldCh[++oldStartIdx];
} else if (!oldEndVnode) {
  oldEndVnode = oldCh[--oldEndIdx];
}
```

接下来这一块，是将 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 两两比对的过程，一共会出现 2\*2=4 种情况。

```javascript
else if (sameVnode(oldStartVnode, newStartVnode)) {
    patchVnode(oldStartVnode, newStartVnode);
    oldStartVnode = oldCh[++oldStartIdx];
    newStartVnode = newCh[++newStartIdx];
} else if (sameVnode(oldEndVnode, newEndVnode)) {
    patchVnode(oldEndVnode, newEndVnode);
    oldEndVnode = oldCh[--oldEndIdx];
    newEndVnode = newCh[--newEndIdx];
} else if (sameVnode(oldStartVnode, newEndVnode)) {
    patchVnode(oldStartVnode, newEndVnode);
    nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
    oldStartVnode = oldCh[++oldStartIdx];
    newEndVnode = newCh[--newEndIdx];
} else if (sameVnode(oldEndVnode, newStartVnode)) {
    patchVnode(oldEndVnode, newStartVnode);
    nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
    oldEndVnode = oldCh[--oldEndIdx];
    newStartVnode = newCh[++newStartIdx];
}
```

首先是 oldStartVnode 与 newStartVnode 符合 sameVnode 时，说明老 VNode 节点的头部与新 VNode 节点的头部是相同的 VNode 节点，直接进行 patchVnode，同时 oldStartIdx 与 newStartIdx 向后移动一位。

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433115821-44a78e25-d47f-4d9d-98a0-7ea4fab5248e.webp)

其次是 oldEndVnode 与 newEndVnode 符合 sameVnode，也就是两个 VNode 的结尾是相同的 VNode，同样进行 patchVnode 操作并将 oldEndVnode 与 newEndVnode 向前移动一位。

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433115823-420fcacf-5baa-4cd8-8d3d-67a041495024.webp)

接下来是两种交叉的情况。

先是 oldStartVnode 与 newEndVnode 符合 sameVnode 的时候，也就是老 VNode 节点的头部与新 VNode 节点的尾部是同一节点的时候，将 oldStartVnode.elm 这个节点直接移动到 oldEndVnode.elm 这个节点的后面即可。然后 oldStartIdx 向后移动一位，newEndIdx 向前移动一位。

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433115823-1c35cbeb-59a6-422e-8f61-1b33db20c3a4.webp)

同理，oldEndVnode 与 newStartVnode 符合 sameVnode 时，也就是老 VNode 节点的尾部与新 VNode 节点的头部是同一节点的时候，将 oldEndVnode.elm 插入到 oldStartVnode.elm 前面。同样的，oldEndIdx 向前移动一位，newStartIdx 向后移动一位。

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433116199-ba05c673-ee27-4ebd-9f88-95cb4181499c.webp)

最后是当以上情况都不符合的时候，这种情况怎么处理呢？

```javascript
else {
    let elmToMove = oldCh[idxInOld];
    if (!oldKeyToIdx) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
    idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;
    if (!idxInOld) {
        createElm(newStartVnode, parentElm);
        newStartVnode = newCh[++newStartIdx];
    } else {
        elmToMove = oldCh[idxInOld];
        if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode);
            oldCh[idxInOld] = undefined;
            nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
        } else {
            createElm(newStartVnode, parentElm);
            newStartVnode = newCh[++newStartIdx];
        }
    }
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
    let i, key
    const map = {}
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key
        if (isDef(key)) map[key] = i
    }
    return map
}
```

createKeyToOldIdx 的作用是产生 key 与 index 索引对应的一个 map 表。比如说：

```javascript
[
  { xx: xx, key: "key0" },
  { xx: xx, key: "key1" },
  { xx: xx, key: "key2" },
];
```

在经过 createKeyToOldIdx 转化以后会变成：

```javascript
{
    key0: 0,
    key1: 1,
    key2: 2
}
```

我们可以根据某一个 key 的值，快速地从 oldKeyToIdx（createKeyToOldIdx 的返回值）中获取相同 key 的节点的索引 idxInOld，然后找到相同的节点。<br />如果没有找到相同的节点，则通过 createElm 创建一个新节点，并将 newStartIdx 向后移动一位。

```javascript
if (!idxInOld) {
  createElm(newStartVnode, parentElm);
  newStartVnode = newCh[++newStartIdx];
}
```

否则如果找到了节点，同时它符合 sameVnode，则将这两个节点进行 patchVnode，将该位置的老节点赋值 undefined（之后如果还有新节点与该节点 key 相同可以检测出来提示已有重复的 key ），同时将 newStartVnode.elm 插入到 oldStartVnode.elm 的前面。同理，newStartIdx 往后移动一位。<br />![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433116225-39f789ab-1120-4a08-a9c3-81fa60581216.webp)

```javascript
else {
    elmToMove = oldCh[idxInOld];
    if (sameVnode(elmToMove, newStartVnode)) {
        patchVnode(elmToMove, newStartVnode);
        oldCh[idxInOld] = undefined;
        nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
    }
}
```



如果不符合 sameVnode，只能创建一个新节点插入到 parentElm 的子节点中，newStartIdx 往后移动一位。<br />![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433116287-37827ccf-2bdd-4b04-8c78-16578e0075e4.webp)

```javascript
else {
    createElm(newStartVnode, parentElm);
    newStartVnode = newCh[++newStartIdx];
}
```

最后一步就很容易啦，当 while 循环结束以后，如果 oldStartIdx > oldEndIdx，说明老节点比对完了，但是新节点还有多的，需要将新节点插入到真实 DOM 中去，调用 addVnodes 将这些节点插入即可。

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433116667-03059827-d1e5-4298-bdf7-cab9271e703d.webp)

同理，如果满足 newStartIdx > newEndIdx 条件，说明新节点比对完了，老节点还有多，将这些无用的老节点通过 removeVnodes 批量删除即可。

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1648433116310-efdb88ec-4162-4552-b16b-85d4e151f976.webp)

```javascript
if (oldStartIdx > oldEndIdx) {
  refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
  addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
} else if (newStartIdx > newEndIdx) {
  removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
}
```

![](https://blog-picgo-typora.oss-cn-hangzhou.aliyuncs.com/1647772080935-63a9133c-134c-4827-a160-d475608ac95e.png)
