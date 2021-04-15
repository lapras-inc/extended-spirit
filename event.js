chrome.runtime.onInstalled.addListener(() => {
  const parent = chrome.contextMenus.create({
    id: 'parent',
    title: 'extended-spirit'
  });
  chrome.contextMenus.create({
    id: 'child1',
    parentId: 'parent',
    title: 'プロジェクトのコピー'
  });
});

// メニューをクリック時に実行
chrome.contextMenus.onClicked.addListener(async (item) => {
  console.log(item);
  console.log(item.menuItemId);

  const projectUrl = prompt('プロジェクトのURLを入れてください（右クリックで「ペースト」を選択）');

  if (!projectUrl) {
    return
  }

  const projectId = new URL(projectUrl).searchParams.get('projectId');
  if (projectId) {
    const todolists = await getTodolists('6048000e343b9430fb74ecf9', projectId);
    await createProject('6048000e343b9430fb74ecf9', todolists);
  } else {
    alert('不正なURLです')
  }
});




const getProject = async (organizationId, projectId) => {
  const response = await fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects/${projectId}`, {
    headers: {
      'authorization': 'Bearer default:xxx'
    }
  })



  // fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects/${projectId}`, {
  //   headers: {
  //     'authorization': 'Bearer default:xxx'
  //   }
  // }).then(response => response.json()).then((resp) => {
  //   alert(JSON.stringify(resp));
  // }).catch(error => {alert(error.message)});
}


const getTodolists = async (organizationId, projectId) => {
  const token = await getAuthToken()

  const response = await fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects/${projectId}/todolists`, {
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
  });

  const json = await response.json();

  return json.data.map((group) => {
    return {
      name: group.name,
      items: group.items.map((itemId) => {
        const item = json.linked.todolistitems.find((item) => {
          return item.id === itemId
        });
        return {
          name: item.name
        }
      })
    }
  });

  // return [
  //   {
  //     name: "グループ100",
  //     items: [
  //       {name: "チェック１2222"},
  //       {name: "チェック2"}
  //     ]
  //   },
  //   {
  //     name: "グループ２00",
  //     items: [
  //       {name: "チェック3", checked: true}
  //     ]
  //   }
  // ];
}

const createProject = async (organizationId, todolists) => {
  const token = await getAuthToken()

  fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title: 'コピーしたやつです',
      circle: '6048015b409fe014e330f40c',
      status: 'current',
      position: 0,
      link: 'https://lapras.com/test',
      role: '6048041257418f4871199f3e',
      body: '<p>チェックリストのサンプルです</p>',
      bulkTodoLists: todolists,
      members: [],
    }),
  }).then(response => response.json()).then((resp) => {
    alert('プロジェクトを作成しました！');
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


