
const Reactions = {
  Confused: 'confused',
  Eyes: 'eyes',
  Heart: 'heart',
  Hooray: 'hooray',
  Laugh: 'laugh',
  Rocket: 'rocket',
  '+1': '+1', 
  '-1': '-1', 
};

const useHelpers = ({github, context, core}) => ({
  parseCommand: text => text.match(/^\/([\w]+)\b *(.*)?$/m),
  addComment: 
    body =>
      github.rest.issues.createComment({
        issue_number: context.payload.issue.number,
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        body,
    }),
  addReaction: 
    (content = Reactions.Eyes) =>
      github.rest.reactions.createForIssueComment({
        comment_id: context.payload.comment.id,
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        content,
      }),
})

module.exports = async ({github, context, core}) => {

  const { parseCommand, addComment, addReaction } = useHelpers({github, context, core});

  console.log(context.repo);

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
      await addComment('![Ping Pong](https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif)');
      await addReaction();
      break;
    default:
      core.notice(`Command unhandled`);
      await addReaction(Reactions.Confused);
      break;
  }

  return false;
}
