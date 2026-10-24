/* Marias Fødselsdagsturnering – "Hele familiens solstråle"
   Americano til familien. Ingen server, ingen login –
   alt bor i browseren på den telefon der tæller point. */

/* ============ Spillere ============ */
const P = {
  henrik:{name:'Henrik',emoji:'🔵',c:'#3D6BE8',tag:'Chelsea & Vejle Boldklub. Lidelsen er en livsstil.'},
  majbritt:{name:'Majbritt',emoji:'🎯',c:'#7BC47F',tag:'Ude med skade – passer børnebørnene. Jubi.',hurt:true},
  maria:{name:'Maria',emoji:'☀️',c:'#FFB03A',tag:'Fødselar og hele familiens solstråle. Og altså rigtig god.',star:true},
  thomas:{name:'Thomas',emoji:'😤',c:'#FF6B6B',tag:'Bedst. Altid. Irriterende.'},
  therese:{name:'Therese',emoji:'🔥',c:'#FF7A45',tag:'Temperament og elendig taber. Skal være sød mod Maria i dag.'},
  jens:{name:'Jens',emoji:'👨‍💻',c:'#8E7BFF',tag:'Har bygget siden. Det er også dét, han er bedst til.'},
  casper:{name:'Casper',emoji:'💼',c:'#2FA97B',tag:'Arbejder for meget. Er alligevel for god til det her.'},
  lykke:{name:'Lykke',emoji:'🍀',c:'#E86FA8',tag:'Potentialet er der stadig. Det bliver ved med at være potentiale.'}
};
const FAMILY = ['henrik','majbritt','maria','thomas','therese','jens','casper','lykke'];
const BIRTHDAY = 'maria';
const RIVALS = { therese:'maria', maria:'therese' };

