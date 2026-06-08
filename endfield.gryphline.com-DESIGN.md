# Design System Inspired by Arknights: Endfield

## 1. Visual Theme & Atmosphere

The Arknights: Endfield design system embodies a bold, high-contrast aesthetic rooted in contemporary gaming UI culture. It merges minimalist geometric precision with vibrant tactical accents, creating an atmosphere of strategic intensity and technological modernity. The palette juxtaposes deep charcoal and pure black with electric yellow highlights and stark white surfaces, evoking a command-center interface optimized for clarity under pressure. The design radiates confidence through aggressive negative space, sharp angular forms, and deliberately restrained ornamentation—every element serves tactical function. This is a system built for action, where information hierarchy cuts through visual noise and interactive affordances remain unmistakable.

**Key Characteristics**
- Ultra-high contrast monochromatic base with electric accent punctuation
- Minimalist geometric language with sharp, clean edges
- Dark-dominant theme optimized for extended viewing and tactical focus
- Strategic use of warning yellow for critical interactive states
- Precision-driven spacing and alignment supporting rapid UI scanning
- Modern sans-serif typography emphasizing legibility at all scales
- Zero decorative flourish; every visual element carries functional intent

## 2. Color Palette & Roles

### Primary
- **Deep Charcoal** (`#231815`): Brand anchor color for subtle warmth in dark backgrounds and secondary UI elements; conveys sophistication and depth.

### Accent Colors
- **Electric Yellow** (`#FFFA00`): High-visibility accent for warnings, active states, and critical call-to-action elements; commands immediate attention in tactical contexts.
- **Bright Blue** (`#007AFF`): Secondary accent for interactive states, links, and secondary actions; provides cool counterbalance to warm charcoal and hot yellow.

### Interactive
- **Pure Black** (`#000000`): Primary dark surface and text color for maximum contrast; default state for interactive elements and layered overlays.
- **Off-White** (`#FFFFFF`): Default light text, borders, and ghost interactive states; ensures readability across dark backgrounds.

### Neutral Scale
- **Charcoal 1** (`#191919`): Secondary dark surface; used for secondary cards, modal overlays, and intermediate-contrast sections.
- **Gray 1** (`#7C7C7C`): Mid-tone text and disabled state color; provides visual rest between pure black and lighter neutrals.
- **Gray 2** (`#B3B3B3`): Subtle borders, dividers, and tertiary text; maintains visual hierarchy without introducing competing colors.
- **Gray 3** (`#BFBFBF`): Fine-line borders and secondary dividers; allows layered visual separation without harshness.
- **Gray 4** (`#CCCCCC`): Light borders, subtle background modulation, and secondary surface accents.
- **Gray 5** (`#D9D9D9`): Lightest neutral; used sparingly for minimal borders and ghost backgrounds.

### Surface & Borders
- **Dark Surface** (`#000000`): Primary background for main viewport and full-bleed sections.
- **Secondary Surface** (`#191919`): Card backgrounds, secondary panels, and layered content containers.
- **Tertiary Surface** (`#231815`): Subtle background modulation for deep-layered surfaces or brand-warm accents.
- **Border Neutral** (`#CCCCCC`, `#BFBFBF`, `#B3B3B3`): Hierarchical borders from subtle to pronounced, depending on visual weight required.

## 3. Typography Rules

