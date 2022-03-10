const parseCommand = (text) => text.match(/^\/([\w]+)\b *(.*)?$/m);
module.exports = async ({github, context, core}) => {


  console.log(context.payload, context.payload.repo);

  const addComment = (body) =>  github.rest.issues.createComment({
    issue_number: context.payload.issue.number,
    owner: context.payload.repo.owner,
    repo: context.payload.repo.repo,
    body,
  }); 
  const comment = context.payload.comment;
  const parseResult = parseCommand(comment.body);

  if(!parseResult) {
    core.notice('No command detected');
    return false;
  }

  const command = {
    raw: parseResult[0],
    name: parseResult[1],
    args: parseResult[2],
  }

  core.notice(`Command detected '${command.name}`);
  console.log(command);

  switch (command.name) {
    case 'ping':
      addComment('![Ping Pong](https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif)');
      break;
    default:
      core.notice(`Command unhandled`);
      break;
  }

  return false;
}
