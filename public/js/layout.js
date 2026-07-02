const btn = document.getElementById("menu-btn");
const nav = document.querySelector("nav");
const icon = document.getElementById("menu-icon");

/* toggle menu */
btn.addEventListener("click", ()=>{
  nav.classList.toggle("show");

  /* ⭐ toggle icon */
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

document.querySelectorAll("nav a").forEach(link=>{
  link.addEventListener("click", ()=>{
    nav.classList.remove("show");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

document.addEventListener("click", (e)=>{
  if(!nav.contains(e.target) && !btn.contains(e.target)){
    nav.classList.remove("show");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});