import { getOrganizationsData, getAccessToken, getProject } from './service';

enum MenuId {
  GetOrgs,
  GetAccessToken,
  GetProject,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'parent',
    title: 'holaspirit',
  });
  chrome.contextMenus.create({
    id: MenuId.GetOrgs.toString(),
    parentId: 'parent',
    title: 'get orgs',
  });
  chrome.contextMenus.create({
    id: MenuId.GetAccessToken.toString(),
    parentId: 'parent',
    title: 'get auth token',
  });
  chrome.contextMenus.create({
    id: MenuId.GetProject.toString(),
    parentId: 'parent',
    title: 'get project',
  });
});

// メニューをクリック時に実行
chrome.contextMenus.onClicked.addListener(async (item) => {
  console.log(item);
  console.log(item.menuItemId);
  try {
    switch (item.menuItemId) {
      case MenuId.GetOrgs.toString():
        alert(await getOrganizationsData());
      case MenuId.GetAccessToken.toString():
        alert(await getAccessToken());
      case MenuId.GetProject.toString():
        const accessToken = await getAccessToken();
        alert(await getProject(accessToken, '6048054642d878641215a440'));
    }
  } catch (error) {
    alert(error.message);
  }
});
