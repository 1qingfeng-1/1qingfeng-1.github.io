import { getSidebar, getBanners, COLS } from './dev'


import { pagefindPlugin } from 'vitepress-plugin-pagefind'

export default {
    vite:{
        plugins:[pagefindPlugin()],
    },
    title: '清风', // 博客的标题
    description: '清风的个人博客', // 博客的介绍
    outDir: "./dist",
    lastUpdated: true,
    markdown: {
        lineNumbers: true,
        breaks: true,
    },
    head:[
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        logo: "images/logo.png",   // 页面上显示logo
        nav:[  // 页面右上角的导航
            { text: '首页', link: '/' }, ...COLS
        ],
        docFooter: { prev: '上一篇', next: '下一篇' },
        sidebar: getSidebar(),
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present Evan You'
        },
        search: {
            provider: 'local',
        },
        banner: getBanners(),
    },
}