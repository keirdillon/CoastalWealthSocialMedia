import { useState, useRef, useEffect } from "react";

// ─── COASTAL PRECISION DESIGN TOKENS ───
const C = {
  navy900: "#0A1628", navy800: "#0F2240", navy700: "#152E54", navy600: "#1B3A68", navy500: "#234B82",
  teal500: "#2AB5A0", teal400: "#3CC9B4", teal300: "#6ED9CA", teal200: "#A5E8DF", teal100: "#D6F5F0",
  sand100: "#FAF8F5", sand200: "#F3EFE9", sand300: "#E8E2D8", sand400: "#D4CBBE", sand500: "#B8AD9E",
  gray50: "#FAFAFA", gray100: "#F5F5F5", gray200: "#EEEEEE", gray300: "#D4D4D4", gray400: "#A3A3A3",
  gray500: "#737373", gray600: "#525252",
  white: "#FFFFFF",
  success: "#22C55E", warning: "#F59E0B", error: "#EF4444",
  shadowSm: "0 1px 2px rgba(10,22,40,0.04)",
  shadowMd: "0 4px 16px rgba(10,22,40,0.06)",
  shadowLg: "0 12px 40px rgba(10,22,40,0.08)",
};
const serif = "'DM Serif Display', Georgia, 'Times New Roman', serif";
const sans = "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ─── CHEVRON ICON ───
const Chevron = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 200ms", opacity: 0.3, flexShrink: 0 }}>
    <path d="M6 3.5l5.5 5.5L6 14.5" stroke={C.navy900} strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

// ─── OVERLINE LABEL ───
const Overline = ({ children, color }) => (
  <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2.5px", color: color || C.teal500, marginBottom: 8 }}>{children}</div>
);

// ─── SECTION HEADING ───
const SectionHeading = ({ overline, title, subtitle, overlineColor }) => (
  <div style={{ marginBottom: 32 }}>
    {overline && <Overline color={overlineColor}>{overline}</Overline>}
    <h2 style={{ fontFamily: serif, fontSize: 32, color: C.navy900, margin: "0 0 8px", lineHeight: 1.2 }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 17, color: C.gray500, lineHeight: 1.65, margin: 0, maxWidth: 640 }}>{subtitle}</p>}
  </div>
);

// ─── CALLOUT BOX ───
const Callout = ({ title, children, variant = "sand" }) => {
  const bg = variant === "navy" ? C.navy900 : variant === "teal" ? C.teal100 : C.sand100;
  const border = variant === "navy" ? "transparent" : variant === "teal" ? C.teal200 : C.sand300;
  const labelColor = variant === "navy" ? C.teal400 : C.teal500;
  const textColor = variant === "navy" ? "rgba(255,255,255,0.6)" : C.gray600;
  const strongColor = variant === "navy" ? C.white : C.navy900;
  return (
    <div style={{
      padding: "24px 28px", borderRadius: 20, background: bg, border: `1px solid ${border}`, marginBottom: 16,
      ...(variant === "navy" ? { backgroundImage: `radial-gradient(ellipse at top right, rgba(42,181,160,0.12) 0%, transparent 60%)` } : {}),
    }}>
      {title && <Overline color={labelColor}>{title}</Overline>}
      <div style={{ fontSize: 15, color: textColor, lineHeight: 1.65 }}>
        {typeof children === "string" ? children : children}
      </div>
    </div>
  );
};

// ─── BULLET LIST ───
const BulletList = ({ items, color }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
    {items.map((item, i) => (
      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: color || C.teal500, marginTop: 8, flexShrink: 0 }} />
        <span style={{ fontSize: 15, color: C.gray600, lineHeight: 1.6 }}>{item}</span>
      </div>
    ))}
  </div>
);

// ─── DATA TABLE ───
const DataTable = ({ headers, rows, compact }) => (
  <div style={{ overflowX: "auto", margin: "16px 0", borderRadius: 12, border: `1px solid ${C.gray200}` }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: compact ? 13 : 14, fontFamily: sans }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{ background: C.navy900, color: C.white, padding: compact ? "8px 12px" : "10px 14px", textAlign: "left", fontWeight: 600, fontSize: compact ? 11 : 12, whiteSpace: "nowrap" }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>{rows.map((row, ri) => (
        <tr key={ri} style={{ background: ri % 2 === 0 ? C.white : C.sand100 }}>
          {row.map((cell, ci) => (
            <td key={ci} style={{ padding: compact ? "7px 12px" : "9px 14px", color: C.gray600, borderTop: `1px solid ${C.gray200}`, lineHeight: 1.5, verticalAlign: "top" }}>{cell}</td>
          ))}
        </tr>
      ))}</tbody>
    </table>
  </div>
);

