/*
// minimalist AI framework class for rendering cool looking websites without too much effort
this could be the new 'Concepto' framework, but as a JS/TS class
- this could also generate a Concepto diagram of the website with the corresponding code
- this could also generate builder.io code sections for the components (if using react,vue,svelte)
- this could also generate a figma design of the website

internally the framework class keeps track of the used texts and provides it as context for the template LLM engine
*/
// example usage
const ai = new Framework('AI Game Asset Generator',{
    idea: 'marketing website for an opensource AI Game Asset generator tool',
    colors: 'auto',
    topics: ['gaming','ai','game assets','game development'],
    techstack: ['nodejs','react','mongodb','typescript','webpack'], //describe techstack available, and AI will do it's best with it
    cacheSeed: 'ai', // seed for caching, if not set, each time you erase the build folder it'll regenerate everything
    // if within the given techstack there's no db specified, it'll warn the user on the console to add one (even one like sqlite)
    db: { // db schema, supports zod validation
        users: {
            name: ai.z.string().min(3).max(255),
            email: ai.z.string().email(),
            password: ai.z.string().min(8).max(255),
            role: ai.z.enum(['admin','user']).default('user'),
        }
    },
});
ai.addPage('products',[
    ai.addSearchBox('search products','products'),
    ai.carrousel('products'), // use ai products definitions and image assets to generate a carousel
    ai.divide([]), // divide the available space in equal parts among children array

])
ai.newPage('home','ai:generate marketing title for page')
        .addToolbarWithPages(4, [ai.addLoginButton('login'), ai.addChatButton()])  // show 4 main pages in the toolbar
        
        .AddHero('ai:asset:grand banner showing a computer screen with a fantasic game world inside and a user playing',{
            'ai:describe feature 1':'button link',
            'ai:describe feature 2':'button link'
        })
        .addSection('section 1')

ai.addPage("login","Login page")
    .addLoginForm({ // define labels and which fields to show
        'Email address': 'users.email',
        'Password': 'users.password',
    },{
        resetPassword: true,
        allowSignup: true,
    })

ai.build().serve(); // build and serve the website