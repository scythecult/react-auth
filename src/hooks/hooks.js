import { useCallback, useEffect, useState } from "react";

const useHttp = () => {
  const [postResponse, setPostResponse] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async ({ url, method = "GET", items = [] }) => {
    setErrorData(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        url,
        method === "POST" || "PUT"
          ? {
              method: method,
              body: JSON.stringify(items),
              headers: {
                "Content-type": "application/json",
              },
            }
          : {}
      );

      if (response.ok) {
        const data = await response.json();

        if (method === "POST" || "PUT") {
          setPostResponse(data);
        }

        return data;
      }

      const errorData = await response.json();

      setErrorData(errorData?.error);

      return errorData?.error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [fetchData, { postResponse, errorData, isLoading }];
};

const useCallbackAfter = ({ callback, seconds, isStartCount }) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) return;
    if (!isStartCount) return;

    const timerId = setTimeout(() => {
      callback();
      setIsDone(true);
    }, seconds * 1000);

    return () => clearTimeout(timerId);
  }, [isDone, callback, seconds, isStartCount]);

  return [isDone];
};

export { useHttp, useCallbackAfter };
