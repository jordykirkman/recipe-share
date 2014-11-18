# -*- mode: ruby -*-
# vi: set ft=ruby :

# --------------------------
# See http://box.scotch.io/ 
# --------------------------

Vagrant.configure("2") do |config|

  config.vm.box = "scotch/box"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.hostname = "scotchbox"
  config.vm.synced_folder "app", "/var/www/public", :mount_options => ["dmode=777", "fmode=666"]

end