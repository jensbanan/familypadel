/* Familien Vestergaard Padel Championship
   Americano-turnering til familien. Ingen server, ingen login –
   alt bor i browseren på den telefon der tæller point. */
/* ============ Spillere ============ */
const P = {
  henrik:{name:'Henrik',emoji:'🔵',c:'#3D6BE8',tag:'Chelsea & Vejle Boldklub. Lidelsen er en livsstil.'},
  majbritt:{name:'Majbritt',emoji:'🎯',c:'#C8F560',tag:'"Jeg er ellers ikke så god..." (hun er bedst)'},
  maria:{name:'Maria',emoji:'🌸',c:'#FF8FB1',tag:'Familiens solstråle. Skal have ros hvert 30. sekund.'},
  thomas:{name:'Thomas',emoji:'😤',c:'#FF6B5B',tag:'Bedst. Altid. Irriterende.'},
  therese:{name:'Therese',emoji:'🔥',c:'#FF7A45',tag:'Søsteropgør med Maria siden tennisbanen. Temperament og elendig taber.'},
  jens:{name:'Jens',emoji:'👨‍💻',c:'#8E7BFF',tag:'Koder bedre, end han spiller. Venstrehånds-noob.'},
  casper:{name:'Casper',emoji:'😇',c:'#4FE0C1',tag:'For god. For sød. Begge dele er urimeligt.'},
  lykke:{name:'Lykke',emoji:'🍀',c:'#FFD166',tag:'Familiens nyeste. Børnene elsker hende – og hun lærer for hver bold.'}
};
const FAMILY = ['henrik','majbritt','maria','thomas','therese','jens','casper','lykke'];
const RIVALS = { therese:'maria', maria:'therese' };

