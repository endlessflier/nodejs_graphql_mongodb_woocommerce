import brandFoundationModal  from "../../database/schemas/brandFoundationSchema";

const data = [
  {
    "Brand": "By Terry",
    "Product": "Light Expert Click Brush Illuminating Flawless Foundation Brush",
    "Its compared to our": " CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Almay",
    "Product": "Skin Perfecting Healthy Biome Makeup",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Almay",
    "Product": "Make Myself Clear ",
    "Its compared to our": "Xtended Wear Sheer",
    "Base": "Xtended Wear",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Anastasia ",
    "Product": "Luminous Foundation ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Antonym ",
    "Product": "Skin Esteem Organic Liquid Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Armani ",
    "Product": "Luminous Silk Perfect Glow Flawless Founadtion ",
    "Its compared to our": "Satin Sheer",
    "Base": "Satin",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Bare Minerals",
    "Product": "Original Liquid Mineral ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Bare Minerals",
    "Product": "Bare Pro",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": "Xtended Wear",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Beauty Blender",
    "Product": " Bonce ",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": "Xtended Wear",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Becca ",
    "Product": "Ultimate Coverage 24H Foundation ",
    "Its compared to our": "Xtended Wear Full",
    "Base": "Xtended Wear",
    "Coverage": "Full "
  },
  {
    "Brand": "Benefit ",
    "Product": "Hello Happy Flawless Brightening Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Bite Beauty ",
    "Product": "Changemaker Supercharged Micellar Foundation ",
    "Its compared to our": "Radiant Sheer",
    "Base": "Radiant",
    "Coverage": "Sheer"
  },
  {
    "Brand": "BLK/OPL ",
    "Product": "Ture Color Pore Perfecting Foundation ",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": "Xtened Wear",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Bobbie Brown ",
    "Product": "Skin foundation Broad Spectrum SPF 15",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Bobbie Brown ",
    "Product": "Weightless Foundation ",
    "Its compared to our": "Xtended Wear Sheer",
    "Base": "Xtended Wear",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Bobbie Brown ",
    "Product": "Skin Longwear ",
    "Its compared to our": "Satin Sheer ",
    "Base": "Satin",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Burt's Bees Foundation ",
    "Product": "Goodness Glow ",
    "Its compared to our": "Xtended Wear Sheer",
    "Base": "Xtended Wear",
    "Coverage": "Sheer"
  },
  {
    "Brand": "By Terry",
    "Product": "Hyaluronic Hydra Foundation Broad Spectrum SPF 30 Flawless \nSkin Care Liquid Foundation ",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": "Xtended Wear",
    "Coverage": "Sheer "
  },
  {
    "Brand": "By Terry",
    "Product": "Cover Ecpert Prefecting Fluid ",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream ",
    "Coverage": ""
  },
  {
    "Brand": "By Terry",
    "Product": "Eclat Opulent ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "By Terry",
    "Product": "Cover Expert ",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Catrice Cosmetics ",
    "Product": "HD Liquid Coverage ",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": "Xtended Wear",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Catrice Cosmetics ",
    "Product": "True Skin ",
    "Its compared to our": "Satin Sheer Medium ",
    "Base": "Satin ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Cel De Peau",
    "Product": "Radiant Cream Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Chanel ",
    "Product": "Vitalumiere Moisture- Rich Radiance Sunscreen Fluid Makeup",
    "Its compared to our": "Satin Ultra Sheer ",
    "Base": "Satin",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Chanel ",
    "Product": "Ultra Le Teint ",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": " Xtended Wear",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Chanel ",
    "Product": "Boy De Chanel Broad Specturm SPF 25 Sunscreen ",
    "Its compared to our": "Satin Sheer ",
    "Base": "Satin",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Chanel ",
    "Product": "Vitalumiere Aqua Teint Parfait Effet Seconde ",
    "Its compared to our": "Satin Sheer",
    "Base": "Satin Sheer ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Chanel ",
    "Product": "Ultra Le Teint Velvet ",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Chanel ",
    "Product": "Les Beiges ",
    "Its compared to our": "Radiant Ultra Sheer ",
    "Base": "Radiant ",
    "Coverage": "Ultra Sheer"
  },
  {
    "Brand": "Chantecaille ",
    "Product": "Oil Free Gel Foundation Future Skin ",
    "Its compared to our": "Satin Ultra Sheer",
    "Base": "Satin ",
    "Coverage": "Ultra Sheer"
  },
  {
    "Brand": "Charlotte Tibury ",
    "Product": " Magic Foundation ",
    "Its compared to our": "Xtended Wear Medium Full ",
    "Base": "Xtended Wear",
    "Coverage": "Medium-Full"
  },
  {
    "Brand": "Charlotte Tibury ",
    "Product": "Light Wonder Foundation ",
    "Its compared to our": "Radiant Ultra Sheer ",
    "Base": "Radiant ",
    "Coverage": "Ultra Sheer"
  },
  {
    "Brand": "Charlotte Tilbury ",
    "Product": "Airbursh Flawless Foundation ",
    "Its compared to our": "Xtended Wear Medium ",
    "Base": "Xtended",
    "Coverage": "Medium "
  },
  {
    "Brand": "Clarins",
    "Product": "Skin Illusion Foundation ",
    "Its compared to our": "Satin Sheer",
    "Base": "Satin ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Clinique",
    "Product": "Even Better Refresh ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Clinique",
    "Product": "Acne Solutions Liquid Makeup Foundation ",
    "Its compared to our": "Satin Medium ",
    "Base": "Satin",
    "Coverage": "Medium "
  },
  {
    "Brand": "Clinique",
    "Product": "Even Better Glow Light Reflecting Makeup ",
    "Its compared to our": "Radiant MEdium ",
    "Base": "Radiant ",
    "Coverage": "Medium "
  },
  {
    "Brand": "Clinique",
    "Product": "Even Better Clinical Serum Foundation ",
    "Its compared to our": "Xtended Sheer",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Clinique",
    "Product": "Even Better Broad Spectrum SPF15",
    "Its compared to our": "Satin Sheer",
    "Base": "Satin",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Clinique ",
    "Product": "Stay-Matte Oil-Free Makeup Foundation ",
    "Its compared to our": "Xtended Ultra Sheer ",
    "Base": "Xtended ",
    "Coverage": "Ultra Sheer "
  },
  {
    "Brand": "Clinique ",
    "Product": "Superbalanced Makeup Foundation",
    "Its compared to our": " Xtended Sheer ",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Clinique ",
    "Product": "Superbalanced Silk Makeup Foundation",
    "Its compared to our": "Satin Sheer Medium ",
    "Base": "Satin ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "ColourPop ",
    "Product": "Pretty Fresh Foundation ",
    "Its compared to our": "Radinat Medium Full ",
    "Base": "Radiant ",
    "Coverage": "Medium-Full "
  },
  {
    "Brand": "Cover FX ",
    "Product": "Powder Play ",
    "Its compared to our": "Satin Medium ",
    "Base": "Satin ",
    "Coverage": "Medium "
  },
  {
    "Brand": "Cover/ FX ",
    "Product": "Natural Finish Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Covergirl ",
    "Product": "Clean Fresh Skin Milk Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Covergirl ",
    "Product": "Simply Ageless 3-ni1 Liquid Foundation ",
    "Its compared to our": "SatinSheer",
    "Base": "Satin ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Danessa Myricks ",
    "Product": "Vision Cream Cover Adjustable Foundation & Concealer ",
    "Its compared to our": "Radiant Full ",
    "Base": "Radiant ",
    "Coverage": "Full "
  },
  {
    "Brand": "Dermablend ",
    "Product": "Flawless Creator Liquid Foundation Drops ",
    "Its compared to our": "Radiant Sheer Medium ",
    "Base": "Radiant ",
    "Coverage": "Sheer Medium"
  },
  {
    "Brand": "Dermablend ",
    "Product": "PrSmooth Liquid Camo Foundation ",
    "Its compared to our": "Xtended Wear Medium-Full ",
    "Base": "Xtended",
    "Coverage": "Medium-Full"
  },
  {
    "Brand": "Dior ",
    "Product": "Forever Natural Nude ",
    "Its compared to our": "Radiant Sheer",
    "Base": "Radiant ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Dior ",
    "Product": "Skin Glow ",
    "Its compared to our": "Radiant Sheer Medium ",
    "Base": "Radiant ",
    "Coverage": "Sheer Medium"
  },
  {
    "Brand": "Dior ",
    "Product": "Forever 24H Wear Perfection Skin Care ",
    "Its compared to our": "Xtended Sheer ",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Dior ",
    "Product": "FOREVER Undercover 24 HR Wear Full Coverage Fresh Weightless Foundation ",
    "Its compared to our": "Xtended Wear Medium ",
    "Base": "Xtended",
    "Coverage": "Medium "
  },
  {
    "Brand": "Dior ",
    "Product": "Backstage Face And  Body Foundation ",
    "Its compared to our": "Xtended Sheer ",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Dior ",
    "Product": "Backstage Pros Airflash ",
    "Its compared to our": "Satin Ultra Sheer ",
    "Base": "Satin ",
    "Coverage": "Ultra Sheer "
  },
  {
    "Brand": "Dose Of Colors ",
    "Product": "Meet Your Hue Foundation ",
    "Its compared to our": "Satin  Xtended-medium ",
    "Base": "Xtended ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Elcie Cosmetics ",
    "Product": "Micro Silque Foundation ",
    "Its compared to our": "Satin Sheer Medium ",
    "Base": "Satin",
    "Coverage": "Sheer Medium "
  },
  {
    "Brand": "ELF ",
    "Product": "Flawless Finish Foundation ",
    "Its compared to our": "Xtended Medium ",
    "Base": "Xtended ",
    "Coverage": "Medium "
  },
  {
    "Brand": "ELF ",
    "Product": "Acne Fighting Foudnation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "ELF ",
    "Product": "Acne Fighting Foundation ",
    "Its compared to our": "Satin Sheer-medium ",
    "Base": "Stain ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Essence ",
    "Product": "Pretty Natural Hydrating Foundation ",
    "Its compared to our": "Xtended Sheer ",
    "Base": "Xtended",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Estee Lauder ",
    "Product": "Futurist Hydra Rescue Moisturizing Foundation ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Estee Lauder ",
    "Product": "Double Wear Stay-in-Place Makeup",
    "Its compared to our": "Xtended Wear Sheer-Medium ",
    "Base": "Xtended",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Estee Lauder ",
    "Product": "Double Wear Light Soft Matte Hydra Makeup ",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": "Xtended",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Estee Lauder ",
    "Product": "Re-Nutriv Estee Luader Ultra Radiance Liquid ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Fenty ",
    "Product": "Pro Filt'r Soft Matte Longwear Foundation",
    "Its compared to our": "Xtended Sheer",
    "Base": "Xtended",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Fenty ",
    "Product": "Pro Filt'r Hydrating Longewear Foundation ",
    "Its compared to our": "Radiant Sheer",
    "Base": "Radiant ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "FLOWER Beauty ",
    "Product": "Light Illusion Liquid Foundation ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radaint ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Frankie Rose ",
    "Product": "Matte Perfection Foundation ",
    "Its compared to our": "Sheer Medium ",
    "Base": "",
    "Coverage": "Sheer Medium "
  },
  {
    "Brand": "Givenchy ",
    "Product": "Prisme Libre Skin Caring Glow ",
    "Its compared to our": "Radiant  Ultra Sheer ",
    "Base": "Radiant ",
    "Coverage": "Ulta Sheer"
  },
  {
    "Brand": "Givenchy ",
    "Product": "Matissime Velvet Radiant Mattifying Foundation ",
    "Its compared to our": "Stain Ultra-Sheer ",
    "Base": "Stain ",
    "Coverage": "Ultra-Sheer "
  },
  {
    "Brand": "Givenchy ",
    "Product": "Prisme Libre Skin-Caring Glow Foundation ",
    "Its compared to our": "Radiant Ultra Sheer",
    "Base": "Radiant ",
    "Coverage": "Ultra Sheer"
  },
  {
    "Brand": "Givenchy ",
    "Product": "Teint Couture Everwear 24H Foundation ",
    "Its compared to our": "Satin Sheer",
    "Base": "Satin ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Gorgio Armani ",
    "Product": "Neo Nude Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Gorgio Armani ",
    "Product": "Luminous Silk Perfect Glow Flawless Foundation",
    "Its compared to our": "Satin Sheer Medium ",
    "Base": "Satin ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Gorgio Armani ",
    "Product": "Designer Kift Smoothing Firming Full CoverageFoundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Gorgio Armani ",
    "Product": "Maestro Fusion Makeup",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream",
    "Coverage": ""
  },
  {
    "Brand": "Gorgio Armani ",
    "Product": "Power Fabric Longwear High Cover Foundation ",
    "Its compared to our": "Satin Sheer Medium ",
    "Base": "Satin ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Gucci ",
    "Product": "Fluide De Beaute Fini Naturel ",
    "Its compared to our": "Satin Sheer-medium ",
    "Base": "Satin ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Guerlain ",
    "Product": "Lingerie De Peau Natural Foundation ",
    "Its compared to our": "Xtended Sheer ",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Hourglass ",
    "Product": "Immaculate Liquid Powder Foundation Mattifying ",
    "Its compared to our": "Xtended Sheer ",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Hourglass ",
    "Product": "Veil Fluid Makeup ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Hourglass ",
    "Product": "Varish Seamless Finish ",
    "Its compared to our": "Radiant Sheer",
    "Base": "Radiant ",
    "Coverage": "Sheer "
  },
  {
    "Brand": "HUDA Beauty ",
    "Product": "#Fauxfilter Luminous Matte Full Coverage Liquid Foundation ",
    "Its compared to our": "Xtended Wear Full ",
    "Base": "Xtended",
    "Coverage": "Full"
  },
  {
    "Brand": "Il Makiage ",
    "Product": "After Party Next Gen Full Coverage Foundation ",
    "Its compared to our": "Xtented Full ",
    "Base": "Xtened ",
    "Coverage": "Full"
  },
  {
    "Brand": "Il Makiage ",
    "Product": "Woke Up Like This Flawless Finish Foundation ",
    "Its compared to our": "Satin Sheer Medium ",
    "Base": "Stain ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "It Cosmetics ",
    "Product": "Your Skin But Better Foundation + Skincare",
    "Its compared to our": "Radiant Sheer",
    "Base": "Radiant ",
    "Coverage": ""
  },
  {
    "Brand": "Jane Iredale ",
    "Product": "Liquid Minerals Liquid Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Jane Iredale ",
    "Product": "Beyond Matte Liquid Foundation ",
    "Its compared to our": "Xtended Wear Sheer-Medium ",
    "Base": "Xtended",
    "Coverage": "Medium "
  },
  {
    "Brand": "Josie Maran ",
    "Product": "Vibrancy Argan Oil Foundation Fluid ",
    "Its compared to our": "Radiant Ultra Sheer ",
    "Base": "BB Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Jouer Cosmetics ",
    "Product": "Essential High Coverage Creme Foundation ",
    "Its compared to our": "Satin Full ",
    "Base": "Satin ",
    "Coverage": "Full "
  },
  {
    "Brand": "Juvia's Place ",
    "Product": "I Am Magic ",
    "Its compared to our": " Stain Full ",
    "Base": "Satin ",
    "Coverage": "Full "
  },
  {
    "Brand": "Kat Von D",
    "Product": "Lock-it Foundation ",
    "Its compared to our": "Xtended Wear Medium-Full ",
    "Base": "Xtended ",
    "Coverage": "Medium-Full "
  },
  {
    "Brand": "Kat Von D",
    "Product": "Ture Portrait Liquid-to-Powder Foundation ",
    "Its compared to our": "Xtended Wear Medium ",
    "Base": "Xtended",
    "Coverage": "Medium "
  },
  {
    "Brand": "Kevin Aucoin ",
    "Product": "The Sensual Skin Fluid Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Kevin Aucoin ",
    "Product": "The Etherealist Skin Illuminating ",
    "Its compared to our": "Xtended Sheer Medium ",
    "Base": "Xtended ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "KIKO Milano ",
    "Product": "Full Coverage 2 in1  Foundation & Conealer ",
    "Its compared to our": "Xtended Sheer MEdium ",
    "Base": "Xtended",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "KIKO Milano ",
    "Product": "New Unlimited Foundation ",
    "Its compared to our": "Xtented Wear Sheer ",
    "Base": "Xtented",
    "Coverage": "Sheer "
  },
  {
    "Brand": "KIKO Milano ",
    "Product": "Wonder Woman Born To Last Foundation 24H",
    "Its compared to our": "Xtended Sheer Medium ",
    "Base": "Xtended ",
    "Coverage": "Sheer-medium "
  },
  {
    "Brand": "KIKO Milano ",
    "Product": "Tuscan Sunshine Luminous Foundation ",
    "Its compared to our": "Satin Ultra Sheer ",
    "Base": "Satin",
    "Coverage": "Sheer "
  },
  {
    "Brand": "KIKO Milano ",
    "Product": "Mood Boost Luminous Foundation ",
    "Its compared to our": "Radiant Sheer",
    "Base": "Radiant",
    "Coverage": "Sheer"
  },
  {
    "Brand": "KIKO Milano ",
    "Product": "Smart Hydrating Foundation ",
    "Its compared to our": "BB Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "KIKO Milano ",
    "Product": "Nothing Matte-R Mattifying Foundation ",
    "Its compared to our": "Satin Sheer Medium ",
    "Base": "Satin",
    "Coverage": "Medium "
  },
  {
    "Brand": "Kjear Weis ",
    "Product": "Invisible Touch Liquid Foundation ",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Koh Gen Do",
    "Product": " Maifanshi Moisture Foundation ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Koh Gen Do ",
    "Product": "Maifanshi Aqua Foudnation ",
    "Its compared to our": "Radiant Ultra Sheer ",
    "Base": "Radiant ",
    "Coverage": "Ultra Sheer "
  },
  {
    "Brand": "L.A Girl",
    "Product": "Pro Matte Foundation ",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": "Xtended",
    "Coverage": "Sheer "
  },
  {
    "Brand": "L.A Girl",
    "Product": "Pro Coverage Liquid Foundation ",
    "Its compared to our": "Radiant Sheer Medium ",
    "Base": "Radiant ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "L'oreal ",
    "Product": "True Match Super Blendable",
    "Its compared to our": "Radiant Sheer Medium ",
    "Base": "Radiant ",
    "Coverage": "Sheer Medium "
  },
  {
    "Brand": "L'oreal ",
    "Product": "Infallable Pro Matte Foundation ",
    "Its compared to our": "Xtended Sheer ",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "L'oreal ",
    "Product": "Infallable Pro-Glow Foundation ",
    "Its compared to our": "Radiant Medium ",
    "Base": "Radiant ",
    "Coverage": "Medium "
  },
  {
    "Brand": "L'oreal ",
    "Product": "Infallable ADV never Fail Makeup",
    "Its compared to our": "Xtended Sheer ",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "L'oreal ",
    "Product": "True Match Lumi Healthy Luminous Makeup",
    "Its compared to our": "Radiant Sheer",
    "Base": "Radiant ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "L'oreal  ",
    "Product": "Infallable 24 HR Fresh Wear Foundation ",
    "Its compared to our": "Radiant Medium Full",
    "Base": "Radiant",
    "Coverage": "Medium-Full "
  },
  {
    "Brand": "L'oreal Paris ",
    "Product": "Infallible Full Coverage ",
    "Its compared to our": "Xtended Medium",
    "Base": "Xtended ",
    "Coverage": "Medium"
  },
  {
    "Brand": "La Mer",
    "Product": "The Soft Fluid Long Wear Foundation ",
    "Its compared to our": "Xtended Sheer",
    "Base": "Xtended ",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Lancome ",
    "Product": "Rengergie Lift Makeup Lightweight Luqid Foundation ",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Lancome ",
    "Product": "Teibt Idole Long Wearr Foundation ",
    "Its compared to our": "Satin Sheer ",
    "Base": "Satin ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Laura Mercier",
    "Product": "Flawless Lumiere Radiance-Perfecting Foundation ",
    "Its compared to our": "Satin Sheer ",
    "Base": "Satin",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Laura Mercier",
    "Product": "Flawless Fusion Ultra Longwear Foundation ",
    "Its compared to our": "Xtended Sheer",
    "Base": "Xtended ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Laura Mercier",
    "Product": "Silk Creme Moisturizing Photo Edition Foundation ",
    "Its compared to our": "Radiant Sheer Medium ",
    "Base": "Radiant",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Lawless",
    "Product": " Woke Up Like This ",
    "Its compared to our": "Xtended Sheer Medium ",
    "Base": "Xtended ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "LYS ",
    "Product": "Tripel Fix Serum Foundation ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer "
  },
  {
    "Brand": "MAC ",
    "Product": "Studio Waterweight SPF 30 Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "MAC ",
    "Product": "Pro Longwear Norishing Waterproof Foundation ",
    "Its compared to our": "Xtended Wear Sheer- Medium ",
    "Base": "Xtended",
    "Coverage": "Medium "
  },
  {
    "Brand": "MAC ",
    "Product": "Studio Radiance Face & Body Radiant Sheer ",
    "Its compared to our": "Radiant Ultra Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer "
  },
  {
    "Brand": "MAC ",
    "Product": "Studio Fix Fluid SPF15 Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Makeup Atelier Paris ",
    "Product": "Fluid Foundation ",
    "Its compared to our": "Satin Medium ",
    "Base": "Satin ",
    "Coverage": "Medium "
  },
  {
    "Brand": "Makeup Forever",
    "Product": "Ultra HD Foundation ",
    "Its compared to our": "Satin Ultra Sheer ",
    "Base": "Satin",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Makeup Forever",
    "Product": "Matte Velvet Skin Liquid Foundation ",
    "Its compared to our": "Xtended Wear Sheer- Medium ",
    "Base": "Xtended",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Makeup Forever",
    "Product": "REBOOT Active Care Revitalizing Foundation ",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Makeup Forever",
    "Product": "Water Blend ",
    "Its compared to our": "Radiant Ultra Sheer ",
    "Base": "Radiant ",
    "Coverage": "Ultra Sheer "
  },
  {
    "Brand": "Makeup Forever ",
    "Product": "Full Cover Extreme Camouflage Cream ",
    "Its compared to our": "Xtended Full ",
    "Base": "Xtended ",
    "Coverage": "Full "
  },
  {
    "Brand": "Makeup Revolution ",
    "Product": "Conceal & Define",
    "Its compared to our": "Satin Sheer-medium ",
    "Base": "Stain ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Marc Jacobs ",
    "Product": "Extra Shot Caffeine Concealer and Foundation ",
    "Its compared to our": "Radiant Full ",
    "Base": "Radiant ",
    "Coverage": "Full "
  },
  {
    "Brand": "Marc Jacobs Beauty ",
    "Product": "Re(marc)able Full Cover Foundation Concentrate ",
    "Its compared to our": "Xtended Medium-Full",
    "Base": "Xtended ",
    "Coverage": "Medium-Full "
  },
  {
    "Brand": "Maybelline ",
    "Product": "Fit Me Dewy+ Smooth Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Maybelline ",
    "Product": "Dream Urban Cover Flawless Coverage Makeup Foundation SPF 50",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Maybelline ",
    "Product": "Dream Radiant Liquid Foundation ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Maybelline ",
    "Product": "Super Stay Full Coverage Foundation",
    "Its compared to our": "Xtened Full ",
    "Base": "Xtended ",
    "Coverage": "Full"
  },
  {
    "Brand": "Maybelline ",
    "Product": "Fit ME Matte + Poreless Liquid Foundation ",
    "Its compared to our": "Satin Sheer-Medium ",
    "Base": "Satin ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Milani ",
    "Product": "Conceal + Perfect 2-in1Foundation + Concealer ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Milani ",
    "Product": "Screen Queen Foundation ",
    "Its compared to our": "Xtended Ultra Sheer",
    "Base": "Xtended ",
    "Coverage": "Ultra Sheer "
  },
  {
    "Brand": "Milk Makeup ",
    "Product": "Blur Liquid Matte Foundation ",
    "Its compared to our": "Satin Medium Full",
    "Base": "Satin ",
    "Coverage": "Medium-Full"
  },
  {
    "Brand": "Nars ",
    "Product": "Natural Radiant Longwear Foundation ",
    "Its compared to our": "Radiant Medium",
    "Base": "Radiant",
    "Coverage": "Medium "
  },
  {
    "Brand": "Nars ",
    "Product": "All Day Luminous Weightless Foundation ",
    "Its compared to our": "Satin Ultra Sheer ",
    "Base": "Satin ",
    "Coverage": "Ultra Sheer "
  },
  {
    "Brand": "Nars ",
    "Product": "Sheer Glow Foundation ",
    "Its compared to our": "Satin Medium ",
    "Base": "Satin",
    "Coverage": "Medium "
  },
  {
    "Brand": "Nars ",
    "Product": "Soft Matte Comlete Foundation ",
    "Its compared to our": "Satin Sheer-Medium ",
    "Base": "Satin ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Natasha Denona ",
    "Product": "Foundation X+Full Coverage Fruit Complex ",
    "Its compared to our": "Xtended Wear Medium",
    "Base": "Xtended",
    "Coverage": "Medium "
  },
  {
    "Brand": "Natasha Denona ",
    "Product": "Transformatte Pore Vanishing Matte Foundation ",
    "Its compared to our": "Xtended Wear Sheer",
    "Base": "Xtended",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Natasha Denona ",
    "Product": "Face Glow Foundation ",
    "Its compared to our": "Radiant Ultra Sheer",
    "Base": "Radiant ",
    "Coverage": "Ultra Sheer "
  },
  {
    "Brand": "NYX",
    "Product": "Born to Glow Medium Coverage Naturally Radiant Foundation ",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream",
    "Coverage": ""
  },
  {
    "Brand": "NYX",
    "Product": "Can't Stop Won't Stop 24HR Full Coverage MAtte Foundation ",
    "Its compared to our": "Xtened Sheer ",
    "Base": "Xtened",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Ofra ",
    "Product": "Absoluate Cover Foundation ",
    "Its compared to our": "Xtended Sheer-Medium ",
    "Base": "Xtended",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Origins ",
    "Product": "Pretty In Bloom SPF 20 Flower-Infused Long-Wear Foundation ",
    "Its compared to our": "Satin Medium ",
    "Base": "Satin ",
    "Coverage": "Medium "
  },
  {
    "Brand": "Pacifica ",
    "Product": "Alright Clean Foundation ",
    "Its compared to our": "Radiant Sheer Medium ",
    "Base": "Radiant ",
    "Coverage": "Sheer Medium "
  },
  {
    "Brand": "Pat McGrath ",
    "Product": "Sublime Perfection Foundation",
    "Its compared to our": "Rdaint Ultra sheer ",
    "Base": "Radiant",
    "Coverage": "Ultra Sheer"
  },
  {
    "Brand": "PUR",
    "Product": "Love Your Selfie Longwear Foundation",
    "Its compared to our": "Xtended Wear Full ",
    "Base": "Xtended",
    "Coverage": "Full"
  },
  {
    "Brand": "Rare Beauty",
    "Product": "Liquid Touch Weightless Foundation",
    "Its compared to our": "Satin Sheer",
    "Base": "Satin ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Revlon",
    "Product": " Colorstay Makeup For Combo/Oily Skin ",
    "Its compared to our": "Xtended Wear Sheer ",
    "Base": "Xtended",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Revlon",
    "Product": "Colorstay Light Cover Foundation ",
    "Its compared to our": "Xtended Sheer ",
    "Base": "Xtended",
    "Coverage": "Sheer"
  },
  {
    "Brand": "RMS Beauty ",
    "Product": "\"Un\" Coverage Up Foundation ",
    "Its compared to our": "Radiant Medium",
    "Base": "Radiant",
    "Coverage": "Medium "
  },
  {
    "Brand": "Rodial ",
    "Product": "Diamond Foundation ",
    "Its compared to our": "Satin Medium-Full",
    "Base": "Satin",
    "Coverage": "Full"
  },
  {
    "Brand": "Samashbox",
    "Product": "Studio Skin 24 Hour Full Coverage Waterproof Foundation ",
    "Its compared to our": "Xtended Full ",
    "Base": "Xtended ",
    "Coverage": "Full "
  },
  {
    "Brand": "Sephora ",
    "Product": "Best Skin Ever Liquid Foundation ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Sephora ",
    "Product": "Perfection Mist Airbrush Foundation ",
    "Its compared to our": "Xtended Sheer Medium ",
    "Base": "Xtended ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Sephora ",
    "Product": "10 Hour Wear Perfection Foundation ",
    "Its compared to our": "Radiant Medium ",
    "Base": "Radiant",
    "Coverage": "Medium "
  },
  {
    "Brand": "Sephora Collection ",
    "Product": "10 Hour Wear Perfection Foundation ",
    "Its compared to our": "Satin Medium ",
    "Base": "Stain ",
    "Coverage": "Medium "
  },
  {
    "Brand": "Shiseido ",
    "Product": "Synchro Skin Self-Refeshing Foundation ",
    "Its compared to our": "Xtended Wear Sheer-Medium ",
    "Base": "Xtended",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Shiseido ",
    "Product": "Synchro Skin Radiant Lifting Foundation  ",
    "Its compared to our": "Radiant Medium Full",
    "Base": "Radiant ",
    "Coverage": "Medium-Full "
  },
  {
    "Brand": "Shiseido ",
    "Product": "Future Solition LX-Total Radiance Foundation ",
    "Its compared to our": "Satin Sheer Medium ",
    "Base": "Satin ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Sisley",
    "Product": "Phyto-Teint Ultra Eclat ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Sisley Paris ",
    "Product": "Phyto Teint Beautifying Tinted Moisturizer ",
    "Its compared to our": "Radiant Ultra Sheer ",
    "Base": "Radiant",
    "Coverage": "Ultra Sheer"
  },
  {
    "Brand": "Sisley Paris ",
    "Product": "Teint Expert ",
    "Its compared to our": "Xtended Sheer",
    "Base": "Xtended ",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Sleek Beauty ",
    "Product": "Lifeproof Foundation ",
    "Its compared to our": "Xtented Wear Sheer ",
    "Base": "Xtented",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Smashbox ",
    "Product": "Studio Skin 24HR Hydra Foundation ",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Stila ",
    "Product": "Stay All Day Foundation+Concealer ",
    "Its compared to our": "Radiant Full ",
    "Base": "Radiant ",
    "Coverage": "Full "
  },
  {
    "Brand": "Stilla ",
    "Product": "Ligerie Souffle Skin Perfecting Color ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Tarte ",
    "Product": "Face Tape Foundation ",
    "Its compared to our": "Satin Medium-Full",
    "Base": "Satin ",
    "Coverage": "Medium-Full "
  },
  {
    "Brand": "Tarte ",
    "Product": "Multi-tasking Foundation Broad Spectrun SPF 20 Sunscreen ",
    "Its compared to our": "Radiant Glow Sheer- Medium ",
    "Base": "Radiant",
    "Coverage": "Medium"
  },
  {
    "Brand": "Tarte ",
    "Product": "High Performance Naturals Amazonian Clay Full Coverage ",
    "Its compared to our": "Satin Medium Full",
    "Base": "Satin",
    "Coverage": "Medium Full"
  },
  {
    "Brand": "The Ordinary ",
    "Product": "Serum Foundation ",
    "Its compared to our": "Satin Sheer ",
    "Base": "Satin ",
    "Coverage": "Sheer "
  },
  {
    "Brand": "The Ordinary ",
    "Product": "Coverage Foundation  ",
    "Its compared to our": "Radiant Medium ",
    "Base": "Radiant ",
    "Coverage": "Medium "
  },
  {
    "Brand": "Tom Ford",
    "Product": "Traceless Soft Matte Foundation ",
    "Its compared to our": "Satin Medium ",
    "Base": "Satin ",
    "Coverage": "Medium "
  },
  {
    "Brand": "Tom Ford ",
    "Product": "Soleil Flawless Glow Foundation SPF",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Tom Ford ",
    "Product": "Shade and Illuminiate Soft Radiant Foundation SPF50",
    "Its compared to our": "Radiant Sheer ",
    "Base": "Radiant",
    "Coverage": "Sheer "
  },
  {
    "Brand": "Tom Ford ",
    "Product": "Glow Tinted Moisturizer SPF 15",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Too Faced ",
    "Product": "Born This Way Undetectable ",
    "Its compared to our": "Satin Sheer ",
    "Base": "Satin ",
    "Coverage": "Sheer"
  },
  {
    "Brand": "Too Faced ",
    "Product": "Born This Way Matte 24 Hour Foundation  ",
    "Its compared to our": "Xtended Medium ",
    "Base": "Xtended ",
    "Coverage": "Medium "
  },
  {
    "Brand": "Too Faced ",
    "Product": "Peach Perfect Comfort Matte Foundation ",
    "Its compared to our": "Xtended Sheer Medium ",
    "Base": "Xtended ",
    "Coverage": "Sheer -Medium "
  },
  {
    "Brand": "Uoma ",
    "Product": "Say What?! Foundation ",
    "Its compared to our": "Xtended Medium ",
    "Base": "Xtended",
    "Coverage": "Medium"
  },
  {
    "Brand": "Urban Decay ",
    "Product": "Stay Naked Weightless Foundation ",
    "Its compared to our": "Satin Sheer- Medium",
    "Base": "Satin",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "Urban Decay ",
    "Product": "All Nighter Liquid Foundation ",
    "Its compared to our": "Xtended Wear Full ",
    "Base": "Xtended",
    "Coverage": "Full"
  },
  {
    "Brand": "VDL ",
    "Product": "Perfect-Lasting Foundation ",
    "Its compared to our": "Stain Medium-Full",
    "Base": " Satin ",
    "Coverage": "Medium-Full "
  },
  {
    "Brand": "Wander Beauty ",
    "Product": "Nude Illusion Liquid Foundation ",
    "Its compared to our": "Radiant Medium Full",
    "Base": "Radiant ",
    "Coverage": "Medium Full "
  },
  {
    "Brand": "Wet n Wild ",
    "Product": "Phto Finsh ",
    "Its compared to our": "BB Cream ",
    "Base": "BB Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Wet n Wild ",
    "Product": "Photofocus Dewy Luminex",
    "Its compared to our": "Satin Sheer ",
    "Base": "Satin",
    "Coverage": "Sheer "
  },
  {
    "Brand": "YSL ",
    "Product": "All Hours Foundation Flawless Matte ",
    "Its compared to our": "Satin Ultra Sheer",
    "Base": "Satin ",
    "Coverage": "Ulta Sheer "
  },
  {
    "Brand": "YSL ",
    "Product": "Touche Eclat Le Teubt Radiant Foundation ",
    "Its compared to our": "Radiant Sheer-Medium ",
    "Base": "Radiant ",
    "Coverage": "Sheer-Medium "
  },
  {
    "Brand": "YSL ",
    "Product": "Touche Eclat All In One GLow ",
    "Its compared to our": "CC Cream ",
    "Base": "CC Cream ",
    "Coverage": ""
  },
  {
    "Brand": "Zoeva ",
    "Product": "Authentik Skin Natural Luminous Foundation ",
    "Its compared to our": "Radiant Sheer Medium ",
    "Base": "Radiant ",
    "Coverage": "Sheer-Medium "
  }
 ]

export const doIt = async () => {
    const formatedData = data.map((d) => ({
        product: d.Product?.trim(),
        brand: d.Brand?.trim(),
        base: d.Base?.trim(),
        coverage: d.Coverage?.trim(),
    }))

    try {
        const result = await Promise.all(
            formatedData.map(async (option) => brandFoundationModal.create(option)),
        )

        console.info('Records Saved --->', result.length)
    } catch (err) {
        console.info('ERRRRR', err)
    }
}

