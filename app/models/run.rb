class Run < ActiveRecord::Base
	belongs_to :user
	validates_presence_of :name, :date, :distance, :start_time, :end_time, :notes

	def self.filter(id, substr, start_date, end_date)
		
	end
end