### Font Family
- **Primary**: `Novecentosanswide-DemiBold`, fallback `'Novecentosanswide', sans-serif`
- **Secondary**: `SansMedium`, fallback `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- **Tertiary**: `sans-serif` (system default)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Novecentosanswide-DemiBold | 48px | 700 | 52px | -0.5px | Large cinematic headlines; brand-dominant messaging |
| Heading 1 | Novecentosanswide-DemiBold | 36px | 700 | 40px | -0.3px | Section headers and primary navigation labels |
| Heading 2 | Novecentosanswide-DemiBold | 28px | 700 | 32px | -0.2px | Subsection headers and card titles |
| Heading 3 | Novecentosanswide-DemiBold | 20px | 600 | 24px | 0px | Secondary headings and category labels |
| Body Large | SansMedium | 16px | 400 | 22px | 0.3px | Primary body copy and longer narrative text |
| Body Medium | SansMedium | 14px | 400 | 20px | 0.2px | Standard body text, descriptions, and UI labels |
| Button Text | SansMedium | 15.75px | 400 | 15.75px | 0.5px | Call-to-action buttons and interactive controls |
| Caption / Small | sans-serif | 12px | 400 | 16px | 0.1px | Timestamps, metadata, and secondary information |
| UI Label | Novecentosanswide-DemiBold | 12.375px | 400 | 12.375px | 0.8px | Compact UI labels and abbreviated text |
| Code / Monospace | `'Courier New', monospace` | 12px | 400 | 16px | 0px | System messages and technical content |

### Principles
- **Precision over decoration**: Typography serves information hierarchy exclusively; no stylistic variation unnecessary to function.
- **Contrast-driven legibility**: All text must achieve WCAG AA minimum 4.5:1 contrast on intended backgrounds.
- **Compact vertical rhythm**: Line heights are lean and purposeful; excessive leading breaks scanning flow.
- **Demi-bold anchors**: Novecentosanswide-DemiBold used for headers and tactical labels; establishes visual weight and brand presence.
- **Responsive scaling**: At mobile breakpoints, reduce all display/heading sizes by 15–20% to maintain readable metrics on constrained viewports.

## 4. Component Stylings

### Buttons

**Primary Action Button**
- `background-color`: `#FFFFFF`
- `color`: `#191919`
- `font-size`: `15.75px`
- `font-weight`: `400`
- `font-family`: `SansMedium, sans-serif`
- `padding`: `12px 24px`
- `border-radius`: `2px`
- `border`: `none`
- `box-shadow`: `none`
- `line-height`: `15.75px`
- **Hover state**: `background-color: #D9D9D9; color: #000000`
- **Active state**: `background-color: #CCCCCC; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1)`
- **Disabled state**: `background-color: #B3B3B3; color: #7C7C7C; cursor: not-allowed`

**Secondary Action Button**
- `background-color`: `#F2F2F2`
- `color`: `#191919`
- `font-size`: `9px`
- `font-weight`: `400`
- `font-family`: `sans-serif`
- `padding`: `8px 12px`
- `border-radius`: `2.25px`
- `border`: `1px solid #CCCCCC`
- `box-shadow`: `none`
- `height`: `42.75px`
- `width`: `42.75px`
- **Hover state**: `background-color: #E8E8E8; border-color: #B3B3B3`
- **Active state**: `background-color: #FFFFFF; border-color: #7C7C7C`

**Ghost / Tertiary Button**
- `background-color`: `transparent`
- `color`: `#191919`
- `font-size`: `9px`
- `font-weight`: `400`
- `font-family`: `sans-serif`
- `padding`: `8px 16px 8px 40.5px`
- `border-radius`: `4px`
- `border`: `1px solid transparent`
- `box-shadow`: `none`
- **Hover state**: `background-color: rgba(0, 0, 0, 0.05); border-color: #BFBFBF`
- **Active state**: `background-color: rgba(0, 0, 0, 0.1); color: #000000`
- **Focus state**: `outline: 2px solid #007AFF; outline-offset: 2px`

**Icon Button (Square)**
- `background-color`: `#F2F2F2`
- `color`: `#191919`
- `font-size`: `16px`
- `padding`: `8px`
- `border-radius`: `2.25px`
- `border`: `none`
- `width`: `42.75px`
- `height`: `42.75px`
- **Hover state**: `background-color: #E8E8E8`
- **Active state**: `background-color: #CCCCCC`

### Cards & Containers

**Default Card**
- `background-color`: `#191919`
- `color`: `#FFFFFF`
- `padding`: `20px 24px`
- `border-radius`: `0px`
- `border`: `1px solid #BFBFBF`
- `box-shadow`: `0 4px 12px rgba(0, 0, 0, 0.3)`

**Elevated Card**
- `background-color`: `#1F1F1F`
- `color`: `#FFFFFF`
- `padding`: `24px 32px`
- `border-radius`: `0px`
- `border`: `1px solid #CCCCCC`
- `box-shadow`: `0 8px 24px rgba(0, 0, 0, 0.4)`

**Ghost Card**
- `background-color`: `transparent`
- `color`: `#FFFFFF`
- `padding`: `16px 20px`
- `border-radius`: `0px`
- `border`: `1px solid #7C7C7C`
- `box-shadow`: `none`

### Inputs & Forms

**Text Input (Default)**
- `background-color`: `#191919`
- `color`: `#FFFFFF`
- `font-size`: `14px`
- `font-family`: `SansMedium, sans-serif`
- `padding`: `12px 16px`
- `border-radius`: `0px`
- `border`: `1px solid #BFBFBF`
- `line-height`: `20px`
- **Hover state**: `border-color: #CCCCCC`
- **Focus state**: `border-color: #007AFF; box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2)`
- **Disabled state**: `background-color: #0F0F0F; color: #7C7C7C; border-color: #7C7C7C`

