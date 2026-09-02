# 🎾 Familien Vestergaard Padel Championship

En Americano padel-app til iOS, bygget i SwiftUI. Helt på dansk, til alle otte
i familien, og med en kommentatorboks der ikke skåner nogen. Undtagen Maria.

<p align="center">
  <img src="FamilyPadel/Assets.xcassets/AppIcon.appiconset/AppIcon.png" width="160" alt="App-ikon">
</p>

## Hvad er Americano?

Alle spiller med alle og mod alle. Man skifter makker hver runde, og point
følger **spilleren** – ikke holdet. En kamp slutter, når de to holds point
tilsammen når målet. Til sidst står der én tilbage med flest point, og resten
skal høre for det til jul.

Kamplængden vælger I selv, før I går i gang:

| Point pr. kamp | Serve til hver | |
| --- | --- | --- |
| **16** | fire serve hver | den lange |
| **8** | to serve hver | den hurtige |

Andre længder kan sættes i spring af fire, så serverne altid går lige op mellem
de fire på banen. Det er formentlig ikke de officielle regler. Det er Familien
Vestergaards.

## Funktioner

- **Fremmøde før hvert spil.** Vælg hvem der faktisk er dukket op, og skriv
  gæster på med navn. Programmet lægges kun til dem, der er der.
- **Sæt holdet mens kampen kører.** Første kamp starter med tomme pladser – tryk
  på en plads og vælg spilleren, også midt i en igangværende kamp. Man kan
  skifte spillere ud undervejs uden at miste stillingen.
- **Automatisk Americano-program.** Resten af runderne lægges, så snart første
  runde er godkendt, og den faktiske opstilling tæller med i fordelingen. Så
  spiller alle med alle, mod alle, og pauserne fordeles ligeligt.
- **Kommentatorboksen.** Hver eneste point udløser en kommentar, skræddersyet
  til den spiller der scorede – og til om vedkommende er foran eller bagud.
- **Live stilling** med podie, pointforskel, sejre og nederlag.
- **Program-oversigt** over alle runder, baner og resultater.
- **Mester-skærm** med konfetti, pokal og en sidsteplads ingen slipper for.
- **Alt gemmes automatisk**, så turneringen overlever at appen lukkes.
- Flere baner samtidig, justerbart antal runder og point pr. kamp, og
  gæstespillere kan tilføjes undervejs.

## Holdet

| Spiller | Kommentatorboksens holdning |
| --- | --- |
| 🔵 **Henrik** | Chelsea og Vejle Boldklub. Får klubberne i hovedet både når han fører og når han er bagud. |
| 🎯 **Majbritt** | Undersælger sig selv i hver eneste sætning. Er teknisk den bedste på banen. |
| 🌸 **Maria** | Konstant ros, opbakning og god energi. Stillingen betyder intet, Maria betyder alt. |
| 😤 **Thomas** | Altid bedst. Dybt irriterende. Et nederlag er en historisk begivenhed. |
| 🔥 **Therese** | Stort temperament og verdens dårligste taber. Har et uafsluttet søsteropgør med Maria. |
| 👨‍💻 **Jens** | Bedre til at kode denne app end til at spille padel. Den venstrehånds-noob. |
| 😇 **Casper** | For god og for sød. Og på uforklarlig vis også god til padel. |
| 🍀 **Lykke** | Familiens nyeste. Børnene elsker hende, og hun lærer hurtigere, end de andre bryder sig om. |

Therese og Maria spillede tennis mod hinanden i deres ungdom og vandt og tabte
på skift. Står de over for hinanden på banen, får de deres helt eget
søsteropgør fra kommentatorboksen.

Tilføjer man andre spillere, får de neutrale kommentarer – familiens replikker
er reserveret til familien.

## Kom i gang

Kræver **Xcode 15 eller nyere** og **iOS 17+**.

```bash
git clone <repo-url>
cd FamilyPadel
open FamilyPadel.xcodeproj
```

Vælg en simulator (eller din egen iPhone) og tryk ⌘R.

Skal den på din egen telefon, skal du sætte dit eget udviklerteam:
**FamilyPadel-target → Signing & Capabilities → Team**. Skift eventuelt
`PRODUCT_BUNDLE_IDENTIFIER` fra `com.vestergaard.familypadel`, hvis Xcode
brokker sig over at id'et er taget.

## Sådan spiller I

1. **Fremmøde** – tryk spillerne til og fra, og skriv eventuelle gæster på.
2. **Kamplængde** – vælg 16 eller 8 point pr. kamp, og sæt antal baner og runder.
3. **Start turneringen** – første kamp går i gang med det samme.
4. **Sæt holdet** – tryk på "Vælg" på hver plads. Det kan sagtens gøres, mens
   I allerede er i gang. "Auto" fylder pladserne ud for jer.
5. **Tæl point** – tryk på det store point-felt hos det hold der scorer.
   Kommentatorboksen tager sig af resten.
6. **Godkend kampen** når pointmålet er nået, og fortsæt til næste runde.
7. **Kår mesteren** når alle runder er spillet.

## Projektets opbygning

```
FamilyPadel/
├── FamilyPadelApp.swift        App-indgang
├── Models/                     Player, PadelMatch, Tournament, Persona
├── Engine/
│   ├── AmericanoScheduler.swift  Programlægning med balancerede pauser
│   └── Banter.swift              Kommentatorboksens replikbank
├── Store/TournamentStore.swift Al spillogik og lagring
└── Views/                      SwiftUI-skærme
```

Vil du tilføje flere jokes, ligger de samlet i `Engine/Banter.swift` – én
funktion pr. familiemedlem. `{n}` bliver erstattet med spillerens fornavn.
