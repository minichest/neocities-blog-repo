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

  // UPDATED: Excerpt filter that isolates just the pure text sentence
  eleventyCc.addFilter("excerpt", (post) => {
    // 1. Check if an explicit summary property exists inside the front matter metadata block
    if (post.data && post.data.summary) {
      return post.data.summary;
    }

    const content = post.templateContent;
    if (!content) return "";
    
    // 2. Extract content before <!-- more --> marker
    let rawSegment = content;
    if (content.includes("<!-- more -->")) {
      rawSegment = content.split("<!-- more -->")[0];
    }
    
    // 3. FIXED: Clean up the segment by stripping headers, HTML tags, and duplicate title nodes
    const cleanSummary = rawSegment
      .replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, "") // Deletes any inner header tags
      .replace(/<\/?[^>]+(>|$)/g, "")               // Strips out all remaining HTML syntax brackets
      .trim();

    // Return the clean excerpt limited to a friendly length
    return cleanSummary.substring(0, 180).trim() + "...";
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
