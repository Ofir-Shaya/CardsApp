const PageFooter = () => {
  return (
    <footer className="border-top py-2 text-center">
      <span>
        Cards <i className="bi bi-geo-fill"></i> App
      </span>
      <span className="mx-2">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
};

export default PageFooter;
