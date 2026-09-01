import Foundation

/// Situationen en spiller står i, når kommentatorboksen åbner munden.
enum BanterSituation: Hashable {
    case matchStart
    case scoredWhileAhead
    case scoredWhileBehind
    case scoredLevel
    case wonMatch
    case lostMatch
    case champion
    case lastPlace
}

/// En linje i kommentatorfeedet.
struct BanterLine: Identifiable, Hashable {
    let id = UUID()
    let text: String
    let persona: Persona
    let emoji: String
}

/// Familiens helt egen kommentatorboks. Ingen bliver skånet. Undtagen Maria.
enum Banter {

    /// Henter en tilfældig replik. `{n}` erstattes med spillerens fornavn.
    static func line(for player: Player, _ situation: BanterSituation) -> BanterLine {
        var pool = lines(persona: player.persona, situation: situation)
        if pool.isEmpty { pool = lines(persona: .gaest, situation: situation) }
        let raw = pool.randomElement() ?? "Point! 🎾"
        let text = raw.replacingOccurrences(of: "{n}", with: player.shortName)
        return BanterLine(text: text, persona: player.persona, emoji: player.emoji)
    }

    // MARK: - Replikbanken

    static func lines(persona: Persona, situation: BanterSituation) -> [String] {
        switch persona {
        case .henrik:   return henrik(situation)
        case .maria:    return maria(situation)
        case .thomas:   return thomas(situation)
        case .majbritt: return majbritt(situation)
        case .jens:     return jens(situation)
        case .casper:   return casper(situation)
        case .gaest:    return gaest(situation)
        }
    }

    // MARK: Henrik – Chelsea og Vejle Boldklub

    private static func henrik(_ situation: BanterSituation) -> [String] {
        switch situation {
        case .matchStart:
            return [
                "{n} går på banen med Chelsea-optimisme. Den plejer at holde i syv minutter. 🔵",
                "{n} er klar. Vejle Boldklub sender deres tanker og bønner. 🟡",
                "{n} starter kampen. Målsætningen er som altid: at undgå nedrykning."
            ]
        case .scoredWhileAhead:
            return [
                "{n} scorer OG fører! Det er flere gode nyheder, end Chelsea har fået hele sæsonen. 🔵",
                "{n} i front! Lige nu ligger han højere end Vejle i tabellen. Nyd det, det varer ikke. 🟡",
                "Point til {n}! Chelsea ville have brugt 80 mio. på det slag der.",
                "{n} fører suverænt. Det er officielt sæsonens Chelsea-highlight.",
                "{n} scorer! Vejle Boldklub overvejer at hente ham hjem på en fribetaling.",
                "{n} bygger føring. Bare rolig, han kaster den nok væk i overtiden – gammel vane.",
                "Sådan, {n}! Du har allerede flere point end Vejle har haft skud på mål i år. 🟡",
                "{n} dominerer. Stamford Bridge rejser sig. Begge tilskuere."
            ]
        case .scoredWhileBehind:
            return [
                "{n} scorer, men er bagud. Klassisk Chelsea: flot statistik, elendigt resultat. 🔵",
                "Et point til {n}! Det er sådan, Vejle fejrer et uafgjort resultat. 🟡",
                "{n} reducerer. Trænerskiftet er udsat til på mandag.",
                "{n} kæmper bravt bagud. Chelsea-fans kender følelsen. Intimt.",
                "Point til {n}! Han er stadig i nedrykningszonen, men bussen er ikke bestilt endnu. 🟡",
                "{n} scorer fra en håbløs position – det er ren Vejle-romantik.",
                "{n} kommer nærmere! Til forskel fra Chelsea kan han bare ikke købe en ny makker i januar. 🔵",
                "{n} nægter at give op. Det gør Vejle-fans heller ikke. År efter år. 🟡"
            ]
        case .scoredLevel:
            return [
                "{n} udligner! Chelsea plejer at tabe herfra, men lad os være positive. 🔵",
                "Lige nu, {n}! Det er den mest spændende stilling, Vejle har set i årevis. 🟡",
                "{n} har rettet skibet op. Bestyrelsen holder fyresedlen i lommen. Indtil videre."
            ]
        case .wonMatch:
            return [
                "{n} VINDER! Det er sjældnere end en Chelsea-sejr på udebane. 🔵",
                "Sejr til {n}! Vejle-fans græder. Af glæde. For en gangs skyld. 🟡",
                "{n} tog den! Nogen skal have en pokal, og for en gangs skyld ikke en nedrykningsmedalje."
            ]
        case .lostMatch:
            return [
                "{n} taber. Andenhalvlegs-kollaps. Helt efter Chelsea-manualen. 🔵",
                "Nederlag til {n}. Vejle Boldklub nikker genkendende og skænker en lille én. 🟡",
                "{n} tabte. Han skylder på dommeren, banen og Todd Boehly.",
                "{n} er ude. Trænerstaben er allerede fyret."
            ]
        case .champion:
            return [
                "{n} ER MESTER! Chelsea sender lykønskninger fra midterbordet i tabellen. 🔵🏆",
                "{n} vinder det hele! Vejle Boldklub erklærer national helligdag. 🟡🏆"
            ]
        case .lastPlace:
            return [
                "{n} sidst. Nedrykket. Igen. Vi ses i 1. division. 🟡",
                "{n} slutter i bunden – Chelsea-agtigt niveau, men med færre penge involveret. 🔵"
            ]
        }
    }

