<!-- .vitepress/components/MyLayout.vue -->
<template>
    <Layout>
        <template #doc-before>
            <div class="doc-before-wrapper">
                <Tags />
                <LastUpdated />
            </div>
        </template>
    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import LastUpdated from './lastUpdated.vue';
import Tags from './tags.vue';

const { Layout } = DefaultTheme;
</script>

