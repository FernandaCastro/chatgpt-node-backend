import processCommand from "../processCommand.js";

function commandSpeech(router) {

    router.post("/commandspeech", async (req, res) => {

        const { commandTranscript } = req.body;

        console.log(`Request received: transcript = ${commandTranscript}`);

        try {
            const command = await processCommand(commandTranscript);

            res.json({
                status: 200,
                result: `${command}`,
            });
        } catch (error) {
            res.json({
                status: 500,
                error: `${error}`,
            });
        }
    });

    return router;
}

export default commandSpeech;





