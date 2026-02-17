/**
 * Hierarchical location data for India
 * Structure: State → City → Taluka → Village
 * Expand this data as needed for your application
 */

const locationData = {
    "Maharashtra": {
        "Pune": {
            "Haveli": ["Wagholi", "Lohegaon", "Keshavnagar", "Manjari", "Fursungi"],
            "Mulshi": ["Pirangut", "Paud", "Lavasa", "Bhugaon", "Tamhini"],
            "Maval": ["Talegaon", "Lonavala", "Kamshet", "Vadgaon", "Kanhe"],
            "Baramati": ["Baramati", "Malegaon", "Supe", "Katewadi", "Morgaon"],
            "Purandar": ["Saswad", "Jejuri", "Narayanpur", "Dive", "Rajewadi"]
        },
        "Mumbai": {
            "Andheri": ["Versova", "Lokhandwala", "Oshiwara", "Jogeshwari", "Goregaon"],
            "Borivali": ["Dahisar", "Mira Road", "Kandivali", "Malad", "Gorai"],
            "Kurla": ["Chunabhatti", "Sion", "Wadala", "Chembur", "Govandi"],
            "Thane": ["Kalwa", "Mumbra", "Diva", "Bhiwandi", "Ulhasnagar"]
        },
        "Nagpur": {
            "Nagpur Urban": ["Dharampeth", "Sitabuldi", "Sadar", "Itwari", "Mahal"],
            "Hingna": ["Hingna", "Wadi", "Butibori", "Kalmeshwar", "Kanhan"],
            "Kamptee": ["Kamptee", "Parseoni", "Mouda", "Koradi", "Fetri"]
        },
        "Nashik": {
            "Nashik": ["Panchavati", "Satpur", "Cidco", "Indira Nagar", "Gangapur"],
            "Igatpuri": ["Igatpuri", "Ghoti", "Kasara", "Trimbak", "Harsul"],
            "Dindori": ["Dindori", "Vani", "Surgana", "Peth", "Kalwan"]
        }
    },
    "Karnataka": {
        "Bangalore": {
            "Bangalore North": ["Yelahanka", "Hebbal", "Thanisandra", "Jakkur", "Sahakarnagar"],
            "Bangalore South": ["Jayanagar", "JP Nagar", "Banashankari", "BTM Layout", "HSR Layout"],
            "Bangalore East": ["Whitefield", "Marathahalli", "Varthur", "Kadugodi", "Hoodi"],
            "Anekal": ["Anekal", "Chandapura", "Attibele", "Jigani", "Bommasandra"]
        },
        "Mysore": {
            "Mysore": ["Vijayanagar", "Kuvempunagar", "Gokulam", "Hebbal", "Saraswathipuram"],
            "Nanjangud": ["Nanjangud", "Hullahalli", "Chamarajanagar", "Gundlupet", "Yelandur"],
            "Hunsur": ["Hunsur", "Periyapatna", "Krishnarajanagar", "Gavadagere", "Mirle"]
        },
        "Hubli": {
            "Hubli": ["Vidyanagar", "Gokul Road", "Keshwapur", "Old Hubli", "Navanagar"],
            "Dharwad": ["Dharwad", "Saptapur", "Kelgeri", "Narendra", "Alnavar"]
        }
    },
    "Gujarat": {
        "Ahmedabad": {
            "Ahmedabad City": ["Navrangpura", "Satellite", "Maninagar", "Vastrapur", "Bodakdev"],
            "Daskroi": ["Odhav", "Naroda", "Nikol", "Vastral", "Gota"],
            "Sanand": ["Sanand", "Changodar", "Bavla", "Dholka", "Viramgam"]
        },
        "Surat": {
            "Surat City": ["Adajan", "Vesu", "Athwa", "Udhna", "Katargam"],
            "Choryasi": ["Sachin", "Hazira", "Ichhapore", "Mora", "Dumas"],
            "Kamrej": ["Kamrej", "Kim", "Kosamba", "Kadodara", "Palsana"]
        },
        "Rajkot": {
            "Rajkot": ["Sadhu Vaswani Road", "Kalawad Road", "University Road", "Gondal Road", "Jamnagar Road"],
            "Gondal": ["Gondal", "Jetpur", "Dhoraji", "Upleta", "Jamkandorna"]
        }
    },
    "Rajasthan": {
        "Jaipur": {
            "Jaipur": ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Raja Park", "C-Scheme"],
            "Amber": ["Amber", "Jhotwara", "Achrol", "Naila", "Kukas"],
            "Sanganer": ["Sanganer", "Pratap Nagar", "Jagatpura", "Sitapura", "Muhana"]
        },
        "Udaipur": {
            "Udaipur": ["Fatehpura", "Hiran Magri", "Pratap Nagar", "Sukhadia Circle", "Chetak Circle"],
            "Salumber": ["Salumber", "Sarada", "Kherwara", "Rishabhdeo", "Kotra"],
            "Vallabhnagar": ["Vallabhnagar", "Mavli", "Gogunda", "Jhadol", "Girwa"]
        },
        "Jodhpur": {
            "Jodhpur": ["Ratanada", "Paota", "Sardarpura", "Chopasni", "Mandore"],
            "Phalodi": ["Phalodi", "Lohawat", "Bhopalgarh", "Osian", "Balesar"]
        }
    },
    "Tamil Nadu": {
        "Chennai": {
            "Chennai North": ["Tondiarpet", "Royapuram", "George Town", "Perambur", "Kolathur"],
            "Chennai South": ["Mylapore", "Adyar", "Velachery", "Guindy", "T. Nagar"],
            "Chennai West": ["Porur", "Ramapuram", "Valasaravakkam", "Virugambakkam", "Saligramam"],
            "Ambattur": ["Ambattur", "Avadi", "Poonamallee", "Thirumullaivoyal", "Maduravoyal"]
        },
        "Coimbatore": {
            "Coimbatore North": ["Gandhipuram", "RS Puram", "Saibaba Colony", "Peelamedu", "Singanallur"],
            "Coimbatore South": ["Podanur", "Kinathukadavu", "Madukkarai", "Pollachi", "Valparai"],
            "Mettupalayam": ["Mettupalayam", "Karamadai", "Annur", "Alandurai", "Sirumugai"]
        },
        "Madurai": {
            "Madurai North": ["Anna Nagar", "KK Nagar", "Goripalayam", "Teppakulam", "Tallakulam"],
            "Madurai South": ["Thirunagar", "Palanganatham", "Vilangudi", "Vandiyur", "Oomachikulam"],
            "Melur": ["Melur", "Kottampatti", "Vadipatti", "Thirumangalam", "Peraiyur"]
        }
    }
};

module.exports = locationData;