/* ============ Kommentatorboksen ============ */
const B = {
 henrik:{
  start:['{n} går på banen med Chelsea-optimisme. Den plejer at holde i syv minutter. 🔵',
         '{n} er klar. Vejle Boldklub sender deres tanker og bønner. 🟡'],
  ahead:['{n} scorer OG fører! Det er flere gode nyheder, end Chelsea har fået hele sæsonen. 🔵',
         '{n} i front! Lige nu ligger han højere end Vejle i tabellen. Nyd det, det varer ikke. 🟡',
         'Point til {n}! Chelsea ville have brugt 80 mio. på det slag der.',
         '{n} fører suverænt. Det er officielt sæsonens Chelsea-highlight.',
         '{n} scorer! Vejle Boldklub overvejer at hente ham hjem på en fribetaling.',
         '{n} bygger føring. Bare rolig, han kaster den nok væk i overtiden – gammel vane.',
         'Sådan, {n}! Du har allerede flere point end Vejle har haft skud på mål i år. 🟡',
         '{n} dominerer. Stamford Bridge rejser sig. Begge tilskuere.'],
  behind:['{n} scorer, men er bagud. Klassisk Chelsea: flot statistik, elendigt resultat. 🔵',
          'Et point til {n}! Det er sådan, Vejle fejrer et uafgjort resultat. 🟡',
          '{n} reducerer. Trænerskiftet er udsat til på mandag.',
          '{n} kæmper bravt bagud. Chelsea-fans kender følelsen. Intimt.',
          'Point til {n}! Han er stadig i nedrykningszonen, men bussen er ikke bestilt endnu. 🟡',
          '{n} scorer fra en håbløs position – det er ren Vejle-romantik.',
          '{n} kommer nærmere! Til forskel fra Chelsea kan han bare ikke købe en ny makker i januar. 🔵'],
  level:['{n} udligner! Chelsea plejer at tabe herfra, men lad os være positive. 🔵',
         'Lige nu, {n}! Det er den mest spændende stilling, Vejle har set i årevis. 🟡'],
  won:['{n} VINDER! Det er sjældnere end en Chelsea-sejr på udebane. 🔵',
       'Sejr til {n}! Vejle-fans græder. Af glæde. For en gangs skyld. 🟡'],
  lost:['{n} taber. Andenhalvlegs-kollaps. Helt efter Chelsea-manualen. 🔵',
        'Nederlag til {n}. Vejle Boldklub nikker genkendende og skænker en lille én. 🟡',
        '{n} tabte. Han skylder på dommeren, banen og Todd Boehly.'],
  champ:['{n} ER MESTER! Chelsea sender lykønskninger fra midterbordet i tabellen. 🔵🏆'],
  last:['{n} sidst. Nedrykket. Igen. Vi ses i 1. division. 🟡']
 },
 majbritt:{
  start:['{n}: "Jeg er ellers ikke så god..." Vi har set optagelserne. Hun lyver. 🎯',
         '{n} går på banen og undskylder på forhånd. Modstanderne bør være bange.'],
  ahead:['{n}: "Jeg er ellers ikke så god..." *lægger bolden i hjørnet* 🎯',
         'Point til {n}. Teknikken var lærebogsagtig. Hun kalder det held.',
         '{n} fører og undskylder for det. Stop det, {n}.',
         '{n} scorer med en volley, der bør hænge på et museum. Hun rødmer. 🎯',
         '{n} er i front. Hun vil gerne understrege, at det bare er tilfældigt. Det er det ikke.',
         '{n} spiller bedst på banen. Hun benægter det pure.'],
  behind:['{n} scorer bagudfra – med perfekt fodarbejde, som hun bagefter kalder "klodset". 🎯',
          'Point til {n}. "Nej nej, den var heldig." Den var ikke heldig.',
          '{n} kæmper sig tilbage. Stille. Effektivt. Uden at prale én gang.',
          '{n} reducerer. Hun siger undskyld til modstanderen. Igen.'],
  level:['{n} udligner og skynder sig at sige, at det ikke var hendes fortjeneste. Det var det. 🎯',
         'Lige nu takket være {n}. Hun peger straks på sin makker.'],
  won:['{n} vandt! "Det var mest min makker." Nej, {n}. Det var dig. 🎯',
       'Sejr til {n} – teknisk overlegen, verbalt beskeden.'],
  lost:['{n} tabte, men spillede stadig pænere end alle andre på banen. 🎯',
        '{n} tabte kampen og undskyldte til hele hallen. Klassisk {n}.'],
  champ:['{n} ER MESTER! Hun siger "det var vist bare en god dag". Det var det ikke – hun er bedst. 🎯🏆'],
  last:['{n} sidst? Statistisk umuligt. Hun siger "jeg sagde jo, jeg var dårlig". 🎯']
 },
 maria:{
  start:['{n} går på banen! Du kan det her, og vi elsker dig uanset hvad. 💛',
         'Så er {n} klar! Verdens bedste indstilling, verdens bedste smil. 🌸'],
  ahead:['{n}!! Det var FANTASTISK! Og du så også glad ud imens. 💛',
         'Point til {n} – og hun fører! Vi er så stolte af dig. Alle sammen. 🌸',
         '{n} er i vildt godt humør OG i front. Perfekt kombination! ✨',
         'SÅDAN {n}! Det slag var lige så flot som dig. 💛',
         '{n} scorer igen! Du er simpelthen for dygtig, og det skal du vide.'],
  behind:['{n} scorer! Stillingen betyder intet – du betyder alt. 🤗',
          'Sådan {n}! Bagud er bare et tal. Du er en hel følelse. 💛',
          '{n} kæmper videre! Vi tror SÅ meget på dig herfra. 🌸',
          'Point til {n}! Se, det vender allerede. Bliv ved, skat. ✨',
          '{n}, du er stadig familiens favorit. Uanset hvad tavlen siger. 🤗'],
  level:['{n} udligner! Se lige den energi! Helt utroligt. 💛',
         'Lige nu – og det er {n}s fortjeneste. Du er en stjerne. 🌸'],
  won:['{n} VANDT! Vi vidste det hele tiden. Kæmpe kram herfra. 🤗💛',
       'Sejr til {n}! Du fortjener det, og du fortjener kage. 🌸'],
  lost:['{n} tabte kampen, men vandt vores hjerter. Som altid. 💛',
        'Pyt med det, {n}! Du var den mest positive på banen. Det tæller mest. 🤗'],
  champ:['{n} ER MESTER!! Vi råber det ud i hele huset! 💛🏆'],
  last:['{n} sidst på tavlen – men suverænt nummer ét i familien. 💛'],
  rival:['{n} tager point fra Therese! Søsteropgøret lever i bedste velgående. 🌸',
         '{n} scorer mod Therese – og smiler venligt. Det gør det kun værre. 💛',
         '{n} mod Therese! Tennisbanerne fra ungdommen ringer og vil have deres rivalisering tilbage. 🎾',
         'Point til {n} i søsterduellen. Hun siger ingenting. Hun behøver ingenting sige. 🌸']
 },
 thomas:{
  start:['{n} går på banen. Kampen er reelt afgjort. Vi spiller den alligevel. 😤',
         '{n} varmer op. Modstanderne varmer op til at tabe.'],
  ahead:['{n} scorer. Selvfølgelig gør han det. Irriterende. 😤',
         '{n} fører. Igen. Naturlovene er intakte.',
         'Point til {n}. Han gjorde det ikke engang svært. Så træls.',
         '{n} udbygger føringen uden at få pulsen op. Nogen tag en dopingprøve.',
         '{n} scorer med et slag han sikkert har opfundet selv. Ad. 😤',
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
  champ:['{n} er mester. Vi lagde turneringen for at se noget andet. Det lykkedes ikke. 😤🏆'],
  last:['{n} sidst?! Har nogen hacket appen? Det her kan ikke passe. 😤']
 },
 therese:{
  start:['{n} går på banen. Ketsjeren har allerede fortrudt. 🔥',
         '{n} er klar. Alle husker sidste gang hun tabte. Især gulvet.',
         '{n} varmer op, og temperamentet er varmet op længe før hende.'],
  ahead:['{n} scorer og fører! Der er fred i huset. Indtil videre. 🔥',
         'Point til {n}! Se, hun er jo rigtig sød, når hun vinder.',
         '{n} i front. Ketsjeren overlever endnu en dag. 🔥',
         '{n} smadrer den i hjørnet. Med overskud, ikke med vrede. Denne gang.',
         '{n} fører – og humøret følger pænt med. Nyd det, alle sammen.',
         'Point til {n}. Hun kigger triumferende rundt på hele familien.'],
  behind:['{n} scorer, men er bagud. Ketsjeren skal nok få skylden. 🔥',
          'Point til {n}! Vi tæller stille og roligt ned til det første råb.',
          '{n} reducerer. Pulsen er høj. Meget høj.',
          '{n} er bagud og kiggede lige vredt på nettet. Nettet gjorde ingenting.',
          '{n} kæmper. Nogen bør gemme ketsjeren efter kampen. 🔥',
          'Point til {n}. Hun er ikke sur. Hun er "fokuseret".'],
  level:['{n} udligner! Krisen er afværget. Foreløbig. 🔥',
         'Lige nu – {n} trak lige vejret dybt. Det var tiltrængt.'],
  won:['{n} VANDT! Hele familien ånder lettet op. 🔥',
       'Sejr til {n}. Hun siger, hun aldrig var i tvivl. Det var vi andre.'],
  lost:['{n} tabte. Det var banen. Og lyset. Og vinden. Og makkeren. 🔥',
        'Nederlag til {n}. Ingen siger noget. Ingen kigger på hende. Sikkerhedsprotokol.',
        '{n} tabte – og verdens dårligste taber har allerede talt. Højt.',
        '{n} er ude. Ketsjeren skal nok komme til at mærke det.'],
  champ:['{n} ER MESTER! Og hun vil MEGET gerne tale om det. Hele aftenen. 🔥🏆'],
  last:['{n} sidst. Vi flytter os alle sammen stille og roligt tre meter tilbage. 🔥'],
  rival:['{n} scorer mod Maria! Tennisbanen fra dengang husker alt. 🎾🔥',
         '{n} tager point fra sin søster. Regnskabet fra ungdomsårene er stadig åbent.',
         'Søsteropgøret! {n} fører duellen mod Maria lige nu. 🔥',
         '{n} mod Maria – og {n} vandt den dyst. Der bliver talt om det til jul.',
         '{n} kigger IKKE på Maria efter det point. Det gør hun bestemt ikke. 🔥']
 },
 jens:{
  start:['{n} går på banen. Han har brugt 40 timer på appen og 4 minutter på forhånden. 👨‍💻',
         '{n} deployer sig selv til banen. Rollback er desværre ikke muligt.'],
  ahead:['{n} scorer OG fører! Han har helt sikkert hardcodet det her. 👨‍💻',
         'Point til {n}. git commit -m "feat: ramte bolden" ✅',
         '{n} i front! Venstrehånden virkede for én gangs skyld. Cache det!',
         '{n} scorer! Ingen ved hvordan. Heller ikke {n}. Det er udokumenteret adfærd.',
         '{n} fører. Nogen tjek lige om han har skrevet sin egen scoringsfunktion. 🐛',
         '{n} leverer i produktion. Det plejer at ende med en hotfix.'],
  behind:['{n} scorer, men er bagud. Han skylder på en bug i banen. 🐛',
          'Point til {n}! Har du prøvet at slukke og tænde dig selv igen?',
          '{n} reducerer. Klassisk venstrehånds-noob-comeback. Statistisk usandsynligt.',
          "Stack overflow i {n}' baghånd – men point blev det da. 💥",
          '{n} kæmper. 404: Forhånd not found. Point alligevel! 👨‍💻'],
  level:['{n} udligner! Merge conflict løst. Lige nu. 👨‍💻',
         'Lige stilling – {n} har lige refaktoreret sin serv.'],
  won:['{n} VANDT en kamp! Alle tests er grønne. Nogen skal fyre en champagne af. 🚀',
       'Sejr til {n}! Han koder stadig bedre, end han spiller – men i dag var det tæt.'],
  lost:['{n} tabte. Han åbner en issue på banen. 🐛',
        'Nederlag til {n}. "Det virkede på min maskine." 👨‍💻',
        '{n} tabte – den lefty noob. Tilbage til editoren.'],
  champ:['{n} ER MESTER?! Nogen skal reviewe den kode. Det her ligner en exploit. 👨‍💻🏆'],
  last:['{n} i bunden. Han er bedre til at kode denne app end til at spille padel. Bekræftet. 👨‍💻']
 },
 casper:{
  start:['{n} går på banen og roser modstanderne på forhånd. Hvem gør sådan noget? 😇',
         '{n} på banen. Han er både bedst og sødest. Det er ikke fair.'],
  ahead:['{n} scorer og undskylder bagefter. Hvor er han sød. Og irriterende god. 😇',
         'Point til {n}. Han hjalp lige modstanderen op bagefter.',
         '{n} fører – og siger "flot forsøg!" til den han lige har spillet ud af banen.',
         '{n} er for god. Både som menneske og som padelspiller. Vælg én, {n}. 😇',
         '{n} scorer med et perfekt slag og roser sin modstanders positionering. Utroligt.',
         '{n} dominerer venligt. Kan man overhovedet være sur på ham? Nej.'],
  behind:['{n} scorer bagudfra – og siger stadig "godt spillet!" til dem der fører. 😇',
          'Point til {n}. Han er bagud og i strålende humør. Uhyggeligt.',
          '{n} kæmper sig ind i kampen med et smil. Selvfølgelig gør han det.',
          '{n} reducerer og spørger om modstanderen har det godt. 😇'],
  level:['{n} udligner og foreslår at man lige holder en vandpause. Sikke et menneske. 😇',
         'Lige nu – {n} siger det var lidt heldigt. Det var det ikke.'],
  won:['{n} vandt og gav alle high fives. Man kan ikke engang være misundelig. 😇',
       'Sejr til {n}. Han insisterer på at det var en holdindsats.'],
  lost:['{n} tabte og smilede hele vejen. Han er simpelthen for sød til det her. 😇',
        '{n} er ude – og var den første til at klappe af vinderne.'],
  champ:['{n} ER MESTER! Han vil dele pokalen med alle. Selvfølgelig vil han det. 😇🏆'],
  last:['{n} sidst? Han er nok med vilje gået ned for at andre kunne få succes. 😇']
 },
 lykke:{
  start:['{n} går på banen! Hun er ny, hun er sød, og hun lærer hurtigere, end I bryder jer om. 🍀',
         '{n} er klar. Om et år er det hende, der giver jer bank.',
         '{n} på banen – børnenes ubetingede favorit. 🍀'],
  ahead:['{n} scorer OG fører! Hun har spillet padel i fem måneder. Fem. 🍀',
         'Point til {n}! Hun undskylder for at være ny. Det er ikke nødvendigt længere.',
         '{n} i front. Potentialet er faktisk lidt skræmmende. 🍀',
         '{n} rammer et slag, hun ikke kunne i sidste uge. Sådan går det hele tiden.',
         'Point til {n}! Børnene ville have heppet vildt lige nu. 🍀',
         '{n} fører – og er stadig den sødeste på banen.'],
  behind:['{n} scorer bagudfra! Hun lærer noget nyt af hver eneste bold. 🍀',
          'Point til {n}! Det her bliver hun rigtig god til. Meget snart.',
          '{n} kæmper videre med et smil. Det er derfor børnene elsker hende. 🍀',
          '{n} reducerer. Hun spurgte lige pænt, hvordan man gjorde. Så gjorde hun det.',
          'Point til {n}! Ingen i familien har lært så meget på så kort tid.'],
  level:['{n} udligner! Hun bliver bedre midt i kampen. Det er ikke normalt. 🍀',
         'Lige nu takket være {n}. Hun ser overrasket ud. Det gør vi andre ikke.'],
  won:['{n} VANDT! Den nyeste i familien slår de gamle. Sådan. 🍀',
       'Sejr til {n}! Og hun takkede alle fire på banen bagefter.'],
  lost:['{n} tabte – og lærte tre nye ting undervejs. Farligt. 🍀',
        'Nederlag til {n}. Hun spurgte straks, hvad hun kunne gøre bedre. Uhyggeligt.'],
  champ:['{n} ER MESTER! Den nyeste i familien tog det hele. Vi advarede jer. 🍀🏆'],
  last:['{n} sidst – i år. Skriv det ned, det holder ikke næste gang. 🍀']
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
const pick = a => a[Math.floor(Math.random()*a.length)];
const pool = (id,sit) => (B[id] && B[id][sit]) ? B[id][sit] : B.gaest[sit];
const line = (id,sit) => pick(pool(id,sit)).replace(/\{n\}/g, pl(id).name);
function rivalLine(scorer, opponents){
  const r = RIVALS[scorer];
  if(!r || !opponents.includes(r) || !B[scorer].rival) return null;
  return pick(B[scorer].rival).replace(/\{n\}/g, pl(scorer).name);
}

/* ============ Americano-programlægger ============ */
const pkey=(a,b)=>a<b?a+'|'+b:b+'|'+a;

function buildAttempt(ids, rounds, courts, startRound, played, rand){
  const games={}, partner={}, opp={};
  ids.forEach(i=>games[i]=0);
  const reg=(A,Bm)=>{
    A.concat(Bm).forEach(i=>{ if(i in games) games[i]++; });
    if(A.length===2) partner[pkey(A[0],A[1])]=(partner[pkey(A[0],A[1])]||0)+1;
    if(Bm.length===2) partner[pkey(Bm[0],Bm[1])]=(partner[pkey(Bm[0],Bm[1])]||0)+1;
    A.forEach(a=>Bm.forEach(b=>{const k=pkey(a,b); opp[k]=(opp[k]||0)+1;}));
  };
  played.forEach(m=>reg(m.a,m.b));
  const sched=[]; let cost=0;
  const cip=Math.max(1,Math.min(courts,Math.floor(ids.length/4)));
  for(let r=startRound;r<=rounds;r++){
    const tie={}; ids.forEach(i=>tie[i]=rand());
    const q=ids.slice().sort((x,y)=>games[x]!==games[y]?games[x]-games[y]:tie[x]-tie[y]);
    const on=q.slice(0,cip*4);
    for(let c=0;c<cip;c++){
      const g=on.slice(c*4,c*4+4);
      const opts=[[[g[0],g[1]],[g[2],g[3]]],[[g[0],g[2]],[g[1],g[3]]],[[g[0],g[3]],[g[1],g[2]]]];
      let best=opts[0], bc=Infinity;
      opts.forEach(([A,Bm])=>{
        let v=(partner[pkey(A[0],A[1])]||0)*40+(partner[pkey(Bm[0],Bm[1])]||0)*40;
        A.forEach(a=>Bm.forEach(b=>v+=(opp[pkey(a,b)]||0)*6));
        if(v<bc){bc=v;best=[A,Bm];}
      });
      cost+=bc; reg(best[0],best[1]);
      sched.push({round:r,court:c+1,a:best[0],b:best[1],sa:0,sb:0,fin:false});
    }
  }
  const v=Object.values(games);
  cost+=(Math.max(...v)-Math.min(...v))*25;
  return {sched,cost};
}
function generate(ids,rounds,courts,startRound,played){
  let best=[],bc=Infinity;
  for(let t=0;t<80;t++){
    let seed=t*2654435761+7;
    const rand=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed;};
    const {sched,cost}=buildAttempt(ids,rounds,courts,startRound,played,rand);
    if(cost<bc){bc=cost;best=sched;}
    if(bc===0) break;
  }
  return best;
}
const maxCourts = n => Math.max(1, Math.floor(n/4));
function suggestedRounds(n, courts){
  if(n<4) return 0;
  const cip=Math.max(1,Math.min(courts,Math.floor(n/4)));
  return Math.max(n-1, Math.ceil((n*(n-1)/2)/(2*cip)));
}

/* ============ Opslag der også dækker gæster ============ */
function pl(id){
  return P[id] || (S && S.guests && S.guests[id]) || {name:'?',emoji:'🎾',c:'#9FBFC8',tag:''};
}

/* ============ Tilstand og lagring ============ */
const KEY = 'fvpc.v1';
let S;

function fresh(){
  S = {
    phase:'attendance',
    roster:FAMILY.slice(),
    present:FAMILY.slice(),
    guests:{},
    pts:16, courts:1, rounds:14,
    matches:[], gen:false,
    feed:[], tab:'kamp',
    sheet:null, showResult:false, champ:false
  };
  save();
}

function save(){
  try{
    const {sheet, ...rest} = S;
    localStorage.setItem(KEY, JSON.stringify(rest));
  }catch(e){ /* privat browsing e.l. – appen kører videre uden at gemme */ }
}

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return false;
    const d = JSON.parse(raw);
    if(!d || !Array.isArray(d.roster) || !Array.isArray(d.matches)) return false;
    S = Object.assign({guests:{}, feed:[], sheet:null, showResult:false, champ:false}, d);
    S.sheet = null;
    return true;
  }catch(e){ return false; }
}

