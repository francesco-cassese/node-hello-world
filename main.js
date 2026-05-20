import { cowsay } from 'cowsayjs'
import { ChatAnthropic } from '@langchain/anthropic';
import { HumanMessage, SystemMessage } from 'langchain';

const funnyCowQuote = [
    "Cosa ne pensi del latte parzialmente scremato? Io lo trovo un insulto al mio lavoro!",
    "Scusa, mi sono persa... potresti indicarmi la strada per il fienile?",
    "Oggi mi sento proprio in vena di fare un po' di... muuu-sica!",
    "Muuu-viti! C'è dell'erba freschissima che ci aspetta dall'altra parte del recinto!",
    "Guardami: sono il perfetto esempio di stile a macchie, altro che alta moda.",
    "Il mio film preferito? Ovviamente 'Muuu-lan'!",
    "Non guardarmi così, non ho nessuna intenzione di fare i compiti di muuu-sica oggi.",
    "La vita nei campi è un continuo chewing-gum di erba, dall'alba al tramonto."
];

const casualQuote = Math.floor(Math.random() * funnyCowQuote.length);
const selectedQuote = funnyCowQuote[casualQuote];

const variabileTerminale = process.argv

if (variabileTerminale.includes('--la-perla-della-mucca')) {
    console.log(cowsay(selectedQuote));
}


const CHIAVE_API_CLAUDE = process.env.APY_KEY

const model = new ChatAnthropic({
    model: 'claude-sonnet-4-6',
    apiKey: CHIAVE_API_CLAUDE
});

model.invoke([
    new SystemMessage("Ciao sei una mucca con una vena comica, ricordati di muggire sempre"),
    new HumanMessage('Mi dici una barzelletta?')
]).then(aiResponse => {
    console.log(cowsay(aiResponse.content));
})

