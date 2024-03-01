<template>
    <Layout>
        
        <template #home-hero-after>
            <Hero />
        </template>

        <template #doc-before>
            <div class="doc-before-wrapper">
                <Tags />
                <LastUpdated />
                <Canvas></Canvas>
            </div>
        </template>

        <template #layout-top>
            <TopNotice />
        </template>
    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import Hero from './hero.vue';
import LastUpdated from './lastUpdated.vue';
import Tags from './tags.vue';
import TopNotice from './topNotice.vue';
import Canvas from './canvas.vue';


const { Layout } = DefaultTheme;
</script>

