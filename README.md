# Book Diary

Created with spite in Chicago, IL sometime in the 21st century.

This is the front-end portion of this application. A lot of this Read Me refers to an old version before this had a backend, they are split up, but I haven't made the backend public yet.

It uses React, Vite, Typescript, and Tailwind.

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

I use a Heroku Postgresql instance seeding it with the Prisma ORM tools.

## Deploying

Just run `npm run build` from the root directory and then put it wherever you want. I put it in on Netlify, [my copy](https://bookcasegr.netlify.app/).

## This is pretty janky (scuff for you younguns)

It works, there are type definitions for the books that come in, but their are minimal unit tests, things could be broken out into more components, logic could be stripped out, probably made into custom hooks, but it is what it is for now.

You also have to go through importing the data whenever you want it to show up in the webapp, which sucks. Thanks Amazon&#8482;.

## License

Umm, one of the CC license where you just have to attribute me in your code and on your site.

## Legal Stuff

This in no way is related to Amazon&#8482; or goodreads&#8482; please don't sue me. This is offered as is, if it blows up your server, I'm sorry, it had a good run.
