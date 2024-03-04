import { getSidebar, getBanners, COLS } from './dev'




export default {
    title: '清风', // 博客的标题
    description: '清风个人博客', // 博客的介绍
    outDir: "./dist",
    lastUpdated: true,
    markdown: {
        lineNumbers: true,
        breaks: true,
        image: {
            // 开启图片懒加载
            lazyLoading: true
        }
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
        banner: getBanners(),
        outline: { 
            level: [2,4], // 显示2-4级标题
            // level: 'deep', // 显示2-6级标题
            label: '当前页大纲' // 文字显示
        },

        //本地搜索
        search: {
            provider: 'local',
            options: {
            locales: {
                zh: {
                translations: {
                    button: {
                    buttonText: '搜索文档',
                    buttonAriaLabel: '搜索文档'
                    },
                    modal: {
                    noResultsText: '无法找到相关结果',
                    resetButtonTitle: '清除查询条件',
                    footer: {
                        selectText: '选择',
                        navigateText: '切换'
                    },
                    },
                },
                },
            },
            },
        },
    }
    
}