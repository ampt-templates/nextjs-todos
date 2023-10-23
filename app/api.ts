export const api = async (
  _url: string,
  options?: any
): Promise<{
  status: number;
  data?: any;
}> => {
  const url = _url[0] === "/" ? _url.slice(1) : _url;

  const response = await fetch(`/api/${url}`, {
    ...(options || {}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg);
  }

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  const data = isJson ? await response.json() : null;

  return {
    data,
    status: response.status,
  };
};
