// ADJUSTMENT: added a helper function for all of our string comparisons
const normalizeString = (string: string) => {
  return string.trim().toLowerCase();
};

export const normalizedStringSearch = (
  stringToSearch: string,
  searchValue: string
) => {
  // if search is blank, early return
  if (!searchValue) return false;

  const searchValueNormalized = normalizeString(searchValue);
  const stringToSearchNormalized = normalizeString(stringToSearch);

  return stringToSearchNormalized.includes(searchValueNormalized);
};

// ADJUSTMENT: adjusted this search
// This was a UX decision that I would have worked with product and UX on but I think it may be a nice feature
// If someone is searching for an advocate years experience,
// I would assume the advocate would not have more than 99 years experience and therefore do a full match on the number
// otherwise, I want the user to be able to get a partial match on phone number
// However, this would probably be better suited for an advanced search option presented in UI to the user
export const numberSearch = (numberToSearch: number, searchTerm: string) => {
  const searchTermNumber = Number(searchTerm);

  // if the searchTerm is not a number, early return
  if (isNaN(searchTermNumber)) return false;

  if (searchTermNumber < 100) {
    return searchTermNumber === numberToSearch;
  } else {
    return numberToSearch.toString().includes(searchTermNumber.toString());
  }
};

export const specialtiesSearch = (
  searchValue: string,
  specialties: Array<string>
) => {
  // if search is blank or there are no specialties, early return
  if (!searchValue || specialties.length === 0) return false;

  // return true if any of the specialties include the search value
  return specialties.some((specialty) => {
    return normalizedStringSearch(specialty, searchValue);
  });
};