**Text Input (Error)**
- `background-color`: `#191919`
- `color`: `#FFFFFF`
- `border`: `1px solid #FF5555`
- `box-shadow`: `0 0 0 2px rgba(255, 85, 85, 0.1)`

**Checkbox**
- `width`: `20px`
- `height`: `20px`
- `background-color`: `#191919`
- `border`: `2px solid #CCCCCC`
- `border-radius`: `0px`
- **Checked state**: `background-color: #007AFF; border-color: #007AFF`
- **Focus state**: `outline: 2px solid #FFFA00; outline-offset: 2px`

**Radio Button**
- `width`: `20px`
- `height`: `20px`
- `background-color`: `#191919`
- `border`: `2px solid #CCCCCC`
- `border-radius`: `50%`
- **Checked state**: `border-color: #007AFF; box-shadow: inset 0 0 0 6px #007AFF`

### Navigation

**Main Navigation Bar**
- `background-color`: `#000000`
- `color`: `#FFFFFF`
- `height`: `64px`
- `padding`: `0 32px`
- `border-bottom`: `1px solid #191919`
- **Font**: `Novecentosanswide-DemiBold, 18px, weight 700`

**Navigation Link (Default)**
- `color`: `#FFFFFF`
- `font-size`: `14px`
- `font-weight`: `400`
- `font-family`: `sans-serif`
- `padding`: `8px 16px`
- `text-decoration`: `none`
- `line-height`: `19.6px`
- **Hover state**: `color: #FFFA00; text-decoration: underline`
- **Active state**: `color: #FFFA00; border-bottom: 2px solid #FFFA00`

**Navigation Link (Secondary)**
- `color`: `#B3B3B3`
- `font-size`: `12px`
- `padding`: `6px 12px`
- **Hover state**: `color: #FFFFFF`
- **Active state**: `color: #FFFA00`

**Breadcrumb**
- `font-size`: `12px`
- `color`: `#7C7C7C`
- `separator`: `/` in `#BFBFBF`
- **Active link color**: `#FFFFFF`

### Progress Bar

**Default Progress Bar**
- `height`: `4px`
- `background-color`: `#191919`
- `border-radius`: `0px`
- `border`: `none`
- **Fill color**: `#FFFA00`
- **Fill background-color**: `#FFFA00`
- **Indeterminate animation**: `linear-gradient(90deg, transparent, #FFFA00, transparent)` moving left-to-right at `1.5s` interval

### Badge

**Default Badge**
- `background-color`: `#FFFA00`
- `color`: `#000000`
- `font-size`: `11px`
- `font-weight`: `600`
- `padding`: `4px 8px`
- `border-radius`: `2px`
- `display`: `inline-block`

**Secondary Badge**
- `background-color`: `#191919`
- `color`: `#FFFFFF`
- `border`: `1px solid #CCCCCC`
- `padding`: `4px 8px`

## 5. Layout Principles

### Spacing System

Base unit: `4px`

**Scale**:
- XS: `4px` (micro-gaps, internal component spacing)
- SM: `8px` (button padding, small gaps)
- MD: `12px` (component padding, moderate gaps)
- LG: `16px` (section padding, standard gaps)
- XL: `24px` (container padding, major spacers)
- 2XL: `32px` (large section spacing)
- 3XL: `40px` (major layout division)
- 4XL: `64px` (page-level spacing)

**Usage contexts**:
- Button internal padding: `MD (12px)` horizontal, `SM (8px)` vertical
- Card padding: `LG (16px)` compact, `XL (24px)` standard, `2XL (32px)` spacious
- Section margins: `3XL (40px)` between major sections
- Gap between list items: `MD (12px)` to `LG (16px)`

### Grid & Container

**Max width**: `1440px` (desktop), `1200px` (widescreen tablets)

**Column strategy**: 12-column flexible grid
- Desktop: full 12 columns available; standard content spans 8–10 columns
- Tablet: 12 columns collapse to 8 columns with adjusted gutters (`16px`)
- Mobile: 12 columns collapse to 4 columns with adjusted gutters (`8px`)

**Container breakout patterns**:
- Full-bleed hero sections extend beyond container at `0px` margin
- Sidebar layouts use asymmetric grids: `3 columns (sidebar) + 9 columns (content)` on desktop
- Card grids maintain `2–4 columns` depending on viewport

