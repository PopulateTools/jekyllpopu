Jekyll crash course: https://gist.github.com/furilo/68fb9faf5d73e98f1f0c

## Install

Clone repo and install

<pre>
git clone git@github.com:PopulateTools/jekyllpopu.git
cd jekyllpopu
bundle install
</pre>


## Start application in local environment

<code>
jekyll serve -w --future
</code>

## Article tools

By default, an image in a post will take the full width of the column. Options:

<strong>Inline image</strong> Add the class "inline":

<code>{% img 'articles/160404-main_article-01' class:'inline' %}</code>

<strong>Full width image</strong> Add the class "full_width": 

<code>{% img 'articles/160404-main_article-01' class:'full_width' %}</code>

Add classes **f_right** and **f_left** to make the image slideout of the column in either direction.

### Image captions 

If you want to show a caption of the image, you can add an attribute title to the img, and a class caption to make it show. If you only add the title, it will function as the normal html title element. Example: 

```
{% img 'articles/00Divorce/160403-wadus-1' class:'full_width caption' title:'Caption of the image' %}
```


### Tweet box (box that appears in side as you scroll)

Just include the following code (the system will include the corresponding link for the tweet) between the paragrahs where you want the tweet box to appear as the user scrolls:

<code>
{% social_share TEXT %}
</code>

Example: 

<code>
{% social_share The text I want to be part of the tweet %}
</code>


### Galleries

Based of [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/). Two types:

1. Centered image, meta data below photo: class "popup-gallery"
2. Image on the left, meta data on the right: classes "popup-gallery popup-gallery-full"

The internal markup for listing photos is the same. 

```
<div class="popup-gallery clearfix" id="gallery">

  <div class="item"><a href="URL/TO/IMG" 
    title="Title of the photo"
    subtitle="Description of the photo. ">
      <img src="URL/TO/IMG" >
  </a></div>

  <div class="item"><a href="URL/TO/IMG" 
    title="Title of the photo"
    subtitle="Description of the photo. ">
      <img src="URL/TO/IMG" >
  </a></div>

</div>
```


### Adding an article to the Reading list

The **reading list** is a list of articles to read in a predefined order. To add an article to the
reading list you need to:

1 - Add the tag `readinglist` to the list of tags of the article

2 - Consider the position of the article in the list by the date in the prefix of the file name. For
example, the article: `2016-01-29-foo.md` will be previous to `2016-02-01-bar.md`.

