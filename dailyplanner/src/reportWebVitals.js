// Define a function named reportWebVitals that takes a function named onPerfEntry as its argument.
const reportWebVitals = onPerfEntry => {
  // Ensure that onPerfEntry is a valid function before proceeding.
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library to access its functions for measuring Web Vitals metrics.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Measure and report each of the following Web Vitals metrics:

      // Cumulative Layout Shift (CLS): Measures visual stability of the page.
      getCLS(onPerfEntry);

      // First Input Delay (FID): Measures interactivity (response time to user input).
      getFID(onPerfEntry);

      // First Contentful Paint (FCP): Measures perceived loading performance (time to first render).
      getFCP(onPerfEntry);

      // Largest Contentful Paint (LCP): Measures loading performance of the largest content element.
      getLCP(onPerfEntry);

      // Time to First Byte (TTFB): Measures server responsiveness.
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
