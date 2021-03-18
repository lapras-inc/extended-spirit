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


  getProject('6048000e343b9430fb74ecf9', '6048054642d878641215a440')

  // fetch('https://app.holaspirit.com/api/me', {
  //   headers: {
  //     'authorization': 'Bearer default:NzM3NWQwYWE4M2U5MzZkMTUxNDRkOTQwZWRhZTFjMWJhZWIyNGM0NTQ4YTllZDUwZjRjY2FlNzY5MGE0OTg1Mg'
  //   }
  // }).then(response => response.json()).then((resp) => {
  //   alert(JSON.stringify(resp));
  // });
});

const getProject = async (organizationId, projectId) => {
  fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects/${projectId}`, {
    headers: {
      'authorization': 'Bearer default:NzM3NWQwYWE4M2U5MzZkMTUxNDRkOTQwZWRhZTFjMWJhZWIyNGM0NTQ4YTllZDUwZjRjY2FlNzY5MGE0OTg1Mg'
    }
  }).then(response => response.json()).then((resp) => {
    alert(JSON.stringify(resp));
  }).catch(error => {alert(error.message)});
}

