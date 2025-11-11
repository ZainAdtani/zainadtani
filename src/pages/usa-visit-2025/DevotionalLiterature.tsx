import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Devotional Literature
 * Updates requested:
 * 1) Remove "Only Transliteration and Translation" notes.
 * 2) Remove "Add personal notes" accordion.
 * 3) Expand Zikr Tasbihs to 13 items, show numbered list with bold invocations and plain definitions.
 * 4) Add Qasidas with Selected Verses and Gist from screenshots.
 */

type ItemBase = {
  id: string;
  title: string;
};

type DevotionalItem = ItemBase & {
  transliteration?: string;
  translation?: string | string[];
  selectedVerses?: string; // for Qasidas
  gist?: string; // for Qasidas
};

type Group = {
  key: string;
  heading: string;
  ids: string[];
};

const QURAN_ITEMS: DevotionalItem[] = [
  {
    id: "an-nur-36-37",
    title: "Surat an-Nur (The Light) • [Q 24: 36–37]",
    transliteration: [
      "a'udhu bi-llāhi mina'sh-shayṭāni'r-rajīm",
      "bismi'-llāhi'r-raḥmāni'r-raḥīm",
      "Fī buyūtin adhina'-llāhu an turfaʿa wa yudhkara fīhā' smuhu,",
      "yusabbiḥu lahu fīhā bil-ghudūwi wal-āṣāl. (36)",
      "Rijālun lā tulhīhim tijāratun walā bayʿun ʿan dhikri'-llāhi",
      "wa iqāmi'ṣ-ṣalāti wa ītāʾiz-zakāh. (37)",
      "ṣadaqa'-llāhu'l-ʿaliyyu'l-ʿaẓīm.",
    ].join("\n"),
    translation:
      "In the name of Allah, the Compassionate, the Merciful. [Allah’s Light is lit] in houses which Allah has allowed to be exalted, and that His Name be remembered in them. He is glorified in them in the mornings and in the evenings by men whom neither trade nor sale diverts from the remembrance of God, and from performing the prayer, and the giving of alms.",
  },
  {
    id: "ayat-an-nur-35",
    title: "Ayat an-Nur (The Light) • [Q 24:35]",
    transliteration: [
      "a'ūdhu bi'-llāhi mina'sh-shayṭāni'r-rajīm",
      "Bismi'-llāhi'r-Raḥmāni'r-Raḥīm",
      "Allāhu nūru's-samāwāti wal-arḍ.",
      "Mathalu nūrihi ka-mishkātin fīhā miṣbāḥ,",
      "al-miṣbāḥu fī zujājah, az-zujājatu ka-annahā kawkabun durrīyun,",
      "yūqadu min shajaratin mubārakatin zaytūnatin lā sharqiyyatin wa lā gharbiyyah.",
      "Yakādu zaytuhā yuḍīʾu wa law lam tamsash-hu nār.",
      "Nūrun ʿalā nūr, yahdī'-llāhu li-nūrihi man yashāʾ,",
      "wa yaḍribullāhu'l-amthāla li'n-nās, wallāhu bi-kulli shayʾin ʿalīm. (35)",
      "Ṣadaqa'-llāhu'l-ʿaliyyu'l-ʿaẓīm.",
    ].join("\n"),
    translation:
      "In the name of Allah, the Compassionate, the Merciful. Allah is the Light of the heavens and the earth. The parable of His Light is as a niche in which is a lamp. The lamp is in a glass. The glass is like a shimmering star, lit from a blessed tree, an olive tree that is neither of the east nor of the west. Its oil is almost aglow, though untouched by fire. Light upon Light. Allah guides to His Light whom He wills. And Allah sets forth parables for humankind. Allah has knowledge of all things.",
  },
  {
    id: "al-kawthar",
    title: "Surat al-Kawthar (Abundance) • [Q 108: 1–3]",
    transliteration: [
      "a'ūdhu bi'-llāhi mina'sh-shayṭāni'r-rajīm",
      "bismi'-llāhi'r-raḥmāni'r-raḥīm",
      "Innā aʿṭaynāka'l-kawthar. (1)",
      "Faṣalli li-rabbika wanḥar. (2)",
      "Inna shāniʾaka huwa'l-abtar. (3)",
      "ṣadaqa'-llāhu'l-ʿaliyyu'l-ʿaẓīm.",
    ].join("\n"),
    translation:
      "In the name of Allah, the Compassionate, the Merciful. Indeed, We have given you Abundance. So pray to your Lord and offer sacrifice. Indeed, the one who provokes you, it is they who shall be without posterity.",
  },
  {
    id: "an-nasr",
    title: "Surat an-Nasr (Succour) • [Q 110: 1–3]",
    transliteration: [
      "a'ūdhu bi'-llāhi mina'sh-shayṭāni'r-rajīm",
      "bismi'-llāhi'r-raḥmāni'r-raḥīm",
      "Idhā jāʾa naṣru'-llāhi wal-fatḥ. (1)",
      "Wa raʾayta'n-nāsa yadkhulūna fī dīni'-llāhi afwājā. (2)",
      "Fa-sabbiḥ bi-ḥamdi rabbika was-taghfir-hu, innahu kāna tawwābā. (3)",
      "ṣadaqa'-llāhu'l-ʿaliyyu'l-ʿaẓīm.",
    ].join("\n"),
    translation:
      "In the name of Allah, the Compassionate, the Merciful. When there comes the support of Allah and the victory, and you see people entering Allah’s religion in large groups, glorify with praise of your Lord and seek His forgiveness, for He is Ever Forgiving.",
  },
  {
    id: "al-rum",
    title: "Surat al-Rum (The Byzantines) • [Q 30:22]",
    transliteration: [
      "a'ūdhu bi'-llāhi mina'sh-shayṭāni'r-rajīm",
      "bismi'-llāhi'r-raḥmāni'r-rajīm",
      "Wa min āyātihi khalqu's-samāwāti wal-arḍi,",
      "wa'khtilāfu alsinatikum wa alwānikum,",
      "inna fī dhālika la-āyātin li'l-ʿālimīn. (22)",
      "ṣadaqa'-llāhu'l-ʿaliyyu'l-ʿaẓīm.",
    ].join("\n"),
    translation:
      "In the name of Allah, the Compassionate, the Merciful. And among His signs are the creation of the heavens and the earth, and the diversity of your languages and your colors. In this are signs for those who know.",
  },
];

