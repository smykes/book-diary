import { getURL } from "./helpers";
import { ENDPOINT } from "../../constants";

const getAllBooks = async (
  month: number | undefined,
  year: number | undefined,
  rating: number | undefined,
  sort: number | undefined,
  term: string | undefined,
  page: number | undefined
) => {
  const url = getURL(month, year, rating, sort, term, page);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    const e = error as Error;
    console.error(e.message);
  }
};

const getAllYears = async () => {
  const url = `${ENDPOINT.BACKEND_API}/years`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    const e = error as Error;
    console.error(e.message);
  }
};

export { getAllBooks, getAllYears };
