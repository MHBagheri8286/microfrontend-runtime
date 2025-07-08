import { mount } from "products/ProductsIndex";
import { mount as mountCart } from "cart/CartShow";

mountCart(document.querySelector('#my-cart'));
mount(document.querySelector("#my-products"));
