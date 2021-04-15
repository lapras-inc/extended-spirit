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
  organizationId: string,
): Promise<{
  status: string;
  tension: unknown;
  external: boolean;
  todoListsCount: number;
  todoListsItemsCount: number;
  todoListsCheckedItemsCount: number;
  id: string;
  position: number;
  circle: string;
  role: string;
  term: unknown;
  waitingOn: unknown;
  waitingFor: unknown;
  objectives: unknown[];
  labels: unknown[];
  archivedAt: string;
  title: string;
  body: string;
  link: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  members: unknown[];
  type: 'projects';
}> => {
  const client = getHolaspiritHttpClient(accessToken);
  const response = await client
    .get(`/api/organizations/${organizationId}/projects/${projectId}`)
    .catch((error) => {
      throw Error(`プロジェクトの取得に失敗しました: ${error.message}`);
    });
  return response.data.data;
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

export const getTodolists = async (
  accessToken: string,
  organizationId: string,
  projectId: string,
): Promise<{ name: string; items: { name: string }[] }[]> => {
  const response = await fetch(
    `https://app.holaspirit.com/api/organizations/${organizationId}/projects/${projectId}/todolists`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
    },
  );

  const json = await response.json();
  const groupList: {
    name: string;
    items: number[];
  }[] = json.data;
  const linkedTodoListItems: {
    id: number;
    name: string;
  }[] = json.linked.todolistitems;
  return groupList.map((group) => {
    return {
      name: group.name,
      items: group.items.map((itemId) => {
        const item = linkedTodoListItems.find((item) => {
          return item.id === itemId;
        });
        return {
          name: item!.name,
        };
      }),
    };
  });
};

export const createProject = async (
  accessToken: string,
  organizationId: string,
  circle: string,
  role: string,
  title: string,
  link: string,
  body: string,
  position: number,
  status: string,
  todolists: {
    name: string;
    items: {
      name: string;
    }[];
  }[],
): Promise<string> => {
  const client = getHolaspiritHttpClient(accessToken);
  const response = await client
    .post(`/api/organizations/${organizationId}/projects`, {
      title,
      circle,
      status,
      position,
      link,
      role,
      body,
      bulkTodoLists: todolists,
      members: [],
    })
    .catch((error) => {
      throw Error(`プロジェクトの作成に失敗しました: ${error.message}`);
    });
  return JSON.stringify(response);
};

export const getProjectUrl = (): string => {
  const projectUrl = prompt(
    'プロジェクトのURLを入れてください（右クリックで「ペースト」を選択）',
  );
  if (!projectUrl) {
    throw Error('プロジェクトのURLを入力してください');
  }
  return projectUrl;
};

export const getProjectId = (projectUrl: string): string => {
  const projectId = new URL(projectUrl).searchParams.get('projectId');
  if (!projectId) {
    throw Error('プロジェクトIDが見つかりませんでした');
  }
  return projectId;
};
