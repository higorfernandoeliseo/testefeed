function parseRssFeed(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const items = [];
    const itemElements = xmlDoc.querySelectorAll("item"); // Select all <item> elements

    itemElements.forEach(itemElement => {
        const title = itemElement.querySelector("title")?.textContent || "";
        const link = itemElement.querySelector("link")?.textContent || "";
        const description = itemElement.querySelector("description")?.textContent || "";
        const pubDate = itemElement.querySelector("pubDate")?.textContent || "";

        items.push({ title, link, description, pubDate });
    });
    return items;
}

console.log(parseRssFeed("https://feeds.folha.uol.com.br/tec/rss091.xml"));