const isOn   = id => S.present.indexOf(id) >= 0;
const active = () => S.roster.filter(isOn);
const cur    = () => S.matches.find(m => !m.fin);
const canStart = () => active().length >= 4;

function say(text, emoji, color){
  S.feed.unshift({text, emoji, color});
  if(S.feed.length > 40) S.feed.pop();
}
function sayFor(id, sit){ const p = pl(id); say(line(id, sit), p.emoji, p.c); }

function buzz(ms){ try{ if(navigator.vibrate) navigator.vibrate(ms); }catch(e){} }

/* ============ Fremmøde og gæster ============ */
function hasPlayed(id){ return S.matches.some(m => m.a.indexOf(id) >= 0 || m.b.indexOf(id) >= 0); }

function togglePresent(id){
  if(isOn(id)){
    if(hasPlayed(id)) return;
    S.present = S.present.filter(x => x !== id);
  } else {
    S.present.push(id);
  }
  clampCourts();
}
function clampCourts(){
  S.courts = Math.min(Math.max(1, S.courts), maxCourts(active().length));
}
function addGuest(name){
  const n = (name || '').trim();
  if(!n) return false;
  if(S.roster.some(id => pl(id).name.toLowerCase() === n.toLowerCase())) return false;
  let i = 1; while(S.guests['g'+i]) i++;
  const id = 'g'+i;
  S.guests[id] = {name:n, emoji:'🎾', c:'#9FBFC8', tag:'Gæstespiller med point at bevise.', guest:true};
  S.roster.push(id);
  S.present.push(id);
  clampCourts();
  return true;
}
function removeGuest(id){
  if(!pl(id).guest || hasPlayed(id)) return;
  S.roster = S.roster.filter(x => x !== id);
  S.present = S.present.filter(x => x !== id);
  delete S.guests[id];
  clampCourts();
}