const ZIKR_LIST = [
  {
    term: "Yā āl-e-nabī, aulād-e ʿAli, yā mushkil kusha, yā ḥāzar Imām",
    meaning: "O family of the Prophet, O descendants of Ali, O reliever of difficulties, O present Imam",
  },
  {
    term: "Allāhumma ṣalli ʿalā Muḥammad wa āli Muḥammad",
    meaning: "O Allah, bless Muhammad and the family of Muhammad",
  },
  { term: "Allāhu akbar", meaning: "Allah is Greater" },
  { term: "Subḥānallāh", meaning: "Glory be to Allah" },
  { term: "Alḥamdulillāh", meaning: "All praises are due to Allah" },
  { term: "Shukran lillāh wal-ḥamdulillāh", meaning: "All thanks are due to Allah and all praises are due to Allah" },
  {
    term: "Astaghfirullāha rabbī wa atūbu ilayh",
    meaning: "I seek forgiveness from Allah, my Lord, and I return to Him in repentance",
  },
  { term: "Yā Raḥmān, Yā Raḥīm", meaning: "O Compassionate, O Merciful" },
  { term: "Yā Allāh", meaning: "O Allah" },
  { term: "Yā Wahhāb", meaning: "O Bestower" },
  { term: "Yā ʿAlī", meaning: "O Most High" },
  { term: "Allāhu’ṣ-Ṣamad", meaning: "Allah is Eternally Supreme" },
  {
    term: "Yā ʿAlī agisānī, Yā ʿAlī adrikānī, har balā tū dūr kar mushkil-kushā Mawlā ʿAlī",
    meaning:
      "O Ali, reply to my rescue, O Ali, extend to me Thy help. O our Protector Ali, remover of all difficulties, remove all calamities",
  },
];

