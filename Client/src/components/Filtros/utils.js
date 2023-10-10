export const loadScript = (url, callback) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
  };