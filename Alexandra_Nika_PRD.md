# WEDDING WEBSITE — PRD v1.1
## Alexandra × Nika · ალექსანდრა × ნიკა · Александра × Ника

> **21 ოქტომბერი 2026 · 18:00 · Restaurant ERA · ბათუმი**  
> სტატუსი: ✅ Claude Code-ისთვის მზადაა

---

## 01 — პროექტის მიმოხილვა

**Mission:** შევქმნათ ალექსანდრასა და ნიკას ქორწილის ციფრული მოსაწვევი — სამ ენაზე, Editorial Bold Minimalism სტილში, RSVP სისტემით რომელიც Google Sheets-ში ჩაიწერება.

| პარამეტრი | მნიშვნელობა |
|---|---|
| ტიპი | ქორწილის ციფრული მოსაწვევი |
| Framework | Next.js 14 (App Router) |
| ენები | 🇬🇪 ქართული · 🇷🇺 რუსული · 🇬🇧 ინგლისური |
| RSVP | Google Sheets + Apps Script webhook |
| Hosting | Vercel |
| შემსრულებელი | Claude Code (Anthropic) |

---

## 02 — წყვილი და ღონისძიება

### წყვილი

| | Bride | Groom |
|---|---|---|
| **Latin** | ALEXANDRA | NIKA |
| **ქართული** | ალექსანდრა | ნიკა |
| **Русский** | Александра | Ника |

### ღონისძიების დეტალები

| | |
|---|---|
| 📅 თარიღი | 21 ოქტომბერი 2026 — ოთხშაბათი |
| ⏰ დრო | 18:00 |
| 📍 ადგილი | Restaurant ERA — რესტორანი ერა |
| 🏠 მისამართი | ბათუმი, აფსაროსის 41 |
| 🌐 საიტი | era-hall.ge |
| 📞 ტელეფონი | +995 599 023 285 |
| 👥 სიმძლავრე | 350 სტუმარი · 3 სართული |
| 🍽 სამზარეულო | ქართულ-ევროპული |
| 🎵 გართობა | ცოცხალი მუსიკა |
| 👔 დრეს კოდი | არ არის — თავისუფალი სტილი |
| 📝 RSVP ვადა | შეუზღუდავი |
| 🌐 დომეინი | TBD — მოგვიანებით |

---

## 03 — დიზაინ სისტემა

**სტილი:** Editorial Bold Minimalism  
**პრინციპი:** ნაკლები ელემენტი, მეტი გავლენა. Sections: *cream → black → cream*

### ფერთა პალიტრა

| ფერი | HEX | გამოყენება |
|---|---|---|
| 🟤 CREAM | `#EAE6DD` | მთავარი ფონი — light სექციები |
| ⚫ BLACK | `#111111` | dark სექციები — hero, navbar |
| 🔴 ACCENT | `#F05235` | CTA, highlight, handwriting — სპარინგლი |

### ტიპოგრაფია

| როლი | შრიფტი | გამოყენება |
|---|---|---|
| Display | **Bebas Neue** | სათაურები, Hero, section names |
| Body | **DM Sans** | paragraphs, labels, UI |
| Accent | **Caveat** (handwriting) | 1-2 სიტყვა, highlight |
| Hero Title | `clamp(80px, 12vw, 180px)` | viewport-ზე დამოკიდებული |
| Section Title | `clamp(60px, 9vw, 130px)` | |
| Body | `16-18px · line-height: 1.6` | |

### GSAP ანიმაცია — პლაგინები

| პლაგინი | ფასი | გამოყენება |
|---|---|---|
| **ScrollTrigger** | უფასო | Scroll-based reveal + parallax სურათები 30% სიჩქარით |
| **Flip** | უფასო | Layout transitions — language switcher, RSVP confirm state |
| **DrawSVG** | Club ⚠️ | SVG path animation — სახელები და 21.10.2026 "ხატდება" |
| **SplitText** | Club ⚠️ | სათაურები ასო/სიტყვებად — stagger 0.08s, y:120→0 |

