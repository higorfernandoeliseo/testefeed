async function fetchRssFeed(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text(); // Get the XML content as text
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        return null;
    }
}

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

function displayFeedItems(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear existing content

    items.forEach(item => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("rss-article");

        const titleLink = document.createElement("a");
        titleLink.href = item.link;
        titleLink.target = "_blank"; // Open in new tab
        titleLink.textContent = item.title;

        const titleElement = document.createElement("h3");
        titleElement.appendChild(titleLink);

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = item.description; // Use innerHTML for rich text

        const dateElement = document.createElement("small");
        dateElement.textContent = `Published: ${new Date(item.pubDate).toLocaleDateString()}`;

        articleDiv.appendChild(titleElement);
        articleDiv.appendChild(descriptionElement);
        articleDiv.appendChild(dateElement);
        container.appendChild(articleDiv);
    });
}

const xmlContent = await fetchRssFeed("https://feeds.folha.uol.com.br/tec/rss091.xml");

if (xmlContent) {
    const feedItems = parseRssFeed(xmlContent);
    displayFeedItems(feedItems, "rss-feed-container");
}