/* ============ Turneringens gang ============ */
function startTournament(){
  if(!canStart()) return;
  clampCourts();
  const cip = Math.max(1, Math.min(S.courts, Math.floor(active().length / 4)));
  S.matches = [];
  for(let c = 1; c <= cip; c++) S.matches.push({round:1, court:c, a:[], b:[], sa:0, sb:0, fin:false});
  S.gen = false; S.phase = 'play'; S.tab = 'kamp'; S.feed = [];
  S.champ = false; S.showResult = false;
  say('Velkommen til Familien Vestergaard Padel Championship! Sæt holdet på banen – I kan sagtens gøre det, mens kampen kører. 🎾','🏆','#C8F560');
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
  m.a = m.a.filter(x => x !== id);
  m.b = m.b.filter(x => x !== id);
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
    say('Point til ' + (team === 'a' ? 'Hold Gul' : 'Hold Blå') + '! Nogen skulle måske sættes på banen. 🎾','🎾','#9FBFC8');
  } else {
    const scorer = pick(scorers);
    const lead = m.sa === m.sb ? null : (m.sa > m.sb ? 'a' : 'b');
    const sit = lead === null ? 'level' : (lead === team ? 'ahead' : 'behind');
    const rl = rivalLine(scorer, others);
    if(rl && Math.random() < 0.4) say(rl, pl(scorer).emoji, pl(scorer).c);
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
  m.fin = true; S.showResult = false;
  if(m.sa === m.sb) say('Uafgjort! Ingen tabte. Alle er lidt utilfredse. 🤝','🤝','#9FBFC8');
  else {
    const w = m.sa > m.sb ? 'a' : 'b', l = w === 'a' ? 'b' : 'a';
    m[w].forEach(id => sayFor(id, 'won'));
    m[l].forEach(id => sayFor(id, 'lost'));
  }
  const first = Math.min.apply(null, S.matches.map(x => x.round));
  if(!S.gen && S.matches.filter(x => x.round === first).every(x => x.fin)){
    S.matches = S.matches.concat(
      generate(active(), S.rounds, S.courts, first + 1, S.matches.filter(x => x.fin)));
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
  if(S.rounds > last){
    S.matches = S.matches.concat(generate(active(), S.rounds, S.courts, last + 1, played));
  }
  S.gen = true;
  S.champ = false;
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

/* ============ Skærmen må ikke slukke midt i en kamp ============ */
let wakeLock = null;
async function keepAwake(on){
  try{
    if(on && 'wakeLock' in navigator && !wakeLock){
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    } else if(!on && wakeLock){
      await wakeLock.release();
      wakeLock = null;
    }
  }catch(e){ /* ikke understøttet, eller nægtet – ikke kritisk */ }
}
document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'visible' && S && S.phase === 'play' && !S.champ) keepAwake(true);
});

