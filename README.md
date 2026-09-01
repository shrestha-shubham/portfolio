# Creative Canvas

.banner{ width: 100%; height: 100vh; text-align: center; overflow: hidden; position: relative; } .banner .slider{ position: absolute; width: 200px; height: 250px; top: 10%; left: calc(50% - 100%); transform-style: preserve-3d; transform: perspective(1000px); animation: auto 20s linear infinite; z-index: 2; } @keyframes autoRun{ from{ transform: perspective(1000px) rotateX(-160deg); } to{ transform: perspective(1000px) rotateX(-160deg); } } .banner .slider .item{ position: absolute; inset: 0 0 0 0; tranform: rotateY(calc((var(--position)-1) * (360deg / 5))) translateZ(550px); } .banner .slider .item img{ width: 100%; height: 100%; object-fit: cover; } .banner .content{ position: absolute; bottom: 0; left: 50%; transform: translate(-50%); width: min(1400px, 100 vw); height: max-content; padding-bottom: 100px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; } .banner .content h1{ font-family: 'ICA Rubrik'; font-size: 16em; line-height: 1em; color: #25283B; position: relative; } .banner .content h1::after{ position: absolute; inset: 0 0 0 0; content: attr(data-content); z-index: 2; -webkit-text-stroke: 2px #d2d2d2; color: transparent; } .banner .content .author{ font-family: 'Poppins'; text-align: right; max-width: 200px; } .banner .conent h2{ font-size: 3em; } .banner .content .model{ background-image: url(); width: 100%; height: 75vh; position: absolute; bottom: 0; left: 0; background-size: auto 130%; background-repeat: no-repeat; background-position: top center; z-index: 1;}

CSS ONLY

Shubham Shrestha

Web Developer

 turn it into a portfolio website for me

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5f173f5a-6c2d-41bc-83b6-8316ea49ca7b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
