import {
  createProject,
  getAccessToken,
  getOrganizationsData,
  getProject,
  getProjectId,
  getProjectUrl,
  getTodolists,
} from './service';
const ORGANIZATION_ID = '5ca435d054548008ed758c72';

export const alertOrgsData = async (): Promise<void> => {
  alert(await getOrganizationsData());
};
export const alertAccessToken = async (): Promise<void> => {
  alert(await getAccessToken());
};
export const alertProjectData = async (): Promise<void> => {
  const accessToken = await getAccessToken();
  alert(
    await getProject(accessToken, '6048054642d878641215a440', ORGANIZATION_ID),
  );
};
export const copyProjectWithTodoLists = async (): Promise<void> => {
  const accessToken = await getAccessToken();
  const projectId = getProjectId(await getProjectUrl());
  const project = await getProject(accessToken, projectId, ORGANIZATION_ID);
  const todolists = await getTodolists(accessToken, ORGANIZATION_ID, projectId);
  const response = await createProject(
    accessToken,
    ORGANIZATION_ID,
    project.circle,
    project.role,
    'current',
    todolists,
  );
  alert(response);
};
