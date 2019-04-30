
let p1 = document.getElementsByTagName("p")[0];
let p2 = document.getElementsByTagName("p")[1];
let result_text = document.getElementById("result_text"),
    but_search = document.getElementById("but_search"),
    inp_search = document.getElementById("inp_search"),
    but_sort_list = document.getElementById("sort_list"),
    inp_sort = document.getElementById("inp_sort"),
    but_sort = document.getElementById("but_sort"),
    inp_level = document.getElementById("inp_level"),
    but_level = document.getElementById("but_level");

let nav_search = document.getElementById("nav_search"),
    nav_sort = document.getElementById("nav_sort"),
    nav_level = document.getElementById("nav_level"),
    nav_sort_list = document.getElementById("nav_sort_list");
let nav = [nav_search, nav_sort, nav_level, nav_sort_list];


let result = {
  search: document.createElement("div"),
  sort: document.createElement("div"),
  sort_list: document.createElement("div"),
  level: document.createElement("div")
};



let badge = [
  "badge badge-primary",
  "badge badge-secondary",
  "badge badge-success",
  "badge badge-danger",
  "badge badge-warning",
  "badge badge-info"
];


function nav_unactive() {
  nav.forEach(n => n.className = "nav-link");
}




but_search.onclick = function(){
  nav_unactive();
  nav_search.className = "nav-link active";
  let found = search(inp_search.value, data)
  result.search.title.textContent = "";
  result.search.appendChild(found);
  result_text.textContent = "";
  result_text.appendChild(result.search);
}

but_sort.onclick = function(){
  nav_unactive();
  nav_sort.className = "nav-link active";
  result.sort.textContent = "";
  result.sort.appendChild(get_sort(inp_sort.value, data));
  result_text.search.textContent = "";
  result_text.search.appendChild(result.sort);
}

but_sort_list.onclick = function() {
  nav_unactive();
  nav_sort_list.className = "nav-link active";
  result.sort_list.textContent = "";
  result.sort_list.appendChild(get_sort_list(data));
  result_text.textContent = "";
  result_text.appendChild(result.sort_list);
}

but_level.onclick = function() {
  nav_unactive();
  nav_level.className = "nav-link active";
  result.level.textContent = "";
  result.level.appendChild(get_level(inp_level.value, data));
  result_text.textContent = "";
  result_text.appendChild(result.level);
}

nav_search.onclick = function(){
  nav_unactive();
  nav_search.className = "nav-link active";
}
nav_sort.onclick = function(){
  nav_unactive();
  nav_sort.className = "nav-link active";
  result_text.textContent = "";
  result_text.appendChild(result.sort);
}
nav_level.onclick = function(){
  nav_unactive();
  nav_level.className = "nav-link active";
  result_text.textContent = "";
  result_text.appendChild(result.level);
}
nav_sort_list.onclick = function(){
  nav_unactive();
  nav_sort_list.className = "nav-link active";
  result_text.textContent = "";
  result_text.appendChild(result.sort_list);
}


function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
      else dom.appendChild(document.createTextNode(child));
      }
    return dom;
  }
//“children” args that typeof number must be converted into string;


function search(keyword, data) {
  let search_content = document.createElement("div");
  let reg = new RegExp(`${keyword}`);
  let title_content = elt("div", {style: "display: block"}),
      tab_content = elt("div", {style: "display: none"}),
      idea_content = elt("div", {style: "display: none"});

  let title = elt("div", {}, elt("div", {
    className: "alert alert-primary",
    onclick: function() {
      title_content.style.display = title_content.style.display == "none" ? "block" : "none";
    }
  }, "title"), title_content);

  let tab = elt("div", {}, elt("div", {
    className: "alert alert-primary",
    onclick: function() {
      tab_content.style.display = tab_content.style.display == "none" ? "block" : "none";
    }
  }, "tab"), tab_content);

  let idea = elt("div", {}, elt("div", {
    className: "alert alert-primary",
    onclick: function() {
      idea_content.style.display = idea_content.style.display == "none" ? "block" : "none";
    }
  }, "idea"), idea_content);

  data.filter(d => reg.test(d.title)).forEach((f, i) => {
    let child = elt("a", {
      href: f.url
    }, (i+1).toString() + ". " + "《" + f.title + "》");
    title_content.appendChild(child);
  });

  data.filter(d => {return d.tab ? d.tab.includes(keyword) : false}).forEach((found, j) => {
    let child = elt("a", {
      href: found.url
    }, ((j+1).toString() + ". " + "《" + found.title + "》"));
    let tab_badge = document.createElement("div")

    found.tab.forEach(t => {
      let tb = elt("span", {className:badge[Math.floor(Math.random() * badge.length)]}, t);
      tab_badge.appendChild(tb);
    })
    tab_content.appendChild(child);
    tab_content.appendChild(tab_badge);
  });

  data.filter(d => {return d.idea ? d.idea.includes(keyword) : false}).forEach((found, j) => {
    let child = elt("a", {
      href: found.url
    }, ((j+1).toString() + ". " + "《" + found.title + "》"));
    let idea_badge = document.createElement("div")

    found.idea.forEach(i => {
      let ib = elt("span", {className:badge[Math.floor(Math.random() * badge.length)]}, i);
      idea_badge.appendChild(ib);
    })
    idea_content.appendChild(child);
    idea_content.appendChild(idea_badge);
  });


  search_content.appendChild(title);
  search_content.appendChild(tab);
  search_content.appendChild(idea);

  return search_content;
}


function get_sort_list(data) {
  let sort = [];
  let sort_list = document.createElement("div");
  data.forEach(d => {
    if (d.sort) {
      d.sort.forEach(a => {
        if (!sort.includes(a)) sort.push(a);
      });
    };
  });

  sort.forEach((s, j) => sort_list.appendChild(elt("p", {}, (j+1) + ". " + s)));
  return sort_list;
}


function get_sort(sort_text, data) {
  let sort = document.createElement("div");
  let sort_array = sort_text.split(';');
  sort_array.forEach(s => {
    sort.appendChild(elt("div", {
      className: "alert alert-primary"
    }, s));

    data.filter(d => {return d.sort ? d.sort.includes(s) : false}).forEach((a,j) => {
      let child = elt("a", {
        href: a.url
      }, ((j+1).toString() + ". 《" + a.title + "》" ));
      sort.appendChild(child);
    })
  });

  return sort;
}

function get_level(n, data) {
  let level = document.createElement("div");
  n = Number(n);
  if (!Number.isInteger(n) || n < 1 || n > 5) throw new Error("Getting star-level articles request a integer from 1 to 5");
  let star = "★".repeat(n);
  level.appendChild(elt("div", {
    className: "alert alert-primary"
  }, star + "-Level articles: "))
  data.filter(d => {return d.star ? d.star == star : false}).forEach((l,j) => {
    let child = elt("a", {
      href: l.url
    }, ((j+1).toString() + ". 《" + l.title + "》" ));
    level.appendChild(child);
  })
  return level;
}
