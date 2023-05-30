import { Website } from '../src/';

const website = new Website({
    name: 'AI Game Asset Generator',
    idea: 'marketing website for an opensource AI Game Asset generator tool',
    colors: 'auto', //default
    language: 'auto', //default auto, but if defined, everything is translated to it. Can also be an array like ['es','en'] being the first the default one
    logo: 'assets/logo.png', //can be either a string or import
    topics: ['gaming','ai','game assets','game development'],
    techstack: ['nodejs','react','typescript','webpack','builder.io'],  //ex generate headless CMS code blocks using builder.io
    knowledge: { // knowledge data for AI text generation when needed
        social: {
            twitter: 'https://twitter.com/ai',
            facebook: 'https://facebook.com/ai',
            instagram: 'https://instagram.com/ai',
        },
        contactInfo: {
            email: 'info@ai.com',
            phone: '+1 555 555 5555',
        }
    },  
});

// define default web layout
website.layout(`
------------------------
|        HEADER        |
------------------------
|       CONTENTS       |
|                      |
------------------------
|        FOOTER        |
------------------------
`,{
    // string values are interpreted with LLM brain engine
    header: 'fixed navigation bar with logo on the left and menu with section names on the right',
    /*header: {
        logo: true,     //default for header
        fixed: true,
        dark: true,

    },*/
    contents: 'default location for page contents',
    footer: 'footer with links to social media, copyright notice and contact info',
});

website.addPage('home',[
    //array of contents to place on the layout location for contents
    website.addHero('ai:asset:grand banner showing a computer screen with a fantasic game world inside and a user playing',{
        'ai:invent marketing text to attract user to check benefits in 6 words':'#benefits',
        'Register now & build your assets with AI':'#signup'
    }),
    //addSection(id, title, [contents])
    website.addSection('benefits','Benefits of using AI Game Asset Generator',[
        website.addCard('ai:asset:3d model of a character with a sword','Create 3D models of characters, weapons, items and more with AI'),
        website.addCard('ai:asset:2d game scrolling world level mario bros like with a rabbit character','Create fantastic 2D levels worlds for your game just using text and keeping the style you want'),
    ]),
    //website.addSection('section 2'),
]);

!(async function() {
    const cost = await website.cost();  // calculate the cost of the website in LLM tokens
    console.log('building website will cost',cost,'LLM tokens');
    await website.build();  // build the website code; it'll always try to create a static version of the website is posible
    console.log('website built')
    await website.serve();  // serve the website; default port 3000
    console.log('website ready on http://localhost:3000')
}());