### Whitespace Philosophy

Whitespace in this system serves tactical clarity. Generous negative space allows UI elements to "breathe" and accelerates visual scanning in high-pressure contexts. Avoid cluttering related items; instead, use consistent `LG (16px)` to `XL (24px)` gaps to group logical clusters. Embrace empty space around call-to-action elements to draw focus. Vertical rhythm is tight but deliberate—use line-height and margin harmoniously to establish clear visual stacking.

### Border Radius Scale

- **Minimal**: `0px` — Default; primary architecture for sharp, tactical interfaces
- **Soft minimal**: `2px` — Button corners, small interactive elements; subtle humanization
- **Soft**: `4px` — Input fields, modals, secondary cards; balance precision with approachability
- **Rounded**: `8px` — Large cards, major containers; rare, reserved for brand-forward moments
- **Full**: `50%` — Radio buttons, circular avatars, status indicators

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 (Flat) | No shadow | Background surfaces, disabled states, flat typography |
| 1 (Subtle) | `0 2px 4px rgba(0, 0, 0, 0.2)` | Ghost buttons, secondary navigation items, dividers |
| 2 (Raised) | `0 4px 8px rgba(0, 0, 0, 0.25)` | Default cards, primary buttons on hover, tooltips |
| 3 (Lifted) | `0 8px 16px rgba(0, 0, 0, 0.3)` | Elevated cards, modal overlays, dropdown menus |
| 4 (Floating) | `0 12px 24px rgba(0, 0, 0, 0.35)` | Floating action buttons, major modals, tooltips |
| 5 (Highest) | `0 16px 32px rgba(0, 0, 0, 0.4)` | Full-screen overlays, stacked modals, topmost UI layers |

**Shadow Philosophy**

Shadows are restrained and never decorative. They exist solely to communicate layering hierarchy—what floats above, what recedes beneath. In this dark-dominant system, subtle shadows prevent UI from blending into the background. Shadows use pure black (`rgba(0, 0, 0, ...)`) at varying opacity to maintain visual cohesion. Avoid colored shadows; they introduce unnecessary complexity and violate the minimalist ethos. Shadows sharpen on hover/focus to reinforce interactivity.

## 7. Do's and Don'ts

### Do
- **Use high contrast**: Ensure all text hits minimum 4.5:1 contrast. Pair `#000000` background with `#FFFFFF` text; avoid mid-tones on mid-tones.
- **Keep borders sharp**: Maintain `0px` or `2px` border radius on primary UI. Reserve `4px` for input fields and secondary containers only.
- **Deploy yellow strategically**: Use `#FFFA00` exclusively for warnings, active states, and critical CTAs. Never use it for neutral elements.
- **Align to the 4px grid**: All spacing, padding, and sizing must be multiples of `4px`. This ensures precision and scalability.
- **Embrace negative space**: Allow breathing room around interactive elements. Cards and buttons should not crowd the viewport.
- **Maintain typographic hierarchy**: Use `Novecentosanswide-DemiBold` for anchors (headers, labels); reserve `SansMedium` and `sans-serif` for body and secondary content.
- **Test at mobile**: Verify button hit targets meet `44px` minimum. Reduce heading sizes by 15–20% on phones.
- **Layer consistently**: Use the 6-level shadow scale; never improvise elevations.

### Don't
- **Mix color languages**: Avoid introducing colors outside the defined palette. Every UI element must map to a semantic role.
- **Over-round corners**: Rounded corners soften precision; keep border radius at `0px` or `2px` for primary UI. Only soften where brand personality demands it.
- **Use color alone to communicate status**: Pair yellow accents with icons, text labels, or other visual cues. Color-blind users must parse information without relying on hue alone.
- **Nest modals excessively**: Limit modal stacking to 2 levels. Deeper stacks create cognitive overload and navigation confusion.
- **Crowd interactive elements**: Buttons and clickable targets should have at least `8px` of surrounding space. Prevent accidental mis-taps.
- **Fade text into background**: Mid-tone grays (`#7C7C7C`, `#B3B3B3`) work for secondary labels only, never primary content. High contrast is non-negotiable.
- **Disable hover states**: Every interactive element must respond visually to hover/focus. Users need clear feedback that an element is actionable.
- **Ignore focus states**: Always provide visible focus indicators (e.g., `outline: 2px solid #007AFF`). Keyboard navigation must be equally discoverable as mouse interaction.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | `320px–767px` | 4-column grid, `8px` gutters, single-column navigation, reduced heading sizes (–20%), button padding `8px 12px`, full-width cards |
| Tablet | `768px–1199px` | 8-column grid, `16px` gutters, 2-column layouts possible, heading sizes –15%, navigation sidebar or top bar with icons, `12px` button padding |
| Desktop | `1200px–1439px` | 12-column grid, `24px` gutters, multi-column layouts enabled, full heading sizes, horizontal navigation, `12px 24px` button padding |
| Wide | `1440px+` | Max-width container `1440px` centered, asymmetric grid layouts (3+9 columns), generous spacing, full interactive richness |

