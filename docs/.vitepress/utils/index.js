// 从 url 取参
export const getUrlParam = (key) => {
    const str = window.location.search;
    const reg = new RegExp('[?|&]' + key + '=([^&]+)');
    const match = str.match(reg);
    const param = match && match[1];
    return param ? decodeURIComponent(param) : null;
};

// 兼容alert的通知
export const notify = (body) => {
    const title = '提个醒：';
    const icon = '/assets/img/avatar-head.png';
    if (!('Notification' in window)) {
        alert(body);
    } else if (Notification.permission === 'granted') {
        new Notification(title, { icon, body });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(title, { icon, body });
            }
        });
    }
};

// 基于theme.sidebar生成扁平列表
export const getFlatList = (sidebar) => {
    const list = [];
  
    const processItem = (item, parentLink, parentText) => {
      if (item.children) {
        item.children.forEach(child => processItem(child, item.link, item.text));
      } else {
        list.push({
          ...item,
          parentLink: parentLink,
          parentText: parentText,
          tags: item.tags && item.tags.split('|'),
        });
      }
    };
  
    Object.keys(sidebar).forEach((dir) => {
      sidebar[dir].forEach(item => processItem(item, dir, item.text));
    });
  
    return list;
  };

// LocalStorage
export const getLS = (key, defaultData = '{}') => {
    const LS = JSON.parse(window.localStorage.getItem(key) ?? defaultData);
    return LS;
};

export const setLS = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};

export const removeLS = (key) => {
    window.localStorage.removeItem(key);
};