import matter from 'gray-matter';
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * 顶部导航（一级）
 */
export const COLS = [
    { text: '体验', link: '/experience/' },
    { text: '编程', link: '/codes/' },
    { text: '随想', link: '/essay/' },
    { text: '记录', link: '/notes/' },
    { text: '推荐', link: '/goods/' },
    { text: '其他', link: '/other/' },
];

const IGNORE_TEXT = '[TODO]';
const INDEX_FILE = 'index';


const getFilesBySidebar = (dir, linkPrefix = '') => {
    const dirents = readdirSync(dir, { withFileTypes: true });
    let files = [];
    let directories = [];
  
    for (const dirent of dirents) {
      const res = join(dir, dirent.name);
      if (dirent.isDirectory()) {
        directories.push({
          text: dirent.name,
          collapsed: true,
          items: getFilesBySidebar(res, `${linkPrefix}${dirent.name}/`),
        });
      } else if (lstatSync(res).isFile()) {
        const path = res;
        const filename = dirent.name.replace(/\.md$/, '');
        const filepath = `${linkPrefix}${filename}`;
        const { data } = (matter.read(path) || {});
        const file = {
          ...data,
          text: data?.title ?? filename,
          link: filepath,
        };
        files.push(file);
      }
    }
    return [...directories, ...files];
  };

  /**
 * ! 各分类只对应单一文件夹，考虑多级目录、混合目录的情况
 * @description 根据 `COLS` 生成侧边导航（二级）
 * @returns { SidebarObject } sidebar
 */
  export const getSidebar = () => {
    const list = {};
  
    COLS.forEach(({ link, text }) => {
      const dir = `./docs${link}`;
      const files = getFilesBySidebar(dir, link);
  
      list[link] = [
        {
          text,
          items: files
            .filter(({ text, link, items }) => {
              if (items) {
                return true;
              } else {
                return link.indexOf(INDEX_FILE) === -1 && text.indexOf(IGNORE_TEXT) === -1;
              }
            })
            .sort((a, b) => {
              if (a.items) {
                return -1;
              } else if (b.items) {
                return 1;
              } else {
                const av = a['updateTime'] ? new Date(a['updateTime']).valueOf() : 0;
                const bv = b['updateTime'] ? new Date(b['updateTime']).valueOf() : 0;
                return bv - av;
              }
            }),
        },
      ];
    });
  
    return list;
  };


  const getFilesByBanners = (dir, linkPrefix = '') => {
    const dirents = readdirSync(dir, { withFileTypes: true });
    let files = [];
  
    for (const dirent of dirents) {
      const res = join(dir, dirent.name);
      if (dirent.isDirectory()) {
        files = files.concat(getFilesByBanners(res, `${linkPrefix}${dirent.name}/`));
      } else if (lstatSync(res).isFile()) {
        const path = res;
        const filename = dirent.name.replace(/\.md$/, '');
        const filepath = `${linkPrefix}${filename}`;
        const { data, bannerNote } = (matter.read(path) || {});
        if (data?.banner) {
          files.push({
            ...data,
            nav: bannerNote ?? '',
            link: data.link ?? filepath,
          });
        }
      }
    }

    return files;
  };

/**
 * @description 生成banner列表，将所有带banner的内容筛选出来
 */
    export const getBanners = () => {
        const list = [];

        COLS.forEach(({ link, text }) => {
        const dir = `./docs${link}`;
        const files = getFilesByBanners(dir, link);

        files.forEach((file) => {
            list.push({
            ...file,
            nav: file.nav || text
            });
        });
        });

        return list;
    };