    // MARK: Maria – ubetinget kærlighed og god energi

    private static func maria(_ situation: BanterSituation) -> [String] {
        switch situation {
        case .matchStart:
            return [
                "{n} går på banen! Du kan det her, og vi elsker dig uanset hvad. 💛",
                "Så er {n} klar! Verdens bedste indstilling, verdens bedste smil. 🌸",
                "{n} på banen – hele familien hepper allerede. ✨"
            ]
        case .scoredWhileAhead:
            return [
                "{n}!! Det var FANTASTISK! Og du så også glad ud imens. 💛",
                "Point til {n} – og hun fører! Vi er så stolte af dig. Alle sammen. 🌸",
                "{n} er i vildt godt humør OG i front. Perfekt kombination! ✨",
                "SÅDAN {n}! Det slag var lige så flot som dig. 💛",
                "{n} scorer igen! Du er simpelthen for dygtig, og det skal du vide."
            ]
        case .scoredWhileBehind:
            return [
                "{n} scorer! Stillingen betyder intet – du betyder alt. 🤗",
                "Sådan {n}! Bagud er bare et tal. Du er en hel følelse. 💛",
                "{n} kæmper videre! Vi tror SÅ meget på dig herfra. 🌸",
                "Point til {n}! Se, det vender allerede. Bliv ved, skat. ✨",
                "{n}, du er stadig familiens favorit. Uanset hvad tavlen siger. 🤗"
            ]
        case .scoredLevel:
            return [
                "{n} udligner! Se lige den energi! Helt utroligt. 💛",
                "Lige nu – og det er {n}s fortjeneste. Du er en stjerne. 🌸"
            ]
        case .wonMatch:
            return [
                "{n} VANDT! Vi vidste det hele tiden. Kæmpe kram herfra. 🤗💛",
                "Sejr til {n}! Du fortjener det, og du fortjener kage. 🌸"
            ]
        case .lostMatch:
            return [
                "{n} tabte kampen, men vandt vores hjerter. Som altid. 💛",
                "Pyt med det, {n}! Du var den mest positive på banen. Det tæller mest. 🤗",
                "{n}, det gik ikke denne gang – men du var skøn hele vejen. 🌸"
            ]
        case .champion:
            return [
                "{n} ER MESTER!! Vi råber det ud i hele huset! 💛🏆",
                "{n} vandt det hele! Vi har aldrig været mere stolte. Kram til alle! 🤗🏆"
            ]
        case .lastPlace:
            return [
                "{n} sidst på tavlen – men suverænt nummer ét i familien. 💛",
                "{n}, sidstepladsen er bare en placering. Du er stadig fantastisk. 🌸"
            ]
        }
    }

