export class Command{
    static instances = [];    // jshint ignore:line

    constructor(cmdName, cmdData, cmdCallBack){
        this.name = cmdName;
        this.data = cmdData;
        this.callback = cmdCallBack;
        Command.instances.push(this);
    }

    static initialize(appInstance){
        // Create all commands
        Command.instances.forEach(async (instance) => {
            await appInstance({
                "data": instance.data
            });
        });
    }

    static getCallBackMap(){
        let map = {};
        Command.instances.forEach((instance) => {
            map[instance.name] = instance.callback;
        });
        return map;
    }
}


export function sendReply(bot, interaction, msg){
    bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: msg
            }
        }
    });
}