/* ============ Visning ============ */
const viewEl = document.getElementById('view');
const tabsEl = document.getElementById('tabs');
const titleEl = document.getElementById('navTitle');
const overlayEl = document.getElementById('overlay');
const TABS = [['kamp','🎾','Kamp'],['stilling','📊','Stilling'],['program','🗓','Program'],['regler','⚙️','Regler']];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const av = (id, cls) => `<span class="avatar ${cls||''}" style="background:${pl(id).c}38">${pl(id).emoji}</span>`;
const nm = id => esc(pl(id).name);

/* --- Trin 1: fremmøde --- */
function viewAttendance(){
  const n = active().length;
  return `
  ${stepIndicator(1)}
  <div class="intro">
    <h2>Hvem er med i dag?</h2>
    <p>Tryk spillerne til og fra. Alle otte er slået til som standard.</p>
  </div>
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div class="sec-label" style="margin:0">👥 Familien Vestergaard</div>
      <div style="font-family:var(--display);font-weight:700;font-size:1.3rem;color:${n>=4?'var(--lime)':'var(--gold)'}">${n}</div>
    </div>
    ${S.roster.map(id => {
      const on = isOn(id), locked = hasPlayed(id);
      return `<div class="att ${on?'on':'off'}">
        <button class="hit" type="button" data-act="toggle" data-p="${id}" aria-pressed="${on}">
          ${av(id)}
          <span style="flex:1"><b>${nm(id)}</b><small>${esc(pl(id).tag)}</small></span>
          <span class="tick" aria-hidden="true">${on?'✓':'○'}</span>
        </button>
        ${pl(id).guest && !locked ? `<button class="del" type="button" data-act="delguest" data-p="${id}" aria-label="Fjern ${nm(id)}">🗑</button>` : ''}
      </div>`;
    }).join('')}
    <div class="guest-add">
      <label class="sr-only" for="guestInput" hidden>Navn på gæst</label>
      <input id="guestInput" type="text" placeholder="Navn på gæst" autocomplete="off" enterkeyhint="done">
      <button type="button" data-act="addguest" aria-label="Tilføj gæst">＋</button>
    </div>
    <div class="bulk">
      <button type="button" data-act="allon">Vælg alle</button>
      <button type="button" data-act="alloff">Fravælg alle</button>
    </div>
  </div>
  <button class="btn" type="button" data-act="tolength" ${n<4?'disabled':''}>Videre til kamplængde</button>
  ${n<4 ? '<p class="muted" style="text-align:center;color:var(--gold)">Der skal være mindst 4 spillere til stede.</p>' : ''}`;
}

