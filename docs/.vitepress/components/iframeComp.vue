<template>
    <iframe class="video-iframe" width="100%" v-resize="{ log: true }" frameborder="no" scrolling="no" seamless="" allowfullscreen="allowfullscreen" :src="ihtml"></iframe>
</template>


<script setup>
import { defineProps, onMounted } from 'vue'

const props = defineProps({
    ihtml: String
})

onMounted(() => {
    let changeVideoIframe = () => {
        const video = document.getElementsByClassName('video-iframe');
            const width = document.getElementsByClassName('video-iframe')[0].scrollWidth;
            for(let i = 0;i<video.length;i++){
                video[i].style.height = width*0.75+'px'
            }
    }

    changeVideoIframe()
    window.onresize = function(){changeVideoIframe()}
})

</script>