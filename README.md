# Book Diary

Created with spite in Chicago, IL sometime in the 21st century.

## Why

I wanted to be able to look at the books I read in a quicker way, in an interface that was easier for me to read than what goodreads&#8482; offered. I wanted to easily see how many books, pages, etc I had read in a year, or a month. I also wanted to be able to find books based off my ratings. This application does this.

## Caveats

Amazon&#8482; who has owned goodreads&#8482; since March 2013 decided to shut down the sites public API somewhere in 2020 (unless you were grandfathered in). This of course made it a PITA to create a web app like this. Luckily, you can export your books from Goodreads, unfortunately it's in a CSV format.

### How do I get my data?

Log in to goodreads&#8482; go to the _My Books_
tab. On the left hand side, as the last option you will see `Tools`, select `Import and Export`. This brings you to a page where you can click on a button `Export Library` and goodreads&#8482; will create a `csv` for you that you can then download.

### How do I prepare my data?

Either create your own script or find a site on the internet that allows you to convert `csv` to `json`.

### Where do I put my data

Rename the file to `books.json` and stick it in `./src/data`. You can really name it whatever you want as long as you change the import in `./src/App.tsx`. You could of course put your data pretty easily in some non-relational database, but you would have to rewrite some of the logic.

## Deploying

Just run `npm run build` from the root directory and then put it wherever you want. I put it in an S3 buckect, [my copy](http://secondrunnerup.com/book-diary/) with no SSL cert, yeah I know, but cloudflare and Root53 are a pain in the but to setup.

## This is pretty janky (scuff for you younguns)

It works, there are type definitions for the books that come in, but their are minimal unit tests, things could be broken out into more components, logic could be stripped out, probably made into custom hooks, but it is what it is for now.

You also have to go through importing the data whenever you want it to show up in the webapp, which sucks. Thanks Amazon&#8482;.

## License

Umm, one of the CC license where you just have to attribute me in your code and on your site.

## Legal Stuff

This in no way is related to Amazon&#8482; or goodreads&#8482; please don't sue me. This is offered as is, if it blows up your server, I'm sorry, it had a good run.
