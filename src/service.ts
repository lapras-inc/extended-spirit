import { getHolaspiritHttpClient } from './httpClient';

export const getOrganizationsData = async (): Promise<string> => {
  const response = await getHolaspiritHttpClient().get(
    'https://app.holaspirit.com/api/public/organizations',
  );
  return JSON.stringify(response.data);
};

export const getProject = async (
  accessToken: string,
  projectId: string,
  organizationId = '6048000e343b9430fb74ecf9',
): Promise<string> => {
  const client = getHolaspiritHttpClient(accessToken);
  const response = await client
    .get(`/api/organizations/${organizationId}/projects/${projectId}`)
    .catch((error) => {
      throw Error(`プロジェクトの取得に失敗しました: ${error.message}`);
    });
  return JSON.stringify(response.data);
};

export const getAccessToken = async (): Promise<string> => {
  const cookies = await new Promise<chrome.cookies.Cookie[]>((resolve) => {
    chrome.cookies.getAll(
      { domain: 'app.holaspirit.com', name: 'holaAppToken' },
      (cookie) => {
        resolve(cookie);
      },
    );
  });
  if (cookies.length < 1) {
    throw Error('認証トークンが見つかりませんでした');
  }
  const holaAppTokenEncoded = cookies[0].value;
  return JSON.parse(decodeURIComponent(holaAppTokenEncoded)).access_token;
};

const getTodolists = async (
  accessToken: string,
  organizationId: string,
  projectId: string
) => {
  const response = await fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects/${projectId}/todolists`, {
    headers: {
      'authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  });

  const json = await response.json();
  alert(JSON.stringify(json));

  return json.data.map((group: any) => {
    return {
      name: group.name,
      items: group.items.map((itemId: any) => {
        const item = json.linked.todolistitems.find((item: any) => {
          return item.id === itemId
        });
        return {
          name: item.name
        }
      })
    }
  });
}

const createProject = async (
  accessToken: string,
  organizationId: string,
  todolists: string,
) => {
  fetch(`https://app.holaspirit.com/api/organizations/${organizationId}/projects`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${accessToken}`,
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
    alert(JSON.stringify(resp));
  }).catch(error => {alert(error.message)});
};