/* ============ Kommentatorboksen ============ */
const B = {
 maria:{
  start:['{n} går på banen på sin egen fødselsdag. Alle andre spiller om andenpladsen. ☀️',
         'Så er fødselaren klar! Hele familiens solstråle i egen person. 🎂',
         '{n} på banen. Der er kage bagefter. Der er ingen undskyldninger.'],
  ahead:['{n} fører på sin egen fødselsdag! Nogen havde set det komme. ☀️',
         'Point til {n} – og hun er altså blevet rigtig god, den solstråle. 🎂',
         '{n} lægger den i hjørnet. Ren fødselsdagsform. ✨',
         '{n} scorer igen. Man skal ikke undervurdere fødselaren. ☀️',
         'SÅDAN {n}! Det slag var lige så flot som hende der slog det. 💛',
         '{n} dominerer. Hele familiens solstråle skinner lidt ekstra i dag. ☀️',
         '{n} styrer banen. Hun er ikke bare sød – hun er dygtig. 🎾'],
  behind:['{n} er bagud, men hun smiler stadig. Det er jo hendes dag. ☀️',
          'Point til {n}! Hun henter den. Det gør fødselarer. 🎂',
          '{n} kæmper sig tilbage – og vi hepper alle sammen. Alle sammen! 💛',
          'Bagud? På sin egen fødselsdag? Det finder {n} sig ikke i. ✨',
          '{n} reducerer. Solstrålen giver aldrig op. ☀️'],
  level:['{n} udligner! Fødselsdagsmagi. ☀️',
         'Lige nu takket være {n}. Dagens kvinde leverer. 🎂'],
  won:['{n} VANDT på sin egen fødselsdag! Sådan gør man det. 🎂☀️',
       'Sejr til fødselaren! Og hun takkede alle fire på banen bagefter. Selvfølgelig gjorde hun det. 💛'],
  lost:['{n} tabte – men det er stadig hendes dag, og hun er stadig vores solstråle. ☀️',
        'Nederlag til {n}. Det får hun kage for. 🎂'],
  champ:['{n} ER MESTER PÅ SIN EGEN FØDSELSDAG! Hele familiens solstråle tog det hele. ☀️🏆',
         '{n} vinder sin egen fødselsdagsturnering. Den bedste gave var åbenbart at tage den selv. 🎂🏆'],
  last:['{n} sidst – på sin fødselsdag. Det går ikke. Nogen giver hende kage nu. 🎂',
        '{n} i bunden, men nummer ét i familien. Som altid. ☀️'],
  rival:['{n} tager point fra Therese – på sin egen fødselsdag. Det er den bedste gave. 🎂',
         '{n} mod Therese! Tennisbanerne fra ungdommen ringer og vil have deres opgør tilbage. 🎾',
         '{n} scorer mod sin søster og smiler sødt. Therese koger indvendigt. ☀️']
 },
 casper:{
  start:['{n} er på banen. Telefonen er på lydløs. Den ringer alligevel. 💼',
         '{n} nåede det! Han skulle lige svare på en enkelt mail. Eller fjorten.',
         '{n} har taget fri. Det påstår han i hvert fald. 💼'],
  ahead:['{n} scorer mellem to møder. 💼',
         'Point til {n}! Han tjekkede lige sin mail imens. Begge dele gik fint.',
         '{n} fører. Og han har stadig ikke holdt fri i tre uger. 💼',
         '{n} er for god til det her. Tænk, hvis han også trænede i stedet for at arbejde.',
         '{n} vinder duellen, undskylder – og kigger på uret. Han skal noget.',
         'Point til {n}. Har du egentlig fri i dag, {n}? 💼'],
  behind:['{n} er bagud. Han har også været på arbejde siden klokken seks. 💼',
          'Point til {n}! Han lover at logge af efter den her kamp. Det har han sagt tre gange.',
          '{n} kæmper. Ferie er åbenbart noget, andre folk holder. 💼',
          '{n} reducerer – mellem to notifikationer.',
          'Point til {n}. Arbejdsmailen kan vente. Det kan den faktisk, {n}. 💼'],
  level:['{n} udligner! Og nej, han svarer ikke på den mail nu. 💼',
         'Lige nu – {n} har lige lagt telefonen fra sig. Historisk øjeblik.'],
  won:['{n} vandt! Han kalder det work-life-balance. Det er det ikke. 💼',
       'Sejr til {n}. Han gav alle high fives og gik så direkte hen til telefonen.'],
  lost:['{n} tabte. Han var sikkert til møde i baghånden. 💼',
        'Nederlag til {n} – og han var stadig den første til at rose vinderne.'],
  champ:['{n} ER MESTER! Og han vandt, mens han passede sit arbejde. Ad. 💼🏆'],
  last:['{n} sidst. Måske fordi han arbejdede under hele turneringen. 💼']
 },
 lykke:{
  start:['{n} går på banen. Potentialet er der stadig. Det bliver bare ved med at være potentiale. 🍀',
         '{n} er klar! I år er året. Det sagde vi også sidste år.',
         '{n} på banen – familiens mest lovende. Stadig. 🍀'],
  ahead:['{n} scorer OG fører! Vi har ventet på det her siden marts. 🍀',
         'Point til {n}! Der var fremgang. Mikroskopisk, men fremgang.',
         '{n} i front. Nogen skriv det ned, det skal med i familiekrøniken. 🍀',
         '{n} rammer den rent! Hun har kun øvet sig på det slag i halvandet år.',
         '{n} fører. Udviklingen går langsomt, men den går da den rigtige vej. 🍀'],
  behind:['{n} scorer bagudfra! Der er håb. Lidt. 🍀',
          'Point til {n}. Hun lærte noget nyt i dag. Igen. Det bliver ved med at ske. 🍀',
          '{n} kæmper videre med et smil – det har hun til gengæld altid været god til.',
          '{n} reducerer. Familien venter stadig tålmodigt på gennembruddet. 🍀',
          'Point til {n}! Tempoet i udviklingen er roligt. Meget roligt.'],
  level:['{n} udligner! Hvem havde regnet med det? Ikke os. 🍀',
         'Lige nu takket være {n}. Vi er lige så overraskede som hende.'],
  won:['{n} VANDT! Gennembruddet! Eller også var de andre bare dårlige. 🍀',
       'Sejr til {n}! Hun er lige så chokeret som resten af familien.'],
  lost:['{n} tabte. Næste år, {n}. Det sagde vi også sidste år. 🍀',
        'Nederlag til {n} – men hun er stadig den sødeste på banen.'],
  champ:['{n} ER MESTER?! Gennembruddet kom! Vi havde ærligt talt opgivet. 🍀🏆'],
  last:['{n} sidst. Fuldstændig som forventet. Vi elsker hende alligevel. 🍀']
 },
 jens:{
  start:['{n} går på banen. Han har bygget siden her. Det er også dét, han er bedst til. 👨‍💻',
         '{n} er klar. Venstrehånden er stadig i beta. Tredje år i træk.'],
  ahead:['{n} scorer OG fører! Han har helt sikkert hardcodet det. 👨‍💻',
         'Point til {n}. git commit -m "feat: ramte bolden" ✅',
         '{n} i front! Venstrehånden virkede for én gangs skyld.',
         '{n} scorer. Ingen ved hvordan. Heller ikke {n}. Udokumenteret adfærd. 🐛',
         '{n} fører. Nogen tjek lige, om han har skrevet sin egen scoringsfunktion.'],
  behind:['{n} er stadig dårlig. Han har bare fået en hjemmeside ud af det. 👨‍💻',
          'Point til {n}! Har du prøvet at slukke og tænde dig selv igen?',
          '{n} reducerer. Klassisk venstrehånds-noob-comeback. Statistisk usandsynligt.',
          "Stack overflow i {n}' baghånd – men point blev det da. 💥",
          '{n} kæmper. 404: Forhånd not found. 👨‍💻'],
  level:['{n} udligner! Merge conflict løst. Lige nu. 👨‍💻',
         'Lige stilling – {n} har lige refaktoreret sin serv. Det holder nok ikke.'],
  won:['{n} VANDT en kamp! Alle tests er grønne. Nogen fyre en champagne af. 🚀',
       'Sejr til {n}! Han koder stadig bedre, end han spiller. Men i dag var det tæt.'],
  lost:['{n} tabte. Han åbner en issue på banen. 🐛',
        'Nederlag til {n}. "Det virkede på min maskine." 👨‍💻',
        '{n} tabte – stadig den lefty noob. Tilbage til editoren.'],
  champ:['{n} ER MESTER?! Nogen skal reviewe den kode. Det her ligner en exploit. 👨‍💻🏆'],
  last:['{n} i bunden. Præcis som siden forudsagde. Han kodede den selv. 👨‍💻']
 },
 henrik:{
  start:['{n} går på banen med Chelsea-optimisme. Den plejer at holde i syv minutter. 🔵',
         '{n} er klar. Vejle Boldklub sender deres tanker og bønner. 🟡'],
  ahead:['{n} scorer OG fører! Det er flere gode nyheder, end Chelsea har fået hele sæsonen. 🔵',
         '{n} i front! Lige nu ligger han højere end Vejle i tabellen. Nyd det, det varer ikke. 🟡',
         'Point til {n}! Chelsea ville have brugt 80 mio. på det slag der.',
         '{n} fører suverænt. Det er officielt sæsonens Chelsea-highlight.',
         '{n} scorer! Vejle Boldklub overvejer at hente ham hjem på en fribetaling.',
         'Sådan, {n}! Du har allerede flere point end Vejle har haft skud på mål i år. 🟡'],
  behind:['{n} scorer, men er bagud. Klassisk Chelsea: flot statistik, elendigt resultat. 🔵',
          'Et point til {n}! Det er sådan, Vejle fejrer et uafgjort resultat. 🟡',
          '{n} reducerer. Trænerskiftet er udsat til på mandag.',
          '{n} kæmper bravt bagud. Chelsea-fans kender følelsen. Intimt.',
          '{n} scorer fra en håbløs position – det er ren Vejle-romantik.'],
  level:['{n} udligner! Chelsea plejer at tabe herfra, men lad os være positive. 🔵',
         'Lige nu, {n}! Det er den mest spændende stilling, Vejle har set i årevis. 🟡'],
  won:['{n} VINDER! Det er sjældnere end en Chelsea-sejr på udebane. 🔵',
       'Sejr til {n}! Vejle-fans græder. Af glæde. For en gangs skyld. 🟡'],
  lost:['{n} taber. Andenhalvlegs-kollaps. Helt efter Chelsea-manualen. 🔵',
        'Nederlag til {n}. Vejle Boldklub nikker genkendende og skænker en lille én. 🟡'],
  champ:['{n} ER MESTER! Chelsea sender lykønskninger fra midterbordet i tabellen. 🔵🏆'],
  last:['{n} sidst. Nedrykket. Igen. Vi ses i 1. division. 🟡']
 },
 thomas:{
  start:['{n} går på banen. Kampen er reelt afgjort. Vi spiller den alligevel. 😤',
         '{n} varmer op. Modstanderne varmer op til at tabe.'],
  ahead:['{n} scorer. Selvfølgelig gør han det. Irriterende. 😤',
         '{n} fører. Igen. Naturlovene er intakte.',
         'Point til {n}. Han gjorde det ikke engang svært. Så træls.',
         '{n} udbygger føringen uden at få pulsen op. Nogen tag en dopingprøve.',
         '{n} vinder duellen og ser ikke engang tilfreds ud. Det er det værste.'],
  behind:['{n} scorer – bagud?! Skriv dato og klokkeslæt ned. 😤',
          '{n} reducerer. Roen er ubærlig. Han VED han vinder alligevel.',
          'Point til {n}. Comebacket er i gang, og vi hader det allerede.',
          '{n} er bagud, men kigger på tavlen som om den er en trykfejl.'],
  level:['{n} udligner. Selvfølgelig. Vi troede aldrig på andet. 😤',
         'Lige nu – {n} har lige skiftet til andet gear. Ud af otte.'],
  won:['{n} vandt. Igen. Ingen er overraskede. Alle er irriterede. 😤',
       'Sejr til {n}. Han siger "det var tæt". Det var det ikke.'],
  lost:['{n} TABTE! Nogen har filmet det, ikke?! Vi skal bruge beviser. 📼',
        'Historisk øjeblik: {n} tabte. Dagen bør markeres i kalenderen.'],
  champ:['{n} er mester. Til sin søsters fødselsdag. Han kunne have ladet være. 😤🏆'],
  last:['{n} sidst?! Har nogen hacket siden? Det her kan ikke passe. 😤']
 },
 therese:{
  start:['{n} går på banen. Ketsjeren har allerede fortrudt. 🔥',
         '{n} er klar. Hun har lovet at være sød i dag. Det bliver svært.'],
  ahead:['{n} scorer og fører! Der er fred i huset. Indtil videre. 🔥',
         'Point til {n}! Se, hun er jo rigtig sød, når hun vinder.',
         '{n} i front. Ketsjeren overlever endnu en dag. 🔥',
         '{n} smadrer den i hjørnet. Med overskud, ikke med vrede. Denne gang.',
         'Point til {n}. Hun kigger triumferende rundt på hele familien.'],
  behind:['{n} scorer, men er bagud. Ketsjeren skal nok få skylden. 🔥',
          'Point til {n}! Vi tæller stille og roligt ned til det første råb.',
          '{n} reducerer. Pulsen er høj. Meget høj.',
          '{n} er bagud og kiggede lige vredt på nettet. Nettet gjorde ingenting.',
          'Point til {n}. Hun er ikke sur. Hun er "fokuseret".'],
  level:['{n} udligner! Krisen er afværget. Foreløbig. 🔥',
         'Lige nu – {n} trak lige vejret dybt. Det var tiltrængt.'],
  won:['{n} VANDT! Hele familien ånder lettet op. 🔥',
       'Sejr til {n}. Hun siger, hun aldrig var i tvivl. Det var vi andre.'],
  lost:['{n} tabte. Det var banen. Og lyset. Og vinden. Og makkeren. 🔥',
        'Nederlag til {n}. Ingen siger noget. Ingen kigger på hende. Sikkerhedsprotokol.',
        '{n} tabte – og verdens dårligste taber må ikke engang skælde ud i dag. Det er en fødselsdag. 🎂'],
  champ:['{n} ER MESTER! Til sin søsters fødselsdag. Hun siger tillykke. Det lyder anstrengt. 🔥🏆'],
  last:['{n} sidst. Vi flytter os alle sammen stille og roligt tre meter tilbage. 🔥'],
  rival:['{n} scorer mod fødselaren. Hun må ikke sige noget. Det er ved at slå hende ihjel. 🔥',
         'Søsteropgøret – på Marias fødselsdag. {n} spiller pænt. Det koster hende alt. 🔥',
         '{n} tager point fra Maria. Regnskabet fra tennisbanen er stadig åbent, fødselsdag eller ej.',
         '{n} vandt duellen mod Maria og sagde tillykke gennem sammenbidte tænder. 🎂🔥']
 },
 majbritt:{
  start:['{n} spiller med skade. Lægen sagde nej. {n} sagde også nej. Men her er vi. 🩹',
         '{n} er på banen i stedet for at passe børnebørn. Begge dele er risikabelt.'],
  ahead:['{n} fører. Med skade. Det er næsten provokerende. 🎯',
         '{n}: "Jeg er ellers ikke så god..." *scorer med skade*',
         'Point til {n}. Teknikken fejler intet, selvom resten gør. 🩹'],
  behind:['{n} er bagud, men spiller stadig pænere end alle andre. Med skade. 🎯',
          'Point til {n}. Hun undskylder. For hvad, {n}? Du er jo skadet.'],
  level:['{n} udligner. Med skade. Vi siger ikke mere. 🎯'],
  won:['{n} vandt. Med skade. Nogen ringer til børnebørnene og fortæller det. 🩹',
       'Sejr til {n} – teknisk overlegen, verbalt beskeden, fysisk ødelagt.'],
  lost:['{n} tabte. Hun havde også lige lovet at passe børnebørn bagefter. 🩹',
        '{n} tabte, men spillede stadig pænest i hallen.'],
  champ:['{n} ER MESTER – MED SKADE. Vi siger ikke mere. 🎯🏆'],
  last:['{n} sidst. Hun var skadet. Undskyldningen er for en gangs skyld helt ægte. 🩹']
 },
 gaest:{
  start:['{n} går på banen! 🎾'],
  ahead:['{n} scorer og fører! 🎾','Sådan, {n}! Flot slag.','{n} udbygger føringen!'],
  behind:['{n} kæmper sig tilbage! 🎾','Point til {n} – comeback i sigte!','{n} giver ikke op!'],
  level:['{n} udligner! 🎾','Lige stilling takket være {n}!'],
  won:['{n} vandt kampen! 🎾','Sejr til {n}!'],
  lost:['{n} tabte den her. Næste kamp er en ny chance.'],
  champ:['{n} er mester! 🏆'],
  last:['{n} sluttede sidst – men var med hele vejen. 🎾']
 }
};

