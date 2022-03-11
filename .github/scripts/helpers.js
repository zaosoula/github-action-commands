
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
  parseCommand: text => text.match(/^\/([\S]+) *(.*)?$/m),
  addComment: 
    body =>
      github.rest.issues.createComment({
        ...context.repo,
        issue_number: context.payload.issue.number,
        body,
    }),
  addReaction: 
    (content = Reactions.Eyes) =>
      github.rest.reactions.createForIssueComment({
        ...context.repo,
        comment_id: context.payload.comment.id,
        content,
      }),
});


module.exports = {
  Reactions,
  useHelpers
}