const ZIKR_ITEMS: DevotionalItem[] = [
  {
    id: "al-ikhlas",
    title: "Surat al-Ikhlas (True Devotion) • [Q 112: 1–4]",
    transliteration: [
      "bismi'-llāhi'r-raḥmāni'r-raḥīm",
      "Qul huwa'-llāhu aḥad.",
      "Allāhu'ṣ-ṣamad.",
      "Lam yalid wa lam yūlad.",
      "Wa lam yakun lahu kufuwan aḥad.",
    ].join("\n"),
    translation:
      "In the name of Allah, the Compassionate, the Merciful. Say, He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is begotten. And none is equal to Him.",
  },
  {
    id: "zikr-list",
    title: "Zikr Tasbihs with Translation",
    translation: ZIKR_LIST.map((x, i) => `${i + 1}. **${x.term}** — ${x.meaning}`),
  },
];

const QASIDA_ITEMS: DevotionalItem[] = [
  {
    id: "khudavanda-tu-sultan-e-karimi",
    title: "Khudavanda Tu Sultan-e Karimi",
    selectedVerses: [
      "Khudaawandaa tu Sultan-e Karimi Tu",
      "Bismillahir-Rahmaanir-Rahimi",
      "Bi bakhshaa bar man-e zaar-u muqassir",
      "Ghafuraa raahimaa ya rabb ba aakhir",
      "Agar rahmi kuni bar man rahimi",
      "Agar bakhshi gunaah-e man karimi",
      "Ba aakhir jaan-e saiiyidanaa khudaawand",
      "Bakhaak-e pa’i mardaanat bepaiwand",
    ].join("\n"),
    gist: "This qasida, attributed to Sayyidana Hasan-i-Sabbah, is a poetic plea for mercy and forgiveness. The poet calls upon the compassionate and forgiving Lord to pardon his shortcomings and, in humility, declares himself not even worth the dust at the feet of the Imam’s devotees.",
  },
  {
    id: "sheru-wali-e-khudaa",
    title: "Sher-u Wali-e Khudaa",
    selectedVerses: [
      "Sher-u wali-e khudaa shaah salaamun alaik",
      "Madan-e jaud-u sakhaa shaah salaamun alaik",
      "Hamdam-e khairul basher bab-e shabbir-u shabbar",
      "Raaj’i-e shams-u qamar shaah salaamun alaik",
      "Khisrau-e lashkar shikan baab Husain-u Hasan",
      "Nur-e khudaa Abul Hasan shaah salaamun alaik",
    ].join("\n"),
    gist: "A praise of the Lord’s attributes and a prayer for peace. It invokes the friend and lion of Allah, the source of generosity and benevolence, companion of the Prophet, father of Husayn and Hasan, the one whose light rises like the sun and the moon, king of the exoteric path and Pir of the esoteric path, and the truth itself.",
  },
  {
    id: "bahaar-e-dil-e-dustaar-e-ali",
    title: "Bahaar-e Dil-e Dustaar-e Ali",
    selectedVerses: [
      "Bahaar-e dil-e dustaar-e Ali",
      "Hamisha pur ast az nigaar-e Ali",
      "Dilam zar nigaar ast-u ilm isparam",
      "Chunin wajib aayad bahaar-e Ali",
      "Ali az tabaar-e rasulat-u nist",
      "Magar shi’at ha tabaar-e Ali",
    ].join("\n"),
    gist: "Attributed to Sayyidna Nasir-i Khusraw. With a heart adorned by Ali’s love and knowledge, filled with Ali’s fragrance, the spring of Ali arrives. Even in a hundred years of praise one could not fully express even one of the thousand qualities of Ali.",
  },
  {
    id: "guzinam-quran-ast",
    title: "Guzinam Quran Ast",
    selectedVerses: [
      "Guzinam quraan ast-u din-e Muhammad",
      "Hamin bud azira guzin-e Muhammad",
      "Yaqinam ke gar har du aanraa biwarzam",
      "Yaqinam shavad chun yaqin-e Muhammad",
      "Bafazl-e khudaaist umidam ke baasham",
      "Yaki ummat-e kamtarin-e Muhammad",
    ].join("\n"),
    gist: "Nasir-i Khusraw refers to the Imam of the Time as the center of devotion and recognition and affirms that the Qur’an and the Prophet’s teachings confirm this path. The Imam is the guide and interpreter of inner and outer wisdom. With the Imam’s guidance, the Qur’an becomes a living guide for the soul.",
  },
  {
    id: "ali-guyam-ali-juyum",
    title: "Ali Guyam Ali Juyum",
    selectedVerses: [
      "Ba rūz-u shab man-i shayda ʿAli gūyam ʿAli jūyam",
      "Ba bāgh-u gulshan-u ṣahrā, ʿAli gūyam ʿAli jūyam",
      "ʿAli rūḥ-u ravān-i man, ʿAli ārām-i jān-i man",
      "ʿAli zikr-i zabān-i man, ʿAli gūyam ʿAli jūyam",
      "ʿAli sulṭān-i mulk-i jān, ʿAli shāhanshāh-i khūbān",
      "ʿAli āyinah-yi yazdān, ʿAli gūyam ʿAli jūyam",
    ].join("\n"),
    gist: "An intimate song of the murid’s love for the Imam. Ali is the peace of the heart and the name ever on the tongue. The qasida submits to the Light of Imamat, seeking the Imam’s grace and mercy for spiritual happiness.",
  },
  {
    id: "ya-imami",
    title: "Ya Imami",
    selectedVerses: [
      "Ya Imami ya Imami, anta dhukhari wamurami",
      "Anta nurun fi fuadi, anta nurun fi fuadi",
      "Anta ‘ushqi wa hiyami, anta ushqi wa hiyami",
      "Kullu man walal-imama, nala majadan wa salama",
      "Wartaqa lil hubbi hama",
      "Samiqan alil maqami, samiqan alil maqami",
      "Ya wasiyal-anbiya’i, ya salilal-awsiyai",
      "Laka hubbi wawalai, laka hubbi wawalai",
      "Wasalati wadu’ai, wasalati wadu’ai",
      "Kullu man walal-imama, nala majadan wa salama",
      "Wartaqa lil hubbi hama",
      "Fi majalatil-wafai, fi majalatil-wafai",
    ].join("\n"),
    gist: "Recognizes the Imam as treasure, goal, and light of the murid’s heart. Those who follow the Imam gain spiritual bliss and elevation. The Imam shows compassion and generosity to the murids who dedicate to him their love, prayers, and very being.",
  },
  {
    id: "saaqi-yi-baa-wafaa",
    title: "Saaqi-yi Baa Wafaa",
    selectedVerses: [
      "Saaqi-yi baa wafaa manam, dam hama dam Ali Ali",
      "Sufi-yi baa safaa manam, dam hama dam Ali Ali",
      "Dam hama dam Ali Ali, Dam hama dam Ali Ali",
      "Dam hama dam Ali Ali, Dam hama dam Ali Ali",
      "Aashiq-i Murtaza manam, dam hama dam Ali Ali",
      "Mutribi khush nawaa manam, dam hama dam Ali Ali",
      "Aaya-yi innamaa barat, taaj-i laa fataa sarat",
      "Shams ghulaam-i qambarat, dam hama dam Ali Ali",
      "Dam hama dam Ali Ali, Dam hama dam Ali Ali",
    ].join("\n"),
    gist: "Expresses immense love and devotion to Imam Ali. The poet describes loyal mystic love, praises Ali’s status with traits of prophets, affirms the Imam’s source with the Prophet and Imam Ali, and declares himself a servant of Qambar.",
  },
];

