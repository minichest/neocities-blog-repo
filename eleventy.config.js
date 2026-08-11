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
    pathPrefix: "/ice-cap-zone/",
    dir: {
      input: "src",
      includes: "_includes",
      // Builds files directly inside a subfolder block
      output: "public/ice-cap-zone" 
    }
  };
};
