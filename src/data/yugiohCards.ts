import { YugiohCardDna, YugiohAttribute, YugiohMonsterType, YugiohCardType } from '../types/yugioh';

export const YUGIOH_CARD_PRESETS: YugiohCardDna[] = [
  {
    id: 'blue-eyes-white-dragon',
    name: 'Blue-Eyes White Dragon',
    japaneseName: '青眼の白龍',
    characterTitle: 'Legendary Dragon of Annihilation',
    attribute: 'LIGHT',
    cardType: 'Normal',
    monsterType: 'Dragon',
    level: 8,
    atk: '3000',
    def: '2500',
    cardPasscode: '89631139',
    cardSetCode: 'LOB-001',
    edition: '1st Edition',
    rarity: 'Prismatic Secret Rare',
    palette: 'white, silver, pale blue, icy cyan, platinum chrome, and cobalt magical energy',
    costume: 'Sleek white and silver draconic armor with crystalline cerulean pauldrons, high aerodynamic dragon mantle, platinum filigree breastplate, and glowing pale-blue conduit lines framing the human neck and chest',
    hairstyle: 'Modern swept-back silver-platinum hair with iridescent cyan highlights and realistic textured strands',
    energyEffects: 'Surging Burst Stream of Destruction cyan plasma vortex, crackling white lightning arcs, swirling pale blue celestial stardust, and radiant crystalline aura',
    environment: 'Cosmic astral sanctuary amidst shattered crystalline pillars beneath a radiant celestial moon and shimmering nebulae',
    visualMotifs: 'Dragon-inspired armor, crystalline details, blue magical energy, dragon motifs, and an epic mystical atmosphere',
    holographicPattern: 'Prismatic Secret Rare diagonal laser diffraction lines, rainbow foil sparkle across dragon scales and armor edges, embossed silver title nameplate',
    effectText: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome beast and lived to tell the tale.',
    abilities: [
      'Burst Stream of Destruction: When summoned, destroy all monsters your opponent controls with lower ATK.',
      'Dragon Spirit Resonance: This card is unaffected by opponent spell effects during the turn it is summoned.',
      'Legendary Supremacy: Gains 500 ATK for each Dragon monster in the Graveyard.'
    ],
    flavorText: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome beast and lived to tell the tale.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'dark-magician',
    name: 'Dark Magician',
    japaneseName: 'ブラック・マジシャン',
    characterTitle: 'The Ultimate Wizard in Terms of Attack and Defense',
    attribute: 'DARK',
    cardType: 'Normal',
    monsterType: 'Spellcaster',
    level: 7,
    atk: '2500',
    def: '2100',
    cardPasscode: '46986414',
    cardSetCode: 'LOB-005',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette: 'deep purple, obsidian black, dark sapphire blue, arcane magenta, and glowing turquoise teal',
    costume: 'Layered high-collared mystical sorcerer robes with angular purple armor shoulder spires, gold runic clasps, deep amethyst velvet linings, and enchanted occult cowl framing the face',
    hairstyle: 'Sculptured dark indigo hair with vibrant magenta edge highlights, partially framed by the iconic curved wizard helm',
    energyEffects: 'Glowing Dark Magic Circle with arcane glyphs spinning in mid-air, crackling magenta and cyan spell energy, levitating arcane orbs, and spiraling dark matter particles',
    environment: 'Ancient Millennium stone temple chamber inscribed with glowing Egyptian hieroglyphs beneath an ominous occult eclipse',
    visualMotifs: 'Deep purple, black, dark blue and magenta tones, magical robes, arcane symbols, staff/magic effects and an occult fantasy atmosphere',
    holographicPattern: 'Secret Rare cross-hatched rainbow diffraction foil, holographic sheen on the Dark Magic Circle and magical staff, metallic gold lettering',
    effectText: 'The ultimate wizard in terms of attack and defense. Master of the forbidden occult arts and loyal protector of the Pharaoh.',
    abilities: [
      'Dark Magic Attack: If you control "Dark Magician", destroy all Spell and Trap cards your opponent controls.',
      'Thousand Knives: Target 1 monster your opponent controls; destroy that target.',
      'Eternal Soul: This card is unaffected by your opponent’s card effects while face-up on the field.'
    ],
    flavorText: 'The ultimate wizard in terms of attack and defense.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'red-eyes-black-dragon',
    name: 'Red-Eyes Black Dragon',
    japaneseName: '真紅眼の黒竜',
    characterTitle: 'Ferocious Dragon with a Deadly Spark',
    attribute: 'DARK',
    cardType: 'Normal',
    monsterType: 'Dragon',
    level: 7,
    atk: '2400',
    def: '2000',
    cardPasscode: '74677422',
    cardSetCode: 'LOB-070',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'charcoal black, dark crimson, obsidian metallic, molten orange fire, and ruby red eye glow',
    costume: 'Serrated black dragon-scale gothic armor with sharp crimson pauldron crests, obsidian claw clasps, scorched dragon-leather vest, and jagged high collar framing the jawline',
    hairstyle: 'Edgy spiky jet-black hair with intense crimson red streaks and embers glowing at the tips',
    energyEffects: 'Inferno Fire Blast eruption, swirling volcanic embers, crimson plasma flames licking around armored shoulders, and dark heat shimmer',
    environment: 'Cavern of volcanic basalt and smoldering obsidian crags, lava fissures glowing red beneath an ash-choked thunderous sky',
    visualMotifs: 'Black, dark red, crimson and metallic tones with dragon-inspired armor, fiery energy and aggressive visual motifs',
    holographicPattern: 'Molten gold and ruby rainbow diffraction, metallic black foil card border, glowing crimson eye reflections',
    effectText: 'A ferocious dragon with a deadly attack. It does not possess the power of the Blue-Eyes, but possesses limitless potential.',
    abilities: [
      'Inferno Fire Blast: Inflict damage to your opponent equal to the original ATK of this card (2400).',
      'Red-Eyes Fusion: Can be summoned using materials from the deck, gaining 500 ATK.',
      'Potential of Darkness: Once per turn, special summon 1 Level 7 or lower DARK monster from your Graveyard.'
    ],
    flavorText: 'A ferocious dragon with a deadly attack.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'dark-magician-girl',
    name: 'Dark Magician Girl',
    japaneseName: 'ブラック・マジシャン・ガール',
    characterTitle: 'Beloved Apprentice Sorceress',
    attribute: 'DARK',
    cardType: 'Effect',
    monsterType: 'Spellcaster',
    level: 6,
    atk: '2000',
    def: '1700',
    cardPasscode: '38033121',
    cardSetCode: 'SS01-ENA04',
    edition: '1st Edition',
    rarity: 'Prismatic Secret Rare',
    palette: 'vibrant magenta pink, cerulean blue, golden yellow accents, soft cream, and sparkling magical glitter',
    costume: 'Charming magical girl sorceress mantle with pink and cerulean armor trim, golden pentagram chest brooch, flowing wizard capelet, and elegant curved pointed wizard cap',
    hairstyle: 'Dynamic golden-blonde silky hair with soft bangs naturally framing the realistic human face, billowing in magical wind currents',
    energyEffects: 'Swirling pink and yellow magical starbursts, sparkling pentagram spell seals, heart-shaped arcane sparkles, and radiant golden wand beams',
    environment: 'Whimsical celestial sanctuary with floating spellbooks, sparkling magical dust, and soft violet twilight clouds',
    visualMotifs: 'Playful yet formidable magical apprentice robes, arcane star symbols, jewel-tipped wand, vibrant high-saturation jewel colors',
    holographicPattern: 'Glittering starlight diffraction foil, rainbow reflections across the golden brooch and wand, embossed pink-gold nameplate',
    effectText: 'Gains 300 ATK for every "Dark Magician" or "Magician of Black Chaos" in the GY.',
    abilities: [
      'Gains 300 ATK for every "Dark Magician" or "Magician of Black Chaos" in the GY.',
      'Dark Burning Attack: If you control "Dark Magician Girl", destroy all face-up monsters your opponent controls.',
      'Sorceress Bond: Can be special summoned from the hand by tributing 1 Spellcaster monster.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'slifer-the-sky-dragon',
    name: 'Slifer the Sky Dragon',
    japaneseName: 'オシリスの天空竜',
    characterTitle: 'Egyptian God of the Heavens',
    attribute: 'DIVINE',
    cardType: 'Egyptian God',
    monsterType: 'Divine-Beast',
    level: 10,
    atk: '?',
    def: '?',
    cardPasscode: '10000020',
    cardSetCode: 'YGLD-EN001',
    edition: 'LIMITED EDITION',
    rarity: 'Ghost Rare',
    palette: 'sacred crimson red, antique Egyptian gold, stormy violet, celestial lightning white, and ruby iridescence',
    costume: 'Monumental Egyptian deity vestments with layered gold-leaf pectorals, towering twin-crested crimson dragon wings, sacred pharaonic nemes headdress, and divine ruby scarab clasps',
    hairstyle: 'Dramatic flowing crimson hair intermingled with golden divine braids that radiate divine lightning',
    energyEffects: 'Thunder Force divine lightning cascading from storm clouds, roaring twin draconic jaws of heavenly plasma, and golden hieroglyphic aura spirals',
    environment: 'Pyramids of Giza under a supernatural cosmic storm, lightning tearing open the heavens as the celestial serpent coils across the clouds',
    visualMotifs: 'Divine red card frame, ancient Egyptian hieroglyphic border inscriptions, cosmic thunder, divine omnipotence',
    holographicPattern: 'Ghost Rare translucent 3D holographic foil, sacred Egyptian God card scarlet-red backing and border, iridescent lightning flash',
    effectText: '[Divine-Beast / Effect]\nRequires 3 Tributes to Normal Summon. This card’s Normal Summon cannot be negated. This card gains 1000 ATK and DEF for each card in your hand.',
    abilities: [
      'Thunder Force: Gains 1000 ATK and DEF for each card in your hand.',
      'Second Mouth Lightning Blast: When your opponent summons a monster with 2000 or less ATK/DEF, reduce its ATK/DEF by 2000; if it hits 0, destroy it immediately.',
      'Divine Immortality: Unaffected by Spells, Traps, or Monster effects that would remove it from the field.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'obelisk-the-tormentor',
    name: 'Obelisk the Tormentor',
    japaneseName: 'オベリスクの巨神兵',
    characterTitle: 'Egyptian God of Absolute Might',
    attribute: 'DIVINE',
    cardType: 'Egyptian God',
    monsterType: 'Divine-Beast',
    level: 10,
    atk: '4000',
    def: '4000',
    cardPasscode: '10000000',
    cardSetCode: 'YGLD-EN002',
    edition: 'LIMITED EDITION',
    rarity: 'Ghost Rare',
    palette: 'monolithic cobalt blue, celestial lapis lazuli, burnished gold, obsidian stone, and blinding cyan divine power',
    costume: 'Titan colossus armor carved from celestial lapis stone with towering spiked pauldrons, pharaonic gold collar of the Pharaoh, and monumental muscular chest plate',
    hairstyle: 'Bold dark hair with glowing electric cyan streaks, framed by stone horns of divine sovereign power',
    energyEffects: 'Fist of Fate shockwaves tearing fissures through reality, blinding cyan divine shockwaves, shattered temple stones levitating',
    environment: 'Crumbled ancient Egyptian temple amphitheater collapsing under the seismic weight of divine wrath, golden sands swirling in shockwaves',
    visualMotifs: 'Divine blue card frame, colossal monolithic power, Egyptian hieroglyphs, seismic destruction',
    holographicPattern: 'Ghost Rare holographic depth, royal Egyptian God card sapphire-blue backing, metallic gold embossed hieroglyphic borders',
    effectText: '[Divine-Beast / Effect]\nRequires 3 Tributes to Normal Summon. This card’s Normal Summon cannot be negated. Cannot be targeted by Spells, Traps, or card effects.',
    abilities: [
      'Fist of Fate: Tribute 2 monsters you control; destroy all monsters your opponent controls, and inflict 4000 damage to your opponent.',
      'Absolute Barrier: Cannot be targeted by Spells, Traps, or monster effects.',
      'Colossus Might: Cannot be destroyed by battle or card effects.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'the-winged-dragon-of-ra',
    name: 'The Winged Dragon of Ra',
    japaneseName: 'ラーの翼神竜',
    characterTitle: 'Supreme Solar God of the Sun',
    attribute: 'DIVINE',
    cardType: 'Egyptian God',
    monsterType: 'Divine-Beast',
    level: 10,
    atk: '?',
    def: '?',
    cardPasscode: '10000010',
    cardSetCode: 'YGLD-EN003',
    edition: 'LIMITED EDITION',
    rarity: 'Ghost Rare',
    palette: 'brilliant solar gold, burnished bronze, incandescent white heat, solar flare orange, and sacred hieroglyph glow',
    costume: 'Resplendent celestial golden solar armor modeled after Horus and Ra, intricate feather-plated gold wings, sun-disc crown pectoral, and glowing hieroglyphic engravings',
    hairstyle: 'Radiant golden-bronze hair flowing like liquid sunlight with shimmering solar crown tips',
    energyEffects: 'Blinding solar corona flare, golden Egyptian Phoenix fire manifestation, swirling celestial sun storms, and burning hieroglyphs',
    environment: 'High above the Valley of the Kings at high noon, the sun itself descending in blinding majesty behind the golden pyramid apex',
    visualMotifs: 'Golden Egyptian God card frame, solar fire, pharaonic sun disc, divine immortality',
    holographicPattern: 'Full-surface Egyptian gold prism foil, shifting golden sunburst diffraction, hieroglyphic micro-inscriptions along card borders',
    effectText: '[Divine-Beast / Effect]\nRequires 3 Tributes to Normal Summon. You can pay LP until you have 100 left; this card gains ATK and DEF equal to the amount of LP paid.',
    abilities: [
      'Solar Power Transfer: Pay LP until 100 left; this card gains ATK and DEF equal to the LP paid.',
      'God Phoenix Mode: Pay 1000 LP; send 1 monster on the field to the Graveyard, bypassing all immunities.',
      'One-Turn Kill Solar Flame: Can attack all monsters your opponent controls once each.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'exodia-the-forbidden-one',
    name: 'Exodia the Forbidden One',
    japaneseName: '封印されしエクゾディア',
    characterTitle: 'Unstoppable Ancient Sealed Divinity',
    attribute: 'DARK',
    cardType: 'Effect',
    monsterType: 'Spellcaster',
    level: 3,
    atk: '1000',
    def: '1000',
    cardPasscode: '33396948',
    cardSetCode: 'LOB-124',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'ancient weathered gold, aged bronze, obsidian shackles, mystical turquoise, and divine parchment',
    costume: 'Pharaonic golden deity chest armor adorned with sacred Egyptian ankh crests, massive shattered golden sealing chains draped across the chest, and royal linen tunic',
    hairstyle: 'Majestic dark hair crowned by the iconic golden horned Pharaoh’s mask and divine ceremonial headdress',
    energyEffects: 'Shattering mystical golden seal runes, dimensional rift beams bursting from broken chains, and blinding golden victory aura',
    environment: 'Ancient subterranean sealing chamber beneath the Great Pyramid with massive stone monoliths cracking as the seals break',
    visualMotifs: 'Shattered golden chains, ancient Egyptian seals, infinite forbidden power, mysterious dark magic',
    holographicPattern: 'Ultra Rare glittering golden foil name, holographic seal fractures, aged stone frame textures',
    effectText: '[Spellcaster / Effect]\nIf you have "Right Leg", "Left Leg", "Right Arm", and "Left Arm of the Forbidden One" in addition to this card in your hand, you win the Duel.',
    abilities: [
      'Infinite Victory: When all 5 pieces are gathered in the hand, the Duel is won unconditionally.',
      'Forbidden Seal: Cannot be banished or discarded by opponent card effects.',
      'Obliterate Wrath: Destroys any field barrier or defensive spell upon breaking the final chain.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'summoned-skull',
    name: 'Summoned Skull',
    japaneseName: 'デーモンの召喚',
    characterTitle: 'Fiend with Dark Lightning Sorcery',
    attribute: 'DARK',
    cardType: 'Normal',
    monsterType: 'Fiend',
    level: 6,
    atk: '2500',
    def: '1200',
    cardPasscode: '70781052',
    cardSetCode: 'MRD-003',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'skeletal bone ivory, obsidian black, crackling lightning violet, and demonic crimson',
    costume: 'Gothic skeletal demon armor with exposed ivory ribcage pauldrons, leather wraps, demonic spine-collared mantle, and horned demonic helm',
    hairstyle: 'Wild textured dark hair with bone-white horns curving gracefully upward above the temples',
    energyEffects: 'Purple lightning strikes cascading from demonic claws, crackling electrical plasma arcs, and swirling black smoke vortex',
    environment: 'Stormy desolate Netherworld precipice illuminated by continuous strikes of purple thunder beneath rolling vortex clouds',
    visualMotifs: 'Demonic skeletal armor, dark lightning, terrifying fiend aesthetic, vintage TCG nostalgia',
    holographicPattern: 'Purple and silver rainbow diffraction foil, metallic bone textures, embossed dark nameplate',
    effectText: 'A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable strength.',
    abilities: [
      'Lightning Strike: When attacking, negates the effects of all face-down Trap cards.',
      'Archfiend Dominance: Gains 500 ATK when battling non-Fiend monsters.',
      'Makiu Mist: Can destroy all opponent monsters with DEF lower than this card’s ATK.'
    ],
    flavorText: 'A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable strength.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'elemental-hero-neos',
    name: 'Elemental HERO Neos',
    japaneseName: 'Ｅ・ＨＥＲＯ ネオス',
    characterTitle: 'Cosmic Champion of Neo Space',
    attribute: 'LIGHT',
    cardType: 'Normal',
    monsterType: 'Warrior',
    level: 7,
    atk: '2500',
    def: '2000',
    cardPasscode: '89943723',
    cardSetCode: 'POTD-EN001',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette: 'pure hero white, cosmic cyan, ruby red accents, polished gold crest, and deep space navy',
    costume: 'Sleek futuristic tokusatsu-inspired superhero battle armor with white armored chest plate, cyan glowing energy gems, red shoulder blades, and heroic high collar',
    hairstyle: 'Sharp modern styled hair with silver-white highlights and sculpted aerodynamic strands',
    energyEffects: 'Rainbow Neo Space cosmic energy trails, glowing cyan starlight beams, and comic-book dynamic impact aura',
    environment: 'Neo Space dimension with floating colorful cosmic nebulae, glittering star systems, and dimensional aurora ribbons',
    visualMotifs: 'Heroic warrior suit, cosmic starlight, Neo Space energy, clean superhero lines',
    holographicPattern: 'Secret Rare rainbow cross-diffraction foil, glowing chest gemstone reflection, pristine white card frame highlights',
    effectText: 'A new Elemental HERO that has arrived from Neo Space. When he initiates a Contact Fusion with a Neo-Spacian, his unknown powers are unleashed.',
    abilities: [
      'Contact Fusion: Can fuse with Neo-Spacians without needing "Polymerization".',
      'Wrath of Neos: Send this card to the Graveyard to destroy all cards on the field.',
      'Heroic Resonance: Gains 1000 ATK during damage calculation when battling DARK monsters.'
    ],
    flavorText: 'A new Elemental HERO that has arrived from Neo Space. When he initiates a Contact Fusion with a Neo-Spacian, his unknown powers are unleashed.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'cyber-dragon',
    name: 'Cyber Dragon',
    japaneseName: 'サイバー・ドラゴン',
    characterTitle: 'Chrome Mechanical Serpentine Titan',
    attribute: 'LIGHT',
    cardType: 'Effect',
    monsterType: 'Machine',
    level: 5,
    atk: '2100',
    def: '1600',
    cardPasscode: '70095154',
    cardSetCode: 'CRV-EN015',
    edition: '1st Edition',
    rarity: 'Ultimate Rare',
    palette: 'mirror chrome silver, high-tech cobalt blue, pure neon cyan, and carbon fiber gray',
    costume: 'Heavy industrial biomechanical pilot armor with segmented chrome serpent plating, glowing cyan hydraulic conduits, steel epaulets, and cybernetic visor accents',
    hairstyle: 'Precision-cut silver-gray hair with metallic sheen and cybernetic data hairpins',
    energyEffects: 'Evolution Burst twin laser plasma cannons, electrical sparks discharging from chrome joints, and digital HUD target reticles',
    environment: 'High-tech subterranean industrial Cyber factory with automated assembly cranes, neon power conduits, and sparks flying in the dark',
    visualMotifs: 'Chrome mechanical dragon, cybernetic high-tech armor, laser cannons, metallic TCG frame',
    holographicPattern: 'Ultimate Rare raised 3D embossed foil texture on machine plates, laser-etched metallic borders, bright cyan foil eye gleam',
    effectText: '[Machine / Effect]\nIf only your opponent controls a monster, you can Special Summon this card (from your hand).',
    abilities: [
      'Evolution Burst: If summoned while your opponent controls a monster and you control none, Special Summon this card directly from hand.',
      'Cybernetic Core: Treated as "Cyber Dragon" while on the field or in the Graveyard.',
      'Overload Power: Can be used as material for machine fusion monsters to double their ATK.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'stardust-dragon',
    name: 'Stardust Dragon',
    japaneseName: 'スターダスト・ドラゴン',
    characterTitle: 'Cosmic Dragon of the Guiding Star',
    attribute: 'WIND',
    cardType: 'Synchro',
    monsterType: 'Dragon',
    level: 8,
    atk: '2500',
    def: '2000',
    cardPasscode: '44508094',
    cardSetCode: 'TDGS-EN040',
    edition: '1st Edition',
    rarity: 'Ghost Rare',
    palette: 'shimmering celestial silver, starlight cyan, pearl white, translucent sky blue, and cosmic stardust sparkles',
    costume: 'Aerodynamic astral dragon rider armor with translucent iridescent wing mantles, silver-leaf pauldrons, glowing cyan cosmic crystal breastplate, and star-crested collar',
    hairstyle: 'Flowing windswept silver-white silky hair sparkling with floating cosmic stardust motes',
    energyEffects: 'Shooting Sonic stardust stream, swirling cosmic wind vortices, glowing constellation lines, and sparkling star particles',
    environment: 'Outer stratosphere over Neo Domino City at night, the Milky Way galaxy arching across a star-strewn indigo sky',
    visualMotifs: 'Synchro white card frame, cosmic stardust wings, celestial guardian aura, wind currents',
    holographicPattern: 'Ghost Rare holographic 3D depth, Synchro white pearl border finish, prismatic shooting star diffraction lines',
    effectText: '[Dragon / Synchro / Effect]\n1 Tuner + 1+ non-Tuner monsters\nWhen a card or effect is activated that would destroy a card(s) on the field (Quick Effect): You can Tribute this card; negate the activation, and if you do, destroy it.',
    abilities: [
      'Victim’s Sanctuary: Tribute this card to negate any effect that would destroy cards on the field, then Special Summon this card back during the End Phase.',
      'Shooting Sonic: When attacking an opponent monster, destroy that monster at the start of damage calculation.',
      'Cosmic Protection: Other face-up cards you control cannot be destroyed by battle.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'black-rose-dragon',
    name: 'Black Rose Dragon',
    japaneseName: 'ブラック・ローズ・ドラゴン',
    characterTitle: 'Thorned Dragon of Destruction and Bloom',
    attribute: 'FIRE',
    cardType: 'Synchro',
    monsterType: 'Dragon',
    level: 7,
    atk: '2400',
    def: '1800',
    cardPasscode: '73580471',
    cardSetCode: 'CSOC-EN039',
    edition: '1st Edition',
    rarity: 'Collector\'s Rare',
    palette: 'crimson velvet red, obsidian thorn black, dark magenta, rose petal pink, and glowing ruby sparks',
    costume: 'High-fashion gothic-victorian rose armor coat with layered crimson petal pauldrons, black thorn embroidery, corset clasps, and dramatic rosebud collar',
    hairstyle: 'Elegant burgundy-red natural hair with soft braided side-tails and delicate black thorn rose pins',
    energyEffects: 'Black Rose Gale petal storm, swirling vortex of razor-sharp crimson petals, glowing ruby embers, and entwining thorn vines',
    environment: 'Gothic ruined cathedral overgrown with giant blooming crimson black roses under a blood-red twilight sky',
    visualMotifs: 'Rose petal dragon armor, sharp thorn whips, Synchro white frame with crimson accents, destructive beauty',
    holographicPattern: 'Collector’s Rare rainbow stippling foil along petal edges, metallic crimson foil title, sparkling thorn glints',
    effectText: '[Dragon / Synchro / Effect]\n1 Tuner + 1+ non-Tuner monsters\nWhen this card is Synchro Summoned: You can destroy all cards on the field. Once per turn: You can banish 1 Plant monster from your GY to change 1 defense monster to attack and reduce its ATK to 0.',
    abilities: [
      'Black Rose Gale: When Synchro Summoned, you can destroy all other cards on the field.',
      'Rose Restriction: Banish 1 Plant monster from your GY; change 1 opponent monster to Attack Position, and reduce its ATK to 0 until the end of this turn.',
      'Blooming Rebirth: When this card is destroyed, Special Summon 1 Plant monster from your Graveyard.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'jinzo',
    name: 'Jinzo',
    japaneseName: '人造人間－サイコ・ショッカー',
    characterTitle: 'Cybernetic Psionic Trap Destroyer',
    attribute: 'DARK',
    cardType: 'Effect',
    monsterType: 'Machine',
    level: 6,
    atk: '2400',
    def: '1500',
    cardPasscode: '77585513',
    cardSetCode: 'PSV-000',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette: 'cybernetic steel, matte leather black, electric cyan, purple psionic brain glow, and copper rivets',
    costume: 'Heavy dystopian cyber-assassin leather trenchcoat with reinforced steel spine conduits, exposed psionic amplifier nodes, high leather collar, and cybernetic eye visor',
    hairstyle: 'Sleek dark cyberpunk crop with exposed metallic psionic nodes and glowing purple circuit braids',
    energyEffects: 'Psionic shockwaves ripples shattering purple trap card holograms, crackling cyan electrical arcs, and distorting psychic forcefields',
    environment: 'Underground high-security techno-bunker with sparking server racks and shattered security monitors',
    visualMotifs: 'Cybernetic psycho shocker, trap nullification, heavy sci-fi leather, psionic energy',
    holographicPattern: 'Secret Rare diagonal laser foil, glowing purple psionic eye lens foil stamp, steel textured borders',
    effectText: '[Machine / Effect]\nTrap Cards, and their effects on the field, cannot be activated. The effects of all face-up Trap Cards on the field are negated.',
    abilities: [
      'Trap Nullification: Trap Cards cannot be activated, and all Trap Card effects on the field are completely negated.',
      'Cyber Energy Shock: Once per turn, destroy 1 Trap Card on the field; inflict 800 damage to its controller.',
      'Psionic Override: Cannot be destroyed by card effects of Traps or Spells that target it.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'buster-blader',
    name: 'Buster Blader',
    japaneseName: 'バスター・ブレイダー',
    characterTitle: 'The Legendary Dragon Destroyer Swordsman',
    attribute: 'EARTH',
    cardType: 'Effect',
    monsterType: 'Warrior',
    level: 7,
    atk: '2600',
    def: '2300',
    cardPasscode: '78193831',
    cardSetCode: 'PSV-050',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'cobalt steel blue, burnished antique gold, crimson cape velvet, and polished broadsword silver',
    costume: 'Master dragon-slayer plate armor with massive horned pauldrons, golden draconic dragon-head breastplate crest, flowing crimson war cape, and heavy armored gorget',
    hairstyle: 'Battle-hardened dark hair visible under the iconic golden-crested horned warrior helm',
    energyEffects: 'Colossal two-handed Buster Sword radiating golden dragon-slaying aura, slashing air shockwaves, and golden blade gleams',
    environment: 'Ancient dragon burial valley littered with giant fossilized dragon bones beneath a fiery dusk sky',
    visualMotifs: 'Legendary broadsword, dragon-slayer armor, blue and gold metal tones, heroic resolve',
    holographicPattern: 'Ultra Rare golden foil title, prismatic diffraction along the massive sword edge, metallic steel armor sheen',
    effectText: '[Warrior / Effect]\nGains 500 ATK for each Dragon monster your opponent controls or is in their Graveyard.',
    abilities: [
      'Dragon Destroyer: Gains 500 ATK for each Dragon monster your opponent controls or in their Graveyard.',
      'Dragon Buster Slash: All Dragon monsters your opponent controls are changed to Defense Position and cannot activate their effects.',
      'Piercing Strike: If this card attacks a Defense Position monster, inflict piercing battle damage.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'chaos-emperor-dragon',
    name: 'Chaos Emperor Dragon - Envoy of the End',
    japaneseName: 'カオス・エンペラー・ドラゴン －終焉の使者－',
    characterTitle: 'Emperor of Total Annihilation',
    attribute: 'DARK',
    cardType: 'Effect',
    monsterType: 'Dragon',
    level: 8,
    atk: '3000',
    def: '2500',
    cardPasscode: '82301904',
    cardSetCode: 'IOC-000',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette: 'iridescent obsidian black, violet chaos flame, pure blinding white starlight, gold accents, and cosmic nebula magenta',
    costume: 'Emperor chaos-dragon battle armor combining dark obsidian and light pearl plating, multi-tiered chaos wing mantle, gold-jeweled dragon clasps, and high menacing collar',
    hairstyle: 'Dual-tone hair with jet-black roots fading into ethereal luminous white tips that float in gravitational flux',
    energyEffects: 'Apocalyptic Chaos Field explosion, black hole gravitational vortex pulling cards and light into the void, violet and white celestial flames',
    environment: 'The end of space and time: a shattered dimensional void where entire galaxies collapse into a cosmic singularity',
    visualMotifs: 'Duality of Light and Darkness, cosmic dragon armor, total board wipe energy, forbidden supreme boss monster',
    holographicPattern: 'Secret Rare dazzling rainbow cross-diffraction foil, black and violet metallic borders, shimmering chaos wing foil',
    effectText: '[Dragon / Effect]\nCannot be Normal Summoned/Set. Must be Special Summoned by banishing 1 LIGHT and 1 DARK monster from your GY. Pay 1000 LP; send all cards in both players’ hands and on the field to the GY, then inflict 300 damage to your opponent for each card sent to the GY by this effect.',
    abilities: [
      'Envoy of the End: Pay 1000 LP; send all cards in both players’ hands and on the field to the GY, inflicting 300 damage for each card.',
      'Chaos Summoning: Special Summon by banishing 1 LIGHT and 1 DARK monster from your GY.',
      'Unstoppable Doom: This card’s effect activation cannot be responded to by Spell or Trap cards.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'black-luster-soldier',
    name: 'Black Luster Soldier - Envoy of the Beginning',
    japaneseName: 'カオス・ソルジャー －開闢の使者－',
    characterTitle: 'Supreme Master of Chaos Swordsmanship',
    attribute: 'LIGHT',
    cardType: 'Effect',
    monsterType: 'Warrior',
    level: 8,
    atk: '3000',
    def: '2500',
    cardPasscode: '72989439',
    cardSetCode: 'IOC-025',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette: 'cerulean midnight blue, burnished antique gold, gleaming silver steel, ruby eye crest, and white starlight',
    costume: 'Legendary ornate chaos knight armor with golden sunburst chest plate, layered blue-steel lamellar shoulder guards, ruby-encrusted shield, and heroic ceremonial helm',
    hairstyle: 'Noble dark textured hair flowing beneath the golden-visored knight helm with golden strands framing the temples',
    energyEffects: 'Twin glowing chaos blades radiating celestial light and void darkness, slicing spatial rifts through the air, and golden aura motes',
    environment: 'Sacred mountain plateau at dawn where golden sunlight meets retreating starry night sky',
    visualMotifs: 'Supreme warrior of light and dark, golden engraved armor, dual swords, ultimate honor',
    holographicPattern: 'Secret Rare rainbow sheen across the chaos blade edge, gold foil embossed card title, shimmering armor highlights',
    effectText: '[Warrior / Effect]\nCannot be Normal Summoned/Set. Must be Special Summoned by banishing 1 LIGHT and 1 DARK monster from your GY. Once per turn: You can banish 1 monster on the field; OR if this card destroyed an opponent’s monster by battle, it can make a second attack in a row.',
    abilities: [
      'Dimensional Banishment: Once per turn, target 1 monster on the field; banish it face-up.',
      'Relentless Blade Strike: If this card destroys an opponent’s monster by battle, it can make a second attack immediately.',
      'Chaos Aegis: Gains 500 ATK during your opponent’s turn.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'kuriboh',
    name: 'Kuriboh',
    japaneseName: 'クリボー',
    characterTitle: 'Loyal Guardian of the Pharaoh',
    attribute: 'DARK',
    cardType: 'Effect',
    monsterType: 'Fiend',
    level: 1,
    atk: '300',
    def: '200',
    cardPasscode: '40640057',
    cardSetCode: 'MRD-071',
    edition: '1st Edition',
    rarity: 'Super Rare',
    palette: 'chestnut brown, warm amber, fluffy fur cream, glowing emerald green eyes, and magical sparkle',
    costume: 'Whimsical high-end winter shearling fur-trimmed coat inspired by Kuriboh’s plush brown coat, small golden claw clasps, and cozy oversized hood framing a smiling face',
    hairstyle: 'Playful textured fluffy brown hair with soft tips that mimic Kuriboh’s fuzzy silhouette',
    energyEffects: 'Multiply spell seals duplicating miniature floating Kuriboh spirits, sparkling emerald shields of light, and gentle floating stars',
    environment: 'Enchanted dusk forest with giant glowing mushrooms and sparkling fairy dust floating in warm evening light',
    visualMotifs: 'Fluffy fur trims, glowing green eyes, multiply magic, ultimate loyal protection',
    holographicPattern: 'Super Rare silver foil typography, holographic glints in the eyes and protective shield, warm card stock texture',
    effectText: '[Fiend / Effect]\nDuring damage calculation, if your opponent’s monster attacks (Quick Effect): You can discard this card from your hand; you take no battle damage from that battle.',
    abilities: [
      'Damage Zero: Discard this card from your hand; reduce all battle damage from 1 attack to 0.',
      'Multiply: When targeted, summon up to 5 Kuriboh Token defenders to block incoming attacks.',
      'Loyal Spirit: Cannot be removed from the Graveyard by opponent card effects.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'time-wizard',
    name: 'Time Wizard',
    japaneseName: '時の魔術師',
    characterTitle: 'Master of Chronomancy',
    attribute: 'LIGHT',
    cardType: 'Effect',
    monsterType: 'Spellcaster',
    level: 2,
    atk: '500',
    def: '400',
    cardPasscode: '71625222',
    cardSetCode: 'MRD-065',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'antique clockwork brass, pendulum gold, electric amber, and celestial clockface cyan',
    costume: 'Victorian chronomancer clockwork robes with antique brass gear pauldrons, pocketwatch chain clasps, and clockwork crown',
    hairstyle: 'Whimsical styled hair with small clockwork brass gear pins catching magical light',
    energyEffects: 'Time Roulette glowing golden clock face spinning in the air, electric sparks arcing between clock hands, and temporal ripples',
    environment: 'Mystic clockwork tower filled with floating antique pendulum clocks and shifting temporal portals',
    visualMotifs: 'Clockwork gears, time roulette, temporal magic, lightning sparks',
    holographicPattern: 'Ultra Rare golden foil clock face, prismatic spinning pendulum diffraction',
    effectText: '[Spellcaster / Effect]\nOnce per turn: You can toss a coin and call it. If you call it right: Destroy all monsters your opponent controls. If you call it wrong: Destroy all monsters you control, and if you do, take damage equal to half the total ATK those destroyed monsters had.',
    abilities: [
      'Time Roulette: Toss a coin; destroy all opponent monsters on heads, or take backlash damage on tails.',
      'Time Warp: Can evolve friendly monsters by fast-forwarding their age by 1000 years.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'harpie-lady',
    name: 'Harpie Lady',
    japaneseName: 'ハーピィ・レディ',
    characterTitle: 'Winged Avian Sorceress',
    attribute: 'WIND',
    cardType: 'Normal',
    monsterType: 'Winged Beast',
    level: 4,
    atk: '1300',
    def: '1400',
    cardPasscode: '12206212',
    cardSetCode: 'MRD-008',
    edition: '1st Edition',
    rarity: 'Super Rare',
    palette: 'cerulean blue, aerodynamic emerald, sleek lilac, silver claw accents, and feather violet',
    costume: 'Sleek aerodynamic aviator bodysuit with layered emerald plumage wing mantles, polished silver claw gauntlets, and high-collared feather mantle',
    hairstyle: 'Voluminous vibrant cerulean hair billowing dynamically in gale wind currents',
    energyEffects: 'Razor-sharp gale wind slicing arcs, floating emerald feathers, and swirling aerial wind vortex',
    environment: 'High wind-swept mountain precipice overlooking endless cloud oceans under a clear azure sky',
    visualMotifs: 'Avian plumage, razor claw strikes, aerodynamic grace, wind currents',
    holographicPattern: 'Super Rare silver foil wing accents and shimmering feather diffraction',
    effectText: 'This human-shaped animal with wings is beautiful to watch but lethal in battle.',
    abilities: [
      'Cyber Shield: Equip with cyber armor to increase ATK by 500.',
      'Elegant Egotist: Can summon Harpie Lady Sisters from deck or hand.'
    ],
    flavorText: 'This human-shaped animal with wings is beautiful to watch but lethal in battle.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'celtic-guardian',
    name: 'Celtic Guardian',
    japaneseName: 'エルフの剣士',
    characterTitle: 'Noble Swordsman of the Silver Blade',
    attribute: 'EARTH',
    cardType: 'Normal',
    monsterType: 'Warrior',
    level: 4,
    atk: '1400',
    def: '1200',
    cardPasscode: '91152256',
    cardSetCode: 'LOB-007',
    edition: '1st Edition',
    rarity: 'Super Rare',
    palette: 'forest emerald green, burnished gold trim, polished steel, and leather brown',
    costume: 'Noble Celtic elven tunic armor with emerald leather breastplate, gold filigree trim, chainmail sleeves, and ornate silver scabbard',
    hairstyle: 'Silky sandy-blonde hair with pointed elven ears and a thin silver circlet band across the forehead',
    energyEffects: 'Gleaming silver sword slashes, forest leaf vortex, and emerald ward barrier',
    environment: 'Sacred misty ancient oak forest with sunbeams filtering through ancient stone monoliths',
    visualMotifs: 'Elven sword, green leather and gold armor, forest sanctuary, unwavering loyalty',
    holographicPattern: 'Super Rare silver foil sword glints, rainbow metallic armor edge diffraction',
    effectText: 'An elf who learned to wield a sword, he baffles enemies with lightning-swift attacks.',
    abilities: [
      'Swift Strike: Attacks with blinding agility, bypassing 1 defensive shield.',
      'Obnoxious Guardian: Cannot be destroyed by battle with monsters of 1900 or more ATK.'
    ],
    flavorText: 'An elf who learned to wield a sword, he baffles enemies with lightning-swift attacks.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'flame-swordsman',
    name: 'Flame Swordsman',
    japaneseName: '炎の剣士',
    characterTitle: 'Legendary Fiery Duelist',
    attribute: 'FIRE',
    cardType: 'Fusion',
    monsterType: 'Warrior',
    level: 5,
    atk: '1800',
    def: '1600',
    cardPasscode: '45231177',
    cardSetCode: 'LOB-003',
    edition: '1st Edition',
    rarity: 'Super Rare',
    palette: 'scarlet red, molten gold, crimson steel, leather black, and fiery flame yellow',
    costume: 'Scarlet battle armor with flame-crested high visor helm, molten golden shoulder spires, crimson cape, and flame-resistant leather wraps',
    hairstyle: 'Fiery crimson-streaked hair visible under the lifted visor of the flame helm',
    energyEffects: 'Flaming Salamandra broadsword erupting in roaring orange and yellow flames, fiery wave slashes, and ember trails',
    environment: 'Molten volcanic arena with cracking magma fissures and billowing flame geysers',
    visualMotifs: 'Flaming broadsword, scarlet knight plate, fiery aura, courageous duelist spirit',
    holographicPattern: 'Super Rare red and gold foil flame diffraction along the blade edge',
    effectText: '"Masaki the Legendary Swordsman" + "Flame Manipulator"\nA master swordsman whose blade burns with incandescent fire that vaporizes enemy defenses.',
    abilities: [
      'Salamandra Flame: Can increase ATK by 700 with the legendary Salamandra equip spell.',
      'Flame Transfer: Can transfer 700 ATK to another friendly monster.'
    ],
    flavorText: 'A master swordsman whose blade burns with incandescent fire.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'relinquished',
    name: 'Relinquished',
    japaneseName: 'サクリファイス',
    characterTitle: 'Occult Entity of the Black Illusion',
    attribute: 'DARK',
    cardType: 'Ritual',
    monsterType: 'Spellcaster',
    level: 1,
    atk: '0',
    def: '0',
    cardPasscode: '64631466',
    cardSetCode: 'MRL-029',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'mystic occult indigo, golden eye yellow, void black, and eldritch violet',
    costume: 'Surreal eldritch sorcerer mantle with gold-rimmed Millennium Eye crests, ornate ritual cowl, and golden ceremonial chains',
    hairstyle: 'Deep shadowed hair framed by the mystical golden Millennium crest',
    energyEffects: 'Black Illusion Ritual seal glowing with eldritch purple glyphs, absorption vortex beams pulling enemy spirits into the golden eye',
    environment: 'Dark dimensional realm beneath floating occult arches and cosmic eyes in the void',
    visualMotifs: 'Occult ritual circle, Millennium Eye, absorption barrier, eldritch majesty',
    holographicPattern: 'Ultra Rare golden Millennium eye foil, ritual blue frame shimmer',
    effectText: '[Spellcaster / Ritual / Effect]\nYou can Ritual Summon this card with "Black Illusion Ritual". Once per turn: You can target 1 monster your opponent controls; equip that target to this card (max. 1). This card’s ATK/DEF become equal to that equipped monster’s. If this card would be destroyed by battle, destroy that equipped monster instead.',
    abilities: [
      'Monster Absorption: Equip 1 opponent monster to this card, absorbing its ATK and DEF.',
      'Damage Reflection: Any battle damage taken from battles involving this card is also inflicted to the opponent.'
    ],
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'magician-of-black-chaos',
    name: 'Magician of Black Chaos',
    japaneseName: 'マジシャン・オブ・ブラックカオス',
    characterTitle: 'Supreme Master of Chaos Sorcery',
    attribute: 'DARK',
    cardType: 'Ritual',
    monsterType: 'Spellcaster',
    level: 8,
    atk: '2800',
    def: '2600',
    cardPasscode: '30208479',
    cardSetCode: 'PP01-EN001',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'deep twilight blue, mystic crimson red, black velvet, and pulsing magical cyan',
    costume: 'Monumental ritual sorcerer mantle with sharp winged shoulder spires, ruby-studded gold clasps, high crimson collar, and ornate pointed chaos helm',
    hairstyle: 'Long raven-black locks framing the mystical chaos helm',
    energyEffects: 'Cosmic chaos vortex bursting with cyan and crimson spell bolts, swirling Black Magic Ritual circle, and levitating spell orbs',
    environment: 'Sacred ritual altar amidst towering ancient Millennium obelisks beneath a swirling eclipse sky',
    visualMotifs: 'Supreme chaos magician, Black Magic Ritual circle, celestial orbs, ritual blue frame',
    holographicPattern: 'Ultra Rare rainbow cross-hatched foil, gold lettering, prismatic chaos circle shimmer',
    effectText: '[Spellcaster / Ritual]\nYou can Ritual Summon this card with "Black Magic Ritual". The ultimate master of chaos sorcery, forged through ancient forbidden rituals.',
    abilities: [
      'Black Magic Ritual: Special Summoned via the sacred Black Magic Ritual.',
      'Chaos Annihilation: Spell cards destroyed while this card is on field cannot be recovered.'
    ],
    flavorText: 'The ultimate master of chaos sorcery, forged through ancient forbidden rituals.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'blue-eyes-ultimate-dragon',
    name: 'Blue-Eyes Ultimate Dragon',
    japaneseName: '青眼の究極竜',
    characterTitle: 'The Tri-Headed Supreme Titan of Destruction',
    attribute: 'LIGHT',
    cardType: 'Fusion',
    monsterType: 'Dragon',
    level: 12,
    atk: '4500',
    def: '3800',
    cardPasscode: '23995346',
    cardSetCode: 'JMP-EN005',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette: 'gleaming platinum chrome, celestial diamond blue, icy cyan plasma, and titanium silver',
    costume: 'Colossal tri-crested platinum draconic emperor armor with massive crystalline pauldrons, glowing cyan energy core, and titanium filigree breastplate',
    hairstyle: 'Regal silver-platinum hair with iridescent cyan highlights billowing in plasma shockwaves',
    energyEffects: 'Triple Neutron Blast cyan plasma beam surging forward, crackling lightning arcs, and blinding diamond aura',
    environment: 'Apex of a shattered celestial colosseum overlooking a starry cosmic galaxy rift',
    visualMotifs: 'Triple dragon armor, ultimate fusion purple frame, supreme 4500 ATK dominance, cosmic plasma',
    holographicPattern: 'Secret Rare full-surface rainbow laser foil, gleaming embossed title, prismatic dragon scale reflections',
    effectText: '"Blue-Eyes White Dragon" + "Blue-Eyes White Dragon" + "Blue-Eyes White Dragon"\nThe ultimate dragon formed by fusing three Blue-Eyes White Dragons. Its attack power stands supreme above almost any monster in existence.',
    abilities: [
      'Neutron Blast: Inflicts devastating piercing battle damage.',
      'Supreme Dominance: Virtually invincible with 4500 base ATK.'
    ],
    flavorText: 'The ultimate dragon formed by fusing three Blue-Eyes White Dragons.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'dark-paladin',
    name: 'Dark Paladin',
    japaneseName: '超魔導剣士－ブラック・パラディン',
    characterTitle: 'The Ultimate Magical Swordsman',
    attribute: 'DARK',
    cardType: 'Fusion',
    monsterType: 'Spellcaster',
    level: 8,
    atk: '2900',
    def: '2400',
    cardPasscode: '98502113',
    cardSetCode: 'MFC-105',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette: 'arcane emerald green, burnished bronze gold, obsidian black, and pulsing cyan mana',
    costume: 'Legendary hybrid fusion battle plate merging sorcerer robes with heavy knight armor, emerald breastplate with dragon-slaying crests, ornate curved wizard helm with green visor, and majestic dual-tone war cape',
    hairstyle: 'Flowing dark hair framed by the iconic pointed emerald paladin helm',
    energyEffects: 'Colossal Buster Sword crackling with emerald magical lightning, spell-negation barrier glyphs orbiting in mid-air, and soaring cyan plasma shockwaves',
    environment: 'Ancient subterranean dragon sanctuary illuminated by emerald spell lights and glowing hieroglyphic pillars',
    visualMotifs: 'Ultimate fusion swordsman, emerald dragon-slaying broadsword, fusion purple frame, supreme magical swordsmanship',
    holographicPattern: 'Secret Rare diagonal laser foil, glowing emerald runes, golden embossed title',
    effectText: '"Dark Magician" + "Buster Blader"\nMust be Fusion Summoned. When a Spell Card is activated (Quick Effect): You can discard 1 card; negate the activation, and if you do, destroy it. This card gains 500 ATK for each Dragon monster on the field and in the GY.',
    abilities: [
      'Spell Negation: Discard 1 card; negate and destroy any Spell Card activation.',
      'Dragon Bane Mastery: Gains 500 ATK for each Dragon monster on the field or in either GY.'
    ],
    flavorText: 'A supreme magical swordsman forged through the fusion of Dark Magician and Buster Blader.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'gaia-the-fierce-knight',
    name: 'Gaia The Fierce Knight',
    japaneseName: '暗黒騎士ガイア',
    characterTitle: 'Swift Charging Knight of the Steppes',
    attribute: 'EARTH',
    cardType: 'Normal',
    monsterType: 'Warrior',
    level: 7,
    atk: '2300',
    def: '2100',
    cardPasscode: '06368038',
    cardSetCode: 'LOB-006',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'royal purple armor, polished silver steel, crimson cape, and galloping dust gold',
    costume: 'Master jouster heavy plate armor with royal purple breastplate, golden trim, pointed knight visor, twin spiral charging lances, and flowing crimson banner mantle',
    hairstyle: 'Battle-ready dark hair framed under the imposing winged cavalry helm',
    energyEffects: 'High-speed kinetic sonic boom trails, twin lance spiral shockwaves, and golden charging sparks',
    environment: 'Sunlit grassy plains of the dueling realm with mountains in the background beneath an azure sky',
    visualMotifs: 'Charging knight, twin jousting lances, royal purple armor, legendary early era nostalgia',
    holographicPattern: 'Ultra Rare gold lettering, prismatic lance reflection, classic TCG luster',
    effectText: 'A knight whose horse travels faster than the wind. His battle-charge confirms his reputation for lethal speed and piercing force.',
    abilities: [
      'Spiral Shaver: Deals piercing battle damage when charging defense position monsters.',
      'Swift Gallop: Can be normal summoned without tribute if it is the only card in your hand.'
    ],
    flavorText: 'A knight whose horse travels faster than the wind. His battle-charge confirms his reputation.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'silent-magician',
    name: 'Silent Magician',
    japaneseName: '沈黙の魔術師－サイレント・マジシャン',
    characterTitle: 'Purity of Silent Arcane Mastery',
    attribute: 'LIGHT',
    cardType: 'Effect',
    monsterType: 'Spellcaster',
    level: 4,
    atk: '1000',
    def: '1000',
    cardPasscode: '41858821',
    cardSetCode: 'DPRP-EN002',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'pristine ivory white, delicate sky blue, soft gold trim, and sparkling celestial light',
    costume: 'Graceful high-collared white sorceress dress with sky-blue gemstone brooches, flowing white robes, pointed white wizard hat with gold accents, and elegant white wand',
    hairstyle: 'Silky long platinum-white hair cascading past the shoulders with soft bangs framing a serene realistic human face',
    energyEffects: 'Silent Spell rings floating outward in concentric circles, starlight sparkles, and radiant ivory magical aura',
    environment: 'Peaceful celestial sanctuary amidst floating marble arches beneath an aurora-lit dawn sky',
    visualMotifs: 'Serene white sorceress, silence spell ward, gentle celestial power, elegant magical robes',
    holographicPattern: 'Ultra Rare golden title, pearlescent shimmer across white robes, starlight glints',
    effectText: '[Spellcaster / Effect]\nCannot be Normal Summoned/Set. Must be Special Summoned by Tributing 1 Spellcaster monster. Gains 500 ATK for each card in your hand. Once per turn, when a Spell Card is activated (Quick Effect): You can negate the activation. If this card is destroyed: You can Special Summon 1 "Silent Magician" monster from your hand or Deck.',
    abilities: [
      'Silent Knowledge: Gains 500 ATK for each card in your hand.',
      'Silent Ward: Once per turn, negate the activation of an opponent’s Spell Card.',
      'Arcane Succession: When destroyed, Special Summon "Silent Magician LV8" from your hand or Deck.'
    ],
    flavorText: 'A serene sorceress who commands boundless magical power in tranquil silence.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'red-eyes-darkness-metal-dragon',
    name: 'Red-Eyes Darkness Metal Dragon',
    japaneseName: 'レッドアイズ・ダークネスメタルドラゴン',
    characterTitle: 'Supreme Sovereign of the Dragon Horde',
    attribute: 'DARK',
    cardType: 'Effect',
    monsterType: 'Dragon',
    level: 10,
    atk: '2800',
    def: '2400',
    cardPasscode: '88264978',
    cardSetCode: 'JUMP-EN030',
    edition: '1st Edition',
    rarity: 'Ultra Rare',
    palette: 'heavy titanium black, molten crimson magma, chrome silver edges, and fiery ruby eye glow',
    costume: 'Heavy mechanized obsidian dragon armor reinforced with glowing red magma conduits, massive spiked mechanical dragon wings, and scorched steel breastplate',
    hairstyle: 'Dark jagged hair with glowing crimson ember highlights billowing in heat thermals',
    energyEffects: 'Darkness Metal flare erupting with swirling black-red plasma, summoning vortex opening to call dragons, and crackling crimson lightning',
    environment: 'Subterranean molten dragon forge with rivers of liquid metal beneath massive jagged basalt arches',
    visualMotifs: 'Titanium dragon armor, infinite dragon resurrection, dark mechanical majesty, molten red aura',
    holographicPattern: 'Ultra Rare golden foil title, metallic chrome armor sheen, intense ruby eye laser diffraction',
    effectText: '[Dragon / Effect]\nYou can Special Summon this card (from your hand) by banishing 1 face-up Dragon monster you control. Once per turn: You can Special Summon 1 Dragon monster from your hand or GY, except "Red-Eyes Darkness Metal Dragon".',
    abilities: [
      'Dragon Rebirth Call: Once per turn, Special Summon 1 Dragon monster from your hand or GY.',
      'Metal Armor Banishment: Special Summon directly from hand by banishing 1 face-up Dragon monster.'
    ],
    flavorText: 'An unstoppable dragon clad in dark impenetrable metal, commanding all dragons.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  },
  {
    id: 'ash-blossom',
    name: 'Ash Blossom & Joyous Spring',
    japaneseName: '灰流うらら',
    characterTitle: 'Playful Yokai Spirit of Spring',
    attribute: 'FIRE',
    cardType: 'Effect',
    monsterType: 'Zombie',
    level: 3,
    atk: '0',
    def: '1800',
    cardPasscode: '14558127',
    cardSetCode: 'MACR-EN036',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette: 'soft sakura pink, warm peach, pure snow white, flame orange, and springtime green',
    costume: 'Traditional Japanese shrine maiden haori with blooming cherry blossom embroidery, crimson hakama trims, golden bell tassels, and delicate fox-spirit accents',
    hairstyle: 'Silky snow-white bob cut with soft sakura blossom ribbons and playful floating spirit wisps',
    energyEffects: 'Whirlwind of swirling pink cherry blossom petals, playful dancing fox-fire embers, and shimmering negation ward barrier',
    environment: 'Ethereal Japanese shrine garden with ancient blooming sakura trees under a soft misty spring dusk',
    visualMotifs: 'Sakura blossoms, playful spirit fox-fire, iconic duel negation, spring aesthetic',
    holographicPattern: 'Secret Rare diagonal rainbow sparkle, glistening cherry blossom petals, embossed golden card name',
    effectText: '[Zombie / Tuner / Effect]\nWhen a card or effect is activated that includes any of these effects (Quick Effect): You can discard this card; negate that effect:\n● Add a card from the Deck to the hand.\n● Special Summon from the Deck.\n● Send a card from the Deck to the GY.',
    abilities: [
      'Joyous Negation: Discard from hand to negate any search, deck summon, or send to GY effect.',
      'Spring Blossom Ward: Protects your field from enemy search triggers during your turn.'
    ],
    flavorText: 'A playful yokai spirit whose gentle cherry blossom winds halt the grandest of dueling schemes.',
    illustrator: 'Kazuki Takahashi / Studio Dice'
  }
];

export function createDefaultYugiohCardForName(name: string): YugiohCardDna {
  const cleanName = name.trim();
  const lower = cleanName.toLowerCase();

  // Look for match in existing presets
  const match = YUGIOH_CARD_PRESETS.find(
    (p) => p.name.toLowerCase() === lower || p.id === lower || p.id.replace(/-/g, ' ') === lower
  );
  if (match) return match;

  // Derive realistic TCG stats based on keywords
  let attribute: YugiohAttribute = 'DARK';
  let monsterType: YugiohMonsterType = 'Warrior';
  let cardType: YugiohCardType = 'Effect';
  let level = 7;
  let atk = '2500';
  let def = '2000';
  let palette = 'deep obsidian black, metallic silver, royal gold, and arcane energy glows';
  let costume = `High-end fantasy TCG armor and tailored battle coat custom designed with iconic ${cleanName} motifs, metallic trims, and character emblems`;
  let hairstyle = `Modern anime-styled textured hair with highlights echoing ${cleanName}'s signature theme`;
  let energyEffects = `Swirling magical arcane aura, particle shockwaves, and glowing runic symbols`;
  let environment = `Epic ancient battle arena with atmospheric lighting, dramatic skies, and floating mystical particles`;
  let visualMotifs = `${cleanName} inspired fantasy motifs, dramatic card game aesthetic, and glowing runes`;

  if (/blue|white|light|shine|sun|angel|holy|radiant|paladin/i.test(cleanName)) {
    attribute = 'LIGHT';
    monsterType = /dragon/i.test(cleanName) ? 'Dragon' : /mage|wizard|spell/i.test(cleanName) ? 'Spellcaster' : 'Warrior';
    palette = 'white, silver, pale blue, cyan, and glowing platinum gold';
    costume = `Pristine white and silver celestial armor with crystalline pale-blue pauldrons and platinum crests`;
    energyEffects = `Blinding beams of celestial light, prismatic stardust sparks, and radiant aura waves`;
    environment = `Floating celestial sanctuary above white clouds illuminated by golden sunlight`;
    atk = '2800';
    def = '2400';
    level = 8;
  } else if (/red|fire|flame|burn|blaze|pyro|inferno/i.test(cleanName)) {
    attribute = 'FIRE';
    monsterType = /dragon/i.test(cleanName) ? 'Dragon' : /fiend|demon/i.test(cleanName) ? 'Fiend' : 'Pyro';
    palette = 'crimson red, blazing orange, molten gold, obsidian black, and fiery embers';
    costume = `Flame-forged dark steel armor with glowing volcanic rune inlays and ember-tipped dragon pauldrons`;
    energyEffects = `Swirling infernal flames, erupting volcanic sparks, and intense heat distortion ripples`;
    environment = `Volcanic caldera surrounded by flowing lava and smoke plumes under a crimson sky`;
    atk = '2600';
    def = '2000';
    level = 7;
  } else if (/water|ice|frost|aqua|sea|ocean|blizzard/i.test(cleanName)) {
    attribute = 'WATER';
    monsterType = /dragon/i.test(cleanName) ? 'Sea Serpent' : 'Aqua';
    palette = 'deep ocean navy, glacier cyan, crystalline ice white, and polished silver';
    costume = `Naval aquatic sovereign mantle with frosted ice-crystal pauldrons and flowing tidal trims`;
    energyEffects = `High-pressure swirling water vortex, levitating frost crystals, and oceanic spray`;
    environment = `Raging ocean tempest crashing against rocky sea stacks beneath stormy skies`;
    atk = '2400';
    def = '2200';
    level = 7;
  } else if (/earth|rock|stone|golem|ground|clay|gaia/i.test(cleanName)) {
    attribute = 'EARTH';
    monsterType = /warrior/i.test(cleanName) ? 'Warrior' : 'Rock';
    palette = 'ancient granite slate, weathered gold, moss green, and polished bronze';
    costume = `Heavy tectonic plate armor with jagged stone pauldrons and ancient earthen rune carvings`;
    energyEffects = `Shattered stone debris levitating, seismic shockwave cracks, and golden dust particles`;
    environment = `Grand mountain canyon filled with ancient standing monoliths and dust storms`;
    atk = '2500';
    def = '2500';
    level = 7;
  } else if (/wind|gust|air|feather|harpie|storm|aero/i.test(cleanName)) {
    attribute = 'WIND';
    monsterType = /bird|wing/i.test(cleanName) ? 'Winged Beast' : 'Dragon';
    palette = 'emerald green, sky turquoise, silver white, and feather lavender';
    costume = `Aerodynamic wind-dancer mantle with plumage wings, feather-shaped pauldrons, and silver clasps`;
    energyEffects = `Swirling razor wind cyclones, sparkling aerial currents, and floating green leaves`;
    environment = `Mountain sanctuary high above swirling misty valley winds and azure skies`;
    atk = '2400';
    def = '2000';
    level = 7;
  } else if (/god|divine|pharaoh|ra|slifer|obelisk/i.test(cleanName)) {
    attribute = 'DIVINE';
    monsterType = 'Divine-Beast';
    cardType = 'Egyptian God';
    palette = 'sacred gold, lapis lazuli blue, ruby red, and blinding celestial aura';
    costume = `Pharaonic divine deity plate with golden wings, Egyptian ankh pectorals, and sacred scarabs`;
    energyEffects = `Towering columns of divine lightning, burning Egyptian hieroglyphs, and reality-warping aura`;
    environment = `The Great Pyramids beneath a supernatural eclipse with lightning tearing through clouds`;
    atk = '4000';
    def = '4000';
    level = 10;
  }

  const randomPasscode = Math.floor(10000000 + Math.random() * 90000000).toString();

  return {
    id: cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: cleanName,
    characterTitle: `The Legendary ${cleanName}`,
    attribute,
    cardType,
    monsterType,
    level,
    atk,
    def,
    cardPasscode: randomPasscode,
    cardSetCode: 'TCG-EN001',
    edition: '1st Edition',
    rarity: 'Secret Rare',
    palette,
    costume,
    hairstyle,
    energyEffects,
    environment,
    visualMotifs,
    holographicPattern: 'Secret Rare diagonal laser diffraction foil, rainbow reflections across armor and weapons, embossed card borders',
    effectText: `[${monsterType} / ${cardType}]\nWhen this card is Normal or Special Summoned: You can activate 1 of its signature abilities. This card gains 300 ATK for each card your opponent controls.`,
    abilities: [
      `${cleanName} Surge: When summoned, target 1 card on the field; destroy that target.`,
      `Domain of ${cleanName}: Once per turn, you can negate the activation of an opponent's card effect.`,
      `Final Strike: Can make a second attack during each Battle Phase if you control no other monsters.`
    ],
    flavorText: `A mythical entity commanding immense power, feared across the dueling realm.`,
    illustrator: 'Studio Dice / Kazuki Takahashi'
  };
}

// Backward compatibility alias for any remaining references to pokemon presets
export const POKEMON_PRESETS = YUGIOH_CARD_PRESETS as any;
export const createDefaultDnaForName = createDefaultYugiohCardForName as any;