    // MARK: Thomas – altid bedst, og det er dybt irriterende

    private static func thomas(_ situation: BanterSituation) -> [String] {
        switch situation {
        case .matchStart:
            return [
                "{n} går på banen. Kampen er reelt afgjort. Vi spiller den alligevel. 😤",
                "{n} varmer op. Modstanderne varmer op til at tabe.",
                "{n} er klar. Nogen burde tjekke hans fødselsattest igen."
            ]
        case .scoredWhileAhead:
            return [
                "{n} scorer. Selvfølgelig gør han det. Irriterende. 😤",
                "{n} fører. Igen. Naturlovene er intakte.",
                "Point til {n}. Han gjorde det ikke engang svært. Så træls.",
                "{n} udbygger føringen uden at få pulsen op. Nogen tag en dopingprøve.",
                "{n} scorer med et slag han sikkert har opfundet selv. Ad. 😤",
                "{n} vinder duellen og ser ikke engang tilfreds ud. Det er det værste."
            ]
        case .scoredWhileBehind:
            return [
                "{n} scorer – bagud?! Skriv dato og klokkeslæt ned. 😤",
                "{n} reducerer. Roen er ubærlig. Han VED han vinder alligevel.",
                "Point til {n}. Comebacket er i gang, og vi hader det allerede.",
                "{n} er bagud, men kigger på tavlen som om den er en trykfejl."
            ]
        case .scoredLevel:
            return [
                "{n} udligner. Selvfølgelig. Vi troede aldrig på andet. 😤",
                "Lige nu – {n} har lige skiftet til andet gear. Ud af otte."
            ]
        case .wonMatch:
            return [
                "{n} vandt. Igen. Ingen er overraskede. Alle er irriterede. 😤",
                "Sejr til {n}. Han siger 'det var tæt'. Det var det ikke."
            ]
        case .lostMatch:
            return [
                "{n} TABTE! Nogen har filmet det, ikke?! Vi skal bruge beviser. 📼",
                "{n} tabte en kamp. Familien holder vejret. Ring til pressen. 😤",
                "Historisk øjeblik: {n} tabte. Dagen bør markeres i kalenderen."
            ]
        case .champion:
            return [
                "{n} er mester. Vi lagde turneringen for at se noget andet. Det lykkedes ikke. 😤🏆",
                "{n} vinder det hele. Igen. Nogen gider godt slå ham næste år, tak. 🏆"
            ]
        case .lastPlace:
            return [
                "{n} sidst?! Har nogen hacket appen? Det her kan ikke passe. 😤",
                "{n} i bunden. Verden er af lave. Ring til myndighederne."
            ]
        }
    }

    // MARK: Majbritt – undersælger sig selv, er teknisk bedst