/* Scorer man mod fødselaren, bemærker familien det. */
const BIRTHDAY_LINES = [
  '{n} scorer mod fødselaren. Det må man vist ikke. 🎂',
  '{n} tager point fra Maria. På hendes fødselsdag. Koldt. ❄️',
  '{n} scorer mod dagens kvinde. Ingen kage til {n}. 🎂',
  'Point til {n} – mod fødselaren. Familien noterer det. ✏️',
  '{n} viser ingen nåde mod fødselsdagsbarnet. 🎈'
];

const pick = a => a[Math.floor(Math.random() * a.length)];
const pool = (id, sit) => (B[id] && B[id][sit]) ? B[id][sit] : B.gaest[sit];
const line = (id, sit) => pick(pool(id, sit)).replace(/\{n\}/g, pl(id).name);

function rivalLine(scorer, opponents){
  const r = RIVALS[scorer];
  if(!r || opponents.indexOf(r) < 0 || !B[scorer] || !B[scorer].rival) return null;
  return pick(B[scorer].rival).replace(/\{n\}/g, pl(scorer).name);
}
function birthdayLine(scorer, opponents){
  if(scorer === BIRTHDAY || opponents.indexOf(BIRTHDAY) < 0) return null;
  return pick(BIRTHDAY_LINES).replace(/\{n\}/g, pl(scorer).name);
}

/* ============ Opslag der også dækker gæster ============ */
function pl(id){
  return P[id] || (S && S.guests && S.guests[id]) || {name:'?',emoji:'🎾',c:'#B3A090',tag:''};
}

/* ============ Americano-programlægger ============
   Alle skal spille PRÆCIS lige mange kampe – ellers kan point ikke
   sammenlignes. Det kan kun lade sig gøre, når antallet af pladser
   (4 · baner · runder) går lige op i antallet af spillere. Derfor
   styrer vi på kampe pr. spiller og regner runderne ud bagfra. */

const gcd = (a, b) => b ? gcd(b, a % b) : a;
const courtsIn = (n, c) => Math.max(1, Math.min(c, Math.floor(n / 4)));
const maxCourts = n => Math.max(1, Math.floor(n / 4));

/* Kampe pr. spiller skal være et multiplum af dette tal. */
function matchStep(n, courts){
  const slots = 4 * courtsIn(n, courts);
  return slots / gcd(n, slots);
}
/* Hvor mange runder giver det valgte antal kampe pr. spiller? */
function roundsFor(n, courts, each){
  return each * n / (4 * courtsIn(n, courts));
}
function validMatchCounts(n, courts, max){
  const step = matchStep(n, courts), out = [];
  for(let m = step; m <= (max || 16); m += step) out.push(m);
  return out;
}
function suggestedMatches(n, courts){
  const step = matchStep(n, courts);
  return Math.max(step, Math.ceil(4 / step) * step);
}

const pkey = (a, b) => a < b ? a + '|' + b : b + '|' + a;

function buildAttempt(ids, rounds, courts, startRound, played, rand){
  const games = {}, partner = {}, opp = {};
  ids.forEach(i => games[i] = 0);
  const reg = (A, Bm) => {
    A.concat(Bm).forEach(i => { if(i in games) games[i]++; });
    if(A.length === 2) partner[pkey(A[0], A[1])] = (partner[pkey(A[0], A[1])] || 0) + 1;
    if(Bm.length === 2) partner[pkey(Bm[0], Bm[1])] = (partner[pkey(Bm[0], Bm[1])] || 0) + 1;
    A.forEach(a => Bm.forEach(b => { const k = pkey(a, b); opp[k] = (opp[k] || 0) + 1; }));
  };
  played.forEach(m => reg(m.a, m.b));

  const sched = []; let cost = 0;
  const cip = courtsIn(ids.length, courts);
  for(let r = startRound; r <= rounds; r++){
    const tie = {}; ids.forEach(i => tie[i] = rand());
    // Altid dem med færrest kampe først – det holder forskellen på højst én,
    // og når pladserne går lige op, ender alle på præcis det samme.
    const q = ids.slice().sort((x, y) => games[x] - games[y] || tie[x] - tie[y]);
    const on = q.slice(0, cip * 4);
    for(let k = 0; k < cip; k++){
      const g = on.slice(k * 4, k * 4 + 4);
      const opts = [[[g[0],g[1]],[g[2],g[3]]], [[g[0],g[2]],[g[1],g[3]]], [[g[0],g[3]],[g[1],g[2]]]];
      let best = opts[0], bc = Infinity;
      opts.forEach(o => {
        const A = o[0], Bm = o[1];
        let v = (partner[pkey(A[0], A[1])] || 0) * 40 + (partner[pkey(Bm[0], Bm[1])] || 0) * 40;
        A.forEach(a => Bm.forEach(b => v += (opp[pkey(a, b)] || 0) * 6));
        if(v < bc){ bc = v; best = o; }
      });
      cost += bc; reg(best[0], best[1]);
      sched.push({round:r, court:k+1, a:best[0], b:best[1], sa:0, sb:0, fin:false});
    }
  }
  return {sched, cost, games};
}

