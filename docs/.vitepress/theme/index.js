import DefaultTheme from 'vitepress/theme';
import CustomSlot from '../components/customSlot.vue';
import '../styles/common.styl';
import '../styles/markdown.styl';
import '../styles/list.styl';

import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';

export default {
    extends: DefaultTheme,
    Layout: CustomSlot,

    setup(){
        const { frontmatter } = useData();
        const route = useRoute();
        // giscus配置
        giscusTalk({
            repo: '1qingfeng-1/bolgs_issues', //仓库
            repoId: 'R_kgDOLbOURA', //仓库ID
            category: 'Announcements', // 讨论分类
            categoryId: 'DIC_kwDOLbOURM4Cdsex', //讨论分类ID
            mapping: 'pathname',
            inputPosition: 'bottom',
            lang: 'zh-CN',
            }, 
            {
              frontmatter, route
            },
            //默认值为true，表示已启用，此参数可以忽略；
            //如果为false，则表示未启用
            //您可以使用“comment:true”序言在页面上单独启用它
            true
          );
    },
};