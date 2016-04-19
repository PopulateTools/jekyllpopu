require 'mina/multistage'
require 'mina/bundler'
require 'mina/git'
require 'mina/rbenv'
require 'mina/slack'

set :stages, %w(staging production)

set :user, ''
set :domain, ''
set :deploy_to, '/var/www/path-to-project'
set :repository, '' # git url 
set :branch, 'master'
set :slack_url, ""
set :slack_room, ""
set :slack_application, ""
set :slack_username, ""
set :slack_emoji, ":cloud:"

set :shared_paths, []

set :term_mode, :nil
set :forward_agent, true

set :bundle_path, '/var/www/path-to-project/shared/vendor/'

task :environment do
  invoke :'rbenv:load'
end

def launch
  queue "cd #{deploy_to}/#{current_path}; JEKYLL_ENV=#{jekyll_env} bundle exec jekyll build"
  queue %Q{cd #{deploy_to}/#{current_path}/; rsync -av --delete --no-perms -I -O _site/ user@server:/var/www/#{destination_path}}
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'deploy:cleanup'

    to :launch do
      launch
    end
  end
end

task :release => :environment do
  launch
end
