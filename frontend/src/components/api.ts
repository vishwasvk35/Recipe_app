export async function searchRecipe(searchTerm: string, pageNo: number) {
    const baseUrl = new URL("http://localhost:5000/api/search");
    baseUrl.searchParams.append("searchTerm", searchTerm);
    baseUrl.searchParams.append("pageNo", String(pageNo));

    console.log("Fetching from:", baseUrl.toString());

    const response = await fetch(baseUrl);

    if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    return data;
}

export async function summaryRecipe(recipeId: string) {
    const baseUrl = new URL(`http://localhost:5000/api/recipe/${recipeId}/summary`);

    console.log("Fetching from: ", baseUrl.toString());

    const response = await fetch(baseUrl);

    if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    return data;
}
