const NoResultsCommponent = () => {
  return (
    <div className="alert alert-warning" role="alert">
      Either I was a slacker this month and didn't finish any books, this was a
      date prior to when I bought a Kindle, or it's a date in the future. Or the
      filters you have chosen don't match anything. Spooky.
    </div>
  );
};

export default NoResultsCommponent;
