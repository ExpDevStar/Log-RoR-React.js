class RunsController < ApplicationController
	def new
		@run = Run.new
	end

	def create
		'puts new run is being created'
		@run = Run.new(run_params(params))
		@run.user_id = session[:user]
		if @run.save
			puts params[:start_time]
			render :json => Run.find_all_by_user_id(session[:user])
		else
		end
	end


	def filter
		@runs = Run.find_all_by_user_id(params[:id])
	end
	private

	def run_params(params)
		return params.permit(:user_id, :name, :date, :distance, :start_time, :end_time, :notes)
	end
end
