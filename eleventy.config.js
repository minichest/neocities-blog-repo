module.exports = function(eleventyCc) {
  // Simple date filter to format post dates cleanly
  eleventyCc.addFilter("dateFilter", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  });

  return {
    // Sets the base prefix path for all generated URLs
    pathPrefix: "/ice-cap-zone/",
    dir: {
      input: "src",
      includes: "_includes",
      output: "public"
    }
  };
};
