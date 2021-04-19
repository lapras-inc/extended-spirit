import {
  createProject,
  getAccessToken,
  getOrganizationId,
  getOrganizationsData,
  getProject,
  getProjectId,
  getProjectUrl,
  getTodolists,
} from './service';

export const alertOrgsData = async (): Promise<void> => {
  alert(await getOrganizationsData());
};
export const alertAccessToken = async (): Promise<void> => {
  alert(await getAccessToken());
};
export const alertProjectData = async (): Promise<void> => {
  const projectUrl = getProjectUrl();
  const accessToken = await getAccessToken();
  const projectId = getProjectId(projectUrl);
  const organizationId = getOrganizationId(projectUrl);
  alert(await getProject(accessToken, projectId, organizationId));
};
export const copyProjectWithTodoLists = async (): Promise<void> => {
  const projectUrl = getProjectUrl();
  const accessToken = await getAccessToken();
  const projectId = getProjectId(projectUrl);
  const organizationId = getOrganizationId(projectUrl);
  const project = await getProject(accessToken, projectId, organizationId);
  const todolists = await getTodolists(accessToken, organizationId, projectId);
  await createProject(
    accessToken,
    organizationId,
    project.circle,
    project.role,
    `${project.title}のコピー`,
    project.link,
    project.body,
    0,
    project.status,
    todolists,
  );
  alert('プロジェクトのコピーを作成しました');
};