// ─── ACCORDION CARD ───
const Accordion = ({ title, subtitle, badge, children, isOpen, onToggle }) => (
  <div style={{
    background: C.white, borderRadius: 20,
    border: `1px solid ${isOpen ? C.teal200 : C.gray200}`,
    boxShadow: isOpen ? C.shadowLg : C.shadowSm,
    transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
    transform: isOpen ? "translateY(-2px)" : "none",
    overflow: "hidden", marginBottom: 10,
  }}>
    <button onClick={onToggle} style={{ width: "100%", background: "transparent", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left" }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: C.navy900, fontFamily: sans }}>{title}</span>
          {badge && <span style={{ fontSize: 11, padding: "3px 12px", borderRadius: 9999, background: C.teal100, color: C.teal500, fontWeight: 600 }}>{badge}</span>}
        </div>
        {subtitle && <div style={{ fontSize: 14, color: C.gray500, marginTop: 4 }}>{subtitle}</div>}
      </div>
      <Chevron open={isOpen} />
    </button>
    {isOpen && <div style={{ padding: "0 24px 24px" }}>{children}</div>}
  </div>
);

// ─── SCRIPT BOX ───
const ScriptBox = ({ title, lines }) => (
  <div style={{ background: C.sand100, border: `1px solid ${C.sand300}`, borderRadius: 16, padding: "20px 24px", marginBottom: 12 }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: C.navy900, marginBottom: 10, fontFamily: sans }}>{title}</div>
    {lines.map((l, i) => (
      <div key={i} style={{ fontSize: 14, color: C.gray600, lineHeight: 1.6, marginBottom: 6 }}>
        {l.startsWith("[") ? <><span style={{ color: C.teal500, fontWeight: 600, fontSize: 12 }}>{l.match(/\[.*?\]/)?.[0]}</span> <span>{l.replace(/\[.*?\]\s*/, "")}</span></> : l}
      </div>
    ))}
  </div>
);


// ════════════════════════════════════════════
//  TAB DATA STRUCTURE
// ════════════════════════════════════════════
const tabs = [
  { key: "overview", label: "Overview" },
  { key: "frameworks", label: "Core Frameworks" },
  { key: "copywriting", label: "Copywriting" },
  { key: "strategy", label: "Strategy" },
  { key: "operations", label: "Operations" },
  { key: "swipe", label: "Swipe Files" },
  { key: "scripts", label: "Scripts & Examples" },
  { key: "execution", label: "Execution" },
];

// ════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════
export default function SocialPlaybook() {
  const [view, setView] = useState("overview");
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen(p => ({ ...p, [key]: !p[key] }));
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  return (
    <div style={{ minHeight: "100vh", background: C.white, fontFamily: sans, color: C.navy900 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* ─── HERO HEADER ─── */}
      <div style={{ background: C.navy900, backgroundImage: `radial-gradient(ellipse at top right, rgba(42,181,160,0.12) 0%, transparent 60%)`, padding: "44px 24px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Overline color={C.teal400}>COASTAL WEALTH</Overline>
          <h1 style={{ margin: 0, fontFamily: serif, fontSize: 38, fontWeight: 400, color: C.white, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Social Media Growth <span style={{ color: C.teal400 }}>Playbook</span>
          </h1>
          <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.65, color: "rgba(255,255,255,0.5)", maxWidth: 540 }}>
            The complete operating system for Instagram, short-form video, and long-form content strategy in 2026.
          </p>
          {/* Nav pills */}
          <div style={{ display: "flex", gap: 6, marginTop: 24, flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setView(t.key)} style={{
                background: view === t.key ? "rgba(255,255,255,0.12)" : "transparent",
                border: `1px solid ${view === t.key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                color: view === t.key ? C.white : "rgba(255,255,255,0.4)",
                padding: "7px 16px", borderRadius: 9999, fontSize: 13, fontWeight: 500,
                fontFamily: sans, cursor: "pointer", transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CONTENT AREA ─── */}
      <div ref={contentRef} style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ═══════════════════ OVERVIEW ═══════════════════ */}
        {view === "overview" && (<>
          <SectionHeading overline="EXECUTIVE SUMMARY" title="How Social Media Growth Actually Works" subtitle="This playbook is a complete operating manual designed for Coastal Wealth leadership. Every framework is built for execution, not theory." />

          <Callout title="WHAT THIS DOCUMENT COVERS" variant="navy">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 8 }}>
              {["The anatomy of viral content and why certain videos outperform by 100x", "A complete TOF / MOF / BOF content funnel system", "Topic selection with the highest probability of reach and conversion", "Copywriting and scripting mechanics behind high-retention content", "Page health diagnostics and how history impacts distribution", "Operating cadences, calendars, and batching workflows", "Personality as the competitive moat against AI content", "Proof systems that convert attention into trust and revenue", "Scientific testing, measuring, and iterating performance", "YouTube as an evergreen sales asset bank", "50 hook templates, 30 topic ideas, 20 CTAs, 10 DM flows"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.teal400, marginTop: 8, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </Callout>

          {/* Definitions */}
          <div style={{ marginTop: 40 }}>
            <SectionHeading overline="GLOSSARY" title="Key Definitions" subtitle="Every term maps to a specific mechanic that affects performance." />
            <Accordion title="View All Definitions" subtitle="15 essential terms" isOpen={open.defs} onToggle={() => toggle("defs")}>
              <DataTable
                headers={["Term", "Definition"]}
                rows={[
                  ["Hook", "The first 1\u20133 seconds of a video or the first line of a caption. Its sole purpose is to stop the scroll and create curiosity."],
                  ["Packaging", "The combination of hook, thumbnail, title, and opening text that determines engagement. The single biggest lever for reach."],
                  ["Retention", "The percentage of viewers who continue watching. Platforms reward high retention with more distribution."],
                  ["TOF (Top of Funnel)", "Broad, high-reach content to attract new audiences. Optimized for views, shares, and new followers."],
                  ["MOF (Middle of Funnel)", "Deeper content for existing followers. Builds trust through education and expertise. Optimized for saves and comments."],
                  ["BOF (Bottom of Funnel)", "Conversion-focused content. Moves warm audiences to action: booking calls, downloads, purchases. Optimized for DMs and leads."],
                  ["CCN/CCM Fit", "Core, Casual, New audience fit. Does it resonate with buyers, future buyers, and brand-new viewers?"],
                  ["Page Health", "The cumulative signal Instagram has built based on your posting history and engagement rates. Poor health suppresses distribution."],
                  ["Re-hook", "A mid-video curiosity loop that recaptures attention and prevents drop-offs. Essential for videos over 30 seconds."],
                  ["Momentum Line", "The invisible thread of tension through a video. Use \u2018but\u2019 and \u2018so\u2019 transitions instead of \u2018and then.\u2019"],
                  ["Rule of One", "Every content piece revolves around one singular idea. Not five tips. One idea explored with depth."],
                  ["Speed to Value", "How quickly content delivers its first non-obvious insight. Standard in 2026: within 3 seconds."],
                  ["Research Account", "A secondary IG account following only niche creators. Used to study what\u2019s performing and what topics have demand."],
                  ["Topic Maxing", "Selecting topics scoring high on demand (people care), fit (audience alignment), and interest (you care about it)."],
                  ["Proof Ladder", "A hierarchy of evidence: personal results, client results, case studies, transformations, and objection handling."],
                ]}
              />
            </Accordion>
          </div>

          {/* Taxonomy Map */}
          <div style={{ marginTop: 32 }}>
            <SectionHeading overline="TAXONOMY" title="Content Type Map" subtitle="Every content type Coastal Wealth should produce, tagged by funnel stage, KPI, format, and length." />
            <Accordion title="View Content Taxonomy" subtitle="14 content types mapped" isOpen={open.tax} onToggle={() => toggle("tax")}>
              <DataTable compact
                headers={["Content Type", "Funnel", "Primary KPI", "Best Format", "Length"]}
                rows={[
                  ["Broad insight / hot take", "TOF", "Reach, Shares", "Talking head reel", "15-45s"],
                  ["Myth-busting / contrarian", "TOF", "Shares, Comments", "Green screen reel", "20-45s"],
                  ["Relatable financial pain", "TOF", "Reach, Follows", "Text overlay reel", "10-30s"],
                  ["Step-by-step tutorial", "MOF", "Saves, Retention", "Carousel (7-10 slides)", "N/A"],
                  ["In-depth educational", "MOF", "Saves, Comments", "Talking head reel", "45-90s"],
                  ["Personal story / lesson", "MOF", "Comments, Trust", "Talking head reel", "30-60s"],
                  ["Client transformation", "BOF", "DMs, Leads", "Before/after reel", "30-60s"],
                  ["Objection handling", "BOF", "DMs, Booked calls", "Talking head reel", "20-45s"],
                  ["CTA / free resource", "BOF", "Link clicks, Leads", "Story sequence", "3-5 stories"],
                  ["Behind-the-scenes", "MOF", "Comments, Trust", "Story sequence", "4-7 stories"],
                  ["Live Q&A / AMA", "MOF/BOF", "DMs, Trust", "IG Live", "15-30 min"],
                  ["Collab / guest", "TOF/MOF", "Reach, Follows", "Collab reel", "30-60s"],
                  ["Long-form deep dive", "MOF/BOF", "Trust, Revenue", "YouTube", "8-20 min"],
                  ["Testimonial / case study", "BOF", "Leads, Revenue", "YouTube", "5-12 min"],
                ]}
              />
            </Accordion>
          </div>
        </>)}

        {/* ═══════════════════ CORE FRAMEWORKS ═══════════════════ */}
        {view === "frameworks" && (<>
          <SectionHeading overline="MODELS" title="Core Frameworks" subtitle="The structural models behind every high-performing piece of content." />

          {/* Viral Anatomy */}
          <Accordion title="The Viral Anatomy Model" subtitle="Four elements every viral video contains" badge="CRITICAL" isOpen={open.viral} onToggle={() => toggle("viral")}>
            <Callout title="FRAMEWORK: FOUR ELEMENTS OF VIRALITY" variant="teal">
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
                {[
                  { n: "1", t: "Novel + High-Term Idea", d: "The topic must be something most people have never heard articulated this way. \u2018High-term\u2019 means it connects to a universal concept (money, time, health) so it resonates at scale." },
                  { n: "2", t: "Curiosity in First 3 Seconds", d: "The hook creates an open loop the viewer needs to close. Genuine intellectual tension, not clickbait." },
                  { n: "3", t: "Speed to Value (No Intro)", d: "Zero preamble. The first sentence IS the value. Audiences leave in under 2 seconds without immediate delivery." },
                  { n: "4", t: "Non-Obvious, Highly Tactical Payoff", d: "The viewer gets a dopamine hit from learning something they can use TODAY. Generic advice does not qualify." },
                ].map(item => (
                  <div key={item.n}>
                    <span style={{ fontWeight: 600, color: C.navy900 }}>{item.n}. {item.t}</span>
                    <div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>{item.d}</div>
                  </div>
                ))}
              </div>
            </Callout>
            <Callout title="STRUCTURE: HOOK \u2192 EXPLANATION \u2192 ILLUSTRATION \u2192 TEACH">
              {[
                { label: "Hook (0-3s):", text: "Creates curiosity with a strong opening line + text overlay." },
                { label: "Explanation (3-15s):", text: "Establish credibility and context. Why should they listen?" },
                { label: "Illustration (15-30s):", text: "Concrete example or demonstration. Makes the concept tangible." },
                { label: "Teach (final):", text: "Non-obvious tactical takeaway. Viewer feels smarter than 30 seconds ago." },
              ].map((s, i) => <div key={i} style={{ marginBottom: 8 }}><strong style={{ color: C.navy900 }}>{s.label}</strong> <span style={{ color: C.gray600, fontSize: 14 }}>{s.text}</span></div>)}
            </Callout>
            <Callout title="FAILURE DIAGNOSIS: READING RETENTION GRAPHS" variant="navy">
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>
                <div style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Massive drop in first 3s:</strong> Bad hook. Rewrite it. Lead with the most surprising element.</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Steady decline throughout:</strong> Bad explanation. Add but/so transitions. Insert re-hooks.</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Drop at the very end:</strong> Bad payoff. Make the final insight more specific and actionable.</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Sharp drop at one point:</strong> Momentum leak. Cut that section or replace with a re-hook.</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: C.white }}>Flat line near zero:</strong> Topic failure. Reassess using Topic Maxing Framework.</div>
                <div><strong style={{ color: C.teal400 }}>High retention throughout:</strong> It works. Study it. Create variations.</div>
              </div>
            </Callout>
          </Accordion>

          {/* Momentum & Tension */}
          <Accordion title="Momentum and Tension System" subtitle="How to sustain engagement line-by-line" isOpen={open.momentum} onToggle={() => toggle("momentum")}>
            <Callout title="THE BUT/SO TECHNIQUE" variant="teal">
              <p style={{ margin: "8px 0", color: C.gray600, fontSize: 14, lineHeight: 1.6 }}>Every sentence connects to the next using <strong style={{ color: C.navy900 }}>\u2018but\u2019</strong> (creates tension) or <strong style={{ color: C.navy900 }}>\u2018so\u2019</strong> (creates consequence). Both create forward pull. <strong style={{ color: C.navy900 }}>\u2018And then\u2019</strong> is neutral and kills momentum.</p>
            </Callout>
            <Callout title="EXAMPLE: BEFORE & AFTER">
              <div style={{ marginBottom: 10 }}><strong style={{ color: C.error }}>Weak:</strong> <span style={{ color: C.gray600, fontSize: 14 }}>\u201cI started posting on Instagram. And then I tried reels. And then I got some views.\u201d</span></div>
              <div><strong style={{ color: C.success }}>Strong:</strong> <span style={{ color: C.gray600, fontSize: 14 }}>\u201cI started posting on Instagram, BUT nothing was working. SO I studied what top creators were doing. BUT what I found surprised me. SO I changed my approach, and within two weeks I added 89,000 followers.\u201d</span></div>
            </Callout>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, marginBottom: 10, marginTop: 20 }}>Re-hook Templates</div>
            <BulletList items={[
              "\u2018But here is where it gets interesting\u2026\u2019",
              "\u2018Now, the real reason this works is\u2026\u2019",
              "\u2018But most people miss the second part\u2026\u2019",
              "\u2018So I tested this, and the results were not what I expected\u2026\u2019",
              "\u2018But that is not even the best part\u2026\u2019",
              "\u2018Here is what nobody tells you about this\u2026\u2019",
            ]} />
            <Callout title="MOMENTUM AUDIT CHECKLIST" variant="teal">
              <BulletList color={C.navy900} items={[
                "Read every line out loud. Does each create a reason to hear the next?",
                "Circle every \u2018and then.\u2019 Replace with \u2018but\u2019 or \u2018so.\u2019",
                "Is there a re-hook at the 15-second mark?",
                "Does any sentence explain context without creating tension? Cut it.",
                "Is there at least one moment of surprise or unexpected turn?",
                "If you removed the last sentence, would the video feel incomplete?",
                "Time the script. Any 5-second window with no new information? Tighten it.",
              ]} />
            </Callout>
          </Accordion>

          {/* Topic Maxing */}
          <Accordion title="Topic Maxing Framework" subtitle="How to select topics with the highest probability of performance" isOpen={open.topic} onToggle={() => toggle("topic")}>
            <Callout title="THREE DIMENSIONS: DEMAND + FIT + INTEREST" variant="teal">
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
                <div><strong style={{ color: C.navy900 }}>1. DEMAND \u2014 Do people care?</strong><div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>Create research accounts per content bucket. Use analytics tools to find outlier content (10x normal views from similar-sized accounts).</div></div>
                <div><strong style={{ color: C.navy900 }}>2. FIT \u2014 CCN Fit</strong><div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>Core: resonates with buyers. Casual: resonates with future buyers. New: resonates with someone who has never seen you. Best topics score high on all three.</div></div>
                <div><strong style={{ color: C.navy900 }}>3. INTEREST \u2014 Do you care?</strong><div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>If you don\u2019t care about the topic, it shows in the energy. Authenticity is a measurable performance variable.</div></div>
              </div>
            </Callout>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, marginBottom: 10, marginTop: 20 }}>Scoring Rubric (Only produce content scoring 12+)</div>
            <DataTable compact headers={["Dimension", "Score 1 (Low)", "Score 3 (Medium)", "Score 5 (High)"]} rows={[
              ["Demand", "No evidence of engagement", "Some engagement on similar content", "Proven outliers; multiple creators went viral"],
              ["Fit (CCN)", "Only core buyers care", "Core + casual engage; new might", "Universal appeal; anyone connects instantly"],
              ["Interest", "Feels forced", "Mildly interested; decent energy", "Genuinely passionate; could talk for 30 min"],
            ]} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, marginBottom: 10, marginTop: 20 }}>Coastal Wealth Topic Examples</div>
            <DataTable compact headers={["Topic", "D", "F", "I", "Total", "Funnel"]} rows={[
              ["\u2018The hidden cost of waiting one year to invest\u2019", "5", "5", "4", "14", "TOF"],
              ["\u2018Why your 401k is not enough\u2019", "5", "5", "5", "15", "TOF"],
              ["\u2018What I tell clients afraid of a crash\u2019", "4", "5", "5", "14", "MOF"],
              ["\u2018How we built a plan for a teacher earning $55K\u2019", "4", "4", "4", "12", "BOF"],
              ["\u2018The question high-net-worth clients always ask\u2019", "5", "4", "5", "14", "MOF"],
              ["\u2018Why your advisor might not be a fiduciary\u2019", "5", "5", "4", "14", "TOF"],
            ]} />
          </Accordion>

          {/* Page Health */}
          <Accordion title="Page Health + Time-to-Viral Reality" subtitle="Why not every account starts from the same position" isOpen={open.page} onToggle={() => toggle("page")}>
            <Callout title="KEY INSIGHT" variant="navy">
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.6 }}>Your page\u2019s history <strong style={{ color: C.white }}>directly impacts</strong> how Instagram distributes future content. A brand-new page with no history gets a <strong style={{ color: C.teal400 }}>clean-slate advantage</strong>. A page with 600 posts averaging 200 views is <strong style={{ color: C.white }}>deprioritized</strong>.</span>
            </Callout>
            <BulletList items={[
              "New page, no history = significantly easier to go viral.",
              "600 posts at 200 views = page is deprioritized. New posts must overcome historical weight.",
              "Switching content categories = Instagram has to relearn. Distribution suffers during transition.",
              "Followers are mostly competitors = engagement signals are skewed. Distribution stalls.",
            ]} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, margin: "20px 0 10px" }}>Page Health Diagnostic</div>
            <Callout title="CHECK THESE FIVE INDICATORS" variant="teal">
              <BulletList color={C.navy900} items={[
                "Avg views per reel (last 30 posts): Under 500 on 10K+ followers = suppressed.",
                "Follower-to-engagement ratio: Less than 1% = composition likely poor.",
                "Follower demographics: Are 50%+ in your target market? Or peers/competitors?",
                "Content category consistency: Same niche consistently for 60+ days?",
                "Posting recency: At least 3x/week for the last 30 days? Gaps hurt.",
              ]} />
            </Callout>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, margin: "20px 0 10px" }}>30-Day Page Health Reset Plan</div>
            <DataTable headers={["Week", "Actions"]} rows={[
              ["Week 1", "Archive lowest-performing content. Post 5 new on-topic pieces using Viral Anatomy Model. TOF only with high CCN fit."],
              ["Week 2", "Increase to 6-7 posts. Daily Stories (3-5/day). Comment on 20 niche accounts daily. No selling."],
              ["Week 3", "Analyze retention graphs. Double down on highest-retention formats/topics. Introduce MOF content (2/week)."],
              ["Week 4", "Maintain 5-7 posts/week. Introduce one BOF piece. Track new follower demographics. Measure vs. pre-reset baseline."],
            ]} />
          </Accordion>

          {/* Personality Advantage */}
          <Accordion title="Personality as Competitive Advantage" subtitle="Value is commoditized. Delivery is differentiation." isOpen={open.personality} onToggle={() => toggle("personality")}>
            <Callout title="THE PERSONALITY ADVANTAGE TRIANGLE" variant="teal">
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
                <div><strong style={{ color: C.navy900 }}>1. POSITIONING</strong><div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>How you frame who you are. For Coastal Wealth: the trusted, clear-headed advisor who makes complex things simple. Not flashy. Not salesy. Grounded, competent, direct.</div></div>
                <div><strong style={{ color: C.navy900 }}>2. UNIQUE CHARACTERISTICS</strong><div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>Attributes competitors can\u2019t replicate: your experience, client stories, background, firm history. Coastal Wealth has decades of experience and real client outcomes.</div></div>
                <div><strong style={{ color: C.navy900 }}>3. TASTE</strong><div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>Fonts, color grading, music, editing style. People decide whether to trust you before you say a single word. Professional but warm. Confident but not arrogant.</div></div>
              </div>
            </Callout>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, margin: "16px 0 10px" }}>Voice Definition Exercises</div>
            <BulletList items={[
              "Write 5 beliefs most people in your industry would disagree with.",
              "Record yourself explaining a concept to a friend without a script. That cadence is your voice.",
              "Watch your 3 best-performing videos. What tone and delivery did they share?",
              "Ask 5 clients: \u2018What made you choose us?\u2019 Their answers reveal your positioning.",
              "Identify 3 creators outside your industry whose style you admire. What elements could you adapt?",
            ]} />
          </Accordion>

          {/* Show Don't Tell */}
          <Accordion title="Show, Don\u2019t Tell Proof System" subtitle="Teaching builds awareness. Showing builds trust." isOpen={open.proof} onToggle={() => toggle("proof")}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, marginBottom: 10 }}>The Proof Ladder (Weakest to Strongest)</div>
            <DataTable headers={["Level", "Proof Type", "Example", "Where to Use"]} rows={[
              ["1", "Claims & credentials", "\u2018We\u2019ve been in business 25 years\u2019", "Bio, website"],
              ["2", "Personal results", "\u2018How we manage our own portfolios\u2019", "MOF reels, stories"],
              ["3", "Client outcomes (anon)", "\u2018A client retired 3 years early\u2019", "MOF/BOF reels"],
              ["4", "Client testimonials (on camera)", "\u2018Here\u2019s what Sarah says\u2019", "BOF reels, YouTube"],
              ["5", "Detailed case studies", "\u2018Client came with $200K scattered. Here\u2019s what we did.\u2019", "YouTube, BOF carousels"],
            ]} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, margin: "16px 0 10px" }}>What Clients Care About (Desired Outcomes)</div>
            <BulletList items={[
              "Clarity: \u2018I finally understand where I stand.\u2019",
              "Confidence: \u2018I don\u2019t worry about money the way I used to.\u2019",
              "Results: \u2018My net worth grew by X% since working with this team.\u2019",
              "Authority: \u2018This firm clearly knows what they\u2019re doing.\u2019",
              "Trust: \u2018These people have my best interests at heart.\u2019",
            ]} />
          </Accordion>

          {/* Create Like a Scientist */}
          <Accordion title="Create Like a Scientist" subtitle="Hypothesis \u2192 Test \u2192 Measure \u2192 Iterate" isOpen={open.science} onToggle={() => toggle("science")}>
            <Callout title="THE SCIENTIFIC CONTENT PROCESS" variant="teal">
              {[
                { label: "1. HYPOTHESIS:", text: "\u2018If we create a TOF reel using a contrarian hook about 401k limitations, it will generate above-average reach and 20+ saves.\u2019" },
                { label: "2. TEST:", text: "Create the content. Follow the Viral Anatomy Model. Post at optimal time. Run for 48-72 hours." },
                { label: "3. MEASURE:", text: "Check views, retention, saves, shares, profile visits, follows, link clicks, DMs. Compare to 30-day average." },
                { label: "4. ITERATE:", text: "Outperformed? Create 3 variations. Underperformed? Use Failure Diagnosis to identify the breakdown." },
              ].map((s, i) => <div key={i} style={{ marginBottom: 10 }}><strong style={{ color: C.navy900 }}>{s.label}</strong> <span style={{ color: C.gray600, fontSize: 14 }}>{s.text}</span></div>)}
            </Callout>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, margin: "16px 0 10px" }}>KPI Dashboard</div>
            <DataTable compact headers={["Metric", "Weekly Target", "Source", "Why It Matters"]} rows={[
              ["Reel views (avg)", "2,000+", "IG Insights", "Leading indicator of reach"],
              ["Retention rate", "40%+", "Reels detail", "Content quality"],
              ["Saves per post", "50+", "IG Insights", "High-value signal"],
              ["Profile visits", "500+/week", "Overview", "Hook-to-curiosity conversion"],
              ["New followers", "100+/week", "Followers", "Growth rate"],
              ["DMs received", "20+/week", "Inbox", "Warm lead indicator"],
              ["Link clicks", "50+/week", "Tracking tool", "Conversion intent"],
              ["Leads captured", "5-10/week", "CRM", "Pipeline health"],
              ["Calls booked", "2-4/week", "Calendar", "Revenue leading indicator"],
            ]} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.navy900, margin: "16px 0 10px" }}>Testing Matrix</div>
            <DataTable compact headers={["Variable", "How to Test", "Duration", "Success Criteria"]} rows={[
              ["Hook style", "Same topic, different hook formula", "5 posts each", "20%+ higher 3s retention"],
              ["Video length", "Same structure, different lengths", "5 posts each", "Higher completion rate"],
              ["Format", "Same topic: reel vs carousel vs story", "3 posts each", "Compare saves + shares"],
              ["Posting time", "Same quality, different days/times", "2 weeks", "10%+ higher initial velocity"],
              ["CTA style", "Soft vs direct vs none", "5 posts each", "Compare DMs + link clicks"],
            ]} />
          </Accordion>

          {/* Long-form */}
          <Accordion title="Long-Form Content as Sales Asset Bank" subtitle="Instagram drives discovery. YouTube drives conversion." isOpen={open.longform} onToggle={() => toggle("longform")}>
            <Callout title="WHY YOUTUBE CHANGES THE GAME" variant="navy">
              <BulletList color={C.teal400} items={[
                "Instagram has a 1-3 day shelf life. YouTube videos are evergreen \u2014 generating leads years later.",
                "People need ~7 hours of content before trusting enough to buy. Long-form is the fastest path.",
                "Prospects who find you via referral, ad, or IG will look you up on YouTube. A library of content dramatically increases close rates.",
                "YouTube is an objection-handling engine. Create videos for top 10 objections and send links during sales.",
                "Even low view counts work \u2014 viewers are high-intent because they searched for you specifically.",
              ]} />
            </Callout>
            <Callout title="THE IG \u2192 YOUTUBE FLYWHEEL">
              <div style={{ fontSize: 14, color: C.gray600, lineHeight: 1.6 }}>
                <div style={{ marginBottom: 8 }}><strong style={{ color: C.navy900 }}>Instagram (Discovery):</strong> TOF reels attract eyeballs. MOF builds trust. BOF drives action.</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: C.navy900 }}>YouTube (Conversion):</strong> Deep dives build authority. Testimonials handle objections. Prospects who watch before a call are pre-sold.</div>
                <div><strong style={{ color: C.navy900 }}>The Flywheel:</strong> IG reel goes viral \u2192 5K new followers \u2192 2% click YouTube link \u2192 watch 2-3 videos \u2192 10% book a call \u2192 2-3x higher close rate.</div>
              </div>
            </Callout>
            <DataTable headers={["Asset Type", "Purpose", "Example"]} rows={[
              ["Authority Deep Dive", "Establish expertise", "\u2018Complete Guide to Retirement Planning in 2026\u2019"],
              ["Client Testimonial", "Social proof", "\u2018How We Helped a Business Owner Retire at 58\u2019"],
              ["Objection Handler", "Address hesitations", "\u2018Is Paying for a Financial Advisor Worth It?\u2019"],
              ["Behind-the-Scenes", "Humanize the firm", "\u2018A Day in the Life of a Coastal Wealth Advisor\u2019"],
              ["Market Commentary", "Real-time expertise", "\u2018What the Fed Decision Means for Your Portfolio\u2019"],
            ]} />
          </Accordion>
        </>)}

        {/* ═══════════════════ COPYWRITING ═══════════════════ */}
        {view === "copywriting" && (<>
          <SectionHeading overline="SECTION 6" title="Copywriting Over Speaking" subtitle="You don\u2019t need to become a better speaker. You need to become a better copywriter." />

          <Callout title="THE RULE OF ONE" variant="teal">
            <BulletList color={C.navy900} items={[
              "Your hook reinforces the one idea.",
              "Your explanation deepens the one idea.",
              "Your illustration makes the one idea tangible.",
              "Your teach delivers the one actionable insight from the one idea.",
            ]} />
            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(10,22,40,0.04)", borderRadius: 12, fontSize: 14, color: C.gray600, lineHeight: 1.55 }}>
              <strong style={{ color: C.error }}>Common mistake:</strong> Creators try to make one video solving 15 pains instead of providing 15 solutions to one pain. Flip it. One pain. Fifteen videos.
            </div>
          </Callout>

          <Accordion title="15 Posts from 1 Pain Generator" subtitle="Example: \u2018I don\u2019t know if I\u2019m saving enough for retirement\u2019" badge="TEMPLATE" isOpen={open.pain15} onToggle={() => toggle("pain15")}>
            <BulletList items={[
              "1. The real number you need (and why most calculators are wrong)",
              "2. What happens if you start 5 years late (real math)",
              "3. The 3 accounts you should be using simultaneously",
              "4. Why your employer match is not enough",
              "5. The mistake 80% of people make with 401k allocation",
              "6. How inflation silently destroys retirement savings",
              "7. What I\u2019d do starting over at 35 with $20k saved",
              "8. The \u2018retirement gap\u2019 nobody talks about",
              "9. Case study: panicking to confident in 6 months",
              "10. The one question that tells me if someone is on track",
              "11. Why your advisor might not be helping (red flags)",
              "12. Social Security won\u2019t save you. Here\u2019s why.",
              "13. The \u2018latte factor\u2019 is a lie. Here\u2019s what actually matters.",
              "14. How to talk to your spouse about retirement",
              "15. The biggest regret from people who retired too early",
            ]} />
          </Accordion>

          {/* Belief & Contrarian */}
          <div style={{ marginTop: 32 }}>
            <SectionHeading overline="SECTION 7" title="Belief and Contrarian Strategy" subtitle="The most compelling creators pass the \u2018I Believe\u2019 test. If you can\u2019t finish that sentence, you have a Wikipedia article, not a video." />
          </div>

          <Callout title="THE I BELIEVE TEST" variant="teal">
            <BulletList color={C.navy900} items={[
              "Step 1: Write your take as an \u2018I believe\u2019 statement.",
              "Step 2: Would someone disagree? If not, it\u2019s a fact, not a belief.",
              "Step 3: Would this attract the type of client you want?",
              "Step 4: Can you support it with evidence or experience?",
              "All four = yes? You have a video. Otherwise, sharpen the take.",
            ]} />
          </Callout>

          <Callout title="GUARDRAILS FOR CONTRARIAN CONTENT">
            <BulletList items={[
              "Must be defensible with evidence or experience.",
              "Must serve the audience. Contrarian without utility is empty.",
              "Must not punch down. Challenge institutions, not individuals.",
              "Should reframe, not just reject. \u2018X is wrong\u2019 < \u2018X leads to Y, here\u2019s a better way.\u2019",
              "For financial services: never contradict regulatory or fiduciary obligations.",
            ]} />
          </Callout>

          <Accordion title="20 Contrarian Angles for Coastal Wealth" subtitle="Ready to use" badge="SWIPE" isOpen={open.contrarian} onToggle={() => toggle("contrarian")}>
            <DataTable compact headers={["#", "Angle", "Funnel"]} rows={[
              ["1", "Diversification is overrated for most people.", "TOF"],
              ["2", "Your 401k is not a retirement plan. It\u2019s a tax strategy.", "TOF"],
              ["3", "The \u2018latte factor\u2019 is a distraction from what matters.", "TOF"],
              ["4", "Most financial literacy content online is dangerously oversimplified.", "TOF"],
              ["5", "You don\u2019t need a budget. You need a system.", "TOF"],
              ["6", "Paying off your mortgage early might be wrong.", "MOF"],
              ["7", "Index funds aren\u2019t the \u2018safe bet\u2019 everyone thinks.", "MOF"],
              ["8", "The biggest retirement risk isn\u2019t crashes. It\u2019s healthcare.", "MOF"],
              ["9", "If your advisor isn\u2019t a fiduciary, they\u2019re not your advisor.", "TOF"],
              ["10", "The 4% rule is dead.", "MOF"],
              ["11", "Saving too much in your 20s can cost you money.", "TOF"],
              ["12", "Target date funds are lazy investing.", "MOF"],
              ["13", "Your home is not an investment.", "TOF"],
              ["14", "Dollar cost averaging works, but not for the reason you think.", "MOF"],
              ["15", "Social Security will exist. Stop panicking.", "TOF"],
              ["16", "Tax-loss harvesting is overhyped.", "MOF"],
              ["17", "The best investment isn\u2019t in the stock market.", "TOF"],
              ["18", "Roth vs Traditional is the wrong question.", "MOF"],
              ["19", "Don\u2019t max out your 401k before doing this.", "MOF"],
              ["20", "Financial freedom is not a number. It\u2019s a structure.", "BOF"],
            ]} />
          </Accordion>
        </>)}

        {/* ═══════════════════ STRATEGY ═══════════════════ */}
        {view === "strategy" && (<>
          <SectionHeading overline="FORMAT SPECS" title="Format Specifications" subtitle="Detailed production guidelines for every content format." />

          <Accordion title="Reels by Funnel Stage" subtitle="Length, pacing, hooks, CTAs by stage" isOpen={open.reelspec} onToggle={() => toggle("reelspec")}>
            <DataTable headers={["Attribute", "TOF Reels", "MOF Reels", "BOF Reels"]} rows={[
              ["Length", "15-45 seconds", "30-90 seconds", "20-60 seconds"],
              ["Pacing", "Fast. New info every 2-3s.", "Moderate. Depth + tension.", "Direct. Problem \u2192 solution \u2192 CTA."],
              ["Hook style", "Curiosity, contrarian, stat", "Story, proof, \u2018let me show you\u2019", "Client result, objection, \u2018if you are [type]\u2019"],
              ["CTA", "Follow / Share", "Save / Comment", "DM me / Link in bio / Book"],
              ["Text overlay", "Always. Bold, readable.", "Usually. Key points.", "Always. Reinforce CTA visually."],
              ["Captions", "Always on", "Always on", "Always on"],
            ]} />
          </Accordion>

          <Accordion title="Carousel Specifications" subtitle="Slide counts, structure, save triggers" isOpen={open.carousel} onToggle={() => toggle("carousel")}>
            <BulletList items={[
              "Slide count: 7-10 slides. Under 7 feels thin. Over 10 loses attention.",
              "Slide 1 = the hook. Must create curiosity and be visually stopping.",
              "Slide 2 = context/problem. Why should the reader care?",
              "Slides 3-8 = value. One point per slide. Clear, scannable, specific.",
              "Second-to-last = summary or key takeaway.",
              "Last slide = CTA: save, share, follow, or DM.",
              "Save triggers: \u2018Save for later,\u2019 checklists, data/numbers worth referencing.",
              "Design: Clean, readable fonts, consistent brand colors, no clutter.",
            ]} />
          </Accordion>

          <Accordion title="Stories Cadence" subtitle="Daily flow and conversion prompts" isOpen={open.storyspec} onToggle={() => toggle("storyspec")}>
            <BulletList items={[
              "Minimum 3/day, ideally 4-6. Keeps you at top of feed.",
              "Flow: Casual/BTS (1-2) \u2192 Value/insight (1-2) \u2192 Conversion prompt (1-2).",
              "Use polls and question stickers frequently for engagement signals.",
              "Share reel previews in stories to drive views.",
              "Once per week: drive a specific action (download, book, link).",
            ]} />
          </Accordion>
        </>)}

        {/* ═══════════════════ OPERATIONS ═══════════════════ */}
        {view === "operations" && (<>
          <SectionHeading overline="OPERATING SYSTEM" title="Cadence and Workflow" subtitle="Consistency without strategy is wasted effort. Here\u2019s the system." />

          <Accordion title="TOF / MOF / BOF Mix by Tier" subtitle="Three cadence levels based on resources" badge="FRAMEWORK" isOpen={open.cadence} onToggle={() => toggle("cadence")}>
            <DataTable compact headers={["Tier", "TOF Reels", "MOF Reels", "Carousels", "Stories", "CTAs", "DMs", "Long-Form"]} rows={[
              ["Starter", "2-3/wk", "1-2/wk", "1/wk", "2-3/day", "1/wk", "20-30/day", "1/mo"],
              ["Serious", "3-4/wk", "2-3/wk", "1-2/wk", "3-5/day", "2/wk", "50-75/day", "1/wk"],
              ["Aggressive", "5-7/wk", "3-4/wk", "2-3/wk", "5-7/day", "3-4/wk", "75-100/day", "2/wk"],
            ]} />
          </Accordion>

          <Accordion title="Weekly Calendar Template (Serious Tier)" subtitle="Day-by-day content plan" isOpen={open.calendar} onToggle={() => toggle("calendar")}>
            <DataTable headers={["Day", "Content", "Stories", "Engagement"]} rows={[
              ["Mon", "TOF Reel (broad hook)", "3-4: BTS + poll", "Comment on 30 accounts"],
              ["Tue", "MOF Carousel (educational)", "3: expand on carousel", "Reply to all Mon comments"],
              ["Wed", "TOF Reel (contrarian)", "4: day-in-life + Q&A", "Comment on 30 accounts"],
              ["Thu", "MOF Reel (tutorial/story)", "3: client win + CTA", "Reply all. Send 25 DMs."],
              ["Fri", "TOF Reel (relatable pain)", "3: casual + poll", "Comment on 30 accounts"],
              ["Sat", "BOF Reel (testimonial/CTA)", "2: soft CTA + weekend", "Send 25 DMs to warm leads"],
              ["Sun", "Rest or batch-prep", "1-2: personal", "Review weekly analytics"],
            ]} />
          </Accordion>

          <Accordion title="Batching Workflow SOP" subtitle="4-day content production system" badge="SOP" isOpen={open.batch} onToggle={() => toggle("batch")}>
            <Callout title="WEEKLY BATCHING WORKFLOW">
              {[
                { label: "Day 1 \u2014 Planning (2 hrs):", text: "Review last week\u2019s analytics. Identify top performer. Score 10 topics using rubric. Select 5-7. Write all hooks first (hooks are the bottleneck)." },
                { label: "Day 2 \u2014 Scripting (3 hrs):", text: "Full scripts for all 5-7 pieces. Momentum Audit each script. Carousel copy + slide outlines. Stories copy + CTA sequences." },
                { label: "Day 3 \u2014 Recording (2-3 hrs):", text: "Record all talking-head content in one session. Consistent background, lighting, energy. 2-3 takes each. Teleprompter or bullet points, not full scripts." },
                { label: "Day 4 \u2014 Editing + Scheduling (2 hrs):", text: "Edit videos. Add captions, text overlays, b-roll. Design carousels. Schedule all content. Prepare DM templates." },
              ].map((s, i) => <div key={i} style={{ marginBottom: 12 }}><strong style={{ color: C.navy900 }}>{s.label}</strong><div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>{s.text}</div></div>)}
            </Callout>
          </Accordion>
        </>)}

        {/* ═══════════════════ SWIPE FILES ═══════════════════ */}
        {view === "swipe" && (<>
          <SectionHeading overline="READY TO USE" title="Swipe Files" subtitle="Copy, customize, and deploy. These are not conceptual." />

          <Accordion title="50 Hook Templates" subtitle="Tagged by hook type" badge="50 HOOKS" isOpen={open.hooks} onToggle={() => toggle("hooks")}>
            {[
              { label: "CURIOSITY HOOKS (1-10)", items: [
                "1. \u2018Did you know that statistically, [surprising fact]?\u2019",
                "2. \u2018I just discovered something about [topic] that changes everything.\u2019",
                "3. \u2018There is a reason nobody talks about [hidden truth].\u2019",
                "4. \u2018The [industry] does not want you to know this.\u2019",
                "5. \u2018I studied [number] of [thing] and found [unexpected pattern].\u2019",
                "6. \u2018What if I told you [common belief] is completely wrong?\u2019",
                "7. \u2018Here is what [number]% of people get wrong about [topic].\u2019",
                "8. \u2018Everyone is talking about [trend], but nobody mentions [this].\u2019",
                "9. \u2018I\u2019ve been doing [thing] for [years], and this is the one thing that matters.\u2019",
                "10. \u2018The real reason [outcome] has nothing to do with [assumed cause].\u2019",
              ]},
              { label: "CONTRARIAN HOOKS (11-20)", items: [
                "11. \u2018Stop [common advice]. It is actually hurting you.\u2019",
                "12. \u2018[Common belief] is the worst financial advice I\u2019ve ever heard.\u2019",
                "13. \u2018Unpopular opinion: [contrarian take with reasoning].\u2019",
                "14. \u2018I do the exact opposite of what most [professionals] recommend.\u2019",
                "15. \u2018Everyone says [advice]. I say [opposite], and here is why.\u2019",
                "16. \u2018The [thing everyone recommends] is a trap.\u2019",
                "17. \u2018[Authority figure] is wrong about [topic].\u2019",
                "18. \u2018I stopped [common practice] and my [metric] doubled.\u2019",
                "19. \u2018The #1 [category] advice online is the worst thing you can do.\u2019",
                "20. \u2018What if [accepted idea] was never true?\u2019",
              ]},
              { label: "PROOF / RESULTS HOOKS (21-30)", items: [
                "21. \u2018I [achieved result] in [timeframe]. Here is exactly how.\u2019",
                "22. \u2018My client went from [before] to [after] in [time].\u2019",
                "23. \u2018We tested [thing] for [time] and the results were [surprising].\u2019",
                "24. \u2018This one change added [number] to our [metric].\u2019",
                "25. \u2018I\u2019ve helped [number] people do [thing]. Here is the pattern.\u2019",
                "26. \u2018Last month, we [achievement]. This is what we did differently.\u2019",
                "27. \u2018I asked [number] clients what they wish they knew sooner. #1 was\u2026\u2019",
                "28. \u2018Before and after: what [change] did for [person].\u2019",
                "29. \u2018The exact strategy that generated [result] for [client type].\u2019",
                "30. \u2018I spent [time] analyzing [data]. The single biggest insight.\u2019",
              ]},
              { label: "QUESTION / PROBLEM HOOKS (31-40)", items: [
                "31. \u2018Why are you still [common mistake]?\u2019",
                "32. \u2018If you are [situation], you need to hear this.\u2019",
                "33. \u2018What would you do if [scenario] happened tomorrow?\u2019",
                "34. \u2018Are you making this [mistake] with your [thing]?\u2019",
                "35. \u2018Have you ever wondered why [outcome] keeps happening?\u2019",
                "36. \u2018What is the one thing between you and [desired outcome]?\u2019",
                "37. \u2018If you have [amount] saved, read this immediately.\u2019",
                "38. \u2018The question every [person type] should be asking right now.\u2019",
                "39. \u2018Why is nobody talking about [emerging issue]?\u2019",
                "40. \u2018You are probably doing [thing] wrong. Here is how to check.\u2019",
              ]},
              { label: "STORY / RELATABILITY HOOKS (41-50)", items: [
                "41. \u2018A client called me last week in a panic.\u2019",
                "42. \u2018The biggest financial mistake I ever made cost me [amount].\u2019",
                "43. \u2018I sat across from a [person type] who said [striking statement].\u2019",
                "44. \u2018When I was [age], I believed [wrong thing].\u2019",
                "45. \u2018Someone asked me [question] yesterday and my answer surprised them.\u2019",
                "46. \u2018I was not supposed to share this, but\u2026\u2019",
                "47. \u2018Last Tuesday, something happened that changed how I think about [topic].\u2019",
                "48. \u2018My [family member] taught me something about money I\u2019ll never forget.\u2019",
                "49. \u2018I got this DM from a follower and it stopped me in my tracks.\u2019",
                "50. \u2018Three years ago, I almost made a decision that would have cost me everything.\u2019",
              ]},
            ].map((group, gi) => (
              <div key={gi} style={{ marginBottom: 16 }}>
                <Overline>{group.label}</Overline>
                <BulletList items={group.items} />
              </div>
            ))}
          </Accordion>

          <Accordion title="30 Topic Ideas by Funnel Stage" subtitle="10 TOF + 10 MOF + 10 BOF" badge="30 TOPICS" isOpen={open.topics30} onToggle={() => toggle("topics30")}>
            {[
              { label: "TOF \u2014 BROAD REACH", items: ["1. The real cost of waiting one year to invest", "2. Why the richest were C students", "3. 5 money rules nobody teaches in school", "4. What your bank hopes you never learn", "5. The hidden tax from every paycheck", "6. Why most people retire broke", "7. The one number predicting your financial future", "8. What I\u2019d tell my 25-year-old self about money", "9. The biggest financial lie you were told growing up", "10. How inflation stole 20% of your savings this decade"] },
              { label: "MOF \u2014 DEEPER EDUCATION", items: ["11. Roth vs Traditional: real math most miss", "12. 3 accounts everyone should have by 40", "13. How to read your investment statement", "14. What to do when the market drops 20%", "15. Tax strategy saving clients $12K/year avg", "16. Why your target date fund might be costing you", "17. The retirement mistake that can\u2019t be fixed later", "18. How much you actually need to retire (walkthrough)", "19. Estate planning basics for everyone over 30", "20. The money conversation with your spouse"] },
              { label: "BOF \u2014 CONVERSION-READY", items: ["21. How we helped a nurse retire 5 years early", "22. What happens in your first Coastal Wealth meeting", "23. Is paying for an advisor worth it? (honest answer)", "24. 3 signs you\u2019ve outgrown your current advisor", "25. What our clients say about working with us", "26. The exact process we use for financial plans", "27. How to know if you\u2019re ready for professional planning", "28. Questions to ask before hiring any advisor", "29. Why we became fiduciaries", "30. Behind-the-scenes: how we manage client portfolios"] },
            ].map((group, gi) => (
              <div key={gi} style={{ marginBottom: 16 }}>
                <Overline>{group.label}</Overline>
                <BulletList items={group.items} />
              </div>
            ))}
          </Accordion>

          <Accordion title="20 CTA Scripts" subtitle="Soft, Medium, and Direct" badge="20 CTAs" isOpen={open.ctas} onToggle={() => toggle("ctas")}>
            {[
              { label: "SOFT CTAs (TOF/MOF)", items: ["1. \u2018If this was helpful, save it. You\u2019ll want to come back.\u2019","2. \u2018Share this with someone who needs to hear it.\u2019","3. \u2018Follow for more breakdowns like this.\u2019","4. \u2018Drop a comment if you have a question.\u2019","5. \u2018If this changed how you think, give it a share.\u2019"] },
              { label: "MEDIUM CTAs (MOF)", items: ["6. \u2018Free guide on this. Link in bio.\u2019","7. \u2018DM me PLAN for our free retirement checklist.\u2019","8. \u2018Full breakdown on YouTube. Link in bio.\u2019","9. \u2018Want me to cover [topic] next? Comment below.\u2019","10. \u2018Free calculator for this. DM me CALC.\u2019"] },
              { label: "DIRECT CTAs (BOF)", items: ["11. \u2018DM me REVIEW for a free 15-min call.\u2019","12. \u2018Taking 5 new clients this month. Link in bio.\u2019","13. \u2018Book a clarity call: link in bio.\u2019","14. \u2018DM me your biggest financial question.\u2019","15. \u2018DM me START to begin the conversation.\u2019","16. \u2018Link in bio for a 15-minute strategy call.\u2019","17. \u2018Comment PLAN and I\u2019ll reach out.\u2019","18. \u2018Consider this your sign. DM me READY.\u2019","19. \u2018DM me SCORE for our free assessment.\u2019","20. \u2018I open 5 free strategy call spots weekly. Link in bio.\u2019"] },
            ].map((g, gi) => <div key={gi} style={{ marginBottom: 16 }}><Overline>{g.label}</Overline><BulletList items={g.items} /></div>)}
          </Accordion>

          <Accordion title="10 DM Conversion Flows" subtitle="Cold \u2192 Warm \u2192 Booked" badge="10 FLOWS" isOpen={open.dms} onToggle={() => toggle("dms")}>
            {[
              { title: "1. Keyword Trigger", text: "Post CTA: \u2018DM me PLAN\u2019 \u2192 Auto-reply: \u2018What\u2019s your #1 financial question right now?\u2019 \u2192 They reply \u2192 Give brief value + \u2018Want to go deeper on a 15-min call?\u2019" },
              { title: "2. Story Responder", text: "Viewer replies to story \u2192 Give quick answer + \u2018I can walk you through how this applies to your situation. Want a quick call?\u2019" },
              { title: "3. Content Follow-Up", text: "Someone saves/shares your content \u2192 \u2018Hey, noticed you saved that post. Is that something you\u2019re working through?\u2019" },
              { title: "4. New Follower Welcome", text: "Wait 24hrs \u2192 \u2018Thanks for the follow. Curious: what brought you here?\u2019" },
              { title: "5. Value-First Outreach", text: "To engaged follower: \u2018I noticed you\u2019ve been engaging. I put together a free [resource]. Want me to send it?\u2019" },
              { title: "6. Re-engagement", text: "Follower who stopped engaging: \u2018I put together something new on [topic]. Thought of you.\u2019" },
              { title: "7. Warm Lead Nurture", text: "Someone who didn\u2019t book: \u2018Just checking in. If you want to revisit that conversation, the door is open.\u2019" },
              { title: "8. Referral Ask", text: "After a great client experience: \u2018If you know anyone in a similar situation, I\u2019d love to help them too.\u2019" },
              { title: "9. Content Co-Creation", text: "\u2018I\u2019m creating a piece about [topic]. Would you share your experience? Our audience would benefit.\u2019" },
              { title: "10. Direct Closer", text: "Warm lead with multiple content touches: \u2018Want to skip the content and just talk through your situation? I have 15 minutes on [day].\u2019" },
            ].map((dm, i) => (
              <Callout key={i} title={dm.title}>
                <span style={{ fontSize: 14, color: C.gray600, lineHeight: 1.6 }}>{dm.text}</span>
              </Callout>
            ))}
          </Accordion>

          <Accordion title="10 Carousel Frameworks" subtitle="Plug-and-play slide structures" badge="10 FRAMEWORKS" isOpen={open.carouselfx} onToggle={() => toggle("carouselfx")}>
            <DataTable compact headers={["#", "Framework", "Slide Structure"]} rows={[
              ["1", "Myth Buster", "Hook \u2192 Myth explained \u2192 Truth with evidence \u2192 What to do instead \u2192 CTA"],
              ["2", "Step-by-Step", "Hook \u2192 One step per slide \u2192 Summary \u2192 CTA"],
              ["3", "Comparison", "Hook \u2192 Option A pros/cons \u2192 Option B pros/cons \u2192 Which to choose \u2192 CTA"],
              ["4", "Checklist", "Hook \u2192 One item per slide \u2192 Save this checklist \u2192 CTA"],
              ["5", "Before/After", "Hook \u2192 Before state \u2192 Turning point \u2192 After state \u2192 CTA"],
              ["6", "Data Breakdown", "Surprising stat \u2192 Context \u2192 What it means for you \u2192 CTA"],
              ["7", "Mistakes List", "Hook \u2192 One mistake per slide \u2192 The fix \u2192 CTA"],
              ["8", "FAQ", "Hook \u2192 Q&A one per slide \u2192 Got more questions? \u2192 CTA"],
              ["9", "Timeline", "Hook \u2192 Age brackets with actions \u2192 Start today \u2192 CTA"],
              ["10", "Contrarian Take", "Provocative statement \u2192 Why most believe opposite \u2192 Evidence \u2192 What to do \u2192 CTA"],
            ]} />
          </Accordion>
        </>)}

        {/* ═══════════════════ SCRIPTS & EXAMPLES ═══════════════════ */}
        {view === "scripts" && (<>
          <SectionHeading overline="WORD-FOR-WORD" title="Full Scripts & Examples" subtitle="15 fully written posts plus 10 before/after hook rewrites." />

          <Accordion title="TOF Scripts (5)" subtitle="Broad reach, high share-ability" badge="TOF" isOpen={open.tofScripts} onToggle={() => toggle("tofScripts")}>
            <ScriptBox title="Script 1: Contrarian (30s)" lines={["[HOOK] Everyone says max out your 401k. I disagree, and here is why.","[EXPLAIN] Your 401k has a major limitation: you cannot touch that money until 59\u00bd without penalties.","[ILLUSTRATE] If you want to retire at 50, buy a business at 45, or handle an emergency at 40, that money is locked.","[TEACH] Before maxing your 401k, make sure you have a taxable brokerage that gives you access when you need it.","[CTA] Save this. Share it with someone blindly maxing out their 401k."]} />
            <ScriptBox title="Script 2: Curiosity (25s)" lines={["[HOOK] The richest people I know all have one thing in common, and it is not what you think.","[EXPLAIN] It is not their income or investments. It is their relationship with time.","[ILLUSTRATE] Every wealthy client made one decision early: stop trading time for money and build systems.","[TEACH] The first system is an investment portfolio that compounds while you sleep.","[CTA] Follow for more insights like this."]} />
            <ScriptBox title="Script 3: Relatable Pain (20s)" lines={["[HOOK] Nobody teaches you about money in school. You know why?","[EXPLAIN] Because the system was designed to produce employees, not investors.","[TEACH] The most important financial skill: make your money work harder than you do. It starts with compound interest.","[CTA] Share this with someone who needs to hear it."]} />
            <ScriptBox title="Script 4: The One Number" lines={["[HOOK] If I could only look at one number to tell if you\u2019ll be okay, it wouldn\u2019t be income or net worth.","[EXPLAIN] It would be your savings rate as a percentage of gross income.","[ILLUSTRATE] Someone earning $300K saving 5% will retire later than someone earning $80K saving 25%.","[TEACH] Calculate yours: total annual savings \u00f7 gross income. Under 15%? We need to talk.","[CTA] Follow for more real financial math."]} />
            <ScriptBox title="Script 5: What Banks Hope You Ignore" lines={["[HOOK] Your bank pays you 0.01% while lending your money out at 7%.","[EXPLAIN] That is not a partnership. It is a business model built on inertia.","[TEACH] High-yield accounts pay 4-5%. On $50K, you\u2019re leaving $2,000-$2,500/year on the table. 15 minutes to switch.","[CTA] Share with someone who still has their money in a big bank."]} />
          </Accordion>

          <Accordion title="MOF Scripts (5)" subtitle="Trust-building, deeper education" badge="MOF" isOpen={open.mofScripts} onToggle={() => toggle("mofScripts")}>
            <ScriptBox title="Script 1: The Danger Zone (60s)" lines={["[HOOK] If you have between $100K and $500K saved, you are in the most dangerous zone in personal finance.","[EXPLAIN] Too much to ignore, not enough to feel secure. Most people make one of two mistakes.","[ILLUSTRATE] Mistake 1: get conservative too early. Bonds only. Inflation eats them alive over 20 years.","[RE-HOOK] Mistake 2 is actually worse.","[CONTINUE] They take huge risks: individual stocks, crypto. One bad year sets them back a decade.","[TEACH] The move: balanced allocation with a clear withdrawal plan. Not all-in either direction.","[CTA] If this is you, DM me REVIEW."]} />
            <ScriptBox title="Script 2: Panicking Client Story (45s)" lines={["[HOOK] A client called me last week in a panic. Market dropped 3% and they wanted to sell everything.","[EXPLAIN] I understand the feeling. Watching your portfolio go down is painful.","[ILLUSTRATE] I pulled up their plan. Based on their age, timeline, and allocation, a 3% drop is built into the model. Their retirement date didn\u2019t change by a single day.","[TEACH] The purpose of a financial plan is not to eliminate risk. It\u2019s to show you how much risk you can absorb without changing your outcome.","[CTA] Save this for the next time the market dips."]} />
            <ScriptBox title="Script 3: Roth Conversion Window (60s)" lines={["[HOOK] If you\u2019re between 62 and 70 and not doing Roth conversions, you might be making a $100,000+ mistake.","[EXPLAIN] Between retirement and when SS/RMDs kick in, you\u2019re likely in the lowest tax bracket you\u2019ll ever be in.","[ILLUSTRATE] Move money from Traditional IRA to Roth, pay taxes at the lower rate, and every dollar grows tax-free for life.","[TEACH] Miss this window and you pay significantly higher taxes later. One of the most impactful strategies we implement.","[CTA] If you\u2019re in this age range, save this and bring it up with your advisor."]} />
            <ScriptBox title="Script 4: The Retirement Gap" lines={["[HOOK] There\u2019s a gap in retirement planning nobody talks about.","[EXPLAIN] The gap between when you retire and when income sources actually start. Retire at 60? SS doesn\u2019t start until 62 at earliest.","[ILLUSTRATE] Medicare doesn\u2019t start until 65. For 2-5 years, you cover everything from savings.","[TEACH] Most calculators don\u2019t model this properly. You need a specific bridge strategy.","[CTA] DM me GAP to understand what yours looks like."]} />
            <ScriptBox title="Script 5: Spouse Money Conversation" lines={["[HOOK] If you and your spouse aren\u2019t on the same page about money, no plan will save you.","[STEP 1] Start with goals, not numbers. \u2018Where do we want to be in 10 years?\u2019","[STEP 2] Share fears, not blame. \u2018I worry about running out of money\u2019 is productive.","[STEP 3] Agree on ONE number to track monthly. Savings rate, net worth, or spending.","[CTA] Save this for when you\u2019re ready to have it."]} />
          </Accordion>

          <Accordion title="BOF Scripts (5)" subtitle="Conversion-focused content" badge="BOF" isOpen={open.bofScripts} onToggle={() => toggle("bofScripts")}>
            <ScriptBox title="Script 1: Client Case Study (40s)" lines={["[HOOK] Three years ago, this client had retirement savings in six accounts with no strategy.","[EXPLAIN] They didn\u2019t know how much they needed, what they paid in fees, or if investments matched goals.","[ILLUSTRATE] We consolidated, built a custom plan, reduced fees by 40%, and reallocated based on actual retirement date.","[TEACH] Today they\u2019re 18 months ahead of schedule. Not because of the market. Because of the plan.","[CTA] If your finances feel scattered, DM me START."]} />
            <ScriptBox title="Script 2: Is an Advisor Worth It (30s)" lines={["[HOOK] \u2018I can just do this myself with index funds.\u2019 I hear this a lot.","[EXPLAIN] You CAN. And for some people, that\u2019s right. But here\u2019s what self-directed investors miss.","[ILLUSTRATE] Tax-loss harvesting, Roth conversion timing, SS optimization, estate planning, behavioral coaching.","[TEACH] The question isn\u2019t whether you can invest alone. It\u2019s how much the blind spots cost you.","[CTA] DM me REVIEW for an honest assessment."]} />
            <ScriptBox title="Script 3: First Meeting Walkthrough" lines={["[HOOK] A lot of people never take the first step because they don\u2019t know what to expect.","[STEP 1] We listen. Goals, fears, family situation, timeline. Not a sales pitch.","[STEP 2] We review: accounts, debts, insurance, estate. Identify gaps.","[STEP 3] We give you a clear picture of where you stand and what needs to happen.","[CTA] 30 minutes. Free. Link in bio to book."]} />
            <ScriptBox title="Script 4: 3 Signs You\u2019ve Outgrown Your Advisor" lines={["[HOOK] Here are 3 signs you\u2019ve outgrown your financial advisor.","[SIGN 1] They only talk about investments, never tax strategy, estate planning, or insurance.","[SIGN 2] You haven\u2019t heard from them in 6+ months. If they only call to sell, they\u2019re a salesperson.","[SIGN 3] They can\u2019t show you when you can retire and how much you can spend.","[CTA] We offer free second-opinion reviews. DM me REVIEW."]} />
            <ScriptBox title="Script 5: The Direct Closer (35s)" lines={["[HOOK] If you\u2019ve been following me and still haven\u2019t gotten your finances reviewed, let me say something directly.","[EXPLAIN] Content is great for learning. But watching videos about retirement isn\u2019t the same as having a plan.","[TEACH] You need to hire someone. A real advisor with a real plan based on real numbers.","[CTA] DM me PLAN. First conversation is free. Zero obligation. But stop putting it off."]} />
          </Accordion>

          <Accordion title="10 Before vs After Hook Rewrites" subtitle="Weak hooks transformed into strong ones" badge="REWRITES" isOpen={open.rewrites} onToggle={() => toggle("rewrites")}>
            <DataTable compact headers={["#", "Before (Weak)", "After (Strong)", "Why It Works"]} rows={[
              ["1", "Hey guys, today I want to talk about retirement.", "If you have $200K saved and you\u2019re over 40, you\u2019re running out of time.", "Specific, urgent, targeted."],
              ["2", "5 tips for better investing.", "The investing mistake that cost my client $47,000.", "Specificity + consequence + curiosity."],
              ["3", "Let me explain Roth IRAs.", "You\u2019re probably losing $3,000/year by not using a Roth correctly.", "Quantified loss creates interest."],
              ["4", "I\u2019m a financial advisor and here\u2019s my advice.", "After 15 years managing money, here\u2019s the one thing every rich client does.", "Authority + curiosity + Rule of One."],
              ["5", "The stock market is volatile right now.", "The market just dropped 800 points. Here\u2019s what I told my clients this morning.", "Timeliness + specificity."],
              ["6", "You should start investing early.", "A 25yo investing $200/mo has more at 65 than a 35yo investing $500/mo.", "Proof + unexpected contrast."],
              ["7", "Diversification is important.", "I told a client to stop diversifying. Here\u2019s why.", "Contrarian + curiosity loop."],
              ["8", "Here are some tax strategies.", "The IRS doesn\u2019t want you to know about this legal tax strategy.", "Authority challenge + hidden knowledge."],
              ["9", "Let me tell you about our services.", "We saved a client $180,000 in taxes over 5 years. Here\u2019s the exact strategy.", "Proof + specificity + \u2018exact.\u2019"],
              ["10", "Financial planning is important.", "You\u2019ll either retire comfortably or you won\u2019t. It comes down to one decision in the next 12 months.", "Binary outcome + urgency."],
            ]} />
          </Accordion>
        </>)}

        {/* ═══════════════════ EXECUTION ═══════════════════ */}
        {view === "execution" && (<>
          <SectionHeading overline="LAUNCH SYSTEM" title="Execution Plan" subtitle="From reading this playbook to posting your first content in 7 days." />

          <Accordion title="7-Day Action Plan" subtitle="Day-by-day launch sequence" badge="START HERE" isOpen={open.sevenday} onToggle={() => toggle("sevenday")}>
            <DataTable headers={["Day", "Actions"]} rows={[
              ["Day 1", "Audit: Run Page Health Diagnostic. Document current metrics. Set up a research account following 50 financial creators."],
              ["Day 2", "Strategy: Score 20 topics using rubric. Select top 10 (score 12+). Assign TOF/MOF/BOF."],
              ["Day 3", "Scripting: Write hooks for all 10. Select top 5. Write full scripts using Viral Anatomy Model."],
              ["Day 4", "Recording: Set up clean, well-lit space. Record all 5 videos. 2+ takes each."],
              ["Day 5", "Editing: Add captions + text overlays. Design 1 carousel. Prepare 1 week of story content."],
              ["Day 6", "Systems: Set up link tracking (UTM). Create performance spreadsheet. Schedule all Week 1 content."],
              ["Day 7", "Launch: Post first content. Begin daily Stories. Send 20 DMs. Monitor 48-hour performance."],
            ]} />
          </Accordion>

          <Accordion title="30-Day Content Calendar" subtitle="Week-by-week plan" isOpen={open.thirtyday} onToggle={() => toggle("thirtyday")}>
            {[
              { label: "WEEK 1: FOUNDATION", rows: [["Mon","TOF Reel: broad hook"],["Tue","MOF Carousel: step-by-step"],["Wed","TOF Reel: contrarian"],["Thu","MOF Reel: tutorial"],["Fri","TOF Reel: relatable pain"],["Sat","Stories only: BTS"],["Sun","Analytics review + prep"]] },
              { label: "WEEK 2: EXPANSION", rows: [["Mon","TOF Reel: myth bust"],["Tue","MOF Carousel: checklist"],["Wed","TOF Reel: story-based"],["Thu","MOF Reel: personal story"],["Fri","TOF Reel: trending + finance angle"],["Sat","BOF Reel: soft testimonial"],["Sun","Analytics + script Week 3"]] },
              { label: "WEEK 3: OPTIMIZATION", rows: [["Mon","TOF Reel: variation of best Wk1"],["Tue","MOF Carousel: comparison"],["Wed","TOF Reel: data/stat hook"],["Thu","MOF Reel: objection handling"],["Fri","TOF Reel: contrarian #2"],["Sat","BOF Reel: case study"],["Sun","Mid-month deep analytics"]] },
              { label: "WEEK 4: CONVERSION PUSH", rows: [["Mon","TOF Reel: best hook style repeated"],["Tue","MOF Carousel: FAQ"],["Wed","TOF Reel: story-based"],["Thu","BOF Reel: direct CTA"],["Fri","MOF Reel: tutorial + CTA"],["Sat","BOF Story Sequence: assessment promo"],["Sun","Full month review. Plan Month 2."]] },
            ].map((wk, wi) => (
              <div key={wi} style={{ marginBottom: 16 }}>
                <Overline>{wk.label}</Overline>
                <DataTable compact headers={["Day", "Content"]} rows={wk.rows} />
              </div>
            ))}
          </Accordion>

          <Accordion title="Weekly Performance Review SOP" subtitle="30 minutes every Sunday" badge="SOP" isOpen={open.reviewSop} onToggle={() => toggle("reviewSop")}>
            <Callout title="WEEKLY REVIEW PROCESS" variant="teal">
              {[
                { label: "Step 1: Pull data (5 min)", text: "Open IG Insights. Record for each post: views, retention, saves, shares, profile visits, follows." },
                { label: "Step 2: ID top & bottom (5 min)", text: "Which got most views? Most saves? Highest retention? Which underperformed? Why?" },
                { label: "Step 3: Diagnose (10 min)", text: "Underperformer: use Failure Diagnosis table. Top performer: what hook, topic, format, CTA drove results?" },
                { label: "Step 4: Plan next week (10 min)", text: "Create 2 variations of top performer. Replace underperforming topic/format. Score new topics. Write hooks." },
              ].map((s, i) => <div key={i} style={{ marginBottom: 12 }}><strong style={{ color: C.navy900 }}>{s.label}</strong><div style={{ fontSize: 14, color: C.gray600, marginTop: 4 }}>{s.text}</div></div>)}
            </Callout>
          </Accordion>

          {/* Quality Gate */}
          <div style={{ marginTop: 40 }}>
            <SectionHeading overline="QUALITY GATE" title="Self-Audit Checklist" subtitle="Verify every piece of content meets the standard before publishing." />
            <Callout title="MANDATORY CHECKS" variant="navy">
              <BulletList color={C.teal400} items={[
                "Every piece has a clear funnel stage (TOF/MOF/BOF)",
                "Every topic scored 12+ on the Topic Maxing rubric",
                "Every script follows Viral Anatomy: Hook \u2192 Explain \u2192 Illustrate \u2192 Teach",
                "Every script passed the Momentum Audit (but/so test, re-hooks)",
                "Every CTA is specific, measurable, and matched to funnel stage",
                "All links tracked with UTM parameters",
                "Weekly performance review conducted every Sunday",
                "Retention graphs reviewed within 72 hours of posting",
                "Content calendar populated at least 1 week in advance",
                "DMs at cadence (min 20/day Starter, 50/day Serious)",
                "At least 1 BOF piece per week",
                "At least 1 long-form YouTube video per month",
                "Stories posted minimum 3x per day",
                "No generic advice, no filler intros, no unsupported claims",
                "Personality Advantage present: positioning + uniqueness + taste",
              ]} />
            </Callout>
          </div>
        </>)}

        {/* ─── FOOTER ─── */}
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${C.sand300}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: C.gray400 }}>Coastal Wealth \u00b7 Confidential</span>
          <span style={{ fontSize: 13, color: C.gray400 }}>February 2026</span>
        </div>
      </div>
    </div>
  );
}
