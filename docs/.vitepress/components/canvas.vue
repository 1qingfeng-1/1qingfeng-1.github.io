<template>
    <canvas
        class="canvas"
        ref="canvasRef"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
    />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, withDefaults } from 'vue'

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const globalCompositeOperation = ref("lighter")
const canvasRef = ref(null)
let ctx = null

const initCanvas = () => {
    const canvas = canvasRef.value
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)

    if (globalCompositeOperation.value) {
        ctx.globalCompositeOperation = globalCompositeOperation.value
    }
}

const generateParams = () => {
    const width = window.innerWidth
        const height = window.innerHeight
        const emptyX = width > 400 ? 50 : 0 // 左右空白宽度
        const emptyYFront = height > 550 ? 500 : 50 // 上空白位置
        const emptyYRear = height > 640 ? 120 : 0 // 下空白位置
        const r = getRandomInt(10, 25)
        const x = getRandomInt(emptyX, width - r * 2 - emptyX)
        const y = getRandomInt(emptyYFront, height - r * 2 - emptyYRear)
        const red = getRandomInt(0, 255)
        const green = getRandomInt(0, 255)
        const blue = getRandomInt(0, 255)
        const opacity = Math.random() * 0.05 + 0.05
        const color = `rgba(${red}, ${green}, ${blue}, ${opacity})`
        const isStroke = Math.random() > 0.5
        return { x, y, r, color, isStroke }
}

const drawRect = () => {
    const { x, y, r, color, isStroke } = generateParams()
    if (isStroke) {
        ctx.strokeStyle = color
        ctx.strokeRect(x, y, r * 2, r * 2)
    } else {
        ctx.fillStyle = color
        ctx.fillRect(x, y, r * 2, r * 2)
    }
}

const drawArc = () => {
    const { x, y, r, color, isStroke } = generateParams();
    ctx.beginPath();
    if (isStroke) {
        ctx.strokeStyle = color;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    } else {
        ctx.fillStyle = color;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.closePath();
}

const resize = () => {
    initCanvas()

    const width = window.innerWidth
    const density = width > 640 ? 20 : 15 

    for (let i = 0; i < density; i++) {
        drawArc()
    }
    for (let j = 0; j < density; j++) {
        drawRect()
    }
}

onMounted(() => {
    resize()
    window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.canvas {
    width: 100%;
    height: 100%;
    display: block;
    background: transparent;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
}
</style>