    private static func majbritt(_ situation: BanterSituation) -> [String] {
        switch situation {
        case .matchStart:
            return [
                "{n}: \"Jeg er ellers ikke så god...\" Vi har set optagelserne. Hun lyver. 🎯",
                "{n} går på banen og undskylder på forhånd. Modstanderne bør være bange.",
                "{n} varmer op med lærebogsteknik og fortæller alle at hun er utrænet."
            ]
        case .scoredWhileAhead:
            return [
                "{n}: \"Jeg er ellers ikke så god...\" *lægger bolden i hjørnet* 🎯",
                "Point til {n}. Teknikken var lærebogsagtig. Hun kalder det held.",
                "{n} fører og undskylder for det. Stop det, {n}.",
                "{n} scorer med en volley, der bør hænge på et museum. Hun rødmer. 🎯",
                "{n} er i front. Hun vil gerne understrege, at det bare er tilfældigt. Det er det ikke.",
                "{n} spiller bedst på banen. Hun benægter det pure."
            ]
        case .scoredWhileBehind:
            return [
                "{n} scorer bagudfra – med perfekt fodarbejde, som hun bagefter kalder \"klodset\". 🎯",
                "Point til {n}. \"Nej nej, den var heldig.\" Den var ikke heldig.",
                "{n} kæmper sig tilbage. Stille. Effektivt. Uden at prale én gang.",
                "{n} reducerer. Hun siger undskyld til modstanderen. Igen."
            ]
        case .scoredLevel:
            return [
                "{n} udligner og skynder sig at sige, at det ikke var hendes fortjeneste. Det var det. 🎯",
                "Lige nu takket være {n}. Hun peger straks på sin makker."
            ]
        case .wonMatch:
            return [
                "{n} vandt! \"Det var mest min makker.\" Nej, {n}. Det var dig. 🎯",
                "Sejr til {n} – teknisk overlegen, verbalt beskeden."
            ]
        case .lostMatch:
            return [
                "{n} tabte, men spillede stadig pænere end alle andre på banen. 🎯",
                "{n} tabte kampen og undskyldte til hele hallen. Klassisk {n}."
            ]
        case .champion:
            return [
                "{n} ER MESTER! Hun siger \"det var vist bare en god dag\". Det var det ikke – hun er bedst. 🎯🏆",
                "{n} vinder det hele. Endelig matcher tavlen teknikken. 🏆"
            ]
        case .lastPlace:
            return [
                "{n} sidst? Statistisk umuligt. Teknisk uforklarligt. Hun siger \"jeg sagde jo, jeg var dårlig\". 🎯",
                "{n} i bunden – og det er stadig familiens flotteste baghånd."
            ]
        }
    }

    // MARK: Jens – bedre til at kode appen end til at spille padel

    private static func jens(_ situation: BanterSituation) -> [String] {
        switch situation {
        case .matchStart:
            return [
                "{n} går på banen. Han har brugt 40 timer på appen og 4 minutter på forhånden. 👨‍💻",
                "{n} er klar. Venstrehånden er i beta. Meget tidlig beta.",
                "{n} deployer sig selv til banen. Rollback er desværre ikke muligt."
            ]
        case .scoredWhileAhead:
            return [
                "{n} scorer OG fører! Han har helt sikkert hardcodet det her. 👨‍💻",
                "Point til {n}. `git commit -m \"feat: ramte bolden\"` ✅",
                "{n} i front! Venstrehånden virkede for én gangs skyld. Cache det!",
                "{n} scorer! Ingen ved hvordan. Heller ikke {n}. Det er udokumenteret adfærd.",
                "{n} fører. Nogen tjek lige om han har skrevet sin egen scoringsfunktion. 🐛",
                "{n} leverer i produktion. Det plejer at ende med en hotfix."
            ]
        case .scoredWhileBehind:
            return [
                "{n} scorer, men er bagud. Han skylder på en bug i banen. 🐛",
                "Point til {n}! Har du prøvet at slukke og tænde dig selv igen?",
                "{n} reducerer. Klassisk venstrehånds-noob-comeback. Statistisk usandsynligt.",
                "Stack overflow i {n}s baghånd – men point blev det da. 💥",
                "{n} kæmper. 404: Forhånd not found. Point alligevel! 👨‍💻",
                "{n} scorer bagudfra. Det er den bedste feature han har shippet i dag."
            ]
        case .scoredLevel:
            return [
                "{n} udligner! Merge conflict løst. Lige nu. 👨‍💻",
                "Lige stilling – {n} har lige refaktoreret sin serv."
            ]
        case .wonMatch:
            return [
                "{n} VANDT en kamp! Alle tests er grønne. Nogen skal fyre en champagne af. 🚀",
                "Sejr til {n}! Han koder stadig bedre, end han spiller – men i dag var det tæt."
            ]
        case .lostMatch:
            return [
                "{n} tabte. Han åbner en issue på banen. 🐛",
                "Nederlag til {n}. \"Det virkede på min maskine.\" 👨‍💻",
                "{n} tabte – den lefty noob. Tilbage til editoren.",
                "{n} er ude. Han lover at fikse det i næste release."
            ]
        case .champion:
            return [
                "{n} ER MESTER?! Nogen skal reviewe den kode. Det her ligner en exploit. 👨‍💻🏆",
                "{n} vinder det hele! Han byggede appen OG snød systemet. Imponerende. 🏆"
            ]
        case .lastPlace:
            return [
                "{n} sidst. Fuldstændig som appen forudsagde. Han kodede den selv. 👨‍💻",
                "{n} i bunden. Han er bedre til at kode denne app end til at spille padel. Bekræftet."
            ]
        }
    }

