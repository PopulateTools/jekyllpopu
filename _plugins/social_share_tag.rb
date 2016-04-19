module Jekyll
  class SocialShareTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      <<-HTML
<div class="tweet on_viewport" data-tweet="#{@text}">
</div>
HTML
    end
  end
end

Liquid::Template.register_tag('social_share', Jekyll::SocialShareTag)