> ⚠️ **DrawSVG + SplitText** საჭიროებს GreenSock Club ანგარიშს → [gsap.com](https://gsap.com)

---

## 04 — ფუნქციონალური მოთხოვნები

| Feature | Priority | შენიშვნა |
|---|---|---|
| Hero — სახელები + თარიღი + Countdown | `Must Have` | სამ ენაზე |
| Countdown Timer (real-time) | `Must Have` | ანიმაციური |
| ჩვენი ისტორია — Our Story | `Must Have` | Claude დაეხმარება |
| ლოკაცია + Google Maps | `Must Have` | ERA Hall embed |
| RSVP ფორმა → Google Sheets | `Must Have` | Apps Script webhook |
| ფოტო გალერეა | `Must Have` | Engagement Shoot |
| სამ ენაზე — ქარ/რუს/ინგ | `Must Have` | next-intl |
| Responsive — mobile-first | `Must Have` | iOS + Android |
| Google Sheets ადმინ dashboard | `Must Have` | RSVP სია |
| ღონისძიების პროგრამა / განრიგი | `Should Have` | TBD |
| ემეილ შეტყობინება RSVP-ზე | `Should Have` | GAS MailApp |
| Noise texture overlay | `Nice to Have` | opacity: 4% |
| Custom cursor | `Nice to Have` | magnetic ეფექტი |

---

## 05 — გვერდის სტრუქტურა

```
01  HERO         [black bg]   სახელები + countdown + SplitText ანიმაცია
02  OUR STORY    [cream bg]   ჩვენი ისტორია + polaroid ±3° ფოტო
03  GALLERY      [black bg]   Engagement Shoot · masonry layout
04  PROGRAM      [cream bg]   განრიგი (TBD) · vertical timeline
05  LOCATION     [black bg]   Google Maps embed · ERA Hall info
06  RSVP         [cream bg]   ფორმა → Google Sheets · auto-email
```

---

## 06 — ტექნოლოგიური სტეკი

| კატეგორია | ტექნოლოგია |
|---|---|
| Framework | **Next.js 14** — App Router · SSR + Static |
| სტილი | **Tailwind CSS** + CSS Custom Properties |
| ანიმაცია | **GSAP** + ScrollTrigger + DrawSVG + Flip + SplitText |
| Display Font | Bebas Neue (Google Fonts) |
| Body Font | DM Sans (Google Fonts) |
| Accent Font | Caveat — handwriting (Google Fonts) |
| i18n | next-intl — ქარ/რუს/ინგ |
| RSVP Backend | Google Apps Script — doPost webhook |
| მონ. ბ. | Google Sheets |
| ემეილი | GAS MailApp.sendEmail() |
| რუქა | Google Maps Embed API |
| Hosting | Vercel |
| დომეინი | TBD — (alexandra-nika.ge ან სხვა) |

---

## 07 — მრავალენოვნება

| კომპონენტი | 🇬🇪 ქართული | 🇷🇺 რუსული | 🇬🇧 ინგლისური |
|---|---|---|---|
| Hero title | ALEXANDRA × NIKA | ALEXANDRA × НИКА | ALEXANDRA × NIKA |
| ქვე-სათაური | ალექსანდრა და ნიკა | Александра и Ника | Alexandra & Nika |
| Countdown | დარჩა: Xდ Xსთ Xწთ | Осталось: Xд Xч Xм | Time left: Xd Xh Xm |
| RSVP ღილაკი | დადასტურება | Подтвердить | Confirm |
| ადგილი | ბათუმი, ერა | Батуми, Эра | Batumi, ERA |
| კითხვა | მოხვალ? | Придёте? | Will you attend? |

---

## 08 — RSVP სისტემა

### ფორმის ველები
- სახელი + გვარი `*სავალდებულო`
- მოდიხარ? — კი / ვერ მოვიდი `*სავალდებულო`
- სტუმართა რაოდენობა — 1 / 2 / 3+
- დამატებითი კომენტარი

### ნაკადი
```
სტუმარი ავსებს ფორმას
    → fetch POST request
    → Google Apps Script doPost()
    → Google Sheets-ში ჩაწერა
    → ემეილი წყვილს (MailApp)
    → Confirmation message სტუმარს
```

### Sheets სვეტები
`Timestamp | სახელი | მოდის? | რაოდ. | კომ. | ენა`

---

## 09 — სამუშაო გეგმა

| # | სამუშაო | ხანგრძ. | სტატუსი |
|---|---|---|---|
| 1 | PRD + დიზაინ სისტემა | 2 დღე | 🟠 მიმდინარე |
| 2 | ჩვენი ისტორიის ტექსტი | 1 დღე | ⬜ მოლოდინი |
| 3 | Wireframe + Mockup | 2-3 დღე | ⬜ მოლოდინი |
| 4 | Claude Code — Next.js Frontend | 5-7 დღე | ⬜ მოლოდინი |
| 5 | GSAP: ScrollTrigger + DrawSVG + Flip + SplitText | 3-4 დღე | ⬜ მოლოდინი |
| 6 | Google Sheets RSVP + i18n | 1-2 დღე | ⬜ მოლოდინი |
| 7 | Engagement Shoot ინტეგრაცია | 1 დღე | ⬜ მოლოდინი |
| 8 | ტესტირება + კორექტ. + Deploy | 2-3 დღე | ⬜ მოლოდინი |
| 9 | დომეინი + Production Launch | 1 დღე | ⬜ მოლოდინი |

---

## 10 — შემდეგი ნაბიჯები

- [x] PRD დამტკიცება
- [ ] "ჩვენი ისტორიის" ტექსტი — Claude-სთან ერთად
- [ ] დომეინის სახელის გადაწყვეტა
- [ ] Engagement Shoot ფოტოები
- [ ] ღონისძიების პროგრამა / განრიგი
- [ ] GSAP Club ანგარიში (DrawSVG + SplitText)
- [ ] Claude Code-ში გაგზავნა → კოდის დაწყება

---

## Claude Code Prompt

```
Build a wedding invitation website with the following specs:

Names: Alexandra & Nika (ალექსანდრა & ნიკა / Александра & Ника)
Date: October 21, 2026 at 18:00
Venue: Restaurant ERA, Afsarosis 41, Batumi, Georgia

Stack:
- Next.js 14 (App Router)
- Tailwind CSS
- GSAP + ScrollTrigger + DrawSVG + Flip + SplitText
- next-intl (Georgian / Russian / English)
- Google Apps Script → Google Sheets (RSVP)

Design: Editorial Bold Minimalism
- Colors: #EAE6DD (cream), #111111 (black), #F05235 (accent red)
- Fonts: Bebas Neue (display), DM Sans (body), Caveat (handwriting)
- Sections alternate: cream → black → cream

Sections: Hero + Countdown, Our Story, Photo Gallery,
          Event Program, Location + Maps, RSVP Form

Start by scaffolding the project and installing all dependencies.
```

---

*PRD v1.1 · 04 მაისი 2026 · Created with Claude AI*  
**ALEXANDRA × NIKA · 21.10.2026 · ERA HALL · BATUMI**
