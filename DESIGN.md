# Design System - Lucky Air

This `DESIGN.md` file defines the design system for the **Lucky Air E-commerce Portal**, providing the visual language, typography, and component styles required by AI generation tools like Google Stitch.

## 1. Brand Guidelines
- **Brand Name:** Lucky Air
- **Tone & Voice:** Professional, trustworthy, welcoming, and culturally reflective of Yunnan, China.
- **Core Concept:** Seamless travel, modern aviation, and accessible premium destinations.

## 2. Color Palette
- **Primary Color:** `#D32F2F` (Lucky Red) - Used for primary actions, calls to action (CTA), and brand highlights.
- **Secondary Color:** `#1A237E` (Aviation Navy) - Used for headers, footers, and prominent secondary text.
- **Accent Color:** `#FFC107` (Golden Yellow) - Used for rating stars, badges, and special offers.
- **Background Color:** `#F8F9FA` (Off-white) - Main body background to ensure a clean, modern look.
- **Surface Color:** `#FFFFFF` (Pure White) - Used for card backgrounds, form containers, and elevated UI elements.
- **Text Primary:** `#212121` (Dark Gray) - For main body copy and headings.
- **Text Secondary:** `#757575` (Medium Gray) - For subtitles, metadata, and form placeholders.
- **Border Color:** `#E0E0E0` (Light Gray) - For card borders, inputs, and layout dividers.

## 3. Typography
- **Primary Font Family:** `Inter`, `Roboto`, or `system-ui`, sans-serif.
- **Base Font Size:** `16px` (1rem).
- **Line Height:** `1.5` for body text, `1.2` for headings.
- **Typographic Scale:**
  - **H1:** `2.5rem` (40px), Bold (700)
  - **H2:** `2rem` (32px), Bold (700)
  - **H3:** `1.5rem` (24px), Semi-Bold (600)
  - **Body Text:** `1rem` (16px), Regular (400)
  - **Small/Caption:** `0.875rem` (14px), Regular (400)

## 4. Spacing & Layout
- **Spacing Scale (Base 8px):** 4px, 8px, 16px, 24px, 32px, 48px, 64px.
- **Container Max-Width:** `1200px` to maintain readability on ultra-wide screens.
- **Layout Guidelines:**
  - Section Padding: `64px` top and bottom.
  - Grid/Flex Gap: `24px` between cards or form elements.
  - Card Internal Padding: `24px` all around.

## 5. Component Styles

### Buttons
- **Primary Button (`.btn-primary`):** 
  - Background: `#D32F2F`
  - Text: `#FFFFFF`
  - Hover: `#B71C1C`
- **Secondary Button (`.btn-secondary`):**
  - Background: `#1A237E`
  - Text: `#FFFFFF`
  - Hover: `#0D47A1`
- **Outline Button (`.btn-outline`):**
  - Background: Transparent
  - Border: `2px solid #D32F2F`
  - Text: `#D32F2F`
  - Hover: Background `#FFEBEE`
- **Global Button Properties:**
  - Padding: `12px 24px`
  - Border Radius: `8px`
  - Font Weight: `600`
  - Transition: `all 0.3s ease`

### Cards (Destinations, Reviews, Segments)
- Background: `#FFFFFF`
- Border: `1px solid #E0E0E0`
- Border Radius: `12px`
- Shadow: `0 4px 6px rgba(0,0,0,0.05)`
- Hover Effect: Transform `translateY(-4px)` with an increased shadow `0 8px 15px rgba(0,0,0,0.1)`.
- Image Handling: Images inside cards should have `border-top-left-radius: 12px`, `border-top-right-radius: 12px`, and `object-fit: cover`.

### Forms & Inputs
- Background: `#FFFFFF`
- Border: `1px solid #BDBDBD`
- Border Radius: `6px`
- Padding: `10px 12px`
- Focus State: Outline none, Border `#D32F2F`, Box-shadow `0 0 0 3px rgba(211,47,47,0.15)`.

## 6. Design Constraints & Rules
- **Consistency:** DO NOT mix sharp corners with rounded corners. Default to 8px-12px rounded radii.
- **Color Usage:** DO NOT use generic neon colors. Stick strictly to the defined color palette.
- **Accessibility:** DO ensure a high contrast ratio (at least 4.5:1) for all text against backgrounds.
- **Responsive Design:** DO use CSS Grid and Flexbox for layouts. Grids (like `.destinations-grid`) should use responsive patterns such as `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`.
- **Interactions:** DO include micro-animations (e.g., hover states on buttons and cards) to make the interface feel dynamic.