function generate(ids, rounds, courts, startRound, played){
  let best = [], bc = Infinity, fallback = [], fc = Infinity;
  for(let t = 0; t < 120; t++){
    let s = t * 2654435761 + 7;
    const rand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s; };
    const r = buildAttempt(ids, rounds, courts, startRound, played, rand);
    const v = Object.keys(r.games).map(k => r.games[k]);
    const even = Math.max.apply(null, v) === Math.min.apply(null, v);
    if(even){ if(r.cost < bc){ bc = r.cost; best = r.sched; } }
    else if(r.cost < fc){ fc = r.cost; fallback = r.sched; }
  }
  // Kun hvis en helt lige fordeling er aritmetisk umulig, falder vi tilbage.
  return best.length ? best : fallback;
}

/* ============ Tilstand og lagring ============ */
const KEY = 'fvpc.bday.v1';
let S;

function fresh(){
  S = {
    phase:'attendance',
    roster:FAMILY.slice(),
    // Alle er med – undtagen Majbritt, der er ude med skade.
    present:FAMILY.filter(id => !P[id].hurt),
    guests:{},
    pts:16, courts:1, matchesEach:4,
    matches:[], gen:false,
    feed:[], tab:'kamp',
    sheet:null, showResult:false, champ:false
  };
  S.matchesEach = suggestedMatches(S.present.length, S.courts);
  save();
}
function save(){
  try{
    const copy = {}; Object.keys(S).forEach(k => { if(k !== 'sheet') copy[k] = S[k]; });
    localStorage.setItem(KEY, JSON.stringify(copy));
  }catch(e){ /* privat browsing – kører videre uden at gemme */ }
}
function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return false;
    const d = JSON.parse(raw);
    if(!d || !Array.isArray(d.roster) || !Array.isArray(d.matches)) return false;
    S = Object.assign({guests:{}, feed:[], sheet:null, showResult:false, champ:false, matchesEach:4}, d);
    S.sheet = null;
    return true;
  }catch(e){ return false; }
}

const isOn = id => S.present.indexOf(id) >= 0;
const active = () => S.roster.filter(isOn);
const cur = () => S.matches.find(m => !m.fin);
const canStart = () => active().length >= 4;
const roundsNow = () => roundsFor(active().length, S.courts, S.matchesEach);

function say(text, emoji, color){
  S.feed.unshift({text, emoji, color});
  if(S.feed.length > 40) S.feed.pop();
}
function sayFor(id, sit){ const p = pl(id); say(line(id, sit), p.emoji, p.c); }
function buzz(ms){ try{ if(navigator.vibrate) navigator.vibrate(ms); }catch(e){} }

/* ---- fremmøde og gæster ---- */
function hasPlayed(id){ return S.matches.some(m => m.a.indexOf(id) >= 0 || m.b.indexOf(id) >= 0); }

function snapMatches(){
  const n = active().length;
  if(n < 4) return;
  const step = matchStep(n, S.courts);
  // Rund op til nærmeste gyldige antal, så fordelingen altid går op.
  S.matchesEach = Math.max(step, Math.ceil(S.matchesEach / step) * step);
}
function clampCourts(){
  S.courts = Math.min(Math.max(1, S.courts), maxCourts(active().length));
  snapMatches();
}
function togglePresent(id){
  if(isOn(id)){
    if(hasPlayed(id)) return;
    S.present = S.present.filter(x => x !== id);
  } else S.present.push(id);
  clampCourts();
}
function addGuest(name){
  const n = (name || '').trim();
  if(!n) return false;
  if(S.roster.some(id => pl(id).name.toLowerCase() === n.toLowerCase())) return false;
  let i = 1; while(S.guests['g' + i]) i++;
  const id = 'g' + i;
  S.guests[id] = {name:n, emoji:'🎾', c:'#B3A090', tag:'Gæst til fødselsdagen.', guest:true};
  S.roster.push(id); S.present.push(id); clampCourts();
  return true;
}
function removeGuest(id){
  if(!pl(id).guest || hasPlayed(id)) return;
  S.roster = S.roster.filter(x => x !== id);
  S.present = S.present.filter(x => x !== id);
  delete S.guests[id]; clampCourts();
}

/* ---- dobbelttjek: spiller alle lige mange kampe? ---- */
function matchCounts(){
  const c = {}; active().forEach(i => c[i] = 0);
  S.matches.forEach(m => m.a.concat(m.b).forEach(i => { if(i in c) c[i]++; }));
  return c;
}
function equality(){
  const c = matchCounts(), ids = Object.keys(c);
  if(!ids.length) return {ok:true, each:0, min:0, max:0};
  const v = ids.map(k => c[k]);
  const min = Math.min.apply(null, v), max = Math.max.apply(null, v);
  return {ok: min === max, each:min, min:min, max:max, counts:c};
}

