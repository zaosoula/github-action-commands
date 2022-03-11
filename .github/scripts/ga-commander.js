const { useHelpers, Reactions } = require('./helpers');
const ping = require('./commands/ping');
const help = require('./commands/help');
const linkApi = require('./commands/link-api');
const commands = [
  ping,
  help,
  linkApi,
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

  const commandCtx = {
    github,
    context,
    core,
    args: commandArgs,
    commands
  }

  await command.execute(commandCtx);
  return true;
}
