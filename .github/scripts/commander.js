const parseCommand = (text) => text.match(/^\/([\w]+)\b *(.*)?$/m);

module.exports = async ({github, context, core}) => {

  const { debug, setFailed } = core;

  console.log(context);

  debug("Getting the comment and checking it for a command");

  const comment = context.payload.comment;
  const command = parseCommand(comment.body);

  if(!command) {
    setFailed('No command detected');
    return false;
  }

  debug('Command detected');
  console.log(command);
  // github.issues.createComment({
  //   issue_number: context.issue.number,
  //   owner: context.repo.owner,
  //   repo: context.repo.repo,
  //   body: '![Ping Pong](https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif)',
  // }); 
}