/* ---- turneringens gang ---- */
function startTournament(){
  if(!canStart()) return;
  clampCourts();
  const cip = courtsIn(active().length, S.courts);
  S.matches = [];
  for(let c = 1; c <= cip; c++) S.matches.push({round:1, court:c, a:[], b:[], sa:0, sb:0, fin:false});
  S.gen = false; S.phase = 'play'; S.tab = 'kamp'; S.feed = [];
  S.champ = false; S.showResult = false;
  say('Tillykke med fødselsdagen, Maria! Velkommen til din helt egen turnering. Sæt holdet – I kan sagtens gøre det, mens kampen kører. ☀️🎂','🎂','#FFB03A');
  keepAwake(true);
}
function playedCount(){
  const c = {}; active().forEach(i => c[i] = 0);
  S.matches.forEach(m => m.a.concat(m.b).forEach(i => { if(i in c) c[i]++; }));
  return c;
}
function setPlayer(id, team, idx){
  const m = cur(); if(!m) return;
  const existing = m[team][idx];
  m.a = m.a.filter(x => x !== id); m.b = m.b.filter(x => x !== id);
  const arr = m[team];
  if(existing !== undefined && arr.indexOf(existing) >= 0) arr[arr.indexOf(existing)] = id;
  else if(arr.length < 2) arr.push(id);
  else arr[Math.min(idx, 1)] = id;
  S.sheet = null;
}
function autoFill(){
  const m = cur(); if(!m) return;
  const taken = m.a.concat(m.b), c = playedCount();
  const q = active().filter(i => taken.indexOf(i) < 0)
                    .sort((x, y) => c[x] - c[y] || pl(x).name.localeCompare(pl(y).name, 'da'));
  while(m.a.length < 2 && q.length) m.a.push(q.shift());
  while(m.b.length < 2 && q.length) m.b.push(q.shift());
}
function addPoint(team){
  const m = cur(); if(!m || S.showResult) return;
  m['s' + team]++;
  const scorers = m[team], others = m[team === 'a' ? 'b' : 'a'];
  if(!scorers.length){
    say('Point til ' + (team === 'a' ? 'Hold Sol' : 'Hold Konfetti') + '! Nogen skulle måske sættes på banen. 🎾','🎾','#B3A090');
  } else {
    const scorer = pick(scorers);
    const lead = m.sa === m.sb ? null : (m.sa > m.sb ? 'a' : 'b');
    const sit = lead === null ? 'level' : (lead === team ? 'ahead' : 'behind');
    const rl = rivalLine(scorer, others);
    const bl = birthdayLine(scorer, others);
    const p = pl(scorer);
    if(rl && Math.random() < 0.4) say(rl, p.emoji, p.c);
    else if(bl && Math.random() < 0.25) say(bl, p.emoji, p.c);
    else sayFor(scorer, sit);
    if(Math.random() < 0.25 && others.length) sayFor(pick(others), 'behind');
  }
  buzz(12);
  if(m.sa + m.sb >= S.pts){ S.showResult = true; buzz([18, 60, 18]); }
}
function undoPoint(team){
  const m = cur(); if(!m || m['s' + team] === 0) return;
  m['s' + team]--;
  if(m.sa + m.sb < S.pts) S.showResult = false;
}
function confirmMatch(){
  const m = cur(); if(!m) return;
  // Uden fire spillere på banen kan regnskabet ikke gå op.
  if(m.a.length !== 2 || m.b.length !== 2) return;
  m.fin = true; S.showResult = false;
  if(m.sa === m.sb) say('Uafgjort! Ingen tabte. Alle er lidt utilfredse. 🤝','🤝','#B3A090');
  else {
    const w = m.sa > m.sb ? 'a' : 'b', l = w === 'a' ? 'b' : 'a';
    m[w].forEach(id => sayFor(id, 'won'));
    m[l].forEach(id => sayFor(id, 'lost'));
  }
  const first = Math.min.apply(null, S.matches.map(x => x.round));
  if(!S.gen && S.matches.filter(x => x.round === first).every(x => x.fin)){
    S.matches = S.matches.concat(
      generate(active(), roundsNow(), S.courts, first + 1, S.matches.filter(x => x.fin)));
    S.gen = true;
  }
  if(S.gen && S.matches.every(x => x.fin)){
    S.champ = true;
    const t = standings();
    if(t[0]) say(line(t[0].id, 'champ'), pl(t[0].id).emoji, pl(t[0].id).c);
    keepAwake(false);
  } else {
    const nx = cur();
    if(nx) nx.a.concat(nx.b).forEach(id => sayFor(id, 'start'));
  }
}
function regenerateUpcoming(){
  const played = S.matches.filter(m => m.fin);
  const last = played.length ? Math.max.apply(null, played.map(m => m.round)) : 0;
  S.matches = played.slice();
  const R = roundsNow();
  if(R > last) S.matches = S.matches.concat(generate(active(), R, S.courts, last + 1, played));
  S.gen = true; S.champ = false;
}
function standings(){
  const t = {}; active().forEach(i => t[i] = {id:i, pts:0, con:0, pl:0, w:0, l:0});
  S.matches.filter(m => m.fin).forEach(m => {
    [['a','b'], ['b','a']].forEach(pair => {
      const s = pair[0], o = pair[1];
      m[s].forEach(id => {
        const r = t[id]; if(!r) return;
        r.pts += m['s' + s]; r.con += m['s' + o]; r.pl++;
        if(m['s' + s] > m['s' + o]) r.w++; else if(m['s' + s] < m['s' + o]) r.l++;
      });
    });
  });
  return Object.keys(t).map(k => t[k]).sort((x, y) =>
    y.pts - x.pts || (y.pts - y.con) - (x.pts - x.con) || y.w - x.w ||
    pl(x.id).name.localeCompare(pl(y.id).name, 'da'));
}

/* ---- skærmen må ikke slukke midt i en kamp ---- */
let wakeLock = null;
async function keepAwake(on){
  try{
    if(on && 'wakeLock' in navigator && !wakeLock){
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    } else if(!on && wakeLock){ await wakeLock.release(); wakeLock = null; }
  }catch(e){ /* ikke understøttet – ikke kritisk */ }
}
document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'visible' && S && S.phase === 'play' && !S.champ) keepAwake(true);
});

/* ============ Visning ============ */
const viewEl = document.getElementById('view');
const tabsEl = document.getElementById('tabs');
const titleEl = document.getElementById('navTitle');
const subEl = document.getElementById('navSub');
const overlayEl = document.getElementById('overlay');
const TABS = [['kamp','🎾','Kamp'],['stilling','📊','Stilling'],['program','🗓','Program'],['regler','⚙️','Regler']];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const av = id => `<span class="avatar" style="background:${pl(id).c}2E">${pl(id).emoji}</span>`;
const nm = id => esc(pl(id).name);
const TEAM_NAME = {a:'HOLD SOL ☀️', b:'HOLD KONFETTI 🎉'};

/* --- Trin 1: fremmøde --- */
function viewAttendance(){
  const n = active().length;
  return `
  <div class="bday">
    <div class="cake">🎂</div>
    <div class="who">Tillykke, Maria!</div>
    <div class="theme">Hele familiens solstråle</div>
  </div>
  ${stepIndicator(1)}
  <div class="intro">
    <h2>Hvem er med?</h2>
    <p>Tryk spillerne til og fra. Majbritt er slået fra – hun er ude med skade.</p>
  </div>
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div class="sec-label" style="margin:0">👥 Familien Vestergaard</div>
      <div style="font-family:var(--display);font-weight:700;font-size:1.3rem;color:${n>=4?'var(--mint)':'var(--coral)'}">${n}</div>
    </div>
    ${S.roster.map(id => {
      const on = isOn(id), locked = hasPlayed(id), p = pl(id);
      return `<div class="att ${on?'on':'off'}">
        <button class="hit" type="button" data-act="toggle" data-p="${id}" aria-pressed="${on}">
          ${av(id)}
          <span style="flex:1"><b>${nm(id)}${p.star?' <span class="star">🎂</span>':''}${p.hurt&&!on?'<span class="hurt">skadet</span>':''}</b>
          <small>${esc(p.tag)}</small></span>
          <span class="tick" aria-hidden="true">${on?'✓':'○'}</span>
        </button>
        ${p.guest && !locked ? `<button class="del" type="button" data-act="delguest" data-p="${id}" aria-label="Fjern ${nm(id)}">🗑</button>` : ''}
      </div>`;
    }).join('')}
    <div class="guest-add">
      <input id="guestInput" type="text" placeholder="Navn på gæst" autocomplete="off" enterkeyhint="done">
      <button type="button" data-act="addguest" aria-label="Tilføj gæst">＋</button>
    </div>
    <div class="bulk">
      <button type="button" data-act="allon">Vælg alle</button>
      <button type="button" data-act="alloff">Fravælg alle</button>
    </div>
  </div>
  <button class="btn" type="button" data-act="tolength" ${n<4?'disabled':''}>Videre til kamplængde</button>
  ${n<4 ? '<p class="muted" style="text-align:center;color:var(--coral)">Der skal være mindst 4 spillere til stede.</p>' : ''}`;
}

