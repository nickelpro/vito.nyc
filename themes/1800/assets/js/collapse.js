
function collapseToggle(el) {
  var collapseDiv = el.parentElement.getElementsByClassName('collapse-div')[0];
  if(collapseDiv.clientHeight) {
    collapseDiv.style.height = 0;
  } else {
    var inner = collapseDiv.getElementsByClassName('collapse-inner')[0];
    var height = inner.clientHeight / parseFloat(getComputedStyle(
        document.querySelector('body'))['font-size'])
    collapseDiv.style.transitionDuration = Math.max(height/80, 0.4) + "s";
    collapseDiv.style.height = height + "rem";
  }
}

function collapseClose(el) {
  var collapseDiv = el.parentElement.parentElement;
  var height = collapseDiv.clientHeight;

  window.scrollBy({
    left: 0, top: -height, behavior: 'smooth'
  });
  collapseDiv.style.height = 0;
}
