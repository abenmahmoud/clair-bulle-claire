export function anonymizeText(text: string): string {
  return text
    .replace(
      /(^|[^A-Za-z\u00c0-\u017f])([A-Z\u00c0-\u017f][a-z\u00c0-\u017f]+)(?=\s)/g,
      "$1X"
    )
    .replace(/\b\d{10,}\b/g, "XXXXXXXXXX");
}
