module Jekyll
  class SiteUrlGenerator < Generator
    def generate(site)
      ENV['JEKYLL_ENV'] ||= 'development'
      site.config['url'] = site.config["#{ENV['JEKYLL_ENV']}_url"]
    end
  end
end
