const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" })
    });

    console.log("🤖 Jayliax Bot Started");

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        const user = msg.key.participant || msg.key.remoteJid;

        console.log(user, ":", text);
    });

}

startBot();
