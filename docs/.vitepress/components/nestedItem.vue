<template>
    <li>
      <ul v-if="item.items && item.items.length">
        <nested-item v-for="(subItem, index) in item.items" :key="index" :item="subItem"></nested-item>
      </ul>
      <div v-else>
        <span class="date">{{ item.updateTime }}</span>
        <a class="tit" :href="item.link">{{ item.title || '' }}</a>
        <span class="tags-wrapper" v-if="item.tags && item.tags.length">
          <a class="tag" :href="`/tags.html?tag=${tag}`" v-for="tag in item.tags.split('|')" :key="tag">{{ tag }}</a>
        </span>
      </div>
    </li>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    item: Object
  })
  </script>