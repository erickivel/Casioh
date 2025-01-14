import { CommandsControllerService } from "./cassiohcore/Controller/CommandsController";
import { KeyTreatment, params_to_command } from "./cassiohcore/Modal/keyTreatment";

import * as dotenv from 'dotenv';
import { CaadReceipt } from "./websocket";
dotenv.config();

console.log(`
$$$$$$\                                           $$\                $$\                           $$\    $$\  $$$$$$\  
$$  __$$\                                          \__|               $$ |                          $$ |   $$ |$$  __$$\ 
$$ /  \__|   $$$$$$\      $$$$$$$\     $$$$$$$\    $$\    $$$$$$\     $$$$$$$\                      $$ |   $$ |\__/  $$ |
$$ |         \____$$\    $$  _____|   $$  _____|   $$ |  $$  __$$\    $$  __$$\       $$$$$$\       \$$\  $$  | $$$$$$  |
$$ |         $$$$$$$ |   \$$$$$$\     \$$$$$$\     $$ |  $$ /  $$ |   $$ |  $$ |      \______|       \$$\$$  / $$  ____/ 
$$ |  $$\   $$  __$$ |    \____$$\     \____$$\    $$ |  $$ |  $$ |   $$ |  $$ |                      \$$$  /  $$ |      
\$$$$$$  |$$\$$$$$$$ |$$\$$$$$$$  |$$\$$$$$$$  |$$\$$ |$$\$$$$$$  |$$\$$ |  $$ |                       \$  /   $$$$$$$$\ 
\______/ \__\_______|\__\_______/ \__\_______/ \__\__|\__\______/ \__\__|  \__|                        \_/    \________|
                                                                                                                        
                                                                                                                                                                                                                
`);

const venom = require('venom-bot');
const command_service = new CommandsControllerService().Command_service;
const commandStart: string = '/';


venom
    .create({
        session: 'CassiohV2',   // name of session
    })
    .then((client: any) => start(client))
    .catch((erro: any) => {
        console.log(erro);
    });

function start(client: any) {
    const caadReceipt: CaadReceipt = new CaadReceipt(client);
    caadReceipt.init();
    client.onMessage((message: any) => {
        /* console.log(message!.from!.toString());
        return; */

        let key: string = message.body.split(" ")[0].toLowerCase();
        let params: params_to_command = KeyTreatment.Params_command(client, message);

        params.command_key_raw?.startsWith("/") ? command_service.Run_command(0, params) : "";
    });
}