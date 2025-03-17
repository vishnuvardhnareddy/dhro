import React, { createContext, useContext } from 'react';

// Create the context
const StoreContext = createContext(null);

// Store component providing the context
const StoreProvider = ({ children }) => {
    const menuItems = {
        "Wbpsc": [
            "WBCS PRELIMS",
            "WBCS MAINS",
            "WBPSC FOOD SI",
            "WBPSC MISCELLANEOUS",
            "WBPSC CLERKSHIP",
            "ZOOLOGY OPTIONAL EV",
            "ANTHROPOLOGY OPTIONAL EV",
            "POLITY OPTIONAL EV",
            "HISTORY OPTIONAL EV",
            "HISTORY OPTIONAL BV",
            "SOCIOLOGY OPTIONAL EV",
            "ANTHROPOLOGY OPTIONAL BV",
            "POLITY OPTIONAL BV",
        ],
        "Wireless Operator": [
            "WIRELESS OPERATOR PRELIMS",
            "WIRELESS OPERATOR MAINS",
        ],
        "WBP KP": [
            "WBP CONSTABLE",
            "WEB EXCISE",
            "KOLKATA POLICE SI",
            "WIRELESS OPERATOR",
            "WBP CONSTABLE MAINS",
            "WBP KP",
            "WEST BENGAL POLICE WARDER",
        ],
        "SSC": [
            "SSC CGL",
            "SSC CHSL",
            "SSC CPO",
            "SSC STENOGRAPHER",
            "SSC MTS",
            "SSC JHT",
            "SSC GD CONSTABLE",
            "CGL TIER II",
            "SSC JE",
            "SSC SELECTION POST",
            "SCIENTIFIC ASSISTANT",
            "MTS BENGALI",
            "GD CONSTABLE BENGALI",
        ],
        "Teaching": [
            "UGC NET",
            "NET COMMERCE",
            "CTEL",
        ],
        "Railways": [
            "RRB NTPC",
            "RRB GROUP D",
            "RRB ALP",
            "RRB JE",
            "RRB NTPC CBT2",
            "RPF SI",
            "RRB TECHNICIAN",
            "GROUP D",
        ],
        "Banking": [], // Empty submenu for Banking
        "HSSC": [
            "HARYANA POLICE SI",
            "HARYANA CONSTABLE",
            "HARYANA PATWARI",
            "HARYANA FRAM SACHIV",
            "CET GROUP D",
        ],
        "Defence": [
            "AIRFORCE GROUP X",
            "AIRFORCE GROUP Y",
            "AIRMEN XY",
            "DRDO MTS",
            "AFCAT",
            "NDA",
            "CDS",
        ],
        "Delhi Police": [
            "DELHI POLICE CONSTABLE",
        ],
        "NEET": [
            "NEET",
        ],
        "JEE": [
            "MAINS",
            "ADVANCE",
            "MAINS ADVANCE",
        ],
        "IB": [
            "ACIO",
        ],
        "Insurance": [
            "NIACL AO",
            "LIC AAO",
            "LIC ADO",
            "NIACL ASSISTANT",
        ],
        "UPPBPB": [
            "UP SI",
            "UP POLICE CONSTABLE",
        ],
        "UPSSSC": [
            "LEKHPAL",
            "PET",
        ],
        "Agniveer": [
            "AGNIVEER VAYU",
            "SOLDIER GD",
        ],
        "Nta": [
            "NTA CUET GENERAL TEST",
        ],
        "AISSEE": [
            "CLASS 9TH",
            "CLASS 6TH",
        ],
        "Hssc": [], // Empty submenu for Hssc
        "CAT": [
            "CAT 2025",
        ],
        "Bihar Police": [
            "BIHAR POLICE CONSTABLE",
        ],
        "MPPSC": [
            "MPPSC",
        ],
        "MAHCET": [
            "MAH MBA CET",
        ],
        "Current Affairs": [
            "CURRENT AFFAIRS_FREE",
        ],
    };

    // Additional data for Daily Study and Menu
    const dailyStudyItems = [
        "Daily Dose",
        "Daily Quiz",
        "Daily Schedule",
        "Online Classes",
        "Current Affairs",
        "Books",
        "Ebooks",
    ];

    const menuItemsList = [
        "Our Team",
        "Selections",
        "Videos",
        "Gallery",
        "About Us",
        "Contact Us",
        "Why choose Us",
    ];

    return (
        <StoreContext.Provider value={{ menuItems, dailyStudyItems, menuItemsList }}>
            {children}
        </StoreContext.Provider>
    );
};

// Custom Hook to use Store
const useStore = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStore };