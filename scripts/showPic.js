function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement,targetElement.nextSibling)
    };
}

function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    // 创建一个 img 元素 存在变量: placeholder
    var placeholder = document.createElement("img");
    // 添加 id placeholder
    placeholder.setAttribute("id","placeholder");
    // 添加 src  images/placeholder.gif
    placeholder.setAttribute("src","images/placeholder.gif");
    // 添加 alt my image gallery
    placeholder.setAttribute("alt","my image gallery");
    // 创建一个 p 元素 存在 description
    var description = document.createElement("p");
    // 添加 id description
    description.setAttribute("id","description");
    // 创建TextNode Choose an image保存在 destext
    var destext = document.createTextNode("Choose an image");
    description.appendChild(destext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    let gallery = document.getElementById("imagegallery");
    let links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      links[i].onclick = function () {
          return showPic(this);
      }
      links[i].onkeypress = links[i].onclick;
    }
}

function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description")) return false;
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
