
class WordlistStore {
  constructor() {
    this.verbs = hardcodedWordList.map((w) => {return {
      "infinitive" : w[0],
      "imperfect" : {"singular" : w[1], "plural" : w[2]},
      "perfect" : w[3],
      "notes" : w[4]
      };
    });
    
  }

  getAll() {
    return this.verbs;
  }

}

const hardcodedWordList = [            
            ["aanbieden", "bood aan", "boden aan", "aangeboden", "предлагать"], //should be 15 in total
            ["bakken", "bakte", "bakten", "gebakken", "печь"],
            ["bederven", "bedierf", "bedierven", "bedorven", "гнить, пропадать"],
            ["beginnen", "begon", "begonnen", "is begonnen"],
            ["begrjipen", "begreep", "begrepen", "begrepen"],
            ["bestrijden", "bestreed", "bestreden", "bestreden", "бороться"],
            ["betreffen", "betrof", "betroffen", "betroffen", "касаться"],
            ["bevelen", "beval", "bevalen", "bevolen", "приказывать"],
            ["bewegen", "bewoog", "bewogen", "bewogen", "двигаться, шевелиться"],
            ["bewijzen", "bewees", "bewogen", "bewogen", "двигаться, шевелиться"],
            ["bidden", "bad", "baden", "gebeden", "молить(ся)"],
            ["bieden", "bood", "boden", "geboden", "предлагать в т.ч. платно"],
            ["bijten", "beet", "beten", "gebeten"],
            ["binden", "bond", "bonden", "gebonden"],
            ["blijken", "bleek", "bleken", "is gebleken"],
            ["blijven", "bleef", "bleven", "is gebleven"],
            ["breken", "brak", "braken", "gebroken"],
            ["fluiten", "floot", "floten", "gefloten", "свистеть"],
            ["ondernemen", "ondernam", "ondernamen", "ondernomen", "предпринимать"],
            ["ontbijten", "ontbeet", "ontbeten", "ontbeten", "снідати"],
            ["ontbreken", "ontbrak", "ontbraken", "ontbroken", "нехватать"],
            ["strijken", "streek", "streken", "gestreken", "гладить"],
            ["verheffen", "verhief", "verhieven", "verheven", "повышать"],
            ["vermijden", "vermeed", "vermeden", "vermeden", "избегать"],
            ["verwerven", "verwierf", "verwierven", "verworven", "выведать"],
            ["waarnemen", "nam waar", "namen waar", "waargenomen", "выяснить"],
            ["brengen", "bracht", "brachten", "gebracht", "приносить"],
            ["buigen", "boog", "bogen", "gebogen", "гнуть(ся), поклоняться"],
            ["denken", "dacht", "dachten", "gedacht", "думать"],
            ["doen", "deed", "deed", "gedaan", "делать"],
            ["dragen", "droeg", "droegen", "gedragen", "тянуть"],
            ["drijven", "dreef", "dreven", "(is) gedreven", "пливсти загоняти"],
            ["dringen", "drong", "drongen", "gedrongen", "давить, топлой"],
            ["drinken", "dronk", "dronken", "gedronken", "пить"],
            ["dwingen", "dwong", "dwongen", "gedwongen", "заставлять"],
            ["ervaren", "ervoer", "ervoeren", "ervaren", "переживать"],
            ["eten", "at", "aten", "gegeten", "есть"],
            ["gaan", "ging", "gingen", "is gegaan", "идти"],
            ["gelden", "gold", "golden", "gegolden", "быть валидным"],
            ["genieten", "genoot", "genoten", "genoten", "наслаждаться"],
            ["geven", "gaf", "gaven", "gegeven", ""],
            ["glijden", "gleed", "gleden", "(is) gegleden", ""],
            ["grijpen", "greep", "grepen", "gegrepen", ""],
            ["hangen", "hing", "hingen", "gehangen", ""],
            ["hebben", "had", "hadden", "gehad", ""],
            ["helpen", "hielp", "hielpen", "geholpen", ""],
            ["houden", "hield", "hielden", "gehouden", ""],
            ["kiezen", "koos", "kozen", "gekozen", ""],
            ["kijken", "keek", "keken", "gekeken", ""],
            ["klimmen", "klom", "klommen", "(is) geklommen", ""],
            ["klinken", "klonk", "klonken", "geklonken", "наслаждаться"],
            ["komen", "kwam", "kwamen", "is gekomen", ""],
            ["kopen", "kocht", "kochten", "gekocht", ""],
            ["krijgen", "kreeg", "kregen", "gekregen", ""],
            ["kruipen", "kroop", "kropen", "gekropen", "ползти"],
            ["kunnen", "kon", "konden", "gekund", ""],
            ["lachen", "lachte", "lachten", "gelachten", ""],
            ["laten", "liet", "lieten", "gelaten", ""],
            ["lezen", "las", "lazen", "gelezen", ""],
            ["liegen", "loog", "logen", "gelogen", ""],
            ["liggen", "lag", "lagen", "gelegen", ""],
            ["lijden", "leed", "leden", "geleden", ""],
            ["lijken", "leek", "leken", "geleken", ""],
            ["lopen", "liep", "liepen", "(is) gelopen", ""],
            ["moeten", "moest", "moesten", "gemoeten", ""],
            ["mogen", "mocht", "mochten", "gemogen", ""],
            ["nemen", "nam", "namen", "genomen", ""],
            ["ontvangen", "ontving", "ontvingen", "ontvangen", ""],
            ["ophangen", "hing op", "hingen op", "opgehangen", ""],
            ["opsteken", "stak op", "staken op", "opgestoken", ""]
];

const wordlistStore = new WordlistStore;

export default wordlistStore;
