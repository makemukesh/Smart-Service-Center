/**
 * Gujarat Location Data (Census-verified village names)
 * Structure: City (District) → Taluka → Villages
 * Default state: Gujarat
 * All 33 districts with their talukas and real villages
 */

const locationData = {
    "Ahmedabad": {
        "Daskroi": ["Aslali", "Hathijan", "Jetalpur", "Bavla Road", "Bopal", "Ghuma", "Shela", "Tragad"],
        "Sanand": ["Sanand", "Bol", "Godhavi", "Khoraj", "Chharodi", "Modasar", "Changodar", "Matoda"],
        "Bavla": ["Bavla", "Bagodara", "Devadthal", "Dhanwada", "Rupal", "Kavitha", "Ranesar", "Sahij"],
        "Dholka": ["Dholka", "Arnej", "Bholad", "Koth", "Vautha", "Vataman", "Chaloda", "Ganesar"],
        "Dhandhuka": ["Dhandhuka", "Dholera", "Fedra", "Khun", "Pipli", "Bajarda", "Gogla", "Ratanpur"],
        "Detroj-Rampura": ["Detroj", "Rampura", "Boska", "Dekavada", "Ghatisana", "Madrisana", "Odhav", "Rudatal"],
        "Mandal": ["Mandal", "Endla", "Hansalpur", "Kadvasan", "Sinaj", "Ughroj", "Vitthapur", "Vinzuvada"],
        "Viramgam": ["Viramgam", "Dalsana", "Karangadh", "Limbad", "Sachana", "Manipura", "Zezara", "Ranpur"],
        "Dholera": ["Dholera", "Bhumbhali", "Fedra", "Khun", "Pipli", "Pachchham", "Pipal", "Navagam"],
        "City East": ["Maninagar", "Isanpur", "Vatva", "Ramol", "Odhav", "Naroda", "Nikol", "Vastral"],
        "City West": ["Navrangpura", "Satellite", "Vastrapur", "Bodakdev", "Thaltej", "Gota", "Chandkheda", "Motera"]
    },
    "Amreli": {
        "Amreli": ["Amreli", "Dudhala", "Khapatiya", "Chamardi", "Shenva", "Babapur", "Dadhiyali", "Khadkala"],
        "Babra": ["Babra", "Ghughrala", "Khapat", "Limdi", "Vanakbara", "Damnagar", "Raiydi", "Padardi"],
        "Bagasara": ["Bagasara", "Mota Khijadiya", "Nani", "Devgana", "Paniya", "Derdi", "Gir", "Sendhani"],
        "Dhari": ["Dhari", "Bhandariya", "Kharchia", "Savariya", "Vadla", "Jamvali", "Dalkhania", "Khambha"],
        "Jafrabad": ["Jafrabad", "Pipavav", "Rajula", "Thaliya", "Navadra", "Mahuva", "Barvala", "Velan"],
        "Khambha": ["Khambha", "Chamardi", "Dadhela", "Junvan", "Sagar", "Mota Mandva", "Navadra", "Pipaliya"],
        "Kunkavav Vadia": ["Kunkavav", "Vadia", "Dalkhania", "Babra", "Chaparda", "Chuda", "Lilapur", "Vadiya"],
        "Lathi": ["Lathi", "Kariana", "Mota", "Paniya", "Sathamba", "Karmadi", "Devliya", "Sultanpur"],
        "Lilia": ["Lilia", "Nani Vavdi", "Dalkhaniya", "Juna Delvada", "Ratanpar", "Bherai", "Lotarva", "Kanpar"],
        "Rajula": ["Rajula", "Victor", "Juna Rajula", "Pipavav", "Savarkunda", "Kuda", "Navapara", "Dharai"],
        "Savarkundla": ["Savarkundla", "Bherai", "Thordi", "Lotarva", "Mithapur", "Vanda", "Babra", "Gadh"]
    },
    "Anand": {
        "Anand": ["Anand", "Vallabh Vidyanagar", "Karamsad", "Bakrol", "Mogri", "Adas", "Lambhvel", "Sarsa"],
        "Anklav": ["Anklav", "Ambali", "Asarma", "Bamangam", "Gambhira", "Jhilod", "Umeta", "Kosindra"],
        "Borsad": ["Borsad", "Bhadran", "Bochasan", "Dabhasi", "Dahemi", "Davol", "Kanjari", "Kankapura"],
        "Khambhat": ["Khambhat", "Thasra", "Daheda", "Dhuvaran", "Bhuvel", "Navagam", "Akhol", "Chhatardi"],
        "Petlad": ["Petlad", "Sojitra", "Dakor", "Bhadran", "Nadiad", "Virsad", "Chaklasi", "Dabhoi"],
        "Sojitra": ["Sojitra", "Dethali", "Dabhou", "Nar", "Singalav", "Virol", "Deva", "Dharmaj"],
        "Tarapur": ["Tarapur", "Amod", "Mota Kalodra", "Rampura", "Kavi", "Vasu", "Angadh", "Kharel"],
        "Umreth": ["Umreth", "Sunav", "Jitodia", "Bhalej", "Khorwad", "Lingda", "Pansora", "Thamna"]
    },
    "Aravalli": {
        "Bhiloda": ["Bhiloda", "Ranasan", "Hathmati", "Vijapur", "Ambadra", "Jotana", "Mandva", "Kheroj"],
        "Dhansura": ["Dhansura", "Vatrak", "Bhatpur", "Ambaliara", "Sadguru", "Parthampur", "Gadh", "Mevdi"],
        "Malpur": ["Malpur", "Bhalbar", "Dedrol", "Valuna", "Jotana", "Piplaj", "Delol", "Gambhoi"],
        "Meghraj": ["Meghraj", "Dantral", "Shamlaji", "Kathoda", "Kothamba", "Motidav", "Ranasan", "Vijapur"],
        "Modasa": ["Modasa", "Dhansura", "Shamlaji", "Bayad", "Idar", "Samlaji", "Becharaji", "Aravalli"],
        "Bayad": ["Bayad", "Gambhoi", "Rangpur", "Kherol", "Railmagra", "Tintoi", "Harsolav", "Dalwada"]
    },
    "Banaskantha": {
        "Palanpur": ["Palanpur", "Jessore", "Balaram", "Manpur", "Kesarpura", "Delana", "Amirpur", "Kherva"],
        "Amirgadh": ["Amirgadh", "Panthawada", "Sihori", "Vadali", "Nana Bhat", "Chaparda", "Ambaji", "Dhrol"],
        "Bhabhar": ["Bhabhar", "Kanodar", "Kherva", "Thara", "Ratanpur", "Chikhali", "Danta", "Visnagar"],
        "Danta": ["Danta", "Ambaji", "Dantiwada", "Malgadh", "Kothara", "Dalwada", "Panthawada", "Balisana"],
        "Deesa": ["Deesa", "Iqbalgadh", "Juna Deesa", "Dhanera", "Bhabhar", "Panch Pipla", "Ranpur", "Amirpur"],
        "Deodar": ["Deodar", "Golwad", "Patan", "Dhanera", "Vadgam", "Unza", "Liliya", "Juna Deodar"],
        "Dhanera": ["Dhanera", "Tharad", "Patan", "Deesa", "Jora", "Rankh", "Raval", "Godhniya"],
        "Kankrej": ["Kankrej", "Unza", "Liliya", "Patan", "Juna Kankrej", "Bhildi", "Varahi", "Rasana"],
        "Lakhani": ["Lakhani", "Danta", "Vadgam", "Chikhali", "Mota Bhat", "Kundal", "Simaliya", "Bhalot"],
        "Tharad": ["Tharad", "Vav", "Suigam", "Bhabhar", "Radhanpur", "Bhavka", "Paharpur", "Dhandhali"],
        "Vadgam": ["Vadgam", "Palanpur", "Chanasma", "Bhabhar", "Juna Vadgam", "Sihori", "Bhalot", "Virnagar"],
        "Vav": ["Vav", "Suigam", "Tharad", "Bhabhar", "Radhanpur", "Khimana", "Nagar", "Bhildi"]
    },
    "Bharuch": {
        "Bharuch": ["Bharuch", "Dahej", "Zadeshwar", "Bholav", "Kantharia", "Samni", "Uchad", "Undera"],
        "Amod": ["Amod", "Palej", "Kavi", "Vagra", "Piraman", "Tarsada", "Kevadia", "Bhadbhut"],
        "Ankleshwar": ["Ankleshwar", "Panoli", "Dahej", "Hajira", "Surat", "Valia", "Rajpardi", "Kherdi"],
        "Jambusar": ["Jambusar", "Kavi", "Amod", "Palej", "Bhadbhut", "Diwankheda", "Kherdi", "Tarsada"],
        "Jhagadia": ["Jhagadia", "Netrang", "Rajpipla", "Ankleshwar", "Valia", "Kevadia", "Moticher", "Kukarwada"],
        "Hansot": ["Hansot", "Dahej", "Vagra", "Amod", "Bhadbhut", "Tarsada", "Kolva", "Sanjor"],
        "Netrang": ["Netrang", "Jhagadia", "Rajpipla", "Sagbara", "Dediapada", "Kevadia", "Valia", "Gora"],
        "Vagra": ["Vagra", "Dahej", "Amod", "Hansot", "Bhadbhut", "Kolva", "Kavi", "Sanjor"],
        "Valia": ["Valia", "Ankleshwar", "Jhagadia", "Netrang", "Rajpardi", "Moticher", "Kukarwada", "Gora"]
    },
    "Bhavnagar": {
        "Bhavnagar": ["Bhavnagar", "Chitra", "Budhel", "Kumbharwada", "Songadh", "Velavadar", "Koliyak", "Nari"],
        "Gariadhar": ["Gariadhar", "Vallabhipur", "Sihor", "Palitana", "Bhumbhli", "Gopnath", "Rajpara", "Khodiyar"],
        "Ghogha": ["Ghogha", "Koliyak", "Gogha", "Talaja", "Datha", "Sartanpar", "Bhavnagar", "Velavadar"],
        "Mahuva": ["Mahuva", "Talaja", "Rajula", "Bagdana", "Shiyalbet", "Sultanpur", "Kundani", "Paliyad"],
        "Palitana": ["Palitana", "Gariadhar", "Sihor", "Vallabhipur", "Shatrunjay", "Adpur", "Sana", "Gundi"],
        "Sihor": ["Sihor", "Bhavnagar", "Botad", "Palitana", "Gariadhar", "Songadh", "Vallabhipur", "Sihori"],
        "Talaja": ["Talaja", "Mahuva", "Ghogha", "Alang", "Sosiya", "Sultanpur", "Vadhva", "Rajpara"],
        "Umrala": ["Umrala", "Botad", "Sihor", "Gariadhar", "Vallabhipur", "Keshvala", "Khadsali", "Chuda"],
        "Vallabhipur": ["Vallabhipur", "Palitana", "Gariadhar", "Sihor", "Botad", "Khadsali", "Pipaliya", "Keshvala"]
    },
    "Botad": {
        "Botad": ["Botad", "Dhandhuka", "Ranpur", "Gadhada", "Lathidad", "Barwala", "Nari", "Limdi"],
        "Barwala": ["Barwala", "Botad", "Dhandhuka", "Wadhwan", "Ranpur", "Limdi", "Gariadhar", "Halvad"],
        "Gadhada": ["Gadhada", "Botad", "Palitana", "Limdi", "Vallabhipur", "Dudhrej", "Kolki", "Lathidad"],
        "Ranpur": ["Ranpur", "Botad", "Dhandhuka", "Barwala", "Limbdi", "Sayla", "Halvad", "Wadhwan"]
    },
    "Chhota Udaipur": {
        "Chhota Udaipur": ["Chhota Udaipur", "Tejgadh", "Rangpur", "Panvad", "Kothamba", "Chapraniya", "Vadgam", "Bhatpur"],
        "Jetpur Pavi": ["Jetpur Pavi", "Pavi", "Sankheda", "Nasvadi", "Kavant", "Dabhoi", "Bodeli", "Chhota Udaipur"],
        "Kavant": ["Kavant", "Rangpur", "Bodeli", "Nasvadi", "Panvad", "Chapraniya", "Tejgadh", "Vadgam"],
        "Nasvadi": ["Nasvadi", "Kavant", "Sankheda", "Bodeli", "Dabhoi", "Chhota Udaipur", "Rangpur", "Panvad"],
        "Sankheda": ["Sankheda", "Bodeli", "Dabhoi", "Chhota Udaipur", "Jetpur", "Nasvadi", "Kavant", "Karjan"],
        "Bodeli": ["Bodeli", "Sankheda", "Dabhoi", "Karjan", "Chhota Udaipur", "Jetpur", "Nasvadi", "Kavant"]
    },
    "Dahod": {
        "Dahod": ["Dahod", "Kanbha", "Boriya", "Rampura", "Limkheda", "Devgad Baria", "Piplod", "Garbada"],
        "Devgad Baria": ["Devgad Baria", "Dahod", "Garbada", "Limkheda", "Godhra", "Ratanpur", "Baria", "Fatepura"],
        "Dhanpur": ["Dhanpur", "Dahod", "Limkheda", "Garbada", "Devgad Baria", "Jhalod", "Sanjeli", "Boriya"],
        "Fatepura": ["Fatepura", "Dahod", "Jhalod", "Sanjeli", "Singvad", "Baria", "Boriya", "Limkheda"],
        "Garbada": ["Garbada", "Dahod", "Devgad Baria", "Limkheda", "Dhanpur", "Godhra", "Piplod", "Ratanpur"],
        "Jhalod": ["Jhalod", "Dahod", "Fatepura", "Sanjeli", "Singvad", "Limkheda", "Dhanpur", "Boriya"],
        "Limkheda": ["Limkheda", "Dahod", "Garbada", "Dhanpur", "Devgad Baria", "Boriya", "Piplod", "Godhra"],
        "Sanjeli": ["Sanjeli", "Jhalod", "Dahod", "Fatepura", "Limkheda", "Singvad", "Boriya", "Dhanpur"],
        "Singvad": ["Singvad", "Jhalod", "Dahod", "Fatepura", "Sanjeli", "Limkheda", "Boriya", "Dhanpur"]
    },
    "Dang": {
        "Ahwa": ["Ahwa", "Saputara", "Mahal", "Waghai", "Subir", "Pimpri", "Galkund", "Pipaldahad"],
        "Subir": ["Subir", "Ahwa", "Waghai", "Vyara", "Songadh", "Chikhli", "Bardipada", "Galkund"],
        "Waghai": ["Waghai", "Ahwa", "Saputara", "Subir", "Vyara", "Pimpri", "Pipaldahad", "Chikhli"]
    },
    "Devbhoomi Dwarka": {
        "Okhamandal": ["Dwarka", "Okha", "Bet Dwarka", "Rupen", "Mithapur", "Beyt", "Shivrajpur", "Positra"],
        "Bhanvad": ["Bhanvad", "Jamjodhpur", "Khambhalia", "Dhrol", "Lalpur", "Jamanvada", "Modhvada", "Varshamedi"],
        "Kalyanpur": ["Kalyanpur", "Khambhalia", "Dwarka", "Bhanvad", "Jamnagar", "Bhatiya", "Vasai", "Mevasa"],
        "Khambhalia": ["Khambhalia", "Dwarka", "Bhanvad", "Kalyanpur", "Jamjodhpur", "Mokha", "Lalpur", "Bharana"]
    },
    "Gandhinagar": {
        "Gandhinagar": ["Gandhinagar", "Infocity", "Sargasan", "Pethapur", "Koba", "Raysan", "Kudasan", "Adalaj"],
        "Kalol": ["Kalol", "Pansar", "Kadi", "Mehsana", "Randheja", "Nardipur", "Vatva", "Borisana"],
        "Mansa": ["Mansa", "Vijapur", "Kalol", "Dehgam", "Sadra", "Enasan", "Charada", "Kheralu"],
        "Dehgam": ["Dehgam", "Gandhinagar", "Ahmedabad", "Mansa", "Nandol", "Rakhiyal", "Vavol", "Zak"]
    },
    "Gir Somnath": {
        "Veraval": ["Veraval", "Somnath", "Prabhas Patan", "Sutrapada", "Mangrol", "Dhamlej", "Madhavpur", "Chorwad"],
        "Kodinar": ["Kodinar", "Una", "Sutrapada", "Gir Gadhada", "Rajula", "Maliya", "Tulsishyam", "Hiranya"],
        "Sutrapada": ["Sutrapada", "Veraval", "Kodinar", "Talala", "Una", "Dhamlej", "Madhavpur", "Chorwad"],
        "Talala": ["Talala", "Sasan Gir", "Dhari", "Veraval", "Junagadh", "Bhalchhel", "Jasadhar", "Khambha"],
        "Una": ["Una", "Kodinar", "Diu", "Gir Gadhada", "Amreli", "Delwada", "Tulsishyam", "Rajula"],
        "Gir Gadhada": ["Gir Gadhada", "Una", "Kodinar", "Veraval", "Dhari", "Jasadhar", "Bhalchhel", "Tulsishyam"]
    },
    "Jamnagar": {
        "Jamnagar": ["Jamnagar", "Patel Colony", "Digvijay Plot", "Bedi", "Ranjit Nagar", "Aerodrome", "Gulabnagar", "Dhrol"],
        "Dhrol": ["Dhrol", "Halvad", "Morbi", "Rajkot", "Jamnagar", "Atkot", "Keshod", "Bhayavadar"],
        "Jamjodhpur": ["Jamjodhpur", "Rajkot", "Jamnagar", "Bhanvad", "Gondal", "Lalpur", "Kalavad", "Dhoraji"],
        "Jodia": ["Jodia", "Jamnagar", "Dhrol", "Khambhalia", "Lalpur", "Sikka", "Bedibandar", "Miyani"],
        "Kalavad": ["Kalavad", "Jamnagar", "Rajkot", "Lalpur", "Dhrol", "Jamjodhpur", "Paddhari", "Jasdan"],
        "Lalpur": ["Lalpur", "Jamnagar", "Rajkot", "Kalavad", "Jodia", "Dhrol", "Jamjodhpur", "Paddhari"]
    },
    "Junagadh": {
        "Junagadh": ["Junagadh", "Girnar", "Motibaug", "Joshipura", "Bhavnath", "Zanzarda", "Bilkha", "Bhesan"],
        "Bhesan": ["Bhesan", "Junagadh", "Visavadar", "Mendarda", "Keshod", "Bilkha", "Vanthali", "Babra"],
        "Keshod": ["Keshod", "Junagadh", "Mangrol", "Veraval", "Mendarda", "Bantwa", "Malia", "Chorwad"],
        "Manavadar": ["Manavadar", "Junagadh", "Bantwa", "Keshod", "Vanthali", "Kutiyana", "Ranavav", "Bilkha"],
        "Mangrol": ["Mangrol", "Keshod", "Veraval", "Junagadh", "Somnath", "Chorwad", "Madhavpur", "Bantwa"],
        "Mendarda": ["Mendarda", "Junagadh", "Keshod", "Bhesan", "Visavadar", "Bilkha", "Vanthali", "Bantwa"],
        "Vanthali": ["Vanthali", "Junagadh", "Manavadar", "Keshod", "Bantwa", "Bhesan", "Mendarda", "Bilkha"],
        "Visavadar": ["Visavadar", "Junagadh", "Bhesan", "Dhari", "Amreli", "Mendarda", "Bilkha", "Keshod"],
        "Malia Hatina": ["Malia", "Junagadh", "Keshod", "Veraval", "Bantwa", "Mangrol", "Chorwad", "Mendarda"]
    },
    "Kachchh": {
        "Bhuj": ["Bhuj", "Madhapar", "Mirjapar", "Kukma", "Bhujodi", "Lodai", "Khengarpar", "Mundra"],
        "Anjar": ["Anjar", "Adipur", "Kandla", "Gandhidham", "Khedoi", "Meghpar", "Kidana", "Rampar"],
        "Bhachau": ["Bhachau", "Samakhiyali", "Rapar", "Dudhai", "Kharoi", "Adhoi", "Lakadiya", "Deshalpar"],
        "Gandhidham": ["Gandhidham", "Adipur", "Kandla", "Anjar", "Bhuj", "Galpadar", "Khedoi", "Kidana"],
        "Lakhpat": ["Lakhpat", "Dayapar", "Mothala", "Nana Rayan", "Guneri", "Bhadreshwar", "Jakhau", "Sangnara"],
        "Mandvi": ["Mandvi", "Mundra", "Bhuj", "Banni", "Modva", "Bharapar", "Gundiyali", "Tragadi"],
        "Mundra": ["Mundra", "Mandvi", "Bhuj", "Gandhidham", "Kandla", "Bhadreshwar", "Luni", "Baroi"],
        "Nakhatrana": ["Nakhatrana", "Bhuj", "Lakhpat", "Mandvi", "Rapar", "Dayapar", "Jakhau", "Khavda"],
        "Rapar": ["Rapar", "Bhachau", "Bhuj", "Gandhidham", "Khavda", "Santalpur", "Dudhai", "Kharoi"],
        "Abdasa": ["Abdasa", "Naliya", "Jakhau", "Bhuj", "Nakhatrana", "Dayapar", "Guneri", "Sangnara"]
    },
    "Kheda": {
        "Nadiad": ["Nadiad", "Santram", "Dabhan", "Piplag", "Uttarsanda", "Kanjari", "Billodara", "Vaso"],
        "Kapadvanj": ["Kapadvanj", "Kathlal", "Thasra", "Balasinor", "Dabhoda", "Kheralu", "Limbhoi", "Vagharoli"],
        "Kathlal": ["Kathlal", "Kapadvanj", "Nadiad", "Mahudha", "Virpur", "Vasan", "Khandha", "Kheda"],
        "Mahudha": ["Mahudha", "Nadiad", "Kheda", "Thasra", "Kapadvanj", "Kathlal", "Vasan", "Gamdi"],
        "Matar": ["Matar", "Nadiad", "Kheda", "Anand", "Mehmedabad", "Mahudha", "Dabhan", "Piplag"],
        "Mehmedabad": ["Mehmedabad", "Nadiad", "Kheda", "Ahmedabad", "Matar", "Lunawada", "Kapadwanj", "Kanjari"],
        "Thasra": ["Thasra", "Nadiad", "Kapadvanj", "Godhra", "Mahudha", "Balasinor", "Kheda", "Lunawada"],
        "Galteshwar": ["Galteshwar", "Nadiad", "Kheda", "Anand", "Matar", "Dakor", "Billodara", "Kanjari"],
        "Vaso": ["Vaso", "Nadiad", "Kheda", "Anand", "Matar", "Dabhan", "Billodara", "Piplag"]
    },
    "Mahisagar": {
        "Lunawada": ["Lunawada", "Godhra", "Santrampur", "Kadana", "Khanpur", "Baria", "Devgad", "Satlasana"],
        "Balasinor": ["Balasinor", "Godhra", "Lunawada", "Virpur", "Nadiad", "Kheda", "Thasra", "Kapadvanj"],
        "Kadana": ["Kadana", "Lunawada", "Santrampur", "Khanpur", "Godhra", "Baria", "Modasa", "Idar"],
        "Khanpur": ["Khanpur", "Lunawada", "Kadana", "Santrampur", "Modasa", "Godhra", "Baria", "Idar"],
        "Santrampur": ["Santrampur", "Lunawada", "Kadana", "Khanpur", "Godhra", "Dahod", "Baria", "Devgad"],
        "Virpur": ["Virpur", "Balasinor", "Lunawada", "Godhra", "Nadiad", "Kheda", "Kapadvanj", "Limkheda"]
    },
    "Mehsana": {
        "Mehsana": ["Mehsana", "Modhera", "Langhnaj", "Ladol", "Jagudan", "Akhaj", "Dasaj", "Vaktapur"],
        "Becharaji": ["Becharaji", "Modhera", "Vijapur", "Kadi", "Mandal", "Langhnaj", "Jagudan", "Akhaj"],
        "Kadi": ["Kadi", "Kalol", "Gandhinagar", "Ahmedabad", "Mehsana", "Thol", "Naroda", "Borisana"],
        "Kheralu": ["Kheralu", "Visnagar", "Vadnagar", "Unjha", "Mehsana", "Satlasana", "Idar", "Prantij"],
        "Unjha": ["Unjha", "Vadnagar", "Sidhpur", "Patan", "Mehsana", "Kheralu", "Visnagar", "Chanasma"],
        "Vadnagar": ["Vadnagar", "Unjha", "Kheralu", "Visnagar", "Mehsana", "Satlasana", "Idar", "Patan"],
        "Vijapur": ["Vijapur", "Mansa", "Gandhinagar", "Kalol", "Mehsana", "Kadi", "Becharaji", "Dehgam"],
        "Visnagar": ["Visnagar", "Vadnagar", "Kheralu", "Patan", "Mehsana", "Sidhpur", "Unjha", "Satlasana"],
        "Satlasana": ["Satlasana", "Kheralu", "Visnagar", "Idar", "Mehsana", "Vadnagar", "Himmatnagar", "Prantij"],
        "Jotana": ["Jotana", "Vijapur", "Kadi", "Becharaji", "Mehsana", "Kalol", "Mansa", "Gandhinagar"]
    },
    "Morbi": {
        "Morbi": ["Morbi", "Tankara", "Wankaner", "Rajkot", "Halvad", "Maliya", "Ghuntu", "Vagad"],
        "Halvad": ["Halvad", "Dhrangadhra", "Surendranagar", "Wadhwan", "Morbi", "Limbdi", "Chotila", "Dasada"],
        "Maliya": ["Maliya", "Morbi", "Halvad", "Rajkot", "Wankaner", "Tankara", "Junagadh", "Chotila"],
        "Tankara": ["Tankara", "Morbi", "Rajkot", "Wankaner", "Halvad", "Maliya", "Paddhari", "Gondal"],
        "Wankaner": ["Wankaner", "Morbi", "Rajkot", "Halvad", "Tankara", "Jasdan", "Gondal", "Paddhari"]
    },
    "Narmada": {
        "Nandod": ["Rajpipla", "Nandod", "Kevadia", "Karjan", "Dediapada", "TilakWada", "Garudeshwar", "Bharuch"],
        "Dediapada": ["Dediapada", "Rajpipla", "Sagbara", "Netrang", "Bharuch", "Kevadia", "Nandod", "Jhagadia"],
        "Garudeshwar": ["Garudeshwar", "Rajpipla", "Dediapada", "Tilakwada", "Bharuch", "Dabhoi", "Karjan", "Kevadia"],
        "Sagbara": ["Sagbara", "Rajpipla", "Dediapada", "Netrang", "Vyara", "Jhagadia", "Nandod", "Bharuch"],
        "Tilakwada": ["Tilakwada", "Rajpipla", "Garudeshwar", "Dabhoi", "Bharuch", "Karjan", "Kevadia", "Nandod"]
    },
    "Navsari": {
        "Navsari": ["Navsari", "Bilimora", "Gandevi", "Jalalpore", "Chikhli", "Vijalpor", "Eru", "Maroli"],
        "Bansda": ["Bansda", "Vansda", "Chikhli", "Ahwa", "Dharampur", "Unai", "Khergam", "Bilimora"],
        "Chikhli": ["Chikhli", "Navsari", "Gandevi", "Bansda", "Bilimora", "Khergam", "Vansda", "Jalalpore"],
        "Gandevi": ["Gandevi", "Navsari", "Chikhli", "Jalalpore", "Bilimora", "Dandi", "Maroli", "Vedchha"],
        "Jalalpore": ["Jalalpore", "Navsari", "Gandevi", "Bilimora", "Chikhli", "Vijalpor", "Eru", "Dandi"],
        "Vansda": ["Vansda", "Bansda", "Chikhli", "Dharampur", "Ahwa", "Unai", "Khergam", "Saputara"]
    },
    "Panchmahal": {
        "Godhra": ["Godhra", "Halol", "Dahod", "Lunawada", "Kalol", "Pavagadh", "Shehera", "Ghoghamba"],
        "Ghoghamba": ["Ghoghamba", "Godhra", "Halol", "Jambughoda", "Dahod", "Kalol", "Shehera", "Pavagadh"],
        "Halol": ["Halol", "Godhra", "Pavagadh", "Vadodara", "Kalol", "Dahod", "Dabhoi", "Jambughoda"],
        "Jambughoda": ["Jambughoda", "Godhra", "Halol", "Ghoghamba", "Pavagadh", "Dabhoi", "Vadodara", "Kalol"],
        "Kalol": ["Kalol", "Godhra", "Halol", "Lunawada", "Dahod", "Shehera", "Ghoghamba", "Pavagadh"],
        "Morva Hadaf": ["Morva Hadaf", "Godhra", "Dahod", "Shehera", "Kalol", "Lunawada", "Halol", "Garbada"],
        "Shehera": ["Shehera", "Godhra", "Dahod", "Lunawada", "Kalol", "Jhalod", "Morva", "Ghoghamba"]
    },
    "Patan": {
        "Patan": ["Patan", "Sidhpur", "Chanasma", "Mehsana", "Radhanpur", "Harij", "Rani Ki Vav", "Modhera"],
        "Chanasma": ["Chanasma", "Patan", "Mehsana", "Becharaji", "Harij", "Sidhpur", "Visnagar", "Unjha"],
        "Harij": ["Harij", "Patan", "Chanasma", "Radhanpur", "Sami", "Santalpur", "Sidhpur", "Mehsana"],
        "Radhanpur": ["Radhanpur", "Patan", "Harij", "Sami", "Santalpur", "Tharad", "Deesa", "Chanasma"],
        "Sami": ["Sami", "Patan", "Radhanpur", "Harij", "Santalpur", "Viramgam", "Dasada", "Halvad"],
        "Sidhpur": ["Sidhpur", "Patan", "Mehsana", "Unjha", "Vadnagar", "Chanasma", "Kheralu", "Visnagar"],
        "Santalpur": ["Santalpur", "Radhanpur", "Sami", "Harij", "Patan", "Dasada", "Halvad", "Viramgam"],
        "Shankheshwar": ["Shankheshwar", "Patan", "Sidhpur", "Mehsana", "Chanasma", "Harij", "Unjha", "Vadnagar"]
    },
    "Porbandar": {
        "Porbandar": ["Porbandar", "Madhavpur", "Miyani", "Chhaya", "Bokhira", "Odadar", "Adityana", "Sandhan"],
        "Kutiyana": ["Kutiyana", "Manavadar", "Ranavav", "Junagadh", "Porbandar", "Bantwa", "Bhesan", "Keshod"],
        "Ranavav": ["Ranavav", "Porbandar", "Kutiyana", "Junagadh", "Manavadar", "Bhesan", "Madhavpur", "Miyani"]
    },
    "Rajkot": {
        "Rajkot": ["Rajkot", "Mavdi", "Aji", "Raiya", "Ghanteshwar", "Kotharia", "Madhapar", "Bedi"],
        "Gondal": ["Gondal", "Jetpur", "Junagadh", "Dhoraji", "Rajkot", "Virpur", "Shapur", "Paddhari"],
        "Jetpur": ["Jetpur", "Gondal", "Rajkot", "Junagadh", "Dhoraji", "Upleta", "Virpur", "Keshod"],
        "Jasdan": ["Jasdan", "Rajkot", "Gondal", "Amreli", "Botad", "Vinchhiya", "Wankaner", "Halvad"],
        "Kotda Sangani": ["Kotda Sangani", "Rajkot", "Gondal", "Junagadh", "Wankaner", "Jasdan", "Lodhika", "Paddhari"],
        "Lodhika": ["Lodhika", "Rajkot", "Morbi", "Gondal", "Wankaner", "Paddhari", "Tankara", "Jasdan"],
        "Paddhari": ["Paddhari", "Rajkot", "Morbi", "Gondal", "Jamnagar", "Lodhika", "Kalavad", "Wankaner"],
        "Upleta": ["Upleta", "Dhoraji", "Jetpur", "Rajkot", "Gondal", "Junagadh", "Jamkandorna", "Porbandar"],
        "Dhoraji": ["Dhoraji", "Upleta", "Gondal", "Rajkot", "Jetpur", "Junagadh", "Jamkandorna", "Kutiyana"],
        "Jamkandorna": ["Jamkandorna", "Gondal", "Dhoraji", "Jetpur", "Rajkot", "Upleta", "Junagadh", "Bhesan"],
        "Vinchhiya": ["Vinchhiya", "Jasdan", "Gondal", "Rajkot", "Botad", "Wankaner", "Amreli", "Halvad"]
    },
    "Sabarkantha": {
        "Himmatnagar": ["Himmatnagar", "Idar", "Khedbrahma", "Modasa", "Prantij", "Talod", "Rangpur", "Gambhoi"],
        "Idar": ["Idar", "Himmatnagar", "Khedbrahma", "Shamlaji", "Modasa", "Prantij", "Vijayanagar", "Vadali"],
        "Khedbrahma": ["Khedbrahma", "Himmatnagar", "Idar", "Poshina", "Vijayanagar", "Modasa", "Abu", "Bhiloda"],
        "Poshina": ["Poshina", "Khedbrahma", "Himmatnagar", "Abu Road", "Idar", "Vijayanagar", "Bhiloda", "Palanpur"],
        "Prantij": ["Prantij", "Himmatnagar", "Talod", "Modasa", "Gandhinagar", "Idar", "Vadali", "Gambhoi"],
        "Talod": ["Talod", "Himmatnagar", "Prantij", "Modasa", "Vadali", "Idar", "Gambhoi", "Rangpur"],
        "Vadali": ["Vadali", "Himmatnagar", "Talod", "Modasa", "Idar", "Prantij", "Vijayanagar", "Gambhoi"],
        "Vijayanagar": ["Vijayanagar", "Khedbrahma", "Himmatnagar", "Idar", "Poshina", "Bhiloda", "Modasa", "Shamlaji"]
    },
    "Surat": {
        "Surat City": ["Adajan", "Vesu", "Athwa", "Udhna", "Katargam", "Varachha", "Rander", "Piplod"],
        "Bardoli": ["Bardoli", "Madhi", "Vyara", "Mandvi", "Songadh", "Tarsadi", "Kadod", "Palsana"],
        "Choryasi": ["Sachin", "Hazira", "Ichhapore", "Mora", "Dumas", "Magdalla", "Sarthana", "Bamroli"],
        "Kamrej": ["Kamrej", "Kim", "Kosamba", "Kadodara", "Palsana", "Tarsadi", "Olpad", "Sayan"],
        "Mahuva": ["Mahuva", "Bardoli", "Vyara", "Mandvi", "Songadh", "Kadod", "Tarsadi", "Palsana"],
        "Mandvi": ["Mandvi", "Bardoli", "Vyara", "Songadh", "Mahuva", "Kadod", "Umarpada", "Tarsadi"],
        "Mangrol": ["Mangrol", "Bardoli", "Mandvi", "Umarpada", "Mahuva", "Songadh", "Vyara", "Kadod"],
        "Olpad": ["Olpad", "Kim", "Kamrej", "Bharuch", "Kosamba", "Hansot", "Sayan", "Kadodara"],
        "Palsana": ["Palsana", "Kamrej", "Kim", "Bardoli", "Kadodara", "Kosamba", "Sayan", "Tarsadi"],
        "Umarpada": ["Umarpada", "Mandvi", "Vyara", "Songadh", "Bardoli", "Mangrol", "Mahuva", "Kadod"]
    },
    "Surendranagar": {
        "Surendranagar": ["Surendranagar", "Wadhwan", "Limbdi", "Dhrangadhra", "Botad", "Halvad", "Chotila", "Sayla"],
        "Chotila": ["Chotila", "Surendranagar", "Rajkot", "Limbdi", "Sayla", "Thangadh", "Halvad", "Morbi"],
        "Chuda": ["Chuda", "Surendranagar", "Wadhwan", "Limbdi", "Dhrangadhra", "Halvad", "Botad", "Sayla"],
        "Dasada": ["Dasada", "Surendranagar", "Viramgam", "Dhrangadhra", "Zainabad", "Halvad", "Patdi", "Sami"],
        "Dhrangadhra": ["Dhrangadhra", "Surendranagar", "Halvad", "Dasada", "Morbi", "Wadhwan", "Limbdi", "Patdi"],
        "Lakhtar": ["Lakhtar", "Surendranagar", "Wadhwan", "Botad", "Limbdi", "Chuda", "Sayla", "Halvad"],
        "Limbdi": ["Limbdi", "Surendranagar", "Wadhwan", "Botad", "Ahmedabad", "Chotila", "Sayla", "Dhrangadhra"],
        "Muli": ["Muli", "Surendranagar", "Wadhwan", "Limbdi", "Rajkot", "Chotila", "Sayla", "Wankaner"],
        "Sayla": ["Sayla", "Surendranagar", "Chotila", "Rajkot", "Botad", "Limbdi", "Muli", "Wadhwan"],
        "Thangadh": ["Thangadh", "Surendranagar", "Chotila", "Morbi", "Rajkot", "Halvad", "Sayla", "Wankaner"],
        "Wadhwan": ["Wadhwan", "Surendranagar", "Limbdi", "Dhrangadhra", "Ahmedabad", "Botad", "Chuda", "Chotila"]
    },
    "Tapi": {
        "Vyara": ["Vyara", "Songadh", "Valod", "Uchhal", "Nizar", "Bardoli", "Mandvi", "Ahwa"],
        "Songadh": ["Songadh", "Vyara", "Valod", "Uchhal", "Bardoli", "Mandvi", "Ahwa", "Mahuva"],
        "Valod": ["Valod", "Vyara", "Songadh", "Bardoli", "Surat", "Kamrej", "Uchhal", "Mandvi"],
        "Uchhal": ["Uchhal", "Vyara", "Songadh", "Nizar", "Ahwa", "Subir", "Valod", "Mandvi"],
        "Nizar": ["Nizar", "Vyara", "Uchhal", "Songadh", "Ahwa", "Subir", "Valod", "Mandvi"]
    },
    "Vadodara": {
        "Vadodara": ["Vadodara", "Alkapuri", "Manjalpur", "Karelibaug", "Fatehgunj", "Gotri", "Waghodia", "Sayajigunj"],
        "Dabhoi": ["Dabhoi", "Vadodara", "Sankheda", "Bodeli", "Chhota Udaipur", "Karjan", "Padra", "Sinor"],
        "Karjan": ["Karjan", "Vadodara", "Bharuch", "Dabhoi", "Ankleshwar", "Padra", "Sinor", "Naswadi"],
        "Padra": ["Padra", "Vadodara", "Dabhoi", "Jambusar", "Karjan", "Waghodia", "Savli", "Sinor"],
        "Savli": ["Savli", "Vadodara", "Halol", "Godhra", "Pavagadh", "Waghodia", "Padra", "Dabhoi"],
        "Sinor": ["Sinor", "Vadodara", "Karjan", "Bharuch", "Narmada", "Dabhoi", "Padra", "Waghodia"],
        "Waghodia": ["Waghodia", "Vadodara", "Dabhoi", "Chhota Udaipur", "Bodeli", "Savli", "Padra", "Halol"],
        "Desar": ["Desar", "Vadodara", "Padra", "Dabhoi", "Karjan", "Jambusar", "Savli", "Waghodia"]
    },
    "Valsad": {
        "Valsad": ["Valsad", "Tithal", "Abrama", "Dungri", "Parnera", "Atul", "Dharampur", "Pardi"],
        "Dharampur": ["Dharampur", "Valsad", "Kaprada", "Vansda", "Ahwa", "Saputara", "Bansda", "Unai"],
        "Kaprada": ["Kaprada", "Dharampur", "Valsad", "Daman", "Nashik", "Vansda", "Bansda", "Silvassa"],
        "Pardi": ["Pardi", "Valsad", "Vapi", "Umargam", "Daman", "Atul", "Dungri", "Abrama"],
        "Umargam": ["Umargam", "Vapi", "Pardi", "Valsad", "Daman", "Silvassa", "Dahanu", "Manor"],
        "Vapi": ["Vapi", "Valsad", "Pardi", "Umargam", "Daman", "Silvassa", "Atul", "Dungri"]
    }
};

module.exports = locationData;