/* --- Trin 2: kamplængde og antal kampe --- */
function viewLength(){
  const n = active().length, step = matchStep(n, S.courts);
  const rounds = roundsNow(), mc = maxCourts(n);
  const preset = v => `<button class="preset ${S.pts===v?'on':''}" type="button" data-act="pts" data-v="${v}" aria-pressed="${S.pts===v}">
      <b>${v}</b><span>POINT</span><i>${v/4} serve hver</i></button>`;
  return `
  ${stepIndicator(2)}
  <div class="intro">
    <h2>Hvor lange, og hvor mange?</h2>
    <p>Kampen slutter, når de to hold tilsammen har scoret så mange point.</p>
  </div>
  <div class="card">
    <div class="preset-grid">${preset(8)}${preset(16)}</div>
    <div class="numrow">
      <span class="lab">Andet</span>
      <span class="ctl">
        <button type="button" data-act="pts-" ${S.pts<=4?'disabled':''} aria-label="Færre point">−</button>
        <span class="v">${S.pts}</span>
        <button type="button" data-act="pts+" ${S.pts>=48?'disabled':''} aria-label="Flere point">＋</button>
      </span>
    </div>
    <p class="muted" style="margin-top:10px">${S.pts/4} serve til hver spiller. Det er sikkert ikke de officielle regler – men det er Familien Vestergaards.</p>
  </div>
  <div class="card">
    <div class="sec-label">🎾 Kampe pr. spiller</div>
    <div class="numrow">
      <span class="lab">Alle spiller<small>Det samme antal – ellers kan point ikke sammenlignes</small></span>
      <span class="ctl">
        <button type="button" data-act="me-" ${S.matchesEach<=step?'disabled':''} aria-label="Færre kampe">−</button>
        <span class="v">${S.matchesEach}</span>
        <button type="button" data-act="me+" ${S.matchesEach>=16?'disabled':''} aria-label="Flere kampe">＋</button>
      </span>
    </div>
    <div class="numrow">
      <span class="lab">Antal baner</span>
      <span class="ctl">
        <button type="button" data-act="crt-" ${S.courts<=1?'disabled':''} aria-label="Færre baner">−</button>
        <span class="v">${S.courts}</span>
        <button type="button" data-act="crt+" ${S.courts>=mc?'disabled':''} aria-label="Flere baner">＋</button>
      </span>
    </div>
    <div class="guarantee" style="margin-top:12px">
      <span class="mark" aria-hidden="true">✓</span>
      <span><b>Alle ${n} spiller præcis ${S.matchesEach} kampe</b>
      <span>Det giver ${rounds} runder${S.courts>1?` på ${S.courts} baner`:''}.
      ${step>1?`Med ${n} spillere${S.courts>1?` på ${S.courts} baner`:' på én bane'} går det kun op i spring af ${step}.`:''}</span></span>
    </div>
  </div>
  <button class="btn" type="button" data-act="start">Start fødselsdagsturneringen 🎂</button>
  <button class="btn secondary" type="button" data-act="toattendance">← Tilbage til fremmøde</button>`;
}

function stepIndicator(step){
  const d = (n, lab, on) => `<span class="dot ${on?'on':''}"><span class="num">${n}</span><span class="lbl">${lab}</span></span>`;
  return `<div class="stepind">${d(1,'Fremmøde',true)}<span class="rail ${step===2?'on':''}"></span>${d(2,'Kampene',step===2)}</div>`;
}

/* --- Kamp --- */
function slotHTML(m, team, i){
  const id = m[team][i];
  return id
    ? `<button class="slot filled" type="button" data-act="slot" data-team="${team}" data-i="${i}">${pl(id).emoji} ${nm(id)}</button>`
    : `<button class="slot empty" type="button" data-act="slot" data-team="${team}" data-i="${i}">＋ Vælg</button>`;
}
function viewKamp(){
  const m = cur();
  if(!m) return `<div class="card empty-state">
      <div class="big">🏆</div><h3>Alle kampe er spillet!</h3>
      <p class="muted">Kig i Stilling for at se, hvem der løb med æren på Marias fødselsdag.</p>
      <button class="btn" type="button" data-act="showchamp" style="margin-top:16px">Kår mesteren</button></div>`;

  const total = m.sa + m.sb, frac = Math.min(total / S.pts, 1) * 100;
  const lead = m.sa === m.sb ? null : (m.sa > m.sb ? 'a' : 'b');
  const inRound = S.matches.filter(x => x.round === m.round).reduce((acc, x) => acc.concat(x.a, x.b), []);
  const bench = active().filter(i => inRound.indexOf(i) < 0);
  const done = S.matches.filter(x => x.fin).length;
  const full = m.a.length === 2 && m.b.length === 2;
  const team = t => `
    <div class="team ${lead===t?'lead-'+t:''}" data-side="${t}">
      <div class="tname">${TEAM_NAME[t]}</div>
      <div class="slots">${slotHTML(m,t,0)}${slotHTML(m,t,1)}</div>
      <div class="bigscore">${m['s'+t]}</div>
      <button class="pointbtn" type="button" data-act="point" data-team="${t}">＋ Point</button>
      <button class="undo" type="button" data-act="undo" data-team="${t}" ${m['s'+t]===0?'disabled':''}>↩ Fortryd</button>
    </div>`;

  return `
  <div class="round-head">
    <div class="r">RUNDE ${m.round} · BANE ${m.court}</div>
    <div class="m">Kamp ${done+1} af ${Math.max(S.matches.length, done+1)} · ${S.pts} point</div>
  </div>
  ${!full ? `<div class="card raised hint">
    <span class="bulb" aria-hidden="true">☝</span>
    <div style="flex:1"><h4>Sæt holdet mens kampen kører</h4><p>Tryk på en tom plads for at vælge en spiller.</p></div>
    <button class="auto" type="button" data-act="auto">Auto</button></div>` : ''}
  <div class="scoreboard">${team('a')}${team('b')}</div>
  <div class="card">
    <div class="prog-head"><span>${total} / ${S.pts} point spillet</span>${total>=S.pts?'<span class="done">Kampen er slut!</span>':''}</div>
    <div class="bar"><span style="width:${frac}%"></span></div>
    ${total>=S.pts?`<button class="btn" type="button" data-act="showresult" style="margin-top:12px">Se resultatet</button>`:''}
  </div>
  ${bench.length ? `<div class="card">
    <p class="eyebrow" style="margin-bottom:9px">På bænken</p>
    <div class="bench">${bench.map(i=>`<span class="chip">${pl(i).emoji} ${nm(i)}</span>`).join('')}</div>
  </div>` : ''}
  <div class="card">
    <div class="sec-label">📣 Kommentatorboksen</div>
    <div class="feed">${S.feed.slice(0,12).map((f,i)=>
      `<div class="feed-item ${i===0?'fresh':''}"><span class="avatar" style="background:${f.color}2E">${f.emoji}</span><p>${esc(f.text)}</p></div>`).join('')}</div>
  </div>`;
}

function viewStilling(){
  const t = standings(), eq = equality();
  if(!S.matches.some(m => m.fin)) return `<div class="card empty-state">
    <div class="big">📋</div><h3>Ingen kampe er spillet endnu</h3>
    <p class="muted">Så snart første kamp er godkendt, begynder tallene at tale. Og de kommer til at tale om Thomas.</p></div>`;
  const medal = ['🥇','🥈','🥉'], h = [104,82,66], order = [1,0,2];
  const pod = order.filter(i => t[i]).map(i => `<div class="pod">
      <div style="font-size:1.7rem">${pl(t[i].id).emoji}</div>
      <div class="nm">${nm(t[i].id)}</div>
      <div class="pt">${t[i].pts}</div>
      <div class="block" style="height:${h[i]}px;background:${pl(t[i].id).c}33">${medal[i]}</div>
    </div>`).join('');
  return `<div class="podium">${pod}</div>
    ${eqBox(eq)}
    <div class="card"><table class="stand">
      <thead><tr><th>#</th><th>Spiller</th><th>K</th><th>+/−</th><th>Point</th></tr></thead>
      <tbody>${t.map((r,i) => { const d = r.pts - r.con;
        return `<tr class="${i===0?'top':''}"><td class="rank">${i+1}</td>
          <td class="who">${pl(r.id).emoji} ${nm(r.id)}<small>${r.w} sejre · ${r.l} nederlag</small></td>
          <td>${r.pl}</td><td class="${d>=0?'diff-pos':'diff-neg'}">${d>0?'+':''}${d}</td>
          <td class="pts">${r.pts}</td></tr>`; }).join('')}</tbody>
    </table></div>`;
}

/* Dobbelttjekket, synligt i appen. */
function eqBox(eq){
  const planned = S.matchesEach;
  if(eq.ok) return `<div class="guarantee">
      <span class="mark" aria-hidden="true">✓</span>
      <span><b>Alle spiller lige mange kampe</b>
      <span>${eq.each} ${eq.each===1?'kamp':'kampe'} til hver i programmet${planned&&planned!==eq.each?` (målet er ${planned})`:''} – så kan pointene sammenlignes.</span></span>
    </div>`;
  return `<div class="guarantee bad">
      <span class="mark" aria-hidden="true">!</span>
      <span><b>Ikke lige mange kampe endnu</b>
      <span>Nogen har ${eq.min} og andre ${eq.max}. Læg programmet om under Regler, så det går op igen.</span></span>
    </div>`;
}

