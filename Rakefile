require 'html-proofer'

task :test do
  sh "bundle exec jekyll build --future"
  HTMLProofer.check_directory("./_site").run
end
