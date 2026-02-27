export const products = [
  // TUBES (8 products)
  {
    id: "tube-21ft-galv",
    title: "21ft Galvanised Scaffolding Tube",
    description: "High-quality 48.3mm diameter galvanised steel scaffolding tube. Standard 21ft (6.4m) length. Compliant with EN39 standard.",
    category: "tubes",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    specifications: {
      "Length": "21ft (6.4m)",
      "Diameter": "48.3mm",
      "Wall Thickness": "4mm",
      "Material": "Galvanised Steel",
      "Standard": "BS EN 39"
    },
    variants: [{ id: "v-tube-21", price_formatted: "£32.50", price_in_cents: 3250, inventory_quantity: 500, title: "Standard" }]
  },
  {
    id: "tube-16ft-galv",
    title: "16ft Galvanised Scaffolding Tube",
    description: "Standard 16ft (4.8m) galvanised steel tube for scaffolding structures.",
    category: "tubes",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "16ft (4.8m)", "Diameter": "48.3mm", "Material": "Galvanised Steel" },
    variants: [{ id: "v-tube-16", price_formatted: "£24.80", price_in_cents: 2480, inventory_quantity: 400, title: "Standard" }]
  },
  {
    id: "tube-13ft-galv",
    title: "13ft Galvanised Scaffolding Tube",
    description: "13ft (3.9m) galvanised steel tube. Durable and weather resistant.",
    category: "tubes",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "13ft (3.9m)", "Diameter": "48.3mm", "Material": "Galvanised Steel" },
    variants: [{ id: "v-tube-13", price_formatted: "£20.15", price_in_cents: 2015, inventory_quantity: 350, title: "Standard" }]
  },
  {
    id: "tube-10ft-galv",
    title: "10ft Galvanised Scaffolding Tube",
    description: "10ft (3.0m) tube ideal for bracing and smaller structures.",
    category: "tubes",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "10ft (3.0m)", "Diameter": "48.3mm", "Material": "Galvanised Steel" },
    variants: [{ id: "v-tube-10", price_formatted: "£15.50", price_in_cents: 1550, inventory_quantity: 300, title: "Standard" }]
  },
  {
    id: "tube-8ft-galv",
    title: "8ft Galvanised Scaffolding Tube",
    description: "8ft (2.4m) steel tube, perfect for transoms and short braces.",
    category: "tubes",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "8ft (2.4m)", "Diameter": "48.3mm", "Material": "Galvanised Steel" },
    variants: [{ id: "v-tube-8", price_formatted: "£12.40", price_in_cents: 1240, inventory_quantity: 200, title: "Standard" }]
  },
  {
    id: "tube-6ft-galv",
    title: "6ft Galvanised Scaffolding Tube",
    description: "6ft (1.8m) steel tube.",
    category: "tubes",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "6ft (1.8m)", "Diameter": "48.3mm", "Material": "Galvanised Steel" },
    variants: [{ id: "v-tube-6", price_formatted: "£9.30", price_in_cents: 930, inventory_quantity: 150, title: "Standard" }]
  },
  {
    id: "tube-5ft-galv",
    title: "5ft Galvanised Scaffolding Tube",
    description: "5ft (1.5m) short steel tube.",
    category: "tubes",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "5ft (1.5m)", "Diameter": "48.3mm", "Material": "Galvanised Steel" },
    variants: [{ id: "v-tube-5", price_formatted: "£7.75", price_in_cents: 775, inventory_quantity: 100, title: "Standard" }]
  },
  {
    id: "tube-alum-20ft",
    title: "20ft Aluminium Scaffolding Tube",
    description: "Lightweight aluminium tube for specific applications requiring reduced weight.",
    category: "tubes",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "20ft (6.1m)", "Diameter": "48.3mm", "Material": "Aluminium" },
    variants: [{ id: "v-tube-alum-20", price_formatted: "£45.00", price_in_cents: 4500, inventory_quantity: 50, title: "Standard" }]
  },

  // BOARDS (7 products)
  {
    id: "board-13ft",
    title: "13ft Scaffolding Board",
    description: "BS 2482 compliant timber scaffolding board. Machine graded for strength.",
    category: "boards",
    image: "https://images.unsplash.com/photo-1534237710405-1877fdb18a98?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "13ft (3.9m)", "Width": "225mm", "Thickness": "38mm", "Standard": "BS 2482" },
    variants: [{ id: "v-board-13", price_formatted: "£18.50", price_in_cents: 1850, inventory_quantity: 600, title: "Standard" }]
  },
  {
    id: "board-10ft",
    title: "10ft Scaffolding Board",
    description: "Standard 10ft timber board. Banded ends for durability.",
    category: "boards",
    image: "https://images.unsplash.com/photo-1534237710405-1877fdb18a98?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "10ft (3.0m)", "Width": "225mm", "Thickness": "38mm" },
    variants: [{ id: "v-board-10", price_formatted: "£14.25", price_in_cents: 1425, inventory_quantity: 400, title: "Standard" }]
  },
  {
    id: "board-8ft",
    title: "8ft Scaffolding Board",
    description: "8ft timber scaffolding board.",
    category: "boards",
    image: "https://images.unsplash.com/photo-1534237710405-1877fdb18a98?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "8ft (2.4m)", "Width": "225mm", "Thickness": "38mm" },
    variants: [{ id: "v-board-8", price_formatted: "£11.40", price_in_cents: 1140, inventory_quantity: 300, title: "Standard" }]
  },
  {
    id: "board-6ft",
    title: "6ft Scaffolding Board",
    description: "6ft timber board for tighter spaces.",
    category: "boards",
    image: "https://images.unsplash.com/photo-1534237710405-1877fdb18a98?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "6ft (1.8m)", "Width": "225mm", "Thickness": "38mm" },
    variants: [{ id: "v-board-6", price_formatted: "£8.55", price_in_cents: 855, inventory_quantity: 200, title: "Standard" }]
  },
  {
    id: "board-5ft",
    title: "5ft Scaffolding Board",
    description: "5ft timber scaffolding board.",
    category: "boards",
    image: "https://images.unsplash.com/photo-1534237710405-1877fdb18a98?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "5ft (1.5m)", "Width": "225mm", "Thickness": "38mm" },
    variants: [{ id: "v-board-5", price_formatted: "£7.15", price_in_cents: 715, inventory_quantity: 150, title: "Standard" }]
  },
  {
    id: "board-fr-13ft",
    title: "13ft Fire Retardant Board",
    description: "Treated timber board for improved fire safety on sensitive sites.",
    category: "boards",
    image: "https://images.unsplash.com/photo-1534237710405-1877fdb18a98?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "13ft (3.9m)", "Treatment": "Fire Retardant", "Standard": "Euroclass B/C" },
    variants: [{ id: "v-board-fr-13", price_formatted: "£24.50", price_in_cents: 2450, inventory_quantity: 100, title: "Standard" }]
  },
  {
    id: "board-supadeck",
    title: "Plastic Supadeck Board",
    description: "Durable plastic scaffolding board. Rot-proof and long-lasting.",
    category: "boards",
    image: "https://images.unsplash.com/photo-1534237710405-1877fdb18a98?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "3.9m", "Material": "High-impact Plastic", "Weight": "Lightweight" },
    variants: [{ id: "v-board-supa", price_formatted: "£35.00", price_in_cents: 3500, inventory_quantity: 50, title: "Standard" }]
  },

  // FITTINGS (8 products)
  {
    id: "fitting-double",
    title: "Double Coupler (Zinc)",
    description: "Drop forged double coupler for connecting two tubes at 90 degrees.",
    category: "fittings",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specifications: { "Type": "Double/Right Angle", "Material": "Drop Forged Steel", "Finish": "Zinc Plated" },
    variants: [{ id: "v-fit-dbl", price_formatted: "£4.50", price_in_cents: 450, inventory_quantity: 1000, title: "Standard" }]
  },
  {
    id: "fitting-swivel",
    title: "Swivel Coupler (Zinc)",
    description: "Connects two tubes at any angle.",
    category: "fittings",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specifications: { "Type": "Swivel", "Material": "Drop Forged Steel", "Finish": "Zinc Plated" },
    variants: [{ id: "v-fit-swv", price_formatted: "£4.95", price_in_cents: 495, inventory_quantity: 1000, title: "Standard" }]
  },
  {
    id: "fitting-single",
    title: "Single Coupler (Putlog)",
    description: "Connects putlogs to ledgers. Not for load bearing.",
    category: "fittings",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specifications: { "Type": "Single/Putlog", "Material": "Pressed Steel", "Finish": "Zinc Plated" },
    variants: [{ id: "v-fit-sgl", price_formatted: "£2.50", price_in_cents: 250, inventory_quantity: 800, title: "Standard" }]
  },
  {
    id: "fitting-sleeve",
    title: "Sleeve Coupler",
    description: "External joiner for end-to-end tube connection.",
    category: "fittings",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specifications: { "Type": "Sleeve", "Material": "Pressed Steel", "Use": "End-to-end joining" },
    variants: [{ id: "v-fit-slv", price_formatted: "£3.25", price_in_cents: 325, inventory_quantity: 600, title: "Standard" }]
  },
  {
    id: "fitting-baseplate",
    title: "Base Plate",
    description: "Standard 150x150mm base plate for scaffold standards.",
    category: "fittings",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specifications: { "Size": "150x150mm", "Shank": "Standard", "Material": "Steel" },
    variants: [{ id: "v-fit-base", price_formatted: "£2.95", price_in_cents: 295, inventory_quantity: 500, title: "Standard" }]
  },
  {
    id: "fitting-jointpin",
    title: "Joint Pin",
    description: "Internal joiner for connecting tubes end-to-end.",
    category: "fittings",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specifications: { "Type": "Expanding Joint Pin", "Material": "Forged Steel" },
    variants: [{ id: "v-fit-pin", price_formatted: "£1.85", price_in_cents: 185, inventory_quantity: 600, title: "Standard" }]
  },
  {
    id: "fitting-girder",
    title: "Girder Coupler (Gravlock)",
    description: "For connecting scaffold tube to beam flanges.",
    category: "fittings",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specifications: { "Type": "Girder/Beam Clamp", "Load": "Heavy Duty", "Finish": "Zinc" },
    variants: [{ id: "v-fit-gird", price_formatted: "£6.50", price_in_cents: 650, inventory_quantity: 200, title: "Standard" }]
  },
  {
    id: "fitting-roof",
    title: "Roofing Coupler",
    description: "Specialized coupler for tin sheet roofing structures.",
    category: "fittings",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400",
    specifications: { "Type": "Roofing", "Use": "Sheeting support" },
    variants: [{ id: "v-fit-roof", price_formatted: "£5.20", price_in_cents: 520, inventory_quantity: 150, title: "Standard" }]
  },

  // SYSTEMS (6 products)
  {
    id: "sys-cup-std-3m",
    title: "Cuplock Standard 3.0m",
    description: "Vertical standard for Cuplock system.",
    category: "systems",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "3.0m", "System": "Cuplock", "Finish": "Galvanised" },
    variants: [{ id: "v-sys-cup-3", price_formatted: "£28.00", price_in_cents: 2800, inventory_quantity: 200, title: "Standard" }]
  },
  {
    id: "sys-cup-ldg-25",
    title: "Cuplock Ledger 2.5m",
    description: "Horizontal ledger for Cuplock system bays.",
    category: "systems",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "2.5m", "System": "Cuplock" },
    variants: [{ id: "v-sys-ldg-25", price_formatted: "£21.50", price_in_cents: 2150, inventory_quantity: 300, title: "Standard" }]
  },
  {
    id: "sys-cup-trans-13",
    title: "Cuplock Transom 1.3m",
    description: "Intermediate transom for board support.",
    category: "systems",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "1.3m", "System": "Cuplock" },
    variants: [{ id: "v-sys-trans", price_formatted: "£16.00", price_in_cents: 1600, inventory_quantity: 250, title: "Standard" }]
  },
  {
    id: "sys-ring-std-3m",
    title: "Ringlock Standard 3.0m",
    description: "Vertical standard for Ringlock modular system.",
    category: "systems",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "3.0m", "System": "Ringlock", "Rosette Interval": "500mm" },
    variants: [{ id: "v-sys-ring-3", price_formatted: "£32.00", price_in_cents: 3200, inventory_quantity: 150, title: "Standard" }]
  },
  {
    id: "sys-ring-ldg-25",
    title: "Ringlock Ledger 2.57m",
    description: "Horizontal member for Ringlock.",
    category: "systems",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "2.57m", "System": "Ringlock" },
    variants: [{ id: "v-sys-ring-ldg", price_formatted: "£24.00", price_in_cents: 2400, inventory_quantity: 200, title: "Standard" }]
  },
  {
    id: "sys-jack",
    title: "Universal Jack Base",
    description: "Adjustable base jack for leveling systems.",
    category: "systems",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400",
    specifications: { "Adjustment": "500mm", "Thread": "Standard Acme" },
    variants: [{ id: "v-sys-jack", price_formatted: "£12.50", price_in_cents: 1250, inventory_quantity: 400, title: "Standard" }]
  },

  // TOWERS (5 products)
  {
    id: "twr-diy-4m",
    title: "DIY Aluminium Tower 4m",
    description: "Lightweight tower for home maintenance. 4m working height.",
    category: "towers",
    image: "https://images.unsplash.com/photo-1521790638703-912c24c29c54?auto=format&fit=crop&q=80&w=400",
    specifications: { "Working Height": "4m", "Platform Height": "2m", "Width": "0.6m" },
    variants: [{ id: "v-twr-diy", price_formatted: "£350.00", price_in_cents: 35000, inventory_quantity: 20, title: "Complete Kit" }]
  },
  {
    id: "twr-trade-6m",
    title: "Trade Single Width Tower 6.2m",
    description: "Industrial grade single width tower. EN1004 compliant.",
    category: "towers",
    image: "https://images.unsplash.com/photo-1521790638703-912c24c29c54?auto=format&fit=crop&q=80&w=400",
    specifications: { "Working Height": "6.2m", "Width": "0.85m", "Load": "Trade/Industrial" },
    variants: [{ id: "v-twr-trade", price_formatted: "£850.00", price_in_cents: 85000, inventory_quantity: 10, title: "Complete Kit" }]
  },
  {
    id: "twr-dw-8m",
    title: "Double Width Tower 8.2m",
    description: "Wide platform tower for two workers.",
    category: "towers",
    image: "https://images.unsplash.com/photo-1521790638703-912c24c29c54?auto=format&fit=crop&q=80&w=400",
    specifications: { "Working Height": "8.2m", "Width": "1.45m" },
    variants: [{ id: "v-twr-dw", price_formatted: "Contact for Pricing", price_in_cents: 0, inventory_quantity: 0, manage_inventory: false, title: "Quote Only" }]
  },
  {
    id: "twr-stair",
    title: "Stairway Access Tower",
    description: "Tower with integrated stair units for safe ascent.",
    category: "towers",
    image: "https://images.unsplash.com/photo-1521790638703-912c24c29c54?auto=format&fit=crop&q=80&w=400",
    specifications: { "Type": "Stair Tower", "Usage": "Frequent Access" },
    variants: [{ id: "v-twr-stair", price_formatted: "Contact for Pricing", price_in_cents: 0, inventory_quantity: 0, manage_inventory: false, title: "Quote Only" }]
  },
  {
    id: "twr-fold",
    title: "Folding Low Level Unit",
    description: "One-piece folding unit for quick low level access.",
    category: "towers",
    image: "https://images.unsplash.com/photo-1521790638703-912c24c29c54?auto=format&fit=crop&q=80&w=400",
    specifications: { "Platform Height": "0.6-1.8m", "Type": "Folding" },
    variants: [{ id: "v-twr-fold", price_formatted: "£295.00", price_in_cents: 29500, inventory_quantity: 25, title: "Standard" }]
  },

  // LADDERS (6 products)
  {
    id: "lad-pole-3m",
    title: "Timber Pole Ladder 3m",
    description: "Class 1 industrial timber pole ladder.",
    category: "ladders",
    image: "https://images.unsplash.com/photo-1596461146757-542bc227a977?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "3m", "Rungs": "Steel reinforced", "Class": "1 Industrial" },
    variants: [{ id: "v-lad-3", price_formatted: "£85.00", price_in_cents: 8500, inventory_quantity: 40, title: "Standard" }]
  },
  {
    id: "lad-pole-4m",
    title: "Timber Pole Ladder 4m",
    description: "4m length pole ladder for scaffold access.",
    category: "ladders",
    image: "https://images.unsplash.com/photo-1596461146757-542bc227a977?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "4m", "Class": "1 Industrial" },
    variants: [{ id: "v-lad-4", price_formatted: "£105.00", price_in_cents: 10500, inventory_quantity: 35, title: "Standard" }]
  },
  {
    id: "lad-pole-5m",
    title: "Timber Pole Ladder 5m",
    description: "5m industrial pole ladder.",
    category: "ladders",
    image: "https://images.unsplash.com/photo-1596461146757-542bc227a977?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "5m", "Class": "1 Industrial" },
    variants: [{ id: "v-lad-5", price_formatted: "£125.00", price_in_cents: 12500, inventory_quantity: 30, title: "Standard" }]
  },
  {
    id: "lad-pole-6m",
    title: "Timber Pole Ladder 6m",
    description: "Long 6m pole ladder.",
    category: "ladders",
    image: "https://images.unsplash.com/photo-1596461146757-542bc227a977?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "6m", "Class": "1 Industrial" },
    variants: [{ id: "v-lad-6", price_formatted: "£145.00", price_in_cents: 14500, inventory_quantity: 20, title: "Standard" }]
  },
  {
    id: "lad-ext-35",
    title: "Aluminium Extension Ladder 3.5m",
    description: "Triple extension ladder extending to 8m.",
    category: "ladders",
    image: "https://images.unsplash.com/photo-1596461146757-542bc227a977?auto=format&fit=crop&q=80&w=400",
    specifications: { "Closed Length": "3.5m", "Extended": "8.0m", "Material": "Aluminium" },
    variants: [{ id: "v-lad-ext", price_formatted: "£195.00", price_in_cents: 19500, inventory_quantity: 15, title: "Standard" }]
  },
  {
    id: "lad-step",
    title: "Heavy Duty Platform Step",
    description: "8-tread platform step ladder for site use.",
    category: "ladders",
    image: "https://images.unsplash.com/photo-1596461146757-542bc227a977?auto=format&fit=crop&q=80&w=400",
    specifications: { "Treads": "8", "Platform Height": "1.8m", "Duty": "Heavy Duty" },
    variants: [{ id: "v-lad-step", price_formatted: "£110.00", price_in_cents: 11000, inventory_quantity: 25, title: "Standard" }]
  },

  // ACCESSORIES (8 products)
  {
    id: "acc-brickguard",
    title: "Steel Brickguard",
    description: "Mesh brickguard to prevent debris falling from platforms.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
    specifications: { "Size": "Standard", "Material": "Steel Mesh", "Finish": "Painted/Galv" },
    variants: [{ id: "v-acc-bg", price_formatted: "£7.50", price_in_cents: 750, inventory_quantity: 500, title: "Standard" }]
  },
  {
    id: "acc-sheet",
    title: "Scaffold Sheeting 2m x 45m",
    description: "Roll of reinforced scaffold sheeting for weather protection.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
    specifications: { "Width": "2m", "Length": "45m", "Colour": "Clear/White" },
    variants: [{ id: "v-acc-sht", price_formatted: "£45.00", price_in_cents: 4500, inventory_quantity: 100, title: "Roll" }]
  },
  {
    id: "acc-debris",
    title: "Debris Netting 2m x 50m",
    description: "Green debris netting to contain dust and light debris.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
    specifications: { "Width": "2m", "Length": "50m", "Colour": "Green" },
    variants: [{ id: "v-acc-net", price_formatted: "£22.00", price_in_cents: 2200, inventory_quantity: 200, title: "Roll" }]
  },
  {
    id: "acc-ties",
    title: "Scaffold Ties (Pack of 100)",
    description: "Elasticated toggles for securing sheeting and netting.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
    specifications: { "Pack Size": "100", "Strength": "Standard" },
    variants: [{ id: "v-acc-tie", price_formatted: "£15.00", price_in_cents: 1500, inventory_quantity: 300, title: "Pack" }]
  },
  {
    id: "acc-span",
    title: "Scaffold Spanner (Bi-Hex)",
    description: "7/16w bi-hex box spanner with poker handle.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
    specifications: { "Size": "7/16w", "Type": "Box", "Handle": "Poker" },
    variants: [{ id: "v-acc-spn", price_formatted: "£12.50", price_in_cents: 1250, inventory_quantity: 100, title: "Standard" }]
  },
  {
    id: "acc-level",
    title: "Magnetic Boat Level",
    description: "Professional scaffolders spirit level with magnetic base.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "250mm", "Magnetic": "Yes", "Vials": "3" },
    variants: [{ id: "v-acc-lvl", price_formatted: "£28.00", price_in_cents: 2800, inventory_quantity: 80, title: "Standard" }]
  },
  {
    id: "acc-belt",
    title: "Scaffolders Leather Belt Set",
    description: "Complete leather tool belt with frogs for spanner, hammer, tape.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
    specifications: { "Material": "Leather", "Includes": "Belt, 3 Frogs" },
    variants: [{ id: "v-acc-blt", price_formatted: "£45.00", price_in_cents: 4500, inventory_quantity: 50, title: "Set" }]
  },
  {
    id: "acc-tape",
    title: "8m Tape Measure",
    description: "Heavy duty 8m tape measure with wide blade.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "8m", "Blade Width": "25mm" },
    variants: [{ id: "v-acc-tap", price_formatted: "£8.50", price_in_cents: 850, inventory_quantity: 120, title: "Standard" }]
  },

  // SAFETY (8 products)
  {
    id: "saf-harness",
    title: "Full Body Harness Kit",
    description: "2-point safety harness with rear and chest attachment points.",
    category: "safety",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400",
    specifications: { "Points": "2", "Standard": "EN361", "Size": "Universal" },
    variants: [{ id: "v-saf-har", price_formatted: "£45.00", price_in_cents: 4500, inventory_quantity: 80, title: "Kit" }]
  },
  {
    id: "saf-lanyard",
    title: "Shock Absorbing Lanyard",
    description: "1.8m lanyard with shock absorber and scaffold hook.",
    category: "safety",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400",
    specifications: { "Length": "1.8m", "Connector": "Scaffold Hook", "Standard": "EN355" },
    variants: [{ id: "v-saf-lan", price_formatted: "£32.00", price_in_cents: 3200, inventory_quantity: 100, title: "Standard" }]
  },
  {
    id: "saf-hat",
    title: "Vented Safety Helmet",
    description: "Industrial safety helmet with chin strap.",
    category: "safety",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400",
    specifications: { "Colour": "White", "Standard": "EN397", "Vented": "Yes" },
    variants: [{ id: "v-saf-hat", price_formatted: "£12.50", price_in_cents: 1250, inventory_quantity: 150, title: "Standard" }]
  },
  {
    id: "saf-gloves",
    title: "Grip Gloves (Pack of 10)",
    description: "Latex coated grip gloves for handling tubes.",
    category: "safety",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400",
    specifications: { "Size": "L/XL", "Coating": "Latex", "Pack": "10 Pairs" },
    variants: [{ id: "v-saf-glv", price_formatted: "£15.00", price_in_cents: 1500, inventory_quantity: 200, title: "Pack" }]
  },
  {
    id: "saf-hi-vis",
    title: "Hi-Vis Vest (Yellow)",
    description: "Class 2 Hi-Vis waistcoat.",
    category: "safety",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400",
    specifications: { "Class": "EN ISO 20471 Class 2", "Colour": "Yellow" },
    variants: [{ id: "v-saf-hiv", price_formatted: "£4.50", price_in_cents: 450, inventory_quantity: 300, title: "Standard" }]
  },
  {
    id: "saf-gate",
    title: "Safety Gate",
    description: "Self-closing safety gate for ladder access points.",
    category: "safety",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400",
    specifications: { "Material": "Steel/Yellow Powder Coat", "Type": "Spring Loaded" },
    variants: [{ id: "v-saf-gat", price_formatted: "£65.00", price_in_cents: 6500, inventory_quantity: 40, title: "Standard" }]
  },
  {
    id: "saf-wheel",
    title: "Gin Wheel 250mm",
    description: "Certified gin wheel for lifting materials.",
    category: "safety",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400",
    specifications: { "SWL": "50kg", "Diameter": "250mm", "Type": "Ring" },
    variants: [{ id: "v-saf-whl", price_formatted: "£38.00", price_in_cents: 3800, inventory_quantity: 60, title: "Standard" }]
  },
  {
    id: "saf-rope",
    title: "Hempex Rope 18mm",
    description: "220m coil of 18mm hempex rope for gin wheels.",
    category: "safety",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400",
    specifications: { "Diameter": "18mm", "Length": "220m", "Material": "Synthetic Hemp" },
    variants: [{ id: "v-saf-rop", price_formatted: "£110.00", price_in_cents: 11000, inventory_quantity: 20, title: "Coil" }]
  }
];

// Helper to get product by ID mimicking API
export const getLocalProduct = (id) => products.find(p => p.id === id);

// Helper to get products mimicking API params
export const getLocalProducts = ({ category, limit, featured } = {}) => {
  let filtered = [...products];
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  // Simple "featured" logic: pick first product from each category or specific IDs
  if (featured) {
    // Just mock random assortment or specific ones
    filtered = filtered.filter((_, i) => i % 7 === 0).slice(0, 4); 
  }
  if (limit) {
    filtered = filtered.slice(0, limit);
  }
  return filtered;
};