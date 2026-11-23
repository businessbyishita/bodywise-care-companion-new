# Bodywise Care Companion 🧴✨

A modern, mobile-first clinical web application designed for **Be Bodywise** to prevent post-purchase drop-off, eliminate under-dosing / rationing of active ingredients, and build science-backed micro-habits alongside purchased products.

---

## 🌟 Key Features

1. **Active Routine Dashboard & Smart Frequency Reminders**
   - Pre-populated with 3 core Be Bodywise products:
     - **AHA BHA Underarm Roll-On (6%)**: 3x a week (Mon, Wed, Fri) • 6-week target cycle
     - **1% Salicylic Acid Daily Body Wash**: Daily (PM Shower) • 4-week target cycle
     - **Rosemary & Redensyl Hair Growth Serum**: Daily (Bedtime) • 12-week target cycle
   - **Interactive Notification Preview & Simulator**: Cycle reminders and simulate different weekdays (Mon–Sun) to observe dynamic schedule badges.
   - **+ Add Purchased Product Drawer**: Custom shelf builder featuring 5 preset Be Bodywise items.

2. **Visual Dosage Guide & Interactive Depleting Bottle Tracker**
   - **Illustrated Dosage Reference**: Clean SVG illustrations comparing the exact prescribed dose (e.g. 2 firm swipes, 5 ml coin pump, 1 ml dropper) vs rationing.
   - **Why Rationing Slows Results**: Explains concentration thresholds and why sub-therapeutic doses delay clinical outcomes.
   - **Animated Depleting SVG Bottles**: Semi-transparent liquid level indicators (roll-on, pump, dropper, jar) with graduation marks and wave meniscuses.
   - **Physical Bottle Match Check**: Interactive modal prompting users to verify their physical bottle level with calibration options.

3. **Science-Backed Daily Boosters as Embedded Dropdowns in Each Item**
   - Paired dynamically by active product concern (*Underarms, Body Acne, Hair Fall*).
   - Collapsible dropdown inside each line item with interactive checkboxes updating a real-time **Daily Readiness Ring**.
   - Expandable **"The Science"** tooltips detailing the dermatological reasoning.

4. **Clinical Brand Aesthetics (#005995 & White) & Privacy**
   - Exclusively uses Be Bodywise brand color `#005995`, its clinical shades, and pure white.
   - Zero customer personal contact fields.
   - Persistent `localStorage` with a prominent **"Reset Demo"** button.
   - Toggle between **Desktop View** and **iPhone Mobile App Frame**.

---

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bodywise-care-companion.git
cd bodywise-care-companion

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📦 Deployment to GitHub Pages

### Option 1: Automated Deployment via GitHub Actions (Recommended)
1. Push this project to a new repository on GitHub.
2. In your repository on GitHub, go to **Settings** &rarr; **Pages**.
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. GitHub will detect Vite and deploy your static build automatically!

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Be Bodywise `#005995` palette)
- **Icons**: Lucide React
- **Animations / Effects**: Canvas Confetti, SVG Clip Paths & Transitions
