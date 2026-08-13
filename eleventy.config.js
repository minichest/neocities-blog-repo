module.exports = async function(eleventyCc) {
  // Use a dynamic import to safely load the modern ESM plugin inside CommonJS
  const pluginRss = await import("@11ty/eleventy-plugin-rss");
  
  // Register the plugin using the default export object
  eleventyCc.addPlugin(pluginRss.default || pluginRss);

  // Date filter helper
  eleventyCc.addFilter("dateFilter", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  });

  // UPDATED: Excerpt filter that checks Front Matter variables first
  eleventyCc.addFilter("excerpt", (post) => {
    // 1. Check if a summary property exists inside the front matter metadata block
    if (post.data && post.data.summary) {
      return post.data.summary;
    }

    const content = post.templateContent;
    if (!content) return "";
    
    // 2. Fallback: Check for the <!-- more --> divider comment tag inside the body
    if (content.includes("<!-- more -->")) {
      return content.split("<!-- more -->")[0]; // Grabs everything before the comment split
    }
    
    // 3. Fallback: Strip HTML tags and take the first 200 characters from the text stream
    return content.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200).trim() + "...";
  });

  return {
    pathPrefix: "/ice-cap-zone/",
    dir: {
      input: "src",
      includes: "_includes",
      output: "public/ice-cap-zone"
    }
  };
};
