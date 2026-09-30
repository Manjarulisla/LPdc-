import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.pathway': 'Pathway',
    'nav.solutions': 'Solutions',
    'nav.community': 'Community',
    'nav.impact': 'Impact',
    'nav.join': 'Join the Network',
    
    'hero.tag': 'Learn. Grow. Connect. Contribute.',
    'hero.h1_1': 'Transform Learning into ',
    'hero.h1_growth': 'Growth',
    'hero.h1_2': ',',
    'hero.h1_precap': 'Growth into ',
    'hero.h1_capability': 'Capability',
    'hero.h1_3': ',',
    'hero.h1_preimp': 'Capability into ',
    'hero.h1_impact': 'Impact',
    'hero.h1_4': '.',
    'hero.desc': '<strong>PLDC (Professional Learning & Development Center)</strong> is a platform for individuals who aspire to grow beyond conventional boundaries—personally, professionally, and socially. We bring together thought-provoking insights, meaningful networks, practical knowledge, and proven actionable solutions to help you unlock your potential, advance your career, and create positive impact in society.',
    'hero.btn1': 'Find Your Growth Path',
    'hero.btn2': 'Explore the Platform',
    'hero.scroll': 'Scroll',

    'pathway.title': 'The PLDC Pathway',
    'pathway.desc': 'A continuous journey designed to elevate your career, expand your mindset, and amplify your impact on the world.',
    'pathway.learn': 'Learn',
    'pathway.learn.desc': 'Actionable knowledge.',
    'pathway.grow': 'Grow',
    'pathway.grow.desc': 'Personal & professional advancement.',
    'pathway.connect': 'Connect',
    'pathway.connect.desc': 'Meaningful relationships.',
    'pathway.contribute': 'Contribute',
    'pathway.contribute.desc': 'Positive societal impact.',

    'impact.hours': 'Hours of Learning',
    'impact.mentors': 'Expert Mentors',
    'impact.pros': 'Active Professionals',
    'impact.lives': 'Lives Impacted',

    'solutions.title': 'Our Solutions',
    'solutions.desc': 'Curated programs and masterclasses designed to elevate every aspect of your professional journey.',
    'solutions.viewAll': 'View All Programs',
    'solutions.s1.title': 'Executive Leadership',
    'solutions.s1.desc': 'Master the art of decision-making, strategic thinking, and guiding teams to success in high-pressure environments.',
    'solutions.s2.title': 'Social Impact Mastery',
    'solutions.s2.desc': 'Learn how to build sustainable initiatives that create measurable positive change in local and global communities.',
    'solutions.s3.title': 'Global Networking',
    'solutions.s3.desc': 'Develop the skills to build, maintain, and leverage a high-value professional network across continents.',
    'solutions.explore': 'Explore Course',

    'quiz.title': 'Not sure where to start?',
    'quiz.desc': "Let's find the perfect pathway tailored to your professional ambitions.",
    'quiz.q1': 'What is your primary goal right now?',
    'quiz.g1': 'Leadership Development',
    'quiz.g2': 'Professional Networking',
    'quiz.g3': 'Advanced Skill Building',
    'quiz.g4': 'Social Impact',
    'quiz.continue': 'Continue',
    'quiz.match': 'Perfect match found.',
    'quiz.matchDesc': "Based on your goal, we've crafted a customized pathway to accelerate your growth.",
    'quiz.take': 'Take the Full Assessment',
    'quiz.startOver': 'Start over',

    'footer.desc': 'PLDC (Professional Learning & Development Center) is a learning and development platform for individuals who aspire to grow beyond conventional boundaries—personally, professionally, and socially.',
    'footer.platform': 'Platform',
    'footer.pathways': 'Pathways',
    'footer.masterclasses': 'Masterclasses',
    'footer.mentorship': 'Mentorship',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.report': 'Impact Report',
    'footer.contact': 'Contact',
    'footer.stayUpdated': 'Stay Updated',
    'footer.stayUpdatedDesc': 'Get the latest insights and news from PLDC directly to your inbox.',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.rights': `© ${new Date().getFullYear()} PLDC. All rights reserved.`,
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    'avatar.title.0': 'Beginner',
    'avatar.sub.0': 'Starting the journey',
    'avatar.title.1': 'Apprentice',
    'avatar.sub.1': 'Gaining basic skills',
    'avatar.title.2': 'Professional',
    'avatar.sub.2': 'Applying knowledge',
    'avatar.title.3': 'Expert',
    'avatar.sub.3': 'Leading others',
    'avatar.title.4': 'Master',
    'avatar.sub.4': 'Global impact',
  },
  bn: {
    'nav.pathway': 'পাথওয়ে',
    'nav.solutions': 'সমাধান',
    'nav.community': 'কমিউনিটি',
    'nav.impact': 'প্রভাব',
    'nav.join': 'যুক্ত হোন',
    
    'hero.tag': 'শিখুন। বেড়ে উঠুন। যুক্ত হোন। অবদান রাখুন।',
    'hero.h1_1': 'শেখার মাধ্যমকে ',
    'hero.h1_growth': 'প্রবৃদ্ধিতে',
    'hero.h1_2': ',',
    'hero.h1_precap': 'প্রবৃদ্ধিকে ',
    'hero.h1_capability': 'দক্ষতায়',
    'hero.h1_3': ',',
    'hero.h1_preimp': 'এবং দক্ষতাকে ',
    'hero.h1_impact': 'প্রভাবে',
    'hero.h1_4': ' রূপান্তর করুন।',
    'hero.desc': '<strong>PLDC (প্রফেশনাল লার্নিং অ্যান্ড ডেভেলপমেন্ট সেন্টার)</strong> হলো এমন একটি প্ল্যাটফর্ম যা ব্যক্তিগত, পেশাগত এবং সামাজিকভাবে সীমানা ছাড়িয়ে বেড়ে উঠতে চাওয়া মানুষদের জন্য। আমরা চিন্তাশীল অন্তর্দৃষ্টি, অর্থবহ নেটওয়ার্ক, ব্যবহারিক জ্ঞান এবং কার্যকর সমাধান নিয়ে আসি, যা আপনার সম্ভাবনাকে উন্মোচন করতে, ক্যারিয়ারে এগোতে এবং সমাজে ইতিবাচক প্রভাব ফেলতে সাহায্য করে।',
    'hero.btn1': 'আপনার প্রবৃদ্ধির পথ খুঁজুন',
    'hero.btn2': 'প্ল্যাটফর্ম ঘুরে দেখুন',
    'hero.scroll': 'স্ক্রল করুন',

    'pathway.title': 'PLDC পাথওয়ে',
    'pathway.desc': 'আপনার ক্যারিয়ারকে উন্নত করতে, দৃষ্টিভঙ্গিকে প্রসারিত করতে এবং বিশ্বে আপনার প্রভাব বাড়ানোর জন্য ডিজাইন করা একটি ধারাবাহিক যাত্রা।',
    'pathway.learn': 'শিখুন',
    'pathway.learn.desc': 'কার্যকরী জ্ঞান।',
    'pathway.grow': 'বেড়ে উঠুন',
    'pathway.grow.desc': 'ব্যক্তিগত ও পেশাগত উন্নতি।',
    'pathway.connect': 'যুক্ত হোন',
    'pathway.connect.desc': 'অর্থবহ সম্পর্ক।',
    'pathway.contribute': 'অবদান রাখুন',
    'pathway.contribute.desc': 'সমাজে ইতিবাচক প্রভাব।',

    'impact.hours': 'ঘণ্টার লার্নিং',
    'impact.mentors': 'দক্ষ মেন্টর',
    'impact.pros': 'সক্রিয় প্রফেশনাল',
    'impact.lives': 'মানুষের জীবনে প্রভাব',

    'solutions.title': 'আমাদের সমাধান',
    'solutions.desc': 'আপনার পেশাগত যাত্রার প্রতিটি দিককে উন্নত করার জন্য তৈরি করা প্রোগ্রাম এবং মাস্টারক্লাস।',
    'solutions.viewAll': 'সব প্রোগ্রাম দেখুন',
    'solutions.s1.title': 'এক্সিকিউটিভ লিডারশিপ',
    'solutions.s1.desc': 'চাপযুক্ত পরিবেশে সিদ্ধান্ত গ্রহণ, কৌশলগত চিন্তাভাবনা এবং দলকে সফলতার দিকে পরিচালিত করার শিল্প আয়ত্ত করুন।',
    'solutions.s2.title': 'সোশ্যাল ইমপ্যাক্ট মাস্টারি',
    'solutions.s2.desc': 'স্থানীয় ও বৈশ্বিক পর্যায়ে পরিমাপযোগ্য ইতিবাচক পরিবর্তন আনতে টেকসই উদ্যোগ তৈরি করা শিখুন।',
    'solutions.s3.title': 'গ্লোবাল নেটওয়ার্কিং',
    'solutions.s3.desc': 'মহাদেশ জুড়ে উচ্চ-মূল্যের পেশাদার নেটওয়ার্ক তৈরি, বজায় রাখা এবং কাজে লাগানোর দক্ষতা বিকাশ করুন।',
    'solutions.explore': 'কোর্স এক্সপ্লোর করুন',

    'quiz.title': 'কোথা থেকে শুরু করবেন বুঝতে পারছেন না?',
    'quiz.desc': 'চলুন আপনার পেশাগত লক্ষ্যের জন্য মানানসই একটি নিখুঁত পথ খুঁজে বের করি।',
    'quiz.q1': 'এই মুহূর্তে আপনার প্রধান লক্ষ্য কী?',
    'quiz.g1': 'লিডারশিপ ডেভেলপমেন্ট',
    'quiz.g2': 'প্রফেশনাল নেটওয়ার্কিং',
    'quiz.g3': 'অ্যাডভান্সড স্কিল বিল্ডিং',
    'quiz.g4': 'সোশ্যাল ইমপ্যাক্ট',
    'quiz.continue': 'চালিয়ে যান',
    'quiz.match': 'নিখুঁত মিল পাওয়া গেছে।',
    'quiz.matchDesc': 'আপনার লক্ষ্যের ওপর ভিত্তি করে, আপনার প্রবৃদ্ধিকে ত্বরান্বিত করতে আমরা একটি কাস্টমাইজড পাথওয়ে তৈরি করেছি।',
    'quiz.take': 'সম্পূর্ণ মূল্যায়ন (Assessment) নিন',
    'quiz.startOver': 'আবার শুরু করুন',

    'footer.desc': 'PLDC (প্রফেশনাল লার্নিং অ্যান্ড ডেভেলপমেন্ট সেন্টার) হলো এমন একটি প্ল্যাটফর্ম যা ব্যক্তিগত, পেশাগত এবং সামাজিকভাবে সীমানা ছাড়িয়ে বেড়ে উঠতে চাওয়া মানুষদের জন্য।',
    'footer.platform': 'প্ল্যাটফর্ম',
    'footer.pathways': 'পাথওয়ে',
    'footer.masterclasses': 'মাস্টারক্লাস',
    'footer.mentorship': 'মেন্টরশিপ',
    'footer.company': 'কোম্পানি',
    'footer.about': 'আমাদের সম্পর্কে',
    'footer.careers': 'ক্যারিয়ার',
    'footer.report': 'ইমপ্যাক্ট রিপোর্ট',
    'footer.contact': 'যোগাযোগ',
    'footer.stayUpdated': 'আপডেটেড থাকুন',
    'footer.stayUpdatedDesc': 'PLDC-এর সর্বশেষ অন্তর্দৃষ্টি এবং খবর সরাসরি আপনার ইনবক্সে পান।',
    'footer.emailPlaceholder': 'আপনার ইমেইল দিন',
    'footer.rights': `© ${new Date().getFullYear()} PLDC. সর্বস্বত্ব সংরক্ষিত।`,
    'footer.privacy': 'প্রাইভেসি পলিসি',
    'footer.terms': 'টার্মস অফ সার্ভিস',

    'avatar.title.0': 'বিগিনার',
    'avatar.sub.0': 'যাত্রা শুরু',
    'avatar.title.1': 'অ্যাপ্রেন্টিস',
    'avatar.sub.1': 'প্রাথমিক দক্ষতা অর্জন',
    'avatar.title.2': 'প্রফেশনাল',
    'avatar.sub.2': 'জ্ঞানের প্রয়োগ',
    'avatar.title.3': 'এক্সপার্ট',
    'avatar.sub.3': 'অন্যদের নেতৃত্ব দেওয়া',
    'avatar.title.4': 'মাস্টার',
    'avatar.sub.4': 'বৈশ্বিক প্রভাব',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'bn' : 'en';
      if (newLang === 'bn') {
        document.documentElement.classList.add('lang-bn');
      } else {
        document.documentElement.classList.remove('lang-bn');
      }
      return newLang;
    });
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
