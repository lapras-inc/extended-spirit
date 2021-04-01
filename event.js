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
  const token = await getAuthToken()

  fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title: '〇〇さんオンボーディングチェックリスト',
      circle: '6048015b409fe014e330f40c',
      status: 'current',
      position: 0,
      link: 'https://lapras.com/test',
      role: '6048041257418f4871199f3e',
      body: '<p>チェックリストのサンプルです</p>',
      bulkTodoLists: [
        {
          name: "グループ1",
          items: [
            {name: "チェック１"},
            {name: "チェック2"}
          ]
        },
        {
          name: "グループ２",
          items: [
            {name: "チェック3", checked: true}
          ]
        }
      ],
      members: [],
    }),
  }).then(response => response.json()).then((resp) => {
    alert(JSON.stringify(resp));
  }).catch(error => {alert(error.message)});
};

const getAuthToken = async () => {
  console.log(chrome.cookies)
  const cookies = await new Promise((resolve, reject) => {
    chrome.cookies.getAll({domain: 'app.holaspirit.com', name: 'holaAppToken'},
        (cookie)=>{
      resolve(cookie)
    })
  })
  const accessToken =  JSON.parse(decodeURIComponent(cookies[0].value)).access_token
  console.log(accessToken)
  return accessToken
};


