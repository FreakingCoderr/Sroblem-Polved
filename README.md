# Chaos Click

**A website that gets worse with every click.**

Built for **VibeHack '26: Build. Break. Laugh.** (Concetto, IITISM Dhanbad), organised by the Web Development Division, Cyber Labs.

- **Challenge prompt:** *Chaos Click – Create a website that becomes progressively more chaotic every time the user clicks or interacts with it.*
- **Format:** 6-hour team contest, mystery prompt
- **Team:** _Team name, member names_

---

## The idea

There is one button. The page asks you not to click it, then dares you to. Every click escalates the chaos: colours change, the layout tilts, fake popups multiply, decoy buttons appear, and the page eventually flips upside down and crashes with a fake blue screen.

The point is **controlled** chaos. The page is deliberately annoying but never broken: it always loads, always responds, and always has an escape hatch.

## How we interpreted the prompt

"Progressively more chaotic" means a clear ramp, not random noise from the start. So we built it in tiers:

1. **Gentle (clicks 1-3):** a few harmless surprises: background colour, a jumping button, emoji bursts, a screen shake.
2. **Annoying (from click 2):** the button jitters, the page tilts, fonts change, fake system popups appear, and the click counter lies.
3. **Hostile (from click 4):** the page can flip upside down, apply filters (invert, blur, contrast), spawn decoy buttons, and change the cursor.
4. **Meltdown:** more effects fire per click as the count rises, and milestone events interrupt you.

Every click also adds a taunt, a beep, and a higher "chaos level" label, so progress is visible and the escalation tells a story.

## Click timeline (full demo = 20 clicks)

| Click | What happens |
|-------|--------------|
| 1 | "Great. Now you have started." |
| 2 | Button starts jittering ("nervous"); tilt, fonts, popups, lying counter unlock |
| 4 | Scrolling "STOP CLICKING" banner; flip, filters, decoy buttons, cursor changes unlock |
| 7 | "We are now speaking in popups." |
| 8 | Button starts renaming itself ("OW", "WHY?", "TOO LATE") |
| 10 | Fake "Calculating your reward... 99%" screen that ends in "nothing" |
| 20 | Fake blue screen of death; click 3 times to restart |

Chaos level labels: Calm → Curious → Nervous → Suspicious → Unhinged → Cursed → Haunted → Apocalyptic (changes every 2 clicks).
The number of effects per click grows over time, up to 5 at once.

## Features

- Button that jumps around and resizes
- Emoji explosions and screen shake
- Random background colours and fonts
- Page tilt and full upside-down flip
- Visual filters (invert, hue-rotate, blur, contrast)
- Fake Windows-style popups; the X button spawns another popup, and OK counts as a click
- Decoy buttons ("FREE MONEY", "DO NOT CLICK") that also count as clicks
- A click counter that sometimes lies
- Rotating taunts and random beeps (Web Audio API) with a mute button
- Fake reward screen and fake blue screen of death
- Instant reset for demos

## Controls

| Action | Result |
|--------|--------|
| Click the red button | Starts and escalates the chaos |
| 🔊 button (top-right) | Mute / unmute sounds |
| **Esc** or the tiny "calm down" link | Resets everything instantly |

## Tech stack

Plain **HTML, CSS and JavaScript**. No frameworks, no libraries, no backend, no internet needed.

We chose this on purpose: with only 6 hours, zero setup time and no dependencies means nothing can break from a version mismatch or bad venue Wi-Fi, and every team member can read and explain every line.

## Project structure

```
chaos-click/
├── index.html   # page structure
├── style.css    # styling and animations
├── script.js    # click counter, effects, milestones
└── README.md
```

## How to run

1. Download or clone the folder (keep all three files together, names unchanged).
2. Open `index.html` in a modern browser (Chrome, Edge or Firefox).

Optional: in VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

Sound needs one click first (browsers block audio until the user interacts), which is fine because the whole page starts with a click.

## How it works (for the Q&A)

- `hit()` in `script.js` runs on every click. It increases the counter, updates the chaos level, plays a beep, shows a taunt, and picks random effects from a pool.
- The **pool grows** with the click count: tier 1 effects at the start, more at click 2, and the nastiest at click 4. The **number of effects per click** also grows (`1 + floor(n / 3)`, capped at 5).
- Each effect is a small function in an object `E` (background, move, size, shake, emoji, tilt, font, popup, lie, flip, filter, decoy, cursor).
- `mile()` fires fixed milestone events (banner, reward screen, blue screen) at specific click counts.
- Popups and decoys are capped (6 and 10) so the page stays usable and never freezes.
- Everything lives inside a `#stage` container, so tilting, flipping and filtering affect the whole page without touching the reset controls.

## Evaluation criteria and how we address them

| Criterion (25 marks each) | Our approach |
|---------------------------|--------------|
| **Product** | A complete, reliable experience: loads instantly, never crashes, funny at every stage, with a clear start and a clear finale |
| **Prompt interpretation** | Chaos that ramps in tiers and milestones, so "progressively more chaotic" is something you can see and count |
| **Presentation** | A 20-click demo that shows the full arc in 1-2 minutes, with a narrated escalation and a built-in reset |
| **Process** | Small, dependency-free stack, a clear split of work, and a feature freeze before demo prep |

## Demo script (3-5 minutes)

1. **Hook:** "Every click makes this page worse, and the page knows it."
2. **Clicks 1-3:** point out how gentle it starts, then say the page is just warming up.
3. **Clicks 4-8:** narrate the tilt, popups, flip and decoys as they appear. Mention the lying counter.
4. **Click 10:** let the reward screen play out.
5. **Click 20:** finish on the blue screen, then press **Esc** to reset.
6. **Close:** explain the design (tiers, milestones, caps so it never breaks) and where we'd go next.

## Rules compliance

- Built during the event window.
- Runnable website with a 3-5 minute demo and a brief explanation.
- Every team member can explain the code and the design decisions.

## AI assistance

AI tools were used during development, as allowed by the rules (_edit this section to describe exactly what your team did yourselves versus what AI helped with_). The team reviewed, tested and understands all the code that is presented.

## Possible next steps

- A fake "Are you sure you want to leave?" prompt
- A button that fakes a download
- A voice that insults the clicker
- A persistent "regret score" across sessions
- Mobile-specific chaos (shake, vibrate)

## Team

| Name | Role |
|------|------|
| _Name_ | _Logic / JavaScript_ |
| _Name_ | _Visuals / CSS_ |
| _Name_ | _Copy and humour_ |
| _Name_ | _Demo and presentation_ |

---

*Warning: contains flashing colours, sudden sounds and aggressive popups. Click responsibly.*
