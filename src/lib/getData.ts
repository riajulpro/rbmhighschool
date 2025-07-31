export async function getData(path: string) {
  try {
    const url = `${process.env.BACKEND_URL}${path}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
