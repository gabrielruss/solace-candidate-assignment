import { useEffect, useState } from "react";

import { Advocate, AdvocatePaginatedResponse } from "../types";

export const useFetchAdvocates = () => {
  const [advocates, setAdvocates] = useState<Array<Advocate>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchAdvocates = async (cursor: number | null = null) => {
    console.log("fetching advocates...");
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (cursor) {
        params.append("cursor", cursor.toString());
        // TODO in the future, if we allow user to set the page size, that would go here as well
      }

      const advocateResponse = await fetch(
        `/api/advocates?${params.toString()}`
      );

      if (!advocateResponse.ok) {
        throw new Error("Failed to fetch advocates");
      }

      const advocateJson: AdvocatePaginatedResponse =
        await advocateResponse.json();

      // if there is a cursor, we need to mix the old data with the new
      // otherwise, just add in the initial data
      setAdvocates((prevAdvocates) =>
        cursor ? [...prevAdvocates, ...advocateJson.data] : advocateJson.data
      );

      // sets nextCursor to the last advocate in the lists id
      setNextCursor(advocateJson.nextCursor);
      // if there is no nextCursor, then there are no more advocates to load
      setHasMore(!!advocateJson.nextCursor);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvocates();
  }, []);

  const fetchMore = () => {
    if (hasMore) {
      fetchAdvocates(nextCursor);
    }
  };

  return {
    advocates,
    loading,
    error,
    hasMoreAdvocates: hasMore,
    fetchMoreAdvocates: fetchMore,
  };
};
