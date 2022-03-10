module.exports = async ({github, context, core}) => {
  console.log(context);

  github.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: '![Ping Pong](https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif)',
  }); 
}
