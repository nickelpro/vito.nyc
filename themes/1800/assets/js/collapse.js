
function collapseToggle(el) {
  var collapseDiv = el.parentElement.getElementsByClassName('collapse-div')[0];
  if(collapseDiv.clientHeight) {
    collapseDiv.style.height = 0;
  } else {
    var inner = collapseDiv.getElementsByClassName('collapse-inner')[0];
    var height = inner.clientHeight / parseFloat(getComputedStyle(
        document.querySelector('body'))['font-size'])
    height++;
    collapseDiv.style.height = height + "rem";
    collapseDiv.style.transitionDuration = Math.max(height/80, 0.4) + "s";
    console.log("Transition is: " + collapseDiv.style.transitionDuration);
  }
}
