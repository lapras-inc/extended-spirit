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


  // getProject('6048000e343b9430fb74ecf9', '6048054642d878641215a440')
  createProject('6048000e343b9430fb74ecf9')

  // fetch('https://app.holaspirit.com/api/me', {
  //   headers: {
  //     'authorization': 'Bearer default:xxx'
  //   }
  // }).then(response => response.json()).then((resp) => {
  //   alert(JSON.stringify(resp));
  // });
});




const getProject = async (organizationId, projectId) => {
  fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects/${projectId}`, {
    headers: {
      'authorization': 'Bearer default:xxx'
    }
  }).then(response => response.json()).then((resp) => {
    alert(JSON.stringify(resp));
  }).catch(error => {alert(error.message)});
}

const createProject = async (organizationId) => {
  fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects`, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer default:xxx',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title: '素晴らしいプロジェクト',
      circle: '6048015b409fe014e330f40c',
      status: 'current',
    }),
  }).then(response => response.json()).then((resp) => {
    alert(JSON.stringify(resp));
  }).catch(error => {alert(error.message)});
};
