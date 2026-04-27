---
name: Contract Analysis AI
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#795900'
  on-secondary: '#ffffff'
  secondary-container: '#ffc329'
  on-secondary-container: '#6f5100'
  tertiary: '#4d556b'
  on-tertiary: '#ffffff'
  tertiary-container: '#656d84'
  on-tertiary-container: '#eef0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  card-padding: 24px
---

## Brand & Style

This design system is built to transform the daunting task of reviewing real estate contracts into a clear, stress-free experience. The brand personality is that of a **"trusted expert companion"**—authoritative enough to handle legal documents, yet approachable enough for a first-time renter. 

The visual style follows a **Modern Corporate** aesthetic with a fintech twist. It prioritizes clarity and information density without feeling overwhelming. By leveraging heavy whitespace and a card-based architecture, the design system avoids the cluttered, "fine-print" look of traditional legal services, instead offering a breathable and systematic interface that guides the user through complex data with ease.

## Colors

The palette is anchored by **Azure Blue**, symbolizing stability and institutional trust. This is the primary color for actions and core branding. 

To shift away from the "alarmist" nature of legal risks, we replace harsh reds with a warm **Amber (#FBBF24)**. This color is used specifically for "points to check" or "cautionary items," signaling importance without causing unnecessary anxiety. 

The background uses a crisp **Neutral Gray (#F9FAFB)** to reduce eye strain during long reading sessions. Text is rendered in a deep **Charcoal (#0F172A)** rather than pure black to maintain a high-end, modern feel while ensuring optimal legibility.

## Typography

The typography system utilizes **Manrope** for its technical precision and modern geometry. When implemented for Korean users, this should be paired with **Pretendard** to maintain a seamless visual weight and character width across both languages.

We employ a strict hierarchy to help users scan long contracts. **Headlines** are bold and tight to anchor sections, while **Body** text uses generous line heights (1.5x - 1.6x) to ensure legal clauses are easy to read. Small labels use a higher font weight to remain legible even at reduced scales, perfect for metadata and document timestamps.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop, centered within a 1200px container to ensure document readability is never compromised by excessive line lengths. 

The spacing logic is built on an **8px rhythm**. Internal card padding is consistently set to 24px (3 units) to create a sense of openness. For mobile views, margins compress to 16px to maximize the real estate for contract text. Elements are grouped using "proximity as logic"—related analysis points are kept close, while major contract sections are separated by large 48px or 64px vertical gaps.

## Elevation & Depth

To maintain a "clean" and "fintech" feel, this design system uses **Ambient Shadows** and **Tonal Layers** rather than heavy borders.

- **Level 1 (Base):** The #F9FAFB background.
- **Level 2 (Cards):** Pure white (#FFFFFF) surfaces with an extra-diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)). This makes the AI analysis "pop" from the background.
- **Level 3 (Interactive):** Active states and floating action buttons use a more pronounced shadow (0px 8px 30px rgba(37, 99, 235, 0.15)) to indicate touchability.

We avoid inner shadows or skeuomorphic gradients to keep the interface looking fast and digitally native.

## Shapes

The shape language is defined by **Soft Roundedness**. All primary containers and cards use a 16px (1rem) corner radius. This specific curvature is chosen to feel "helpful" and "safe," contrasting with the sharp, intimidating corners often found in traditional legal paperwork.

Buttons and input fields follow this logic with an 8px (0.5rem) radius to maintain consistency while appearing more functional and precise. Status tags or "chips" use a full pill-shape (999px) to distinguish them clearly from interactive buttons.

## Components

### Buttons
- **Primary:** Solid Azure Blue with white text. High contrast, used for "Start Analysis" or "Confirm."
- **Secondary:** Transparent background with a 1px Blue border. Used for "Download PDF" or "View Original."

### Cards
Cards are the primary container for AI insights. Every card should have a clear title and a specific color-coded "Status Indicator" at the top right.

### Analysis Chips
Small status badges used to categorize contract clauses:
- **Safe:** Light Blue background with Blue text.
- **Check:** Light Amber background with Amber text.
- **Info:** Light Gray background with Dark Gray text.

### Input Fields
Clean, outlined inputs with #E2E8F0 borders. On focus, the border transitions to Azure Blue with a subtle 3px outer glow in the same color.

### Document Viewer
A specialized component that mimics the look of paper, placed on a slightly darker gray background (#F1F5F9) to provide a clear distinction between the "Original Document" and the "AI Analysis Panel."