# ☀️ Marias Fødselsdagsturnering

**Hele familiens solstråle.** En Americano padelturnering til Marias fødselsdag.
Kører som hjemmeside i browseren og kan lægges på hjemmeskærmen som en app.
Fødselsdag, fest og positiv energi – og en kommentatorboks der stadig ikke
skåner nogen.

<p align="center">
  <img src="icons/icon-512.png" width="150" alt="App-ikon">
</p>

## Alle spiller præcis lige mange kampe

Det er hele pointen med Americano: point følger **spilleren**, ikke holdet. Men
så skal alle også have spillet lige mange kampe – ellers kan pointene ikke
sammenlignes. Derfor styrer appen på **kampe pr. spiller** og regner runderne ud
bagfra i stedet for omvendt.

Det kan kun gå op, når antallet af pladser (4 × baner × runder) går lige op i
antallet af spillere. Appen sørger selv for det:

| Spillere | Baner | Kampe pr. spiller kan være | Fx |
| --- | --- | --- | --- |
| 7 | 1 | 4, 8, 12 … | 4 kampe = 7 runder |
| 8 | 1 | 1, 2, 3 … | 4 kampe = 8 runder |
| 8 | 2 | 1, 2, 3 … | 4 kampe = 4 runder |
| 6 | 1 | 2, 4, 6 … | 4 kampe = 6 runder |
| 5 | 1 | 4, 8 … | 4 kampe = 5 runder |

Plusknappen springer automatisk til næste tal, der går op, og appen viser hele
vejen igennem – både før start, i stillingen og i programmet – om fordelingen
rent faktisk er lige. En kamp kan desuden først godkendes, når der står fire
spillere på banen.

## Kamplængde

| Point pr. kamp | Serve til hver | |
| --- | --- | --- |
| **16** | fire serve hver | den lange |
| **8** | to serve hver | den hurtige |

Andre længder sættes i spring af fire, så serverne går lige op mellem de fire
på banen. Det er formentlig ikke de officielle regler. Det er Familien
Vestergaards.

## Sådan spiller I

1. **Fremmøde** – tryk spillerne til og fra, og skriv eventuelle gæster på.
2. **Kampene** – vælg kamplængde og hvor mange kampe hver skal spille.
3. **Start turneringen** – første kamp går i gang med det samme.
4. **Sæt holdet** – tryk på "Vælg" på hver plads. Det kan sagtens gøres, mens
   I allerede er i gang. "Auto" fylder pladserne ud for jer.
5. **Tæl point** – tryk på det store point-felt hos det hold der scorer.
6. **Godkend kampen** når pointmålet er nået, og fortsæt til næste runde.
7. **Kår mesteren** når alle runder er spillet.

## Læg den på hjemmeskærmen

- **iPhone:** åbn siden i Safari → tryk **Del** → **Føj til hjemmeskærm**.
- **Android:** åbn siden i Chrome → menuen ⋮ → **Installer app**.

Så åbner den i fuld skærm uden browserlinje og virker uden net i hallen. På
iPhone betyder det også, at turneringen bliver liggende: Safari rydder normalt
websites' data efter syv dages inaktivitet, men ikke for apps på hjemmeskærmen.

## Holdet

| Spiller | Kommentatorboksens holdning |
| --- | --- |
| ☀️ **Maria** | Fødselaren og hele familiens solstråle. Og altså rigtig god – det er ikke bare pænt sagt. |
| 🔵 **Henrik** | Chelsea og Vejle Boldklub. Får klubberne i hovedet både når han fører og når han er bagud. |
| 🎯 **Majbritt** | Ude med skade. Passer børnebørnene i stedet. Jubi. |
| 😤 **Thomas** | Altid bedst. Dybt irriterende. Et nederlag er en historisk begivenhed. |
| 🔥 **Therese** | Temperament og elendig taber – og i dag skal hun oven i købet være sød ved fødselaren. |
| 👨‍💻 **Jens** | Har bygget siden. Det er også dét, han er bedst til. Stadig dårlig til padel. |
| 💼 **Casper** | Arbejder for meget. Tjekker mails mellem dueller. Er alligevel for god til det her. |
| 🍀 **Lykke** | Potentialet er der stadig. Det bliver bare ved med at være potentiale. |

Majbritt er slået fra som udgangspunkt, men kan tændes, hvis skaden viser sig at
være til at leve med – så får hun sine helt egne replikker om at spille skadet.

Therese og Maria spillede tennis mod hinanden i deres ungdom. Står de over for
hinanden, får de deres eget søsteropgør – med den ekstra krølle, at Therese skal
opføre sig ordentligt på Marias fødselsdag. Og scorer nogen mod fødselaren,
bemærker familien det.

Gæster får neutrale kommentarer. Familiens replikker er reserveret til familien.

## Kør den lokalt

Der er ingen byggeproces. Alt er almindelig HTML, CSS og JavaScript.

```bash
git clone https://github.com/jensbanan/familypadel
cd familypadel
python3 -m http.server 8000
```

Åbn så <http://localhost:8000>. Service workeren kræver `http://localhost`
eller HTTPS – den virker ikke, hvis du åbner `index.html` direkte fra disken.

## Udgivelse på Netlify

`netlify.toml` er sat op i forvejen.

1. [app.netlify.com](https://app.netlify.com) → **Add new site** →
   **Import an existing project** → **GitHub** → `jensbanan/familypadel`.
2. Build command tom, publish directory `.` — Netlify læser det selv.
3. **Deploy**.

Derefter udløser hvert push til `main` en ny udgivelse.

## Tidligere udgaver

| Gren | Hvad |
| --- | --- |
| `main` | Marias fødselsdagsturnering (denne) |
| `v1.0` | Familien Vestergaard Padel Championship – den oprindelige familieferie-udgave |

Den gamle version ligger urørt på `v1.0` og kan hentes frem med
`git checkout v1.0`. Vil du have den til at blive liggende på sin egen adresse,
kan branch deploys slås til for den på Netlify.

## Projektets opbygning

```
index.html                 App-skallen
assets/app.css             Al styling
assets/app.js              Spillogik, replikbank og visning
assets/fonts.css           Selvhostede fonte (virker offline)
fonts/                     Familjen Grotesk og Karla (variable, OFL)
icons/                     App-ikoner til hjemmeskærmen
manifest.webmanifest       Navn, ikon og farver til installation
sw.js                      Service worker – offline og hurtig start
netlify.toml               Udgivelsesopsætning
ios/                       Den oprindelige native SwiftUI-app
```

Vil du tilføje flere jokes, ligger de samlet i objektet `B` i `assets/app.js` –
ét afsnit pr. familiemedlem, opdelt efter situation (`ahead`, `behind`, `won`,
`lost` og så videre). `{n}` bliver erstattet med spillerens fornavn.
