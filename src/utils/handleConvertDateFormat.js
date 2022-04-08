export function convertDateToISO(string) {
  if (string) {
    const result = string.split("T")[0];
    return result;
  }

  return "";
}
