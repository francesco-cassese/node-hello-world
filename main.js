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


const CHIAVE_API_CLAUDE = process.env.ANTHROPIC_APY_KEY

const model = new ChatAnthropic({
    model: 'claude-sonnet-4-6',
    apiKey: CHIAVE_API_CLAUDE
});

const promptMcMuuu = `Sei "McMuuu", una leggenda del rap underground del fienile. 
Stai facendo una sfida di freestyle (rap battle) contro un'altra mucca. 
Le tue barre devono essere scritte in rima baciata (AABB), aggressive, piene di dissing e punchline spietate. 
Massimo 4 versi (righe). Usa un gergo hip-hop italiano ma adattato al mondo delle mucche (es. pascolo, latte, corna, fieno, macchie).`;

const promptLilGrass = `Sei "Lil' Grass", la nuova promessa della trap della stalla, arrogante e velocissima. 
Stai rispondendo al freestyle di McMuuu. 
Devi distruggere il suo ego usando rime baciate (AABB) taglienti, rinfacciandole che è vecchia e che il suo latte è scaduto. 
Massimo 4 versi (righe). Sii spietata e usa flow moderno.`;

const avviaDialogoMucche = (barrePrecedenti, turnoAttuale, limiteTurni) => {
    if (turnoAttuale > limiteTurni) {
        console.log('MUUUU la sfida è finita');
        return;
    }

    const chiParla = turnoAttuale % 2 !== 0 ? "McMuuu" : "Lil' Grass";
    const promptSistema = chiParla === "McMuuu" ? promptMcMuuu : promptLilGrass;

    model.invoke([
        new SystemMessage(promptSistema),
        new HumanMessage(turnoAttuale === 1
            ? `Inizia la battle spaccando il microfono sul tema: "${barrePrecedenti}"`
            : `L'avversaria ti ha appena tirato queste barre: "${barrePrecedenti}". Rispondi a tono con il tuo freestyle e distruggila!`)
    ]).then(aiResponse => {
        const testoRisposta = aiResponse.content;

        console.log(`\n🔥 🎤 [ROUND ${turnoAttuale}] MC ${chiParla.toUpperCase()} SPUTA FUOCO:`);
        console.log(cowsay(testoRisposta));

        setTimeout(() => {
            avviaDialogoMucche(testoRisposta, turnoAttuale + 1, limiteTurni);
        }, 4000);

    }).catch(errore => {
        console.error("Errore durante il dialogo:", errore.message);
    });
}

const temaIniziale = "Chi comanda nel pascolo";
console.clear();
console.log("--- 🐮 EPIC BOVINE RAP BATTLES OF HISTORY 🎤 ---");
console.log("Drop the beat...\n");

avviaDialogoMucche(temaIniziale, 1, 4);

