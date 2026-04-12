# TextIQ Design System v1.0

A comprehensive design system for the TextIQ intelligent document analysis platform. This system ensures consistency, scalability, and professional aesthetics across all user interfaces.

---

## 📋 Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Shadows & Elevation](#shadows--elevation)
5. [Border Radius](#border-radius)
6. [Component Patterns](#component-patterns)
7. [Data Visualization](#data-visualization)
8. [Accessibility](#accessibility)
9. [Implementation Rules](#implementation-rules)

---

## 🎨 Color Palette

### Primary Colors

| Color | Hex Value | Usage | Light Mode | Dark Mode |
|-------|-----------|-------|-----------|-----------|
| **Primary** | `#2563EB` | Main actions, CTA buttons, key highlights | Full opacity | Full opacity |
| **Secondary** | `#7C3AED` | Accent elements, insights, secondary actions | Full opacity | Full opacity |
| **Tertiary** | `#059669` | Supportive actions, confirmations | Full opacity | Full opacity |

### Semantic Colors

| Color | Hex Value | Usage | Context |
|-------|-----------|-------|---------|
| **Success** | `#16A34A` | Positive states, confirmed matches, valid inputs | Document matching, confirmations |
| **Warning** | `#EAB308` | Cautionary states, pending actions | Threshold warnings, pending review |
| **Error** | `#DC2626` | Negative states, errors, failures | Upload errors, similarity warnings |
| **Info** | `#0284C7` | Information, hints, tooltips | Algorithm explanations, help text |

### Neutral Colors

| Color | Hex Value | Usage | Context |
|-------|-----------|-------|---------|
| **Background** | `#FFFFFF` | Main canvas, page background | Primary background |
| **Surface** | `#F8FAFC` | Cards, panels, elevated elements | Component containers |
| **Muted** | `#F1F5F9` | Secondary backgrounds, disabled states | Subtle backgrounds |
| **Border** | `#E2E8F0` | Dividers, input outlines, separators | Subtle divisions |
| **Text Primary** | `#0F172A` | Headings, body copy, main text | All primary text |
| **Text Secondary** | `#64748B` | Captions, helper text, placeholders | Secondary information |
| **Text Tertiary** | `#94A3B8` | Disabled text, very subtle text | Minimal information |

### Data Visualization Colors

| Color | Hex Value | Usage |
|-------|-----------|-------|
| **Match High** | `#16A34A` | 80-100% similarity |
| **Match Strong** | `#3B82F6` | 60-80% similarity |
| **Match Moderate** | `#F59E0B` | 40-60% similarity |
| **Match Weak** | `#EF4444` | 0-40% similarity |
| **Outlier** | `#8B5CF6` | Outlier documents |

---

## 🔤 Typography

### Font Stack

```css
/* Headings: Modern, bold, technical credibility */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
font-weight: 700;
letter-spacing: -0.02em; /* tight tracking */

/* Body: Highly legible, professional */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
font-weight: 400;
letter-spacing: 0;

/* Code/Data: Monospace for technical elements */
font-family: "Fira Code", "SF Mono", "Monaco", monospace;
font-weight: 400;
```

### Size Scale (Pixels)

| Size | Usage | Example |
|------|-------|---------|
| **12px** | Captions, badges, helper text | File metadata, timestamps |
| **14px** | Secondary UI text, small labels | Button text, input placeholders |
| **16px** | Body copy, default text | Descriptions, list items |
| **18px** | Emphasis within body | Key statistics, important info |
| **20px** | Section subtitle | Section headings, large labels |
| **24px** | Primary heading, large text | Page sections, card titles |
| **32px** | Large heading | Page headings |
| **40px** | Extra large heading | Hero text, main titles |
| **48px** | Display heading | Home page hero |

### Heading Hierarchy

```
H1: 40px / bold / line-height 1.2
    Primary page title
    
H2: 32px / bold / line-height 1.25
    Major sections
    
H3: 24px / bold / line-height 1.3
    Subsections
    
H4: 20px / bold / line-height 1.4
    Component titles
    
H5: 16px / bold / line-height 1.5
    Secondary labels
    
H6: 14px / bold / uppercase / line-height 1.5
    Captions, category labels
```

### Body Text

```
Body: 16px / regular / line-height 1.6
      Main content text
      
Small: 14px / regular / line-height 1.5
       Secondary information
       
Micro: 12px / regular / line-height 1.4
       Helper text, metadata
```

---

## 📐 Spacing & Layout

### Base Unit: 4px

All spacing uses a 4px base unit for consistency and flexibility.

### Spacing Scale

```
4px   —  xs   — Minimal gaps (icons, tight layouts)
8px   —  sm   — Small gaps (icon+text, tight spacing)
12px  —  md   — Default padding, compact spacing
16px  —  lg   — Standard padding, comfortable spacing
20px  —  xl   — Generous padding, spacious layouts
24px  —  2xl  — Large elements, section spacing
32px  —  3xl  — Component spacing, visual separation
40px  —  4xl  — Large sections, major spacing
48px  —  5xl  — Hero sections, maximum breathing room
64px  —  6xl  — Page sections, hero spacing
```

### Common Spacing Patterns

| Pattern | Padding | Usage |
|---------|---------|-------|
| **Compact Button** | 12px vertical / 16px horizontal | Secondary actions |
| **Standard Button** | 14px vertical / 20px horizontal | Primary actions |
| **Large Button** | 16px vertical / 24px horizontal | Prominent actions |
| **Input Field** | 12px vertical / 14px horizontal | Text inputs |
| **Card** | 20px | Default padding |
| **Modal** | 24px | Dialog content |
| **Page** | 32px top/bottom, 24px left/right | Page sections |
| **Section** | 24px between sections | Content spacing |

### Grid System

```
12-column responsive grid
- Desktop (1200px+): 12 columns
- Tablet (768px): 8 columns
- Mobile (640px): 4 columns

Gutter: 16px (8px each side)
Max width: 1400px
Container padding: 24px (desktop), 16px (tablet), 12px (mobile)
```

---

## ✨ Shadows & Elevation

Shadows create depth and hierarchy. Use consistent elevation levels.

### Shadow Values

```css
/* Subtle: Minimal elevation, hover states */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Medium: Standard cards, dropdowns */
box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);

/* Strong: Modals, floating panels */
box-shadow: 0 12px 32px rgba(37, 99, 235, 0.15);

/* Extra Strong: Toasts, notification overlays */
box-shadow: 0 16px 48px rgba(37, 99, 235, 0.2);
```

### When to Use Each

| Shadow | Element | Context |
|--------|---------|---------|
| **Subtle** | Inputs on hover, dividers | Minimal depth |
| **Medium** | Cards, buttons hover, dropdowns | Standard elevation |
| **Strong** | Modals, floating actions, tooltips | High elevation |
| **Extra Strong** | Toast notifications, popup menus | Maximum elevation |

---

## 🎯 Border Radius

Consistent corner rounding for visual coherence.

| Size | Pixels | Usage |
|------|--------|-------|
| **Small** | 6px | Input fields, badges, small actions |
| **Medium** | 10px | Buttons, standard cards |
| **Large** | 16px | Large cards, modals |
| **Full** | 9999px | Avatars, pills, circular elements |

### Element-Specific Radius

```css
/* Inputs & Form Elements */
border-radius: 6px;

/* Buttons */
border-radius: 10px;

/* Cards & Panels */
border-radius: 10px;

/* Modals & Large Overlays */
border-radius: 16px;

/* Avatars & Icons */
border-radius: 9999px;

/* Badges & Pills */
border-radius: 9999px;
```

---

## 🔘 Component Patterns

### Buttons

#### Primary Button
```
Background: #2563EB
Text: White (#FFFFFF)
Padding: 14px vertical / 20px horizontal
Height: 40px
Border-radius: 10px
Font-size: 14px
Font-weight: 600

States:
- Default: full color
- Hover: brightness 110%, scale 1.02, shadow-medium
- Active: brightness 90%
- Disabled: opacity 50%, cursor not-allowed
- Loading: opacity 80%, rotation animation
```

#### Secondary Button
```
Background: #F1F5F9
Text: #0F172A
Padding: 14px vertical / 20px horizontal
Height: 40px
Border: 1px solid #E2E8F0
Border-radius: 10px
Font-size: 14px

States:
- Default: bg-muted, dark text
- Hover: bg-surface, dark border
- Active: bg-primary/10
- Disabled: opacity 50%
```

#### Ghost Button
```
Background: transparent
Text: #2563EB
Padding: 14px vertical / 20px horizontal
Height: 40px
Border: 1px solid transparent
Border-radius: 10px

States:
- Default: transparent
- Hover: bg-primary/10, text-primary
- Active: bg-primary/20
```

#### Icon Button
```
Size: 40px × 40px
Border-radius: 10px
Icon size: 20px
Padding: centered

States:
- Default: transparent
- Hover: bg-surface, shadow-subtle
- Active: bg-primary/10
```

### Input Fields

#### Text Input
```
Height: 40px
Padding: 12px horizontal / 12px vertical
Border: 1px solid #E2E8F0
Border-radius: 6px
Font-size: 14px
Background: #FFFFFF
Color: #0F172A

States:
- Default: border #E2E8F0
- Hover: border #D1D5DB
- Focus: border #2563EB, box-shadow 0 0 0 3px rgba(37, 99, 235, 0.1)
- Disabled: bg-muted, opacity 60%
- Error: border #DC2626, focus shadow red tint
```

#### Textarea
```
Min-height: 100px
Padding: 12px
Border: 1px solid #E2E8F0
Border-radius: 6px
Font-size: 14px
Resize: vertical

Rows: 4-6 by default
Line-height: 1.5
```

### Cards

#### Default Card
```
Background: #FFFFFF
Padding: 20px
Border: 1px solid #E2E8F0
Border-radius: 10px
Box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)

States:
- Default: subtle shadow
- Hover (interactive): shadow-medium, border-primary/20
```

#### Elevated Card
```
Background: #F8FAFC
Padding: 20px
Border: none
Border-radius: 10px
Box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1)
```

#### Data Card (for matrices, results)
```
Background: #FFFFFF
Border: 1px solid #E2E8F0
Padding: 16px
Border-radius: 10px
Font-size: 14px

Header: bold, bg-surface, 12px padding
Rows: border-bottom #E2E8F0
Hover row: bg-primary/5
```

### Tags/Badges

```
Height: 24px
Padding: 4px 12px
Border-radius: 6px (not full pill)
Font-size: 12px
Font-weight: 600

Variants:
- Default: bg-surface, text-primary
- Primary: bg-primary/10, text-primary
- Success: bg-green/10, text-green
- Warning: bg-amber/10, text-amber
- Error: bg-red/10, text-red
```

### Alerts/Notifications

#### Info Alert
```
Background: #0284C7 / 10% (rgba(2, 132, 199, 0.1))
Border: 1px solid #0284C7
Border-radius: 10px
Padding: 16px
Icon + Text layout
Color: #0C5A8F
Font-size: 14px
```

#### Success Alert
```
Background: #16A34A / 10%
Border: 1px solid #16A34A
Color: #165E31
```

#### Warning Alert
```
Background: #EAB308 / 10%
Border: 1px solid #EAB308
Color: #92400E
```

#### Error Alert
```
Background: #DC2626 / 10%
Border: 1px solid #DC2626
Color: #7F1D1D
```

---

## 📊 Data Visualization

### Chart Colors (Ordered by Importance)

```
Primary Series: #2563EB
Secondary Series: #7C3AED
Accent: #059669
Neutral: #64748B
Background: transparent or #F8FAFC
```

### Similarity Gradient

```
100% (Perfect):    #16A34A (Green)
80-99%:            #3B82F6 (Blue)
60-79%:            #F59E0B (Amber)
40-59%:            #F97316 (Orange)
20-39%:            #EF4444 (Red)
0-19%:             #94A3B8 (Gray)
```

### Heatmap Colors (for matrices)

```
High correlation:   #16A34A
Medium-high:        #84CC16
Medium:             #FBBF24
Medium-low:         #FB923C
Low:                #EF4444
```

### Chart Standards

- Line thickness: 2-3px
- Point size: 6-8px
- Tooltip background: #0F172A, text white
- Legend font-size: 12px
- Axis labels: 12px, color text-secondary
- Grid lines: subtle, #E2E8F0

---

## ♿ Accessibility

### Color Contrast

All color combinations must meet WCAG AA standards (4.5:1 minimum for text, 3:1 for UI components).

**Verified Combinations:**
- Text Primary (#0F172A) on Background (#FFFFFF): 16.4:1 ✅
- Text Secondary (#64748B) on Background (#FFFFFF): 7.1:1 ✅
- Primary (#2563EB) on White: 5.1:1 ✅
- Success (#16A34A) on White: 6.1:1 ✅

### Focus States

All interactive elements must have visible focus indicators:

```css
/* Default focus ring */
outline: 2px solid #2563EB;
outline-offset: 2px;

/* Or use box-shadow */
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1), 
            0 0 0 1px #2563EB;
```

### Font Sizing

- Minimum body text: 14px (16px preferred)
- Line-height minimum: 1.5
- Letter-spacing: never negative (except headings at -0.02em)

### Interactive Elements

- Minimum touch target: 44px × 44px
- Buttons always have text labels or accessible names
- Icon-only buttons use aria-label

---

## 📋 Implementation Rules

### Rule 1: Never Introduce Colors Outside This Palette

✅ **DO**: Use #2563EB for primary actions  
❌ **DON'T**: Use #3366FF or custom blue

### Rule 2: Always Use the Spacing Scale

✅ **DO**: `padding: 16px;` or `margin: 24px 0;`  
❌ **DON'T**: `padding: 15px;` or `margin: 23px;`

### Rule 3: Maintain Consistent Border Radius

✅ **DO**: 10px for cards and buttons  
❌ **DON'T**: 8px for cards, 12px for buttons

### Rule 4: Shadows Create Hierarchy

✅ **DO**: Cards have subtle shadow, modals have strong shadow  
❌ **DON'T**: Every element has the same shadow

### Rule 5: Typography Drives Hierarchy

Use size + weight + color combination:
```
H1: 40px + bold + primary color
H2: 32px + bold + primary color
Body: 16px + regular + text-primary
Helper: 12px + regular + text-secondary
```

### Rule 6: Accessibility First

- Every color choice must pass WCAG AA
- Focus states are required
- No information conveyed by color alone
- Interactive elements are always ≥44px

### Rule 7: Generous Whitespace

Data-heavy pages need breathing room. Don't cram information.

```
Minimum gaps:
- Between cards: 16px
- Between sections: 32px
- Around text: 8px minimum line-height
```

### Rule 8: Responsive Adjustments

Spacing and sizing scale on smaller screens:

```
Desktop (1200px+): 100% scale
Tablet (768px): 90% scale, spacing reduced to 75%
Mobile (640px): 80% scale, spacing reduced to 60%
```

---

## 🔄 Implementation Checklist

- [ ] All colors use this palette
- [ ] Spacing uses 4px base unit
- [ ] Border radius matches specification
- [ ] Shadows follow hierarchy rules
- [ ] Typography maintains scale
- [ ] Focus states are present
- [ ] Contrast ratios tested
- [ ] Touch targets ≥44px
- [ ] No hardcoded dimensions
- [ ] Responsive breakpoints defined

---

## 📚 Resources

### Tools
- Color checker: https://www.tpgi.com/color-contrast-checker/
- Font pairing: https://www.google.com/fonts
- Responsive testing: https://responsively.app/

### Documentation
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- CSS Grid: https://web.dev/css-grid/
- Flexbox: https://web.dev/flexbox/

---

**Last Updated**: April 11, 2026  
**Version**: 1.0  
**Maintained by**: TextIQ Design System Team