    // MARK: Casper – for god, for sød, urimeligt begge dele

    private static func casper(_ situation: BanterSituation) -> [String] {
        switch situation {
        case .matchStart:
            return [
                "{n} går på banen og roser modstanderne på forhånd. Hvem gør sådan noget? 😇",
                "{n} er klar – og har lige hjulpet alle andre med at binde snørebånd.",
                "{n} på banen. Han er både bedst og sødest. Det er ikke fair."
            ]
        case .scoredWhileAhead:
            return [
                "{n} scorer og undskylder bagefter. Hvor er han sød. Og irriterende god. 😇",
                "Point til {n}. Han hjalp lige modstanderen op bagefter.",
                "{n} fører – og siger \"flot forsøg!\" til den han lige har spillet ud af banen.",
                "{n} er for god. Både som menneske og som padelspiller. Vælg én, {n}. 😇",
                "{n} scorer med et perfekt slag og roser sin modstanders positionering. Utroligt.",
                "{n} dominerer venligt. Kan man overhovedet være sur på ham? Nej."
            ]
        case .scoredWhileBehind:
            return [
                "{n} scorer bagudfra – og siger stadig \"godt spillet!\" til dem der fører. 😇",
                "Point til {n}. Han er bagud og i strålende humør. Uhyggeligt.",
                "{n} kæmper sig ind i kampen med et smil. Selvfølgelig gør han det.",
                "{n} reducerer og spørger om modstanderen har det godt. 😇"
            ]
        case .scoredLevel:
            return [
                "{n} udligner og foreslår at man lige holder en vandpause. Sikke et menneske. 😇",
                "Lige nu – {n} siger det var lidt heldigt. Det var det ikke."
            ]
        case .wonMatch:
            return [
                "{n} vandt og gav alle high fives. Man kan ikke engang være misundelig. 😇",
                "Sejr til {n}. Han insisterer på at det var en holdindsats."
            ]
        case .lostMatch:
            return [
                "{n} tabte og smilede hele vejen. Han er simpelthen for sød til det her. 😇",
                "{n} er ude – og var den første til at klappe af vinderne."
            ]
        case .champion:
            return [
                "{n} ER MESTER! Han vil dele pokalen med alle. Selvfølgelig vil han det. 😇🏆",
                "{n} vinder det hele – for god, for sød, for uundgåelig. 🏆"
            ]
        case .lastPlace:
            return [
                "{n} sidst? Han er nok med vilje gået ned for at andre kunne få succes. 😇",
                "{n} i bunden af tavlen og toppen af familiens hjerter."
            ]
        }
    }

    // MARK: Gæstespillere

    private static func gaest(_ situation: BanterSituation) -> [String] {
        switch situation {
        case .matchStart:
            return ["{n} går på banen! 🎾", "{n} er klar til kamp!"]
        case .scoredWhileAhead:
            return ["{n} scorer og fører! 🎾", "Sådan, {n}! Flot slag.", "{n} udbygger føringen!"]
        case .scoredWhileBehind:
            return ["{n} kæmper sig tilbage! 🎾", "Point til {n} – comeback i sigte!", "{n} giver ikke op!"]
        case .scoredLevel:
            return ["{n} udligner! 🎾", "Lige stilling takket være {n}!"]
        case .wonMatch:
            return ["{n} vandt kampen! 🎾", "Sejr til {n}!"]
        case .lostMatch:
            return ["{n} tabte den her. Næste kamp er en ny chance.", "Nederlag til {n} – men kampen fortsætter."]
        case .champion:
            return ["{n} er mester! 🏆", "{n} vinder det hele! 🎾🏆"]
        case .lastPlace:
            return ["{n} sluttede sidst – men var med hele vejen. 🎾"]
        }
    }
}
