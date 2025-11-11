import type { LanguageCode } from "./languages"

type TranslationKey = string

interface Translations {
  [key: TranslationKey]: {
    [key in LanguageCode]?: string
  }
}

const translations: Translations = {
  "nav.dashboard": {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    ta: "டேஷ்போர்ட்",
    te: "డ్యాష్‌బోర్డ్",
    bn: "ড্যাশবোর্ড",
    mr: "डॅशबोर्ड",
    kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    ml: "ഡാഷ്‌ബോർഡ്",
    gu: "ડેશબોર્ડ",
    pa: "ਡੈਸ਼ਬੋਰਡ",
    ur: "ڈیش بورڈ",
    as: "ড্যাশবোর্ড",
  },
  "nav.documents": {
    en: "Documents",
    hi: "दस्तावेज़",
    ta: "ஆவணங்கள்",
    te: "డాక్యుమెంట్‌లు",
    bn: "নথিপত্র",
    mr: "दस्तऐवज",
    kn: "ದಸ್ತಾವೇಜುಗಳು",
    ml: "പ്രമാണങ്ങൾ",
    gu: "દસ્તાવેજો",
    pa: "ਦਸਤਾਵੇਜ਼",
    ur: "اسناد",
    as: "নথিপত্র",
  },
  "nav.exams": {
    en: "Exam Prep",
    hi: "परीक्षा की तैयारी",
    ta: "தேர்வு தயாரிப்பு",
    te: "పరీక్ష సన్నాహం",
    bn: "পরীক্ষার প্রস্তুতি",
    mr: "परीक्षा तयारी",
    kn: "ಪರೀಕ್ಷೆ ತಯಾರಿ",
    ml: "പരീക്ഷ തയാറുപ്പ്",
    gu: "પરીક્ષાની તૈયારી",
    pa: "ਪরੀਕਸ਼ਾ ਦੀ ਤਿਆਰੀ",
    ur: "امتحان کی تیاری",
    as: "পৰীক্ষাৰ প্ৰস্তুতি",
  },
  "nav.scholarships": {
    en: "Scholarships",
    hi: "छात्रवृत्ति",
    ta: "বৃত্তি",
    te: "స్కॉలర్‌షిప్‌లు",
    bn: "বৃত্তি",
    mr: "शिष्यवृत्ति",
    kn: "ವಿದ್ಯಾವೃತ್ತಿ",
    ml: "സ്കോളർഷിപ്പുകൾ",
    gu: "વર્ષોચર પુરસ্કાર",
    pa: "ਸਕਾਲਰਸ਼ਿਪ",
    ur: "وظائف",
    as: "বৃত্তি",
  },
  "document.upload": {
    en: "Upload Document",
    hi: "दस्तावेज़ अपलोड करें",
    ta: "ஆவணம் பதிவேற்ற",
    te: "డాక్యుమెంట్ అప్లోడ్ చేయండి",
    bn: "নথি আপলোড করুন",
    mr: "दस्तावेज अपलोड करा",
    kn: "ದಸ್ತಾವೇಜ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    ml: "പ്രമാണം അപ്‌ലോഡ് ചെയ്യുക",
    gu: "દસ્તાવેજ અપલોડ કરો",
    pa: "ਦਸਤਾਵੇਜ਼ ਅਪਲੋਡ ਕਰੋ",
    ur: "دستاویز اپ لوڈ کریں",
    as: "নথি আপলোড কৰক",
  },
  "document.simplify": {
    en: "Simplify Text",
    hi: "पाठ को सरल बनाएं",
    ta: "உரையை எளிதாக்கு",
    te: "టెక్‌స్ట్ సరళీకృతం చేయండి",
    bn: "টেক্সট সরল করুন",
    mr: "मजकूर सोपे करा",
    kn: "ಪಠ್ಯ ಸರಳೀಕೃತ ಮಾಡಿ",
    ml: "വിരിയെ ലളിതമാക്കുക",
    gu: "ટેક્સ્ટ સરળ કરો",
    pa: "ਟੈਕਸਟ ਨੂੰ ਸਰਲ ਕਰੋ",
    ur: "متن کو سادہ بنائیں",
    as: "পাঠ সহজ কৰক",
  },
  "auth.signin": {
    en: "Sign In",
    hi: "साइन इन करें",
    ta: "உள்நுழைக",
    te: "సైన్ ఇన్ చేయండి",
    bn: "সাইন ইন করুন",
    mr: "साइन इन करा",
    kn: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    ml: "സൈൻ ഇൻ ചെയ്യുക",
    gu: "સાઇન ઇન કરો",
    pa: "ਸਾਇਨ ਇਨ ਕਰੋ",
    ur: "سائن ان کریں",
    as: "সাইন ইন কৰক",
  },
  "auth.signup": {
    en: "Sign Up",
    hi: "साइन अप करें",
    ta: "பதிவு செய்க",
    te: "సైన్ అప్ చేయండి",
    bn: "সাইন আপ করুন",
    mr: "साइन अप करा",
    kn: "ಸೈನ್ ಅಪ್ ಮಾಡಿ",
    ml: "സൈൻ അപ്പ് ചെയ്യുക",
    gu: "સાઇન અપ કરો",
    pa: "ਸਾਇਨ ਅਪ ਕਰੋ",
    ur: "سائن اپ کریں",
    as: "সাইন আপ কৰক",
  },
  "auth.logout": {
    en: "Logout",
    hi: "लॉगआउट",
    ta: "வெளியேறு",
    te: "లాగ్‌అవుట్",
    bn: "লগআউট",
    mr: "लॉगआउट",
    kn: "ಲಾಗ್‌ಔಟ್",
    ml: "ലോഗ് ഔട്ട്",
    gu: "લૉગઆઉટ",
    pa: "ਲਾਗ ਆਉਟ",
    ur: "لاگ آؤٹ",
    as: "লগ আউট",
  },
  "settings.language": {
    en: "Language",
    hi: "भाषा",
    ta: "மொழி",
    te: "భాష",
    bn: "ভাষা",
    mr: "भाषा",
    kn: "ಭಾಷೆ",
    ml: "ഭാഷ",
    gu: "ભાષા",
    pa: "ਭਾਸ਼ਾ",
    ur: "زبان",
    as: "ভাষা",
  },
  "settings.save": {
    en: "Save Settings",
    hi: "सेटिंग्स सहेजें",
    ta: "அமைப்புகளைச் சேமிக்கவும்",
    te: "సెట్టింగ్‌లను సేవ్ చేయండి",
    bn: "সেটিংস সংরক্ষণ করুন",
    mr: "सेटिंग्स संचयित करा",
    kn: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಸಂರಕ್ಷಿಸಿ",
    ml: "ക്രമീകരണങ്ങൾ സംരക്ഷിക്കുക",
    gu: "સેટિંગ્સ સાચવો",
    pa: "ਸੈਟਿੰਗ ਸੇਵ ਕਰੋ",
    ur: "سیٹنگز محفوظ کریں",
    as: "সেটিংস সংৰক্ষণ কৰক",
  },
}

export function t(key: TranslationKey, language: LanguageCode = "en"): string {
  const translation = translations[key]
  if (!translation) return key

  const localized = translation[language]
  if (localized) return localized

  // Fallback to English
  return translation.en || key
}

export function setLanguageCookie(language: LanguageCode) {
  document.cookie = `language=${language}; path=/; max-age=${30 * 24 * 60 * 60}`
}

export function getLanguageCookie(): LanguageCode {
  if (typeof document === "undefined") return "en"
  const name = "language="
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(";")
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim()
    if (cookie.indexOf(name) === 0) {
      const value = cookie.substring(name.length)
      return (value as LanguageCode) || "en"
    }
  }
  return "en"
}