function viewProgram(){
  const rounds = S.matches.map(m => m.round).filter((v,i,a) => a.indexOf(v) === i).sort((a,b) => a-b);
  const c = cur(), eq = equality();
  const side = (m, team) => {
    const ids = m[team], win = m.fin && m.sa !== m.sb && ((m.sa > m.sb ? 'a' : 'b') === team);
    if(!ids.length) return `<span class="tbd">Ikke sat endnu</span>`;
    return ids.map(i => `<div class="${win?'win':''}">${pl(i).emoji} ${nm(i)}</div>`).join('');
  };
  return eqBox(eq)
    + (S.gen ? '' : `<div class="card raised" style="display:flex;gap:12px;align-items:center">
      <span style="font-size:1.6rem">🗓️</span>
      <p class="muted">Resten af programmet lægges, så snart første runde er godkendt – så tæller den faktiske opstilling med i fordelingen.</p></div>`)
    + rounds.map(r => {
      const ms = S.matches.filter(m => m.round === r), now = c && c.round === r;
      return `<div class="card round-card ${now?'now':''}">
        <div class="rc-head"><b>RUNDE ${r}</b>${now?'<span class="now-pill">SPILLES NU</span>':''}</div>
        ${ms.map(m => `<div class="fixture ${m.fin?'played':''}">
          <div class="side-a">${side(m,'a')}</div>
          <div class="mid">${m.fin?`${m.sa}–${m.sb}`:'vs'}<small>Bane ${m.court}</small></div>
          <div class="side-b">${side(m,'b')}</div></div>`).join('')}
      </div>`; }).join('');
}

function viewRegler(){
  const n = active().length, step = matchStep(n, S.courts), mc = maxCourts(n);
  const num = (lab, sub, val, dec, inc, decOff, incOff) => `<div class="numrow">
      <span class="lab">${lab}${sub?`<small>${sub}</small>`:''}</span>
      <span class="ctl">
        <button type="button" data-act="${dec}" ${decOff?'disabled':''} aria-label="Færre">−</button>
        <span class="v">${val}</span>
        <button type="button" data-act="${inc}" ${incOff?'disabled':''} aria-label="Flere">＋</button>
      </span></div>`;
  return `
  <div class="card">
    <div class="sec-label">⚙️ Regler</div>
    ${num('Point pr. kamp', `${S.pts/4} serve hver`, S.pts, 'pts-', 'pts+', S.pts<=4, S.pts>=48)}
    ${num('Kampe pr. spiller', `Spring af ${step} med ${n} spillere`, S.matchesEach, 'me-', 'me+', S.matchesEach<=step, S.matchesEach>=16)}
    ${num('Antal baner', '', S.courts, 'crt-', 'crt+', S.courts<=1, S.courts>=mc)}
    <div class="numrow"><span class="lab">Runder i alt</span>
      <span class="v" style="font-family:var(--display);font-weight:700;font-size:1.25rem;color:var(--sun-d)">${roundsNow()}</span></div>
    <button class="btn" type="button" data-act="regen" style="margin-top:14px">Læg programmet om</button>
    <p class="muted" style="margin-top:10px">Spillede kampe bevares. Kun de resterende runder lægges om.</p>
  </div>
  ${eqBox(equality())}
  <div class="card">
    <div class="sec-label">✅ Fremmøde</div>
    ${S.roster.map(id => {
      const on = isOn(id), locked = hasPlayed(id), p = pl(id);
      return `<div class="att ${on?'on':'off'}">
        <button class="hit" type="button" data-act="toggle" data-p="${id}" aria-pressed="${on}">
          ${av(id)}<span style="flex:1"><b>${nm(id)}${p.hurt&&!on?'<span class="hurt">skadet</span>':''}</b>${locked&&on?'<small>har spillet – kan ikke meldes fra</small>':''}</span>
          <span class="tick" aria-hidden="true">${on?'✓':'○'}</span>
        </button></div>`; }).join('')}
    <div class="guest-add">
      <input id="guestInput" type="text" placeholder="Navn på gæst" autocomplete="off" enterkeyhint="done">
      <button type="button" data-act="addguest" aria-label="Tilføj gæst">＋</button>
    </div>
    <p class="muted" style="margin-top:10px">Melder du nogen til undervejs, kommer de med, når du lægger programmet om.</p>
  </div>
  <div class="card">
    <div class="sec-label">🎭 Hvem er hvem</div>
    ${S.roster.map(id => `<div class="att on" style="align-items:flex-start">
      ${av(id)}<div style="flex:1"><b style="font-family:var(--display);font-size:.95rem">${nm(id)}</b>
      <small style="display:block;font-size:.75rem;color:var(--ink-soft);line-height:1.4">${esc(pl(id).tag)}</small></div></div>`).join('')}
  </div>
  <div class="card">
    <button class="btn secondary" type="button" data-act="newtour" style="color:var(--coral)">Ny turnering – samme spillere</button>
    <button class="btn secondary" type="button" data-act="wipe" style="color:var(--coral)">Start helt forfra</button>
    <p class="muted" style="text-align:center;margin-top:8px">Turneringen gemmes på denne telefon og virker uden net.</p>
  </div>`;
}

/* --- Ark --- */
function pickerHTML(){
  const t = S.sheet.team, i = S.sheet.i, m = cur();
  if(!m) return '';
  const c = playedCount(), onSlot = m[t][i];
  return `<div class="sheet-back" data-act="closesheet" role="dialog" aria-modal="true" aria-label="Vælg spiller">
    <div class="sheet" data-stop="1">
      <h3>Vælg spiller</h3>
      <p class="sub">Hvem skal på ${t==='a'?'Hold Sol':'Hold Konfetti'}?</p>
      ${active().map(id => {
        const here = m.a.concat(m.b).indexOf(id) >= 0, isThis = onSlot === id;
        return `<button class="pick ${isThis?'on':''}" type="button" data-act="pickp" data-p="${id}">
          ${av(id)}<span style="flex:1"><b>${nm(id)}</b>
          <small>${here&&!isThis?'Står allerede på banen – flyttes hertil':(c[id]||0)+' kampe i programmet'}</small></span>
          ${isThis?'<span class="tick">✓</span>':''}</button>`; }).join('')}
      ${onSlot!==undefined?`<button class="pick" type="button" data-act="clearslot" style="justify-content:center;color:var(--coral);font-weight:700">Ryd pladsen</button>`:''}
      <button class="btn secondary" type="button" data-act="closesheet">Luk</button>
    </div></div>`;
}
function resultHTML(){
  const m = cur(); if(!m) return '';
  const drew = m.sa === m.sb, win = drew ? null : (m.sa > m.sb ? 'a' : 'b');
  const full = m.a.length === 2 && m.b.length === 2;
  const col = t => `<div class="result-col" data-side="${t}"><div class="n">${m['s'+t]}</div>
      ${m[t].map(i => `<div class="who">${pl(i).emoji} ${nm(i)}</div>`).join('')}</div>`;
  return `<div class="sheet-back" role="dialog" aria-modal="true" aria-label="Resultat">
    <div class="sheet">
      <div style="text-align:center;font-size:2.6rem">${drew?'🤝':'🎉'}</div>
      <h3 style="margin-top:8px">${drew?'Uafgjort!':(win==='a'?'Hold Sol':'Hold Konfetti')+' vinder!'}</h3>
      <div class="result-score">${col('a')}<span style="font-family:var(--display);font-size:1.5rem;color:var(--ink-soft)">–</span>${col('b')}</div>
      ${!full?`<div class="guarantee bad" style="margin-bottom:14px">
        <span class="mark" aria-hidden="true">!</span>
        <span><b>Der mangler spillere på banen</b>
        <span>Sæt alle fire på, før kampen godkendes – ellers går regnskabet ikke op, og pointene kan ikke sammenlignes.</span></span></div>`:`
      <div class="card" style="margin-bottom:16px">
        <div class="sec-label" style="font-size:.85rem">📣 Fra kommentatorboksen</div>
        <div class="feed">${S.feed.slice(0,3).map(f =>
          `<div class="feed-item"><span class="avatar" style="background:${f.color}2E">${f.emoji}</span><p>${esc(f.text)}</p></div>`).join('')}</div>
      </div>`}
      <button class="btn" type="button" data-act="confirm" ${full?'':'disabled'}>Godkend og gå videre</button>
      <button class="btn secondary" type="button" data-act="backtoplay">Tilbage – vi spiller videre</button>
    </div></div>`;
}
function champHTML(){
  const t = standings(); if(!t.length) return '';
  const w = t[0], l = t[t.length - 1];
  const bits = Array.from({length:26}, (_, i) => {
    const e = ['🎾','🎉','🏆','✨','🥇','🎊','🎂','🎈'][i % 8];
    return `<i style="left:${Math.round(Math.random()*94)}%;font-size:${(14+Math.random()*14)|0}px;
      animation-duration:${(3.2+Math.random()*3).toFixed(1)}s;animation-delay:${(Math.random()*3).toFixed(1)}s">${e}</i>`;
  }).join('');
  return `<div class="champ-wrap" role="dialog" aria-modal="true" aria-label="Mester">
    <div class="confetti" aria-hidden="true">${bits}</div>
    <div class="champ">
      <div class="cup">🏆</div><div class="lab">MESTER</div>
      <div style="font-size:2.6rem;margin-top:8px">${pl(w.id).emoji}</div>
      <div class="nm">${nm(w.id)}</div>
      <div class="sc">${w.pts} point · ${w.w} sejre · ${w.pl} kampe</div>
      <div class="quote">${esc(line(w.id,'champ'))}</div>
      ${t.length>1?`<div class="last"><div class="l">SIDSTEPLADSEN</div>
        <div class="n">${pl(l.id).emoji} ${nm(l.id)}</div>
        <div class="q">${esc(line(l.id,'last'))}</div></div>`:''}
      <button class="btn" type="button" data-act="closechamp">Luk</button>
      <button class="btn secondary" type="button" data-act="newtour">Ny turnering – revanche!</button>
    </div></div>`;
}

