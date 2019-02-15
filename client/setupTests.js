import jsdom from 'jsdom';
const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>')).window;
global.document = document;
global.window = document.defaultView;
global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };

  
window.matchMedia = window.matchMedia || function(query) {
    const queryMap = {
        '(min-width: 1150px)': () => window.innerWidth >= 1150,
        '(max-width: 1149px)': () => window.innerWidth < 1150
    };

    const queryValue = queryMap[query];
    const matches = queryValue ? queryValue() : false;

    return {
        matches: true,
        addListener : function() {},
        removeListener: function() {}
    };
};