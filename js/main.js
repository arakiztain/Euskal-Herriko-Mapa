import { loadMap } from './svg.js';
import { checkVersion } from './utils.js';
import { createMenuButton } from './menu.js';


function initialize() {
    loadMap();
    createMenuButton();
    checkVersion();
    //localStorage.clear();
}

initialize();
