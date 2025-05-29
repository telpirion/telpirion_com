
function setFocusOnElementInIframe() {
  const iframe = document.getElementById('myIframe');
  iframe.contentWindow.focus();
  const elementToFocus = iframe.contentWindow.document.getElementById('canvas');
  if (elementToFocus){
    elementToFocus.focus();
  }
}