### Touch Targets

- **Minimum size**: `44px × 44px` for all interactive elements (buttons, links, checkboxes, radio buttons)
- **Mobile spacing**: At least `8px` gap between adjacent touch targets to prevent mis-taps
- **Icon buttons**: `44px × 44px` or larger; internal icon `24px` or `32px`
- **Text links**: Wrap in `44px` vertical rhythm; increase padding on touch devices (e.g., `12px` vertical on mobile vs. `8px` on desktop)

### Collapsing Strategy

- **Navigation**: Top horizontal bar on desktop → hamburger menu or bottom tab bar on mobile
- **Sidebar layouts**: Full sidebar on desktop (3 columns) → collapsible sidebar or modal drawer on tablet/mobile
- **Card grids**: 4 columns on desktop → 2 columns on tablet → 1 column on mobile
- **Typography**: Reduce display/heading sizes by 15–20% on mobile; maintain body size but increase line height for legibility
- **Padding**: Container padding `32px` on desktop → `20px` on tablet → `16px` on mobile
- **Modal dialogs**: Full-screen overlay on mobile (100% width/height with `16px` margins); centered on desktop (`80vw` max-width)
- **Images & media**: Maintain aspect ratios; scale proportionally down to mobile; never distort
- **Tables**: Transform to vertical card layout on mobile; rows become collapsed "detail views" with labels

## 9. Agent Prompt Guide

### Quick Color Reference

Use this mapping to implement colors without referencing the full palette:

- **Primary background**: `#000000` (pure black, main canvas)
- **Secondary background**: `#191919` (dark charcoal, cards/panels)
- **Tertiary background**: `#231815` (warm dark, subtle accents)
- **Primary text**: `#FFFFFF` (white, on dark backgrounds)
- **Secondary text**: `#CCCCCC` (light gray, reduced emphasis)
- **Tertiary text**: `#7C7C7C` (mid gray, disabled/hints)
- **Primary CTA**: `#FFFFFF` on `#FFFFFF` background with `#191919` text
- **Primary CTA hover**: `#D9D9D9`
- **Warning / Accent**: `#FFFA00` (electric yellow)
- **Secondary accent**: `#007AFF` (bright blue)
- **Borders (primary)**: `#CCCCCC`
- **Borders (secondary)**: `#BFBFBF`
- **Borders (tertiary)**: `#B3B3B3`

### Iteration Guide

Follow these 10 rules for rapid, accurate implementation:

1. **Every button must have a visible hover state**: Adjust color or shadow; never leave interaction unmarked.

2. **All text must hit 4.5:1 contrast minimum**: Use `#FFFFFF` on `#000000/191919`, or `#191919` on `#FFFFFF`.

3. **Spacing is always a multiple of 4px**: No arbitrary margins; use `4, 8, 12, 16, 20, 24, 32, 40, 64px`.

4. **Yellow (`#FFFA00`) is reserved for warnings and critical states**: Do not use for neutral UI elements.

5. **Border radius must be 0px, 2px, 4px, or 50%**: Never improvise; these four values cover all use cases.

6. **Touch targets minimum 44px × 44px**: Enforce on mobile; desktop buttons can be smaller but must not go below `36px`.

7. **Headings use Novecentosanswide-DemiBold; body uses SansMedium or sans-serif**: Never mix fonts for the same semantic role.

8. **Modals and overlays use shadows at Level 3+ (`0 8px 16px rgba(0, 0, 0, 0.3)` or deeper)**: Flat modals blur layering hierarchy.

9. **Focus states must include visible outline**: `outline: 2px solid #007AFF; outline-offset: 2px` for keyboard accessibility.

10. **Test responsive breakpoints at 320px (mobile), 768px (tablet), 1200px (desktop)**: Verify grids collapse, text scales, and touch targets remain ≥44px.