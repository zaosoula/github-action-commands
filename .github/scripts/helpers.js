
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
});


module.exports = {
  Reactions,
  useHelpers
}
