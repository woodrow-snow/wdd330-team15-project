import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// ---------- Clearing localStorage ----------
const lsName = 'so-cart';

localStorage.removeItem(lsName);

