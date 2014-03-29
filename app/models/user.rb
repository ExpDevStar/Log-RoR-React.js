class User < ActiveRecord::Base
	has_many :runs
	validates_presence_of :first_name, :last_name, :login
end
