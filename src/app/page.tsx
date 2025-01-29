"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";

import {
  numberSearch,
  specialtiesSearch,
  normalizedStringSearch,
} from "./helpers/filter-helpers";

import { useFetchAdvocates } from "./hooks/useFetchAdvocates";

import { Header, Button, Input } from "./components";

export default function Home() {
  const { advocates, loading, error, hasMoreAdvocates, fetchMoreAdvocates } =
    useFetchAdvocates();

  const [searchValue, setSearchValue] = useState<string>("");

  // ADJUSTMENT: Ensured all strings were being filtered properly
  // removed useEffect and memoized to reduce the amount of times the filter needs to be calculated
  const filteredAdvocates = useMemo(() => {
    // if there is no search value, just return all advocates that have been loaded
    if (!searchValue) return advocates;

    return advocates.filter((advocate) => {
      return (
        normalizedStringSearch(advocate.firstName, searchValue) ||
        normalizedStringSearch(advocate.lastName, searchValue) ||
        normalizedStringSearch(advocate.city, searchValue) ||
        normalizedStringSearch(advocate.degree, searchValue) ||
        specialtiesSearch(searchValue, advocate.specialties) ||
        // BUGFIX: added a (hopefully) improved search ability for yearsOfExperience and phone number
        numberSearch(advocate.phoneNumber, searchValue) ||
        // BUGFIX: fixed the way that speciaties were being searched
        numberSearch(advocate.yearsOfExperience, searchValue)
      );
    });
  }, [searchValue, advocates]);

  // adding useCallback to reduce function recreation
  // also being that we are passing the function as a prop in Inputs
  const onSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );

  // ADJUSTMENT: implemented the reset functionality
  // renamed the function to be more specific
  // didn't wrap this function in useCallback being that it has no outside values. just a simple reset.
  const onResetClick = () => {
    // if the user clicks reset when it is already blank, don't setState and avoid the re-render
    if (!searchValue) return;

    setSearchValue("");
  };

  if (loading) {
    // TODO: if more time, I would put in a nice loading indicator
    return <div>Loading...</div>;
  }

  if (error) {
    // TODO: same here, would create a reusable error component
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      {/* ADJUSTMENT: updated to use Tailwind */}
      <main className="m-6">
        <div className="flex items-end gap-2">
          {/* ADJUSTMENT: removed "Searching for:" The user will most likely discern this information from what is in the input box */}
          {/* ADJUSTMENT: Changed the input to be controlled */}
          <Input
            onChange={onSearchChange}
            value={searchValue}
            label="Search"
            id="table-search"
          />
          {/* ADJUSTMENT: I changed this wording to be just reset */}
          {/* Being that the placement of the button is directly next to the search bar, I think this wording should be substantial */}
          <Button onClick={onResetClick} text="Reset" />
        </div>
        <br />
        <br />
        <table className="w-full text-sm text-left text-black mb-4">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {/* BUGFIX: Added a tr in order to use proper html heiarchy and remove the error */}
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Degree</th>
              <th className="px-8 py-3">Specialties</th>
              <th className="px-6 py-3">Years of Experience</th>
              <th className="px-6 py-3">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate) => {
              return (
                <tr key={advocate.id} className="bg-white border-b">
                  <td className="px-6 py-4">{advocate.firstName}</td>
                  <td className="px-6 py-4">{advocate.lastName}</td>
                  <td className="px-6 py-4">{advocate.city}</td>
                  <td className="px-6 py-4">{advocate.degree}</td>
                  <td className="px-8 py-4">
                    {advocate.specialties.map((specialty) => (
                      // TODO need a better key. maybe speciaties needs to be it's own DB table
                      <div key={`${advocate.id}-${specialty}`}>{specialty}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4">{advocate.yearsOfExperience}</td>
                  <td className="px-6 py-4">{advocate.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!loading && hasMoreAdvocates && (
          <Button
            onClick={fetchMoreAdvocates}
            disabled={loading}
            text="Load More"
          />
        )}
      </main>
    </div>
  );
}
