const { useHelpers, Reactions } = require('./helpers');
const ping = require('./commands/ping');
const commands = [
  ping,
];

module.exports = async ({github, context, core}) => {

  const { parseCommand, addReaction } = useHelpers({github, context, core});

  console.log(context.payload);

  const { action, comment } = context.payload;
  if(action !== 'created') {
    core.notice(`Comment is not 'created'`);
    return false;
  }
  const parseResult = parseCommand(comment.body);

  if(!parseResult) {
    core.notice('No command detected');
    return false;
  }


  const [commandRaw, commandName, commandArgs] = parseResult

  core.notice(`Command detected '${commandName}'`);

  const command = commands.find((x) => x.command === commandName)

  if(!command) {
    core.notice(`Command unhandled`);
    await addReaction(Reactions.Confused);
    return false;
  }

  console.log(command);

  await command.execute({github, context, core});
  return true;
}
