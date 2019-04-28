import "isomorphic-fetch";

/**
 * extract base page + slug name from requested url
 * my WP setup doesn't support requests like /comics/kill-bill so have to transform to /comics/?slug=kill-bill
 * @param {String} url 
 */
function parseUrl(url) {
    let parsed = url;
    if (parsed[0] === '/') {
        parsed = parsed.substring(1);
    }
    const split = parsed.split('/');
    return {
        page: split[0],
        slug: split[1]
    }
}
/**
 * transform request url from client to a WP friendly endpoint
 * @param {*} url request url to transform for WP
 */
function generateUrl(url) {
    const { page, slug } = parseUrl(url);
    return `http://127.0.0.1:8000/wp-json/wp/v2/${page}/${slug ? `?slug=${slug}` : ''}`
}

/**
 * transform data to fit the content-state specification
 * if I was a PHP/WP wiz I could do this in WP but i'm as it is i'm a javascript homer
 * shouts to jon-kyle mohr https://www.jon-kyle.com/entries/2019-03-21-simple-ish-sites#2019-03-21-simple-ish-sites-fn1
 * and Folder Studios for the inspiration (they didn't write a post about it but I see them using it in their sites)
 * @param {Array[Object]} res response object
 * @param {String} url requested url
 */
function transformToContentState(res, url) {
    let data = {};
    // page with no subpages has shape:
    // {
    //     page: {
    //         ...data
    //     }
    // }
    if (res.length === 1) {
        data[url] = {
            _loaded: true,
            name: res[0].slug,
            url,
            ...res[0].acf
        };
    }
    // page with subpages has shape
    // {
    //     "page": {
    //         pages: [
    //             "/subpage1",
    //             "/subgpage2"
    //         ]
    //     },
    //     "/subpage1": {
    //         ...data
    //     },
    //     "/subpage2": {
    //         ...data
    //     }
    // }
    else {
        data[url] = { _loaded: true, pages: [] }
        res.forEach(({ slug, acf }) => {
            const entryUrl = `${url}/${slug}`;
            data[url].pages.push(entryUrl);
            data[entryUrl] = {
                _loaded: true,
                slug,
                url: entryUrl,
                ...acf
            };
        });
    }
    return data;
}

function removeTrailingSlash(url) {
    return url.replace(/\/$/, "");
}

export function handler(event, context, callback) {
    const { url } = event.queryStringParameters;
    const formattedUrl = removeTrailingSlash(url);
    fetch(generateUrl(formattedUrl))
        .then(res => res.json())
        .then(res => transformToContentState(res, formattedUrl))
        .then(res => {
            callback(null, {
                statusCode: 200,
                contentType: 'json',
                headers: { 'content-type': 'application/json; charset=utf-8' },
                body: JSON.stringify(res)
            });
        }).catch(e => {
            callback(null, {
                statusCode: 400,
                contentType: 'json',
                headers: { 'content-type': 'application/json; charset=utf-8' },
                body: JSON.stringify({ message: 'Not found', e })
            });
        });
}