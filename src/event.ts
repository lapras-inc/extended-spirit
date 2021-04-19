import {
  alertAccessToken,
  alertOrgsData,
  alertProjectData,
  copyProjectWithTodoLists,
} from './usecase';

enum MenuId {
  GetOrgs,
  GetAccessToken,
  GetProject,
  CopyProject,
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
  chrome.contextMenus.create({
    id: MenuId.CopyProject.toString(),
    parentId: 'parent',
    title: 'プロジェクトをコピー',
  });
});

// メニューをクリック時に実行
chrome.contextMenus.onClicked.addListener(async (item) => {
  console.log(item);
  console.log(item.menuItemId);
  try {
    switch (item.menuItemId) {
      case MenuId.GetOrgs.toString():
        await alertOrgsData();
        break;
      case MenuId.GetAccessToken.toString():
        await alertAccessToken();
        break;
      case MenuId.GetProject.toString():
        await alertProjectData();
        break;
      case MenuId.CopyProject.toString():
        await copyProjectWithTodoLists();
        break;
    }
  } catch (error) {
    alert(error.message);
  }
});
