// Science-backed micro-habits paired by dermatological concern

export const SCIENCE_HABITS_BY_CONCERN = {
  'underarms': {
    concernName: 'Underarm Pigmentation & Odor',
    badge: 'Acanthosis & Odor Control',
    color: '#005995',
    habits: [
      {
        id: 'habit-dry-60s',
        title: 'Wait 60 seconds to air-dry before tight sleeves',
        shortDesc: 'Prevents friction + active acid irritation',
        science: 'AHA/BHA active solutions temporarily drop surface skin pH to ~3.8 to dissolve dead desmosome bonds. Immediate friction from fabric rubs off the active formula and causes mechanical micro-abrasions that trigger inflammatory hyperpigmentation (PIH). Letting it dry forms an even, non-abrasive keratolytic layer.',
        actionType: 'Morning Routine',
        duration: '60 sec',
      },
      {
        id: 'habit-skip-loofah',
        title: 'Skip physical loofahs & scrubbers on roll-on days',
        shortDesc: 'Chemical exfoliants do the work; loofahs induce melanin rebound',
        science: 'Underarm skin has only 10-15 layers of stratum corneum (comparable to eyelid skin). Combining chemical exfoliants with abrasive mesh loofahs destroys the delicate lipid mantle and stimulates melanocytes to deposit protective dark pigment (frictional melanosis).',
        actionType: 'Shower Habit',
        duration: 'All day',
      },
      {
        id: 'habit-cotton-wear',
        title: 'Switch to breathable, non-constrictive natural cotton',
        shortDesc: 'Minimizes moisture maceration & bacterial proliferation',
        science: 'Polyester traps perspiration against warm axillary folds, creating an alkaline micro-climate where Corynebacterium xerosis bacteria metabolize sweat into pungent thioalcohols and fatty acid odors. Cotton keeps airflow continuous, allowing the roll-on active ingredients to sustain neutral pH.',
        actionType: 'Lifestyle',
        duration: 'Daily',
      }
    ]
  },
  'body-acne': {
    concernName: 'Body Acne & Keratosis Pilaris (KP)',
    badge: 'Follicular Clearance',
    color: '#00487A',
    habits: [
      {
        id: 'habit-rinse-conditioner-first',
        title: 'Rinse hair conditioner completely BEFORE body wash',
        shortDesc: 'Shields back and shoulders from pore-clogging silicones & quats',
        science: 'Hair conditioners and masks contain heavy emollients (dimethicone, behentrimonium methosulfate) engineered to coat hair cuticles. When rinsed down the back, they coat skin with an occlusive waterproof film that traps bacteria and sebum inside follicular ostia. Washing your body LAST with 1% Salicylic Acid dissolves these synthetic film residues.',
        actionType: 'Shower Protocol',
        duration: 'Shower step',
      },
      {
        id: 'habit-gym-wear-swap',
        title: 'Swap out synthetic gym wear within 20 mins of sweating',
        shortDesc: 'Stops heat-induced Malassezia yeast & acne mechanica',
        science: 'Sweat combined with elastane/spandex pressure creates friction-induced micro-trauma ("acne mechanica") and feeds lipophilic Malassezia yeasts that trigger fungal acne pustules. Changing clothes and patting dry within 20 minutes halts yeast colony doubling.',
        actionType: 'Post-Workout',
        duration: '20 min window',
      },
      {
        id: 'habit-lukewarm-water',
        title: 'Keep shower water lukewarm, never scalding hot',
        shortDesc: 'Preserves intercellular ceramides so skin does not overproduce sebum',
        science: 'Hot water (>41°C) dissolves the intercellular lipid bilayer, accelerating transepidermal water loss (TEWL). Dehydrated body skin responds with a reactive sebum surge that clogs dilated pores, worsening back and chest flare-ups.',
        actionType: 'Shower Habit',
        duration: 'Daily',
      }
    ]
  },
  'hair-fall': {
    concernName: 'Hair Fall & Thinning',
    badge: 'Anagen Activation & Scalp Microcirculation',
    color: '#005995',
    habits: [
      {
        id: 'habit-scalp-massage',
        title: '60-second fingertip scalp massage post-application',
        shortDesc: 'Increases local capillary vasodilation for deeper Redensyl uptake',
        science: 'Mechanical stimulation on the scalp induces shear stress in endothelial cells, releasing nitric oxide (NO) which dilates capillary loops surrounding the hair bulb. This maximizes Redensyl and Procapil bioavailability directly to dermal papilla stem cells before the serum evaporates.',
        actionType: 'Night Protocol',
        duration: '60 sec',
      },
      {
        id: 'habit-low-glycemic',
        title: 'Keep post-dinner sweets & high-glycemic snacks low',
        shortDesc: 'Prevents acute insulin spikes that elevate free DHT',
        science: 'High-glycemic evening carbohydrates cause acute insulin and IGF-1 surges. Elevated insulin stimulates ovarian/adrenal 5-alpha reductase enzyme activity, increasing the conversion of testosterone into dihydrotestosterone (DHT), which miniaturizes sensitive scalp hair follicles.',
        actionType: 'Evening Nutrition',
        duration: 'Dinner time',
      },
      {
        id: 'habit-satin-pillowcase',
        title: 'Sleep on a silk/satin pillowcase (or loose hair scrunchie)',
        shortDesc: 'Eliminates nocturnal friction shear during vulnerable anagen reset',
        science: 'Rough cotton pillowcases generate high frictional coefficient drag against delicate regenerating baby hairs (vellus to terminal transition). Silk or satin allows hair shafts to glide smoothly, preventing nocturnal mechanical traction alopecia and snapped fibers.',
        actionType: 'Sleep Prep',
        duration: 'Overnight',
      }
    ]
  },
  'face-acne': {
    concernName: 'Facial Acne & Clogged Pores',
    badge: 'Micro-Comedone Prevention',
    color: '#005995',
    habits: [
      {
        id: 'habit-phone-screen-clean',
        title: 'Wipe phone screen with alcohol pad before night routine',
        shortDesc: 'Eliminates high-load bacterial transfer to cheekbones and jawline',
        science: 'Smartphones harbor high bacterial colony counts of Staphylococcus epidermidis and Cutibacterium acnes. Resting the screen against facial skin introduces exogenous bacteria that thrive inside sebum-filled pores.',
        actionType: 'Hygiene Habit',
        duration: '30 sec',
      },
      {
        id: 'habit-pat-dont-rub',
        title: 'Pat serum gently; avoid tugging or aggressive rubbing',
        shortDesc: 'Prevents friction-induced inflammatory flare-ups',
        science: 'Vigorous rubbing ruptures inflamed follicle walls beneath the surface, spreading trapped bacteria into surrounding dermis and converting small comedones into deep inflammatory nodules.',
        actionType: 'Application Technique',
        duration: '10 sec',
      }
    ]
  },
  'body-pigmentation': {
    concernName: 'Uneven Skin Tone & Dark Spots',
    badge: 'Melanin Pathway Regulation',
    color: '#00487A',
    habits: [
      {
        id: 'habit-damp-skin-application',
        title: 'Apply body lotion within 3 minutes of exiting the shower',
        shortDesc: 'Capitalizes on open hydration channels to double Niacinamide uptake',
        science: 'Hydrated stratum corneum is 3x more permeable than dry skin. Applying actives while skin is damp locks in moisture and facilitates transcellular diffusion of Niacinamide into epidermal layers.',
        actionType: 'Post-Bath',
        duration: '3 min rule',
      },
      {
        id: 'habit-sun-protection-limbs',
        title: 'Cover exposed forearms or apply SPF during peak afternoon sun',
        shortDesc: 'Prevents UV-stimulated tyrosinase reactivation',
        science: 'Even 15 minutes of UVA exposure stimulates melanocytes via p53 pathways to synthesize new melanin granules, undoing weeks of pigmentation correction.',
        actionType: 'Outdoor Protection',
        duration: 'Daytime',
      }
    ]
  },
  'intimate': {
    concernName: 'Intimate pH Balance & Comfort',
    badge: 'Microbiome Support',
    color: '#005995',
    habits: [
      {
        id: 'habit-front-to-back',
        title: 'Always wipe front-to-back and pat dry gently',
        shortDesc: 'Prevents coliform bacterial migration to the vulva',
        science: 'The delicate vulvar microbiome relies on acidic lactic acid-producing Lactobacillus strains. Wiping front-to-back prevents E. coli and other alkaline-producing flora from disrupting the 3.8-4.5 pH equilibrium.',
        actionType: 'Daily Care',
        duration: 'Daily',
      },
      {
        id: 'habit-cotton-undies',
        title: 'Wear 100% breathable undyed cotton underwear',
        shortDesc: 'Allows moisture evaporation to prevent yeast overgrowth',
        science: 'Synthetic lace and non-breathable fabrics trap body heat and moisture, driving local humidity above 85% — the optimal breeding range for Candida albicans.',
        actionType: 'Wardrobe Choice',
        duration: 'Daily',
      }
    ]
  }
};
