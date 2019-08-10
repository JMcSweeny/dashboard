export async function get<T>(path: string): Promise<T> {
  const url = `${API_ROOT}/${path}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}