/* --- Render --- */
const TITLES = {kamp:'Marias fødselsdag', stilling:'Stilling', program:'Program', regler:'Indstillinger'};
function render(){
  if(S.phase === 'attendance'){ titleEl.textContent = 'Hvem er med?'; viewEl.innerHTML = viewAttendance(); }
  else if(S.phase === 'length'){ titleEl.textContent = 'Kampene'; viewEl.innerHTML = viewLength(); }
  else {
    titleEl.textContent = TITLES[S.tab] || 'Marias fødselsdag';
    viewEl.innerHTML = S.tab === 'kamp' ? viewKamp()
                     : S.tab === 'stilling' ? viewStilling()
                     : S.tab === 'program' ? viewProgram() : viewRegler();
  }
  const playing = S.phase === 'play';
  tabsEl.hidden = !playing;
  tabsEl.innerHTML = playing ? TABS.map(t =>
    `<button type="button" data-act="tab" data-tab="${t[0]}" aria-selected="${S.tab===t[0]}">
      <span class="ic" aria-hidden="true">${t[1]}</span>${t[2]}</button>`).join('') : '';
  overlayEl.innerHTML = S.champ ? champHTML() : S.showResult ? resultHTML() : S.sheet ? pickerHTML() : '';
  document.body.style.overflow = (S.champ || S.showResult || S.sheet) ? 'hidden' : '';
  save();
}

/* ============ Interaktion ============ */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if(!el) return;
  const a = el.dataset.act;
  if(el.classList.contains('sheet-back') && e.target.closest('[data-stop]')) return;
  const step = () => matchStep(active().length, S.courts);

  switch(a){
    case 'toggle':   togglePresent(el.dataset.p); break;
    case 'delguest': removeGuest(el.dataset.p); break;
    case 'addguest': {
      const inp = document.getElementById('guestInput');
      if(inp && addGuest(inp.value)) inp.value = '';
      break;
    }
    case 'allon':  S.roster.forEach(id => { if(!isOn(id)) S.present.push(id); }); clampCourts(); break;
    case 'alloff': S.present = S.present.filter(hasPlayed); clampCourts(); break;
    case 'tolength': S.matchesEach = suggestedMatches(active().length, S.courts); S.phase = 'length'; break;
    case 'toattendance': S.phase = 'attendance'; break;
    case 'pts':  S.pts = +el.dataset.v; break;
    case 'pts+': S.pts = Math.min(48, S.pts + 4); break;
    case 'pts-': S.pts = Math.max(4, S.pts - 4); break;
    case 'me+':  S.matchesEach = Math.min(16, S.matchesEach + step()); break;
    case 'me-':  S.matchesEach = Math.max(step(), S.matchesEach - step()); break;
    case 'crt+': S.courts = Math.min(maxCourts(active().length), S.courts + 1); snapMatches(); break;
    case 'crt-': S.courts = Math.max(1, S.courts - 1); snapMatches(); break;
    case 'start':  startTournament(); break;
    case 'regen':  regenerateUpcoming(); S.tab = 'program'; break;
    case 'tab':    S.tab = el.dataset.tab; break;
    case 'slot':   S.sheet = {team: el.dataset.team, i: +el.dataset.i}; break;
    case 'pickp':  setPlayer(el.dataset.p, S.sheet.team, S.sheet.i); break;
    case 'clearslot': { const m = cur(); if(m) m[S.sheet.team].splice(S.sheet.i, 1); S.sheet = null; break; }
    case 'closesheet': S.sheet = null; break;
    case 'point':  addPoint(el.dataset.team); break;
    case 'undo':   undoPoint(el.dataset.team); break;
    case 'auto':   autoFill(); break;
    case 'showresult': S.showResult = true; break;
    case 'backtoplay': S.showResult = false; break;
    case 'confirm': confirmMatch(); break;
    case 'showchamp': S.champ = true; break;
    case 'closechamp': S.champ = false; S.tab = 'stilling'; break;
    case 'newtour': {
      const keep = {roster:S.roster, present:S.present, guests:S.guests,
                    pts:S.pts, courts:S.courts, matchesEach:S.matchesEach};
      fresh(); Object.assign(S, keep);
      break;
    }
    case 'wipe':
      if(!confirm('Slet alt – både gæster og resultater?')) return;
      try{ localStorage.removeItem(KEY); }catch(err){}
      fresh();
      break;
    default: return;
  }
  render();
});

document.addEventListener('keydown', e => {
  if(e.key === 'Enter' && e.target.id === 'guestInput'){
    e.preventDefault();
    if(addGuest(e.target.value)) e.target.value = '';
    render();
    const again = document.getElementById('guestInput');
    if(again) again.focus();
  }
  if(e.key === 'Escape' && S.sheet){ S.sheet = null; render(); }
});

/* ============ Installationstip på iPhone ============ */
(function installHint(){
  const box = document.getElementById('installHint');
  const close = document.getElementById('installClose');
  if(!box || !close) return;
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  let dismissed = false;
  try{ dismissed = localStorage.getItem('fvpc.hint') === 'off'; }catch(e){}
  if(iOS && !standalone && !dismissed) box.hidden = false;
  close.addEventListener('click', () => {
    box.hidden = true;
    try{ localStorage.setItem('fvpc.hint', 'off'); }catch(e){}
  });
})();

/* ============ Service worker ============ */
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ============ Start ============ */
if(!load()) fresh();
if(S.phase === 'play' && !S.champ) keepAwake(true);
render();
