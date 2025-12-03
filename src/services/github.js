const BASE_URL = 'https://api.github.com';

export async function searchUsers(query) {
  const response = await fetch(`${BASE_URL}/search/users?q=${query}`);
  if (!response.ok) throw new Error('Erreur lors de la recherche');
  return response.json();
}

export async function getUserDetails(username) {
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`${BASE_URL}/users/${username}`),
    fetch(`${BASE_URL}/users/${username}/repos?sort=updated`)
  ]);

  if (!userResponse.ok || !reposResponse.ok) {
    throw new Error('Erreur lors de la récupération des détails');
  }

  const user = await userResponse.json();
  const repos = await reposResponse.json();
  return { user, repos };
}

export async function getRepoCommits(owner, repo) {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/commits`);
  if (!response.ok) throw new Error('Erreur lors de la récupération des commits');
  return response.json();
}
