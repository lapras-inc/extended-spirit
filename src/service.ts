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
