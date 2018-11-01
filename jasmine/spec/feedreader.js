/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /*  This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            for(let feed of allFeeds)
            {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /*
         *  ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            for(let feed of allFeeds)
            {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    /* Test suite "The menu" */
    describe('The menu', function() {

        it('menu element is hidden by default', function() {
            let bodyelement = document.querySelector('body');
            expect(bodyelement.classList.contains('menu-hidden')).toBe(true);
        });

         /* Ensures the menu toggles when the menu icon is clicked*/
        it('menu changes', function() {
            let bodyelement = document.querySelector('body');
            let ishidden=bodyelement.classList.contains('menu-hidden');
            // on clicking menu shown
            document.getElementsByClassName('menu-icon-link')[0].click();
            expect(bodyelement.classList.contains('menu-hidden')).not.toBe(ishidden);
            // on clicking again menu hides
            document.getElementsByClassName('menu-icon-link')[0].click();
            expect(bodyelement.classList.contains('menu-hidden')).toBe(ishidden);
        });
    });

    /*  Test suite "Initial Entries" */
    describe('Initial Entries', function() {
        /* Ensures there is at least a single feed */
        beforeEach(function(done){
            loadFeed(0,done);
        });

        it('feed load with at least one entry', function(done) {
            let feed = document.querySelector('.feed .entry');
            expect(feed.length).not.toBe(0);
            done();
        });
    });

    /* Test suite "New Feed Selection" */
    describe('New Feed Selection', function() {
        let prevFeed;
        /* Ensures a new feed is loaded  the content actually changes.*/
        beforeEach(function(done) {
            loadFeed(0, function() {
                prevFeed = $('.feed').html(); // previous feed.
                loadFeed(1, done);// new feed.
            });
        });

        it('new feed is loaded', function(done) {
            expect($('.feed').html()).not.toBe(prevFeed);
            done();
        });
    });
}());
