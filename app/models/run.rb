class Run < ActiveRecord::Base
	belongs_to :user
	validates_presence_of :name, :date, :distance, :start_time, :end_time

	def self.filter(user_id, substr, start_date, end_date, distance_min, distance_max, min_time_length, max_time_length)
		user_runs = Run.find_all_by_user_id(user_id, :order => 'date DESC')
		result_runs = Set.new
		for run in user_runs
			if !start_date.empty?
				if run.date < Date.parse(start_date)
					next
				end
			end
			if !end_date.empty?
				if run.date > Date.parse(end_date)
					next
				end
			end
			if !distance_min.nil?
				if run.distance < distance_min
					next
				end
			end
			if !distance_max.nil?
				if run.distance > distance_max
					next
				end
			end
			run_time = (Time.parse(run.end_time) - Time.parse(run.start_time))/3600; #time in hours
			puts run_time
			if !min_time_length.nil?
				if run_time < min_time_length
					next
				end
			end
			if !max_time_length.nil?
				if run_time > max_time_length
					next
				end
			end
			if !substr.empty?
				if !run.name.downcase.include?(substr.downcase) && !run.notes.downcase.include?(substr.downcase)
					next
				end
			end
			result_runs.add(run)
		end
		return result_runs
	end
end
