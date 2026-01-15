export default async function getGitStats(username) {
  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!reposResponse.ok) {
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    const commitsResponse = await fetch(
      `https://api.github.com/search/commits?q=author:${username}&per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!commitsResponse.ok) {
      throw new Error(`Failed to fetch commits: ${commitsResponse.status}`);
    }

    const commitsData = await commitsResponse.json();
    const totalCommits = commitsData.total_count;

    return {
      commitCount: totalCommits,
      repoCount: repos.length,
    };
  } catch (error) {
    throw new Error(`Error fetching git stats: ${error.message}`);
  }
}
