try {
        document.documentElement.dataset.theme =
          localStorage.getItem("portfolio-theme") || "light";
      } catch (error) {}