/* --- Trin 2: kamplængde --- */
function viewLength(){
  const n = active().length, sug = suggestedRounds(n, S.courts), mc = maxCourts(n);
  const preset = v => `<button class="preset ${S.pts===v?'on':''}" type="button" data-act="pts" data-v="${v}" aria-pressed="${S.pts===v}">
      <b>${v}</b><span>POINT</span><i>${v/4} serve hver</i></button>`;
  return `
  ${stepIndicator(2)}
  <div class="intro">
    <h2>Hvor lange kampe?</h2>
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
    <div class="sec-label">⚙️ Baner og runder</div>
    <div class="numrow">
      <span class="lab">Antal baner</span>
      <span class="ctl">
        <button type="button" data-act="crt-" ${S.courts<=1?'disabled':''} aria-label="Færre baner">−</button>
        <span class="v">${S.courts}</span>
        <button type="button" data-act="crt+" ${S.courts>=mc?'disabled':''} aria-label="Flere baner">＋</button>
      </span>
    </div>
    <div class="numrow">
      <span class="lab">Antal runder</span>
      <span class="ctl">
        <button type="button" data-act="rnd-" ${S.rounds<=1?'disabled':''} aria-label="Færre runder">−</button>
        <span class="v">${S.rounds}</span>
        <button type="button" data-act="rnd+" ${S.rounds>=40?'disabled':''} aria-label="Flere runder">＋</button>
      </span>
    </div>
    <p class="muted" style="margin-top:10px">Foreslået til ${n} spillere på ${S.courts} bane${S.courts>1?'r':''}:
      <b style="color:var(--lime)">${sug} runder</b>.
      <button class="linkbtn" type="button" data-act="usesug">Brug den</button></p>
  </div>
  <button class="btn" type="button" data-act="start">Start turneringen 🎾</button>
  <button class="btn secondary" type="button" data-act="toattendance">← Tilbage til fremmøde</button>`;
}

