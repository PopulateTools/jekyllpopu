jQuery(document).ready(function($) {

  function getRightClick(e) {
    var rightclick;
    if (!e) var e = window.event;
    if (e.which) rightclick = (e.which == 3);
    else if (e.button) rightclick = (e.button == 2);
    return rightclick; // true or false
  }

  function getSelectionText() {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  }

  // actions when the user starts the selection
  $('article').mousedown(function (event) {
    // take the position of the mouse where the user starts the selection
    // we need this for showing the share button in the middle of the selection
    $('body').attr('mouse-top',event.clientY+window.pageYOffset); //-> sets up the top value as attribute on body tag.
    $('body').attr('mouse-left',event.clientX); //-> sets up the left value as attribute on body tag.

    // remove share button and the old selection - ! Just if the user clicks the left button of the mouse. For right click we must show the genuine browser menu.
    if(!getRightClick(event) && getSelectionText().length > 0) {
      $('.twtshare').remove(); //-> remove share button
      document.getSelection().removeAllRanges(); //-> remove old selection
    }
  });

  // actions when the user ends the selection
  $('article').mouseup(function (event) {

    var t = $(event.target);
    var st = getSelectionText();

    // go further just if user click is left mouse click and the selection length is grater than 3 characters
    if(st.length > 3 && !getRightClick(event)) {

      // get the mouse top position when the selection ends
      mts = $('body').attr('mouse-top');
      mte = event.clientY+window.pageYOffset;
      if(parseInt(mts) < parseInt(mte)) mt = mts;
      else mt = mte;

      // get left mouse position when the selection ends
      mlp = $('body').attr('mouse-left');
      mrp = event.clientX;
      ml = parseInt(mlp)+(parseInt(mrp)-parseInt(mlp))/2;

      // create the sharing link parameter that will be pass to twitter
      sl = window.location.href.split('?')[0];

      // cut the selection to a maximum of 107 - twitter accepts ~120 chars but we have some other info to display, like the account name
      // maxl = 106;
      maxl = 92;

      if(st.length > maxl) {
        st = st.substring(0,maxl) + '…';
      }

      // concat the account name to the selection text
      st = st+' {{ site.twitter_hashtag_for_social_share }}';

      // create the sharing button
      $('body').append("<a href=\"https://twitter.com/share?url="+encodeURIComponent(sl)+"&text="+encodeURIComponent(st)+"\" class='twtshare icon-social-twitter' onclick=\"window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600\');return false;\" data-track-event=\"Social Share|Click Twitter|From Selected Text\"></a>");

      // show link on calculated position (top of selection and middle of it horizontaly)
      $('.twtshare').css({
        position: 'absolute',
        top: parseInt(mt)-60,
        left: parseInt(ml)
      });
    }
  });
});