const ITEMS: DevotionalItem[] = [...QURAN_ITEMS, ...ZIKR_ITEMS, ...QASIDA_ITEMS];

const GROUPS: Group[] = [
  { key: "QURAN", heading: "QURANIC TEXT, TRANSLITERATION, AND TRANSLATION", ids: QURAN_ITEMS.map((i) => i.id) },
  { key: "ZIKR", heading: "ZIKR TASBIHS", ids: ZIKR_ITEMS.map((i) => i.id) },
  { key: "QASIDA", heading: "QASIDAS WITH GISTS", ids: QASIDA_ITEMS.map((i) => i.id) },
];

export default function DevotionalLiterature() {
  const [activeId, setActiveId] = useState<string>(GROUPS[0].ids[0]);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY + 120;
      let current = activeId;
      for (const it of ITEMS) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        if (el.offsetTop <= top) current = it.id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toc = useMemo(
    () =>
      GROUPS.flatMap((g) => [
        { id: g.key, title: g.heading, header: true },
        ...g.ids.map((id) => {
          const it = ITEMS.find((x) => x.id === id)!;
          return { id: it.id, title: it.title, header: false };
        }),
      ]),
    [],
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FFF9EA]">
      <Helmet>
        <title>Devotional Literature | Zain Adtani</title>
        <meta name="description" content="Qur'anic selections, Zikr Tasbihs, and Qasidas with gists." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <Button variant="ghost" asChild className="mb-4">
          <a href="/usa-visit-2025">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to USA Visit 2025
          </a>
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Devotional Literature</h1>
        <p className="text-muted-foreground mt-3">Select texts for reflection and contemplation.</p>

        {/* TOC */}
        <Card className="sticky top-4 mt-8 mb-10 p-4 shadow-sm border bg-white/90 backdrop-blur">
          <h2 className="font-semibold text-sm uppercase tracking-wide">Table of Contents</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {toc.map((row) =>
              row.header ? (
                <div
                  key={row.id}
                  className="col-span-1 sm:col-span-2 px-3 py-2 text-xs font-semibold uppercase text-primary/90 bg-primary/5 rounded-md"
                >
                  {row.title}
                </div>
              ) : (
                <button
                  key={row.id}
                  onClick={() => scrollTo(row.id)}
                  className={`w-full text-left px-4 py-2 rounded-full text-sm transition border ${
                    activeId === row.id
                      ? "bg-primary/10 border-primary/40 text-primary font-medium"
                      : "bg-white border-muted hover:bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {row.title}
                </button>
              ),
            )}
          </div>
        </Card>

        {/* CONTENT */}
        <div className="space-y-12">
          {ITEMS.map((it, idx) => (
            <section
              id={it.id}
              key={it.id}
              className="scroll-mt-28 animate-in fade-in duration-300"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <Card className="p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold">{it.title}</h3>

                {/* Qur'an or Ikhlas sections */}
                {it.transliteration && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-muted-foreground">Transliteration</h4>
                    <pre className="mt-2 whitespace-pre-wrap text-[0.98rem] leading-relaxed bg-accent/20 p-4 rounded-lg">
                      {it.transliteration}
                    </pre>
                  </div>
                )}

                {it.translation && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-muted-foreground">English Translation</h4>
                    {Array.isArray(it.translation) ? (
                      <ul className="mt-2 space-y-2 bg-accent/20 p-4 rounded-lg">
                        {it.translation.map((line, i) => (
                          <li key={i} className="leading-relaxed">
                            {/* Render bold invocation if present between ** */}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 leading-relaxed bg-accent/20 p-4 rounded-lg">{it.translation}</p>
                    )}
                  </div>
                )}

                {/* Qasida sections */}
                {it.selectedVerses && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-muted-foreground">Selected Verses</h4>
                    <pre className="mt-2 whitespace-pre-wrap text-[0.98rem] leading-relaxed bg-accent/20 p-4 rounded-lg">
                      {it.selectedVerses}
                    </pre>
                  </div>
                )}
                {it.gist && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-muted-foreground">Gist of Qasida</h4>
                    <p className="mt-2 leading-relaxed bg-accent/20 p-4 rounded-lg">{it.gist}</p>
                  </div>
                )}
              </Card>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