function stepIndicator(step){
  const d = (n, lab, on) => `<span class="dot ${on?'on':''}"><span class="num">${n}</span><span class="lbl">${lab}</span></span>`;
  return `<div class="stepind">${d(1,'Fremmøde',true)}<span class="rail ${step===2?'on':''}"></span>${d(2,'Kamplængde',step===2)}</div>`;
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
      <div class="big">🏆</div>
      <h3>Alle kampe er spillet!</h3>
      <p class="muted">Kig i Stilling for at se, hvem der løb med æren.</p>
      <button class="btn" type="button" data-act="showchamp" style="margin-top:16px">Kår mesteren</button></div>`;

  const total = m.sa + m.sb, frac = Math.min(total / S.pts, 1) * 100;
  const lead = m.sa === m.sb ? null : (m.sa > m.sb ? 'a' : 'b');
  const inRound = S.matches.filter(x => x.round === m.round).reduce((acc, x) => acc.concat(x.a, x.b), []);
  const bench = active().filter(i => inRound.indexOf(i) < 0);
  const done = S.matches.filter(x => x.fin).length;
  const full = m.a.length === 2 && m.b.length === 2;
  const team = t => `
    <div class="team ${lead===t?'lead-'+t:''}" data-side="${t}">
      <div class="tname">${t==='a'?'HOLD GUL':'HOLD BLÅ'}</div>
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
    <div class="bench">${bench.map(i=>`<span class="chip" style="background:${pl(i).c}30">${pl(i).emoji} ${nm(i)}</span>`).join('')}</div>
  </div>` : ''}
  <div class="card">
    <div class="sec-label">📣 Kommentatorboksen</div>
    <div class="feed">${S.feed.slice(0,12).map((f,i)=>
      `<div class="feed-item ${i===0?'fresh':''}"><span class="avatar" style="background:${f.color}38">${f.emoji}</span><p>${esc(f.text)}</p></div>`).join('')}</div>
  </div>`;
}

function viewStilling(){
  const t = standings();
  if(!S.matches.some(m => m.fin)) return `<div class="card empty-state">
    <div class="big">📋</div><h3>Ingen kampe er spillet endnu</h3>
    <p class="muted">Så snart første kamp er godkendt, begynder tallene at tale. Og de kommer til at tale om Thomas.</p></div>`;
  const medal = ['🥇','🥈','🥉'], h = [104,82,66], order = [1,0,2];
  const pod = order.filter(i => t[i]).map(i => `<div class="pod">
      <div style="font-size:1.7rem">${pl(t[i].id).emoji}</div>
      <div class="nm">${nm(t[i].id)}</div>
      <div class="pt">${t[i].pts}</div>
      <div class="block" style="height:${h[i]}px;background:${pl(t[i].id).c}44">${medal[i]}</div>
    </div>`).join('');
  return `<div class="podium">${pod}</div>
    <div class="card"><table class="stand">
      <thead><tr><th>#</th><th>Spiller</th><th>K</th><th>+/−</th><th>Point</th></tr></thead>
      <tbody>${t.map((r,i) => { const d = r.pts - r.con;
        return `<tr class="${i===0?'top':''}"><td class="rank">${i+1}</td>
          <td class="who">${pl(r.id).emoji} ${nm(r.id)}<small>${r.w} sejre · ${r.l} nederlag</small></td>
          <td>${r.pl}</td><td class="${d>=0?'diff-pos':'diff-neg'}">${d>0?'+':''}${d}</td>
          <td class="pts">${r.pts}</td></tr>`; }).join('')}</tbody>
    </table></div>`;
}

