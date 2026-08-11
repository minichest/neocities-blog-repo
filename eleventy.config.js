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

  return {
    pathPrefix: "/ice-cap-zone/",
    dir: {
      input: "src",
      includes: "_includes",
      output: "public/ice-cap-zone"
    }
  };
};
