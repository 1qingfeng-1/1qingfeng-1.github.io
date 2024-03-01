<template>
    <ol>
        <li v-for="(item, index) in recList" :key="index" @click="router.go(item.link)">
            <span class="dir">{{ item.parentText }} / </span>
            <span class="tit">{{ item.text || '' }}</span>
            <span class="date">{{ item.updateTime }}</span>
        </li>
    </ol>
</template>

<script setup>
import { useData, useRouter } from 'vitepress';

const { theme } = useData();
const router = useRouter();

// 生成扁平列表
const { sidebar } = theme.value;
const list = [];
Object.keys(sidebar).forEach((dir) => {
    const onlyChild = sidebar[dir][0]; // ! 有且仅有一个子栏目
    onlyChild.items.forEach((item) =>
        list.push({
            ...item,
            parentLink: dir,
            parentText: onlyChild.text,
            tags: item.tags && item.tags.split('|'), 
        })
    );
});

// 过滤列表数据
const LIST_AMOUNT = 15; // 显示最新15条
const recList = list
    .filter((item) => item.updateTime)
    .sort((a, b) => {
        const av = new Date(a.updateTime).getTime();
        const bv = new Date(b.updateTime).getTime();
        return bv - av;
    })
    .filter((item, index) => index < LIST_AMOUNT);
</script>
