const supportedLanguages = ["az", "en", "ru"];

const getValidLanguage = (langHeader) => {
  if (!langHeader) return "az";

  const parsedLangs = langHeader
    .split(",")                            // tr,en-US;q=0.9,en;q=0.8
    .map(l => l.split(";")[0].trim())      // ["tr", "en-US", "en"]
    .map(l => l.split("-")[0].toLowerCase()); // ["tr", "en", "en"]

  const validLang = parsedLangs.find(lang => supportedLanguages.includes(lang));
  return validLang || "az";
};

module.exports = {
  getValidLanguage,
};
