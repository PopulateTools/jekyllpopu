(function(window, undefined){
  'use strict';

  window.shareContent = flight.component(function(){
    this.attributes({
      // current url and parent url
      // url: window.parent.window.location.href,
      url: window.location.href,
      twitterHandle: '{{ site.twitter_username }}',
      modalOptions: 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
    });

    this.after('initialize', function() {
      if(this.$node.find('[data-share-url]').length > 0){
        this.attr.url = this.$node.find('[data-share-url]').data('share-url');
      }

      if(this.$node.data('anchor') !== undefined){
        this.attr.url += '#' + this.$node.data('anchor');
      }

      this.twitterLink = this.$node.find('[data-share-network=twitter]');
      this.facebookLink = this.$node.find('[data-share-network=facebook]');
      this.linkedinLink = this.$node.find('[data-share-network=linkedin]');
      this.emailLink = this.$node.find('[data-share-network=email]');

      if(this.twitterLink)
        this.twitterLink.on('click', this.clickTwitterHandle.bind(this));

      if(this.facebookLink)
        this.facebookLink.on('click', this.clickFacebookHandle.bind(this));

      if(this.linkedinLink)
        this.linkedinLink.on('click', this.clickLinkedinHandle.bind(this));

      if(this.emailLink.length)
        this.emailLink.on('click', this.clickEmailHandle.bind(this));
    });

    this.clickTwitterHandle = function(e) {
      e.preventDefault();
      try {
        window.open('https://twitter.com/share?url='+encodeURIComponent(this.attr.url)+'&text=' + this.shareText(), '', this.attr.modalOptions);
      } catch(missingShareTextNode) {
        console.log('Error: missing share Text Node');
      }
    };

    this.clickFacebookHandle = function(e) {
      e.preventDefault();
      window.open('http://www.facebook.com/sharer/sharer.php?u='+ encodeURIComponent(this.attr.url), '', this.attr.modalOptions);
    };

    this.clickLinkedinHandle = function(e) {
      e.preventDefault();

      window.open('https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(this.attr.url)+'&title=' + this.shareText(), '', this.attr.modalOptions);
    };

    this.clickEmailHandle = function(e) {
      e.preventDefault();
      try {
        window.location.href = 'mailto:?subject=Recommended article from {{ site.title }}&body=' + this.shareText() + ' ' + encodeURIComponent(this.attr.url);
      } catch(missingShareTextNode) {
        console.log('Error: missing share Text Node');
      }
    };

    this.shareText = function(){
      var text;
      var textNode = this.$node.find('[data-share-text]');

      if(!textNode.length) {
        textNode = $('h1');
      }

      if(!textNode.length) {
        text = window.document.title;
      } else {
        text = textNode.html();
      }

      if(text.length > 101) {
        text = text.substring(0,101) + '…';
      }
      return text = text+" {{ site.twitter_hashtag_for_social_share }}";
      
    };

  });

  $(function() {
    window.shareContent.attachTo('[data-share]');
  });

})(window);
