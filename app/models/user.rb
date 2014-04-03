class User < ActiveRecord::Base
	has_many :runs
	validates :login, uniqueness: true
	validates_presence_of :first_name, :last_name, :login
end
