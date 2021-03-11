chrome.runtime.onInstalled.addListener(() => {
    const parent = chrome.contextMenus.create({
      id: 'parent',
      title: '親メニュー'
    });
    chrome.contextMenus.create({
      id: 'child1',
      parentId: 'parent',
      title: '子メニュー1'
    });
  });
  
  // メニューをクリック時に実行
  chrome.contextMenus.onClicked.addListener(item => {
    console.log(item);
    console.log(item.menuItemId);
    alert(item);
  });
  