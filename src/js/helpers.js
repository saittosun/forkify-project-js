import { async } from "regenerator-runtime";

export const getJSON = async function (url) {
  try {
    const res = await fetch(url)
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`)
    console.log(res, data.data.recipe)
    return data;
  } catch (err) {
    console.log(err)
  }
}