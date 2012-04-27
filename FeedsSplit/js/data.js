(function () {
    "use strict";

    // These three strings encode placeholder images. You will want to set the
    // backgroundImage property in your real data to be URLs to images.
    var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
    var mediumGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY5g8dcZ/AAY/AsAlWFQ+AAAAAElFTkSuQmCC";
    var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";

    // Set up array variables

    var dataPromises = [];
    var blogs;

    // Create a data binding for our ListView

    var blogPosts = new WinJS.Binding.List();

    // Process the blog feeds

    function getFeeds() {
        // Create an object for each feed in the blogs array
        // Get the content for each feed in the blogs array
        // Return when all asynchronous operations are complete
        // Create an object for each feed in the blogs array
        blogs = [
{
    key: "Agile",
    url: 'http://blog.jayway.com/category/agile/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Android",
    url: 'http://blog.jayway.com/category/android/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Architecture",
    url: 'http://blog.jayway.com/category/architecture/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Cloud",
    url: 'http://blog.jayway.com/category/cloud/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Cocoa",
    url: 'http://blog.jayway.com/category/cocoa/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Embedded",
    url: 'http://blog.jayway.com/category/embedded/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Events",
    url: 'http://blog.jayway.com/category/events/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Java",
    url: 'http://blog.jayway.com/category/java/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Dynamic languages",
    url: 'http://blog.jayway.com/category/dynamic-languages/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Testing",
    url: 'http://blog.jayway.com/category/testing/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "Tips and tricks",
    url: 'http://blog.jayway.com/category/tips-tricks/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: "User experience",
    url: 'http://blog.jayway.com/category/user-experience/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/logo.png',
    acquireSyndication: acquireSyndication, dataPromise: null
},
{
    key: ".NET",
    url: 'http://blog.jayway.com/category/net/feed/atom',
    title: 'tbd', updated: 'tbd',
    backgroundImage: '/images/smalllogo.png', /* '/images/logo.png', */
    acquireSyndication: acquireSyndication, dataPromise: null
}
        ];

        // Get the content for each feed in the blogs array
        blogs.forEach(function (feed) {
            feed.dataPromise = feed.acquireSyndication(feed.url);
            dataPromises.push(feed.dataPromise);
        });

        // Return when all asynchronous operations are complete
        return WinJS.Promise.join(dataPromises).then(function () {
            return blogs;
        });

    }

    function acquireSyndication(url) {
        // Call xhr for the URL to get results asynchronously        
        return WinJS.xhr({ url: url });
    }

    function getBlogPosts() {
        // Walk the results to retrieve the blog posts
        getFeeds().then(function () {
            // Process each blog
            blogs.forEach(function (feed) {
                feed.dataPromise.then(function (articlesResponse) {
                    var articleSyndication = articlesResponse.responseXML;

                    // Get the blog title
                    feed.title = articleSyndication.selectSingleNode("/feed/title").text;
                    feed.subtitle = articleSyndication.selectSingleNode("/feed/subtitle").text;

                    // Use the date of the latest post as the last updated date
                    var ds = articleSyndication.selectSingleNode("/feed/entry/published").text;
                    var date = ds.substring(5, 7) + "-" + ds.substring(8, 10) + "-" + ds.substring(0, 4);
                    feed.updated = "Last updated " + date;

                    // Get the blog posts
                    getItemsFromXml(articleSyndication, blogPosts, feed);
                });
            });
        });

        return blogPosts;
    }

    function getItemsFromXml(articleSyndication, blogPosts, feed) {
        // Get the info for each blog post
        var posts = articleSyndication.selectNodes("//entry");

        // Process each blog post
        for (var postIndex = 0; postIndex < posts.length; postIndex++) {
            var post = posts[postIndex];

            // Get the title, author, and date published
            var postTitle = post.selectSingleNode("title").text;
            var postAuthor = post.selectSingleNode("author/name").text;
            var pds = post.selectSingleNode("published").text;
            var postDate = pds.substring(5, 7) + "-" + pds.substring(8, 10) + "-" + pds.substring(0, 4);

            // Process the content so it displays nicely
            var staticContent = toStaticHTML(post.selectSingleNode("content").text);

            // Store the post info we care about in the array
            blogPosts.push({
                group: feed,
                key: feed.title,
                title: postTitle,
                author: postAuthor,
                pubDate: postDate,
                content: staticContent,
                backgroundImage: '/images/logo.png'
            });
        }
    }

    // Organize the data for display

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    function getGroupedData() {
        return blogPosts.createGrouped(
            function (item) { return item.group.key; },
            function (item) { return item.group; },
            function (l, r) { return l < r; });
    }

    var list = getBlogPosts();
    var groupedItems = getGroupedData();

    WinJS.Namespace.define("data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemsFromGroup: getItemsFromGroup
    });
})();
