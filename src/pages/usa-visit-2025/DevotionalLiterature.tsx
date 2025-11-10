import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/**
 * Devotional Literature
 * Requirements from user:
 * - Keep a clean Table of Contents at top.
 * - First TOC item is the chapter header, then each item below it.
 * - Show ONLY Transliteration and English Translation. No Arabic block.
 * - Include Qur'anic items:
 *   1) Surat an-Nur [24:36-37]
 *   2) Ayat an-Nur [24:35]
 *   3) Surat al-Kawthar
 *   4) Surat an-Nasr
 *   5) Surat al-Rum
 * - Include Zikr Tasbihs up to the first two:
 *   a) Surat al-Ikhlas
 *   b) Zikr Tasbihs with Translation (list)
 */

type DevotionalItem = {
  id: string;
  group: "QURAN" | "ZIKR";
  title: string;
  subtitle?: string;
  transliteration: string;
  translation: string | string[]; // string for paragraph, string[] for bullet list
};

const ITEMS: DevotionalItem[] = [
  // QUR'ANIC TEXTS
  {
    id: "an-nur-36-37",
    group: "QURAN",
    title: "Surat an-Nur (The Light) • [Q 24: 36–37]",
    subtitle: "Only Transliteration and Translation",
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
    group: "QURAN",
    title: "Ayat an-Nur (The Light) • [Q 24:35]",
    subtitle: "Only Transliteration and Translation",
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
    group: "QURAN",
    title: "Surat al-Kawthar (Abundance) • [Q 108: 1–3]",
    subtitle: "Only Transliteration and Translation",
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
    group: "QURAN",
    title: "Surat an-Nasr (Succour) • [Q 110: 1–3]",
    subtitle: "Only Transliteration and Translation",
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
    group: "QURAN",
    title: "Surat al-Rum (The Byzantines) • [Q 30:22]",
    subtitle: "Only Transliteration and Translation",
    transliteration: [
      "a'ūdhu bi'-llāhi mina'sh-shayṭāni'r-rajīm",
      "bismi'-llāhi'r-raḥmāni'r-raḥīm",
      "Wa min āyātihi khalqu's-samāwāti wal-arḍi,",
      "wa'khtilāfu alsinatikum wa alwānikum,",
      "inna fī dhālika la-āyātin li'l-ʿālimīn. (22)",
      "ṣadaqa'-llāhu'l-ʿaliyyu'l-ʿaẓīm.",
    ].join("\n"),
    translation:
      "In the name of Allah, the Compassionate, the Merciful. And among His signs are the creation of the heavens and the earth, and the diversity of your languages and your colors. In this are signs for those who know. Note. Some printings include the verse about spouses and mercy at 30:21 on the facing page.",
  },

  // ZIKR TASBIHS
  {
    id: "al-ikhlas",
    group: "ZIKR",
    title: "Surat al-Ikhlas (True Devotion) • [Q 112: 1–4]",
    subtitle: "Only Transliteration and Translation",
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
    group: "ZIKR",
    title: "Zikr Tasbihs with Translation",
    transliteration: "",
    translation: [
      "Subhanallah. Glory be to Allah.",
      "Alhamdulillah. All praise is due to Allah.",
      "Allahu Akbar. Allah is Greater.",
      "Astaghfirullah Rabbi wa atubu ilayh. I seek forgiveness from Allah, my Lord, and I turn to Him in repentance.",
      "Allahumma salli ʿalā Muhammad wa āli Muhammad. O Allah, bless Muhammad and the family of Muhammad.",
      "Ya Rahman, Ya Rahim. O Compassionate, O Merciful.",
      "Ya Wahhab. O Bestower.",
      "Ya Ali madad. O Ali, help.",
    ],
  },
];

const GROUPS = [
  {
    key: "QURAN",
    heading: "QURANIC TEXT, TRANSLITERATION, AND TRANSLATION",
    ids: ["an-nur-36-37", "ayat-an-nur-35", "al-kawthar", "an-nasr", "al-rum"],
  },
  {
    key: "ZIKR",
    heading: "ZIKR TASBIHS",
    ids: ["al-ikhlas", "zikr-list"],
  },
] as const;

export default function DevotionalLiterature() {
  const [activeId, setActiveId] = useState<string>(GROUPS[0].ids[0]);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY + 120;
      // find the last section that has offsetTop <= top
      let current = activeId;
      for (const item of ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.offsetTop <= top) current = item.id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const flatTOC = useMemo(
    () =>
      GROUPS.flatMap((g) => [
        { id: g.key, title: g.heading, isHeader: true },
        ...g.ids.map((id) => {
          const it = ITEMS.find((x) => x.id === id)!;
          return { id: it.id, title: it.title, isHeader: false };
        }),
      ]),
    [],
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id) || document.getElementById(ITEMS[0].id || "");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FFF9EA]">
      <Helmet>
        <title>Devotional Literature | Zain Adtani</title>
        <meta
          name="description"
          content="Select texts of the Qur'an, Ginans, Qasidas and Tasbihs for reflection and contemplation."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Back and Title */}
        <Button variant="ghost" asChild className="mb-4">
          <a href="/usa-visit-2025">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to USA Visit 2025
          </a>
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Devotional Literature</h1>
        <p className="text-muted-foreground mt-3">
          Select texts of the Qur'an, Ginans, Qasidas and Tasbihs for reflection and contemplation.
        </p>

        {/* TOC */}
        <Card className="sticky top-4 mt-8 mb-10 p-4 shadow-sm border bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm uppercase tracking-wide">Table of Contents</h2>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="mt-3 space-y-1">
            {flatTOC.map((row) =>
              row.isHeader ? (
                <div
                  key={row.id}
                  className="px-3 py-2 text-xs font-semibold uppercase text-primary/90 bg-primary/5 rounded-md"
                >
                  {row.title}
                </div>
              ) : (
                <button
                  key={row.id}
                  onClick={() => scrollTo(row.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                    activeId === row.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {row.title}
                </button>
              ),
            )}
          </div>
        </Card>

        {/* Content */}
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
                {it.subtitle && (
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mt-1">{it.subtitle}</p>
                )}

                {/* ONLY Transliteration and Translation */}
                {it.transliteration && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-muted-foreground">Transliteration</h4>
                    <pre className="mt-2 whitespace-pre-wrap text-[0.98rem] leading-relaxed bg-accent/20 p-4 rounded-lg">
                      {it.transliteration}
                    </pre>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-muted-foreground">English Translation</h4>

                  {Array.isArray(it.translation) ? (
                    <ul className="mt-2 list-disc pl-6 space-y-2 bg-accent/20 p-4 rounded-lg">
                      {it.translation.map((line, i) => (
                        <li key={i} className="leading-relaxed">
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 leading-relaxed bg-accent/20 p-4 rounded-lg">{it.translation}</p>
                  )}
                </div>

                {/* Collapsible notes for each item if needed later */}
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="notes">
                    <AccordionTrigger className="text-sm">Add personal notes</AccordionTrigger>
                    <AccordionContent>
                      <div className="h-24 border rounded-md bg-muted/20 p-3 text-sm text-muted-foreground">
                        Write reflections here after reading and reciting.
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