function viewProgram(){
  const rounds = S.matches.map(m => m.round).filter((v,i,a) => a.indexOf(v) === i).sort((a,b) => a-b);
  const c = cur();
  const side = (m, team) => {
    const ids = m[team], win = m.fin && m.sa !== m.sb && ((m.sa > m.sb ? 'a' : 'b') === team);
    if(!ids.length) return `<span class="tbd">Ikke sat endnu</span>`;
    return ids.map(i => `<div class="${win?'win':''}">${pl(i).emoji} ${nm(i)}</div>`).join('');
  };
  return (S.gen ? '' : `<div class="card raised" style="display:flex;gap:12px;align-items:center">
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
  const mc = maxCourts(active().length);
  const num = (lab, val, dec, inc, decOff, incOff) => `<div class="numrow">
      <span class="lab">${lab}</span>
      <span class="ctl">
        <button type="button" data-act="${dec}" ${decOff?'disabled':''} aria-label="Færre">−</button>
        <span class="v">${val}</span>
        <button type="button" data-act="${inc}" ${incOff?'disabled':''} aria-label="Flere">＋</button>
      </span></div>`;
  return `
  <div class="card">
    <div class="sec-label">⚙️ Regler</div>
    ${num('Point pr. kamp', S.pts, 'pts-', 'pts+', S.pts<=4, S.pts>=48)}
    <div class="numrow"><span class="lab">Serve hver</span>
      <span class="v" style="font-family:var(--display);font-weight:700;font-size:1.25rem;color:var(--lime)">${S.pts/4}</span></div>
    ${num('Antal runder', S.rounds, 'rnd-', 'rnd+', S.rounds<=1, S.rounds>=40)}
    ${num('Antal baner', S.courts, 'crt-', 'crt+', S.courts<=1, S.courts>=mc)}
    <button class="btn" type="button" data-act="regen" style="margin-top:14px">Læg programmet om</button>
    <p class="muted" style="margin-top:10px">Spillede kampe bevares. Kun de resterende runder lægges om.</p>
  </div>
  <div class="card">
    <div class="sec-label">✅ Fremmøde</div>
    ${S.roster.map(id => {
      const on = isOn(id), locked = hasPlayed(id);
      return `<div class="att ${on?'on':'off'}">
        <button class="hit" type="button" data-act="toggle" data-p="${id}" aria-pressed="${on}">
          ${av(id)}<span style="flex:1"><b>${nm(id)}</b>${locked&&on?'<small>har spillet – kan ikke meldes fra</small>':''}</span>
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
      <p class="sub">Hvem skal på ${t==='a'?'hold gul':'hold blå'}?</p>
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
  const col = t => `<div class="result-col" data-side="${t}"><div class="n">${m['s'+t]}</div>
      ${m[t].map(i => `<div class="who">${pl(i).emoji} ${nm(i)}</div>`).join('')}</div>`;
  return `<div class="sheet-back" role="dialog" aria-modal="true" aria-label="Resultat">
    <div class="sheet">
      <div style="text-align:center;font-size:2.6rem">${drew?'🤝':'🎉'}</div>
      <h3 style="margin-top:8px">${drew?'Uafgjort!':(win==='a'?'Hold Gul':'Hold Blå')+' vinder!'}</h3>
      <div class="result-score">${col('a')}<span style="font-family:var(--display);font-size:1.5rem;color:var(--ink-soft)">–</span>${col('b')}</div>
      <div class="card" style="margin-bottom:16px">
        <div class="sec-label" style="font-size:.85rem">📣 Fra kommentatorboksen</div>
        <div class="feed">${S.feed.slice(0,3).map(f =>
          `<div class="feed-item"><span class="avatar" style="background:${f.color}38">${f.emoji}</span><p>${esc(f.text)}</p></div>`).join('')}</div>
      </div>
      <button class="btn" type="button" data-act="confirm">Godkend og gå videre</button>
      <button class="btn secondary" type="button" data-act="backtoplay">Tilbage – vi spiller videre</button>
    </div></div>`;
}
function champHTML(){
  const t = standings(); if(!t.length) return '';
  const w = t[0], l = t[t.length - 1];
  const bits = Array.from({length:24}, (_, i) => {
    const e = ['🎾','🎉','🏆','✨','🥇','🎊'][i % 6];
    return `<i style="left:${Math.round(Math.random()*94)}%;font-size:${(14+Math.random()*14)|0}px;
      animation-duration:${(3.2+Math.random()*3).toFixed(1)}s;animation-delay:${(Math.random()*3).toFixed(1)}s">${e}</i>`;
  }).join('');
  return `<div class="champ-wrap" role="dialog" aria-modal="true" aria-label="Mester">
    <div class="confetti" aria-hidden="true">${bits}</div>
    <div class="champ">
      <div class="cup">🏆</div><div class="lab">MESTER</div>
      <div style="font-size:2.6rem;margin-top:8px">${pl(w.id).emoji}</div>
      <div class="nm">${nm(w.id)}</div>
      <div class="sc">${w.pts} point · ${w.w} sejre</div>
      <div class="quote">${esc(line(w.id,'champ'))}</div>
      ${t.length>1?`<div class="last"><div class="l">SIDSTEPLADSEN</div>
        <div class="n">${pl(l.id).emoji} ${nm(l.id)}</div>
        <div class="q">${esc(line(l.id,'last'))}</div></div>`:''}
      <button class="btn" type="button" data-act="closechamp">Luk</button>
      <button class="btn secondary" type="button" data-act="newtour">Ny turnering – revanche!</button>
    </div></div>`;
}

/* --- Render --- */
const TITLES = {kamp:'Familien Vestergaard', stilling:'Stilling', program:'Program', regler:'Indstillinger'};
function render(){
  if(S.phase === 'attendance'){ titleEl.textContent = 'Hvem er med?'; viewEl.innerHTML = viewAttendance(); }
  else if(S.phase === 'length'){ titleEl.textContent = 'Kamplængde'; viewEl.innerHTML = viewLength(); }
  else {
    titleEl.textContent = TITLES[S.tab] || 'Familien Vestergaard';
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
  // Klik inde i arket må ikke lukke det
  if(el.classList.contains('sheet-back') && e.target.closest('[data-stop]')) return;

  switch(a){
    case 'toggle':     togglePresent(el.dataset.p); break;
    case 'delguest':   removeGuest(el.dataset.p); break;
    case 'addguest': {
      const inp = document.getElementById('guestInput');
      if(inp){ if(addGuest(inp.value)) inp.value = ''; }
      break;
    }
    case 'allon':  S.roster.forEach(id => { if(!isOn(id)) S.present.push(id); }); clampCourts(); break;
    case 'alloff': S.present = S.present.filter(hasPlayed); clampCourts(); break;
    case 'tolength':      S.rounds = suggestedRounds(active().length, S.courts); S.phase = 'length'; break;
    case 'toattendance':  S.phase = 'attendance'; break;
    case 'pts':  S.pts = +el.dataset.v; break;
    case 'pts+': S.pts = Math.min(48, S.pts + 4); break;
    case 'pts-': S.pts = Math.max(4, S.pts - 4); break;
    case 'crt+': S.courts = Math.min(maxCourts(active().length), S.courts + 1); break;
    case 'crt-': S.courts = Math.max(1, S.courts - 1); break;
    case 'rnd+': S.rounds = Math.min(40, S.rounds + 1); break;
    case 'rnd-': S.rounds = Math.max(1, S.rounds - 1); break;
    case 'usesug': S.rounds = suggestedRounds(active().length, S.courts); break;
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
      const roster = S.roster, present = S.present, guests = S.guests,
            pts = S.pts, courts = S.courts, rounds = S.rounds;
      fresh();
      Object.assign(S, {roster, present, guests, pts, courts, rounds});
      break;
    }
    case 'wipe':
      if(!confirm('Slet alt – både spillere, gæster og resultater?')) return;
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
    navigator.serviceWorker.register('sw.js').catch(() => { /* virker fint uden */ });
  });
}

/* ============ Start ============ */
if(!load()) fresh();
if(S.phase === 'play' && !S.champ) keepAwake(true);
render();
