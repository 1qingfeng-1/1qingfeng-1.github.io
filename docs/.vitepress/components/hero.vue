<template>
    <Canvas></Canvas>
    <div class="list-wrapper">
        <Avatar />
        <List :list="recList" />
    </div>
</template>

<script setup>
import { useData } from 'vitepress';
import Avatar from './avatar.vue';
import List from './list.vue';
import { getFlatList } from '../utils/index.js';
import Canvas from './canvas.vue';

const { theme } = useData();
const indexBlacklist = ['/ARCHIVE/', '/ABOUT/'];

// 生成扁平列表
const { sidebar } = theme.value;

const list_sid = getFlatList(sidebar);

// 过滤列表数据
const LIST_AMOUNT = 16;
const recList = list_sid
    .filter((item) => item.updateTime && !indexBlacklist.includes(item.parentLink))
    .sort((a, b) => {
        const av = new Date(a.updateTime).getTime();
        const bv = new Date(b.updateTime).getTime();
        return bv - av;
    })
    .filter((item, index) => index < LIST_AMOUNT);
</script>

