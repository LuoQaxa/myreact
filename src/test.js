var obj = {
  onClick: function () {
    console.log(1);
  }
}
for (const attr in obj) {
  // setAttribute(dom, attr, vdom.attributes[attr])
  console.log(attr);
  
}